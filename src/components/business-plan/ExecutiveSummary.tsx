
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, DollarSign, Users, TrendingUp } from "lucide-react";

const ExecutiveSummary = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-blue-600" />
            Executive Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed">
              TCL Tech Solutions ("TCL") is a San Antonio-based smart-home technology integrator specializing in premium home theater, lighting, 
              and full-home automation systems enhanced by proprietary AI logic. Founded in 2024 by 22-year Air Force veteran Damon J. Jackson, the company 
              has completed more than a dozen paid installations and secured direct-dealer relationships with SnapAV, Wave Electronics, Universal Remote Control (URC), 
              and AVA Cinema.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <DollarSign className="h-5 w-5" />
                  Funding Request
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">$750,000</div>
                <p className="text-gray-600">Seed capital at $3.75M post-money valuation</p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <TrendingUp className="h-5 w-5" />
                  Market Opportunity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-2">$100M</div>
                <p className="text-gray-600">Served Available Market (SAM) in San Antonio metro</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-blue-600" />
                Key Year-3 Targets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">$4.1M</div>
                  <div className="text-sm text-gray-600">Annual Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">40%</div>
                  <div className="text-sm text-gray-600">EBITDA Margin</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">$500K</div>
                  <div className="text-sm text-gray-600">Monthly Recurring Revenue</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">$1.3M</div>
                  <div className="text-sm text-gray-600">Cash Reserve (Month 18)</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Investment Thesis</h3>
            <p className="text-gray-700 leading-relaxed">
              Proceeds will accelerate hiring, inventory, showroom development, and recurring-revenue platform rollout—enabling TCL to capture a projected 
              10% share of a $100 million Served Available Market (SAM) in the San Antonio metro over five years. The company's veteran-led foundation, 
              AI-powered differentiation, and subscription-based revenue model position it for rapid growth and attractive exit opportunities.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutiveSummary;
