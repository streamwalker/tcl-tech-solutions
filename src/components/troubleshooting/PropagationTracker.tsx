import { useEffect, useState } from "react";
import { Activity, CheckCircle2, ExternalLink, RotateCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "dns-propagation-tracker";
const DEFAULT_DOMAIN = "www.tcltechsolutions.com";
const MAX_MS = 72 * 60 * 60 * 1000;

type TrackerState = {
  domain: string;
  startedAt: string;
  activatedAt?: string;
};

function formatElapsed(ms: number): string {
  if (ms < 0) ms = 0;
  const m = Math.floor(ms / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  const rm = m % 60;
  if (h < 24) return `${h}h ${rm}m`;
  const d = Math.floor(h / 24);
  return `${d}d ${h % 24}h`;
}

function statusFor(elapsedMs: number): { label: string; tone: string } {
  const min = elapsedMs / 60000;
  if (min < 15) return { label: "Just submitted — give it a few minutes", tone: "text-gray-300" };
  if (min < 240) return { label: "Likely propagating now", tone: "text-yellow-500" };
  if (min < 24 * 60) return { label: "Should be active in most regions", tone: "text-yellow-400" };
  if (min < 72 * 60) return { label: "Edge cases still resolving", tone: "text-orange-400" };
  return { label: "Past the normal window — recheck records", tone: "text-red-400" };
}

function formatTime(d: Date): string {
  return d.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

export default function PropagationTracker() {
  const [state, setState] = useState<TrackerState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [domainInput, setDomainInput] = useState(DEFAULT_DOMAIN);
  const [backfill, setBackfill] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!state || state.activatedAt) return;
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, [state]);

  function save(next: TrackerState | null) {
    setState(next);
    try {
      if (next) localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  function startNow() {
    save({ domain: domainInput.trim() || DEFAULT_DOMAIN, startedAt: new Date().toISOString() });
  }

  function startBackfill() {
    if (!backfill) return;
    const d = new Date(backfill);
    if (isNaN(d.getTime())) return;
    save({ domain: domainInput.trim() || DEFAULT_DOMAIN, startedAt: d.toISOString() });
  }

  function markActive() {
    if (!state) return;
    save({ ...state, activatedAt: new Date().toISOString() });
  }

  function reset() {
    save(null);
    setBackfill("");
  }

  if (!hydrated) {
    return (
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <Activity className="w-5 h-5" /> Propagation tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-500">Loading…</CardContent>
      </Card>
    );
  }

  // Success state
  if (state?.activatedAt) {
    const total = new Date(state.activatedAt).getTime() - new Date(state.startedAt).getTime();
    return (
      <Card className="bg-gray-900 border-green-900/60 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="w-5 h-5" /> Domain is active
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-300">
          <p>
            <span className="font-mono text-yellow-400">{state.domain}</span> went live after{" "}
            <span className="font-semibold text-white">{formatElapsed(total)}</span>.
          </p>
          <Button variant="outline" size="sm" onClick={reset} className="gap-2">
            <RotateCcw className="w-3.5 h-3.5" /> Track a new change
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Setup state
  if (!state) {
    return (
      <Card className="bg-gray-900 border-gray-800 mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-500">
            <Activity className="w-5 h-5" /> Propagation tracker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-gray-300">
          <p>Record when you saved your DNS change and we'll show how far along propagation should be.</p>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">Domain</label>
            <Input
              value={domainInput}
              onChange={(e) => setDomainInput(e.target.value)}
              placeholder={DEFAULT_DOMAIN}
              className="bg-gray-800 border-gray-700 text-white font-mono"
            />
          </div>
          <div className="flex flex-wrap gap-3">
            <Button onClick={startNow} className="bg-yellow-500 hover:bg-yellow-400 text-black">
              I just updated my DNS record
            </Button>
          </div>
          <div className="pt-3 border-t border-gray-800 space-y-2">
            <label className="text-xs uppercase tracking-wider text-gray-500">Updated earlier?</label>
            <div className="flex flex-wrap gap-2">
              <Input
                type="datetime-local"
                value={backfill}
                onChange={(e) => setBackfill(e.target.value)}
                className="bg-gray-800 border-gray-700 text-white max-w-xs"
              />
              <Button variant="outline" onClick={startBackfill} disabled={!backfill}>
                Use this time
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Tracking state
  const startedAt = new Date(state.startedAt);
  const elapsed = now - startedAt.getTime();
  const pct = Math.min(100, (elapsed / MAX_MS) * 100);
  const status = statusFor(elapsed);
  const etaStart = new Date(startedAt.getTime() + 15 * 60 * 1000);
  const etaEnd = new Date(startedAt.getTime() + 4 * 60 * 60 * 1000);

  return (
    <Card className="bg-gray-900 border-gray-800 mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-yellow-500">
          <Activity className="w-5 h-5" /> Propagation tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm text-gray-300">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <span className="font-mono text-yellow-400">{state.domain}</span>
          <span className="text-xs text-gray-500">started {formatTime(startedAt)}</span>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-3xl font-bold text-white">{formatElapsed(elapsed)}</span>
            <span className={`text-xs font-medium ${status.tone}`}>{status.label}</span>
          </div>
          <Progress value={pct} className="h-2" />
          <div className="relative h-4 mt-1 text-[10px] text-gray-500">
            <span className="absolute left-0">0</span>
            <span className="absolute" style={{ left: `${(0.25 / 72) * 100}%` }}>15m</span>
            <span className="absolute" style={{ left: `${(4 / 72) * 100}%` }}>4h</span>
            <span className="absolute" style={{ left: `${(24 / 72) * 100}%` }}>24h</span>
            <span className="absolute right-0">72h</span>
          </div>
        </div>

        <div className="rounded-md border border-gray-800 bg-black/40 p-3 text-xs">
          <p className="text-gray-500 uppercase tracking-wider mb-1">Likely active window</p>
          <p className="text-gray-200">
            {formatTime(etaStart)} <span className="text-gray-500">→</span> {formatTime(etaEnd)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <a
            href={`https://dnschecker.org/#A/${encodeURIComponent(state.domain)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm" className="gap-2">
              Check DNS now <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </a>
          <Button size="sm" onClick={markActive} className="bg-green-600 hover:bg-green-500 text-white">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" /> Mark as active
          </Button>
          <Button variant="outline" size="sm" onClick={reset} className="gap-2">
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}