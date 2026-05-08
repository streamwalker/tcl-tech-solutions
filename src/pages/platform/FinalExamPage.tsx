import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCourse } from "@/data/academy";
import { QuizRunner } from "@/components/academy/QuizRunner";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function FinalExamPage() {
  const { courseSlug = "" } = useParams();
  const navigate = useNavigate();
  const course = getCourse(courseSlug);
  if (!course) return <div>Not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link to={`/platform/academy/${course.slug}`}><ChevronLeft className="h-4 w-4 mr-1" /> Back</Link>
      </Button>
      <h1 className="font-serif text-3xl">Final Exam — {course.title}</h1>
      <p className="text-sm text-muted-foreground">Pass with 70% to earn your certificate.</p>
      <QuizRunner
        title="Final Exam"
        questions={course.finalExam}
        passPct={70}
        onSubmit={async (score) => {
          const { data: { user } } = await supabase.auth.getUser();
          if (!user) return;
          const passed = score >= 70;
          await supabase.from("academy_exam_attempts").insert({
            user_id: user.id,
            course_slug: course.slug,
            score_pct: score,
            passed,
            submitted_at: new Date().toISOString(),
          });
          if (passed) {
            await supabase.from("academy_certificates").upsert({
              user_id: user.id,
              course_slug: course.slug,
              final_score: score,
            }, { onConflict: "user_id,course_slug" });
            toast.success("Certificate issued!");
            navigate(`/platform/academy/${course.slug}/certificate`);
          } else {
            toast.error("Below 70% — try again to earn the certificate.");
          }
        }}
      />
    </div>
  );
}