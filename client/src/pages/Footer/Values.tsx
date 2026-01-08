import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Shield, Leaf, Gem, Heart, Scale, Sun } from "lucide-react";

const Values = () => {
  const values = [
    { icon: Shield, title: "Transparency", desc: "We believe in complete honesty about our ingredients, processes, and practices. No hidden chemicals, no misleading claims." },
    { icon: Leaf, title: "Sustainability", desc: "Environmental responsibility is at our core. From eco-friendly packaging to sustainable sourcing, we're committed to protecting our planet." },
    { icon: Gem, title: "Quality", desc: "Only the finest ingredients make it into our products. We never compromise on quality, ensuring you get the best results." },
    { icon: Heart, title: "Compassion", desc: "We're cruelty-free and vegan. Our products are never tested on animals, and we support ethical beauty practices." },
    { icon: Scale, title: "Integrity", desc: "We do what's right, not what's easy. Our business practices reflect our commitment to ethical standards." },
    { icon: Sun, title: "Innovation", desc: "We continuously push boundaries in beauty science, bringing you cutting-edge formulations backed by research." },
  ];

  return (
    <main className="min-h-screen bg-background">
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
            Our Values
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4 max-w-2xl text-lg"
          >
            The principles that guide everything we do at Lumière.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-6">
                <value.icon className="w-7 h-7 text-gold" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

    </main>
  );
};

export default Values;
