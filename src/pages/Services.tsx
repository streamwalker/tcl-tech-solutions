import IBMNavigation from "@/components/IBMNavigation";
import Footer from "@/components/Footer";
import { ServicesPopups } from "@/components/NavigationPopups";
import { Home, Shield, Database, Smartphone, Cog, BarChart, Layers } from "lucide-react";

const services = [
  {
    icon: Home,
    title: "Smart Home Automation",
    description: "Transform your living space with intelligent automation systems that learn your preferences and adapt to your lifestyle.",
    badge: "Most Popular",
  },
  {
    icon: Shield,
    title: "Enterprise Networks",
    description: "Secure, scalable network infrastructure designed for businesses of all sizes with 24/7 monitoring and support.",
    badge: "Business",
  },
  {
    icon: Database,
    title: "Home Theater Technology",
    description: "Immersive cinematic experiences with premium audio-visual installations tailored to your space.",
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
      </main>
      <Footer />
    </div>
  );
};

export default Services;
