import { useRef } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";

const InvestorWhitePaper = () => {
  const whitePaperRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generatePDF = async () => {
    if (!whitePaperRef.current) return;

    try {
      toast({
        title: "Generating PDF...",
        description: "Please wait while we prepare your document.",
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
      });

      await pdf.html(whitePaperRef.current, {
        callback: (doc) => {
          doc.setProperties({
            title: 'TCL Tech Solutions - Investor White Paper',
            subject: 'Investment Opportunity - $750K Seed Round',
            author: 'TCL Tech Solutions',
            keywords: 'smart home, automation, investment, seed funding, technology',
            creator: 'TCL Tech Solutions',
          });
          doc.save('TCL-Investor-White-Paper.pdf');
          
          toast({
            title: "PDF Downloaded Successfully",
            description: "Your investor white paper has been downloaded.",
          });
        },
        x: 15,
        y: 15,
        width: 180,
        windowWidth: 650,
      });
    } catch (error) {
      toast({
        title: "Error Generating PDF",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <FileText className="w-12 h-12 mr-3" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Investor White Paper
              </h1>
            </div>
            <p className="text-xl text-blue-100 mb-6">
              TCL Tech Solutions - Investment Opportunity
            </p>
            <p className="text-lg text-blue-50 mb-8">
              Seeking $750,000 Seed Capital at $3.75M Post-Money Valuation
            </p>
            <Button 
              onClick={generatePDF}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50"
            >
              <Download className="mr-2 h-5 w-5" />
              Download White Paper PDF
            </Button>
          </div>
        </div>
      </section>

      {/* White Paper Content */}
      <div ref={whitePaperRef} className="white-paper-content">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Investment Opportunity Overview */}
          <Card className="mb-8 print-section">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-3xl text-blue-700">Investment Opportunity Overview</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Funding Requested</p>
                  <p className="text-3xl font-bold text-blue-600">$750,000</p>
                </div>
                <div className="bg-indigo-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Post-Money Valuation</p>
                  <p className="text-3xl font-bold text-indigo-600">$3.75M</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600 mb-1">Equity Offered</p>
                  <p className="text-3xl font-bold text-purple-600">20%</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-green-700 mb-3">Investment Highlights</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• <strong>Proven Business Model:</strong> 12+ paid installations completed since 2024</li>
                  <li>• <strong>Strategic Partnerships:</strong> Direct dealer relationships with SnapAV, Wave Electronics, URC, AVA Cinema</li>
                  <li>• <strong>Experienced Leadership:</strong> Founded by 22-year Air Force veteran with 25+ years in home automation</li>
                  <li>• <strong>High-Growth Market:</strong> $500M TAM in San Antonio metro, growing at 19.2% CAGR</li>
                  <li>• <strong>Strong Unit Economics:</strong> 60% gross margin, $5K LTV, {'<'}3 month payback period</li>
                  <li>• <strong>Path to Profitability:</strong> Positive EBITDA by Year 2, 40% margin by Year 3</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Executive Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                <strong>TCL Tech Solutions</strong> is a San Antonio-based smart home technology integrator specializing in premium home theater, lighting, and full-home automation systems enhanced by proprietary AI logic. Founded in 2024 by Damon J. Jackson, a 22-year Air Force veteran, TCL has established itself as a trusted provider of white-glove installation services with rapid response times and competitive pricing.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Company Overview</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Founded: 2024</li>
                    <li>• Location: San Antonio, TX</li>
                    <li>• Installations Completed: 12+</li>
                    <li>• Service Area: San Antonio Metro (1.5M population)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Key Differentiators</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Proprietary AI integration</li>
                    <li>• 2.5-day average install window</li>
                    <li>• 24-hour support SLA</li>
                    <li>• Veteran-founded credibility</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Opportunity */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Market Opportunity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="text-sm text-gray-600">Total Addressable Market</p>
                  <p className="text-2xl font-bold text-blue-600">$500M</p>
                  <p className="text-xs text-gray-500">San Antonio smart home annual spend</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <p className="text-sm text-gray-600">Served Available Market</p>
                  <p className="text-2xl font-bold text-indigo-600">$100M</p>
                  <p className="text-xs text-gray-500">New homeowners + retrofits</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="text-sm text-gray-600">5-Year Target</p>
                  <p className="text-2xl font-bold text-purple-600">$10M</p>
                  <p className="text-xs text-gray-500">10% market share goal</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Market Drivers</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Global smart home market projected to reach $537B by 2030 (19.2% CAGR)</li>
                  <li>• 4,000+ new homes built annually in San Antonio metro</li>
                  <li>• 45% of new buyers prioritize smart home features</li>
                  <li>• Average renovation budget: $22K per household</li>
                  <li>• Growing demand for AI voice control and energy management</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Financial Projections */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Financial Projections (3-Year)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">Metric</TableHead>
                    <TableHead className="text-center font-semibold">Year 1</TableHead>
                    <TableHead className="text-center font-semibold">Year 2</TableHead>
                    <TableHead className="text-center font-semibold">Year 3</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Revenue</TableCell>
                    <TableCell className="text-center">$660K</TableCell>
                    <TableCell className="text-center">$2.40M</TableCell>
                    <TableCell className="text-center font-semibold text-green-600">$4.10M</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">EBITDA</TableCell>
                    <TableCell className="text-center text-red-600">-$240K</TableCell>
                    <TableCell className="text-center">$900K</TableCell>
                    <TableCell className="text-center font-semibold text-green-600">$2.20M</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">EBITDA Margin</TableCell>
                    <TableCell className="text-center text-red-600">-15%</TableCell>
                    <TableCell className="text-center">30%</TableCell>
                    <TableCell className="text-center font-semibold text-green-600">40%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Gross Margin</TableCell>
                    <TableCell className="text-center">60%</TableCell>
                    <TableCell className="text-center">60%</TableCell>
                    <TableCell className="text-center">60%</TableCell>
                  </TableRow>
                  <TableRow className="bg-blue-50">
                    <TableCell className="font-medium">Monthly Recurring Revenue</TableCell>
                    <TableCell className="text-center">$50K</TableCell>
                    <TableCell className="text-center">$250K</TableCell>
                    <TableCell className="text-center font-semibold text-blue-600">$500K</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="mt-4 grid md:grid-cols-3 gap-3">
                <div className="bg-green-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Customer Acquisition Cost</p>
                  <p className="text-xl font-bold text-green-600">$500</p>
                </div>
                <div className="bg-blue-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Lifetime Value</p>
                  <p className="text-xl font-bold text-blue-600">$5,000</p>
                </div>
                <div className="bg-purple-50 p-3 rounded">
                  <p className="text-xs text-gray-600">Payback Period</p>
                  <p className="text-xl font-bold text-purple-600">{'<'}3 Months</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Streams */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Revenue Model & Streams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                TCL operates a hybrid install + subscription model that drives high customer lifetime value and recurring revenue.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Revenue Stream</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">% of Yr 3 Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Tier 1 Installs</TableCell>
                    <TableCell>$2-8K media rooms, starter automation</TableCell>
                    <TableCell className="text-right">20%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tier 2 Installs</TableCell>
                    <TableCell>$8-40K whole-home AV & lighting</TableCell>
                    <TableCell className="text-right">25%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Tier 3 Installs</TableCell>
                    <TableCell>$40K+ custom theaters & estate automation</TableCell>
                    <TableCell className="text-right">15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Hardware Resale</TableCell>
                    <TableCell>Direct dealer equipment margin</TableCell>
                    <TableCell className="text-right">20%</TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell className="font-medium">Recurring Service Plans</TableCell>
                    <TableCell>$50-$200/month support & monitoring</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">15%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">AI Consulting</TableCell>
                    <TableCell>Bespoke logic scripting & remote tuning</TableCell>
                    <TableCell className="text-right">5%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Competitive Advantages */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Competitive Advantages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Technology & Service</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Proprietary AI automation integration</li>
                    <li>• White-glove local installation service</li>
                    <li>• 2.5-day average install window</li>
                    <li>• 24-hour support SLA guarantee</li>
                    <li>• Remote monitoring and maintenance</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Market Position</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Veteran-founded credibility</li>
                    <li>• Strategic dealer partnerships</li>
                    <li>• Competitive tiered pricing ($2K-$50K+)</li>
                    <li>• Builder and realtor relationships</li>
                    <li>• Local market expertise</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Management Team */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Management Team</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800">Damon J. Jackson - Founder & CEO</h4>
                <p className="text-sm text-gray-700">
                  22-year U.S. Air Force veteran with extensive intelligence and network communications background. 
                  B.S. in Network & Communications Management. Over 25 years of experience in custom home theater 
                  and automation installation, having personally built 30+ custom theaters since 1999.
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
                <h4 className="font-semibold text-gray-800">Phillip Russell - Management Consultant & Investment Liaison</h4>
                <p className="text-sm text-gray-700">
                  SaaS and growth specialist with expertise in investor relations, business automation, 
                  and go-to-market strategy. Oversees strategic partnerships and funding initiatives.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Use of Funds */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Use of Funds</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">% of Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Equipment & Technology</TableCell>
                    <TableCell className="text-right font-semibold">$200,000</TableCell>
                    <TableCell className="text-right">26.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Salaries (First 12 Months)</TableCell>
                    <TableCell className="text-right font-semibold">$150,000</TableCell>
                    <TableCell className="text-right">20.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Working Capital & Operations</TableCell>
                    <TableCell className="text-right font-semibold">$150,000</TableCell>
                    <TableCell className="text-right">20.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Marketing & Customer Acquisition</TableCell>
                    <TableCell className="text-right font-semibold">$100,000</TableCell>
                    <TableCell className="text-right">13.3%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Showroom & Office Setup</TableCell>
                    <TableCell className="text-right font-semibold">$50,000</TableCell>
                    <TableCell className="text-right">6.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Contingency Reserve</TableCell>
                    <TableCell className="text-right font-semibold">$50,000</TableCell>
                    <TableCell className="text-right">6.7%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>R&D & Product Development</TableCell>
                    <TableCell className="text-right font-semibold">$30,000</TableCell>
                    <TableCell className="text-right">4.0%</TableCell>
                  </TableRow>
                  <TableRow className="bg-blue-50 font-semibold">
                    <TableCell>Total</TableCell>
                    <TableCell className="text-right">$750,000</TableCell>
                    <TableCell className="text-right">100%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Cap Table */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Capitalization Table (Post-Money)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Shareholder</TableHead>
                    <TableHead className="text-right">Shares</TableHead>
                    <TableHead className="text-right">Ownership %</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Damon Jackson</TableCell>
                    <TableCell className="text-right">510,000</TableCell>
                    <TableCell className="text-right">40.8%</TableCell>
                    <TableCell className="text-right">$1,530,000</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Phillip Russell</TableCell>
                    <TableCell className="text-right">490,000</TableCell>
                    <TableCell className="text-right">39.2%</TableCell>
                    <TableCell className="text-right">$1,470,000</TableCell>
                  </TableRow>
                  <TableRow className="bg-green-50">
                    <TableCell className="font-medium">Seed Investors</TableCell>
                    <TableCell className="text-right font-semibold">250,000</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">20.0%</TableCell>
                    <TableCell className="text-right font-semibold text-green-600">$750,000</TableCell>
                  </TableRow>
                  <TableRow className="border-t-2 font-semibold">
                    <TableCell>Total Outstanding</TableCell>
                    <TableCell className="text-right">1,250,000</TableCell>
                    <TableCell className="text-right">100%</TableCell>
                    <TableCell className="text-right">$3,750,000</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Exit Strategy */}
          <Card className="mb-8 print-section">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600">Exit Strategy & Investor Returns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-700 mb-2">Strategic Acquisition (3-5 Years)</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Primary exit strategy through acquisition by established smart home integrators or technology companies.
                  </p>
                  <p className="text-xs font-semibold text-gray-800">Potential Acquirers:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• SnapAV</li>
                    <li>• Savant</li>
                    <li>• Control4</li>
                    <li>• Best Buy (Geek Squad)</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-700 mb-2">IPO Option (5-7 Years)</h4>
                  <p className="text-sm text-gray-700 mb-3">
                    Alternative exit path if company achieves $12M+ in recurring revenue and expands beyond San Antonio market.
                  </p>
                  <p className="text-xs font-semibold text-gray-800">Target Returns:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    <li>• 10-15× investor IRR</li>
                    <li>• Acquisition multiple: 3-5× revenue</li>
                    <li>• Projected $12-20M exit value</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact & Next Steps */}
          <Card className="print-section">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">Contact & Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <p className="text-gray-700">
                  For detailed due diligence materials, financial models, or to schedule a meeting with our team:
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="font-semibold text-gray-800 mb-2">TCL Tech Solutions</p>
                  <p className="text-sm text-gray-700">San Antonio, Texas</p>
                  <p className="text-sm text-gray-700 mb-4">Email: investors@tcltechsolutions.com</p>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    Schedule Investor Meeting
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  This white paper is a summary. Full business plan and financial models available upon request.
                </p>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>

      {/* Bottom Download Button */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Button 
            onClick={generatePDF}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Download className="mr-2 h-5 w-5" />
            Download White Paper PDF
          </Button>
        </div>
      </div>

      <Footer />

      <style>{`
        @media print {
          .white-paper-content {
            background: white !important;
          }
          
          .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }
          
          nav, footer, button {
            display: none !important;
          }
        }
        
        .white-paper-content {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      `}</style>
    </div>
  );
};

export default InvestorWhitePaper;
