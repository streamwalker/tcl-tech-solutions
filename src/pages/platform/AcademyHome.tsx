import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, ArrowRight, Award, BookOpen, PlayCircle, Trophy, Clock } from "lucide-react";
import { courses, getCourse } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";

type ProgressRow = { course_slug: string; chapter_slug: string; lesson_slug: string; last_viewed_at: string };

function resumeFor(courseSlug: string, rows: ProgressRow[]) {
  const course = getCourse(courseSlug);
  if (!course) return null;
  const seen = new Set(
    rows.filter((r) => r.course_slug === courseSlug).map((r) => `${r.chapter_slug}/${r.lesson_slug}`)
  );
  for (const ch of course.chapters.filter((c) => c.built)) {
    for (const l of ch.lessons) {
      if (!seen.has(`${ch.slug}/${l.slug}`)) {
        return { ch, l, isStart: seen.size === 0, allDone: false };
      }
    }
  }
  const last = rows
    .filter((r) => r.course_slug === courseSlug)
    .sort((a, b) => +new Date(b.last_viewed_at) - +new Date(a.last_viewed_at))[0];
  if (last) {
    const ch = course.chapters.find((c) => c.slug === last.chapter_slug);
    const l = ch?.lessons.find((x) => x.slug === last.lesson_slug);
    if (ch && l) return { ch, l, isStart: false, allDone: true };
  }
  return null;
}

export default function AcademyHome() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [certs, setCerts] = useState<Record<string, boolean>>({});
  const [enrolled, setEnrolled] = useState<Set<string>>(new Set());
  const [progRows, setProgRows] = useState<ProgressRow[]>([]);
  const [lastOverall, setLastOverall] = useState<ProgressRow | null>(null);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);

  useEffect(() => {
    (async () => {
      const { data: prog } = await supabase
        .from("academy_progress")
        .select("course_slug, chapter_slug, lesson_slug, last_viewed_at")
        .order("last_viewed_at", { ascending: false });
      const rows = (prog ?? []) as ProgressRow[];
      setProgRows(rows);
      setLastOverall(rows[0] ?? null);

      const counts: Record<string, Set<string>> = {};
      rows.forEach((p) => {
        counts[p.course_slug] ??= new Set();
        counts[p.course_slug].add(`${p.chapter_slug}/${p.lesson_slug}`);
      });
      const map: Record<string, number> = {};
      let total = 0;
      courses.forEach((c) => {
        const courseTotal = c.chapters.filter((ch) => ch.built).reduce((s, ch) => s + ch.lessons.length, 0);
        const done = counts[c.slug]?.size ?? 0;
        total += done;
        map[c.slug] = courseTotal ? Math.round((done / courseTotal) * 100) : 0;
      });
      setProgressMap(map);
      setLessonsCompleted(total);

      const { data: cs } = await supabase.from("academy_certificates").select("course_slug");
      const cm: Record<string, boolean> = {};
      (cs ?? []).forEach((c: any) => {
        cm[c.course_slug] = true;
      });
      setCerts(cm);

      const { data: en } = await supabase.from("academy_enrollments").select("course_slug");
      setEnrolled(new Set((en ?? []).map((r: any) => r.course_slug)));
    })();
  }, []);

  const resume = useMemo(() => {
    if (!lastOverall) return null;
    const r = resumeFor(lastOverall.course_slug, progRows);
    if (!r) return null;
    const course = getCourse(lastOverall.course_slug)!;
    return { course, ...r };
  }, [lastOverall, progRows]);

  const certCount = Object.values(certs).filter(Boolean).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          <div>
            <h1 className="font-serif text-3xl">TCL Academy</h1>
            <p className="text-sm text-muted-foreground">Your college-level business courses</p>
          </div>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link to="/education/academy">Browse catalog</Link>
        </Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-serif">{enrolled.size}</div>
              <div className="text-xs text-muted-foreground">Enrolled courses</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 flex items-center gap-3">
            <PlayCircle className="h-5 w-5 text-primary" />
            <div>
              <div className="text-2xl font-serif">{lessonsCompleted}</div>
              <div className="text-xs text-muted-foreground">Lessons completed</div>
            </div>
          </CardContent>
        </Card>
        <Link to="/platform/academy/certificates" className="block">
          <Card className="hover:border-primary/50 transition-colors h-full">
            <CardContent className="pt-5 flex items-center gap-3">
              <Trophy className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-serif">{certCount}</div>
                <div className="text-xs text-muted-foreground">Certificates earned →</div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {resume && (
        <Card className="border-primary/40 bg-card/60">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
              <Clock className="h-3 w-3" /> {resume.allDone ? "Last viewed" : "Continue where you left off"}
            </div>
            <CardTitle className="font-serif text-xl">{resume.l.title}</CardTitle>
            <CardDescription>
              {resume.course.title} · Ch {resume.ch.number} — {resume.ch.title}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg">
              <Link to={`/platform/academy/${resume.course.slug}/${resume.ch.slug}/${resume.l.slug}`}>
                Resume lesson <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((c) => {
          const r = resumeFor(c.slug, progRows);
          const pct = progressMap[c.slug] ?? 0;
          const isEnrolled = enrolled.has(c.slug);
          return (
            <Card key={c.slug}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-1">{c.icon}</div>
                  {isEnrolled && <Badge variant="secondary" className="text-[10px]">Enrolled</Badge>}
                </div>
                <CardTitle className="font-serif">{c.title}</CardTitle>
                <CardDescription>{c.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Progress value={pct} className="flex-1" />
                  <span className="text-xs text-muted-foreground tabular-nums">{pct}%</span>
                </div>
                {certs[c.slug] && (
                  <Badge className="gap-1">
                    <Award className="h-3 w-3" /> Certified
                  </Badge>
                )}
                {r && !r.allDone ? (
                  <div className="space-y-1.5">
                    <Button asChild className="w-full">
                      <Link to={`/platform/academy/${c.slug}/${r.ch.slug}/${r.l.slug}`}>
                        {r.isStart ? "Start course" : "Resume"} <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="sm" className="w-full text-xs">
                      <Link to={`/platform/academy/${c.slug}`}>View syllabus</Link>
                    </Button>
                  </div>
                ) : (
                  <Button asChild className="w-full" variant={pct === 100 ? "outline" : "default"}>
                    <Link to={`/platform/academy/${c.slug}`}>
                      {pct === 100 ? "Review course" : "Open course"} <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}