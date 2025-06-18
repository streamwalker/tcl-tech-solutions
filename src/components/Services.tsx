
import { Cloud, Shield, Smartphone, Database, Cog, BarChart } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Cloud,
      title: "Cloud Computing",
      description: "Migrate to the cloud with confidence. AWS, Azure, and Google Cloud solutions tailored to your business needs.",
      features: ["Cloud Migration", "Infrastructure Setup", "Cost Optimization"]
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Protect your business with comprehensive security solutions and threat monitoring.",
      features: ["Security Audits", "Threat Detection", "Compliance Management"]
    },
    {
      icon: Database,
      title: "Data Management",
      description: "Optimize your data infrastructure for better insights and business intelligence.",
      features: ["Database Design", "Data Analytics", "Business Intelligence"]
    },
    {
      icon: Smartphone,
      title: "Digital Transformation",
      description: "Modernize your business processes with cutting-edge digital solutions.",
      features: ["Process Automation", "Mobile Solutions", "Digital Strategy"]
    },
    {
      icon: Cog,
      title: "IT Infrastructure",
      description: "Build robust, scalable IT infrastructure that grows with your business.",
      features: ["Network Design", "Server Management", "System Integration"]
    },
    {
      icon: BarChart,
      title: "Business Analytics",
      description: "Turn your data into actionable insights with advanced analytics solutions.",
      features: ["Data Visualization", "Predictive Analytics", "Performance Metrics"]
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Technology Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive technology solutions to help your business thrive in the digital age.
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
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

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
      </div>
    </section>
  );
};

export default Services;
