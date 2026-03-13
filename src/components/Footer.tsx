
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { handleContactClick } from "@/utils/smoothScroll";

const Footer = () => {
  const services = [
    { label: "Smart Home Automation", to: "/services#smart-home-automation" },
    { label: "Enterprise Networks", to: "/services#enterprise-networks" },
    { label: "Home Theater Technology", to: "/services#home-theater-technology" },
    { label: "AI Logic Integration", to: "/services#ai-logic-integration" },
    { label: "Managed Services", to: "/services#managed-services" },
    { label: "Premium Installations", to: "/services#premium-installations" },
    { label: "TCP/IP & OSI Networking", to: "/services#tcp/ip-&-osi-models" },
  ];

  const company = [
    { label: "About Us", to: "/business-plan" },
    { label: "Our Services", to: "/services" },
    { label: "Investor Relations", to: "/investor-white-paper" },
    { label: "Education & Resources", to: "/education" },
    { label: "Builder Deck", to: "/builder-deck" },
    { label: "Contact", to: "/#contact" },
    { label: "Service Areas", to: "/#service-areas" },
  ];

  const platform = [
    { label: "Workforce Dashboard", to: "/dashboard" },
    { label: "OmniCode Platform", to: "/omnicode" },
    { label: "Sign In / Create Account", to: "/auth" },
  ];

  const legal = [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms-of-service" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Security & Compliance", to: "/compliance" },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContactClick();
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">
              The Connected Lifestyle
            </h3>
            <p className="text-gray-300 mb-4 leading-relaxed text-sm">
              San Antonio's premier veteran-owned smart home automation, home theater installation, 
              and enterprise IT services company. Authorized Control4, Savant, and Lutron dealer 
              serving residential and commercial customers across South Texas.
            </p>
            <div className="space-y-2 mb-6">
              <a href="tel:+12109958655" className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">(210) 995-8655</span>
              </a>
              <a href="mailto:theconnectedlifestyletech@gmail.com" className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">theconnectedlifestyletech@gmail.com</span>
              </a>
              <a href="https://maps.google.com/?q=7634+Goldstrike+Drive+San+Antonio+TX+78254" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-blue-400 transition-colors">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300 text-sm">7634 Goldstrike Drive, San Antonio, TX 78254</span>
              </a>
            </div>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-400 transition-colors"><Facebook className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.label}>
                  <Link to={s.to} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">{item.label}</Link>
                </li>
              ))}
            </ul>
            <h4 className="text-lg font-semibold mt-6 mb-4">Platform</h4>
            <ul className="space-y-2">
              {platform.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-gray-300 hover:text-blue-400 transition-colors text-sm">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Subscribe for the latest smart home technology insights, San Antonio installation tips, and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white text-sm"
                required
              />
              <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-md transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Service Areas Bar */}
        <div className="border-t border-gray-800 mt-10 pt-8">
          <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Service Areas</h4>
          <p className="text-gray-500 text-xs leading-relaxed">
            San Antonio • Helotes • Leon Springs • Alamo Ranch • Stone Oak • The Dominion • Boerne • New Braunfels • 
            Schertz • Cibolo • Converse • Live Oak • Universal City • Selma • Garden Ridge • Fair Oaks Ranch • 
            Shavano Park • Hollywood Park • Castle Hills • Bexar County • Comal County • Guadalupe County
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2026 The Connected Lifestyle. All rights reserved. Veteran-Owned Business — San Antonio, TX.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0">
            {legal.map((item) => (
              <Link key={item.label} to={item.to} className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
