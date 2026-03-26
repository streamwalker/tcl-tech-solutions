import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Home, Download, DollarSign, Building2, Shield, FileText, Users, Repeat, Clock, ChevronRight, Layers, CreditCard, Landmark, Award, Handshake, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

const sections = [
  { id: "what-tcl-is", title: "What TCL Actually Is" },
  { id: "layer-1", title: "Layer 1: Immediate Liquidity" },
  { id: "layer-2", title: "Layer 2: Revenue-Backed Capital" },
  { id: "layer-3", title: "Layer 3: Non-Dilutive Funding" },
  { id: "layer-4", title: "Layer 4: Contract Stacking" },
  { id: "layer-5", title: "Layer 5: Builder & Developer" },
  { id: "layer-6", title: "Layer 6: Recurring Revenue" },
  { id: "summary", title: "Full Capital Stack Summary" },
  { id: "timeline", title: "Timeline to $1M+" },
  { id: "next-steps", title: "Next Steps" },
];

const layerColors = [
  "bg-blue-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-cyan-500",
];

const layerBadgeColors = [
  "bg-blue-100 text-blue-800",
  "bg-emerald-100 text-emerald-800",
  "bg-amber-100 text-amber-800",
  "bg-purple-100 text-purple-800",
  "bg-rose-100 text-rose-800",
  "bg-cyan-100 text-cyan-800",
];

