import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Truck, Clock, MapPin, Package } from "lucide-react";

const Shipping = () => {
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
            Shipping Policy
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders above ₹999" },
              { icon: Clock, title: "Fast Delivery", desc: "2-7 business days" },
              { icon: MapPin, title: "Pan India", desc: "Delivering to 28,000+ pincodes" },
              { icon: Package, title: "Secure Packaging", desc: "Tamper-proof, eco-friendly" },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-6 border border-border flex items-start gap-4">
                <item.icon className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Shipping Rates</h2>
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 text-foreground font-medium">Order Value</th>
                      <th className="text-left p-4 text-foreground font-medium">Shipping Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr><td className="p-4 text-muted-foreground">Below ₹499</td><td className="p-4 text-muted-foreground">₹99</td></tr>
                    <tr><td className="p-4 text-muted-foreground">₹499 - ₹999</td><td className="p-4 text-muted-foreground">₹49</td></tr>
                    <tr><td className="p-4 text-muted-foreground">Above ₹999</td><td className="p-4 text-gold font-medium">FREE</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Delivery Timeline</h2>
              <p className="text-muted-foreground">Orders are processed within 24 hours (excluding weekends and holidays). Standard delivery takes 5-7 business days for most locations. Metro cities typically receive orders within 2-4 business days.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">International Shipping</h2>
              <p className="text-muted-foreground">We ship to 50+ countries worldwide. International shipping costs are calculated at checkout based on weight and destination. Delivery typically takes 10-15 business days. Import duties and taxes are the responsibility of the customer.</p>
            </section>
          </motion.div>
        </div>
      </div>

    </main>
  );
};

export default Shipping;
