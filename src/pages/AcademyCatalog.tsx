import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, ArrowRight, BookOpen, CheckCircle2, Calculator, Bot, Award, Lock } from "lucide-react";
import { courses } from "@/data/academy";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AcademyCatalog() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setAuthed(!!data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setAuthed(!!s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const enroll = async (slug: string) => {
    if (!authed) {
      navigate(`/auth?redirect=/education/academy`);
      return;
    }
    setEnrolling(slug);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not signed in");
      const { error } = await supabase
        .from("academy_enrollments")
        .upsert({ user_id: user.id, course_slug: slug }, { onConflict: "user_id,course_slug" });
      if (error) throw error;
      toast.success("Enrolled!", { description: "Opening your course…" });
      navigate(`/platform/academy/${slug}`);
    } catch (e: any) {
      toast.error("Enrollment failed", { description: e?.message ?? "Try again." });
    } finally {
      setEnrolling(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <IBMNavigation />
      <section className="pt-12 pb-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-14 w-14 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">TCL Academy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            College-level business courses taught the way they should be — clear, practical,
            with worked examples, calculators, quizzes, and an AI tutor on every lesson.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> End-of-chapter quizzes</span>
            <span className="flex items-center gap-1"><Calculator className="h-3.5 w-3.5 text-primary" /> Interactive calculators</span>
            <span className="flex items-center gap-1"><Bot className="h-3.5 w-3.5 text-primary" /> ClawdBot AI tutor</span>
            <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5 text-primary" /> Completion certificate</span>
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {courses.map((c) => {
            const builtCount = c.chapters.filter((ch) => ch.built).length;
            return (
              <Card key={c.slug} className="flex flex-col hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className={`text-5xl mb-2`}>{c.icon}</div>
                  <CardTitle className="font-serif text-2xl">{c.title}</CardTitle>
                  <CardDescription className="text-xs uppercase tracking-wider">{c.subtitle}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{c.chapters.length} chapters</Badge>
                    <Badge>{builtCount} ready now</Badge>
                    <Badge variant="outline">Free</Badge>
                  </div>
                  <Accordion type="single" collapsible className="border rounded-md">
                    <AccordionItem value="syllabus" className="border-0">
                      <AccordionTrigger className="px-3 py-2 text-xs uppercase tracking-wider">
                        Full syllabus
                      </AccordionTrigger>
                      <AccordionContent className="px-3 pb-3">
                        <ul className="text-xs text-muted-foreground space-y-1.5">
                          {c.chapters.map((ch) => (
                            <li key={ch.slug} className="flex items-start gap-2">
                              <BookOpen className="h-3 w-3 mt-0.5 text-primary shrink-0" />
                              <span className="flex-1">Ch {ch.number} — {ch.title}</span>
                              {!ch.built && <Badge variant="outline" className="text-[9px] shrink-0">soon</Badge>}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="mt-auto flex flex-col gap-2">
                    <Button onClick={() => enroll(c.slug)} disabled={enrolling === c.slug}>
                      {authed === false ? <><Lock className="h-4 w-4 mr-1" /> Sign up & enroll</>
                        : enrolling === c.slug ? "Enrolling…"
                        : <>Enroll free <ArrowRight className="h-4 w-4 ml-1" /></>}
                    </Button>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/platform/academy/${c.slug}`}>Preview course</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {authed === false && (
          <div className="max-w-3xl mx-auto mt-12 text-center border border-primary/30 rounded-xl p-6 bg-card/50">
            <h2 className="font-serif text-2xl mb-2">Create a free account to enroll</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Track your progress, take quizzes, chat with the AI tutor, and earn a certificate when you finish.
            </p>
            <Button asChild size="lg">
              <Link to="/auth?redirect=/education/academy">Sign up free <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}