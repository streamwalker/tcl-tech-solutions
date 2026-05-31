import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";

const inputCls = "mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-sm";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs font-medium text-muted-foreground">
      {label}
      {children}
    </label>
  );
}

interface LeadFormProps {
  source: "pilot" | "demo";
  title: string;
  subtitle: string;
  successTitle: string;
  successBody: React.ReactNode;
}

export default function LeadForm({ source, title, subtitle, successTitle, successBody }: LeadFormProps) {
  const [sp] = useSearchParams();
  const tier = sp.get("tier");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", rs520Count: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setErr(null);
    const { error } = await supabase.from("urc_bridge_leads").insert({
      name: form.name || null,
      email: form.email.trim(),
      company: form.company || null,
      role: form.role || null,
      rs520_count: form.rs520Count ? Number(form.rs520Count) : null,
      message: form.message || null,
      source,
      tier,
    });
    setBusy(false);
    if (error) {
      setErr("Could not submit. Please check your email address and try again.");
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <UrcBridgeShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
          <h1 className="text-3xl font-semibold tracking-tight">{successTitle}</h1>
          <div className="mt-3 max-w-md text-muted-foreground">{successBody}</div>
        </div>
      </UrcBridgeShell>
    );
  }

  return (
    <UrcBridgeShell>
      <div className="py-16">
        <div className="mx-auto max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight font-display">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {subtitle}
            {tier && <> Tier of interest: <span className="font-mono text-foreground">{tier}</span>.</>}
          </p>
          <form onSubmit={onSubmit} className="mt-8 space-y-4 rounded-xl border border-border bg-card p-6">
            <Field label="Name"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" /></Field>
            <Field label="Email *"><input required type="email" className={inputCls} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} autoComplete="email" /></Field>
            <Field label="Company / dealership *"><input required className={inputCls} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} autoComplete="organization" /></Field>
            <Field label="Your role"><input className={inputCls} value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Owner, lead programmer, …" /></Field>
            <Field label="RS520 installs"><input className={inputCls} type="number" min={0} value={form.rs520Count} onChange={(e) => setForm({ ...form, rs520Count: e.target.value })} /></Field>
            <Field label="Notes"><textarea className={inputCls} rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></Field>
            {err && <p className="text-sm text-destructive">{err}</p>}
            <button type="submit" disabled={busy} className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60">
              {busy ? "Submitting…" : source === "pilot" ? "Request my pilot invite" : "Submit demo request"}
            </button>
          </form>
        </div>
      </div>
    </UrcBridgeShell>
  );
}