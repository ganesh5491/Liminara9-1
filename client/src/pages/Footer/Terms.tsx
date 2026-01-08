import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Terms = () => {
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
            Terms & Conditions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4"
          >
            Last updated: January 2026
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Acceptance of Terms</h2>
            <p className="text-muted-foreground">By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Use License</h2>
            <p className="text-muted-foreground">Permission is granted to temporarily download one copy of the materials on Lumière's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Product Information</h2>
            <p className="text-muted-foreground">We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Pricing</h2>
            <p className="text-muted-foreground">All prices are subject to change without notice. We reserve the right to modify or discontinue products without notice. We shall not be liable to you or any third party for any modification, price change, or discontinuance.</p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground">Limitation of Liability</h2>
            <p className="text-muted-foreground">In no event shall Lumière or its suppliers be liable for any damages arising out of the use or inability to use the materials on Lumière's website, even if Lumière has been notified of the possibility of such damage.</p>
          </motion.section>
        </div>
      </div>

    </main>
  );
};

export default Terms;
