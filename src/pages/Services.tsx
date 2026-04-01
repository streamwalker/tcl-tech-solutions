import { Link } from "react-router-dom";
import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import { ServicesPopups } from "@/components/NavigationPopups";
import { Home, Shield, Database, Smartphone, Cog, BarChart, Layers } from "lucide-react";
import paradeOfHomesLogo from "@/assets/parade-of-homes-2026-logo.png";

const services = [
  {
    icon: Home,
    title: "Smart Home Automation",
    description: "Transform your San Antonio living space with intelligent Control4 and Savant automation systems that learn your preferences — including smart lighting, motorized shades, climate control, and whole-home audio.",
    badge: "Most Popular",
  },
  {
    icon: Shield,
    title: "Enterprise Networks",
    description: "Secure, scalable network infrastructure for San Antonio businesses — structured cabling, Wi-Fi 6E/7, VLANs, VPNs, and 24/7 managed IT support.",
    badge: "Business",
  },
  {
    icon: Database,
    title: "Home Theater Technology",
    description: "Immersive Dolby Atmos cinematic experiences with 4K/8K projection, JBL Synthesis, and AVA Cinema — professionally installed in your San Antonio home.",
    badge: "Premium",
  },
  {
    icon: Smartphone,
    title: "AI Logic Integration",
    description: "Harness the power of artificial intelligence to automate decisions, optimize energy, and enhance security.",
    badge: "New",
  },
  {
    icon: Cog,
    title: "Managed Services",
    description: "Ongoing support, maintenance, and optimization for all your connected systems—so you never have to worry.",
    badge: "Support",
  },
  {
    icon: BarChart,
    title: "Premium Installations",
    description: "White-glove installation services by certified technicians ensuring flawless deployment every time.",
    badge: "Certified",
  },
  {
    icon: Layers,
    title: "TCP/IP & OSI Models",
    description: "Advanced networking architecture consulting and implementation for complex enterprise environments.",
    badge: "Enterprise",
  },
];

const badgeColors: Record<string, string> = {
  "Most Popular": "bg-primary/10 text-primary",
  "Business": "bg-secondary text-secondary-foreground",
  "Premium": "bg-accent text-accent-foreground",
  "New": "bg-primary text-primary-foreground",
  "Support": "bg-muted text-muted-foreground",
  "Certified": "bg-secondary text-secondary-foreground",
  "Enterprise": "bg-muted text-muted-foreground",
};

const Services = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <IBMNavigation />
      <main className="pt-12">
        {/* Hero */}
        <section className="bg-card border-b border-border py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Our Services</p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4 max-w-2xl">
              Connected solutions for every need
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              From smart home automation to enterprise networks, we deliver integrated technology experiences backed by veteran expertise.
            </p>
            <Link to="/press" className="inline-flex items-center gap-3 mt-6 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors">
              <img src={paradeOfHomesLogo} alt="2026 Parade of Homes" className="h-8 rounded" />
              <span className="text-sm font-semibold text-primary">Co-Chair, 2026 Parade of Homes</span>
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  id={service.title.toLowerCase().replace(/\s+/g, '-')}
                  className="bg-background p-8 hover:bg-card transition-colors duration-200 group cursor-pointer"
                >
                  <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded mb-4 ${badgeColors[service.badge] ?? "bg-muted text-muted-foreground"}`}>
                    {service.badge}
                  </span>
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 text-primary text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more <span>→</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Service Areas */}
        <section className="py-12 px-4 border-t border-border">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Smart Home & IT Service Areas — San Antonio & South Texas</h2>
            <p className="text-muted-foreground text-sm mb-6">
              The Connected Lifestyle serves homeowners and businesses throughout San Antonio and surrounding communities 
              with professional smart home automation, home theater installation, enterprise networking, and managed IT services.
            </p>
            <p className="text-muted-foreground text-xs leading-relaxed">
              San Antonio • Helotes • Leon Springs • Alamo Ranch • Stone Oak • The Dominion • Boerne • New Braunfels • 
              Schertz • Cibolo • Converse • Live Oak • Universal City • Selma • Garden Ridge • Fair Oaks Ranch • 
              Shavano Park • Hollywood Park • Castle Hills — ZIP codes: 78254, 78253, 78245, 78256, 78258, 78260, 78249, 78250
            </p>
          </div>
        </section>

        {/* Internal Links */}
        <section className="py-12 px-4 border-t border-border bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-xl font-semibold text-foreground mb-6">Explore More from The Connected Lifestyle</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <Link to="/" className="text-primary hover:underline">Home — Smart Home Automation San Antonio</Link>
              <Link to="/business-plan" className="text-primary hover:underline">About The Connected Lifestyle</Link>
              <Link to="/investor-white-paper" className="text-primary hover:underline">Investor Relations 2026</Link>
              <Link to="/education" className="text-primary hover:underline">Technology Education & Resources</Link>
              <Link to="/dashboard" className="text-primary hover:underline">Workforce Management Platform</Link>
              <Link to="/omnicode" className="text-primary hover:underline">OmniCode Development Platform</Link>
              <Link to="/compliance" className="text-primary hover:underline">Security & Compliance (SOC 2, ISO 27001)</Link>
              <Link to="/auth" className="text-primary hover:underline">Sign In to My TCL Account</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
