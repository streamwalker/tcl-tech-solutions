import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type ExamQuestion =
  | { id: string; type: "mcq"; answer: string }
  | { id: string; type: "numeric"; answer: number; tolerance?: number }
  | { id: string; type: "short"; answer: string };

type SubmittedAnswer = {
  questionId: string;
  given: string;
};

const finalExams: Record<string, ExamQuestion[]> = {
  accounting: [
    { id: "fe1", type: "mcq", answer: "1" },
    { id: "fe2", type: "mcq", answer: "1" },
    { id: "fe3", type: "mcq", answer: "2" },
    { id: "fe4", type: "mcq", answer: "1" },
    { id: "fe5", type: "mcq", answer: "1" },
    { id: "fe6", type: "mcq", answer: "1" },
    { id: "fe7", type: "numeric", answer: 280000, tolerance: 1 },
    { id: "fe8", type: "numeric", answer: 15, tolerance: 0.5 },
    { id: "fe9", type: "numeric", answer: 210000, tolerance: 1 },
    { id: "fe10", type: "numeric", answer: 50, tolerance: 1 },
    { id: "fe11", type: "numeric", answer: 400, tolerance: 1 },
    { id: "fe12", type: "short", answer: "managerial" },
  ],
  economics: [
    { id: "fe1", type: "mcq", answer: "1" },
    { id: "fe2", type: "numeric", answer: 25, tolerance: 0.1 },
    { id: "fe3", type: "mcq", answer: "3" },
    { id: "fe4", type: "mcq", answer: "1" },
  ],
  management: [
    { id: "fe1", type: "mcq", answer: "3" },
    { id: "fe2", type: "numeric", answer: 2480, tolerance: 1 },
    { id: "fe3", type: "numeric", answer: 2000, tolerance: 1 },
    { id: "fe4", type: "numeric", answer: 6000, tolerance: 1 },
  ],
};

const isSubmittedAnswer = (value: unknown): value is SubmittedAnswer => {
  if (!value || typeof value !== "object") return false;
  const answer = value as Record<string, unknown>;
  return typeof answer.questionId === "string" && typeof answer.given === "string";
};

const gradeAnswer = (question: ExamQuestion, given: string) => {
  const normalized = given.trim();
  if (question.type === "mcq") return normalized === question.answer;
  if (question.type === "numeric") {
    const numeric = Number(normalized.replace(/,/g, ""));
    return Number.isFinite(numeric) && Math.abs(numeric - question.answer) <= (question.tolerance ?? 0.01);
  }
  return normalized.toLowerCase().includes(question.answer.toLowerCase());
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => null);
    const courseSlug = typeof body?.courseSlug === "string" ? body.courseSlug.trim() : "";
    const exam = finalExams[courseSlug];
    if (!exam) {
      return new Response(JSON.stringify({ error: "Invalid course" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const submitted = Array.isArray(body?.answers) ? body.answers : [];
    if (submitted.length !== exam.length || !submitted.every(isSubmittedAnswer)) {
      return new Response(JSON.stringify({ error: "Invalid answers" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const byQuestionId = new Map(submitted.map((answer) => [answer.questionId, answer.given.slice(0, 100)]));
    const graded = exam.map((question) => {
      const given = byQuestionId.get(question.id);
      if (given === undefined) throw new Error("Missing answer");
      return { questionId: question.id, given: given.trim(), correct: gradeAnswer(question, given) };
    });

    const score = (graded.filter((answer) => answer.correct).length / exam.length) * 100;
    const passed = score >= 70;

    const adminClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error: attemptError } = await adminClient.from("academy_exam_attempts").insert({
      user_id: userData.user.id,
      course_slug: courseSlug,
      score_pct: score,
      passed,
      answers: graded,
      submitted_at: new Date().toISOString(),
    });
    if (attemptError) throw attemptError;

    let certificate = null;
    if (passed) {
      const existing = await adminClient
        .from("academy_certificates")
        .select("id, certificate_no, final_score")
        .eq("user_id", userData.user.id)
        .eq("course_slug", courseSlug)
        .maybeSingle();
      if (existing.error) throw existing.error;

      if (existing.data) {
        certificate = existing.data;
      } else {
        const issued = await adminClient
          .from("academy_certificates")
          .insert({ user_id: userData.user.id, course_slug: courseSlug, final_score: score })
          .select("id, certificate_no, final_score")
          .single();
        if (issued.error) throw issued.error;
        certificate = issued.data;
      }
    }

    return new Response(JSON.stringify({ score, passed, answers: graded, certificate }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (_error) {
    return new Response(JSON.stringify({ error: "Unable to submit exam" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});