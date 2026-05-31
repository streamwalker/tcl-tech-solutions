import { Link } from "react-router-dom";
import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { CodeBlock } from "@/modules/urc-bridge/components/CodeBlock";

export default function UrcBridgeDeploymentDocs() {
  return (
    <UrcBridgeShell>
      <div className="py-16 max-w-3xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          <Link to="/products/urc-bridge/docs" className="hover:underline">← Docs</Link>
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight font-display">URC Deployment Guide</h1>
        <p className="mt-3 text-muted-foreground">
          Step-by-step manual for URC dealers and integrators. Covers Mac mini bridge install
          and integration with URC Total Control 2.0 (Accelerator 3) and MX HomePro.
        </p>

        <div className="mt-6">
          <a
            href="/downloads/urc-bridge/URC_RS520_JoshAI_Implementation_Plan.docx"
            download
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            Download full plan (DOCX)
          </a>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">1. Architecture</h2>
          <p className="mt-2 text-muted-foreground">
            urc-rose-bridge is a small HTTP service that exposes the Hi-Fi Rose RS520 as a clean
            JSON API on the local network. URC processors do not talk to the RS520 directly; they
            talk to this bridge, which translates URC commands into Rose control calls.
          </p>
          <CodeBlock code={`Rose RS520 ──LAN── Mac mini (urc-rose-bridge :8088) ──LAN── URC MRX / HomePro ──RF/IP── Handhelds + Keypads`} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">2. Bill of materials</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Mac mini (Apple Silicon M1 or newer), wired Ethernet, configured to never sleep.</li>
            <li>Hi-Fi Rose RS520 on the same VLAN as the Mac mini, with a static IP or DHCP reservation.</li>
            <li>URC processor: MRX-series (Total Control 2.0) OR MX HomePro hub.</li>
            <li>URC Accelerator 3 (Windows) or the MX HomePro mobile app.</li>
            <li>Admin access to the client's router / managed switch.</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">3. Network plan</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
            <li>Assign static IPs / DHCP reservations to the RS520, Mac mini, and URC processor.</li>
            <li>Keep all three on the same VLAN, or allow TCP 8088 from URC VLAN → Mac mini, and 9283 from Mac mini → RS520.</li>
            <li><strong>Do not</strong> forward port 8088 from the WAN — the bridge has no external authentication.</li>
            <li>Allow incoming connections to urc-rose-bridge the first time macOS prompts.</li>
          </ol>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">4. One-shot installer</h2>
          <p className="mt-2 text-muted-foreground">Registers a launchd daemon, sets up logs, and enables nightly auto-update.</p>
          <CodeBlock code={`tar xzf urc-rose-bridge-installer.tar.gz
cd urc-rose-bridge-installer
sudo ./install.sh`} />
          <p className="mt-2 text-sm text-muted-foreground">
            Grab the installer on the <Link to="/products/urc-bridge/download" className="text-primary hover:underline">download page</Link>.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">5. Update / rollback</h2>
          <CodeBlock code={`# Update from the release manifest
sudo /usr/local/bin/urc-rose-bridge-update

# Roll back to the previous version
sudo /usr/local/bin/urc-rose-bridge-update --rollback`} />
        </section>
      </div>
    </UrcBridgeShell>
  );
}