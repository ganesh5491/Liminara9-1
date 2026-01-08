import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Sparkles, Users, Globe } from "lucide-react";

const About = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-espresso text-cream py-20">
        <div className="container mx-auto px-6">
          <Link to="/" className="inline-flex items-center gap-2 text-cream/60 hover:text-gold mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gradient-gold"
          >
            About Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4 max-w-2xl text-lg"
          >
            Discover the story behind Lumière and our commitment to revolutionizing personal care.
          </motion.p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-foreground">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Founded with a vision to transform the personal care industry, Lumière emerged from a simple yet profound belief: everyone deserves access to premium, effective, and transparent beauty solutions. Our journey began when we recognized the gap between what consumers truly need and what the industry was offering.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we stand as a beacon of innovation, combining cutting-edge science with natural wisdom to create products that not only enhance your beauty but also nurture your well-being.
            </p>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Heart, title: "Our Mission", desc: "To democratize access to premium personal care, making luxury beauty accessible to everyone while maintaining the highest standards of quality and ethics." },
              { icon: Sparkles, title: "Our Vision", desc: "To become the global leader in transparent, science-backed personal care solutions that empower individuals to feel confident in their own skin." },
              { icon: Users, title: "Our Team", desc: "A diverse group of scientists, beauty experts, and passionate advocates working together to bring you products that truly make a difference." },
              { icon: Globe, title: "Global Reach", desc: "Serving customers across 50+ countries, we're committed to bringing the best of beauty innovation to every corner of the world." },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-shadow"
              >
                <item.icon className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </main>
  );
};

export default About;
