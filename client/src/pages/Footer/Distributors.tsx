import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Package, Globe, Handshake, Send } from "lucide-react";

const Distributors = () => {
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
            Distributor Queries
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4 max-w-2xl text-lg"
          >
            Partner with us to bring Lumière to your market.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: Package, title: "Quality Products", desc: "Premium formulations with proven efficacy" },
              { icon: Globe, title: "Global Presence", desc: "Established supply chain across 50+ countries" },
              { icon: Handshake, title: "Partner Support", desc: "Comprehensive marketing and training support" },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border text-center">
                <item.icon className="w-10 h-10 text-gold mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Become a Distributor</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name *</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Contact Person *</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                  <input type="email" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone *</label>
                  <input type="tel" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Country/Region *</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Current Business Type</label>
                  <select className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors">
                    <option>Retail Chain</option>
                    <option>E-commerce</option>
                    <option>Pharmacy</option>
                    <option>Salon/Spa</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                <textarea rows={4} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Tell us about your business and distribution capabilities..."></textarea>
              </div>
              <button type="submit" className="bg-gold text-espresso px-8 py-3 rounded-lg font-medium hover:bg-gold-light transition-colors inline-flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Inquiry
              </button>
            </form>
          </motion.section>
        </div>
      </div>

    </main>
  );
};

export default Distributors;
