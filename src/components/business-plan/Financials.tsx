
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, PieChart as PieChartIcon, Target } from "lucide-react";

const Financials = () => {
  const revenueData = [
    { year: "Year 1", revenue: 0.66, ebitda: -0.24, margin: -15 },
    { year: "Year 2", revenue: 2.40, ebitda: 0.90, margin: 30 },
    { year: "Year 3", revenue: 4.10, ebitda: 2.20, margin: 40 }
  ];

  const fundingData = [
    { category: "Equipment & Tech", amount: 200, color: "#3b82f6" },
    { category: "Salaries (12mo)", amount: 150, color: "#10b981" },
    { category: "Marketing", amount: 100, color: "#8b5cf6" },
    { category: "Showroom & Office", amount: 50, color: "#f59e0b" },
    { category: "Working Capital", amount: 150, color: "#ef4444" },
    { category: "R&D", amount: 30, color: "#06b6d4" },
    { category: "Contingency", amount: 50, color: "#84cc16" }
  ];

  const capTableData = [
    { name: "Damon Jackson", percentage: 40.8, shares: 510000, color: "#3b82f6" },
    { name: "Phillip Russell", percentage: 39.2, shares: 490000, color: "#10b981" },
    { name: "Seed Investors", percentage: 20.0, shares: 250000, color: "#8b5cf6" }
  ];

  const chartConfig = {
    revenue: { label: "Revenue ($M)", color: "#3b82f6" },
    ebitda: { label: "EBITDA ($M)", color: "#10b981" },
    margin: { label: "EBITDA Margin (%)", color: "#8b5cf6" }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Financial Projections Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$0.66M</div>
              <div className="text-sm text-gray-600">Year 1 Revenue</div>
              <div className="text-xs text-red-600">-15% EBITDA</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">$2.40M</div>
              <div className="text-sm text-gray-600">Year 2 Revenue</div>
              <div className="text-xs text-green-600">30% EBITDA</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">$4.10M</div>
              <div className="text-sm text-gray-600">Year 3 Revenue</div>
              <div className="text-xs text-purple-600">40% EBITDA</div>
            </div>
          </div>

          <ChartContainer config={chartConfig} className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="#3b82f6" name="Revenue ($M)" />
                <Bar dataKey="ebitda" fill="#10b981" name="EBITDA ($M)" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6 text-blue-600" />
              Use of Funds ($750K)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundingData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="amount"
                    label={({ category, amount }) => `${category}: $${amount}K`}
                  >
                    {fundingData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-6 w-6 text-purple-600" />
              Cap Table (Post-Money)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {capTableData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <div className="font-medium">{item.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{item.percentage}%</div>
                    <div className="text-sm text-gray-600">{item.shares.toLocaleString()} shares</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-sm text-gray-600 text-center">
              Post-Money Valuation: $3.75M
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-orange-600" />
            Key Financial Assumptions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Revenue Drivers</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Monthly OpEx: $50K (inflating 10%/year)</li>
                <li>• Revenue Growth: +$10K/mo Year 1, +$100K/quarter thereafter</li>
                <li>• Gross Margin: 60% blended</li>
                <li>• EBITDA Margin Goal: 40% by Year 3</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Unit Economics</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Customer Acquisition Cost: $500</li>
                <li>• Lifetime Value: $5,000 (3-year horizon)</li>
                <li>• Payback Period: < 3 months (Tier 2+)</li>
                <li>• Monthly Recurring Revenue target: $500K by Month 24</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-green-600">Risk Mitigation</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• IP Protection: File 2 core automation patents</li>
              <li>• Quality Assurance: Post-install surveys + maintenance</li>
              <li>• Installer Network: Exclusive contractor agreements</li>
              <li>• Financial Controls: Real-time dashboards</li>
              <li>• Cash Management: 2-month contingency</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg text-purple-600">Exit Strategy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="font-semibold text-sm mb-2">Strategic Acquisition (3-5 years)</div>
                <div className="text-sm text-gray-700">Targets: SnapAV, Savant, Control4, Best Buy</div>
              </div>
              <div>
                <div className="font-semibold text-sm mb-2">IPO Option (5-7 years)</div>
                <div className="text-sm text-gray-700">Pending $12M+ recurring revenue</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-semibold text-yellow-800">Investor IRR Goal: 10-15×</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Financials;
