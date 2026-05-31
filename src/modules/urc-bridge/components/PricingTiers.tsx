import { Link } from "react-router-dom";
import { TIERS } from "../data/tiers";
import { Check } from "lucide-react";

export function PricingTiers() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TIERS.map((t) => (
        <div
          key={t.slug}
          className={`relative rounded-xl border p-6 flex flex-col ${
            t.featured
              ? "border-primary/60 bg-card shadow-[0_0_60px_-30px_hsl(var(--primary))]"
              : "border-border bg-card"
          }`}
        >
          {t.ribbon && (
            <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-0.5 font-mono text-[10px] uppercase tracking-wider text-primary-foreground">
              {t.ribbon}
            </span>
          )}
          <h3 className="text-lg font-semibold tracking-tight">{t.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{t.audience}</p>
          <div className="mt-5 flex items-baseline gap-2">
            <span className="text-3xl font-semibold">{t.setupPrice}</span>
            <span className="text-sm text-muted-foreground">setup</span>
          </div>
          <div className="mt-1 font-mono text-sm text-muted-foreground">+ {t.recurring}</div>
          <ul className="mt-6 space-y-2 text-sm flex-1">
            {t.bullets.map((b) => (
              <li key={b} className="flex gap-2">
                <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground">{b}</span>
              </li>
            ))}
          </ul>
          <Link
            to={t.ctaTo}
            className={`mt-6 inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium transition ${
              t.featured
                ? "bg-primary text-primary-foreground hover:opacity-90"
                : "border border-border hover:border-primary/60"
            }`}
          >
            {t.ctaLabel}
          </Link>
        </div>
      ))}
    </div>
  );
}