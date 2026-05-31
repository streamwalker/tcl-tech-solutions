import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function SubscribeForm({ source = "subscribe" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const { error } = await supabase
      .from("urc_bridge_leads")
      .insert({ email: email.trim(), source: "subscribe", message: `via ${source}` });
    setBusy(false);
    if (error) {
      setErr("Could not submit. Check your email address.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <p className="text-sm text-primary">
        Subscribed. You will receive Rose firmware compatibility notes here.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <input
        required
        type="email"
        placeholder="you@dealer.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
      />
      <button
        disabled={busy}
        className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {busy ? "Subscribing…" : "Get firmware alerts"}
      </button>
      {err && <p className="w-full text-xs text-destructive">{err}</p>}
    </form>
  );
}