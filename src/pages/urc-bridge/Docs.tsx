import { Link } from "react-router-dom";
import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { CodeBlock } from "@/modules/urc-bridge/components/CodeBlock";

const endpoints = [
  { method: "GET", path: "/v1/health", desc: "Bridge uptime, version, last poll status." },
  { method: "GET", path: "/v1/state", desc: "Current Rose state: power, source, volume, playing." },
  { method: "POST", path: "/v1/power", body: `{ "state": "on" | "off" }`, desc: "Power the Rose on or off." },
  { method: "POST", path: "/v1/source", body: `{ "input": "LINE_IN" | "OPTICAL" | "EARC" | "USB" | "AES_EBU" }`, desc: "Switch the active input source." },
  { method: "POST", path: "/v1/volume", body: `{ "level": 0..100 } or { "delta": -10..10 }`, desc: "Set absolute volume or apply a relative delta." },
];

const env = [
  { key: "ROSE_HOST", default: "192.168.1.50", desc: "IPv4 address of the RS520." },
  { key: "ROSE_PORT", default: "9283", desc: "Rose HTTP control port." },
  { key: "ROSE_DISCOVERY", default: "false", desc: "Scan local /24 for the RS520 at startup." },
  { key: "ROSE_FIRMWARE_PIN", default: "5.9.02", desc: "Validated firmware build for this bridge." },
  { key: "BRIDGE_HOST", default: "0.0.0.0", desc: "Bind address for the bridge HTTP server." },
  { key: "BRIDGE_PORT", default: "8088", desc: "Port URC / Josh AI talk to." },
  { key: "POLL_INTERVAL_MS", default: "1000", desc: "Rose state poll interval." },
];

export default function UrcBridgeDocs() {
  return (
    <UrcBridgeShell>
      <div className="py-16 grid gap-12 lg:grid-cols-[200px_1fr]">
        <aside className="hidden lg:sticky lg:top-32 lg:block lg:self-start">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">On this page</p>
          <nav className="flex flex-col gap-2 text-sm">
            <a href="#install" className="text-muted-foreground hover:text-foreground">Install</a>
            <a href="#configure" className="text-muted-foreground hover:text-foreground">Configure</a>
            <a href="#run" className="text-muted-foreground hover:text-foreground">Run</a>
            <a href="#contract" className="text-muted-foreground hover:text-foreground">Bridge contract</a>
            <a href="#troubleshooting" className="text-muted-foreground hover:text-foreground">Troubleshooting</a>
          </nav>
        </aside>

        <article className="min-w-0">
          <h1 className="text-4xl font-semibold tracking-tight font-display">Documentation</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            urc-rose-bridge is a single self-contained binary. No Node, no Docker, no package
            manager — copy it onto a Mac mini or any always-on host on the same LAN as the RS520.
          </p>

          <Link
            to="/products/urc-bridge/docs/deployment"
            className="mt-6 flex items-start justify-between gap-4 rounded-xl border border-primary/40 bg-card p-5 hover:border-primary"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Dealer guide</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">URC Deployment Guide</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Step-by-step manual for installing the bridge and wiring it into URC Total Control 2.0 or MX HomePro.
              </p>
            </div>
            <span className="text-primary">→</span>
          </Link>

          <Link
            to="/products/urc-bridge/docs/josh-ai"
            className="mt-3 flex items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 hover:border-primary/60"
          >
            <div>
              <p className="font-mono text-[11px] uppercase tracking-wider text-primary">Voice control</p>
              <h2 className="mt-1 text-xl font-semibold tracking-tight">Josh AI Integration Guide</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Wire the bridge into Josh AI: Custom HTTP Device config, Josh-tuned aliases, sample utterances.
              </p>
            </div>
            <span className="text-primary">→</span>
          </Link>

          <section id="install" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Install</h2>
            <p className="mt-2 text-muted-foreground">macOS arm64 (Apple Silicon).</p>
            <CodeBlock code={`tar xzf urc-rose-bridge-macos-arm64.tar.gz
cd urc-rose-bridge-macos-arm64

# Binaries are unsigned — strip the Gatekeeper quarantine bit:
xattr -dr com.apple.quarantine .`} />
          </section>

          <section id="configure" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Configure</h2>
            <p className="mt-2 text-muted-foreground">
              All config is environment variables. Copy <code className="font-mono text-primary">.env.example</code>{" "}
              to <code className="font-mono text-primary">.env</code> and edit.
            </p>
            <div className="mt-4 overflow-hidden rounded-lg border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-secondary/40 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <tr><th className="px-4 py-2">Variable</th><th className="px-4 py-2">Default</th><th className="px-4 py-2">Description</th></tr>
                </thead>
                <tbody>
                  {env.map((row) => (
                    <tr key={row.key} className="border-t border-border">
                      <td className="px-4 py-2 font-mono text-primary">{row.key}</td>
                      <td className="px-4 py-2 font-mono text-muted-foreground">{row.default}</td>
                      <td className="px-4 py-2 text-muted-foreground">{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="run" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Run</h2>
            <CodeBlock code={`./urc-rose-bridge
# INFO Bridge listening on http://0.0.0.0:8088
# INFO Rose target:        http://192.168.1.50:9283`} />
          </section>

          <section id="contract" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Bridge contract</h2>
            <p className="mt-2 text-muted-foreground">
              Stable across firmware versions. This is the same surface Josh AI hits in Phase 4.
            </p>
            <div className="mt-4 space-y-3">
              {endpoints.map((e) => (
                <div key={e.path} className="rounded-lg border border-border bg-card p-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="rounded bg-secondary px-2 py-0.5 font-mono text-[11px] uppercase">{e.method}</span>
                    <code className="font-mono text-primary">{e.path}</code>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
                  {e.body && (
                    <pre className="mt-2 overflow-x-auto rounded bg-background/60 p-2 font-mono text-xs text-muted-foreground">{e.body}</pre>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section id="troubleshooting" className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">Troubleshooting</h2>
            <dl className="mt-4 space-y-5">
              <div>
                <dt className="font-semibold">macOS blocks the binary on first launch.</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Run <code className="font-mono">xattr -dr com.apple.quarantine .</code> in the unpacked directory.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">/v1/health returns <code className="font-mono">"ok": false</code>.</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  The bridge is up but can't reach the Rose. Check <code className="font-mono">ROSE_HOST</code> and that the Mac is on the same VLAN.
                </dd>
              </div>
              <div>
                <dt className="font-semibold">Source change has no effect after a firmware update.</dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  Re-run <code className="font-mono">urc-rose-probe --host … --write</code>. If endpoints have shifted, ship a bridge update.
                </dd>
              </div>
            </dl>
          </section>
        </article>
      </div>
    </UrcBridgeShell>
  );
}