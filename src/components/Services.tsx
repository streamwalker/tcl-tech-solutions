
import { Home, Shield, Smartphone, Database, Cog, BarChart, Info, Check, Star, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { handleContactClick } from "@/utils/smoothScroll";

const Services = () => {
  const services = [
    {
      icon: Home,
      title: "Smart Home Automation",
      description: "Complete home automation with lighting, climate, security, and entertainment integrated into one seamless system.",
      features: ["Smart Lighting Control", "Climate Automation", "Security Integration"],
      tier: "Tier 1: $2k-8k",
      details: {
        fullDescription: "Transform your home into an intelligent living space that responds to your needs. Our smart home automation integrates all your systems - lighting, climate, security, and entertainment - into one unified experience.",
        extendedFeatures: [
          "Automated lighting scenes and schedules",
          "HVAC optimization and remote control", 
          "Integrated security system management",
          "Entertainment system automation",
          "Voice control integration",
          "Mobile app control from anywhere"
        ],
        brands: ["Control4", "Lutron RadioRA2", "Nest", "Ring", "Sonos"],
        process: "Consultation → Design → Installation → Programming → Training",
        timeline: "2-4 weeks for complete installation"
      }
    },
    {
      icon: Shield,
      title: "Enterprise Networks",
      description: "Robust, scalable networking solutions traditionally reserved for enterprises, tailored for homes and small businesses.",
      features: ["Secure WiFi Networks", "Remote Monitoring", "VPN Configuration"],
      tier: "All Tiers",
      details: {
        fullDescription: "Deploy enterprise-grade networking infrastructure in your home or small business. Get the reliability, security, and performance typically reserved for large corporations.",
        extendedFeatures: [
          "High-performance WiFi 6/6E networks",
          "Network security and firewall protection",
          "Remote access and VPN setup",
          "Network monitoring and analytics",
          "Scalable infrastructure design",
          "24/7 network health monitoring"
        ],
        brands: ["Ubiquiti", "Cisco", "Aruba", "Ruckus", "SonicWall"],
        process: "Assessment → Design → Installation → Configuration → Monitoring",
        timeline: "1-2 weeks for deployment"
      }
    },
    {
      icon: Database,
      title: "Home Theater Technology",
      description: "Custom home theater environments with immersive audio-visual systems and smart control integration.",
      features: ["Custom Theater Design", "Multi-Room Audio", "Universal Control"],
      tier: "Tier 2: $8k-40k",
      details: {
        fullDescription: "Create the ultimate entertainment experience with custom-designed home theaters. From intimate screening rooms to grand cinema spaces, we deliver professional-grade audio and video.",
        extendedFeatures: [
          "4K/8K projection and display systems",
          "Immersive surround sound design",
          "Acoustic room treatment",
          "Multi-room audio distribution",
          "Universal remote and automation",
          "Streaming and media server integration"
        ],
        brands: ["AVA Cinema", "Savant", "McIntosh", "Kaleidescape", "Sony"],
        process: "Design → Acoustic Planning → Installation → Calibration → Training",
        timeline: "3-6 weeks for complete theater"
      }
    },
    {
      icon: Smartphone,
      title: "AI Logic Integration",
      description: "Proprietary AI that learns your behavior patterns and automates your home systems intelligently.",
      features: ["Behavioral Learning", "Predictive Automation", "Voice Integration"],
      tier: "Premium Add-on",
      details: {
        fullDescription: "Experience the future of home automation with our proprietary AI that learns your habits and preferences to create truly intelligent automation scenarios.",
        extendedFeatures: [
          "Machine learning behavior analysis",
          "Predictive system automation",
          "Natural language voice control",
          "Adaptive lighting and climate",
          "Energy optimization algorithms",
          "Personalized user profiles"
        ],
        brands: ["Proprietary AI Platform", "Amazon Alexa", "Google Assistant", "Apple HomeKit"],
        process: "Integration → Learning Phase → Optimization → Continuous Improvement",
        timeline: "Immediate deployment, 2-4 weeks learning period"
      }
    },
    {
      icon: Cog,
      title: "Managed Services",
      description: "24/7 monitoring, proactive maintenance, and ongoing support to keep your systems running perfectly.",
      features: ["24/7 Monitoring", "Remote Diagnostics", "Proactive Updates"],
      tier: "$50-200/month",
      details: {
        fullDescription: "Ensure your smart home systems operate flawlessly with our comprehensive managed services. Our team monitors, maintains, and optimizes your technology around the clock.",
        extendedFeatures: [
          "24/7 system health monitoring",
          "Remote troubleshooting and repair",
          "Proactive software updates",
          "Performance optimization",
          "Priority technical support",
          "Annual system health reports"
        ],
        brands: ["All Supported Platforms", "Remote Monitoring Tools", "Diagnostic Software"],
        process: "Setup → Monitoring → Maintenance → Support → Reporting",
        timeline: "Immediate activation upon service agreement"
      }
    },
    {
      icon: BarChart,
      title: "Premium Installations",
      description: "High-end whole-home automation and custom theater installations for luxury properties.",
      features: ["Estate Automation", "Custom Theaters", "Luxury Integration"],
      tier: "Tier 3: $40k+",
      details: {
        fullDescription: "Transform luxury estates and high-end properties with comprehensive automation solutions. From whole-home integration to custom entertainment spaces, we deliver premium experiences.",
        extendedFeatures: [
          "Whole-home automation integration",
          "Multiple theater and media rooms",
          "Outdoor entertainment systems",
          "Pool and spa automation",
          "Advanced security integration",
          "Concierge-level support"
        ],
        brands: ["Savant", "Control4", "Crestron", "Lutron", "RTI"],
        process: "Consultation → Design → Project Management → Installation → Commissioning",
        timeline: "2-6 months for complete estate automation"
      }
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
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div className="interactive-card bg-white border border-border rounded-xl p-8 cursor-pointer hover:scale-105 transition-all duration-300">
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
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3 text-2xl">
                    <div className="bg-blue-100 rounded-lg p-2 w-12 h-12 flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    {service.title}
                  </DialogTitle>
                  <DialogDescription className="text-lg text-gray-600 mt-4">
                    {service.details.fullDescription}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-6">
                  {/* Pricing */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Pricing Tier
                    </h4>
                    <p className="text-blue-800">{service.tier}</p>
                  </div>

                  {/* Extended Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      Complete Feature Set
                    </h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {service.details.extendedFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-gray-700">
                          <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brands & Partners */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-blue-600" />
                      Trusted Brands & Partners
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.details.brands.map((brand, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {brand}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Process & Timeline */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Cog className="w-4 h-4 text-gray-600" />
                        Our Process
                      </h4>
                      <p className="text-gray-700 text-sm">{service.details.process}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-600" />
                        Timeline
                      </h4>
                      <p className="text-gray-700 text-sm">{service.details.timeline}</p>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 text-center">
                    <h4 className="font-semibold text-gray-900 mb-2">Ready to Get Started?</h4>
                    <p className="text-gray-600 mb-4 text-sm">Schedule a consultation to discuss your {service.title.toLowerCase()} needs.</p>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleContactClick}
                    >
                      Schedule Consultation
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Serving San Antonio & Surrounding Areas
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Authorized dealer for Control4, URC, AVA Cinema, Savant, RTI, and Lutron RadioRA2. 
              Partnerships with Coventry, Lennar, and Perry Homes in zip codes 78245, 78253, and 78254.
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
              onClick={handleContactClick}
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
