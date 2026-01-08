import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Phone, Mail, Clock, FileQuestion, Package, CreditCard } from "lucide-react";

const Help = () => {
  const categories = [
    { icon: Package, title: "Orders & Shipping", desc: "Track, modify, or cancel orders", link: "/footer/TrackOrder" },
    { icon: CreditCard, title: "Payments & Refunds", desc: "Payment issues and refund status", link: "/footer/Payment" },
    { icon: FileQuestion, title: "FAQs", desc: "Quick answers to common questions", link: "/footer/FAQs" },
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
            Help Center
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4"
          >
            We're here to help you with any questions or concerns.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: MessageCircle, title: "Live Chat", desc: "Chat with our team", action: "Start Chat", color: "bg-green-500" },
              { icon: Phone, title: "Call Us", desc: "+91 123 456 7890", action: "Call Now", color: "bg-blue-500" },
              { icon: Mail, title: "Email", desc: "support@lumiere.com", action: "Send Email", color: "bg-purple-500" },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-2xl p-6 border border-border text-center hover:shadow-lg transition-shadow">
                <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <button className="text-gold hover:underline text-sm font-medium">{item.action}</button>
              </div>
            ))}
          </motion.div>

          {/* Support Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent/30 rounded-2xl p-6 mb-12 flex items-center gap-4 border border-accent"
          >
            <Clock className="w-10 h-10 text-gold flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground">Support Hours</h3>
              <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 9:00 PM IST | Sunday: 10:00 AM - 6:00 PM IST</p>
            </div>
          </motion.div>

          {/* Help Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
            {categories.map((cat) => (
              <Link
                key={cat.title}
                to={cat.link}
                className="flex items-center gap-4 bg-card rounded-xl p-5 border border-border hover:shadow-md hover:border-gold/30 transition-all group"
              >
                <cat.icon className="w-8 h-8 text-gold" />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-gold transition-colors">{cat.title}</h3>
                  <p className="text-sm text-muted-foreground">{cat.desc}</p>
                </div>
                <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

    </main>
  );
};

export default Help;
