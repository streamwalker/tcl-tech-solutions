
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Target, Megaphone, DollarSign } from "lucide-react";

const ProductsStrategy = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-6 w-6 text-blue-600" />
            Products & Services Portfolio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-600">Tier 1 Installs</CardTitle>
                  <div className="text-sm text-gray-600">20% of Year 3 Revenue</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">$2-8K</div>
                  <p className="text-sm text-gray-700">Media rooms, starter automation</p>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-600">Tier 2 Installs</CardTitle>
                  <div className="text-sm text-gray-600">25% of Year 3 Revenue</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">$8-40K</div>
                  <p className="text-sm text-gray-700">Whole-home AV & lighting</p>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-600">Tier 3 Installs</CardTitle>
                  <div className="text-sm text-gray-600">15% of Year 3 Revenue</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">$40K+</div>
                  <p className="text-sm text-gray-700">Custom theaters & estate automation</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-orange-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-600">Hardware Resale</CardTitle>
                  <div className="text-sm text-gray-600">20% of Revenue</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">Direct-dealer equipment margins</p>
                </CardContent>
              </Card>

              <Card className="border-red-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-600">Service Plans</CardTitle>
                  <div className="text-sm text-gray-600">15% of Revenue</div>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold mb-2">$50-200/mo</div>
                  <p className="text-sm text-gray-700">Support & monitoring</p>
                </CardContent>
              </Card>

              <Card className="border-indigo-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-indigo-600">AI Consulting</CardTitle>
                  <div className="text-sm text-gray-600">5% of Revenue</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">Bespoke logic scripting & remote tuning</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Business Model & Revenue Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">60%</div>
              <div className="text-sm text-gray-600">Gross Margin (Blended)</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$500</div>
              <div className="text-sm text-gray-600">Customer Acquisition Cost</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">$5,000</div>
              <div className="text-sm text-gray-600">Lifetime Value (3-yr)</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">{"< 3 mo"}</div>
              <div className="text-sm text-gray-600">Payback Period (Tier 2+)</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Megaphone className="h-6 w-6 text-purple-600" />
            Marketing & Sales Strategy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Channel Partnerships</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Coventry, Lennar, Perry Homes pre-wire upsells</li>
                <li>• 20+ realtor team partnerships</li>
                <li>• Builder referral programs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Digital Marketing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Google Local Services Ads</li>
                <li>• TikTok & Instagram Reels demos</li>
                <li>• Retargeting funnels</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Content Marketing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 3-minute customer case studies</li>
                <li>• AI-generated lighting simulations</li>
                <li>• YouTube installation tutorials</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Field Marketing</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Home & Garden Show booths</li>
                <li>• Parade-of-homes presence</li>
                <li>• EDDM mailers (target zip codes)</li>
              </ul>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Key Performance Indicators</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="font-bold text-blue-600">25%+</div>
                <div className="text-sm text-gray-600">Install Close Rate</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-green-600">60%+</div>
                <div className="text-sm text-gray-600">Support Plan Attach</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-purple-600">30%</div>
                <div className="text-sm text-gray-600">Free-to-Paid Conversion</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-orange-600">{"< $175"}</div>
                <div className="text-sm text-gray-600">Cost Per Lead</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsStrategy;
