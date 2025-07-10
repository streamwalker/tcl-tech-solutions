
import { CheckCircle, Award, Users, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { number: "15+", label: "Smart Homes Installed" },
    { number: "22+", label: "Years Military Experience" },
    { number: "2024", label: "Founded in San Antonio" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: Award,
      title: "Veteran Discipline",
      description: "Military precision and attention to detail in every installation and service call."
    },
    {
      icon: Users,
      title: "Customer Obsession",
      description: "We work closely with clients as trusted partners, delivering personalized smart home experiences."
    },
    {
      icon: Globe,
      title: "Innovation at Speed",
      description: "We stay ahead of smart home trends with proprietary AI logic and cutting-edge integration."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About TCL Tech Solutions
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded in 2024, TCL Tech Solutions is San Antonio's premier smart home integration 
              company. Led by Damon Jackson, a 22-year U.S. Air Force veteran with a B.S. in 
              Network & Communications Management, we specialize in transforming homes with 
              intelligent automation systems.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We've completed over 15 smart home installations, integrating enterprise-grade 
              networks, home automation, and custom theater systems enhanced by proprietary AI logic. 
              Our authorized dealer partnerships with Control4, URC, AVA Cinema, Savant, RTI, and 
              Lutron RadioRA2 ensure access to professional-grade equipment at competitive prices.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Veteran Leadership</h4>
                  <p className="text-gray-600">22 years of Air Force experience bringing discipline and precision</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Local Expertise</h4>
                  <p className="text-gray-600">Deep knowledge of San Antonio market and builder partnerships</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">AI-Enhanced Systems</h4>
                  <p className="text-gray-600">Proprietary logic that learns and adapts to your lifestyle</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Values */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Core Values</h3>
            <div className="space-y-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 rounded-lg p-3 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">
                        {value.title}
                      </h4>
                      <p className="text-gray-600 leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Our Competitive Advantages
              </h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Integrated solutions combining networking, automation, and entertainment</li>
                <li>• Rapid 2.5-day installation window with 24-hour support SLA</li>
                <li>• Customization for each client's unique lifestyle and preferences</li>
                <li>• Proactive monitoring and predictive maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
