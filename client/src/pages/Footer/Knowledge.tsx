import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Beaker, Leaf, Sparkles } from "lucide-react";

const Knowledge = () => {
  const articles = [
    { icon: Beaker, title: "Understanding Skincare Ingredients", desc: "Learn about active ingredients like retinol, vitamin C, and niacinamide.", category: "Ingredients" },
    { icon: Leaf, title: "Natural vs Synthetic: The Truth", desc: "Debunking myths about natural and synthetic ingredients in cosmetics.", category: "Science" },
    { icon: Sparkles, title: "Building Your Skincare Routine", desc: "Step-by-step guide to creating an effective daily routine.", category: "Guides" },
    { icon: BookOpen, title: "Anti-Aging: What Really Works", desc: "Evidence-based approaches to maintaining youthful skin.", category: "Research" },
    { icon: Beaker, title: "The Science of Hydration", desc: "How hyaluronic acid and other humectants work.", category: "Ingredients" },
    { icon: Leaf, title: "Sustainable Beauty Practices", desc: "Making eco-conscious choices in your beauty routine.", category: "Lifestyle" },
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
            Knowledge Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4 max-w-2xl text-lg"
          >
            Explore science-backed insights about skincare and beauty.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
            >
              <span className="inline-block text-xs font-medium text-gold bg-gold/10 px-3 py-1 rounded-full mb-4">
                {article.category}
              </span>
              <article.icon className="w-10 h-10 text-gold mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                {article.title}
              </h3>
              <p className="text-muted-foreground">{article.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>

    </main>
  );
};

export default Knowledge;
