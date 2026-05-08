import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCourse } from "@/data/academy";
import { QuizRunner } from "@/components/academy/QuizRunner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function ChapterQuizPage() {
  const { courseSlug = "", chapterSlug = "" } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseSlug);
  const chapter = course?.chapters.find((c) => c.slug === chapterSlug);
  if (!course || !chapter) return <div>Not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link to={`/platform/academy/${course.slug}`}><ChevronLeft className="h-4 w-4 mr-1" /> Back to course</Link>
      </Button>
      <h1 className="font-serif text-3xl">Quiz — {chapter.title}</h1>
      <QuizRunner
        title={`Chapter ${chapter.number} Quiz`}
        questions={chapter.quiz}
        onSubmit={async (score, answers) => {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;
          await supabase.from("academy_quiz_attempts").insert({
            user_id: user.id,
            course_slug: course.slug,
            chapter_slug: chapter.slug,
            score_pct: score,
            answers: answers as any,
          });
          toast.success(`Quiz scored ${score.toFixed(0)}%`);
        }}
      />
      <Button variant="outline" onClick={() => navigate(`/platform/academy/${course.slug}`)}>Done</Button>
    </div>
  );
}