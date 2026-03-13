import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Eye, Plus, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Product {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  category: string;
  msrp: number;
  dealer_cost: number;
  description: string;
}

const categories = ["All", "Control", "Lighting", "Audio", "Networking", "Security", "Climate", "Displays"];

export default function ProductLibrary() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", model: "", manufacturer: "", category: "Control", msrp: "", dealerCost: "", description: "" });
  const { toast } = useToast();

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("products").select("*").order("name");
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); }
    setProducts((data as Product[]) || []);
    setLoading(false);
  };

  const handleAdd = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("products").insert({
      user_id: user.id, name: form.name, model: form.model, manufacturer: form.manufacturer,
      category: form.category, msrp: parseFloat(form.msrp) || 0, dealer_cost: parseFloat(form.dealerCost) || 0, description: form.description,
    });
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Product added" });
    setShowAdd(false);
    setForm({ name: "", model: "", manufacturer: "", category: "Control", msrp: "", dealerCost: "", description: "" });
    loadProducts();
  };

  const filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.manufacturer.toLowerCase().includes(search.toLowerCase()) || p.model.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const fmt = (n: number) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2 });

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Product Library</h1>
          <p className="text-muted-foreground">Browse and manage your AV/smart home product catalog</p>
        </div>
        <Button onClick={() => setShowAdd(true)}><Plus className="h-4 w-4 mr-2" />Add Product</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)}>{cat}</Button>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search products, manufacturers, models…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead><TableHead>Manufacturer</TableHead><TableHead>Model</TableHead>
                <TableHead>Category</TableHead><TableHead className="text-right">MSRP</TableHead>
                <TableHead className="text-right">Dealer Cost</TableHead><TableHead className="text-right">Margin</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.manufacturer}</TableCell>
                  <TableCell className="font-mono text-xs">{p.model}</TableCell>
                  <TableCell><Badge variant="secondary">{p.category}</Badge></TableCell>
                  <TableCell className="text-right">{fmt(p.msrp)}</TableCell>
                  <TableCell className="text-right">{fmt(p.dealer_cost)}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">{p.msrp > 0 ? Math.round(((p.msrp - p.dealer_cost) / p.msrp) * 100) : 0}%</TableCell>
                  <TableCell><Button variant="ghost" size="icon" onClick={() => setSelectedProduct(p)}><Eye className="h-4 w-4" /></Button></TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No products found. Add your first product above.</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selectedProduct?.name}</DialogTitle></DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Manufacturer:</span> <span className="font-medium">{selectedProduct.manufacturer}</span></div>
                <div><span className="text-muted-foreground">Model:</span> <span className="font-mono">{selectedProduct.model}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <Badge variant="secondary">{selectedProduct.category}</Badge></div>
                <div><span className="text-muted-foreground">Margin:</span> <span className="font-medium text-green-600">{selectedProduct.msrp > 0 ? Math.round(((selectedProduct.msrp - selectedProduct.dealer_cost) / selectedProduct.msrp) * 100) : 0}%</span></div>
              </div>
              <div className="flex gap-6 p-4 bg-muted/50 rounded-lg">
                <div><p className="text-xs text-muted-foreground">MSRP</p><p className="text-xl font-bold">{fmt(selectedProduct.msrp)}</p></div>
                <div><p className="text-xs text-muted-foreground">Dealer Cost</p><p className="text-xl font-bold text-primary">{fmt(selectedProduct.dealer_cost)}</p></div>
                <div><p className="text-xs text-muted-foreground">Profit</p><p className="text-xl font-bold text-green-600">{fmt(selectedProduct.msrp - selectedProduct.dealer_cost)}</p></div>
              </div>
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={showAdd} onOpenChange={setShowAdd}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Product name" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Manufacturer</Label><Input value={form.manufacturer} onChange={(e) => setForm({ ...form, manufacturer: e.target.value })} placeholder="e.g. Control4" /></div>
              <div><Label>Model</Label><Input value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })} placeholder="e.g. C4-EA5" /></div>
            </div>
            <div><Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{categories.filter(c => c !== "All").map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>MSRP ($)</Label><Input type="number" value={form.msrp} onChange={(e) => setForm({ ...form, msrp: e.target.value })} /></div>
              <div><Label>Dealer Cost ($)</Label><Input type="number" value={form.dealerCost} onChange={(e) => setForm({ ...form, dealerCost: e.target.value })} /></div>
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <Button className="w-full" onClick={handleAdd} disabled={saving || !form.name}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Add Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
