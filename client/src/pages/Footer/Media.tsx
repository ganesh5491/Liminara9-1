import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Download, Newspaper } from "lucide-react";

const Media = () => {
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
            Media Outreach
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4 max-w-2xl text-lg"
          >
            Press inquiries, media kits, and collaboration opportunities.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card rounded-2xl p-8 border border-border">
              <Mail className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Press Inquiries</h3>
              <p className="text-muted-foreground mb-4">For all media and press-related inquiries, please contact our PR team.</p>
              <a href="mailto:press@lumiere.com" className="text-gold hover:underline">press@lumiere.com</a>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border">
              <Phone className="w-10 h-10 text-gold mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">Media Hotline</h3>
              <p className="text-muted-foreground mb-4">Urgent media inquiries can reach us directly via phone.</p>
              <a href="tel:+911234567890" className="text-gold hover:underline">+91 123 456 7890</a>
            </div>
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-espresso to-latte rounded-2xl p-8 text-cream"
          >
            <div className="flex items-start gap-6">
              <Download className="w-12 h-12 text-gold flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-semibold mb-3">Media Kit</h3>
                <p className="text-cream/70 mb-6">Download our comprehensive media kit including brand assets, product images, company information, and press releases.</p>
                <button className="bg-gold text-espresso px-6 py-3 rounded-lg font-medium hover:bg-gold-light transition-colors">
                  Download Media Kit
                </button>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Newspaper className="w-8 h-8 text-gold" />
              <h2 className="text-2xl font-bold text-foreground">Recent Press Releases</h2>
            </div>
            <div className="space-y-4">
              {[
                { date: "Jan 2026", title: "Lumière Launches Revolutionary Anti-Aging Serum" },
                { date: "Dec 2025", title: "Expanding to 10 New Countries in Southeast Asia" },
                { date: "Nov 2025", title: "Partnership Announcement with Leading Dermatologists" },
              ].map((release) => (
                <div key={release.title} className="bg-card rounded-xl p-6 border border-border hover:shadow-md transition-shadow cursor-pointer">
                  <p className="text-sm text-muted-foreground mb-1">{release.date}</p>
                  <h4 className="text-lg font-medium text-foreground">{release.title}</h4>
                </div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>

    </main>
  );
};

export default Media;
