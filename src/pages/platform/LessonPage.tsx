import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCourse } from "@/data/academy";
import { MiniMarkdown } from "@/components/academy/MiniMarkdown";
import { Widget } from "@/components/academy/Calculators";
import { LessonTutor } from "@/components/academy/LessonTutor";
import { supabase } from "@/integrations/supabase/client";

export default function LessonPage() {
  const { courseSlug = "", chapterSlug = "", lessonSlug = "" } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseSlug);
  const chapter = course?.chapters.find((c) => c.slug === chapterSlug);
  const lesson = chapter?.lessons.find((l) => l.slug === lessonSlug);

  // Find prev/next within course built lessons
  const flat = useMemo(() => {
    if (!course) return [];
    const arr: { ch: string; l: string; title: string }[] = [];
    course.chapters.filter((c) => c.built).forEach((ch) => {
      ch.lessons.forEach((l) => arr.push({ ch: ch.slug, l: l.slug, title: l.title }));
    });
    return arr;
  }, [course]);
  const idx = flat.findIndex((x) => x.ch === chapterSlug && x.l === lessonSlug);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx >= 0 && idx < flat.length - 1 ? flat[idx + 1] : null;

  useEffect(() => {
    // mark progress
    if (!course || !chapter || !lesson) return;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await supabase.from("academy_progress").upsert({
        user_id: user.id,
        course_slug: course.slug,
        chapter_slug: chapter.slug,
        lesson_slug: lesson.slug,
        status: "viewed",
        last_viewed_at: new Date().toISOString(),
      }, { onConflict: "user_id,course_slug,chapter_slug,lesson_slug" });
    })();
  }, [course, chapter, lesson]);

  if (!course || !chapter || !lesson) {
    return <div>Lesson not found. <Link to="/platform/academy" className="text-primary">Back</Link></div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link to={`/platform/academy/${course.slug}`}><ChevronLeft className="h-4 w-4 mr-1" /> {course.title}</Link>
        </Button>
        <div className="text-xs text-muted-foreground">Ch {chapter.number} · {chapter.title}</div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <h1 className="font-serif text-3xl mb-2">{lesson.title}</h1>
          <MiniMarkdown source={lesson.body} />
        </CardContent>
      </Card>

      {lesson.widget && <Widget id={lesson.widget} />}

      <LessonTutor
        courseTitle={course.title}
        chapterTitle={chapter.title}
        lessonTitle={lesson.title}
        lessonBody={lesson.body}
      />

      <div className="flex justify-between">
        {prev ? (
          <Button variant="outline" onClick={() => navigate(`/platform/academy/${course.slug}/${prev.ch}/${prev.l}`)}>
            <ChevronLeft className="h-4 w-4 mr-1" /> {prev.title}
          </Button>
        ) : <span />}
        {next ? (
          <Button onClick={() => navigate(`/platform/academy/${course.slug}/${next.ch}/${next.l}`)}>
            {next.title} <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        ) : (
          <Button onClick={() => navigate(`/platform/academy/${course.slug}/${chapter.slug}/quiz`)}>
            Take chapter quiz <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}