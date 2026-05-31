import { Link } from "react-router-dom";
import { UrcBridgeShell } from "@/modules/urc-bridge/components/UrcBridgeShell";
import { CodeBlock } from "@/modules/urc-bridge/components/CodeBlock";

export default function UrcBridgeJoshAiDocs() {
  return (
    <UrcBridgeShell>
      <div className="py-16 max-w-3xl mx-auto">
        <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
          <Link to="/products/urc-bridge/docs" className="hover:underline">← Docs</Link>
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight font-display">Josh AI Integration Guide</h1>
        <p className="mt-3 text-muted-foreground">
          Wire the bridge into Josh AI: Custom HTTP Device config, Josh-tuned aliases, and
          sample utterances. The bridge contract is already shaped to accept Josh voice intents
          — no Rose-specific knowledge required on the Josh side.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">1. Add a Custom HTTP Device in Josh</h2>
          <p className="mt-2 text-muted-foreground">
            In the Josh DevSuite or admin console, add a new HTTP Device with the base URL
            pointing at the bridge on the LAN:
          </p>
          <CodeBlock code={`Name:     Hi-Fi Rose (Living Room)
Base URL: http://192.168.1.10:8088
Room:     Living Room
Type:     AVR / Streamer`} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">2. Map Josh intents to /v1 endpoints</h2>
          <CodeBlock title="josh-intents.json" code={`{
  "power.on":       { "method": "POST", "path": "/v1/power",  "body": { "state": "on" } },
  "power.off":      { "method": "POST", "path": "/v1/power",  "body": { "state": "off" } },
  "source.optical": { "method": "POST", "path": "/v1/source", "body": { "input": "OPTICAL" } },
  "source.earc":    { "method": "POST", "path": "/v1/source", "body": { "input": "EARC" } },
  "volume.up":      { "method": "POST", "path": "/v1/volume", "body": { "delta": 2 } },
  "volume.down":    { "method": "POST", "path": "/v1/volume", "body": { "delta": -2 } },
  "state":          { "method": "GET",  "path": "/v1/state" }
}`} />
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">3. Sample utterances</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            <li>"Josh, turn on the Rose."</li>
            <li>"Josh, switch the Rose to optical."</li>
            <li>"Josh, turn the Rose down two."</li>
            <li>"Josh, what's playing on the Rose?"</li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold tracking-tight">4. Universal Translator (/v2)</h2>
          <p className="mt-2 text-muted-foreground">
            With /v2 ingress, Josh can drive non-Rose devices through the same bridge — e.g.
            "turn on the living room lights" routes to Control4 via the canonical capability
            model. See the <Link to="/products/urc-bridge" className="text-primary hover:underline">overview page</Link> for the hub-and-spoke diagram.
          </p>
          <CodeBlock code={`curl -X POST http://192.168.1.10:8088/v2/ingress/josh \\
  -H 'content-type: application/json' \\
  -d '{"utterance":"turn on the living room lights"}'`} />
        </section>

        <div className="mt-12">
          <Link to="/products/urc-bridge/josh-ai" className="text-sm text-muted-foreground">
            Looking for end-customer Josh.ai training?{" "}
          </Link>
          <Link to="/josh-ai-tutorial" className="text-sm text-primary hover:underline">
            See the homeowner tutorial →
          </Link>
        </div>
      </div>
    </UrcBridgeShell>
  );
}