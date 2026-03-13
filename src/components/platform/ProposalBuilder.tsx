import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Eye, Loader2, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ProposalPrintView from "./ProposalPrintView";

interface ProposalItem {
  id: string;
  product_name: string;
  room: string;
  qty: number;
  unit_price: number;
}

interface Proposal {
  id: string;
  title: string;
  status: string;
  labor_hours: number;
  labor_rate: number;
  notes: string;
  created_at: string;
  client_id: string | null;
  clients?: { name: string } | null;
  proposal_items?: ProposalItem[];
}

interface ClientOption { id: string; name: string; }

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Sent: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Declined: "bg-red-100 text-red-800",
};

export default function ProposalBuilder() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Proposal | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", clientId: "", laborHours: "0", laborRate: "150", notes: "" });
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const [{ data: p }, { data: c }] = await Promise.all([
      supabase.from("proposals").select("*, clients(name), proposal_items(*)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").order("name"),
    ]);
    setProposals((p as Proposal[]) || []);
    setClientOptions((c as ClientOption[]) || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("proposals").insert({
      user_id: user.id, title: form.title, client_id: form.clientId || null,
      labor_hours: parseFloat(form.laborHours) || 0, labor_rate: parseFloat(form.laborRate) || 150, notes: form.notes,
    });
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Proposal created" });
    setShowCreate(false);
    setForm({ title: "", clientId: "", laborHours: "0", laborRate: "150", notes: "" });
    load();
  };

  const calcTotal = (p: Proposal) => {
    const items = p.proposal_items || [];
    const products = items.reduce((s, i) => s + i.qty * Number(i.unit_price), 0);
    const labor = Number(p.labor_hours) * Number(p.labor_rate);
    return { products, labor, total: products + labor };
  };

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proposals & Sales</h1>
          <p className="text-muted-foreground">Create and manage client proposals</p>
        </div>
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" />New Proposal</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{proposals.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Accepted</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{proposals.filter(p => p.status === "Accepted").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-blue-600">{proposals.filter(p => p.status === "Sent").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pipeline Value</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{fmt(proposals.filter(p => p.status !== "Declined").reduce((s, p) => s + calcTotal(p).total, 0))}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead><TableHead>Client</TableHead><TableHead>Status</TableHead>
                <TableHead className="text-right">Products</TableHead><TableHead className="text-right">Labor</TableHead>
                <TableHead className="text-right">Total</TableHead><TableHead>Date</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((p) => {
                const t = calcTotal(p);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.clients?.name || "—"}</TableCell>
                    <TableCell><Badge className={statusColors[p.status] || ""}>{p.status}</Badge></TableCell>
                    <TableCell className="text-right">{fmt(t.products)}</TableCell>
                    <TableCell className="text-right">{fmt(t.labor)}</TableCell>
                    <TableCell className="text-right font-bold">{fmt(t.total)}</TableCell>
                    <TableCell>{new Date(p.created_at).toLocaleDateString()}</TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => setViewing(p)}><Eye className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                );
              })}
              {proposals.length === 0 && <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No proposals yet</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />{viewing?.title}</DialogTitle></DialogHeader>
          {viewing && (() => {
            const t = calcTotal(viewing);
            return (
              <div className="space-y-4">
                <div className="flex gap-4 text-sm items-center">
                  <div><span className="text-muted-foreground">Client:</span> <span className="font-medium">{viewing.clients?.name || "—"}</span></div>
                  <Badge className={statusColors[viewing.status] || ""}>{viewing.status}</Badge>
                  <div className="ml-auto">
                    <Button variant="outline" size="sm" onClick={() => window.print()}>
                      <Download className="h-4 w-4 mr-2" />Download PDF
                    </Button>
                  </div>
                </div>
                {(viewing.proposal_items || []).length > 0 && (
                  <Table>
                    <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Room</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Unit Price</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader>
                    <TableBody>
                      {(viewing.proposal_items || []).map((i) => (
                        <TableRow key={i.id}><TableCell>{i.product_name}</TableCell><TableCell>{i.room}</TableCell><TableCell className="text-right">{i.qty}</TableCell><TableCell className="text-right">{fmt(Number(i.unit_price))}</TableCell><TableCell className="text-right font-medium">{fmt(i.qty * Number(i.unit_price))}</TableCell></TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div><p className="text-xs text-muted-foreground">Products</p><p className="text-lg font-bold">{fmt(t.products)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Labor ({viewing.labor_hours}h × {fmt(Number(viewing.labor_rate))}/h)</p><p className="text-lg font-bold">{fmt(t.labor)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Grand Total</p><p className="text-lg font-bold text-primary">{fmt(t.total)}</p></div>
                </div>
                {viewing.notes && <p className="text-sm text-muted-foreground italic">{viewing.notes}</p>}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {viewing && <ProposalPrintView proposal={viewing} />}

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Create New Proposal</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Whole-Home Smart Automation" /></div>
            <div><Label>Client</Label>
              <Select value={form.clientId} onValueChange={(v) => setForm({ ...form, clientId: v })}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>{clientOptions.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Labor Hours</Label><Input type="number" value={form.laborHours} onChange={(e) => setForm({ ...form, laborHours: e.target.value })} /></div>
              <div><Label>Labor Rate ($/hr)</Label><Input type="number" value={form.laborRate} onChange={(e) => setForm({ ...form, laborRate: e.target.value })} /></div>
            </div>
            <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
            <Button className="w-full" onClick={handleCreate} disabled={saving || !form.title}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Create Proposal</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
