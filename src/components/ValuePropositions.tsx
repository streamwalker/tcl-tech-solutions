
import { Shield, Brain, Zap, Heart } from "lucide-react";

const ValuePropositions = () => {
  const propositions = [
    {
      icon: Shield,
      title: "Enterprise-Grade Networks for Homes",
      description: "Robust, scalable, and secure networking solutions traditionally reserved for large enterprises, now tailored to residential budgets and needs.",
      benefits: ["Military-grade security", "Scalable infrastructure", "Professional monitoring"]
    },
    {
      icon: Brain,
      title: "AI-Powered Home Automation",
      description: "Our proprietary AI logic learns your behavior patterns and automates your home systems intelligently, creating a truly personalized experience.",
      benefits: ["Behavioral learning", "Predictive automation", "Energy optimization"]
    },
    {
      icon: Zap,
      title: "Rapid Installation & Support",
      description: "Industry-leading 2.5-day average installation window with 24-hour support SLA ensures minimal disruption and maximum reliability.",
      benefits: ["Fast deployment", "24/7 monitoring", "Proactive maintenance"]
    },
    {
      icon: Heart,
      title: "Comprehensive Care",
      description: "From initial consultation to ongoing support, we provide white-glove service that keeps your smart home running perfectly.",
      benefits: ["Personal consultation", "Regular updates", "Peace of mind"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose TCL Tech Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver enterprise-quality smart home integration with the personal touch of a local, veteran-owned business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {propositions.map((prop, index) => (
            <div
              key={index}
              className="interactive-card bg-card rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 flex-shrink-0">
                  <prop.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {prop.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {prop.description}
                  </p>

                  <ul className="space-y-2">
                    {prop.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Target Customer Segments
            </h3>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Tech Enthusiasts</h4>
                <p className="text-sm text-gray-600">Early adopters seeking the latest smart home innovations</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Security-Minded</h4>
                <p className="text-sm text-gray-600">Homeowners prioritizing safety and energy efficiency</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Experience Seekers</h4>
                <p className="text-sm text-gray-600">Those valuing premium entertainment and automation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;
