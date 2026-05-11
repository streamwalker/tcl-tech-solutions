import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, FileText, GraduationCap, ChevronLeft, Lock, History, ChevronDown, CheckCircle2, Circle, PlayCircle, Trophy, Award, Sparkles } from "lucide-react";
import { getCourse } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { AttemptHistory, type AttemptRow } from "@/components/academy/AttemptHistory";

const PASS_PCT = 70;

export default function CoursePage() {
  const { courseSlug = "" } = useParams();
  const course = getCourse(courseSlug);
  const [doneLessons, setDoneLessons] = useState<Set<string>>(new Set());
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});
  const [attemptsByChapter, setAttemptsByChapter] = useState<Record<string, AttemptRow[]>>({});
  const [hasCert, setHasCert] = useState(false);

  useEffect(() => {
    if (!course) return;
    (async () => {
      const { data: prog } = await supabase
        .from("academy_progress")
        .select("chapter_slug, lesson_slug")
        .eq("course_slug", course.slug);
      setDoneLessons(new Set((prog ?? []).map((p: any) => `${p.chapter_slug}/${p.lesson_slug}`)));

      const { data: quizzes } = await supabase
        .from("academy_quiz_attempts")
        .select("id, chapter_slug, score_pct, attempted_at, answers")
        .eq("course_slug", course.slug)
        .order("attempted_at", { ascending: false });
      const map: Record<string, number> = {};
      const grouped: Record<string, AttemptRow[]> = {};
      (quizzes ?? []).forEach((q: any) => {
        map[q.chapter_slug] = Math.max(map[q.chapter_slug] ?? 0, Number(q.score_pct));
        (grouped[q.chapter_slug] ??= []).push(q as AttemptRow);
      });
      setQuizScores(map);
      setAttemptsByChapter(grouped);

      const { data: certs } = await supabase
        .from("academy_certificates")
        .select("id")
        .eq("course_slug", course.slug)
        .limit(1);
      setHasCert((certs?.length ?? 0) > 0);
    })();
  }, [course]);

  if (!course) return <div>Course not found.</div>;

  const builtChapters = course.chapters.filter((c) => c.built);
  const totalLessons = builtChapters.reduce((s, ch) => s + ch.lessons.length, 0);
  const completedPct = totalLessons ? Math.round((doneLessons.size / totalLessons) * 100) : 0;
  const quizzesPassed = builtChapters.filter((ch) => (quizScores[ch.slug] ?? 0) >= PASS_PCT).length;

  type ChapterStatus = "not_started" | "in_progress" | "lessons_done" | "complete";
  const chapterStatus = (chSlug: string, lessons: { slug: string }[]): { status: ChapterStatus; lessonsDone: number } => {
    const lessonsDone = lessons.filter((l) => doneLessons.has(`${chSlug}/${l.slug}`)).length;
    const quizPassed = (quizScores[chSlug] ?? 0) >= PASS_PCT;
    if (lessonsDone === 0 && !quizPassed) return { status: "not_started", lessonsDone };
    if (lessonsDone < lessons.length) return { status: "in_progress", lessonsDone };
    if (!quizPassed) return { status: "lessons_done", lessonsDone };
    return { status: "complete", lessonsDone };
  };

  // Compute "next step" CTA for the hero: first incomplete lesson, else first unpassed quiz, else final exam, else done.
  const nextStep = (() => {
    for (const ch of builtChapters) {
      const nextLesson = ch.lessons.find((l) => !doneLessons.has(`${ch.slug}/${l.slug}`));
      if (nextLesson) {
        return {
          kind: "lesson" as const,
          label: "Resume lesson",
          title: nextLesson.title,
          subtitle: `Ch ${ch.number} — ${ch.title}`,
          href: `/platform/academy/${course.slug}/${ch.slug}/${nextLesson.slug}`,
        };
      }
      if ((quizScores[ch.slug] ?? 0) < PASS_PCT) {
        return {
          kind: "quiz" as const,
          label: (attemptsByChapter[ch.slug]?.length ?? 0) > 0 ? "Retake chapter quiz" : "Take chapter quiz",
          title: `${ch.title} — Quiz`,
          subtitle: `Ch ${ch.number} · need ${PASS_PCT}% to pass`,
          href: `/platform/academy/${course.slug}/${ch.slug}/quiz`,
        };
      }
    }
    if (!hasCert) {
      return {
        kind: "exam" as const,
        label: "Start final exam",
        title: "Final Exam",
        subtitle: `Pass with ${PASS_PCT}% to earn your certificate`,
        href: `/platform/academy/${course.slug}/exam`,
      };
    }
    return null;
  })();

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/platform/academy"><ChevronLeft className="h-4 w-4 mr-1" /> All courses</Link>
      </Button>

      <div className="flex items-start gap-4">
        <div className="text-5xl">{course.icon}</div>
        <div className="flex-1">
          <h1 className="font-serif text-3xl">{course.title}</h1>
          <p className="text-sm text-muted-foreground mb-3">{course.subtitle}</p>
          <div className="flex items-center gap-2 max-w-md">
            <Progress value={completedPct} className="flex-1" />
            <span className="text-xs tabular-nums">{completedPct}%</span>
          </div>
        </div>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Completion</div>
            <div className="text-2xl font-serif">{completedPct}%</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Lessons</div>
            <div className="text-2xl font-serif">{doneLessons.size}<span className="text-sm text-muted-foreground">/{totalLessons}</span></div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 pb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Quizzes passed</div>
            <div className="text-2xl font-serif">{quizzesPassed}<span className="text-sm text-muted-foreground">/{builtChapters.length}</span></div>
          </CardContent>
        </Card>
        <Card className={hasCert ? "border-primary/40" : ""}>
          <CardContent className="pt-4 pb-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Certificate</div>
            <div className="text-2xl font-serif flex items-center gap-2">
              {hasCert ? (<><Award className="h-5 w-5 text-primary" /> Earned</>) : ("—")}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Next-step hero */}
      {nextStep ? (
        <Card className="border-primary/40 bg-card/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Sparkles className="h-3 w-3" /> Your next step
            </div>
            <CardTitle className="font-serif text-xl">{nextStep.title}</CardTitle>
            <CardDescription>{nextStep.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link to={nextStep.href}>{nextStep.label} <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-primary/40 bg-card/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Trophy className="h-3 w-3" /> Course complete
            </div>
            <CardTitle className="font-serif text-xl">You finished {course.title}</CardTitle>
            <CardDescription>Your certificate is in your account.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            <Button asChild>
              <Link to="/platform/academy/certificates">View certificates</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/platform/academy">Back to academy</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">About this course</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>{course.description}</p>
          <div>
            <p className="text-xs uppercase tracking-wider font-semibold text-foreground mb-1">Source notes</p>
            <ul className="space-y-1">
              {course.sourceNotes.map((n) => (
                <li key={n.href}><a href={n.href} target="_blank" rel="noopener" className="text-primary hover:underline">{n.label}</a></li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl">Chapters</h2>
        <span className="text-xs text-muted-foreground">{builtChapters.length} chapters · {totalLessons} lessons</span>
      </div>

      <div className="space-y-3">
        {course.chapters.map((ch) => {
          const isBuilt = ch.built;
          const { status, lessonsDone } = isBuilt
            ? chapterStatus(ch.slug, ch.lessons)
            : { status: "not_started" as ChapterStatus, lessonsDone: 0 };
          const chPct = isBuilt && ch.lessons.length ? Math.round((lessonsDone / ch.lessons.length) * 100) : 0;
          const bestQuiz = quizScores[ch.slug];
          const nextLessonInCh = isBuilt ? ch.lessons.find((l) => !doneLessons.has(`${ch.slug}/${l.slug}`)) : null;
          const statusBadge = (() => {
            if (!isBuilt) return <Badge variant="outline" className="gap-1"><Lock className="h-3 w-3" /> Coming soon</Badge>;
            if (status === "complete") return <Badge className="gap-1 bg-emerald-600 hover:bg-emerald-600"><CheckCircle2 className="h-3 w-3" /> Complete</Badge>;
            if (status === "lessons_done") return <Badge variant="secondary" className="gap-1"><FileText className="h-3 w-3" /> Quiz pending</Badge>;
            if (status === "in_progress") return <Badge variant="secondary" className="gap-1"><PlayCircle className="h-3 w-3" /> In progress</Badge>;
            return <Badge variant="outline" className="gap-1"><Circle className="h-3 w-3" /> Not started</Badge>;
          })();
          return (
            <Card key={ch.slug} className={isBuilt ? "" : "opacity-60"}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">CH {ch.number}</span>
                      {ch.title}
                    </CardTitle>
                    <CardDescription>{ch.summary}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {statusBadge}
                    {isBuilt && bestQuiz != null && (
                      <span className="text-[10px] text-muted-foreground tabular-nums">
                        Quiz best: {bestQuiz.toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </CardHeader>
              {isBuilt && (
                <CardContent>
                  <div className="flex items-center gap-2 mb-3">
                    <Progress value={chPct} className="flex-1 h-1.5" />
                    <span className="text-[11px] text-muted-foreground tabular-nums">
                      {lessonsDone}/{ch.lessons.length} lessons
                    </span>
                  </div>

                  {/* Next-step CTAs for this chapter */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {status === "not_started" && (
                      <Button asChild size="sm">
                        <Link to={`/platform/academy/${course.slug}/${ch.slug}/${ch.lessons[0].slug}`}>
                          Start chapter <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                    {status === "in_progress" && nextLessonInCh && (
                      <Button asChild size="sm">
                        <Link to={`/platform/academy/${course.slug}/${ch.slug}/${nextLessonInCh.slug}`}>
                          Resume: {nextLessonInCh.title} <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                    {status === "lessons_done" && (
                      <Button asChild size="sm">
                        <Link to={`/platform/academy/${course.slug}/${ch.slug}/quiz`}>
                          {bestQuiz != null ? "Retake quiz" : "Take chapter quiz"} <ArrowRight className="h-3 w-3 ml-1" />
                        </Link>
                      </Button>
                    )}
                    {status === "complete" && (
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/platform/academy/${course.slug}/${ch.slug}/${ch.lessons[0].slug}`}>
                          Review chapter
                        </Link>
                      </Button>
                    )}
                  </div>

                  <ul className="space-y-1 text-sm">
                    {ch.lessons.map((l) => {
                      const done = doneLessons.has(`${ch.slug}/${l.slug}`);
                      return (
                        <li key={l.slug}>
                          <Link to={`/platform/academy/${course.slug}/${ch.slug}/${l.slug}`} className="flex items-center gap-2 hover:text-primary py-1">
                            {done ? <CheckCircle2 className="h-3 w-3 text-emerald-500" /> : <BookOpen className="h-3 w-3" />}
                            <span className="flex-1">{l.title}</span>
                          </Link>
                        </li>
                      );
                    })}
                    <li className="pt-2 border-t border-border">
                      <Link to={`/platform/academy/${course.slug}/${ch.slug}/quiz`} className="flex items-center gap-2 text-primary hover:underline py-1">
                        <FileText className="h-3 w-3" /> Chapter Quiz <ArrowRight className="h-3 w-3" />
                      </Link>
                    </li>
                  </ul>
                  {(attemptsByChapter[ch.slug]?.length ?? 0) > 0 && (
                    <Collapsible className="mt-3 border-t border-border pt-3">
                      <CollapsibleTrigger className="group flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground">
                        <History className="h-3 w-3" />
                        Attempt history ({attemptsByChapter[ch.slug].length})
                        <ChevronDown className="h-3 w-3 transition-transform group-data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="pt-2">
                        <AttemptHistory attempts={attemptsByChapter[ch.slug]} />
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="border-primary/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Final Exam</CardTitle>
          <CardDescription>
            Pass with {PASS_PCT}% to earn your certificate.
            {quizzesPassed < builtChapters.length && (
              <> · <span className="text-muted-foreground">Tip: pass all chapter quizzes first ({quizzesPassed}/{builtChapters.length}).</span></>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild variant={hasCert ? "outline" : "default"}>
            <Link to={`/platform/academy/${course.slug}/exam`}>Start final exam <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}