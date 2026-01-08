import { motion } from "framer-motion";
import { ShieldCheck, FlaskConical, Truck, Leaf, Award, Sparkles, ArrowRight } from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: ShieldCheck,
    title: "Dermatologist Approved",
    description: "Every formula tested and approved by leading skin experts for safety on all skin types.",
    stat: "50+",
    statLabel: "Expert Partners",
    accentColor: "gold",
  },
  {
    icon: FlaskConical,
    title: "Clinically Proven",
    description: "Active ingredients backed by rigorous clinical studies and scientific research.",
    stat: "98%",
    statLabel: "Efficacy Rate",
    accentColor: "gold",
  },
  {
    icon: Leaf,
    title: "Clean Beauty",
    description: "Sustainable, cruelty-free formulations with ethically sourced natural ingredients.",
    stat: "100%",
    statLabel: "Natural Origin",
    accentColor: "gold",
  },
  {
    icon: Truck,
    title: "Express Delivery",
    description: "Fast and secure shipping with premium packaging to preserve product integrity.",
    stat: "24h",
    statLabel: "Metro Delivery",
    accentColor: "gold",
  },
  {
    icon: Award,
    title: "Award Winning",
    description: "Recognized globally for innovation in skincare technology and formulation.",
    stat: "15+",
    statLabel: "Industry Awards",
    accentColor: "gold",
  },
  {
    icon: Sparkles,
    title: "Visible Results",
    description: "Experience transformation with proven efficacy in as little as 2 weeks.",
    stat: "2wk",
    statLabel: "Avg. Results",
    accentColor: "gold",
  },
];

const trustBadges = [
  { label: "Cruelty Free", icon: "🐰" },
  { label: "Vegan", icon: "🌱" },
  { label: "Paraben Free", icon: "✨" },
  { label: "Sustainable", icon: "♻️" },
];

export default function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Sophisticated neutral background */}
      <div className="absolute inset-0 bg-[#FBF8F5]" />

      {/* Animated soft overlay */}
      <div className="absolute inset-0 opacity-40">
        <div
          className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #5A3E2B/0.05 0%, transparent 70%)',
            transform: 'translate(30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #7A6A5E/0.05 0%, transparent 70%)',
            transform: 'translate(-30%, 30%)',
          }}
        />
      </div>

      {/* Geometric decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-[#5A3E2B]/10 rounded-full animate-float opacity-40" />
      <div className="absolute top-40 right-20 w-12 h-12 border border-[#7A6A5E]/10 rotate-45 animate-float-delayed opacity-40" />
      <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-gradient-to-br from-[#5A3E2B]/10 to-transparent rounded-full opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with unique styling */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/50 backdrop-blur-sm border border-[#5A3E2B]/10 mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#5A3E2B] opacity-40"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#5A3E2B]"></span>
            </span>
            <span className="text-sm font-medium text-[#3B2A20]">The Liminara Difference</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#3B2A20] mb-6 leading-tight">
            Science Meets{" "}
            <span className="relative inline-block">
              <span className="text-[#5A3E2B]">Luxury</span>
              <motion.svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.path
                  d="M2 8 Q50 2, 100 8 T198 6"
                  fill="none"
                  stroke="#5A3E2B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="opacity-20"
                />
              </motion.svg>
            </span>
          </h2>

          <p className="text-lg md:text-xl text-[#7A6A5E] max-w-2xl mx-auto leading-relaxed">
            Where clinical precision meets indulgent self-care — discover why thousands trust Liminara for their skincare journey
          </p>
        </motion.div>

        {/* Bento-style feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`group relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ${idx === 0 || idx === 5 ? 'lg:col-span-1' : ''
                }`}
            >
              <div className="relative h-full min-h-[280px] p-8 bg-white/90 backdrop-blur-sm border border-[#5A3E2B]/5 shadow-sm hover:shadow-2xl hover:shadow-[#5A3E2B]/5 transition-all duration-500">
                {/* Dynamic background gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br from-${feature.accentColor}/10 via-transparent to-transparent`}
                  animate={{
                    opacity: hoveredIndex === idx ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Soft glow effect */}
                <motion.div
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle, #5A3E2B/0.1 0%, transparent 70%)`,
                  }}
                  animate={{
                    scale: hoveredIndex === idx ? 1.2 : 1,
                    opacity: hoveredIndex === idx ? 0.6 : 0.2,
                  }}
                  transition={{ duration: 0.4 }}
                />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* Icon with animated ring */}
                  <div className="relative mb-6">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-[#5A3E2B]/5 flex items-center justify-center shadow-sm border border-[#5A3E2B]/10`}
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    >
                      <feature.icon className="w-8 h-8 text-[#5A3E2B]" />
                    </motion.div>

                    {/* Animated ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-[#5A3E2B]/20"
                      animate={{
                        scale: hoveredIndex === idx ? [1, 1.3, 1.3] : 1,
                        opacity: hoveredIndex === idx ? [0.5, 0, 0] : 0,
                      }}
                      transition={{ duration: 0.6, repeat: hoveredIndex === idx ? Infinity : 0 }}
                    />
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-semibold text-[#3B2A20] mb-3 group-hover:text-[#5A3E2B] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {feature.description}
                  </p>

                  {/* Stats badge */}
                  <motion.div
                    className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    <div>
                      <div className="text-2xl font-bold text-[#5A3E2B]">{feature.stat}</div>
                      <div className="text-xs text-[#7A6A5E] uppercase tracking-wider">{feature.statLabel}</div>
                    </div>
                    <motion.div
                      className="w-10 h-10 rounded-full bg-[#5A3E2B]/5 flex items-center justify-center group-hover:bg-[#5A3E2B]/10 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      <ArrowRight className="w-4 h-4 text-[#5A3E2B]" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 overflow-hidden">
                  <motion.div
                    className={`absolute bottom-[-50%] right-[-50%] w-full h-full rounded-full bg-[#5A3E2B]/5`}
                    animate={{
                      scale: hoveredIndex === idx ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges with modern pill design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          {trustBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#5A3E2B]/10 shadow-sm hover:shadow-md hover:border-[#5A3E2B]/30 transition-all duration-300"
            >
              <span className="text-lg">{badge.icon}</span>
              <span className="text-sm font-medium text-[#3B2A20]">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 h-px bg-gradient-to-r from-transparent via-[#5A3E2B]/10 to-transparent"
        />
      </div>
    </section>
  );
}
