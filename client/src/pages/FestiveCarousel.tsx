import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import all banner images
import bannerSlide1 from "../../public/banner/banner-slide1.jpg";
import bannerSlide2 from "../../public/banner/banner-slide2.jpg";
import bannerSlide3 from "../../public/banner/banner-slide3.jpg";
import bannerSlide4 from "../../public/banner/banner-slide4.jpg";
import bannerSlide5 from "../../public/banner/banner-slide5.jpg";

interface SlideData {
  id: number;
  // badge: string;
  badgeStyle: "offer" | "coupon" | "gift" | "combo" | "pack";
  headline: string;
  offerText: string;
  subtext: string;
  cta: string;
  image: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    // badge: "LIMITED TIME",
    badgeStyle: "offer",
    headline: "Festive Glow Sale",
    offerText: "50% OFF",
    subtext: "Limited Time Offer",
    cta: "Shop Now",
    image: bannerSlide1,
  },
  {
    id: 2,
    // badge: "COMBO DEAL",
    badgeStyle: "combo",
    headline: "Festive Special",
    offerText: "BUY 1 GET 2 FREE",
    subtext: "On Selected Products",
    cta: "Shop Now",
    image: bannerSlide2,
  },
  {
    id: 3,
    // badge: "COUPON: GLOW299",
    badgeStyle: "coupon",
    headline: "Exclusive Savings",
    offerText: "Flat ₹299 OFF",
    subtext: "On orders above ₹999",
    cta: "Apply Coupon",
    image: bannerSlide3,
  },
  {
    id: 4,
    // badge: "FREE GIFT",
    badgeStyle: "gift",
    headline: "Festive Bonus",
    offerText: "Get a Free Mini Kit",
    subtext: "On purchases above ₹1499",
    cta: "Shop Now",
    image: bannerSlide4,
  },
  {
    id: 5,
    // badge: "NEW ARRIVAL",
    badgeStyle: "pack",
    headline: "New Year Glow Pack",
    offerText: "Starting at ₹499",
    subtext: "Glow Essentials Bundle",
    cta: "Order Now",
    image: bannerSlide5,
  },
];

const badgeStyles = {
  offer: "bg-burgundy text-primary-foreground",
  combo: "bg-gold text-foreground",
  coupon: "border-2 border-gold bg-background/80 backdrop-blur-sm text-foreground",
  gift: "bg-gradient-to-r from-burgundy to-accent text-primary-foreground",
  pack: "bg-gradient-to-r from-gold to-gold-light text-foreground",
};

const FestiveCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const currentSlideData = slides[currentSlide];

  return (
    <div className="w-full overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-8">
      {/* Container with max-width */}
      <div className="max-w-7xl mx-auto">
        <div
          className="relative mx-auto w-full md:w-[90vw] lg:w-[75vw] xl:w-[70vw] overflow-hidden rounded-xl md:rounded-2xl shadow-2xl border border-gold/20"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Carousel Container - Full Width Banner */}
          <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[2/1] lg:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.7,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="absolute inset-0"
              >
                {/* Full Width Background Image */}
                <img
                  src={currentSlideData.image}
                  alt={`Liminara Cosmetics - ${currentSlideData.headline}`}
                  className="absolute inset-0 w-full h-full object-cover object-[85%_center] sm:object-[75%_center] md:object-[70%_center] lg:object-center"
                />

                {/* Subtle gradient overlay for mobile text readability only */}
                <div className="absolute inset-y-0 left-0 w-3/4 sm:w-0 bg-gradient-to-r from-background/60 via-background/30 to-transparent sm:hidden" />

                {/* Decorative Corner Elements */}
                <div className="absolute inset-0 corner-decoration hidden md:block" />

                {/* Gold Decorative Lines */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-gold via-gold/50 to-transparent" />

                {/* Text Content Overlay - Left Side */}
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full sm:w-3/5 md:w-1/2 lg:w-[40%] p-6 sm:p-8 md:p-10 lg:p-14 flex flex-col justify-center items-center text-center sm:items-start sm:text-left">
                    {/* Brand Name */}
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
                      className="font-display text-[10px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-gold-dark mb-3 sm:mb-4"
                    >
                      LIMINARA COSMETICS
                    </motion.p>

                    {/* Badge */}
                    {/* <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.25, duration: 0.5, type: "spring", stiffness: 200 }}
                      className={`inline-flex sm:self-start px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs md:text-sm font-semibold tracking-wide mb-3 sm:mb-4 ${badgeStyles[currentSlideData.badgeStyle]}`}
                    >
                      {currentSlideData.badge}
                    </motion.span> */}

                    {/* Headline */}
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="font-display text-lg sm:text-2xl md:text-3xl lg:text-4xl text-foreground mb-1 sm:mb-2"
                    >
                      {currentSlideData.headline}
                    </motion.h2>

                    {/* Offer Text */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.45, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="font-body font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-burgundy mb-2 sm:mb-3 leading-tight"
                    >
                      {currentSlideData.offerText}
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.55, duration: 0.6, ease: "easeOut" }}
                      className="font-body text-xs sm:text-sm md:text-base text-muted-foreground mb-4 sm:mb-6"
                    >
                      {currentSlideData.subtext}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.button
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ delay: 0.65, duration: 0.5, type: "spring", stiffness: 150 }}
                      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(184, 134, 11, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 sm:px-8 py-2 sm:py-2.5 bg-gold text-foreground font-semibold text-[13px] sm:text-sm rounded-full shadow-gold hover:shadow-lg transition-all duration-300 sm:self-start"
                    >
                      {currentSlideData.cta}
                    </motion.button>
                  </div>
                </div>

                {/* Sponsored Tag */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20">
                  <span className="text-[10px] sm:text-xs text-foreground/60 font-body tracking-wide">
                    Sponsored
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors z-20 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground group-hover:text-burgundy transition-colors" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center transition-colors z-20 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-foreground group-hover:text-burgundy transition-colors" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 rounded-full ${index === currentSlide
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-gold"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gold/40 hover:bg-gold/60"
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestiveCarousel;
