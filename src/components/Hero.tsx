
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";
import { handleContactClick, handleServicesClick } from "@/utils/smoothScroll";

const Hero = () => {
  return (
    <section id="home" className="relative pt-16 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Smart Home Integration
              <span className="block text-blue-600">Powered by AI</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Transform your San Antonio home with cutting-edge automation systems. 
              We provide comprehensive smart home integration, enterprise-grade networks, 
              and custom home theater solutions with proprietary AI logic.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
                onClick={handleContactClick}
              >
                Get Smart Home Quote
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg"
                onClick={handleServicesClick}
              >
                View Our Packages
              </Button>
            </div>

            {/* Key features */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">Veteran Founded</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">2.5-Day Install</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-sm font-medium text-gray-700">24/7 Support</p>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <span className="font-medium text-gray-800">Smart Lighting</span>
                  <span className="text-blue-600 font-semibold">95% Complete</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <span className="font-medium text-gray-800">Home Theater Setup</span>
                  <span className="text-green-600 font-semibold">✓ Complete</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <span className="font-medium text-gray-800">AI Integration</span>
                  <span className="text-yellow-600 font-semibold">In Progress</span>
                </div>
                <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
                  <p className="text-sm mb-2">Next Recommendation:</p>
                  <p className="font-semibold">Enable voice control for climate system based on your daily patterns</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
