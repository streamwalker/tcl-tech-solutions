
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import BusinessPlanHero from "../components/BusinessPlanHero";
import BusinessPlanContent from "../components/BusinessPlanContent";

const BusinessPlan = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BusinessPlanHero />
      <BusinessPlanContent />
      <Footer />
    </div>
  );
};

export default BusinessPlan;