const CapitalStack = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("what-tcl-is");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-foreground text-primary-foreground z-50 border-b border-muted-foreground/20">
        <div className="flex items-center justify-between h-16 px-6">
          <div>
            <h1 className="text-xl font-bold">TCL Tech Solutions</h1>
            <p className="text-sm opacity-70">Capital Stack Strategy</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => navigate("/")}>
              <Home className="h-4 w-4 mr-2" /> Home
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10" onClick={() => window.print()}>
              <Download className="h-4 w-4 mr-2" /> PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="pt-16 flex">
        {/* Sidebar TOC */}
        <aside className="hidden lg:block w-64 fixed left-0 top-16 bottom-0 bg-card border-r border-border overflow-y-auto print:hidden">
          <nav className="p-4 space-y-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={cn(
                  "w-full text-left text-sm px-3 py-2 rounded-md transition-colors",
                  activeSection === s.id
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 max-w-4xl mx-auto px-6 py-12">
          {/* Hero */}
          <div className="mb-16 text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Financial Strategy</Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              TCL Capital Stack Strategy
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Building a <span className="font-bold text-primary">$1.9M+</span> capital ecosystem — without giving up equity.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <Badge variant="outline" className="text-sm py-1 px-3">✅ Tiered Pricing</Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">✅ Recurring Revenue</Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">✅ Builder Relationships</Badge>
              <Badge variant="outline" className="text-sm py-1 px-3">✅ Vendor Partnerships</Badge>
            </div>
          </div>

          {/* What TCL Is */}
          <section id="what-tcl-is" className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Building2 className="h-8 w-8 text-primary" />
              What TCL Actually Is (Financially)
            </h2>
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-lg font-semibold text-foreground mb-4">
                  TCL is a high-margin installation + recurring services business with enterprise crossover potential.
                </p>
                <p className="text-muted-foreground mb-4">
                  TCL is <strong>not a startup</strong>. It's an <strong>early-stage infrastructure company</strong>. That distinction matters because it opens doors to funding most tech companies can't access.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  {[
                    "Small business funding",
                    "Infrastructure/energy incentives",
                    "Government contracts",
                    "Equipment financing",
                    "Recurring revenue lending",
                    "Vendor financing programs",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Layer 1 */}
          <section id="layer-1" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold", layerColors[0])}>1</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Immediate Liquidity</h2>
                <p className="text-sm text-muted-foreground">0–30 Days • Goal: $50K–$150K</p>
              </div>
            </div>

            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CreditCard className="h-5 w-5 text-blue-500" /> Business Credit Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Target: <strong>$75K–$150K</strong> combined limits across American Express, Chase, and Capital One.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p><strong>Use for:</strong> Equipment purchases, marketing, initial hires/subcontractors</p>
                    <p className="text-destructive font-medium">⚠️ Rule: Only deploy into revenue-generating installs</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Layers className="h-5 w-5 text-blue-500" /> Equipment Financing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    <strong>This is where you're under-leveraged.</strong> You install AV systems, networking gear, and automation hardware — you should NOT be paying upfront.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>Use vendor financing programs and leasing companies to preserve cash while scaling installs.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Layer 2 */}
          <section id="layer-2" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold", layerColors[1])}>2</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Revenue-Backed Capital</h2>
                <p className="text-sm text-muted-foreground">30–90 Days • Goal: $100K–$500K</p>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Once you have 3–5 installs/month and recurring service contracts, you unlock <strong>Revenue-Based Financing (RBF)</strong>.
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-foreground mb-1">Example:</p>
                  <p className="text-sm text-muted-foreground">Close a $40K install → Get $20K upfront. That contract itself becomes collateral.</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Companies lend based on deposits, invoices, and signed contracts — not credit scores.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Layer 3 */}
          <section id="layer-3" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold", layerColors[2])}>3</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Non-Dilutive Funding</h2>
                <p className="text-sm text-muted-foreground">Your Edge • Goal: $100K–$300K</p>
              </div>
            </div>
            <p className="text-muted-foreground mb-6">
              This is where your veteran + minority status becomes a strategic asset.
            </p>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-amber-500" /> SDVOSB Certification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Through the Small Business Administration. Unlocks <strong>set-aside federal contracts</strong>.</p>
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">Not optional. Mandatory.</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Landmark className="h-5 w-5 text-amber-500" /> Texas-Level Funding
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-2">Through the Texas Economic Development Office:</p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Workforce development grants</li>
                    <li>Small business expansion grants</li>
                    <li>Energy efficiency incentives</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-amber-200 bg-amber-50/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <DollarSign className="h-5 w-5 text-amber-600" /> Energy Efficiency Programs (Hidden Goldmine)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">Through the Department of Energy. You already install smart thermostats, lighting automation, and energy monitoring.</p>
                  <p className="text-sm font-semibold text-foreground">These qualify for rebates, subsidies, and pilot programs.</p>
                  <p className="text-sm text-primary mt-2 font-medium">You can literally sell installs that are partially funded by the government.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Layer 4 */}
          <section id="layer-4" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold", layerColors[3])}>4</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Contract Stacking</h2>
                <p className="text-sm text-muted-foreground">The Real Play • Goal: $250K–$2M</p>
              </div>
            </div>
            <div className="grid gap-6">
              <Card>
                <CardHeader><CardTitle className="text-lg">Step 1 — Register</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-500" /> SAM.gov</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-500" /> VA vendor system</li>
                    <li className="flex items-center gap-2"><ChevronRight className="h-4 w-4 text-purple-500" /> Local procurement portals</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Step 2 — Position TCL Correctly</CardTitle></CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-destructive mb-1">❌ NOT:</p>
                      <p className="text-sm text-muted-foreground">"Smart Home Company"</p>
                    </div>
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <p className="text-sm font-semibold text-emerald-700 mb-1">✅ INSTEAD:</p>
                      <p className="text-sm text-muted-foreground">"Smart Infrastructure, Network Systems, and Integrated Automation Contractor"</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-1 text-sm text-muted-foreground">
                    <p>Now you qualify for: Military housing upgrades, VA hospital systems, government facility networking, smart city pilot programs.</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle className="text-lg">Step 3 — Start as a Subcontractor</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">The cheat code. Partner with existing government contractors and builders already doing public work.</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Revenue</Badge>
                    <Badge variant="outline">Past Performance</Badge>
                    <Badge variant="outline">Credibility</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Layer 5 */}
          <section id="layer-5" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold", layerColors[4])}>5</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Builder & Developer Stack</h2>
                <p className="text-sm text-muted-foreground">Pipeline Play • Goal: $500K–$2M</p>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  You already have relationships with <strong>Coventry, Lennar, and Perry Homes</strong>. Instead of selling one home at a time, sell <strong>"Smart Home Package for entire communities."</strong>
                </p>
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold text-foreground mb-1">Example:</p>
                  <p className="text-sm text-muted-foreground">50 homes × $3K per home = <strong>$150K contract</strong></p>
                  <p className="text-sm text-primary mt-1 font-medium">5 communities = $750K+</p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Layer 6 */}
          <section id="layer-6" className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold", layerColors[5])}>6</div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Recurring Revenue Engine</h2>
                <p className="text-sm text-muted-foreground">Valuation Multiplier • Goal: $10K–$50K/month</p>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Managed services at $50–$200/month per client. This unlocks recurring revenue financing + valuation multiples.
                </p>
                <div className="space-y-4">
                  {[
                    { clients: 100, rate: 100, total: "$10K/month" },
                    { clients: 200, rate: 100, total: "$20K/month" },
                    { clients: 300, rate: 100, total: "$30K/month" },
                  ].map((row) => (
                    <div key={row.clients} className="flex items-center gap-4">
                      <span className="text-sm text-muted-foreground w-32">{row.clients} clients × ${row.rate}</span>
                      <Progress value={(row.clients / 300) * 100} className="flex-1 h-3" />
                      <span className="text-sm font-bold text-foreground w-24 text-right">{row.total}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Summary Table */}
          <section id="summary" className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-primary" />
              Full Capital Stack Summary
            </h2>
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Layer</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { layer: 1, source: "Business Credit", amount: "$100K", color: layerBadgeColors[0] },
                      { layer: 2, source: "Equipment Financing", amount: "$100K", color: layerBadgeColors[0] },
                      { layer: 3, source: "Grants + Incentives", amount: "$150K", color: layerBadgeColors[2] },
                      { layer: 4, source: "Contracts (sub + direct)", amount: "$500K", color: layerBadgeColors[3] },
                      { layer: 5, source: "Builder Deals", amount: "$750K", color: layerBadgeColors[4] },
                      { layer: 6, source: "Recurring Revenue Value", amount: "$300K+", color: layerBadgeColors[5] },
                    ].map((row) => (
                      <TableRow key={row.source}>
                        <TableCell><Badge className={cn("text-xs", row.color)}>Layer {row.layer}</Badge></TableCell>
                        <TableCell className="font-medium">{row.source}</TableCell>
                        <TableCell className="text-right font-bold">{row.amount}</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-primary/5 font-bold">
                      <TableCell colSpan={2} className="text-lg">Total Capital Impact</TableCell>
                      <TableCell className="text-right text-lg text-primary">$1.9M+</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <p className="text-center text-muted-foreground mt-4 text-sm font-medium">
              And you didn't give up equity.
            </p>
          </section>

          {/* Timeline */}
          <section id="timeline" className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Clock className="h-8 w-8 text-primary" />
              Timeline to $1M+
            </h2>
            <div className="space-y-6">
              {[
                { period: "0–60 Days", revenue: "$10K–$30K/month", desc: "Installs ramp up", progress: 25 },
                { period: "3–6 Months", revenue: "$50K–$100K/month", desc: "Builder + installs combined", progress: 60 },
                { period: "6–12 Months", revenue: "$500K–$1M+ annual run rate", desc: "Full stack operational", progress: 100 },
              ].map((phase) => (
                <Card key={phase.period}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground">{phase.period}</h3>
                        <p className="text-sm text-muted-foreground">{phase.desc}</p>
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-sm">{phase.revenue}</Badge>
                    </div>
                    <Progress value={phase.progress} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Next Steps */}
          <section id="next-steps" className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <FileText className="h-8 w-8 text-primary" />
              Next Steps
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: "TCL Capability Statement", desc: "Government-ready PDF for federal & state contracts", icon: FileText },
                { title: "Builder Pitch Deck", desc: "To land 50+ home community contracts", icon: Users },
                { title: "Grant & Contract Pipeline", desc: "Specific to San Antonio market", icon: Landmark },
                { title: "Financing Model", desc: "Turn installs into cash flow machines", icon: TrendingUp },
              ].map((item) => (
                <Card key={item.title} className="hover:border-primary/30 transition-colors">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="mt-8 border-primary/30 bg-primary/5">
              <CardContent className="p-6 text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  The Real Strategy
                </p>
                <p className="text-muted-foreground">
                  TCL becomes a <strong>Cash Engine</strong> (installs + builder deals) → <strong>Contract Engine</strong> (government + infrastructure) → <strong>Recurring Engine</strong> (monitoring + support).
                </p>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>

      <div className="lg:ml-64">
        <Footer />
      </div>
    </div>
  );
};

export default CapitalStack;
