
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative p-12 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl border border-white/20">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Your Home?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of homeowners who have already experienced the future of smart living. 
              Get started with a free consultation today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
                Schedule Consultation
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-lg transition-all duration-300 hover:scale-105">
                Download Brochure
              </Button>
            </div>

            {/* Contact info */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>theconnectedlifestyletech@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-purple-400" />
                <span>(210) 995-8655</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">A+</div>
            <div className="text-gray-400 text-sm">BBB Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">5.0★</div>
            <div className="text-gray-400 text-sm">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">ISO</div>
            <div className="text-gray-400 text-sm">27001 Certified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">24/7</div>
            <div className="text-gray-400 text-sm">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
