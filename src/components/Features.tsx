
import { Brain, Shield, Lightbulb, Smartphone, Music, Thermometer } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligent Learning",
      description: "AI that adapts to your routines and preferences, getting smarter every day.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "End-to-end encryption and local processing keep your data private and secure.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Lightbulb,
      title: "Mood-Based Lighting",
      description: "Dynamic lighting that adjusts to time of day, weather, and your activities.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Smartphone,
      title: "Seamless Control",
      description: "Voice, touch, or gesture control - interact with your home naturally.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Music,
      title: "Immersive Audio",
      description: "Room-aware audio that follows you and adapts to your space acoustics.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Thermometer,
      title: "Climate Intelligence",
      description: "Predictive climate control that optimizes comfort and energy efficiency.",
      gradient: "from-red-500 to-pink-500"
    }
  ];

  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Smart Home AI
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the features that make our platform the most advanced home automation system available today.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 interactive-card animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover effect gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
