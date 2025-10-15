
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

const BusinessPlanHero = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            TCL Tech Solutions
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4">
            Comprehensive Business Plan
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Version 1.0 – June 28, 2025
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">$750K</h3>
              <p className="text-gray-700">Seed Capital Sought</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">$4.1M</h3>
              <p className="text-gray-700">Year 3 Revenue Target</p>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">40%</h3>
              <p className="text-gray-700">Target EBITDA Margin</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center space-y-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
            Contact for Investor Packet
          </Button>
          
          <div className="mt-6">
            <Card className="bg-white/90 backdrop-blur border-blue-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">
                    Looking for Investor Materials?
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Access our condensed Investor White Paper with key highlights and PDF download option.
                </p>
                <Link to="/investor-white-paper">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    View Investor White Paper →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlanHero;
