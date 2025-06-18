
const Experience = () => {
  const projects = [
    {
      title: "Enterprise Cloud Migration",
      client: "Fortune 500 Manufacturing Company",
      description: "Complete migration of legacy systems to AWS cloud infrastructure, resulting in 40% cost reduction and improved scalability.",
      results: ["40% cost reduction", "99.9% uptime", "3x faster deployment"],
      industry: "Manufacturing"
    },
    {
      title: "Cybersecurity Overhaul",
      client: "Healthcare Network",
      description: "Implemented comprehensive security framework for multi-location healthcare provider with HIPAA compliance.",
      results: ["Zero security incidents", "HIPAA compliant", "24/7 monitoring"],
      industry: "Healthcare"
    },
    {
      title: "Digital Transformation",
      client: "Regional Retail Chain",
      description: "Modernized point-of-sale systems and implemented omnichannel customer experience platform.",
      results: ["50% faster transactions", "Unified customer data", "Mobile integration"],
      industry: "Retail"
    }
  ];

  const certifications = [
    { name: "AWS Solutions Architect", level: "Professional" },
    { name: "Microsoft Azure", level: "Expert" },
    { name: "Google Cloud Professional", level: "Certified" },
    { name: "CISSP", level: "Security Professional" },
    { name: "PMP", level: "Project Management" },
    { name: "ITIL", level: "Service Management" }
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Experience & Expertise
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real projects. See how we've helped businesses transform their technology infrastructure.
          </p>
        </div>

        {/* Case Studies */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Recent Case Studies</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {project.industry}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {project.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4 font-medium">
                  {project.client}
                </p>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Key Results:</h5>
                  <ul className="space-y-2">
                    {project.results.map((result, resultIndex) => (
                      <li key={resultIndex} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Professional Certifications
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="text-center">
                <div className="bg-white rounded-lg p-4 shadow-sm mb-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">
                      {cert.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-gray-600">{cert.level}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
