import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, BookOpen, FileText, GraduationCap, ChevronLeft, Lock } from "lucide-react";
import { getCourse } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";

export default function CoursePage() {
  const { courseSlug = "" } = useParams();
  const course = getCourse(courseSlug);
  const [doneLessons, setDoneLessons] = useState<Set<string>>(new Set());
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

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
        .select("chapter_slug, score_pct")
        .eq("course_slug", course.slug);
      const map: Record<string, number> = {};
      (quizzes ?? []).forEach((q: any) => {
        map[q.chapter_slug] = Math.max(map[q.chapter_slug] ?? 0, Number(q.score_pct));
      });
      setQuizScores(map);
    })();
  }, [course]);

  if (!course) return <div>Course not found.</div>;

  const builtChapters = course.chapters.filter((c) => c.built);
  const totalLessons = builtChapters.reduce((s, ch) => s + ch.lessons.length, 0);
  const completedPct = totalLessons ? Math.round((doneLessons.size / totalLessons) * 100) : 0;

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

      <div className="space-y-3">
        {course.chapters.map((ch) => {
          const isBuilt = ch.built;
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
                  {isBuilt ? (
                    quizScores[ch.slug] != null && (
                      <Badge variant={quizScores[ch.slug] >= 70 ? "default" : "secondary"}>
                        Quiz: {quizScores[ch.slug].toFixed(0)}%
                      </Badge>
                    )
                  ) : (
                    <Badge variant="outline" className="gap-1"><Lock className="h-3 w-3" /> Coming soon</Badge>
                  )}
                </div>
              </CardHeader>
              {isBuilt && (
                <CardContent>
                  <ul className="space-y-1 text-sm">
                    {ch.lessons.map((l) => {
                      const done = doneLessons.has(`${ch.slug}/${l.slug}`);
                      return (
                        <li key={l.slug}>
                          <Link to={`/platform/academy/${course.slug}/${ch.slug}/${l.slug}`} className="flex items-center gap-2 hover:text-primary py-1">
                            <BookOpen className="h-3 w-3" />
                            <span className="flex-1">{l.title}</span>
                            {done && <span className="text-[10px] text-emerald-500">✓ Done</span>}
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
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="border-primary/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Final Exam</CardTitle>
          <CardDescription>Pass with 70% to earn your certificate.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link to={`/platform/academy/${course.slug}/exam`}>Start final exam <ArrowRight className="h-4 w-4 ml-1" /></Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}