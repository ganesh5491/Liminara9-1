import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, RotateCcw, Clock, CreditCard, CheckCircle } from "lucide-react";

const Returns = () => {
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
            Return & Refund Policy
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Key Points */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-4 mb-12"
          >
            {[
              { icon: RotateCcw, title: "30 Days", desc: "Return window" },
              { icon: Clock, title: "48 Hours", desc: "Pickup scheduled" },
              { icon: CreditCard, title: "5-7 Days", desc: "Refund processed" },
              { icon: CheckCircle, title: "Free Returns", desc: "No questions asked" },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-4 border border-border text-center">
                <item.icon className="w-8 h-8 text-gold mx-auto mb-2" />
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
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
              <h2 className="text-2xl font-bold text-foreground">Return Eligibility</h2>
              <ul className="text-muted-foreground space-y-2 list-disc list-inside">
                <li>Products must be returned within 30 days of delivery</li>
                <li>Items must be unused and in original packaging</li>
                <li>Opened products can be returned only if defective or damaged</li>
                <li>Sale items and gift cards are non-returnable</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">How to Return</h2>
              <ol className="text-muted-foreground space-y-3 list-decimal list-inside">
                <li>Log into your account and go to Order History</li>
                <li>Select the order and click "Request Return"</li>
                <li>Choose the items and reason for return</li>
                <li>Schedule a pickup or drop at nearest location</li>
                <li>Pack items securely with original packaging</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Refund Process</h2>
              <p className="text-muted-foreground">Once we receive and inspect your return, we'll process your refund within 5-7 business days. Refunds are credited to the original payment method. For COD orders, refunds are processed via bank transfer.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Exchange Policy</h2>
              <p className="text-muted-foreground">Want a different product? Request an exchange within 30 days. Subject to product availability. If the new product costs more, you'll pay the difference. If it costs less, we'll refund the balance.</p>
            </section>
          </motion.div>
        </div>
      </div>

    </main>
  );
};

export default Returns;
