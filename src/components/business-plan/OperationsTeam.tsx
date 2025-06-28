
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Users, MapPin, CheckCircle } from "lucide-react";

const OperationsTeam = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            Operations & Execution Plan
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-4">Staffing Plan (Month 12)</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 5 Professional Installers</li>
                <li>• 1 Support Technician</li>
                <li>• 1 Sales Representative</li>
                <li>• Administrative Support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Infrastructure</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Showroom & Content Studio (2,000 sq ft)</li>
                <li>• Far West San Antonio location</li>
                <li>• ActivePipeline CRM + Notion</li>
                <li>• Finale Inventory Management</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-4">Service Level Agreements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">< 48h</div>
                <div className="text-sm text-gray-600">Quote Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">< 7 days</div>
                <div className="text-sm text-gray-600">Install Start Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">< 4h</div>
                <div className="text-sm text-gray-600">Support Response</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">2.5 days</div>
                <div className="text-sm text-gray-600">Avg Install Window</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-purple-600" />
            Management & Organization
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600">Damon J. Jackson</CardTitle>
                <div className="text-sm text-gray-600">Founder & CEO</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• 22 years USAF Intelligence</li>
                  <li>• B.S. Network & Communications</li>
                  <li>• 30+ custom theaters since 1999</li>
                  <li>• Direct-dealer relationships</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg text-green-600">Phillip Russell</CardTitle>
                <div className="text-sm text-gray-600">Strategic Co-Founder</div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Streamwalkers Corp</li>
                  <li>• SaaS & growth specialist</li>
                  <li>• Investor relations oversight</li>
                  <li>• Go-to-market strategy</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-200">
            <CardHeader>
              <CardTitle className="text-lg text-purple-600">Advisory Board Structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2">Partnership Oversight Committee</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 5 total seats</li>
                    <li>• 3 Streamwalkers representatives</li>
                    <li>• 2 TCL Tech representatives</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-2">Transition Plan</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Seasoned founders/investors</li>
                    <li>• Milestone guidance oversight</li>
                    <li>• Advisory Board post-milestones</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-green-600" />
            18-Month Roadmap & Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-1" />
                    <div>
                      <div className="font-semibold text-blue-600">Launch Phase (M1-M3)</div>
                      <div className="text-sm text-gray-700">Business registration, office lease, equipment purchase, website live</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1" />
                    <div>
                      <div className="font-semibold text-green-600">Build Phase (M4-M6)</div>
                      <div className="text-sm text-gray-700">R&D prototypes, initial marketing, showroom construction</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-200 bg-purple-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-purple-600 mt-1" />
                    <div>
                      <div className="font-semibold text-purple-600">Sell Phase (M7-M9)</div>
                      <div className="text-sm text-gray-700">Hire sales/install team, first $250K in installs, 50 support subscribers</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-orange-600 mt-1" />
                    <div>
                      <div className="font-semibold text-orange-600">Scale Phase (M10-M12)</div>
                      <div className="text-sm text-gray-700">3 job sites/day, $100K MRR, pivot to commercial services planning</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-red-600 mt-1" />
                    <div>
                      <div className="font-semibold text-red-600">Optimize Phase (M13-M18)</div>
                      <div className="text-sm text-gray-700">$500K MRR, cash reserve $1.3M, file 2 patents, explore Series A</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OperationsTeam;
