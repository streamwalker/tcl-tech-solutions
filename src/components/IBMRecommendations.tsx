import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Home, Building2, Users, BarChart3, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const IBMRecommendations = () => {
  const recommendations = [
    {
      type: "Service",
      badge: "Most Popular",
      badgeVariant: "default" as const,
      icon: Home,
      title: "Complete Smart Home Automation in San Antonio",
      description: "Transform your San Antonio home with integrated Control4 and Savant lighting, security, climate control, and whole-home entertainment systems.",
      image: "/HomeTheater.jpg",
      link: "/services#automation",
      cta: "Explore automation"
    },
    {
      type: "Solution", 
      badge: "Enterprise",
      badgeVariant: "secondary" as const,
      icon: Building2,
      title: "Enterprise IT & Network Infrastructure",
      description: "Comprehensive business technology solutions for San Antonio enterprises — structured cabling, Wi-Fi 6E, managed IT, and cybersecurity.",
      image: "/TCL Home Automation.jpg",
      link: "/services#business",
      cta: "View solutions"
    },
    {
      type: "Platform",
      badge: "New",
      badgeVariant: "destructive" as const,
      icon: Users,
      title: "Workforce Management Intelligence",
      description: "AI-powered analytics and management tools to optimize your workforce operations and business efficiency.",
      image: "/VetOwnedLogo.jpg",
      link: "/dashboard",
      cta: "Access platform"
    },
    {
      type: "Service",
      badge: "Premium",
      badgeVariant: "outline" as const,
      icon: Zap,
      title: "Home Theater & Entertainment Systems San Antonio",
      description: "Professional Dolby Atmos home theater installations with 4K/8K projection, JBL Synthesis, and AVA Cinema by certified San Antonio technicians.",
      image: "/HomeTheater.jpg",
      link: "/services#entertainment", 
      cta: "Learn more"
    },
    {
      type: "Innovation",
      badge: "Coming Soon",
      badgeVariant: "secondary" as const,
      icon: BarChart3,
      title: "OmniCode Development Platform",
      description: "Next-generation development tools with AI assistance and collaborative features for modern development teams.",
      image: null,
      link: "/omnicode",
      cta: "Preview platform"
    },
    {
      type: "Expertise",
      badge: "Veteran-Owned",
      badgeVariant: "default" as const,
      icon: Shield,
      title: "Veteran-Owned Technology Company — San Antonio TX",
      description: "Proud veteran-owned business delivering reliable smart home, home theater, and enterprise IT services with over 20 years combined experience in San Antonio.",
      image: "/VetOwnedLogo.jpg",
      link: "/business-plan",
      cta: "Our story"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Top-Rated Smart Home & IT Solutions in San Antonio
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover our comprehensive smart home automation, home theater, and enterprise IT solutions 
            designed for San Antonio homeowners and businesses. Authorized Control4, Savant, and Lutron dealer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((item, index) => (
            <Card key={index} className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden">
              <Link to={item.link}>
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                      <item.icon className="h-16 w-16 text-primary/60" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge variant={item.badgeVariant} className="text-xs">
                      {item.badge}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-full">
                      <ArrowRight className="h-4 w-4 text-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          {item.type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="pt-2">
                    <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      {item.cta}
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IBMRecommendations;