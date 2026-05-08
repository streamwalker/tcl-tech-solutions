import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, ArrowRight, Award } from "lucide-react";
import { courses } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";

export default function AcademyHome() {
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const [certs, setCerts] = useState<Record<string, boolean>>({});

  useEffect(() => {
    (async () => {
      const { data: prog } = await supabase.from("academy_progress").select("course_slug, lesson_slug");
      const counts: Record<string, Set<string>> = {};
      (prog ?? []).forEach((p: any) => {
        counts[p.course_slug] ??= new Set();
        counts[p.course_slug].add(`${p.lesson_slug}`);
      });
      const map: Record<string, number> = {};
      courses.forEach((c) => {
        const total = c.chapters.filter((ch) => ch.built).reduce((s, ch) => s + ch.lessons.length, 0);
        const done = counts[c.slug]?.size ?? 0;
        map[c.slug] = total ? Math.round((done / total) * 100) : 0;
      });
      setProgressMap(map);

      const { data: cs } = await supabase.from("academy_certificates").select("course_slug");
      const cm: Record<string, boolean> = {};
      (cs ?? []).forEach((c: any) => { cm[c.course_slug] = true; });
      setCerts(cm);
    })();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <GraduationCap className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-serif text-3xl">TCL Academy</h1>
          <p className="text-sm text-muted-foreground">Your college-level business courses</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {courses.map((c) => (
          <Card key={c.slug}>
            <CardHeader>
              <div className="text-4xl mb-1">{c.icon}</div>
              <CardTitle className="font-serif">{c.title}</CardTitle>
              <CardDescription>{c.subtitle}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <Progress value={progressMap[c.slug] ?? 0} className="flex-1" />
                <span className="text-xs text-muted-foreground tabular-nums">{progressMap[c.slug] ?? 0}%</span>
              </div>
              {certs[c.slug] && (
                <Badge className="gap-1"><Award className="h-3 w-3" /> Certified</Badge>
              )}
              <Button asChild className="w-full">
                <Link to={`/platform/academy/${c.slug}`}>
                  Open course <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}