import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, ChevronLeft, Download, Eye, GraduationCap, ArrowRight } from "lucide-react";
import { courses, getCourse } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";

type Cert = {
  course_slug: string;
  final_score: number;
  certificate_no: string;
  issued_at: string;
};

type ProgressRow = { course_slug: string; chapter_slug: string; lesson_slug: string };

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Cert[]>([]);
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const [{ data: cs }, { data: pr }] = await Promise.all([
        supabase
          .from("academy_certificates")
          .select("course_slug, final_score, certificate_no, issued_at")
          .order("issued_at", { ascending: false }),
        supabase
          .from("academy_progress")
          .select("course_slug, chapter_slug, lesson_slug"),
      ]);
      setCerts((cs ?? []) as Cert[]);
      setProgress((pr ?? []) as ProgressRow[]);
      setLoaded(true);
    })();
  }, []);

  const certifiedSlugs = new Set(certs.map((c) => c.course_slug));
  const inProgress = courses.filter((c) => {
    if (certifiedSlugs.has(c.slug)) return false;
    return progress.some((p) => p.course_slug === c.slug);
  });

  const pctFor = (slug: string) => {
    const course = getCourse(slug);
    if (!course) return 0;
    const total = course.chapters.filter((ch) => ch.built).reduce((s, ch) => s + ch.lessons.length, 0);
    const done = new Set(
      progress.filter((p) => p.course_slug === slug).map((p) => `${p.chapter_slug}/${p.lesson_slug}`)
    ).size;
    return total ? Math.round((done / total) * 100) : 0;
  };

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/platform/academy"><ChevronLeft className="h-4 w-4 mr-1" /> Back to Academy</Link>
      </Button>

      <div className="flex items-center gap-3">
        <Award className="h-8 w-8 text-primary" />
        <div>
          <h1 className="font-serif text-3xl">My Certificates</h1>
          <p className="text-sm text-muted-foreground">
            {certs.length} of {courses.length} courses certified
          </p>
        </div>
      </div>

      {loaded && certs.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="pt-6 text-center space-y-3">
            <GraduationCap className="h-10 w-10 text-primary mx-auto" />
            <div className="font-serif text-xl">No certificates yet</div>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Pass any course's final exam with a score of 70% or higher to earn your certificate.
            </p>
            <Button asChild>
              <Link to="/platform/academy">Browse courses <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {certs.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((cert) => {
            const course = getCourse(cert.course_slug);
            if (!course) return null;
            return (
              <Card key={cert.certificate_no} className="border-primary/40">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="text-4xl">{course.icon}</div>
                      <div>
                        <CardTitle className="font-serif text-xl">{course.title}</CardTitle>
                        <CardDescription>{course.subtitle}</CardDescription>
                      </div>
                    </div>
                    <Badge className="gap-1 shrink-0">
                      <Award className="h-3 w-3" /> {Number(cert.final_score).toFixed(0)}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div>
                      <div className="text-foreground">{new Date(cert.issued_at).toLocaleDateString()}</div>
                      <div>Issued</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-foreground">{cert.certificate_no}</div>
                      <div>Certificate №</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" className="flex-1">
                      <Link to={`/platform/academy/${cert.course_slug}/certificate`}>
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Link>
                    </Button>
                    <Button asChild className="flex-1">
                      <Link to={`/platform/academy/${cert.course_slug}/certificate?print=1`}>
                        <Download className="h-4 w-4 mr-1" /> Download PDF
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {inProgress.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-serif text-xl">Courses still in progress</h2>
          <div className="grid md:grid-cols-2 gap-3">
            {inProgress.map((c) => {
              const pct = pctFor(c.slug);
              return (
                <Card key={c.slug} className="opacity-90">
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{c.icon}</div>
                      <div className="flex-1">
                        <CardTitle className="font-serif text-base">{c.title}</CardTitle>
                        <CardDescription className="text-xs">{c.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Progress value={pct} className="flex-1" />
                      <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
                    </div>
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="flex-1">
                        <Link to={`/platform/academy/${c.slug}`}>Continue</Link>
                      </Button>
                      {pct === 100 && (
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/platform/academy/${c.slug}/exam`}>Take final exam</Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
