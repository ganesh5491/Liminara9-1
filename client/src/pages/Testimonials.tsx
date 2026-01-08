import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { 
    name: "Rajesh Kumar", 
    location: "Mumbai", 
    initials: "RK", 
    rating: 5, 
    review: "The Cellular Revive Serum is absolutely amazing! My skin has never looked better. The texture, the scent, everything is perfect.",
    product: "Cellular Revive Serum",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  { 
    name: "Priya Sharma", 
    location: "Delhi", 
    initials: "PS", 
    rating: 5, 
    review: "Got the complete anti-aging skincare set. Luxurious formulations that actually work! Visible results in just two weeks.",
    product: "Anti-Aging Collection",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  { 
    name: "Amit Mehta", 
    location: "Bangalore", 
    initials: "AM", 
    rating: 5, 
    review: "Hydrating Facial Cream — the texture is divine. It absorbs instantly without any greasy feeling. A game changer!",
    product: "Hydrating Facial Cream",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  },
  { 
    name: "Sneha Patel", 
    location: "Ahmedabad", 
    initials: "SP", 
    rating: 5, 
    review: "Vitamin C Brightening Serum is magnificent! My dark spots have faded significantly and my skin glows.",
    product: "Vitamin C Serum",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  { 
    name: "Vikram Singh", 
    location: "Pune", 
    initials: "VS", 
    rating: 5, 
    review: "Quality exceeded expectations — pharmaceutical-grade ingredients you can actually feel working.",
    product: "Overnight Repair Mask",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  const navigate = (dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-blush via-cream to-background">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border border-gold/20 rounded-full" />
      <div className="absolute top-20 left-20 w-24 h-24 border border-gold/10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border border-rose/20 rounded-full" />
      <div className="absolute bottom-20 right-24 w-28 h-28 border border-rose/10 rounded-full" />

      {/* Large quote mark background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5">
        <Quote className="w-96 h-96 text-gold" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-border mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold fill-gold" />
              ))}
            </div>
            <span className="text-sm font-medium text-muted-foreground">4.9/5 from 2,500+ reviews</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-espresso mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-latte">
            Real stories from our glowing community
          </p>
        </motion.div>

        {/* Testimonial Carousel */}
        <div className="relative">
          {/* Main testimonial card */}
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="relative"
              >
                <div className="relative p-8 md:p-12 rounded-3xl bg-white shadow-xl border border-border overflow-hidden">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blush to-transparent rounded-bl-full opacity-50" />

                  {/* Quote icon */}
                  <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Quote className="w-6 h-6 text-gold" />
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Star className="w-5 h-5 text-gold fill-gold" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Review text */}
                  <p className="text-xl md:text-2xl text-espresso font-medium leading-relaxed mb-8">
                    "{testimonials[currentIndex].review}"
                  </p>

                  {/* Product tag */}
                  <div className="inline-block px-4 py-1.5 rounded-full bg-blush text-sm text-latte mb-6">
                    Purchased: {testimonials[currentIndex].product}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gold/30"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-espresso">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-espresso hover:bg-blush transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex ? "w-8 bg-gold" : "w-2 bg-border hover:bg-latte"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => navigate(1)}
                className="w-12 h-12 rounded-full bg-white border border-border shadow-sm flex items-center justify-center text-espresso hover:bg-blush transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
