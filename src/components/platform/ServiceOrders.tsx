import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Wrench, Clock, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ChecklistItem { id: string; item: string; done: boolean; }
interface ServiceOrder {
  id: string; title: string; description: string; priority: string; status: string;
  technician: string; scheduled_for: string | null; time_spent: number; created_at: string;
  client_id: string | null; clients?: { name: string } | null;
  service_order_checklist?: ChecklistItem[];
}
interface ClientOption { id: string; name: string; }

const priorityColors: Record<string, string> = { Low: "bg-muted text-muted-foreground", Medium: "bg-yellow-100 text-yellow-800", High: "bg-orange-100 text-orange-800", Urgent: "bg-red-100 text-red-800" };
const statusColors: Record<string, string> = { Open: "bg-red-100 text-red-800", Assigned: "bg-yellow-100 text-yellow-800", "In Progress": "bg-blue-100 text-blue-800", Resolved: "bg-green-100 text-green-800" };

export default function ServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [clientOptions, setClientOptions] = useState<ClientOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ServiceOrder | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ title: "", clientId: "", priority: "Medium", description: "", technician: "", scheduledFor: "" });
  const { toast } = useToast();

  useEffect(() => { load(); }, []);

  const load = async () => {
    setLoading(true);
    const [{ data: o }, { data: c }] = await Promise.all([
      supabase.from("service_orders").select("*, clients(name), service_order_checklist(*)").order("created_at", { ascending: false }),
      supabase.from("clients").select("id, name").order("name"),
    ]);
    setOrders((o as ServiceOrder[]) || []);
    setClientOptions((c as ClientOption[]) || []);
    setLoading(false);
  };

  const handleCreate = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("service_orders").insert({
      user_id: user.id, title: form.title, client_id: form.clientId || null,
      priority: form.priority, description: form.description, technician: form.technician,
      scheduled_for: form.scheduledFor || null,
    });
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Service order created" });
    setShowCreate(false);
    setForm({ title: "", clientId: "", priority: "Medium", description: "", technician: "", scheduledFor: "" });
    load();
  };

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Service Orders</h1>
          <p className="text-muted-foreground">Field service tickets and maintenance</p>
        </div>
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" />New Service Order</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><AlertCircle className="h-3 w-3" />Open</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-red-600">{orders.filter(o => o.status === "Open").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />In Progress</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === "In Progress" || o.status === "Assigned").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Resolved</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{orders.filter(o => o.status === "Resolved").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><Wrench className="h-3 w-3" />Total Hours</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{orders.reduce((s, o) => s + Number(o.time_spent), 0)}h</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead><TableHead>Client</TableHead><TableHead>Priority</TableHead>
                <TableHead>Status</TableHead><TableHead>Technician</TableHead><TableHead>Scheduled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id} className="cursor-pointer" onClick={() => setSelected(o)}>
                  <TableCell className="font-medium">{o.title}</TableCell>
                  <TableCell>{o.clients?.name || "—"}</TableCell>
                  <TableCell><Badge className={priorityColors[o.priority] || ""}>{o.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[o.status] || ""}>{o.status}</Badge></TableCell>
                  <TableCell>{o.technician || <span className="text-muted-foreground italic">Unassigned</span>}</TableCell>
                  <TableCell>{o.scheduled_for || "—"}</TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No service orders</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><Wrench className="h-5 w-5" />{selected?.title}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <Badge className={priorityColors[selected.priority] || ""}>{selected.priority}</Badge>
                <Badge className={statusColors[selected.status] || ""}>{selected.status}</Badge>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Client:</span> {selected.clients?.name || "—"}</p>
                <p><span className="text-muted-foreground">Technician:</span> {selected.technician || "Unassigned"}</p>
                <p><span className="text-muted-foreground">Created:</span> {new Date(selected.created_at).toLocaleDateString()}</p>
                <p><span className="text-muted-foreground">Scheduled:</span> {selected.scheduled_for || "Not scheduled"}</p>
                <p><span className="text-muted-foreground">Time Spent:</span> {selected.time_spent}h</p>
              </div>
              {selected.description && <p className="text-sm bg-muted/50 p-3 rounded-lg">{selected.description}</p>}
              {(selected.service_order_checklist || []).length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Checklist</p>
                  <div className="space-y-2">
                    {(selected.service_order_checklist || []).map((c) => (
                      <div key={c.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className={`h-4 w-4 ${c.done ? "text-green-600" : "text-muted-foreground/30"}`} />
                        <span className={c.done ? "line-through text-muted-foreground" : ""}>{c.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Service Order</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Brief description" /></div>
            <div><Label>Client</Label>
              <Select value={form.clientId} onValueChange={(v) => setForm({ ...form, clientId: v })}>
                <SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>{clientOptions.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Priority</Label>
                <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem><SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem><SelectItem value="Urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Technician</Label><Input value={form.technician} onChange={(e) => setForm({ ...form, technician: e.target.value })} placeholder="Name" /></div>
            </div>
            <div><Label>Scheduled For</Label><Input type="date" value={form.scheduledFor} onChange={(e) => setForm({ ...form, scheduledFor: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <Button className="w-full" onClick={handleCreate} disabled={saving || !form.title}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Create Service Order</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
