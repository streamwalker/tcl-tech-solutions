import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { CodeBlock } from "@/modules/urc-bridge/components/CodeBlock";

type CardProps = {
  eyebrow: string;
  size: string;
  title: string;
  description: string;
  href: string;
  primary?: boolean;
  secondary?: { href: string; label: string };
};

function DownloadCard(p: CardProps) {
  const cls = p.primary
    ? "rounded-xl border border-primary/40 bg-card p-6 shadow-[0_0_60px_-30px_hsl(var(--primary))]"
    : "rounded-xl border border-border bg-card p-6";
  const eyebrowCls = p.primary
    ? "font-mono text-[11px] uppercase tracking-wider text-primary"
    : "font-mono text-[11px] uppercase tracking-wider text-muted-foreground";
  return (
    <div className={cls}>
      <div className="flex items-center justify-between">
        <span className={eyebrowCls}>{p.eyebrow}</span>
        <span className="font-mono text-[11px] text-muted-foreground">{p.size}</span>
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-tight">{p.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <a
          href={p.href}
          download
          className={
            p.primary
              ? "inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
              : "inline-flex items-center gap-2 rounded-md border border-border bg-secondary px-4 py-2 text-sm font-medium hover:bg-secondary/70"
          }
        >
          Download →
        </a>
        {p.secondary && (
          <a href={p.secondary.href} download className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground hover:bg-secondary">
            {p.secondary.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function UrcBridgeDownload() {
  return (
    <UrcBridgeShell>
      <div className="py-16">
        <h1 className="text-4xl font-semibold tracking-tight font-display">Download</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Everything a dealer needs to deploy the bridge: source bundle, one-shot installer,
          and the architecture references.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <DownloadCard
            eyebrow="bridge · source"
            size="~64 KB · tar.gz"
            title="urc-rose-bridge v1.0.0 (source)"
            description="Full bridge service + Universal Translator (/v1 + /v2), Dockerfile, probe CLI, and installer scripts. Build with bun, run with docker compose, or compile a self-contained binary."
            href="/downloads/urc-bridge/urc-rose-bridge-v1.0.0.tar.gz"
            primary
          />
          <DownloadCard
            eyebrow="installer · macOS"
            size="3 shell scripts"
            title="One-shot installer"
            description="install.sh registers the launchd daemon, update.sh pulls the release manifest, uninstall.sh removes everything cleanly."
            href="/downloads/urc-bridge/install.sh"
            secondary={{ href: "/downloads/urc-bridge/update.sh", label: "update.sh" }}
          />
          <DownloadCard
            eyebrow="docs · plan"
            size="DOCX"
            title="URC RS520 ↔ Josh AI Implementation Plan"
            description="The full phased architecture document — Phase 0 probe through Phase 4 Josh AI integration."
            href="/downloads/urc-bridge/URC_RS520_JoshAI_Implementation_Plan.docx"
          />
          <DownloadCard
            eyebrow="docs · architecture"
            size="DOCX"
            title="Universal Translator Architecture"
            description="Hub-and-spoke canonical model: capabilities, mappings, adapters, router, and ingress."
            href="/downloads/urc-bridge/Universal_Translator_Architecture.docx"
          />
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          First-run note: the installer scripts are not yet code-signed. Right-click → Open the
          first time on macOS to bypass Gatekeeper.
        </p>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">First-run checklist</h2>
          <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm text-muted-foreground max-w-3xl">
            <li>Pick an always-on Mac on the same VLAN as the RS520 (a Mac mini is ideal).</li>
            <li>
              Extract the bundle and run the installer (sudo required for launchd):
              <CodeBlock code={`tar xzf urc-rose-bridge-v1.0.0.tar.gz
cd installer
sudo ./install.sh`} />
            </li>
            <li>
              Set <code className="font-mono text-primary">ROSE_HOST</code> in <code className="font-mono text-primary">/usr/local/etc/urc-rose-bridge/.env</code>.
            </li>
            <li>
              Verify: <code className="font-mono">curl http://127.0.0.1:8088/v1/health</code> returns <code className="font-mono">"ok": true</code>.
            </li>
          </ol>
        </section>
      </div>
    </UrcBridgeShell>
  );
}