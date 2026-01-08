import FeaturedCollection from "../FeaturedCollection";
import WhyChooseUs from "../WhyChooseUs";
import Testimonials from "../Testimonials";
import FutureOfCare from "../../components/FutureOfCare";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero section placeholder - keep as is if exists */}

      {/* Featured Collection */}
      <FeaturedCollection />

      {/* Future of Personal Care */}
      <FutureOfCare />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Testimonials */}
      <Testimonials />

    </main>
  );
};

export default Index;
