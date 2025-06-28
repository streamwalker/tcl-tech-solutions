import { Home, Shield, Smartphone, Database, Cog, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Smart Home Automation",
      description: "Complete home automation with lighting, climate, security, and entertainment integrated into one seamless system.",
      features: ["Smart Lighting Control", "Climate Automation", "Security Integration"],
      tier: "Tier 1: $2k-8k"
    },
    {
      icon: Shield,
      title: "Enterprise Networks",
      description: "Robust, scalable networking solutions traditionally reserved for enterprises, tailored for homes and small businesses.",
      features: ["Secure WiFi Networks", "Remote Monitoring", "VPN Configuration"],
      tier: "All Tiers"
    },
    {
      icon: Database,
      title: "Home Theater Technology",
      description: "Custom home theater environments with immersive audio-visual systems and smart control integration.",
      features: ["Custom Theater Design", "Multi-Room Audio", "Universal Control"],
      tier: "Tier 2: $8k-40k"
    },
    {
      icon: Smartphone,
      title: "AI Logic Integration",
      description: "Proprietary AI that learns your behavior patterns and automates your home systems intelligently.",
      features: ["Behavioral Learning", "Predictive Automation", "Voice Integration"],
      tier: "Premium Add-on"
    },
    {
      icon: Cog,
      title: "Managed Services",
      description: "24/7 monitoring, proactive maintenance, and ongoing support to keep your systems running perfectly.",
      features: ["24/7 Monitoring", "Remote Diagnostics", "Proactive Updates"],
      tier: "$50-200/month"
    },
    {
      icon: BarChart,
      title: "Premium Installations",
      description: "High-end whole-home automation and custom theater installations for luxury properties.",
      features: ["Estate Automation", "Custom Theaters", "Luxury Integration"],
      tier: "Tier 3: $40k+"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Smart Home Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive smart home integration services tailored to San Antonio homeowners and small businesses.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-blue-100 rounded-lg p-3 w-16 h-16 mb-6 flex items-center justify-center">
                <service.icon className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {service.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>

              <div className="mb-4">
                <span className="inline-block bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
                  {service.tier}
                </span>
              </div>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Serving San Antonio & Surrounding Areas
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Partnerships with Coventry, Lennar, and Perry Homes. Specializing in zip codes 78245, 78253, and 78254.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
