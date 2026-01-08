import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Clock, CheckCircle, Send } from "lucide-react";

const Grievance = () => {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-espresso text-cr eam py-20">
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
            Grievance Redressal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4 max-w-2xl text-lg"
          >
            We're committed to resolving your concerns promptly and fairly.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            {[
              { icon: FileText, step: "1", title: "Submit Complaint", desc: "Fill out the form with details" },
              { icon: Clock, step: "2", title: "Under Review", desc: "We review within 48 hours" },
              { icon: CheckCircle, step: "3", title: "Resolution", desc: "Get resolution within 7 days" },
            ].map((item) => (
              <div key={item.step} className="bg-card rounded-2xl p-6 border border-border text-center relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-gold rounded-full flex items-center justify-center text-espresso font-bold text-sm">
                  {item.step}
                </div>
                <item.icon className="w-10 h-10 text-gold mx-auto mb-4 mt-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </motion.div>

          {/* Grievance Officer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-accent/30 rounded-2xl p-8 mb-12 border border-accent"
          >
            <h3 className="text-xl font-semibold text-foreground mb-4">Grievance Officer</h3>
            <div className="grid md:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p className="font-medium text-foreground">Ms. Anita Kapoor</p>
                <p>Customer Relations Head</p>
              </div>
              <div>
                <p>Email: grievance@lumiere.com</p>
                <p>Phone: +91 123 456 7899</p>
              </div>
            </div>
          </motion.div>

          {/* Complaint Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl p-8 border border-border"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Submit a Grievance</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
                  <input type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Order Number</label>
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
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category *</label>
                <select className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors">
                  <option>Product Quality</option>
                  <option>Delivery Issue</option>
                  <option>Refund Request</option>
                  <option>Service Complaint</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Describe Your Issue *</label>
                <textarea rows={5} className="w-full bg-background border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-gold transition-colors resize-none" placeholder="Please provide detailed information about your complaint..."></textarea>
              </div>
              <button type="submit" className="bg-gold text-espresso px-8 py-3 rounded-lg font-medium hover:bg-gold-light transition-colors inline-flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Grievance
              </button>
            </form>
          </motion.section>
        </div>
      </div>

    </main>
  );
};

export default Grievance;
