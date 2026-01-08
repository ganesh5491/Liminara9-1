import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Package, Truck, Home, CheckCircle } from "lucide-react";

const TrackOrder = () => {
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
            Track Your Order
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4"
          >
            Enter your order details to see real-time status.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border mb-12"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">Enter Order Details</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Order Number</label>
                <input
                  type="text"
                  placeholder="e.g., LUM-2026-123456"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email / Phone</label>
                <input
                  type="text"
                  placeholder="Enter registered email or phone"
                  className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <button type="submit" className="w-full bg-gold text-espresso py-3 rounded-lg font-medium hover:bg-gold-light transition-colors inline-flex items-center justify-center gap-2">
                <Search className="w-4 h-4" />
                Track Order
              </button>
            </form>
          </motion.div>

          {/* Sample Tracking Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <h3 className="text-lg font-semibold text-foreground mb-6">Order Status Preview</h3>
            <div className="relative">
              {[
                { icon: CheckCircle, title: "Order Placed", time: "Jan 5, 2026 - 10:30 AM", active: true },
                { icon: Package, title: "Order Confirmed", time: "Jan 5, 2026 - 11:00 AM", active: true },
                { icon: Truck, title: "Shipped", time: "Jan 6, 2026 - 2:00 PM", active: true },
                { icon: Home, title: "Delivered", time: "Expected: Jan 9, 2026", active: false },
              ].map((step, index, arr) => (
                <div key={step.title} className="flex gap-4 pb-8 last:pb-0">
                  <div className="relative flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.active ? 'bg-gold text-espresso' : 'bg-muted text-muted-foreground'}`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    {index < arr.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-2 ${step.active ? 'bg-gold' : 'bg-border'}`} />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className={`font-medium ${step.active ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </main>
  );
};

export default TrackOrder;
