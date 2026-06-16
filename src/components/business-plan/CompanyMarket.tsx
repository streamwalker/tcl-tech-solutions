
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const CompanyMarket = () => {
  const marketData = [
    { metric: "Metro Population", value: "1.5M (1.7% CAGR)", description: "2025 Value" },
    { metric: "TAM (smart‑home spend)", value: "$500M p.a.", description: "Total addressable market" },
    { metric: "SAM (new homeowners + retrofits)", value: "$100M p.a.", description: "Served available market" },
    { metric: "SOM Target (5 yr)", value: "$10M", description: "Serviceable obtainable market" },
    { metric: "Avg New‑Home Starts", value: "4,000+/yr", description: "Annual construction" },
    { metric: "Avg Renovation Budget", value: "$22k", description: "Per household" },
    { metric: "Smart Feature Adoption", value: "45%", description: "Of new buyers" },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">2. Company Overview & Vision</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-blue-700">Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Transform the way Texans live, work, and play at home by delivering intuitive, AI‑powered smart‑home experiences.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-purple-700">Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Become Texas's #1 high‑end smart‑home integrator within five years and a nationally recognized acquisition target within seven.</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-700">Values</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Veteran discipline • Customer obsession • Innovation at speed • Fair, transparent pricing</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">3. Market Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3.1 Industry Outlook</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Global smart‑home market projected to reach $537B by 2030 (CAGR 19.2%)</li>
                  <li>• U.S. market &gt; $40B in 2024</li>
                  <li>• AI voice‑control & energy‑management segments growing fastest</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">3.3 Competitive Landscape</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Local Integrators</h4>
                    <p className="text-sm text-gray-600">Bjorn's Audio Video, Digital Pro AV, Sterling Home Tech</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Regional Players</h4>
                    <p className="text-sm text-gray-600">Texas Smart Home Pros, Guardian Security</p>
                  </div>
                  <div>
                    <h4 className="font-semibold">National Entrants</h4>
                    <p className="text-sm text-gray-600">Best Buy (Geek Squad), Vivint, ADT</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">3.2 San Antonio Smart‑Home Market Sizing</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>2025 Value</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marketData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{row.metric}</TableCell>
                      <TableCell className="font-semibold text-blue-600">{row.value}</TableCell>
                      <TableCell className="text-gray-600">{row.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyMarket;
