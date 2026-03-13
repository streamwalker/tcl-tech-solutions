import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Eye } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  model: string;
  manufacturer: string;
  category: string;
  msrp: number;
  dealerCost: number;
  description: string;
}

const mockProducts: Product[] = [
  { id: "1", name: "EA-5 Controller", model: "C4-EA5", manufacturer: "Control4", category: "Control", msrp: 2200, dealerCost: 1320, description: "Entertainment & automation controller with Zigbee, Z-Wave, WiFi, and BACnet." },
  { id: "2", name: "Caseta Smart Dimmer", model: "PD-6WCL", manufacturer: "Lutron", category: "Lighting", msrp: 65, dealerCost: 39, description: "Wireless in-wall dimmer for dimmable LEDs and incandescent bulbs." },
  { id: "3", name: "Sonos Arc Soundbar", model: "ARCG1US1BLK", manufacturer: "Sonos", category: "Audio", msrp: 899, dealerCost: 629, description: "Premium smart soundbar with Dolby Atmos and voice control." },
  { id: "4", name: "UniFi Dream Machine Pro", model: "UDM-Pro", manufacturer: "Ubiquiti", category: "Networking", msrp: 379, dealerCost: 265, description: "All-in-one network appliance with UniFi OS, 10G SFP+, and NVR." },
  { id: "5", name: "Ring Video Doorbell Pro 2", model: "B086Q54K53", manufacturer: "Ring", category: "Security", msrp: 249, dealerCost: 174, description: "Hardwired smart doorbell with 3D motion detection and Head-to-Toe HD+ video." },
  { id: "6", name: "Ecobee SmartThermostat Premium", model: "EB-STATE5P", manufacturer: "Ecobee", category: "Climate", msrp: 249, dealerCost: 174, description: "Smart thermostat with built-in air quality monitor and Siri/Alexa." },
  { id: "7", name: "Sony 85\" 4K BRAVIA XR", model: "XR85X90L", manufacturer: "Sony", category: "Displays", msrp: 2799, dealerCost: 1959, description: "85-inch 4K Full Array LED Google TV with Cognitive Processor XR." },
  { id: "8", name: "Lutron RadioRA 3 Processor", model: "RR3-PROC", manufacturer: "Lutron", category: "Lighting", msrp: 750, dealerCost: 450, description: "Main processor for RadioRA 3 whole-home lighting control." },
  { id: "9", name: "Snap One Araknis 620 Switch", model: "AN-620-SW-R-24", manufacturer: "Snap One", category: "Networking", msrp: 549, dealerCost: 329, description: "24-port managed gigabit PoE+ switch for commercial AV." },
  { id: "10", name: "JL Audio Fathom f113v2", model: "F113V2-?"  , manufacturer: "JL Audio", category: "Audio", msrp: 4500, dealerCost: 3150, description: "13.5-inch powered subwoofer with digital signal processing." },
  { id: "11", name: "2N IP Verso 2.0", model: "91378601", manufacturer: "2N", category: "Security", msrp: 1195, dealerCost: 836, description: "Modular IP intercom with HD camera and RFID access." },
  { id: "12", name: "Crestron MC4-R Control System", model: "MC4-R", manufacturer: "Crestron", category: "Control", msrp: 3200, dealerCost: 1920, description: "4-Series control system processor for enterprise automation." },
];

const categories = ["All", "Control", "Lighting", "Audio", "Networking", "Security", "Climate", "Displays"];

export default function ProductLibrary() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = mockProducts.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.manufacturer.toLowerCase().includes(search.toLowerCase()) || p.model.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "All" || p.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  const fmt = (n: number) => "$" + n.toLocaleString("en-US", { minimumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Product Library</h1>
        <p className="text-muted-foreground">Browse and manage your AV/smart home product catalog</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Button key={cat} variant={activeCategory === cat ? "default" : "outline"} size="sm" onClick={() => setActiveCategory(cat)}>
            {cat}
          </Button>
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
                <TableHead>Product</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">MSRP</TableHead>
                <TableHead className="text-right">Dealer Cost</TableHead>
                <TableHead className="text-right">Margin</TableHead>
                <TableHead></TableHead>
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
                  <TableCell className="text-right">{fmt(p.dealerCost)}</TableCell>
                  <TableCell className="text-right font-medium text-green-600">{Math.round(((p.msrp - p.dealerCost) / p.msrp) * 100)}%</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedProduct(p)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow><TableCell colSpan={8} className="text-center py-8 text-muted-foreground">No products found</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedProduct?.name}</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-muted-foreground">Manufacturer:</span> <span className="font-medium">{selectedProduct.manufacturer}</span></div>
                <div><span className="text-muted-foreground">Model:</span> <span className="font-mono">{selectedProduct.model}</span></div>
                <div><span className="text-muted-foreground">Category:</span> <Badge variant="secondary">{selectedProduct.category}</Badge></div>
                <div><span className="text-muted-foreground">Margin:</span> <span className="font-medium text-green-600">{Math.round(((selectedProduct.msrp - selectedProduct.dealerCost) / selectedProduct.msrp) * 100)}%</span></div>
              </div>
              <div className="flex gap-6 p-4 bg-muted/50 rounded-lg">
                <div><p className="text-xs text-muted-foreground">MSRP</p><p className="text-xl font-bold">{fmt(selectedProduct.msrp)}</p></div>
                <div><p className="text-xs text-muted-foreground">Dealer Cost</p><p className="text-xl font-bold text-primary">{fmt(selectedProduct.dealerCost)}</p></div>
                <div><p className="text-xs text-muted-foreground">Profit</p><p className="text-xl font-bold text-green-600">{fmt(selectedProduct.msrp - selectedProduct.dealerCost)}</p></div>
              </div>
              <p className="text-sm text-muted-foreground">{selectedProduct.description}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
