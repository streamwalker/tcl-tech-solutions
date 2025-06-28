
import Navigation from "../components/Navigation";
import BusinessPlanHero from "../components/BusinessPlanHero";
import BusinessPlanContent from "../components/BusinessPlanContent";
import Footer from "../components/Footer";

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
