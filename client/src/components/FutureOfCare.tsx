import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// AI-generated pillar images - using static paths
const transparencyImg = "/images/pillar-transparency.png";
const efficacyImg = "/images/pillar-efficacy.png";
const affordableImg = "/images/pillar-affordable.png";
const globalImg = "/images/pillar-global.png";

const pillars = [
    {
        image: transparencyImg,
        title: "Transparency",
        subtitle: "Nothing to Hide",
        description: "Every ingredient, every concentration — fully disclosed. We believe you deserve to know exactly what touches your skin.",
        stats: "100% Ingredient Disclosure",
    },
    {
        image: efficacyImg,
        title: "Efficacy",
        subtitle: "Science-Backed",
        description: "Formulated in our state-of-the-art laboratories by dermatologists and chemists who obsess over results you can see.",
        stats: "12+ Years of Research",
    },
    {
        image: affordableImg,
        title: "Affordable",
        subtitle: "Luxury for All",
        description: "Premium skincare shouldn't come with a premium price. We've eliminated the middlemen to bring science to everyone.",
        stats: "60% Below Industry Average",
    },
    {
        image: globalImg,
        title: "Only the Best",
        subtitle: "Globally Sourced",
        description: "From Japanese rice bran to Moroccan argan — we travel the world to find ingredients that actually work.",
        stats: "32 Countries, 200+ Ingredients",
    },
];

const FutureOfCare = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

    return (
        <section
            ref={containerRef}
            className="relative py-28 md:py-40 overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background"
        >
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: backgroundY }}
            >
                <div className="absolute top-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-20 w-96 h-96 bg-rose/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-gold/3 to-transparent rounded-full" />
            </motion.div>

            {/* Decorative floating elements */}
            <motion.div
                animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-32 right-[15%] w-4 h-4 rounded-full bg-gradient-to-br from-gold to-gold-light opacity-40"
            />
            <motion.div
                animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-40 left-[10%] w-6 h-6 rounded-full bg-gradient-to-br from-rose to-blush opacity-30"
            />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center max-w-4xl mx-auto mb-24"
                >
                    <motion.span
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-sm font-medium tracking-[0.2em] uppercase text-gold mb-6"
                    >
                        Our Philosophy
                    </motion.span>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight leading-[1.1]">
                        The future of{" "}
                        <span className="relative">
                            <span className="text-gradient-gold">personal care</span>
                            <motion.span
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6, duration: 0.8 }}
                                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0 origin-left"
                            />
                        </span>
                        <br />is already here
                    </h2>

                    <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        Embrace a new standard where each element is chosen for its scientific merit,
                        delivering authentic, effective skincare that respects both your skin and your values.
                    </p>
                </motion.div>

                {/* Pillars Grid - Unique Staggered Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
                    {pillars.map((pillar, index) => (
                        <motion.div
                            key={pillar.title}
                            initial={{ opacity: 0, y: 60, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: index * 0.15, duration: 0.7 }}
                            className={`group relative ${index % 2 === 1 ? 'lg:mt-12' : ''}`}
                        >
                            <div className="relative h-full rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 hover:border-gold/30 transition-all duration-500 hover:shadow-2xl hover:shadow-gold/10">
                                {/* Background glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-rose/0 group-hover:from-gold/5 group-hover:via-transparent group-hover:to-rose/5 transition-all duration-700" />

                                <div className="relative p-8 md:p-10 flex flex-col md:flex-row items-center gap-8">
                                    {/* Image Container with 3D effect */}
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotateY: 10 }}
                                        transition={{ duration: 0.4 }}
                                        className="relative flex-shrink-0"
                                        style={{ perspective: "1000px" }}
                                    >
                                        {/* Glow behind image */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-rose/20 rounded-full blur-2xl scale-75 group-hover:scale-100 transition-transform duration-700" />

                                        {/* Floating ring */}
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                            className="absolute inset-0 rounded-full border border-dashed border-gold/20 scale-110"
                                        />

                                        {/* Main image */}
                                        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl shadow-gold/20 group-hover:shadow-2xl group-hover:shadow-gold/30 transition-shadow duration-500">
                                            <img
                                                src={pillar.image}
                                                alt={pillar.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Shimmer overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        {/* Floating badge */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                                            className="absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-gold to-gold-light text-xs font-semibold text-espresso shadow-lg"
                                        >
                                            {String(index + 1).padStart(2, '0')}
                                        </motion.div>
                                    </motion.div>

                                    {/* Content */}
                                    <div className="flex-1 text-center md:text-left">
                                        <span className="inline-block text-xs font-medium tracking-widest uppercase text-gold/70 mb-2">
                                            {pillar.subtitle}
                                        </span>

                                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-gold transition-colors duration-300">
                                            {pillar.title}
                                        </h3>

                                        <p className="text-muted-foreground leading-relaxed mb-4">
                                            {pillar.description}
                                        </p>

                                        {/* Stats badge */}
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border"
                                        >
                                            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                            <span className="text-sm font-medium text-foreground">
                                                {pillar.stats}
                                            </span>
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Bottom accent line */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                                    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/50 to-transparent origin-center"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center mt-20"
                >
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(215, 168, 110, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                        className="px-10 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-espresso font-semibold text-lg shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
                    >
                        Discover Our Science
                    </motion.button>

                    <p className="mt-4 text-sm text-muted-foreground">
                        Join 2M+ people who chose conscious beauty
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default FutureOfCare;
