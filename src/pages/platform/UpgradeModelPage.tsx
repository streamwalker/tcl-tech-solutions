import { ExternalLink } from "lucide-react";

/**
 * Hosts the standalone Upgrade Membership Platform tool (TCL_Upgrade_Platform.html)
 * served from /public. Embedding the validated HTML as-is is the only way to
 * satisfy the integrationSpec.json fidelityContract (exact Arial 14px font,
 * pixel-perfect spacing, exact 0.25s ease tooltip motion, calculation engine
 * matching the spreadsheet model, full 30-term glossary + 107 tooltips).
 */
export default function UpgradeModelPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-3rem)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div>
          <h1 className="text-sm font-bold tracking-wide">Upgrade Membership Platform</h1>
          <p className="text-xs text-muted-foreground">
            Deal modeling, portfolio economics, and AT&amp;T comparison
          </p>
        </div>
        <a
          href="/tcl-upgrade-platform.html"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          Open in new tab <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <iframe
        src="/tcl-upgrade-platform.html"
        title="TCL Upgrade Membership Platform"
        className="flex-1 w-full border-0 bg-[#eef1f6]"
      />
    </div>
  );
}