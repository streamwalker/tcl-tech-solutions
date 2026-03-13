import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapPin, ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "How much does smart home automation cost in San Antonio?",
    a: "Smart home automation costs in San Antonio typically range from $1,500 for basic setups to $25,000+ for whole-home Control4 or Savant systems. The Connected Lifestyle offers free consultations to provide exact quotes tailored to your San Antonio home. We serve all areas including Helotes, Alamo Ranch, Leon Springs, and Stone Oak.",
  },
  {
    q: "What is the best home theater system for a living room?",
    a: "The best home theater system depends on your room size and budget. We install premium brands including Sonos, Bose, JBL Synthesis, and AVA Cinema systems. Our San Antonio home theater installations include acoustic treatment, 4K/8K projection, Dolby Atmos surround sound, and smart lighting integration.",
  },
  {
    q: "Do you offer Control4 smart home installation in San Antonio TX?",
    a: "Yes! The Connected Lifestyle is an authorized Control4 dealer serving San Antonio, TX and surrounding areas. We design, install, and program complete Control4 smart home systems including lighting control, motorized shades, security integration, and whole-home audio. We also work with Savant, Lutron, and URC systems.",
  },
  {
    q: "What smart home brands do you install?",
    a: "We install and integrate leading smart home brands including Control4, Savant, Lutron, URC, RTI, Crestron, Ring, Nest, Ecobee, Sonos, and more. As a veteran-owned business in San Antonio, we pride ourselves on recommending the right technology for each customer's unique needs and budget.",
  },
  {
    q: "How long does a home theater installation take?",
    a: "A typical home theater installation in San Antonio takes 1–3 days depending on complexity. Simple soundbar and TV mounting can be done in a few hours, while full dedicated theater rooms with acoustic panels, tiered seating, 4K projection, and Dolby Atmos may take up to a week. Contact us for a free site assessment.",
  },
  {
    q: "Do you provide business IT network installation?",
    a: "Yes, The Connected Lifestyle provides enterprise network installation, structured cabling (Cat6/Cat6A), Wi-Fi 6E/7 deployment, server room setup, and managed IT services for businesses throughout San Antonio and South Texas. We specialize in TCP/IP networking, VLANs, VPNs, and cybersecurity solutions.",
  },
  {
    q: "What areas in San Antonio do you serve?",
    a: "We proudly serve all of San Antonio and surrounding communities including Helotes, Leon Springs, Alamo Ranch, Stone Oak, The Dominion, Boerne, New Braunfels, Schertz, Cibolo, and the greater Bexar County area. ZIP codes include 78254, 78253, 78245, 78256, 78258, 78260, and more.",
  },
  {
    q: "Are you a veteran-owned business?",
    a: "Yes, The Connected Lifestyle is a proud veteran-owned and operated technology company based in San Antonio, Texas. Our founder brings military discipline, attention to detail, and over 20 years of combined technology experience to every residential and commercial project we complete.",
  },
  {
    q: "Do you offer AI home automation solutions?",
    a: "Absolutely. We integrate AI-powered automation including voice assistants (Alexa, Google Home, Siri/HomeKit), machine learning-based energy optimization, predictive maintenance alerts, and intelligent security systems. Our AI Logic Integration service brings cutting-edge artificial intelligence to your San Antonio home or business.",
  },
  {
    q: "What is included in your managed services plan?",
    a: "Our Managed Services plan includes 24/7 remote monitoring, proactive maintenance, software updates, priority support, network health checks, and quarterly on-site visits. Perfect for San Antonio homeowners and businesses who want peace of mind knowing their smart technology is always performing optimally.",
  },
];

const serviceAreas = [
  "San Antonio", "Helotes", "Leon Springs", "Alamo Ranch", "Stone Oak",
  "The Dominion", "Boerne", "New Braunfels", "Schertz", "Cibolo",
  "Converse", "Live Oak", "Universal City", "Selma", "Garden Ridge",
  "Fair Oaks Ranch", "Shavano Park", "Hollywood Park", "Castle Hills",
];

const zipCodes = [
  "78254", "78253", "78245", "78256", "78258", "78260", "78249",
  "78250", "78251", "78240", "78230", "78231", "78247", "78248",
  "78209", "78212", "78215", "78216", "78217", "78218",
];

