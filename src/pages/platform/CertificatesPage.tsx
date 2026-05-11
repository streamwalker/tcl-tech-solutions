import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Award, ChevronLeft, Download, Eye, GraduationCap, ArrowRight, Loader2, Sparkles, Search, X } from "lucide-react";
import { courses, getCourse } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "score-desc" | "score-asc" | "course-az">("newest");
  const [filterCourse, setFilterCourse] = useState<string>("all");
  const [search, setSearch] = useState("");

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

  // Pick the best "next certificate" candidate — most-progressed in-progress course, else first course.
  const nextCandidate = (() => {
    if (inProgress.length > 0) {
      return [...inProgress].sort((a, b) => pctFor(b.slug) - pctFor(a.slug))[0];
    }
    return courses[0];
  })();
  const nextCandidatePct = nextCandidate ? pctFor(nextCandidate.slug) : 0;

  const visibleCerts = useMemo(() => {
    let list = certs.slice();
    if (filterCourse !== "all") list = list.filter((c) => c.course_slug === filterCourse);
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((c) => {
        const course = getCourse(c.course_slug);
        return (
          c.certificate_no.toLowerCase().includes(q) ||
          (course?.title.toLowerCase().includes(q) ?? false) ||
          (course?.subtitle.toLowerCase().includes(q) ?? false)
        );
      });
    }
    list.sort((a, b) => {
      switch (sortBy) {
        case "oldest": return +new Date(a.issued_at) - +new Date(b.issued_at);
        case "score-desc": return Number(b.final_score) - Number(a.final_score);
        case "score-asc": return Number(a.final_score) - Number(b.final_score);
        case "course-az": {
          const at = getCourse(a.course_slug)?.title ?? "";
          const bt = getCourse(b.course_slug)?.title ?? "";
          return at.localeCompare(bt);
        }
        case "newest":
        default:
          return +new Date(b.issued_at) - +new Date(a.issued_at);
      }
    });
    return list;
  }, [certs, sortBy, filterCourse, search]);

  const filtersActive = filterCourse !== "all" || search.trim().length > 0 || sortBy !== "newest";

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
            {loaded ? `${certs.length} of ${courses.length} courses certified` : "Loading your certificates…"}
          </p>
        </div>
      </div>

      {/* Loading state */}
      {!loaded && (
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              Fetching your progress and certificates…
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-4">
            {[0, 1].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-3 w-full" />
                  <div className="flex gap-2">
                    <Skeleton className="h-9 flex-1" />
                    <Skeleton className="h-9 flex-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty state — no certificates yet */}
      {loaded && certs.length === 0 && (
        <Card className="border-dashed border-primary/40 bg-card/60">
          <CardContent className="pt-8 pb-8 text-center space-y-4 max-w-xl mx-auto">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
              <GraduationCap className="h-12 w-12 text-primary relative" />
            </div>
            <div className="space-y-1">
              <div className="font-serif text-2xl">Earn your first certificate</div>
              <p className="text-sm text-muted-foreground">
                Pass any course's final exam with 70% or higher and your certificate will appear here — ready to view, download, or share.
              </p>
            </div>

            {nextCandidate && nextCandidatePct > 0 ? (
              <div className="rounded-lg border border-border bg-background/40 p-4 text-left space-y-3">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
                  <Sparkles className="h-3 w-3 text-primary" /> Closest to certification
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{nextCandidate.icon}</div>
                  <div className="flex-1">
                    <div className="font-serif text-base">{nextCandidate.title}</div>
                    <div className="text-xs text-muted-foreground">{nextCandidate.subtitle}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Progress value={nextCandidatePct} className="flex-1" />
                  <span className="text-xs tabular-nums text-muted-foreground">{nextCandidatePct}%</span>
                </div>
                <Button asChild className="w-full">
                  <Link to={nextCandidatePct === 100 ? `/platform/academy/${nextCandidate.slug}/exam` : `/platform/academy/${nextCandidate.slug}`}>
                    {nextCandidatePct === 100 ? "Take final exam" : "Continue this course"} <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </div>
            ) : (
              <Button asChild size="lg">
                <Link to="/platform/academy">Browse courses <ArrowRight className="h-4 w-4 ml-1" /></Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {certs.length > 0 && (
        <>
          {/* Filter + sort toolbar (only when there are 2+ certs) */}
          {certs.length > 1 && (
            <Card>
              <CardContent className="pt-4 pb-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by course or certificate №…"
                    className="pl-9"
                  />
                </div>
                <Select value={filterCourse} onValueChange={setFilterCourse}>
                  <SelectTrigger className="md:w-56">
                    <SelectValue placeholder="All courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All courses</SelectItem>
                    {[...new Set(certs.map((c) => c.course_slug))].map((slug) => {
                      const c = getCourse(slug);
                      return (
                        <SelectItem key={slug} value={slug}>
                          {c?.icon} {c?.title ?? slug}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
                  <SelectTrigger className="md:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest first</SelectItem>
                    <SelectItem value="oldest">Oldest first</SelectItem>
                    <SelectItem value="score-desc">Highest score</SelectItem>
                    <SelectItem value="score-asc">Lowest score</SelectItem>
                    <SelectItem value="course-az">Course (A–Z)</SelectItem>
                  </SelectContent>
                </Select>
                {filtersActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setSearch(""); setFilterCourse("all"); setSortBy("newest"); }}
                  >
                    <X className="h-4 w-4 mr-1" /> Reset
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>
              Showing {visibleCerts.length} of {certs.length} certificate{certs.length === 1 ? "" : "s"}
            </span>
          </div>

          {visibleCerts.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="pt-6 pb-6 text-center text-sm text-muted-foreground space-y-3">
                <div>No certificates match your filters.</div>
                <Button variant="outline" size="sm" onClick={() => { setSearch(""); setFilterCourse("all"); setSortBy("newest"); }}>
                  Clear filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {visibleCerts.map((cert) => {
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
        </>
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
