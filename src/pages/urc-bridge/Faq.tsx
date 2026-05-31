import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { SubscribeForm } from "@/modules/urc-bridge/components/SubscribeForm";
import { FAQS } from "@/modules/urc-bridge/data/faqs";

export default function UrcBridgeFaq() {
  return (
    <UrcBridgeShell>
      <div className="py-16 max-w-3xl mx-auto">
        <h1 className="text-4xl font-semibold tracking-tight font-display">FAQ</h1>
        <p className="mt-3 text-muted-foreground">
          Candid answers about firmware drift, Rose endorsement, URC dealer requirements,
          Josh AI, refunds, and SLAs.
        </p>
        <dl className="mt-10 space-y-6">
          {FAQS.map((f) => (
            <div key={f.q} className="rounded-lg border border-border bg-card p-5">
              <dt className="font-semibold tracking-tight">{f.q}</dt>
              <dd className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12 rounded-lg border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Subscribe to firmware compatibility notes</h2>
          <p className="mt-2 text-sm text-muted-foreground">Free, no contract required.</p>
          <div className="mt-4"><SubscribeForm source="faq-page" /></div>
        </div>
      </div>
    </UrcBridgeShell>
  );
}