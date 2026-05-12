import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, CheckCircle2, ExternalLink, Globe, Clock, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const LOVABLE_IP = "185.158.133.1";

const Mono = ({ children }: { children: React.ReactNode }) => (
  <code className="px-1.5 py-0.5 rounded bg-gray-800 text-yellow-400 font-mono text-sm">{children}</code>
);

export default function TroubleshootingDns() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        <Link to="/" className="inline-flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-8 text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to home
        </Link>

        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-900/60 text-red-300 text-xs uppercase tracking-wider mb-4">
            <AlertTriangle className="w-3.5 h-3.5" /> DNS Troubleshooting
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Fixing <span className="text-yellow-500">DNS_PROBE_FINISHED_NXDOMAIN</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            Your browser asked DNS for a hostname and got back "no such name." The site isn't down —
            the address record is missing or hasn't propagated yet. Most of the time this is a one-line
            DNS fix at your registrar.
          </p>
        </header>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500">
              <Globe className="w-5 h-5" /> Quick diagnosis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <p><span className="text-gray-500">Symptom:</span> <Mono>www.tcltechsolutions.com</Mono> returns <Mono>NXDOMAIN</Mono>.</p>
            <p><span className="text-gray-500">Root cause:</span> there is no <Mono>A</Mono> record for the <Mono>www</Mono> subdomain at the registrar.</p>
            <p><span className="text-gray-500">Reference:</span> <Mono>tcl.streamwalkers.com</Mono> is live, so the project itself is healthy.</p>
          </CardContent>
        </Card>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold mb-4 text-yellow-500">Step-by-step fix</h2>
          <ol className="space-y-4">
            {[
              <>Sign in to the DNS registrar for <Mono>tcltechsolutions.com</Mono>.</>,
              <>Open the <strong>DNS</strong> or <strong>Zone editor</strong> for the domain.</>,
              <>
                Add a new record:
                <ul className="mt-2 ml-4 space-y-1 text-sm">
                  <li>Type: <Mono>A</Mono></li>
                  <li>Name / Host: <Mono>www</Mono></li>
                  <li>Value / Points to: <Mono>{LOVABLE_IP}</Mono></li>
                  <li>TTL: default (Auto or 3600)</li>
                </ul>
              </>,
              <>Confirm the root record also exists — Type <Mono>A</Mono>, Name <Mono>@</Mono>, Value <Mono>{LOVABLE_IP}</Mono>.</>,
              <>Remove any conflicting old <Mono>A</Mono>, <Mono>AAAA</Mono>, or <Mono>CNAME</Mono> records on <Mono>www</Mono>.</>,
              <>If <Mono>CAA</Mono> records are present, ensure they allow <Mono>letsencrypt.org</Mono>.</>,
              <>Save changes.</>,
            ].map((step, i) => (
              <li key={i} className="flex gap-4 p-4 rounded-lg bg-gray-900/60 border border-gray-800">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500 text-black flex items-center justify-center font-bold text-sm">{i + 1}</span>
                <div className="flex-1 text-gray-300 leading-relaxed">{step}</div>
              </li>
            ))}
          </ol>
        </section>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500">
              <Clock className="w-5 h-5" /> Verify propagation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-gray-300">
            <p>
              Check from outside your network:{" "}
              <a
                href="https://dnschecker.org/#A/www.tcltechsolutions.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-yellow-500 hover:text-yellow-400 underline"
              >
                dnschecker.org <ExternalLink className="w-3 h-3" />
              </a>
            </p>
            <p>Expected: most regions return <Mono>{LOVABLE_IP}</Mono>.</p>
            <p className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              Propagation usually takes minutes, but can take up to 72 hours.
            </p>
            <p>
              In Lovable: <strong>Project Settings → Domains</strong> will move from
              <Mono>Verifying</Mono> → <Mono>Setting up</Mono> → <Mono>Active</Mono>.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-500">
              <Shield className="w-5 h-5" /> Using Cloudflare or another proxy?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-300 space-y-2">
            <p>
              Re-add the domain in Lovable with{" "}
              <strong>"Domain uses Cloudflare or a similar proxy"</strong> checked. That switches
              verification from an A-record check to a CNAME-based one and avoids SSL handshake errors.
            </p>
          </CardContent>
        </Card>

        <section className="mb-10">
          <h2 className="text-2xl font-serif font-bold mb-4 text-yellow-500">Still failing?</h2>
          <ul className="space-y-2 text-gray-300 text-sm list-disc list-inside">
            <li>Confirm the registrar is using the correct nameservers for the zone.</li>
            <li>Check DNSSEC — if you changed providers recently, stale DS records will block resolution.</li>
            <li>Look for a conflicting wildcard <Mono>*</Mono> record overriding <Mono>www</Mono>.</li>
            <li>
              Flush your browser DNS cache —{" "}
              <Mono>chrome://net-internals/#dns</Mono> → <strong>Clear host cache</strong>.
            </li>
            <li>Run <Mono>dig www.tcltechsolutions.com</Mono> from a terminal to see what's actually returned.</li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-800">
          <Link to="/" className="text-yellow-500 hover:text-yellow-400 text-sm">← Home</Link>
          <a
            href="https://docs.lovable.dev/features/custom-domain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-500 hover:text-yellow-400 text-sm inline-flex items-center gap-1"
          >
            Lovable custom domain docs <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}