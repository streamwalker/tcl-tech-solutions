import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { CodeBlock } from "@/modules/urc-bridge/components/CodeBlock";

const PHASES = [
  { n: "0", t: "Probe", d: "Scan the LAN, hit every Rose endpoint, write a JSON report. Run once per firmware update.", s: "shipped" },
  { n: "1", t: "Bridge service", d: "Fastify on :8088 exposing /v1/*. URC's IP driver targets this contract.", s: "shipped" },
  { n: "2", t: "URC driver", d: "Custom IP driver in Total Control hits /v1/* — no changes when Rose ships firmware.", s: "shipped" },
  { n: "3", t: "Dealer rollout kit", d: "One-shot installer, launchd daemon, sha256-verified auto-update from the release manifest.", s: "shipped" },
  { n: "4", t: "Josh AI", d: "Same /v1/* contract powers voice control via Josh AI's HTTP integration.", s: "shipped" },
  { n: "5", t: "Universal Translator (/v2)", d: "Canonical hub-and-spoke router across Control4, URC, and Josh AI. Issue a command from any ecosystem, target any other.", s: "shipped" },
];

export default function UrcBridgeLanding() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "URC ↔ Hi-Fi Rose RS520 ↔ Josh AI Bridge",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "macOS (Apple Silicon)",
    softwareVersion: "1.0.0",
    description:
      "Stable HTTP bridge between URC Total Control, the Hi-Fi Rose RS520, and Josh AI. Versioned /v1 contract plus a /v2 Universal Translator across Control4, URC, and Josh.",
    url: "https://www.tcltechsolutions.com/products/urc-bridge",
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: "0",
      url: "https://www.tcltechsolutions.com/products/urc-bridge/pricing",
    },
    publisher: { "@type": "Organization", name: "The Connected Lifestyle" },
  };
  return (
    <UrcBridgeShell>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <section className="pt-16 pb-12 sm:pt-20">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          v1.0.0 · Fastify · /v1 + /v2
        </div>
        <h1 className="mt-6 text-balance text-4xl sm:text-5xl font-semibold tracking-tight font-display">
          A stable bridge between <span className="text-primary">URC Total Control</span>,{" "}
          <span className="text-primary">Hi-Fi Rose RS520</span>, and{" "}
          <span className="text-primary">Josh AI</span>.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          The RS520's HTTP control surface is reverse-engineered and shifts between firmware
          releases. <span className="text-foreground font-medium">urc-rose-bridge</span> hides
          that behind a versioned <span className="font-mono text-foreground">/v1/*</span>{" "}
          contract, so URC's custom IP driver — and Josh AI — never have to change when Rose
          ships an update.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link to="/products/urc-bridge/download" className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            Download macOS arm64
          </Link>
          <Link to="/products/urc-bridge/docs" className="rounded-md border border-border px-5 py-2.5 text-sm font-medium hover:border-primary/60">
            Read the docs →
          </Link>
          <span className="font-mono text-xs text-muted-foreground">~57 MB · no Node required</span>
        </div>
      </section>

      <section className="pb-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-primary">The contract</p>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              One stable surface. Patch the bridge, not your URC project.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every endpoint URC's IP driver hits is documented, versioned, and tested against
              a pinned RS520 firmware build. When Rose breaks the underlying API, you ship a
              new bridge binary — the URC project is untouched.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                ["GET  /v1/health", "Bridge uptime + Rose reachability"],
                ["GET  /v1/state", "Power, source, volume, playing"],
                ["POST /v1/power", "{ state: 'on' | 'off' }"],
                ["POST /v1/source", "{ input: 'OPTICAL' | 'EARC' | … }"],
                ["POST /v1/volume", "{ level } or { delta }"],
              ].map(([path, desc]) => (
                <li key={path} className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                  <code className="text-primary font-mono">{path}</code>
                  <span className="text-muted-foreground">{desc}</span>
                </li>
              ))}
            </ul>
          </div>
          <CodeBlock
            title="curl"
            code={`curl http://127.0.0.1:8088/v1/state
# { "power":"on", "source":"OPTICAL", "volume":35, "playing":true }

curl -X POST -H 'content-type: application/json' \\
  -d '{"input":"EARC"}' \\
  http://127.0.0.1:8088/v1/source

curl -X POST -H 'content-type: application/json' \\
  -d '{"delta":-2}' \\
  http://127.0.0.1:8088/v1/volume`}
          />
        </div>
      </section>

      <section className="pb-16">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">Universal Translator</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
          /v2 — One canonical vocabulary across every ecosystem.
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Hub-and-spoke. Every ecosystem translates to and from one neutral vocabulary in the
          middle, instead of writing a converter for every pair. Issue a Josh voice intent;
          drive a Control4-only light. Issue a URC function; switch the Rose source.
        </p>
        <CodeBlock
          title="architecture"
          code={` Control4 ─┐                                   ┌─ Control4 devices
      URC ─┤  controllers   ┌───────────┐  device│   URC devices
  Josh AI ─┤ ─ translate ─► │ canonical │ ─ apply├─ Josh devices
           │   inbound      │   router  │  command│   Hi-Fi Rose (LIVE)
           └─ /v2/ingress   └───────────┘         └─ mock demo devices`}
        />
      </section>

      <section className="pb-24">
        <p className="font-mono text-xs uppercase tracking-wider text-primary">Roadmap</p>
        <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">Phased rollout</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((p) => (
            <div key={p.n} className="rounded-lg border border-border bg-card p-5 transition hover:border-primary/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">Phase {p.n}</span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-primary">{p.s}</span>
              </div>
              <h3 className="mt-3 font-semibold tracking-tight">{p.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
    </UrcBridgeShell>
  );
}