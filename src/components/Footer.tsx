
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { handleContactClick } from "@/utils/smoothScroll";

const Footer = () => {
  const services = [
    "Smart Home Automation",
    "Enterprise Networks", 
    "Home Theater Technology",
    "AI Logic Integration",
    "Managed Services",
    "Premium Installations"
  ];

  const company = [
    "About Us",
    "Our Team",
    "Case Studies",
    "Blog",
    "Contact",
    "Service Areas"
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, redirect to contact form
    handleContactClick();
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-blue-400 mb-6">
              The Connected Lifestyle
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Smart home integration and automation services for San Antonio homeowners. 
              Veteran-founded company specializing in AI-powered home technology solutions.
            </p>
            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = "tel:+12109958655"}
                className="flex items-center space-x-3 hover:text-blue-400 transition-colors"
              >
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">(210) 995-8655</span>
              </button>
              <button 
                onClick={() => window.location.href = "mailto:theconnectedlifestyletech@gmail.com"}
                className="flex items-center space-x-3 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">theconnectedlifestyletech@gmail.com</span>
              </button>
              <button 
                onClick={() => window.open("https://maps.google.com/?q=7634+Goldstrike+Drive+San+Antonio+TX+78254", "_blank")}
                className="flex items-center space-x-3 hover:text-blue-400 transition-colors"
              >
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">7634 Goldstrike Drive, San Antonio, TX 78254</span>
              </button>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => {
                      const element = document.getElementById('services');
                      if (element) {
                        const navHeight = 64;
                        const elementPosition = element.offsetTop - navHeight;
                        window.scrollTo({
                          top: elementPosition,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3">
              {company.map((item, index) => (
                <li key={index}>
                  <button 
                    onClick={() => {
                      if (item === "Contact") {
                        handleContactClick();
                      } else {
                        const element = document.getElementById('about');
                        if (element) {
                          const navHeight = 64;
                          const elementPosition = element.offsetTop - navHeight;
                          window.scrollTo({
                            top: elementPosition,
                            behavior: 'smooth'
                          });
                        }
                      }
                    }}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest smart home technology insights and updates.
            </p>
            <div className="space-y-4">
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors"
                >
                  Subscribe
                </button>
              </form>
              
              {/* Social Links */}
              <div className="flex space-x-4 pt-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 The Connected Lifestyle. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0">
            <a href="/privacy-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-of-service" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="/cookie-policy" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Cookie Policy
            </a>
            <a href="/compliance" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
              Security & Compliance
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
