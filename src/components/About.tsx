
import { CheckCircle, Award, Users, Globe } from "lucide-react";

const About = () => {
  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "25+", label: "Years Experience" },
    { number: "150+", label: "Happy Clients" },
    { number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We deliver exceptional results through cutting-edge technology and proven methodologies."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We work closely with our clients as trusted partners, not just service providers."
    },
    {
      icon: Globe,
      title: "Innovation",
      description: "We stay ahead of technology trends to provide innovative solutions for your business."
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
              Founded in 1998, TCL Tech Solutions has been at the forefront of technology 
              consulting for over 25 years. We've helped hundreds of businesses transform 
              their operations through innovative technology solutions.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team of certified experts specializes in cloud computing, cybersecurity, 
              digital transformation, and IT infrastructure. Based in Washington, DC, we 
              serve clients nationwide with solutions that drive growth and efficiency.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Certified Professionals</h4>
                  <p className="text-gray-600">AWS, Azure, and Google Cloud certified consultants</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Industry Expertise</h4>
                  <p className="text-gray-600">Deep knowledge across multiple industries and sectors</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Proven Track Record</h4>
                  <p className="text-gray-600">500+ successful projects and 98% client satisfaction</p>
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
