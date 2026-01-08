import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Privacy = () => {
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
            Privacy Notice
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
        <div className="max-w-4xl mx-auto prose prose-lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Information We Collect</h2>
              <p className="text-muted-foreground">We collect information you provide directly to us, such as when you create an account, make a purchase, subscribe to our newsletter, or contact us for support. This may include your name, email address, postal address, phone number, and payment information.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">How We Use Your Information</h2>
              <p className="text-muted-foreground">We use the information we collect to process transactions, send order confirmations, respond to your inquiries, send marketing communications (with your consent), improve our products and services, and comply with legal obligations.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Information Sharing</h2>
              <p className="text-muted-foreground">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services (e.g., payment processors, shipping partners) or as required by law.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Data Security</h2>
              <p className="text-muted-foreground">We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Your Rights</h2>
              <p className="text-muted-foreground">You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time by clicking the unsubscribe link in our emails.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="text-muted-foreground">If you have any questions about this Privacy Notice, please contact us at privacy@lumiere.com.</p>
            </section>
          </motion.div>
        </div>
      </div>

    </main>
  );
};

export default Privacy;
