import { Link } from "react-router-dom";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowRight, BookOpen } from "lucide-react";
import { courses } from "@/data/academy";

export default function AcademyCatalog() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <IBMNavigation />
      <section className="pt-12 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <GraduationCap className="h-14 w-14 text-primary" />
          </div>
          <h1 className="font-serif text-4xl md:text-6xl mb-4">TCL Academy</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            College-level business courses taught the way they should be — clear, practical,
            with worked examples, calculators, quizzes, and an AI tutor on every lesson.
          </p>
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
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {c.chapters.slice(0, 4).map((ch) => (
                      <li key={ch.slug} className="flex items-center gap-2">
                        <BookOpen className="h-3 w-3" />
                        Ch {ch.number} — {ch.title}
                        {!ch.built && <Badge variant="outline" className="ml-auto text-[9px]">soon</Badge>}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-auto">
                    <Link to={`/platform/academy/${c.slug}`}>
                      Start course <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}