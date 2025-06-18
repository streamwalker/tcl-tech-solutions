
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Mic, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-3xl"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        {/* Icon group */}
        <div className="flex justify-center space-x-4 mb-8 animate-fade-in">
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-lg">
            <Home className="w-6 h-6 text-blue-400" />
          </div>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-lg">
            <Mic className="w-6 h-6 text-purple-400" />
          </div>
          <div className="p-3 bg-white/10 rounded-full backdrop-blur-lg">
            <Zap className="w-6 h-6 text-green-400" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          Your Home
          <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Thinks Ahead
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-200">
          Experience the future of smart homes with AI that learns, adapts, and anticipates your every need. 
          Transform your living space into an intelligent sanctuary.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in delay-400">
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Experience the Future
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full backdrop-blur-lg transition-all duration-300 hover:scale-105">
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 animate-fade-in delay-600">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">500K+</div>
            <div className="text-gray-400 text-sm md:text-base">Homes Automated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
            <div className="text-gray-400 text-sm md:text-base">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-gray-400 text-sm md:text-base">AI Learning</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
