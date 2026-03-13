import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  source: string;
  total_revenue: number;
  project_count: number;
  last_contact: string | null;
}

const statusColors: Record<string, string> = {
  Lead: "bg-yellow-100 text-yellow-800",
  Prospect: "bg-blue-100 text-blue-800",
  Client: "bg-green-100 text-green-800",
};

export default function ClientManagement() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Client | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", status: "Lead", source: "" });
  const { toast } = useToast();

  useEffect(() => { loadClients(); }, []);

  const loadClients = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("clients").select("*").order("name");
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    setClients((data as Client[]) || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("clients").insert({
      user_id: user.id, name: form.name, email: form.email, phone: form.phone,
      address: form.address, status: form.status, source: form.source,
    });
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Client added" });
    setShowAdd(false);
    setForm({ name: "", email: "", phone: "", address: "", status: "Lead", source: "" });
    loadClients();
  };

  const filtered = clients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const fmt = (n: number) => "$" + Number(n).toLocaleString();

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Client Management</h1>
          <p className="text-muted-foreground">Track leads, prospects, and clients</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" />Add Client</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["Lead", "Prospect", "Client"] as const).map((s) => (
          <Card key={s}><CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{s}s</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{clients.filter((c) => c.status === s).length}</div></CardContent></Card>
        ))}
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search clients…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Lead">Lead</SelectItem>
            <SelectItem value="Prospect">Prospect</SelectItem>
            <SelectItem value="Client">Client</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead><TableHead>Status</TableHead><TableHead>Source</TableHead>
                <TableHead>Contact</TableHead><TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Projects</TableHead><TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell><Badge className={statusColors[c.status] || ""}>{c.status}</Badge></TableCell>
                  <TableCell>{c.source}</TableCell>
                  <TableCell className="text-sm">{c.email}</TableCell>
                  <TableCell className="text-right">{fmt(c.total_revenue)}</TableCell>
                  <TableCell className="text-right">{c.project_count}</TableCell>
                  <TableCell>{c.last_contact || "—"}</TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No clients found</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selected?.name}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <Badge className={statusColors[selected.status] || ""}>{selected.status}</Badge>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{selected.email || "—"}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{selected.phone || "—"}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{selected.address || "—"}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-lg font-bold">{fmt(selected.total_revenue)}</p></div>
                <div><p className="text-xs text-muted-foreground">Projects</p><p className="text-lg font-bold">{selected.project_count}</p></div>
                <div><p className="text-xs text-muted-foreground">Source</p><p className="text-lg font-bold">{selected.source || "—"}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Client</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Client name" /></div>
            <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@example.com" /></div>
            <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(512) 555-0000" /></div>
            <div><Label>Address</Label><Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street address" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Status</Label>
                <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Lead">Lead</SelectItem>
                    <SelectItem value="Prospect">Prospect</SelectItem>
                    <SelectItem value="Client">Client</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Source</Label><Input value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} placeholder="e.g. Referral" /></div>
            </div>
            <Button className="w-full" onClick={handleAdd} disabled={saving || !form.name}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Add Client</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
