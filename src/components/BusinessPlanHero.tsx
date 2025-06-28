
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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

        <div className="text-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
            Contact for Investor Packet
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlanHero;
