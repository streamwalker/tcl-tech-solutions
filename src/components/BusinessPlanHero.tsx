
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

const BusinessPlanHero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            TCL Tech Solutions
            <span className="block text-2xl md:text-3xl font-normal mt-2 text-blue-100">
              Comprehensive Business Plan
            </span>
          </h1>
          
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold">$750K</div>
                <div className="text-blue-100">Seed Capital</div>
              </div>
              <div>
                <div className="text-3xl font-bold">$4.1M</div>
                <div className="text-blue-100">Year 3 Revenue Target</div>
              </div>
              <div>
                <div className="text-3xl font-bold">40%</div>
                <div className="text-blue-100">EBITDA Margin Goal</div>
              </div>
            </div>
          </div>

          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            San Antonio's premier smart-home technology integrator, transforming how Texans live with AI-powered automation systems. 
            Founded by 22-year Air Force veteran Damon J. Jackson.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-blue-50"
              onClick={() => window.print()}
            >
              <Download className="mr-2 h-5 w-5" />
              Download PDF
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <FileText className="mr-2 h-5 w-5" />
              Investor Inquiry
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessPlanHero;
