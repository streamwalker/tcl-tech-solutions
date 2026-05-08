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

Tutoring rules:
- Ground every answer in the LESSON CONTENT above. If the student asks something outside this lesson, briefly answer then steer back.
- Default to STEP-BY-STEP explanations: number each step ("Step 1:", "Step 2:", ...), show the reasoning, and end with a 1-sentence "Takeaway".
- For calculations, show the formula, substitute values, then compute. Use fenced code blocks for math/code.
- Re-explain in plain English when asked, generate practice problems on request, and offer a follow-up question at the end.
- Use markdown: headings, **bold** key terms, bullet lists, and tables when comparing.`;

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
      let friendly = text;
      if (resp.status === 429) friendly = "Tutor is rate-limited right now. Please try again in a moment.";
      if (resp.status === 402) friendly = "AI credits are exhausted. Please add credits in Lovable Cloud → Workspace → Usage.";
      return new Response(JSON.stringify({ error: friendly }), { status: resp.status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
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