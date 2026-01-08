import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowUpRight, Star, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";

const cosmeticSamples = [
  { id: "1", name: "Cellular Revive Serum", price: 2499, category: "Anti-Aging", tagline: "Youth in a bottle", description: "Advanced anti-aging formula with peptides and hyaluronic acid for visibly younger skin.", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=1000&fit=crop", rating: 4.9, reviews: 2847 },
  { id: "2", name: "Hydrating Facial Cream", price: 1899, category: "Moisturizer", tagline: "Deep hydration", description: "Deep hydration with ceramides and vitamin E complex for 72-hour moisture lock.", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=1000&fit=crop", rating: 4.8, reviews: 1923 },
  { id: "3", name: "Vitamin C Brightening", price: 1599, category: "Serum", tagline: "Radiance unleashed", description: "Brighten and even skin tone with 15% vitamin C and antioxidant protection.", image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&h=1000&fit=crop", rating: 4.7, reviews: 3156 },
  { id: "4", name: "Rose Gold Eye Cream", price: 1299, category: "Eye Care", tagline: "Awaken your eyes", description: "Reduce dark circles and fine lines with gold-infused peptide technology.", image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&h=1000&fit=crop", rating: 4.9, reviews: 1654 },
  { id: "5", name: "Overnight Repair Mask", price: 1799, category: "Treatment", tagline: "Beauty sleep", description: "Wake up to renewed, radiant skin with intensive overnight repair.", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=800&h=1000&fit=crop", rating: 4.6, reviews: 2089 },
];

export default function FeaturedCollection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate when not hovering
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cosmeticSamples.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const activeProduct = cosmeticSamples[activeIndex];

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % cosmeticSamples.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + cosmeticSamples.length) % cosmeticSamples.length);

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#FBF8F5]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Dynamic background that changes with product */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${activeProduct.image})` }}
          />
          <div className="absolute inset-0 bg-[#FBF8F5]/50 backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5A3E2B]/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5A3E2B]/10 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        {/* Top bar with navigation */}
        <div className="flex items-center justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#3B2A20] leading-tight">
              Featured Collection
            </h1>
          </motion.div>

          {/* Navigation controls */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="hidden md:flex items-center gap-2 mr-6">
              <span className="text-5xl font-serif font-bold text-[#5A3E2B]">
                {String(activeIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-[#7A6A5E]/40 text-lg">/</span>
              <span className="text-[#7A6A5E]/40 text-lg">
                {String(cosmeticSamples.length).padStart(2, '0')}
              </span>
            </div>
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#5A3E2B]/10 flex items-center justify-center text-[#7A6A5E] hover:border-[#5A3E2B] hover:text-[#5A3E2B] transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#5A3E2B]/10 flex items-center justify-center text-[#7A6A5E] hover:border-[#5A3E2B] hover:text-[#5A3E2B] transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Product details */}
          <motion.div
            className="lg:col-span-5 order-2 lg:order-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Category & rating */}
                <div className="flex items-center gap-4">
                  <span className="px-4 py-1.5 rounded-full border border-[#5A3E2B]/30 text-[#5A3E2B] text-sm tracking-wider uppercase">
                    {activeProduct.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(activeProduct.rating) ? 'text-[#5A3E2B] fill-[#5A3E2B]' : 'text-[#7A6A5E]/20'}`}
                        />
                      ))}
                    </div>
                    <span className="text-[#7A6A5E] text-sm">({activeProduct.reviews.toLocaleString()})</span>
                  </div>
                </div>

                {/* Tagline */}
                <p className="text-[#5A3E2B]/70 text-lg font-light italic">"{activeProduct.tagline}"</p>

                {/* Product name */}
                <h3 className="text-3xl md:text-5xl font-serif font-bold text-[#3B2A20] leading-tight">
                  {activeProduct.name}
                </h3>

                {/* Description */}
                <p className="text-[#7A6A5E] text-lg leading-relaxed max-w-md">
                  {activeProduct.description}
                </p>

                {/* Price & CTA */}
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  <div>
                    <span className="text-[#7A6A5E]/50 text-sm">Price</span>
                    <p className="text-4xl font-bold text-[#5A3E2B]">
                      ₹{activeProduct.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="lg"
                    className="rounded-full bg-[#5A3E2B] text-white hover:bg-[#3B2A20] gap-3 px-8 py-6 text-base font-semibold group"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    Add to Bag
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Center: Main product image */}
          <motion.div
            className="lg:col-span-4 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Main image container */}
              <div className="relative h-full rounded-[2.5rem] overflow-hidden border border-[#5A3E2B]/10 shadow-2xl shadow-[#3B2A20]/10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeIndex}
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#FBF8F5]/40 via-transparent to-transparent" />

                {/* Corner accents */}
                <div className="absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-[#5A3E2B]/20 rounded-tl-2xl" />
                <div className="absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-[#5A3E2B]/20 rounded-br-2xl" />
              </div>
            </div>
          </motion.div>

          {/* Right: Thumbnail strip */}
          <motion.div
            className="lg:col-span-3 order-3 hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {cosmeticSamples.map((product, index) => (
                <motion.button
                  key={product.id}
                  onClick={() => setActiveIndex(index)}
                  className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all duration-500 group ${index === activeIndex
                      ? "bg-[#5A3E2B]/5 border border-[#5A3E2B]/20"
                      : "bg-[#7A6A5E]/5 border border-transparent hover:bg-[#7A6A5E]/10"
                    }`}
                  whileHover={{ x: 8 }}
                >
                  {/* Thumbnail */}
                  <div className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 ${index === activeIndex ? "ring-2 ring-[#5A3E2B]" : ""
                    }`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 text-left">
                    <p className={`font-medium truncate transition-colors ${index === activeIndex ? "text-[#5A3E2B]" : "text-[#3B2A20]/80 group-hover:text-[#3B2A20]"
                      }`}>
                      {product.name}
                    </p>
                    <p className="text-[#7A6A5E]/60 text-sm">₹{product.price.toLocaleString()}</p>
                  </div>

                  {/* Active indicator */}
                  <motion.div
                    className={`w-2 h-2 rounded-full ${index === activeIndex ? "bg-[#5A3E2B]" : "bg-[#7A6A5E]/20"
                      }`}
                    animate={index === activeIndex ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>
              ))}
            </div>

            {/* View all link */}
            <Button
              variant="ghost"
              className="w-full mt-6 text-[#7A6A5E] hover:text-[#5A3E2B] hover:bg-transparent group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>

        {/* Bottom progress bar */}
        <motion.div
          className="mt-16 lg:mt-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2">
            {cosmeticSamples.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="flex-1 h-1 rounded-full overflow-hidden bg-[#5A3E2B]/10"
              >
                <motion.div
                  className="h-full bg-[#5A3E2B] rounded-full"
                  initial={{ width: "0%" }}
                  animate={{
                    width: index === activeIndex ? "100%" : index < activeIndex ? "100%" : "0%"
                  }}
                  transition={{
                    duration: index === activeIndex && !isHovering ? 4 : 0.3,
                    ease: "linear"
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
