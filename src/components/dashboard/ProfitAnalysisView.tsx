import { useState, useEffect, useMemo } from "react";
import { TCLCard, ProjectTopBar } from "./shared";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, ReferenceLine } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Printer, Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LaborBreakdownItem { category: string; hours: number; rate: number; total: number }
interface MarginDistItem { range: string; count: number; fill: string }
interface HighMarginItem { name: string; margin: number; cost: number; sell: number }
interface BelowCostItem { name: string; qty: number; cost: number; sell: number; loss: number }
interface FindingItem { id?: number; title: string; color: string; icon: string; detail: string }

interface ProfitAnalysis {
  id: string;
  project_title: string;
  contract_value: number;
  sales_tax: number;
  product_cost: number;
  labor_billed: number;
  schedule_a_labor: number;
  product_markup: number;
  total_hours: number;
  schedule_a_profit: number;
  sw_share_pct: number;
  labor_breakdown: LaborBreakdownItem[];
  margin_distribution: MarginDistItem[];
  high_margin_items: HighMarginItem[];
  below_cost_items: BelowCostItem[];
  findings: FindingItem[];
  amendment_text: string | null;
  created_at: string;
}

// Default Wall Residence data used for seeding
const WALL_RESIDENCE_DEFAULTS = {
  project_title: "Wall Residence (P-1)",
  contract_value: 117059.46,
  sales_tax: 7034.18,
  product_cost: 64342.41,
  labor_billed: 24762.50,
  schedule_a_labor: 21987.50,
  product_markup: 20920.37,
  total_hours: 169,
  schedule_a_profit: 30717.55,
  sw_share_pct: 0.49,
  labor_breakdown: [
    { category: "Family", hours: 23.5, rate: 125, total: 2937.50 },
    { category: "Installation", hours: 111, rate: 150, total: 16650.00 },
    { category: "Programming", hours: 34.5, rate: 150, total: 5175.00 },
  ],
  margin_distribution: [
    { range: "Below 0%", count: 7, fill: "#dc2626" },
    { range: "0-10%", count: 3, fill: "#f97316" },
    { range: "10-20%", count: 5, fill: "#eab308" },
    { range: "20-30%", count: 8, fill: "#84cc16" },
    { range: "30-40%", count: 12, fill: "#22c55e" },
    { range: "40-50%", count: 6, fill: "#14b8a6" },
    { range: "50-60%", count: 4, fill: "#0ea5e9" },
    { range: "60%+", count: 2, fill: "#6366f1" },
  ],
  high_margin_items: [
    { name: "Maestro Projection Screen", margin: 62.57, cost: 1245.00, sell: 3326.00 },
    { name: "URC HDA-8100", margin: 57.62, cost: 382.50, sell: 902.50 },
    { name: "Elura S8 In-Wall Speaker", margin: 54.32, cost: 112.00, sell: 245.20 },
    { name: "URC TRC-1480 Remote", margin: 52.18, cost: 287.50, sell: 601.00 },
    { name: "Snap One Binary HDMI Cable", margin: 49.85, cost: 18.75, sell: 37.38 },
  ],
  below_cost_items: [
    { name: "Emotiva XMC2+ Processor", qty: 1, cost: 1499.99, sell: 1238.10, loss: -261.89 },
    { name: "Emotiva BasX A-800 Amp", qty: 1, cost: 599.99, sell: 541.50, loss: -58.49 },
    { name: "Emotiva BasX A-300 Amp", qty: 1, cost: 399.99, sell: 365.40, loss: -34.59 },
    { name: "Emotiva Airmotiv SE8 Sub", qty: 1, cost: 399.99, sell: 378.00, loss: -21.99 },
    { name: "Emotiva Airmotiv C2+ Center", qty: 1, cost: 349.99, sell: 315.00, loss: -34.99 },
    { name: "Emotiva Airmotiv B1+ Surround", qty: 4, cost: 249.99, sell: 234.35, loss: -15.64 },
    { name: "Emotiva Airmotiv T2+ Tower", qty: 2, cost: 599.99, sell: 578.90, loss: -21.09 },
  ],
  findings: [
    { title: 'Product markups ARE properly captured', color: "border-green-500 bg-green-50", icon: "✅", detail: "Product dealer costs of $64,342.41 match between D-Tools and Schedule A. Markup revenue of $20,920.37 flows into the Profit Pool." },
    { title: 'Labor profit is buried inside "costs"', color: "border-red-500 bg-red-50", icon: "🔴", detail: 'Schedule A lists Labor Cost as $21,987.50 — but this is billed to the customer, not TCL\'s actual labor expense. Industry rates suggest ~$5,915 true cost, meaning ~$18,800 in labor profit never enters the Profit Pool.' },
    { title: "$2,775 labor discrepancy", color: "border-yellow-500 bg-yellow-50", icon: "⚠️", detail: "Schedule A states $21,987.50 in labor costs. D-Tools shows $24,762.50 billed. The $2,775 gap is unexplained." },
    { title: "Negative-margin items reduce shared profit pool", color: "border-yellow-500 bg-yellow-50", icon: "⚠️", detail: "7 product categories totaling $448.68 are sold below dealer cost. These losses compress the Profit Pool that Streamwalkers participates in." },
    { title: "Sales tax dilutes the margin percentage", color: "border-yellow-500 bg-yellow-50", icon: "⚠️", detail: "The $117,059.46 Contract Value includes ~$7,034 in sales tax. Including it reduces apparent margin from 27.93% to 26.26%." },
  ],
  amendment_text: `AMENDMENT 1-A — PROFIT DISTRIBUTION AGREEMENT

This Amendment 1-A ("Amendment") is entered into as an addendum to the original Operating Agreement of TCL (the "Company"), by and between the Members listed herein.

PURPOSE: To establish a transparent, equitable profit-sharing framework that accounts for the true cost of labor, product margins, and operational overhead, ensuring that all Members receive compensation proportional to their contribution.

SECTION 1 — DEFINITIONS
• "Contract Value" means the total amount billed to the customer, inclusive of sales tax.
• "Pre-Tax Revenue" means Contract Value less sales tax collected.
• "Product Dealer Cost" means the wholesale cost of goods purchased for the project.
• "Product Markup Revenue" means the difference between customer price and dealer cost for products.
• "Schedule A Labor" means labor costs as stated in the project Schedule A document.
• "Profit Pool" means Pre-Tax Revenue less Product Dealer Cost less true labor cost.
• "True Labor Cost" means the actual hourly cost of labor (estimated at $35/hr unless otherwise agreed).

SECTION 2 — PROFIT POOL CALCULATION
The Profit Pool shall be calculated as follows:
  Profit Pool = Pre-Tax Revenue − Product Dealer Cost − True Labor Cost

SECTION 3 — DISTRIBUTION
Streamwalkers shall receive 49% of the Profit Pool. TCL shall retain 51% of the Profit Pool.

SECTION 4 — LABOR PROFIT RECOGNITION
Any difference between Schedule A Labor and True Labor Cost shall be recognized as labor profit and included in the Profit Pool before distribution. This ensures labor profit is not buried inside "costs."

SECTION 5 — BELOW-COST ITEMS
Items sold below dealer cost reduce the Profit Pool. Both parties acknowledge that minimizing below-cost sales is in their mutual interest.

SECTION 6 — REPORTING
TCL shall provide Streamwalkers with a detailed profit analysis for each project within 30 days of project completion, including revenue waterfall, margin audit, and below-cost item report.

IN WITNESS WHEREOF, the parties have executed this Amendment as of the date of the associated project completion.`,
};

function MetricCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <TCLCard className="p-5">
      <div className="text-xs font-medium text-gray-500 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${accent || "text-gray-900"}`}>{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </TCLCard>
  );
}

function SensitivitySlider({ data }: { data: ProfitAnalysis }) {
  const preTax = data.contract_value - data.sales_tax;
  const swScheduleA = data.schedule_a_profit * data.sw_share_pct;
  const [rate, setRate] = useState([35]);
  const r = rate[0];
  const trueCost = data.total_hours * r;
  const hiddenProfit = data.schedule_a_labor - trueCost;
  const trueProfit = preTax - data.product_cost - trueCost;
  const trueMargin = ((trueProfit / preTax) * 100).toFixed(2);
  const swShouldBe = trueProfit * data.sw_share_pct;
  const shortfall = swShouldBe - swScheduleA;

  const laborBreakdown = data.labor_breakdown as LaborBreakdownItem[];

  const lineData = Array.from({ length: 10 }, (_, i) => {
    const hr = 20 + i * 5;
    const tp = preTax - data.product_cost - data.total_hours * hr;
    return { rate: `$${hr}/hr`, sw49: Math.round(tp * data.sw_share_pct), baseline: Math.round(swScheduleA) };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-gray-600 whitespace-nowrap">Assumed Hourly Rate:</span>
        <Slider min={20} max={65} step={1} value={rate} onValueChange={setRate} className="flex-1" />
        <span className="text-lg font-bold text-gray-900 w-20 text-right">${r}/hr</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard label="True Labor Cost" value={`$${trueCost.toLocaleString()}`} sub={`${data.total_hours} hrs × $${r}`} />
        <MetricCard label="Hidden Labor Profit" value={`$${hiddenProfit.toLocaleString()}`} accent={hiddenProfit > 0 ? "text-red-600" : "text-green-600"} />
        <MetricCard label="True Project Margin" value={`${trueMargin}%`} />
        <MetricCard label={`SW ${(data.sw_share_pct * 100).toFixed(0)}% Should Be`} value={`$${Math.round(swShouldBe).toLocaleString()}`} sub={shortfall > 0 ? `+$${Math.round(shortfall).toLocaleString()} vs Schedule A` : ""} accent="text-[#C42020]" />
      </div>
      <TCLCard className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">SW {(data.sw_share_pct * 100).toFixed(0)}% Share vs Assumed Labor Rate</h4>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="rate" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip formatter={(v: number) => `$${v.toLocaleString()}`} />
            <Line type="monotone" dataKey="sw49" stroke="#C42020" strokeWidth={2} name={`SW ${(data.sw_share_pct * 100).toFixed(0)}% (True)`} dot={false} />
            <Line type="monotone" dataKey="baseline" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Schedule A Baseline" dot={false} />
            <ReferenceLine y={Math.round(swScheduleA)} stroke="#94a3b8" strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </TCLCard>
      <TCLCard className="p-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">D-Tools Labor Rate Breakdown</h4>
        <table className="w-full text-sm">
          <thead><tr className="border-b border-gray-200 text-left text-gray-500"><th className="pb-2 font-medium">Category</th><th className="pb-2 font-medium">Hours</th><th className="pb-2 font-medium">Rate</th><th className="pb-2 font-medium text-right">Total</th></tr></thead>
          <tbody>
            {laborBreakdown.map((l) => (
              <tr key={l.category} className="border-b border-gray-100"><td className="py-2 font-medium text-gray-800">{l.category}</td><td className="py-2 text-gray-600">{l.hours}</td><td className="py-2 text-gray-600">${l.rate}/hr</td><td className="py-2 text-right font-semibold">${l.total.toLocaleString()}</td></tr>
            ))}
            <tr className="font-bold"><td className="py-2">Total</td><td className="py-2">{data.total_hours}</td><td></td><td className="py-2 text-right">${data.labor_billed.toLocaleString()}</td></tr>
          </tbody>
        </table>
      </TCLCard>
    </div>
  );
}

function NewAnalysisDialog({ onCreated }: { onCreated: () => void }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [contractValue, setContractValue] = useState("");
  const [salesTax, setSalesTax] = useState("");
  const [productCost, setProductCost] = useState("");
  const [laborBilled, setLaborBilled] = useState("");
  const [scheduleALabor, setScheduleALabor] = useState("");
  const [productMarkup, setProductMarkup] = useState("");
  const [totalHours, setTotalHours] = useState("");
  const [scheduleAProfit, setScheduleAProfit] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast({ title: "Error", description: "You must be logged in.", variant: "destructive" }); return; }
    setSaving(true);
    const { error } = await supabase.from("profit_analyses").insert({
      user_id: user.id,
      project_title: title || "New Project",
      contract_value: parseFloat(contractValue) || 0,
      sales_tax: parseFloat(salesTax) || 0,
      product_cost: parseFloat(productCost) || 0,
      labor_billed: parseFloat(laborBilled) || 0,
      schedule_a_labor: parseFloat(scheduleALabor) || 0,
      product_markup: parseFloat(productMarkup) || 0,
      total_hours: parseFloat(totalHours) || 0,
      schedule_a_profit: parseFloat(scheduleAProfit) || 0,
    });
    setSaving(false);
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Analysis created" });
    setOpen(false);
    onCreated();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="print:hidden"><Plus className="w-4 h-4 mr-1" /> New Analysis</Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>New Profit Analysis</DialogTitle></DialogHeader>
        <div className="space-y-3">
          <div><Label>Project Title</Label><Input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Smith Residence" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label>Contract Value</Label><Input type="number" value={contractValue} onChange={e => setContractValue(e.target.value)} /></div>
            <div><Label>Sales Tax</Label><Input type="number" value={salesTax} onChange={e => setSalesTax(e.target.value)} /></div>
            <div><Label>Product Cost</Label><Input type="number" value={productCost} onChange={e => setProductCost(e.target.value)} /></div>
            <div><Label>Labor Billed</Label><Input type="number" value={laborBilled} onChange={e => setLaborBilled(e.target.value)} /></div>
            <div><Label>Schedule A Labor</Label><Input type="number" value={scheduleALabor} onChange={e => setScheduleALabor(e.target.value)} /></div>
            <div><Label>Product Markup</Label><Input type="number" value={productMarkup} onChange={e => setProductMarkup(e.target.value)} /></div>
            <div><Label>Total Hours</Label><Input type="number" value={totalHours} onChange={e => setTotalHours(e.target.value)} /></div>
            <div><Label>Schedule A Profit</Label><Input type="number" value={scheduleAProfit} onChange={e => setScheduleAProfit(e.target.value)} /></div>
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Analysis"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ProfitAnalysisView({ onBack }: { onBack?: () => void }) {
  const [analyses, setAnalyses] = useState<ProfitAnalysis[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalyses = async () => {
    setLoading(true);
    const { data } = await supabase.from("profit_analyses").select("*").order("created_at", { ascending: false });
    if (data && data.length > 0) {
      const mapped = data.map(d => ({
        ...d,
        labor_breakdown: (d.labor_breakdown || []) as unknown as LaborBreakdownItem[],
        margin_distribution: (d.margin_distribution || []) as unknown as MarginDistItem[],
        high_margin_items: (d.high_margin_items || []) as unknown as HighMarginItem[],
        below_cost_items: (d.below_cost_items || []) as unknown as BelowCostItem[],
        findings: (d.findings || []) as unknown as FindingItem[],
      }));
      setAnalyses(mapped);
      if (!selectedId || !mapped.find(m => m.id === selectedId)) setSelectedId(mapped[0].id);
    } else {
      // Auto-seed Wall Residence data for first-time users
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error: seedError } = await supabase.from("profit_analyses").insert({
          ...WALL_RESIDENCE_DEFAULTS,
          user_id: user.id,
        });
        if (!seedError) {
          setLoading(true);
          const { data: seeded } = await supabase.from("profit_analyses").select("*").order("created_at", { ascending: false });
          if (seeded && seeded.length > 0) {
            const mapped = seeded.map(d => ({
              ...d,
              labor_breakdown: (d.labor_breakdown || []) as unknown as LaborBreakdownItem[],
              margin_distribution: (d.margin_distribution || []) as unknown as MarginDistItem[],
              high_margin_items: (d.high_margin_items || []) as unknown as HighMarginItem[],
              below_cost_items: (d.below_cost_items || []) as unknown as BelowCostItem[],
              findings: (d.findings || []) as unknown as FindingItem[],
            }));
            setAnalyses(mapped);
            setSelectedId(mapped[0].id);
          }
        }
      } else {
        setAnalyses([]);
      }
    }
    setLoading(false);
  };

  useEffect(() => { fetchAnalyses(); }, []);

  const data = useMemo(() => analyses.find(a => a.id === selectedId) || null, [analyses, selectedId]);

  if (loading) {
    return (
      <div>
        <ProjectTopBar onBack={onBack} />
        <div className="p-7 flex items-center justify-center min-h-[400px]"><Loader2 className="w-8 h-8 animate-spin text-gray-400" /></div>
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <ProjectTopBar onBack={onBack} />
        <div className="p-7 max-w-[1200px]">
          <TCLCard className="p-10 text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">No Profit Analyses Yet</h3>
            <p className="text-sm text-gray-500 mb-4">Create your first project profit analysis to get started.</p>
            <NewAnalysisDialog onCreated={fetchAnalyses} />
          </TCLCard>
        </div>
      </div>
    );
  }

  const preTax = data.contract_value - data.sales_tax;
  const marginGross = ((data.schedule_a_profit / data.contract_value) * 100).toFixed(2);
  const marginPreTax = ((data.schedule_a_profit / preTax) * 100).toFixed(2);
  const dilution = (parseFloat(marginGross) - parseFloat(marginPreTax)).toFixed(2);

  const waterfallData = [
    { name: "Contract Value", value: data.contract_value, fill: "#1e3a5f" },
    { name: "Sales Tax", value: -data.sales_tax, fill: "#94a3b8" },
    { name: "Pre-Tax Revenue", value: preTax, fill: "#1e40af" },
    { name: "Product Cost", value: -data.product_cost, fill: "#dc2626" },
    { name: "Labor Billed", value: -data.labor_billed, fill: "#f59e0b" },
    { name: "Product Markup", value: data.product_markup, fill: "#16a34a" },
    { name: "Schedule A Profit", value: data.schedule_a_profit, fill: "#059669" },
  ];

  const waterfallTable = [
    { layer: "Contract Value", amount: data.contract_value },
    { layer: "Sales Tax (pass-through)", amount: -data.sales_tax },
    { layer: "Pre-Tax Revenue", amount: preTax },
    { layer: "Product Dealer Cost", amount: -data.product_cost },
    { layer: "Labor Billed to Customer", amount: -data.labor_billed },
    { layer: "Product Markup Revenue", amount: data.product_markup },
    { layer: "Schedule A Stated Profit", amount: data.schedule_a_profit },
  ];

  const marginDist = data.margin_distribution as MarginDistItem[];
  const highItems = data.high_margin_items as HighMarginItem[];
  const belowItems = data.below_cost_items as BelowCostItem[];
  const findingsArr = data.findings as FindingItem[];
  const totalLoss = belowItems.reduce((s, i) => s + Math.abs(i.loss), 0);

  return (
    <div>
      <ProjectTopBar onBack={onBack} />
      {/* Breadcrumb */}
      <nav className="px-7 pt-4 pb-0 print:hidden">
        <ol className="flex items-center gap-1 text-sm text-muted-foreground">
          <li>
            <button onClick={onBack} className="hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-0">Platform</button>
          </li>
          <li className="text-muted-foreground/50">&gt;</li>
          <li>
            <button onClick={onBack} className="hover:text-foreground transition-colors bg-transparent border-none cursor-pointer p-0">Profit Analysis</button>
          </li>
          <li className="text-muted-foreground/50">&gt;</li>
          <li className="text-foreground font-medium">{data.project_title}</li>
        </ol>
      </nav>
      <div className="p-7 space-y-8 max-w-[1200px]" id="profit-analysis-print">
        {/* Header + Controls */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">TCL Profit Analysis & Amendment 1-A</h2>
            <p className="text-sm text-gray-500 mt-1">{data.project_title} — Revenue Waterfall & Margin Audit</p>
          </div>
          <div className="flex items-center gap-2 print:hidden">
            {analyses.length > 1 && (
              <Select value={selectedId || ""} onValueChange={setSelectedId}>
                <SelectTrigger className="w-[220px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {analyses.map(a => (
                    <SelectItem key={a.id} value={a.id}>{a.project_title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            <NewAnalysisDialog onCreated={fetchAnalyses} />
            <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="w-4 h-4 mr-1" /> Export PDF</Button>
          </div>
        </div>

        {/* Executive Summary */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-3">Executive Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <MetricCard label="Schedule A Margin" value={`${marginGross}%`} sub="On gross contract value" />
            <MetricCard label="Estimated True Margin" value="~34-35%" sub="With actual labor costs" accent="text-green-600" />
            <MetricCard label="SW Potential Shortfall" value="$3,600-$5,300" sub="Annual per-project basis" accent="text-[#C42020]" />
            <MetricCard label="Labor Data Gap" value={`$${(data.labor_billed - data.schedule_a_labor).toLocaleString()}`} sub="Schedule A vs D-Tools" accent="text-yellow-600" />
          </div>
          <TCLCard className="mt-4 p-4 border-l-4 border-l-[#C42020]">
            <div className="text-sm font-semibold text-gray-800">Core Issue</div>
            <p className="text-sm text-gray-600 mt-1">The Amendment's profit framework has a structural gap in how it defines "Estimated Project Costs." Labor profit is classified as a cost and never enters the Profit Pool. Streamwalkers does not participate in that margin.</p>
          </TCLCard>
        </section>

        {/* Revenue Waterfall */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-3">Revenue Waterfall</h3>
          <TCLCard className="p-4">
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={waterfallData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-35} textAnchor="end" />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${(Math.abs(v) / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => `$${Math.abs(v).toLocaleString()}`} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {waterfallData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TCLCard>
          <TCLCard className="mt-3 p-4">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200 text-left text-gray-500"><th className="pb-2 font-medium">Layer</th><th className="pb-2 font-medium text-right">Amount</th><th className="pb-2 font-medium text-right">% of Contract</th></tr></thead>
              <tbody>
                {waterfallTable.map((r) => (
                  <tr key={r.layer} className="border-b border-gray-100">
                    <td className="py-2 font-medium text-gray-800">{r.layer}</td>
                    <td className={`py-2 text-right font-semibold ${r.amount < 0 ? "text-red-600" : "text-gray-900"}`}>
                      {r.amount < 0 ? "-" : ""}${Math.abs(r.amount).toLocaleString()}
                    </td>
                    <td className="py-2 text-right text-gray-500">{((Math.abs(r.amount) / data.contract_value) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TCLCard>
        </section>

        {/* Labor Cost Sensitivity */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-3">Labor Cost Sensitivity Analysis</h3>
          <SensitivitySlider data={data} />
        </section>

        {/* Item-Level Margin Audit */}
        {marginDist.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3">Item-Level Margin Distribution</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <TCLCard className="p-4">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={marginDist}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="count" name="Items" radius={[4, 4, 0, 0]}>
                      {marginDist.map((entry, i) => (
                        <Cell key={i} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </TCLCard>
              <TCLCard className="p-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Highest Margin Items</h4>
                <table className="w-full text-sm">
                  <thead><tr className="border-b border-gray-200 text-left text-gray-500"><th className="pb-2 font-medium">Item</th><th className="pb-2 font-medium text-right">Margin</th></tr></thead>
                  <tbody>
                    {highItems.map((item) => (
                      <tr key={item.name} className="border-b border-gray-100">
                        <td className="py-2 text-gray-800">{item.name}</td>
                        <td className="py-2 text-right font-semibold text-green-600">{item.margin}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </TCLCard>
            </div>
          </section>
        )}

        {/* Below-Cost Items */}
        {belowItems.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3">Below-Cost Items</h3>
            <TCLCard className="p-4">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={belowItems} layout="vertical" margin={{ left: 180 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `$${Math.abs(v)}`} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={170} />
                  <Tooltip formatter={(v: number) => `$${Math.abs(v).toFixed(2)}`} />
                  <Bar dataKey="loss" fill="#dc2626" name="Loss" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </TCLCard>
            <TCLCard className="mt-3 p-4">
              <table className="w-full text-sm">
                <thead><tr className="border-b border-gray-200 text-left text-gray-500"><th className="pb-2 font-medium">Item</th><th className="pb-2 font-medium text-center">Qty</th><th className="pb-2 font-medium text-right">Dealer Cost</th><th className="pb-2 font-medium text-right">Sell Price</th><th className="pb-2 font-medium text-right">Loss</th></tr></thead>
                <tbody>
                  {belowItems.map((item) => (
                    <tr key={item.name} className="border-b border-gray-100">
                      <td className="py-2 text-gray-800">{item.name}</td>
                      <td className="py-2 text-center text-gray-600">{item.qty}</td>
                      <td className="py-2 text-right text-gray-600">${item.cost.toLocaleString()}</td>
                      <td className="py-2 text-right text-gray-600">${item.sell.toLocaleString()}</td>
                      <td className="py-2 text-right font-semibold text-red-600">-${Math.abs(item.loss).toFixed(2)}</td>
                    </tr>
                  ))}
                  <tr className="font-bold"><td className="py-2">Total Impact</td><td></td><td></td><td></td><td className="py-2 text-right text-red-600">-${totalLoss.toFixed(2)}</td></tr>
                </tbody>
              </table>
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                <strong>Impact:</strong> These below-cost items reduce the shared Profit Pool by ${totalLoss.toFixed(2)}, resulting in ~${(totalLoss * data.sw_share_pct).toFixed(2)} reduced distribution to Streamwalkers ({(data.sw_share_pct * 100).toFixed(0)}%).
              </div>
            </TCLCard>
          </section>
        )}

        {/* Sales Tax Treatment */}
        <section>
          <h3 className="text-base font-bold text-gray-800 mb-3">Sales Tax Treatment</h3>
          <div className="grid grid-cols-3 gap-3">
            <MetricCard label="Margin on Gross" value={`${marginGross}%`} sub="Including sales tax" />
            <MetricCard label="Margin on Pre-Tax" value={`${marginPreTax}%`} sub="Excluding sales tax" accent="text-green-600" />
            <MetricCard label="Dilution Effect" value={`${dilution}%`} sub="Tax pass-through impact" accent="text-yellow-600" />
          </div>
        </section>

        {/* Summary of Findings */}
        {findingsArr.length > 0 && (
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3">Summary of Findings</h3>
            <div className="space-y-3">
              {findingsArr.map((f, idx) => (
                <TCLCard key={idx} className={`p-4 border-l-4 ${f.color}`}>
                  <div className="flex items-start gap-3">
                    <span className="text-lg">{f.icon}</span>
                    <div>
                      <div className="text-sm font-bold text-gray-800">Finding {idx + 1}: {f.title}</div>
                      <p className="text-sm text-gray-600 mt-1">{f.detail}</p>
                    </div>
                  </div>
                </TCLCard>
              ))}
            </div>
          </section>
        )}

        {/* Amendment 1-A */}
        {data.amendment_text && (
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3">Proposed Amendment 1-A: Definitional Clarification</h3>
            <TCLCard className="p-6">
              <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">{data.amendment_text}</div>
            </TCLCard>
          </section>
        )}

        {/* Inline Amendment for Wall Residence (always shown if no amendment_text) */}
        {!data.amendment_text && (
          <section>
            <h3 className="text-base font-bold text-gray-800 mb-3">Proposed Amendment 1-A: Definitional Clarification</h3>
            <TCLCard className="p-6">
              <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
                <p className="font-bold text-gray-900 text-center">AMENDMENT 1-A TO THE OPERATING AGREEMENT<br />OF TCL TECH SOLUTIONS LLC</p>
                <p className="text-center text-gray-600">Definitional Clarification — Project Cost Accounting</p>
                <hr className="border-gray-200" />
                <p><strong>Section 1 — Purpose.</strong> This Amendment clarifies the definition of "Estimated Project Costs" as referenced in Section 3.1 of Amendment 1 (Project Baseline Requirements) to ensure the Profit Pool accurately reflects the true margin on each project.</p>
                <p><strong>Section 2 — Definitions Added.</strong></p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li><strong>"Cost of Goods Sold" (COGS)</strong> shall mean TCL's actual direct cost for products and labor, defined as:
                    <ul className="list-disc pl-6 mt-1">
                      <li><em>Product COGS:</em> The dealer cost paid by TCL to suppliers for products included in the project scope.</li>
                      <li><em>Labor COGS:</em> The actual hourly wages paid to technicians, installers, and programmers performing project work, multiplied by hours worked. This does not include the billing rate charged to the customer.</li>
                    </ul>
                  </li>
                  <li><strong>"Billed Revenue"</strong> shall mean the total amount invoiced to the customer for products and labor, including any markup or margin applied by TCL.</li>
                  <li><strong>"Labor Margin"</strong> shall mean the difference between the labor billing rate charged to the customer and the actual hourly wage paid to the technician. Labor Margin shall be treated as revenue for purposes of calculating the Profit Pool.</li>
                </ol>
                <p><strong>Section 3 — Amendment to Section 3.1.</strong> Section 3.1 of Amendment 1 is hereby amended to read:</p>
                <blockquote className="border-l-4 border-gray-300 pl-4 italic">
                  "Estimated Project Costs shall be calculated using Cost of Goods Sold (as defined in Section 2 of Amendment 1-A), not Billed Revenue. The Project Baseline Margin shall be derived from the spread between Pre-Tax Billed Revenue and total COGS (Product COGS + Labor COGS)."
                </blockquote>
                <p><strong>Section 4 — Documentation Requirements.</strong> For each project, TCL shall document and make available to all Members:</p>
                <ol className="list-decimal pl-6 space-y-1">
                  <li>Actual hourly pay rates for each technician category assigned to the project.</li>
                  <li>Hours worked by category, reconciled against billing records.</li>
                  <li>A COGS summary distinguishing Product COGS and Labor COGS from Billed Revenue.</li>
                </ol>
                <p><strong>Section 5 — Effective Date.</strong> This Amendment shall be effective upon execution by all Members and shall apply to all projects initiated or invoiced after the effective date.</p>
                <div className="mt-8 grid grid-cols-2 gap-8">
                  <div className="border-t border-gray-300 pt-4">
                    <p className="text-xs text-gray-500">Signature — Managing Member (TCL Tech Solutions)</p>
                    <div className="h-10"></div>
                    <p className="text-xs text-gray-400">Date: _______________</p>
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="text-xs text-gray-500">Signature — Member (Stream Walkers Corporation)</p>
                    <div className="h-10"></div>
                    <p className="text-xs text-gray-400">Date: _______________</p>
                  </div>
                </div>
              </div>
            </TCLCard>
          </section>
        )}
      </div>
    </div>
  );
}
