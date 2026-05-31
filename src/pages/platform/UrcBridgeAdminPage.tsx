import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  company: string | null;
  role: string | null;
  rs520_count: number | null;
  message: string | null;
  source: string;
  tier: string | null;
  created_at: string;
}

export default function UrcBridgeAdminPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("urc_bridge_leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (!error && data) setLeads(data as Lead[]);
  };

  useEffect(() => { load(); }, []);

  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    await supabase.from("urc_bridge_leads").delete().eq("id", id);
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const filtered = filter === "all" ? leads : leads.filter((l) => l.source === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">URC Bridge Leads</h1>
          <p className="text-sm text-muted-foreground">
            Pilot, demo, and firmware-alert subscribers from the URC ↔ Rose ↔ Josh AI product micro-site.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
          >
            <option value="all">All sources ({leads.length})</option>
            <option value="pilot">Pilot</option>
            <option value="demo">Demo</option>
            <option value="subscribe">Subscribe</option>
          </select>
          <Button variant="outline" size="sm" onClick={load}>
            <RefreshCw className="h-4 w-4 mr-1" /> Refresh
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading…
        </div>
      ) : filtered.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">No leads yet.</Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((l) => (
            <Card key={l.id} className="p-4">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{l.name || "(no name)"}</span>
                    <Badge variant="outline">{l.source}</Badge>
                    {l.tier && <Badge variant="secondary">{l.tier}</Badge>}
                    <span className="text-xs text-muted-foreground">
                      {new Date(l.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    {l.email}
                    {l.company && <> · {l.company}</>}
                    {l.role && <> · {l.role}</>}
                    {l.rs520_count != null && <> · {l.rs520_count} RS520</>}
                  </div>
                  {l.message && (
                    <p className="mt-2 text-sm whitespace-pre-wrap">{l.message}</p>
                  )}
                </div>
                <Button variant="ghost" size="icon" onClick={() => remove(l.id)} aria-label="Delete">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}