const internalLinks = [
  { to: "/services", label: "Smart Home & Business Technology Services", desc: "View all services" },
  { to: "/services#smart-home-automation", label: "Smart Home Automation San Antonio", desc: "Home automation" },
  { to: "/services#home-theater-technology", label: "Home Theater Installation San Antonio", desc: "Theater systems" },
  { to: "/services#enterprise-networks", label: "Enterprise Network Installation", desc: "Business IT" },
  { to: "/services#ai-logic-integration", label: "AI-Powered Home Automation", desc: "AI integration" },
  { to: "/services#managed-services", label: "Managed IT & Smart Home Services", desc: "Ongoing support" },
  { to: "/services#premium-installations", label: "Premium Technology Installations", desc: "White-glove service" },
  { to: "/business-plan", label: "About The Connected Lifestyle", desc: "Our story" },
  { to: "/investor-white-paper", label: "TCL Investor Information 2026", desc: "Investor relations" },
  { to: "/dashboard", label: "Workforce Management Platform", desc: "Access platform" },
  { to: "/omnicode", label: "OmniCode Development Platform", desc: "Dev tools" },
  { to: "/education", label: "Technology Education & Resources", desc: "Learn more" },
  { to: "/compliance", label: "Security & Compliance Certifications", desc: "SOC 2, ISO 27001" },
  { to: "/terms-of-service", label: "Terms of Service & EULA", desc: "Legal terms" },
  { to: "/privacy-policy", label: "Privacy Policy — GDPR & CCPA", desc: "Data privacy" },
  { to: "/cookie-policy", label: "Cookie Policy", desc: "Cookie usage" },
  { to: "/builder-deck", label: "Builder & Developer Resources", desc: "Builder deck" },
  { to: "/auth", label: "Sign In to My TCL Account", desc: "Account access" },
];

const brands = [
  "Control4", "Savant", "Lutron", "URC", "RTI", "Crestron",
  "Sonos", "Bose", "JBL Synthesis", "AVA Cinema", "Ring", "Nest",
  "Ecobee", "Sony", "Samsung", "LG", "Epson", "Denon", "Marantz",
  "Ubiquiti", "Cisco Meraki", "Ruckus", "Aruba",
];

const SEOContent = () => {
  return (
    <section className="py-20 bg-muted/20 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
            Frequently Asked Questions — Smart Home & IT Services in San Antonio
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Get answers to the most common questions about smart home automation, home theater installation,
            enterprise networking, and AI integration services in San Antonio, Texas.
          </p>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="bg-background border border-border rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Service Areas */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="h-7 w-7 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Smart Home Installation Service Areas — San Antonio & South Texas
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-3xl">
            The Connected Lifestyle proudly provides smart home automation, home theater installation, 
            enterprise networking, and managed IT services throughout the greater San Antonio metropolitan area 
            and South Texas. We are a veteran-owned technology company serving residential and commercial customers.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {serviceAreas.map((area) => (
              <div key={area} className="bg-background border border-border rounded-md px-4 py-2 text-sm text-foreground font-medium">
                {area}, TX
              </div>
            ))}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">ZIP Codes We Serve</h3>
            <div className="flex flex-wrap gap-2">
              {zipCodes.map((zip) => (
                <span key={zip} className="bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                  {zip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Internal Link Hub */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Explore The Connected Lifestyle
          </h2>
          <p className="text-muted-foreground mb-8">
            Navigate our complete range of smart home, business technology, and workforce management solutions.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {internalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group flex items-center justify-between bg-background border border-border rounded-lg px-5 py-4 hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                <div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {link.label}
                  </div>
                  <div className="text-xs text-muted-foreground">{link.desc}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0 ml-2" />
              </Link>
            ))}
          </div>
        </div>

        {/* Brand Keywords */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Authorized Dealer & Certified Installer — Premium Technology Brands
          </h2>
          <p className="text-muted-foreground mb-6">
            As a veteran-owned smart home company in San Antonio, The Connected Lifestyle partners with 
            the industry's leading technology brands to deliver best-in-class residential and commercial installations.
          </p>
          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => (
              <span key={brand} className="bg-background border border-border text-foreground text-sm font-medium px-4 py-2 rounded-md">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContent;
