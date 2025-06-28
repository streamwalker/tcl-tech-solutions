
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExecutiveSummary = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-blue-600">1. Executive Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg leading-relaxed">
            TCL Tech Solutions ("TCL") is a San Antonio‑based smart‑home technology integrator specializing in premium home theater, lighting, and full‑home automation systems enhanced by proprietary AI logic. Founded in 2024 by 22‑year Air Force veteran Damon J. Jackson, the company has completed more than a dozen paid installations and secured direct‑dealer relationships with SnapAV, Wave Electronics, Universal Remote Control (URC), and AVA Cinema.
          </p>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Investment Opportunity</h3>
            <p className="text-lg">
              TCL is seeking <strong>$750,000 in seed capital</strong> at a <strong>$3.75 million post‑money valuation</strong>. Proceeds will accelerate hiring, inventory, showroom development, and recurring‑revenue platform rollout—enabling TCL to capture a projected 10% share of a $100 million Served Available Market (SAM) in the San Antonio metro over five years.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-700">Key Year‑3 Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Annual Revenue</span>
                    <span className="font-semibold">$4.1 million</span>
                  </li>
                  <li className="flex justify-between">
                    <span>EBITDA Margin</span>
                    <span className="font-semibold">40%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Monthly Recurring Revenue</span>
                    <span className="font-semibold">$500k by Month 24</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Cash Reserve</span>
                    <span className="font-semibold">&gt; $1.3M by Month 18</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-blue-700">Competitive Advantages</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>• Local, white‑glove installs with rapid response</li>
                  <li>• Proprietary AI integration for smart automation</li>
                  <li>• 2.5‑day average install window</li>
                  <li>• 24‑hour support SLA</li>
                  <li>• Competitive tiered pricing ($2k - $50k+)</li>
                  <li>• Veteran‑founded credibility</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveSummary;
