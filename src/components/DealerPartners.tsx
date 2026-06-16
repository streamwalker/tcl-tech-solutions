import { CheckCircle, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleContactClick } from "@/utils/smoothScroll";

const DealerPartners = () => {
  const partners = [
    {
      name: "URC (Universal Remote Control)",
      badge: "Certified Partner",
      specialty: "Premium Control Systems",
      description: "High-end universal control systems and custom remote solutions for sophisticated home environments.",
      keyBenefits: ["Custom programming", "Premium remotes", "Advanced integration"]
    },
    {
      name: "AVA Cinema",
      badge: "Authorized Dealer",
      specialty: "Luxury Home Theater",
      description: "Premium home theater and luxury cinema installations with commercial-grade audio-visual equipment.",
      keyBenefits: ["Cinema-quality experience", "Custom design", "Professional calibration"]
    },
    {
      name: "Savant",
      badge: "Certified Integrator",
      specialty: "Smart Home AI Platform",
      description: "Advanced smart home automation with intuitive user interfaces and AI-powered personalization.",
      keyBenefits: ["AI integration", "Intuitive interfaces", "Voice control"]
    },
    {
      name: "RTI",
      badge: "Professional Partner",
      specialty: "Professional Control Systems",
      description: "Commercial-grade control systems designed for complex residential and commercial installations.",
      keyBenefits: ["Commercial reliability", "Complex integration", "Professional support"]
    },
    {
      name: "Lutron RadioRA2",
      badge: "Certified Dealer",
      specialty: "Lighting & Shade Control",
      description: "Professional lighting control and automated window treatments with wireless whole-home integration.",
      keyBenefits: ["Wireless reliability", "Energy efficiency", "Precision control"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-primary mr-3" />
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Professional Partnerships
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Authorized Professional Partners
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We maintain direct dealer relationships with industry-leading manufacturers, 
            ensuring access to professional-grade equipment and competitive pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-card-foreground">
                    {partner.name}
                  </h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                    <Star className="w-3 h-3 mr-1" />
                    {partner.badge}
                  </span>
                </div>
                <p className="text-sm font-medium text-primary mb-2">
                  {partner.specialty}
                </p>
              </div>
              
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {partner.description}
              </p>

              <ul className="space-y-2">
                {partner.keyBenefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-primary mr-2 flex-shrink-0" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-card-foreground mb-4">
            Why Professional Partnerships Matter
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">Direct Access</h4>
              <p className="text-sm text-muted-foreground">No middleman pricing - direct dealer benefits passed to you</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">Professional Grade</h4>
              <p className="text-sm text-muted-foreground">Commercial-quality equipment vs consumer alternatives</p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h4 className="font-semibold text-card-foreground mb-2">Expert Support</h4>
              <p className="text-sm text-muted-foreground">Factory training and dedicated technical support channels</p>
            </div>
          </div>
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3"
            onClick={handleContactClick}
          >
            Discuss Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DealerPartners;