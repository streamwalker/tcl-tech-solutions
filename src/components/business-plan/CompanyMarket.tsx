
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Eye, Heart, BarChart3, MapPin, Users } from "lucide-react";

const CompanyMarket = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-6 w-6 text-blue-600" />
              Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Transform the way Texans live, work, and play at home by delivering intuitive, AI-powered smart-home experiences.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-6 w-6 text-purple-600" />
              Vision
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">
              Become Texas's #1 high-end smart-home integrator within five years and a nationally recognized acquisition target within seven.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-red-600" />
            Core Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="font-semibold text-blue-600">Veteran Discipline</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="font-semibold text-green-600">Customer Obsession</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="font-semibold text-purple-600">Innovation at Speed</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="font-semibold text-orange-600">Fair Pricing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-green-600" />
            Market Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Industry Outlook</h3>
            <p className="text-gray-700 mb-4">
              Global smart-home market projected to reach $537B by 2030 (CAGR 19.2%). 
              U.S. market exceeds $40B in 2024; AI voice-control & energy-management segments growing fastest.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <MapPin className="h-5 w-5" />
                  San Antonio Market
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Metro Population:</span>
                  <span className="font-semibold">1.5M (1.7% CAGR)</span>
                </div>
                <div className="flex justify-between">
                  <span>TAM (smart-home spend):</span>
                  <span className="font-semibold">$500M p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>SAM (target market):</span>
                  <span className="font-semibold">$100M p.a.</span>
                </div>
                <div className="flex justify-between">
                  <span>New Home Starts:</span>
                  <span className="font-semibold">4,000+/yr</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Feature Adoption:</span>
                  <span className="font-semibold">45% new buyers</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Users className="h-5 w-5" />
                  Competitive Landscape
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold text-sm text-gray-600 mb-2">Local Integrators</div>
                    <div className="text-sm text-gray-700">Bjorn's Audio Video, Digital Pro AV, Sterling Home Tech</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-600 mb-2">Regional Players</div>
                    <div className="text-sm text-gray-700">Texas Smart Home Pros, Guardian Security</div>
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-600 mb-2">National Entrants</div>
                    <div className="text-sm text-gray-700">Best Buy (Geek Squad), Vivint, ADT Control4</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="text-lg font-semibold mb-4 text-yellow-800">TCL Competitive Advantage</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Veteran founder credibility</li>
                <li>• Proprietary AI differentiator</li>
              </ul>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 2.5-day average install times</li>
                <li>• Subscription revenue model</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyMarket;
