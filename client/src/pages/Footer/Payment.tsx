import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, CreditCard, Smartphone, Building, Shield } from "lucide-react";

const Payment = () => {
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
            Payment Policy
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
              { icon: CreditCard, title: "Cards", methods: ["Visa", "Mastercard", "Rupay", "American Express"] },
              { icon: Smartphone, title: "UPI & Wallets", methods: ["Google Pay", "PhonePe", "PayTM", "Amazon Pay"] },
              { icon: Building, title: "Net Banking", methods: ["All major banks", "50+ banks supported"] },
              { icon: Shield, title: "Secure Payments", methods: ["256-bit encryption", "PCI DSS compliant"] },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <item.icon className="w-8 h-8 text-gold" />
                  <h3 className="font-semibold text-foreground text-lg">{item.title}</h3>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {item.methods.map((m) => <li key={m}>• {m}</li>)}
                </ul>
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
              <h2 className="text-2xl font-bold text-foreground">Cash on Delivery</h2>
              <p className="text-muted-foreground">COD is available for orders up to ₹5,000. A small convenience fee of ₹50 applies. COD is not available in some remote pincodes. You'll be notified at checkout if your location is eligible.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">EMI Options</h2>
              <p className="text-muted-foreground">We offer no-cost EMI on orders above ₹3,000 with select bank cards. EMI tenure options: 3, 6, 9, and 12 months available. Check eligibility at checkout with your card.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Payment Security</h2>
              <p className="text-muted-foreground">All transactions are secured with 256-bit SSL encryption. We are PCI DSS Level 1 compliant. We never store your complete card details. All payment data is processed by trusted payment gateways.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Failed Payments</h2>
              <p className="text-muted-foreground">If your payment fails but money is debited, it will be automatically refunded within 5-7 business days. If not received, contact your bank or our support team with transaction details.</p>
            </section>
          </motion.div>
        </div>
      </div>

    </main>
  );
};

export default Payment;
