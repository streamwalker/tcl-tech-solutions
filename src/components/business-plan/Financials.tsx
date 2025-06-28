
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from "recharts";

const Financials = () => {
  const financialData = [
    { year: "Year 1", revenue: 0.66, ebitda: -0.24, ebitdaPercent: -15 },
    { year: "Year 2", revenue: 2.40, ebitda: 0.90, ebitdaPercent: 30 },
    { year: "Year 3", revenue: 4.10, ebitda: 2.20, ebitdaPercent: 40 }
  ];

  const useOfFunds = [
    { category: "Equipment & Tech", amount: "$200k" },
    { category: "Salaries (first 12 mo)", amount: "$150k" },
    { category: "Showroom & Office Setup", amount: "$50k" },
    { category: "Marketing", amount: "$100k" },
    { category: "R&D", amount: "$30k" },
    { category: "Working Capital & Ops", amount: "$150k" },
    { category: "Contingency", amount: "$50k" }
  ];

  const capTable = [
    { holder: "Damon Jackson", percentage: "40.8%", shares: "510,000" },
    { holder: "Phillip Russell", percentage: "39.2%", shares: "490,000" },
    { holder: "Seed Investors", percentage: "20.0%", shares: "250,000" },
    { holder: "Total", percentage: "100%", shares: "1,250,000" }
  ];

  const chartConfig = {
    revenue: {
      label: "Revenue ($M)",
      color: "#2563eb"
    },
    ebitda: {
      label: "EBITDA ($M)",
      color: "#16a34a"
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">10. Financial Plan & Pro Forma</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Revenue & EBITDA Projection</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" name="Revenue ($M)" />
                    <Bar dataKey="ebitda" fill="var(--color-ebitda)" name="EBITDA ($M)" />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">EBITDA Margin Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-64">
                  <LineChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="ebitdaPercent" 
                      stroke="var(--color-ebitda)" 
                      strokeWidth={3}
                      name="EBITDA Margin (%)"
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>Year 1</TableHead>
                <TableHead>Year 2</TableHead>
                <TableHead>Year 3</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Revenue</TableCell>
                <TableCell>$0.66M</TableCell>
                <TableCell>$2.40M</TableCell>
                <TableCell className="font-semibold text-green-600">$4.10M</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EBITDA</TableCell>
                <TableCell className="text-red-600">−$0.24M</TableCell>
                <TableCell>$0.90M</TableCell>
                <TableCell className="font-semibold text-green-600">$2.20M</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">EBITDA %</TableCell>
                <TableCell className="text-red-600">−15%</TableCell>
                <TableCell>30%</TableCell>
                <TableCell className="font-semibold text-green-600">40%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Cash EoY</TableCell>
                <TableCell>$0.81M</TableCell>
                <TableCell>$1.38M</TableCell>
                <TableCell>$—</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="text-blue-700">Key Assumptions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li>• Monthly OpEx – $50k (inflating 10%/yr)</li>
                <li>• Revenue Growth – +$10k/mo ramp Year 1, then +$100k/quarter</li>
                <li>• Gross Margin – 60%; EBITDA Margin Goal – 40% by Year 3</li>
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">11. Capital Requirements & Cap Table</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Use of Funds (Seed $750k)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category</TableHead>
                      <TableHead>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {useOfFunds.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.category}</TableCell>
                        <TableCell className="font-semibold text-blue-600">{item.amount}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cap Table (Post‑Money)</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Holder</TableHead>
                      <TableHead>%</TableHead>
                      <TableHead>Shares</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capTable.map((item, index) => (
                      <TableRow key={index} className={item.holder === "Total" ? "border-t-2 font-semibold" : ""}>
                        <TableCell>{item.holder}</TableCell>
                        <TableCell className="text-blue-600">{item.percentage}</TableCell>
                        <TableCell>{item.shares}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-600">12. Risk Mitigation & Exit Strategy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-700">Risk Mitigation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• IP Protection – File 2 core automation patents</li>
                  <li>• QA Loop – Post‑install surveys + proactive maintenance</li>
                  <li>• Installer Network – Exclusive contractor agreements</li>
                  <li>• Switching Costs – Integrated AI logic tied to TCL cloud</li>
                  <li>• Financial Controls – Real‑time dashboards; 2‑month cash contingency</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700">Exit Strategy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Strategic Acquisition – 3‑5 yrs; targets: SnapAV, Savant, Control4, Best Buy</li>
                  <li>• IPO Option – 5‑7 yrs pending $12M+ recurring revenue</li>
                  <li>• Investor IRR Goal – 10‑15× via acquisition multiple</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Financials;
