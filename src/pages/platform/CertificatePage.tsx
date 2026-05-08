import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { getCourse } from "@/data/academy";
import { CertificateView } from "@/components/academy/CertificateView";
import { supabase } from "@/integrations/supabase/client";

export default function CertificatePage() {
  const { courseSlug = "" } = useParams();
  const course = getCourse(courseSlug);
  const [cert, setCert] = useState<any>(null);
  const [name, setName] = useState("Student");

  useEffect(() => {
    if (!course) return;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setName(user.email?.split("@")[0] ?? "Student");
      const { data } = await supabase.from("academy_certificates")
        .select("*").eq("course_slug", course.slug).maybeSingle();
      setCert(data);
    })();
  }, [course]);

  if (!course) return <div>Not found.</div>;
  if (!cert) return (
    <div className="max-w-2xl mx-auto space-y-4">
      <p className="text-muted-foreground">No certificate yet — pass the final exam first.</p>
      <Button asChild><Link to={`/platform/academy/${course.slug}/exam`}>Take final exam</Link></Button>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <Button asChild variant="ghost" size="sm">
        <Link to={`/platform/academy/${course.slug}`}><ChevronLeft className="h-4 w-4 mr-1" /> Back</Link>
      </Button>
      <CertificateView
        studentName={name}
        courseTitle={course.title}
        finalScore={Number(cert.final_score)}
        certificateNo={cert.certificate_no}
        issuedAt={cert.issued_at}
      />
    </div>
  );
}