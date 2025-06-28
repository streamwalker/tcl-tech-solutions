
import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Services from "../components/Services";
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
      <Services />
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
