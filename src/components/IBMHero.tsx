import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";

const IBMHero = () => {
  const newsItems = [
    {
      type: "News",
      title: "TCL Launches Advanced Smart Home Automation in San Antonio",
      excerpt: "Revolutionary Control4 and Savant automation technology for modern San Antonio homes...",
      link: "/services#smart-home-automation"
    },
    {
      type: "Insights",
      title: "AI-Powered Workforce Management for Texas Businesses",
      excerpt: "How AI-powered analytics transform San Antonio business operations...",
      link: "/dashboard"
    },
    {
      type: "Product",
      title: "OmniCode Development Platform Now Available",
      excerpt: "Next-generation development tools with AI assistance for modern teams...",
      link: "/omnicode"
    }
  ];

  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Hero Content - Left Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                Smart Home Automation & Technology Solutions in San Antonio
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                San Antonio's veteran-owned smart home automation, home theater installation, and 
                enterprise IT company. Control4, Savant, and Lutron authorized dealer serving 
                residential and commercial customers across South Texas.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
                asChild
              >
                <Link to="/dashboard" className="flex items-center gap-2">
                  Explore our platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-primary text-primary hover:bg-primary/5 font-medium px-8"
                asChild
              >
                <Link to="/business-plan" className="flex items-center gap-2">
                  Learn about TCL
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Visual - Center */}
          <div className="lg:col-span-4 relative">
            <div className="relative">
              <img 
                src="/TCL Home Automation.jpg" 
                alt="Smart home automation installation by The Connected Lifestyle in San Antonio TX — Control4 and Savant whole-home systems" 
                className="w-full h-80 lg:h-96 object-cover rounded-lg shadow-xl"
              />
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">Live Demo Available</span>
                </div>
              </div>
            </div>
          </div>

          {/* News Sidebar - Right Side */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Latest News</h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                  View all <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {newsItems.map((item, index) => (
                  <Card key={index} className="p-4 hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <Link to={item.link}>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {item.type}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center text-primary">
                          <span className="text-xs font-medium">Read more</span>
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IBMHero;