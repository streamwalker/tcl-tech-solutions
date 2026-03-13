import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Eye, Loader2, Download, Search, Package, Trash2 } from "lucide-react";
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

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  model: string;
  category: string;
  msrp: number;
}

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

  // Product search state
  const [productSearch, setProductSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searching, setSearching] = useState(false);
  const [addingProduct, setAddingProduct] = useState<Product | null>(null);
  const [addRoom, setAddRoom] = useState("");
  const [addQty, setAddQty] = useState("1");
  const [addPrice, setAddPrice] = useState("");
  const [addingSaving, setAddingSaving] = useState(false);

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

  const searchProducts = useCallback(async (query: string) => {
    if (query.length < 2) { setSearchResults([]); return; }
    setSearching(true);
    const { data } = await supabase
      .from("products")
      .select("id, name, manufacturer, model, category, msrp")
      .or(`name.ilike.%${query}%,manufacturer.ilike.%${query}%,model.ilike.%${query}%,category.ilike.%${query}%`)
      .order("manufacturer")
      .limit(10);
    setSearchResults((data as Product[]) || []);
    setSearching(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => searchProducts(productSearch), 300);
    return () => clearTimeout(timer);
  }, [productSearch, searchProducts]);

  const handleAddProduct = async () => {
    if (!viewing || !addingProduct) return;
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setAddingSaving(true);
    const { error } = await supabase.from("proposal_items").insert({
      proposal_id: viewing.id,
      user_id: user.id,
      product_name: `${addingProduct.manufacturer} ${addingProduct.name}`,
      room: addRoom || null,
      qty: parseInt(addQty) || 1,
      unit_price: parseFloat(addPrice) || addingProduct.msrp,
    });
    setAddingSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Product added to proposal" });
    setAddingProduct(null);
    setAddRoom("");
    setAddQty("1");
    setAddPrice("");
    setProductSearch("");
    setSearchResults([]);
    // Refresh viewing proposal
    const { data } = await supabase.from("proposals").select("*, clients(name), proposal_items(*)").eq("id", viewing.id).single();
    if (data) setViewing(data as Proposal);
    load();
  };

  const handleRemoveItem = async (itemId: string) => {
    if (!viewing) return;
    await supabase.from("proposal_items").delete().eq("id", itemId);
    toast({ title: "Item removed" });
    const { data } = await supabase.from("proposals").select("*, clients(name), proposal_items(*)").eq("id", viewing.id).single();
    if (data) setViewing(data as Proposal);
    load();
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

      {/* Proposal Detail Dialog */}
      <Dialog open={!!viewing} onOpenChange={(o) => { if (!o) { setViewing(null); setProductSearch(""); setSearchResults([]); setAddingProduct(null); } }}>
        <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
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

                {/* Line Items */}
                {(viewing.proposal_items || []).length > 0 && (
                  <Table>
                    <TableHeader><TableRow><TableHead>Product</TableHead><TableHead>Room</TableHead><TableHead className="text-right">Qty</TableHead><TableHead className="text-right">Unit Price</TableHead><TableHead className="text-right">Total</TableHead><TableHead></TableHead></TableRow></TableHeader>
                    <TableBody>
                      {(viewing.proposal_items || []).map((i) => (
                        <TableRow key={i.id}>
                          <TableCell>{i.product_name}</TableCell>
                          <TableCell>{i.room || "—"}</TableCell>
                          <TableCell className="text-right">{i.qty}</TableCell>
                          <TableCell className="text-right">{fmt(Number(i.unit_price))}</TableCell>
                          <TableCell className="text-right font-medium">{fmt(i.qty * Number(i.unit_price))}</TableCell>
                          <TableCell><Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => handleRemoveItem(i.id)}><Trash2 className="h-3.5 w-3.5" /></Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}

                {/* Add Product from Library */}
                <Card className="border-dashed">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Package className="h-4 w-4" />Add Product from Library
                    </div>

                    {!addingProduct ? (
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-9"
                            placeholder="Search by name, manufacturer, model, or category..."
                            value={productSearch}
                            onChange={(e) => setProductSearch(e.target.value)}
                          />
                          {searching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />}
                        </div>
                        {searchResults.length > 0 && (
                          <div className="border rounded-md divide-y max-h-48 overflow-y-auto">
                            {searchResults.map((prod) => (
                              <button
                                key={prod.id}
                                className="w-full text-left px-3 py-2 hover:bg-muted/50 transition-colors flex items-center justify-between text-sm"
                                onClick={() => {
                                  setAddingProduct(prod);
                                  setAddPrice(prod.msrp.toString());
                                  setProductSearch("");
                                  setSearchResults([]);
                                }}
                              >
                                <div>
                                  <span className="font-medium">{prod.manufacturer} {prod.name}</span>
                                  <span className="text-muted-foreground ml-2">({prod.model})</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="text-xs">{prod.category}</Badge>
                                  <span className="font-medium">{fmt(prod.msrp)}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                        {productSearch.length >= 2 && searchResults.length === 0 && !searching && (
                          <p className="text-sm text-muted-foreground text-center py-2">No products found</p>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                          <div>
                            <p className="font-medium text-sm">{addingProduct.manufacturer} {addingProduct.name}</p>
                            <p className="text-xs text-muted-foreground">{addingProduct.model} · MSRP {fmt(addingProduct.msrp)}</p>
                          </div>
                          <Button variant="ghost" size="sm" onClick={() => setAddingProduct(null)}>Cancel</Button>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div><Label className="text-xs">Room / Location</Label><Input value={addRoom} onChange={(e) => setAddRoom(e.target.value)} placeholder="e.g. Living Room" /></div>
                          <div><Label className="text-xs">Quantity</Label><Input type="number" min="1" value={addQty} onChange={(e) => setAddQty(e.target.value)} /></div>
                          <div><Label className="text-xs">Unit Price ($)</Label><Input type="number" value={addPrice} onChange={(e) => setAddPrice(e.target.value)} /></div>
                        </div>
                        <Button size="sm" onClick={handleAddProduct} disabled={addingSaving} className="w-full">
                          {addingSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                          Add to Proposal
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Totals */}
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

      {/* Create Proposal Dialog */}
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
