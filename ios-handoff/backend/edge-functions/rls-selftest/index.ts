import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

type Result = { name: string; passed: boolean; detail?: string };
const results: Result[] = [];

const expect = (name: string, ok: boolean, detail?: string) => {
  results.push({ name, passed: ok, detail: ok ? undefined : detail });
};

const expectDenied = async (name: string, p: Promise<{ error: unknown; data?: unknown }>) => {
  const { error } = await p;
  expect(name, !!error, error ? undefined : "expected error, got success");
};

const expectOk = async (name: string, p: Promise<{ error: unknown }>) => {
  const { error } = await p;
  expect(name, !error, error ? JSON.stringify(error) : undefined);
};

const newUser = async (admin: SupabaseClient) => {
  const email = `rls-test+${crypto.randomUUID()}@example.invalid`;
  const password = crypto.randomUUID() + "Aa1!";
  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });
  if (error || !data.user) throw new Error("createUser failed: " + error?.message);
  const userClient = createClient(SUPABASE_URL, ANON_KEY);
  const signIn = await userClient.auth.signInWithPassword({ email, password });
  if (signIn.error) throw new Error("signIn failed: " + signIn.error.message);
  return { id: data.user.id, client: userClient, email, password };
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Admin-only: require caller to be authenticated as admin
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const callerClient = createClient(SUPABASE_URL, ANON_KEY, {
    global: { headers: { Authorization: authHeader } },
  });
  const { data: caller } = await callerClient.auth.getUser();
  if (!caller?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  const admin = createClient(SUPABASE_URL, SERVICE_KEY);
  const { data: roleRow } = await admin
    .from("user_roles").select("role")
    .eq("user_id", caller.user.id).eq("role", "admin").maybeSingle();
  if (!roleRow) {
    return new Response(JSON.stringify({ error: "Forbidden — admin only" }), {
      status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const anon = createClient(SUPABASE_URL, ANON_KEY);
  let userA: Awaited<ReturnType<typeof newUser>> | null = null;
  let userB: Awaited<ReturnType<typeof newUser>> | null = null;

  try {
    userA = await newUser(admin);
    userB = await newUser(admin);

    // ---------- academy_exam_attempts ----------
    await expectDenied("exam: anon insert denied",
      anon.from("academy_exam_attempts").insert({
        user_id: userA.id, course_slug: "accounting", score_pct: 100, passed: true,
      }));

    await expectDenied("exam: user direct insert denied (WITH CHECK false)",
      userA.client.from("academy_exam_attempts").insert({
        user_id: userA.id, course_slug: "accounting", score_pct: 100, passed: true,
      }));

    // Seed an attempt as service_role so we can test SELECT/UPDATE rules
    const seedA = await admin.from("academy_exam_attempts").insert({
      user_id: userA.id, course_slug: "accounting", score_pct: 80, passed: true, answers: [],
    }).select("id").single();
    expect("exam: service_role insert ok", !seedA.error, JSON.stringify(seedA.error));

    await expectDenied("exam: user update own denied",
      userA.client.from("academy_exam_attempts")
        .update({ score_pct: 100 }).eq("user_id", userA.id));

    const aSeesB = await userA.client.from("academy_exam_attempts")
      .select("id").eq("user_id", userB.id);
    expect("exam: user A cannot see user B rows",
      !aSeesB.error && (aSeesB.data?.length ?? 0) === 0,
      JSON.stringify(aSeesB));

    const aSeesOwn = await userA.client.from("academy_exam_attempts")
      .select("id").eq("user_id", userA.id);
    expect("exam: user A sees own rows",
      !aSeesOwn.error && (aSeesOwn.data?.length ?? 0) >= 1,
      JSON.stringify(aSeesOwn));

    // submit-final-exam: invalid course
    const badCourse = await userA.client.functions.invoke("submit-final-exam", {
      body: { courseSlug: "nope", answers: [] },
    });
    expect("submit-final-exam: invalid course rejected",
      !!badCourse.error, JSON.stringify(badCourse));

    // submit-final-exam: no JWT
    const noJwt = await fetch(`${SUPABASE_URL}/functions/v1/submit-final-exam`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: ANON_KEY },
      body: JSON.stringify({ courseSlug: "accounting", answers: [] }),
    });
    expect("submit-final-exam: missing JWT → 401",
      noJwt.status === 401, `status=${noJwt.status}`);
    await noJwt.text();

    // ---------- academy_certificates ----------
    await expectDenied("cert: anon insert denied",
      anon.from("academy_certificates").insert({
        user_id: userA.id, course_slug: "accounting", final_score: 100,
      }));
    await expectDenied("cert: auth user insert denied",
      userA.client.from("academy_certificates").insert({
        user_id: userA.id, course_slug: "accounting", final_score: 100,
      }));

    const certSeed = await admin.from("academy_certificates").insert({
      user_id: userA.id, course_slug: "accounting", final_score: 90,
    }).select("id").single();
    expect("cert: service_role insert ok", !certSeed.error, JSON.stringify(certSeed.error));

    await expectDenied("cert: user update denied",
      userA.client.from("academy_certificates")
        .update({ final_score: 100 }).eq("user_id", userA.id));
    await expectDenied("cert: user delete denied",
      userA.client.from("academy_certificates").delete().eq("user_id", userA.id));

    const bSeesA = await userB.client.from("academy_certificates")
      .select("id").eq("user_id", userA.id);
    expect("cert: user B cannot see user A cert",
      !bSeesA.error && (bSeesA.data?.length ?? 0) === 0, JSON.stringify(bSeesA));

    // ---------- contact_submissions ----------
    await expectOk("contact: anon valid insert ok",
      anon.from("contact_submissions").insert({
        name: "Test User", email: "test@example.com",
        phone: "210-555-0101", project_type: "residential",
        message: "Hello",
      }));

    await expectDenied("contact: invalid email rejected",
      anon.from("contact_submissions").insert({
        name: "X", email: "not-an-email",
        phone: "210-555-0101", project_type: "residential",
      }));
    await expectDenied("contact: short name rejected",
      anon.from("contact_submissions").insert({
        name: "", email: "ok@example.com",
        phone: "210-555-0101", project_type: "residential",
      }));
    await expectDenied("contact: bad project_type rejected",
      anon.from("contact_submissions").insert({
        name: "X", email: "ok@example.com",
        phone: "210-555-0101", project_type: "haxx",
      }));
    await expectDenied("contact: oversized message rejected",
      anon.from("contact_submissions").insert({
        name: "X", email: "ok@example.com",
        phone: "210-555-0101", project_type: "residential",
        message: "a".repeat(2001),
      }));

    const anonRead = await anon.from("contact_submissions").select("id");
    expect("contact: anon select returns 0 rows",
      !anonRead.error && (anonRead.data?.length ?? 0) === 0, JSON.stringify(anonRead));
    const userRead = await userA.client.from("contact_submissions").select("id");
    expect("contact: non-admin select returns 0 rows",
      !userRead.error && (userRead.data?.length ?? 0) === 0, JSON.stringify(userRead));

    // ---------- regression sweep on user-scoped tables ----------
    type Sweep = { table: string; payload: Record<string, unknown> };
    const sweeps: Sweep[] = [
      { table: "clients", payload: { name: "X" } },
      { table: "products", payload: { name: "X", model: "M", manufacturer: "Mfg", category: "C" } },
      { table: "proposals", payload: { title: "X" } },
      { table: "projects", payload: { title: "X" } },
      { table: "service_orders", payload: { title: "X" } },
      { table: "profit_analyses", payload: { project_title: "X" } },
      { table: "academy_enrollments", payload: { course_slug: "accounting" } },
      { table: "academy_progress", payload: { course_slug: "accounting", chapter_slug: "c", lesson_slug: "l" } },
      { table: "academy_quiz_attempts", payload: { course_slug: "accounting", chapter_slug: "c" } },
    ];

    for (const s of sweeps) {
      await expectDenied(`${s.table}: anon insert denied`,
        anon.from(s.table).insert({ ...s.payload, user_id: userA.id }));
      await expectDenied(`${s.table}: insert with foreign user_id denied`,
        userA.client.from(s.table).insert({ ...s.payload, user_id: userB.id }));
      const r = await userB.client.from(s.table).select("id").eq("user_id", userA.id);
      expect(`${s.table}: cross-user select returns 0`,
        !r.error && (r.data?.length ?? 0) === 0, JSON.stringify(r));
    }

    const passed = results.filter((r) => r.passed).length;
    const failed = results.filter((r) => !r.passed);
    return new Response(JSON.stringify({
      summary: `${passed}/${results.length} passed`,
      failed,
      results,
    }, null, 2), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: "selftest crashed",
      message: (err as Error).message,
      partial: results,
    }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } finally {
    if (userA) await admin.auth.admin.deleteUser(userA.id).catch(() => {});
    if (userB) await admin.auth.admin.deleteUser(userB.id).catch(() => {});
  }
});