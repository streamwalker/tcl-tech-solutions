
import Navigation from "../components/Navigation";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Services from "../components/Services";
import DealerPartners from "../components/DealerPartners";
import ValuePropositions from "../components/ValuePropositions";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ChatBot from "../components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      
      {/* Workforce Management Platform Access */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Access Workforce Management Platform</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your business operations with our comprehensive workforce intelligence and management platform.
          </p>
          <div className="space-x-4">
            <Link to="/dashboard">
              <Button size="lg">Access Platform</Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg">Sign In to Get Started</Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Services />
      <DealerPartners />
      <ValuePropositions />
      <Testimonials />
      <About />
      <Experience />
      <Contact />
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Index;
