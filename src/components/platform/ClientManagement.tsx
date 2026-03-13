import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, Mail, Phone, MapPin } from "lucide-react";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "Lead" | "Prospect" | "Client";
  source: string;
  totalRevenue: number;
  projectCount: number;
  lastContact: string;
}

const mockClients: Client[] = [
  { id: "1", name: "Johnson Family", email: "mike.johnson@email.com", phone: "(512) 555-0134", address: "2401 Lake Austin Blvd, Austin TX", status: "Client", source: "Referral", totalRevenue: 48500, projectCount: 3, lastContact: "2026-03-10" },
  { id: "2", name: "TechCorp Inc.", email: "facilities@techcorp.com", phone: "(512) 555-0198", address: "300 W 6th St, Austin TX", status: "Client", source: "Website", totalRevenue: 125000, projectCount: 5, lastContact: "2026-03-12" },
  { id: "3", name: "Sarah Williams", email: "sarah.w@gmail.com", phone: "(512) 555-0267", address: "1800 Barton Creek Blvd, Austin TX", status: "Prospect", source: "Home Show", totalRevenue: 0, projectCount: 0, lastContact: "2026-03-08" },
  { id: "4", name: "Sunset Ridge HOA", email: "board@sunsetridge.org", phone: "(512) 555-0345", address: "500 Sunset Ridge Dr, Cedar Park TX", status: "Lead", source: "Cold Call", totalRevenue: 0, projectCount: 0, lastContact: "2026-03-05" },
  { id: "5", name: "Dr. Robert Chen", email: "rchen@dentalarts.com", phone: "(512) 555-0412", address: "4500 Medical Pkwy, Austin TX", status: "Client", source: "Referral", totalRevenue: 32000, projectCount: 2, lastContact: "2026-03-11" },
  { id: "6", name: "Lakeway Resort", email: "ops@lakewayresort.com", phone: "(512) 555-0501", address: "101 Lakeway Dr, Lakeway TX", status: "Prospect", source: "Website", totalRevenue: 0, projectCount: 0, lastContact: "2026-03-07" },
];

const statusColors: Record<string, string> = {
  Lead: "bg-yellow-100 text-yellow-800",
  Prospect: "bg-blue-100 text-blue-800",
  Client: "bg-green-100 text-green-800",
};

export default function ClientManagement() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Client | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  const filtered = mockClients.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Client Management</h1>
          <p className="text-muted-foreground">Track leads, prospects, and clients</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" />Add Client</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(["Lead", "Prospect", "Client"] as const).map((s) => (
          <Card key={s}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{s}s</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockClients.filter((c) => c.status === s).length}</div>
            </CardContent>
          </Card>
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
                <TableHead>Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead className="text-right">Revenue</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead>Last Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((c) => (
                <TableRow key={c.id} className="cursor-pointer" onClick={() => setSelected(c)}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell><Badge className={statusColors[c.status]}>{c.status}</Badge></TableCell>
                  <TableCell>{c.source}</TableCell>
                  <TableCell className="text-sm">{c.email}</TableCell>
                  <TableCell className="text-right">{fmt(c.totalRevenue)}</TableCell>
                  <TableCell className="text-right">{c.projectCount}</TableCell>
                  <TableCell>{c.lastContact}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Client Detail Dialog */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{selected?.name}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-4">
              <Badge className={statusColors[selected.status]}>{selected.status}</Badge>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" />{selected.email}</div>
                <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" />{selected.phone}</div>
                <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" />{selected.address}</div>
              </div>
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div><p className="text-xs text-muted-foreground">Total Revenue</p><p className="text-lg font-bold">{fmt(selected.totalRevenue)}</p></div>
                <div><p className="text-xs text-muted-foreground">Projects</p><p className="text-lg font-bold">{selected.projectCount}</p></div>
                <div><p className="text-xs text-muted-foreground">Source</p><p className="text-lg font-bold">{selected.source}</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Client Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Client</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input placeholder="Client name" /></div>
            <div><Label>Email</Label><Input type="email" placeholder="email@example.com" /></div>
            <div><Label>Phone</Label><Input placeholder="(512) 555-0000" /></div>
            <div><Label>Address</Label><Input placeholder="Street address" /></div>
            <div>
              <Label>Status</Label>
              <Select defaultValue="Lead">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Lead">Lead</SelectItem>
                  <SelectItem value="Prospect">Prospect</SelectItem>
                  <SelectItem value="Client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full">Add Client</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
