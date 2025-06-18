
import Hero from "../components/Hero";
import Features from "../components/Features";
import TechShowcase from "../components/TechShowcase";
import CallToAction from "../components/CallToAction";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Hero />
      <Features />
      <TechShowcase />
      <CallToAction />
    </div>
  );
};

export default Index;
