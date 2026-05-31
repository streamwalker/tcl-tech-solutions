import { Link } from "react-router-dom";
import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { PricingTiers } from "@/modules/urc-bridge/components/PricingTiers";
import { SubscribeForm } from "@/modules/urc-bridge/components/SubscribeForm";

const ROI = [
  ["Dealer billable rate", "$125/hr", "$250/hr"],
  ["Hours saved per Rose firmware drop", "10", "25"],
  ["Rose firmware drops per year", "5", "8"],
  ["Annual labor recovered", "$6,250", "$50,000"],
  ["Dealer Toolkit annual cost", "$7,383", "$7,383"],
  ["Net first-year ROI", "−$1,133", "+$42,617"],
  ["Net every year after", "−$133", "+$47,612"],
];

const MAINT = [
  { tag: "[ T+24h ]", h: "Advance notice", p: "Subscribers get notified within 24 hours of a Rose firmware drop, before homeowners auto-update." },
  { tag: "[ T+72h ]", h: "Compatibility certificate", p: "We run the regression suite on the new firmware. Certificate goes out within 72 hours: pass, fail, or pass-with-patch." },
  { tag: "[ T+7d ]", h: "Patched bridge image", p: "If a patch is required, the new bridge container is published within seven days. URC project is unaffected." },
  { tag: "[ ROLLBACK ]", h: "Rollback support", p: "If Rose firmware causes a regression too deep for a clean patch, we publish a documented rollback procedure." },
];

export default function UrcBridgePricing() {
  return (
    <UrcBridgeShell>
      <section className="py-12">
        <div className="inline-flex items-center rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Pricing
        </div>
        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold tracking-tight font-display">Three plans. Public prices.</h1>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground">
          Every plan includes the bridge software, the URC Accelerator 3 driver package,
          ongoing firmware-compatibility maintenance, per-firmware compatibility certificates,
          and access to this dealer portal with full audit logging.
        </p>
      </section>

      <section className="pb-16">
        <PricingTiers />
      </section>

      <section className="pb-16">
        <h2 className="text-2xl font-semibold tracking-tight">What "firmware-drift maintenance" means</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {MAINT.map((f) => (
            <div key={f.h} className="rounded-lg border border-border bg-card p-5">
              <div className="font-mono text-[11px] uppercase tracking-wider text-primary">{f.tag}</div>
              <h3 className="mt-2 font-semibold">{f.h}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <h2 className="text-2xl font-semibold tracking-tight">How the math runs at the dealer level</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">Conservative numbers from existing customers:</p>
        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-4 py-2">Variable</th><th className="px-4 py-2">Conservative</th><th className="px-4 py-2">Aggressive</th></tr>
            </thead>
            <tbody>
              {ROI.map((row) => (
                <tr key={row[0]} className="border-t border-border">
                  <td className="px-4 py-2">{row[0]}</td>
                  <td className="px-4 py-2 font-mono">{row[1]}</td>
                  <td className="px-4 py-2 font-mono">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="pb-24">
        <h2 className="text-2xl font-semibold tracking-tight">Firmware alerts</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Get the compatibility notes regardless of whether you have a contract with us.
        </p>
        <div className="mt-4"><SubscribeForm source="pricing-page" /></div>
        <p className="mt-8 text-sm text-muted-foreground">
          For 50+ deployments or hospitality, contact us about Enterprise.{" "}
          <Link to="/products/urc-bridge/demo?tier=enterprise" className="text-primary hover:underline">
            Discuss enterprise terms →
          </Link>
        </p>
      </section>
    </UrcBridgeShell>
  );
}