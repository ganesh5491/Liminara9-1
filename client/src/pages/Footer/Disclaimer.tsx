import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle } from "lucide-react";

const Disclaimer = () => {
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
            Disclaimer
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent/30 border border-accent rounded-2xl p-8 flex gap-4"
          >
            <AlertTriangle className="w-8 h-8 text-gold flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Important Notice</h3>
              <p className="text-muted-foreground">The information provided on this website is for general informational purposes only. Please read this disclaimer carefully before using our products or services.</p>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">General Disclaimer</h2>
            <p className="text-muted-foreground">The content on this website is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Product Results</h2>
            <p className="text-muted-foreground">Individual results may vary. The statements regarding our products have not been evaluated by any regulatory authority. Our products are not intended to diagnose, treat, cure, or prevent any disease.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Allergies & Sensitivities</h2>
            <p className="text-muted-foreground">Please review product ingredients carefully before use. If you have known allergies or sensitivities, consult with a healthcare professional before using our products. Always perform a patch test before full application.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">External Links</h2>
            <p className="text-muted-foreground">Our website may contain links to external websites. We have no control over the content and nature of these sites and are not responsible for their content or privacy policies.</p>
          </motion.section>
        </div>
      </div>

    </main>
  );
};

export default Disclaimer;
