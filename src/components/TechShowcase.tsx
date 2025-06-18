
import { Cpu, Wifi, Eye, Globe } from "lucide-react";

const TechShowcase = () => {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built on
              <span className="block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Cutting-Edge Tech
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Our platform combines advanced AI, edge computing, and IoT technologies to deliver 
              unparalleled performance and reliability in your smart home ecosystem.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-green-500/20 rounded-lg">
                  <Cpu className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Edge AI Processing</h3>
                  <p className="text-gray-300">Local processing ensures instant response times and complete privacy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-blue-500/20 rounded-lg">
                  <Wifi className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Mesh Connectivity</h3>
                  <p className="text-gray-300">Self-healing network ensures every device stays connected.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-purple-500/20 rounded-lg">
                  <Eye className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Computer Vision</h3>
                  <p className="text-gray-300">Advanced visual recognition for enhanced automation and security.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2 bg-orange-500/20 rounded-lg">
                  <Globe className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Global Infrastructure</h3>
                  <p className="text-gray-300">Worldwide data centers ensure reliable cloud services and updates.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative">
            <div className="relative z-10 bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-lg rounded-3xl p-8 border border-white/10">
              {/* Mock interface */}
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Living Room</span>
                  </div>
                  <span className="text-green-400 text-sm">72°F</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Kitchen</span>
                  </div>
                  <span className="text-blue-400 text-sm">Cooking Mode</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium">Bedroom</span>
                  </div>
                  <span className="text-purple-400 text-sm">Sleep Mode</span>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-white/10">
                  <p className="text-white text-sm mb-2">AI Recommendation</p>
                  <p className="text-gray-300 text-xs">Adjusting lighting for movie time in 5 minutes based on your schedule.</p>
                </div>
              </div>
            </div>

            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-3xl blur-xl"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechShowcase;
