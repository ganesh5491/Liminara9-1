import { useNavigate } from "react-router-dom";
import Hero from "./hero";
import CosmeticsProducts from "./cosmetics-products";
import FeaturedCollection from "./FeaturedCollection";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChooseUs";
import FutureOfCare from "../components/FutureOfCare";
import FestiveCarousel from "./FestiveCarousel";

// New cosmetic-first palettes (soft pastels + gold accents)
const softCream = "#FFF8F2";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-[--page-bg]" style={{ ['--page-bg' as any]: softCream }}>
      <Hero /> <br /> <br /><br />
      <FestiveCarousel />
      <div id="cosmetics-section" className="py-12 bg-cream/30">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-espresso">Cosmetics Products</h2>
          </div>
          <CosmeticsProducts />
        </div>
      </div>
      <FutureOfCare />
      <FeaturedCollection />
      <WhyChooseUs />
      <Testimonials />
    </main>
  );
}
