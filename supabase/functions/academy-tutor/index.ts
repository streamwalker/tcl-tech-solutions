const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { courseTitle, chapterTitle, lessonTitle, lessonBody, history } = await req.json();

    const system = `You are ClawdBot, an expert AI tutor for TCL Academy. The student is studying:

Course: ${courseTitle}
Chapter: ${chapterTitle}
Lesson: ${lessonTitle}

LESSON CONTENT:
${(lessonBody ?? "").slice(0, 4000)}

Help the student understand this lesson. Re-explain concepts in plain English, walk through worked examples step by step, and generate practice problems on request. Keep replies focused on this lesson. Use markdown formatting.`;

    const messages = [
      { role: "system", content: system },
      ...((history ?? []) as { role: string; content: string }[]).map((m) => ({ role: m.role, content: m.content })),
    ];

    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({ model: "google/gemini-2.5-flash", messages }),
    });
    if (!resp.ok) {
      const text = await resp.text();
      return new Response(JSON.stringify({ error: text }), { status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
    const data = await resp.json();
    const reply = data.choices?.[0]?.message?.content ?? "(no reply)";
    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});