import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, FileText, Eye } from "lucide-react";

interface ProposalItem {
  id: string;
  productName: string;
  room: string;
  qty: number;
  unitPrice: number;
}

interface Proposal {
  id: string;
  client: string;
  title: string;
  status: "Draft" | "Sent" | "Accepted" | "Declined";
  items: ProposalItem[];
  laborHours: number;
  laborRate: number;
  createdAt: string;
  notes: string;
}

const mockProposals: Proposal[] = [
  {
    id: "P-001", client: "Johnson Family", title: "Whole-Home Smart Automation", status: "Accepted",
    items: [
      { id: "i1", productName: "EA-5 Controller", room: "Equipment Rack", qty: 1, unitPrice: 2200 },
      { id: "i2", productName: "Caseta Smart Dimmer", room: "Living Room", qty: 8, unitPrice: 65 },
      { id: "i3", productName: "Sonos Arc Soundbar", room: "Living Room", qty: 1, unitPrice: 899 },
    ],
    laborHours: 24, laborRate: 150, createdAt: "2026-02-15", notes: "Phase 1 of 2-phase project."
  },
  {
    id: "P-002", client: "TechCorp Inc.", title: "Conference Room AV Package", status: "Sent",
    items: [
      { id: "i4", productName: "Sony 85\" 4K BRAVIA XR", room: "Main Conference", qty: 2, unitPrice: 2799 },
      { id: "i5", productName: "Crestron MC4-R Control System", room: "Main Conference", qty: 1, unitPrice: 3200 },
    ],
    laborHours: 40, laborRate: 175, createdAt: "2026-03-01", notes: "Includes cable pulls and rack build."
  },
  {
    id: "P-003", client: "Lakeway Resort", title: "Pool Area Audio System", status: "Draft",
    items: [
      { id: "i6", productName: "JL Audio Fathom f113v2", room: "Pool Deck", qty: 2, unitPrice: 4500 },
    ],
    laborHours: 16, laborRate: 150, createdAt: "2026-03-10", notes: ""
  },
];

const statusColors: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Sent: "bg-blue-100 text-blue-800",
  Accepted: "bg-green-100 text-green-800",
  Declined: "bg-red-100 text-red-800",
};

export default function ProposalBuilder() {
  const [proposals] = useState<Proposal[]>(mockProposals);
  const [viewing, setViewing] = useState<Proposal | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const calcTotal = (p: Proposal) => {
    const products = p.items.reduce((sum, i) => sum + i.qty * i.unitPrice, 0);
    const labor = p.laborHours * p.laborRate;
    return { products, labor, total: products + labor };
  };

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Proposals & Sales</h1>
          <p className="text-muted-foreground">Create and manage client proposals</p>
        </div>
        <Button onClick={() => setShowCreate(true)}><Plus className="h-4 w-4 mr-2" />New Proposal</Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Proposals</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{proposals.length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Accepted</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">{proposals.filter(p => p.status === "Accepted").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pending</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-blue-600">{proposals.filter(p => p.status === "Sent").length}</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pipeline Value</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{fmt(proposals.filter(p => p.status !== "Declined").reduce((s, p) => s + calcTotal(p).total, 0))}</p></CardContent></Card>
      </div>

      {/* Proposals List */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Products</TableHead>
                <TableHead className="text-right">Labor</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Date</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposals.map((p) => {
                const t = calcTotal(p);
                return (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell>{p.client}</TableCell>
                    <TableCell><Badge className={statusColors[p.status]}>{p.status}</Badge></TableCell>
                    <TableCell className="text-right">{fmt(t.products)}</TableCell>
                    <TableCell className="text-right">{fmt(t.labor)}</TableCell>
                    <TableCell className="text-right font-bold">{fmt(t.total)}</TableCell>
                    <TableCell>{p.createdAt}</TableCell>
                    <TableCell><Button variant="ghost" size="icon" onClick={() => setViewing(p)}><Eye className="h-4 w-4" /></Button></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Proposal Detail */}
      <Dialog open={!!viewing} onOpenChange={(o) => !o && setViewing(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />{viewing?.title}</DialogTitle></DialogHeader>
          {viewing && (() => {
            const t = calcTotal(viewing);
            return (
              <div className="space-y-4">
                <div className="flex gap-4 text-sm">
                  <div><span className="text-muted-foreground">Client:</span> <span className="font-medium">{viewing.client}</span></div>
                  <div><span className="text-muted-foreground">Date:</span> {viewing.createdAt}</div>
                  <Badge className={statusColors[viewing.status]}>{viewing.status}</Badge>
                </div>
                <Table>
                  <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Room</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Unit Price</TableHead><TableHead className="text-right">Total</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {viewing.items.map((i) => (
                      <TableRow key={i.id}><TableCell>{i.productName}</TableCell><TableCell>{i.room}</TableCell><TableCell className="text-right">{i.qty}</TableCell><TableCell className="text-right">{fmt(i.unitPrice)}</TableCell><TableCell className="text-right font-medium">{fmt(i.qty * i.unitPrice)}</TableCell></TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div><p className="text-xs text-muted-foreground">Products</p><p className="text-lg font-bold">{fmt(t.products)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Labor ({viewing.laborHours}h × {fmt(viewing.laborRate)}/h)</p><p className="text-lg font-bold">{fmt(t.labor)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Grand Total</p><p className="text-lg font-bold text-primary">{fmt(t.total)}</p></div>
                </div>
                {viewing.notes && <p className="text-sm text-muted-foreground italic">{viewing.notes}</p>}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>

      {/* Create Proposal Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Create New Proposal</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Proposal Title</Label><Input placeholder="e.g. Whole-Home Smart Automation" /></div>
            <div><Label>Client</Label>
              <Select><SelectTrigger><SelectValue placeholder="Select client" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Johnson Family">Johnson Family</SelectItem>
                  <SelectItem value="TechCorp Inc.">TechCorp Inc.</SelectItem>
                  <SelectItem value="Lakeway Resort">Lakeway Resort</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Labor Hours</Label><Input type="number" placeholder="0" /></div>
              <div><Label>Labor Rate ($/hr)</Label><Input type="number" placeholder="150" /></div>
            </div>
            <div><Label>Notes</Label><Textarea placeholder="Additional notes…" /></div>
            <Button className="w-full">Create Proposal</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
