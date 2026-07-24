import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { status: 200, headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return json(401, { error: "Missing authorization" });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
    const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Identify caller from their own JWT
    const supabaseUser = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await supabaseUser.auth.getUser();
    if (userErr || !userData?.user) {
      return json(401, { error: "Invalid token" });
    }
    const uid = userData.user.id;

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // a. Remove caller's files from job-photos
    const { data: photoRows, error: photoListErr } = await admin
      .from("service_order_photos")
      .select("storage_path")
      .eq("uploaded_by", uid);
    if (photoListErr) throw new Error(`list photos: ${photoListErr.message}`);
    const photoPaths = (photoRows ?? [])
      .map((r: { storage_path: string | null }) => r.storage_path)
      .filter((p): p is string => !!p);
    if (photoPaths.length > 0) {
      const { error } = await admin.storage.from("job-photos").remove(photoPaths);
      if (error) throw new Error(`remove job-photos: ${error.message}`);
    }

    // b. Remove caller's files from job-signatures
    const { data: sigRows, error: sigListErr } = await admin
      .from("service_order_signoffs")
      .select("signature_path")
      .eq("captured_by", uid);
    if (sigListErr) throw new Error(`list signoffs: ${sigListErr.message}`);
    const sigPaths = (sigRows ?? [])
      .map((r: { signature_path: string | null }) => r.signature_path)
      .filter((p): p is string => !!p);
    if (sigPaths.length > 0) {
      const { error } = await admin.storage.from("job-signatures").remove(sigPaths);
      if (error) throw new Error(`remove job-signatures: ${error.message}`);
    }

    // c. delete photo rows
    {
      const { error } = await admin.from("service_order_photos").delete().eq("uploaded_by", uid);
      if (error) throw new Error(`delete service_order_photos: ${error.message}`);
    }
    // d. delete notes
    {
      const { error } = await admin.from("service_order_notes").delete().eq("author_id", uid);
      if (error) throw new Error(`delete service_order_notes: ${error.message}`);
    }
    // e. delete signoffs
    {
      const { error } = await admin.from("service_order_signoffs").delete().eq("captured_by", uid);
      if (error) throw new Error(`delete service_order_signoffs: ${error.message}`);
    }
    // f. null out technician assignments
    {
      const { error } = await admin
        .from("service_orders")
        .update({ technician_id: null })
        .eq("technician_id", uid);
      if (error) throw new Error(`clear service_orders.technician_id: ${error.message}`);
    }
    // g. delete user roles
    {
      const { error } = await admin.from("user_roles").delete().eq("user_id", uid);
      if (error) throw new Error(`delete user_roles: ${error.message}`);
    }
    // h. profiles (skip silently if table absent)
    try {
      const { error } = await admin.from("profiles").delete().eq("user_id", uid);
      if (error && !/relation .* does not exist|schema cache/i.test(error.message)) {
        // try id column
        const { error: error2 } = await admin.from("profiles").delete().eq("id", uid);
        if (error2 && !/relation .* does not exist|schema cache/i.test(error2.message)) {
          throw new Error(`delete profiles: ${error2.message}`);
        }
      }
    } catch (_) {
      // silent skip
    }

    // i. delete auth user
    const { error: delErr } = await admin.auth.admin.deleteUser(uid);
    if (delErr) throw new Error(`auth.admin.deleteUser: ${delErr.message}`);

    return json(200, { deleted: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return json(500, { error: message });
  }
});