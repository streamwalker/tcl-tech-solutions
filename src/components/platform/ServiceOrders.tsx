import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Wrench, Clock, CheckCircle2, AlertCircle } from "lucide-react";

interface ServiceOrder {
  id: string;
  title: string;
  client: string;
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "Assigned" | "In Progress" | "Resolved";
  technician: string;
  createdAt: string;
  scheduledFor: string;
  description: string;
  timeSpent: number;
  checklist: { item: string; done: boolean }[];
}

const mockOrders: ServiceOrder[] = [
  {
    id: "SO-001", title: "WiFi dead zones in master suite", client: "Johnson Family", priority: "High", status: "Assigned",
    technician: "Mike Thompson", createdAt: "2026-03-12", scheduledFor: "2026-03-14",
    description: "Client reports intermittent WiFi in master bedroom and bathroom. Suspect AP coverage gap.",
    timeSpent: 0,
    checklist: [{ item: "Site survey with WiFi analyzer", done: false }, { item: "Check AP firmware", done: false }, { item: "Add/relocate AP if needed", done: false }, { item: "Validate coverage", done: false }],
  },
  {
    id: "SO-002", title: "Lutron dimmer not responding", client: "Dr. Robert Chen", priority: "Medium", status: "In Progress",
    technician: "Sarah Davis", createdAt: "2026-03-10", scheduledFor: "2026-03-13",
    description: "Front lobby dimmer switch unresponsive. Other switches on same circuit working fine.",
    timeSpent: 1.5,
    checklist: [{ item: "Check physical wiring", done: true }, { item: "Test dimmer module", done: true }, { item: "Replace if faulty", done: false }, { item: "Re-program scene", done: false }],
  },
  {
    id: "SO-003", title: "Security camera offline - NE corner", client: "Sunset Ridge HOA", priority: "Urgent", status: "Open",
    technician: "", createdAt: "2026-03-13", scheduledFor: "",
    description: "Camera 7 (NE parking lot) offline since last night. No video feed on NVR.",
    timeSpent: 0,
    checklist: [{ item: "Check PoE port status", done: false }, { item: "Inspect cable run", done: false }, { item: "Test/replace camera", done: false }, { item: "Verify NVR recording", done: false }],
  },
  {
    id: "SO-004", title: "Annual maintenance - AV system", client: "TechCorp Inc.", priority: "Low", status: "Resolved",
    technician: "Mike Thompson", createdAt: "2026-03-01", scheduledFor: "2026-03-05",
    description: "Scheduled annual maintenance for conference room AV systems. Firmware updates and cable inspection.",
    timeSpent: 4,
    checklist: [{ item: "Update firmware on all devices", done: true }, { item: "Clean display screens", done: true }, { item: "Test all inputs/outputs", done: true }, { item: "Document config changes", done: true }],
  },
];

const priorityColors: Record<string, string> = { Low: "bg-muted text-muted-foreground", Medium: "bg-yellow-100 text-yellow-800", High: "bg-orange-100 text-orange-800", Urgent: "bg-red-100 text-red-800" };
const statusColors: Record<string, string> = { Open: "bg-red-100 text-red-800", Assigned: "bg-yellow-100 text-yellow-800", "In Progress": "bg-blue-100 text-blue-800", Resolved: "bg-green-100 text-green-800" };

export default function ServiceOrders() {
  const [selected, setSelected] = useState<ServiceOrder | null>(null);
  const [showCreate, setShowCreate] = useState(false);

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
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><AlertCircle className="h-3 w-3" />Open</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-red-600">{mockOrders.filter(o => o.status === "Open").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3 w-3" />In Progress</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-blue-600">{mockOrders.filter(o => o.status === "In Progress" || o.status === "Assigned").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><CheckCircle2 className="h-3 w-3" />Resolved</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{mockOrders.filter(o => o.status === "Resolved").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground flex items-center gap-1"><Wrench className="h-3 w-3" />Total Hours</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{mockOrders.reduce((s, o) => s + o.timeSpent, 0)}h</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Technician</TableHead>
                <TableHead>Scheduled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockOrders.map((o) => (
                <TableRow key={o.id} className="cursor-pointer" onClick={() => setSelected(o)}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="font-medium">{o.title}</TableCell>
                  <TableCell>{o.client}</TableCell>
                  <TableCell><Badge className={priorityColors[o.priority]}>{o.priority}</Badge></TableCell>
                  <TableCell><Badge className={statusColors[o.status]}>{o.status}</Badge></TableCell>
                  <TableCell>{o.technician || <span className="text-muted-foreground italic">Unassigned</span>}</TableCell>
                  <TableCell>{o.scheduledFor || "—"}</TableCell>
                </TableRow>
              ))}
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
                <Badge className={priorityColors[selected.priority]}>{selected.priority}</Badge>
                <Badge className={statusColors[selected.status]}>{selected.status}</Badge>
              </div>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Client:</span> {selected.client}</p>
                <p><span className="text-muted-foreground">Technician:</span> {selected.technician || "Unassigned"}</p>
                <p><span className="text-muted-foreground">Created:</span> {selected.createdAt}</p>
                <p><span className="text-muted-foreground">Scheduled:</span> {selected.scheduledFor || "Not scheduled"}</p>
                <p><span className="text-muted-foreground">Time Spent:</span> {selected.timeSpent}h</p>
              </div>
              <p className="text-sm bg-muted/50 p-3 rounded-lg">{selected.description}</p>
              <div>
                <p className="text-sm font-medium mb-2">Checklist</p>
                <div className="space-y-2">
                  {selected.checklist.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className={`h-4 w-4 ${c.done ? "text-green-600" : "text-muted-foreground/30"}`} />
                      <span className={c.done ? "line-through text-muted-foreground" : ""}>{c.item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader><DialogTitle>New Service Order</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Title</Label><Input placeholder="Brief description of issue" /></div>
            <div><Label>Client</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Johnson Family">Johnson Family</SelectItem>
                  <SelectItem value="TechCorp Inc.">TechCorp Inc.</SelectItem>
                  <SelectItem value="Dr. Robert Chen">Dr. Robert Chen</SelectItem>
                  <SelectItem value="Sunset Ridge HOA">Sunset Ridge HOA</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Priority</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div><Label>Description</Label><Textarea placeholder="Detailed description…" /></div>
            <Button className="w-full">Create Service Order</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
