import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Trophy, GraduationCap } from "lucide-react";
import { getCourse } from "@/data/academy";
import { QuizRunner } from "@/components/academy/QuizRunner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { QuizAnswer } from "@/data/academy/types";

export default function ChapterQuizPage() {
  const { courseSlug = "", chapterSlug = "" } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseSlug);
  const chapter = course?.chapters.find((c) => c.slug === chapterSlug);
  const [result, setResult] = useState<{ score: number; passed: boolean; correct: number; total: number } | null>(null);
  const [previousAnswers, setPreviousAnswers] = useState<QuizAnswer[] | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!course || !chapter) return;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setLoaded(true); return; }
      const { data } = await supabase
        .from("academy_quiz_attempts")
        .select("answers")
        .eq("user_id", user.id)
        .eq("course_slug", course.slug)
        .eq("chapter_slug", chapter.slug)
        .order("attempted_at", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (data?.answers && Array.isArray(data.answers)) {
        setPreviousAnswers(data.answers as unknown as QuizAnswer[]);
      }
      setLoaded(true);
    })();
  }, [course, chapter]);

  if (!course || !chapter) return <div>Not found.</div>;

  const builtChapters = course.chapters.filter((c) => c.built);
  const idx = builtChapters.findIndex((c) => c.slug === chapter.slug);
  const nextChapter = idx >= 0 && idx < builtChapters.length - 1 ? builtChapters[idx + 1] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link to={`/platform/academy/${course.slug}`}><ChevronLeft className="h-4 w-4 mr-1" /> Back to course</Link>
      </Button>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">Chapter {chapter.number} Quiz</div>
        <h1 className="font-serif text-3xl">{chapter.title}</h1>
      </div>
      {loaded && <QuizRunner
        title={`Chapter ${chapter.number} Quiz`}
        questions={chapter.quiz}
        previousAnswers={previousAnswers}
        onSubmit={async (score, answers) => {
          const correct = answers.filter((a) => a.correct).length;
          const passed = score >= 70;
          setResult({ score, passed, correct, total: answers.length });
          setPreviousAnswers(answers);
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;
          await supabase.from("academy_quiz_attempts").insert({
            user_id: user.id,
            course_slug: course.slug,
            chapter_slug: chapter.slug,
            score_pct: score,
            answers: answers as any,
          });
          if (passed) {
            // mark every lesson in the chapter as completed
            await Promise.all(chapter.lessons.map((l) =>
              supabase.from("academy_progress").upsert({
                user_id: user.id,
                course_slug: course.slug,
                chapter_slug: chapter.slug,
                lesson_slug: l.slug,
                status: "completed",
                last_viewed_at: new Date().toISOString(),
              }, { onConflict: "user_id,course_slug,chapter_slug,lesson_slug" })
            ));
            toast.success(`Passed with ${score.toFixed(0)}% — chapter complete!`);
          } else {
            toast.message(`Scored ${score.toFixed(0)}% — review and try again.`);
          }
        }}
      />}

      {result && (
        <Card className={result.passed ? "border-emerald-500/50 bg-emerald-500/5" : "border-amber-500/50 bg-amber-500/5"}>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Trophy className={`h-8 w-8 ${result.passed ? "text-emerald-500" : "text-amber-500"}`} />
              <div>
                <div className="font-serif text-2xl">
                  {result.passed ? "Chapter Complete!" : "Keep practicing"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {result.correct} of {result.total} correct · {result.score.toFixed(0)}% (need 70% to pass)
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {result.passed && nextChapter && (
                <Button onClick={() => navigate(`/platform/academy/${course.slug}/${nextChapter.slug}/${nextChapter.lessons[0].slug}`)}>
                  Next chapter: {nextChapter.title} <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              )}
              {result.passed && !nextChapter && (
                <Button onClick={() => navigate(`/platform/academy/${course.slug}/exam`)}>
                  <GraduationCap className="h-4 w-4 mr-1" /> Take final exam
                </Button>
              )}
              <Button variant="outline" onClick={() => navigate(`/platform/academy/${course.slug}`)}>
                Back to course
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}