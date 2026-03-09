import IBMNavigation from "../components/IBMNavigation";
import IBMHero from "../components/IBMHero";
import IBMRecommendations from "../components/IBMRecommendations";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Services from "../components/Services";
import DealerPartners from "../components/DealerPartners";
import ValuePropositions from "../components/ValuePropositions";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";
import CookieConsent from "../components/CookieConsent";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <IBMNavigation />
      <IBMHero />
      <IBMRecommendations />
      
      {/* Platform Access Section - IBM-style clean design */}
      <section className="py-20 bg-background border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Access our comprehensive platform
            </h2>
            <p className="text-lg text-muted-foreground">
              Transform your business operations with our comprehensive workforce intelligence 
              and management platform designed for modern enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/dashboard">
                <Button size="lg" className="px-8 font-medium">
                  Access Platform
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="px-8 font-medium">
                  Sign In to Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Legacy Sections - Keep all existing content but with IBM-style spacing */}
      <div className="space-y-0">
        <Services />
        <DealerPartners />
        <ValuePropositions />
        <Testimonials />
        <About />
        <Experience />
        <Contact />
      </div>
      
      <Footer />
      <ChatBot />
      <CookieConsent />
    </div>
  );
};

export default Index;
