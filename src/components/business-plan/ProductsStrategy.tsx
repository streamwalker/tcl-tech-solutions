
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ProductsStrategy = () => {
  const products = [
    { offering: "Tier 1 Installs", description: "$2‑8k media rooms, starter automation", revenue: "20%" },
    { offering: "Tier 2 Installs", description: "$8‑40k whole‑home AV & lighting", revenue: "25%" },
    { offering: "Tier 3 Installs", description: "$40k+ custom theaters & estate automation", revenue: "15%" },
    { offering: "Hardware Resale", description: "Direct‑dealer equipment margin", revenue: "20%" },
    { offering: "Recurring Service Plans", description: "$50‑$200/mo support & monitoring", revenue: "15%" },
    { offering: "AI Consulting", description: "Bespoke logic scripting & remote tuning", revenue: "5%" },
  ];

  const businessMetrics = [
    { metric: "Gross Margin", value: "60%", description: "Blended across products" },
    { metric: "CAC", value: "$500", description: "Builder/agent referrals + paid digital" },
    { metric: "LTV", value: "$5,000", description: "Per customer (3‑yr horizon)" },
    { metric: "Payback", value: "< 3 months", description: "On Tier 2+ customers" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">4. Products & Services</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Offering</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>% Revenue Yr 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{product.offering}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell className="font-semibold text-blue-600">{product.revenue}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Subscription Add‑Ons (Future)</h3>
            <ul className="space-y-2">
              <li>• Security‑as‑a‑Service via third‑party monitoring</li>
              <li>• Energy Optimization Credits tied to utility rebates</li>
              <li>• Content‑Streaming Bundles with partner revenue share</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">5. Business Model & Revenue Streams</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Hybrid Install + Subscription model drives high LTV and smoothing of cash flows.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {businessMetrics.map((metric, index) => (
              <Card key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.metric}</span>
                    <span className="text-xl font-bold text-blue-600">{metric.value}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">6. Marketing & Sales Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Channel Partnerships</h3>
              <p>Coventry, Lennar, Perry Homes pre‑wire upsells; 20+ realtor teams</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Digital Demand Gen</h3>
              <p>Google Local Services Ads, TikTok & IG Reels demos, retargeting funnels</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Content Marketing</h3>
              <p>3‑min customer case‑study videos; AI‑generated lighting simulations</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Field Marketing</h3>
              <p>Home & Garden Shows, parade‑of‑homes booths, EDDM mailers (zip 78245, 78253, 78254)</p>
            </div>
          </div>

          <Card className="bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-700">Key Performance Indicators</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                <li>• Install close rate &gt; 25%</li>
                <li>• Support‑plan attach &gt; 60%</li>
                <li>• CPL &lt; $175</li>
                <li>• Subscription upsell: 30% opt‑in goal</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsStrategy;
