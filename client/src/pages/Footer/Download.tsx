import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Smartphone, Star, Bell, Gift, Zap } from "lucide-react";

const Download = () => {
  const features = [
    { icon: Zap, title: "Faster Checkout", desc: "One-tap ordering with saved preferences" },
    { icon: Bell, title: "Exclusive Alerts", desc: "Be first to know about sales & launches" },
    { icon: Gift, title: "App-Only Rewards", desc: "Earn extra points on every purchase" },
    { icon: Star, title: "Personalized Tips", desc: "AI-powered skincare recommendations" },
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
            Download Our App
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4"
          >
            Your beauty journey, now in your pocket.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-gold to-gold-light rounded-3xl mb-6 shadow-lg">
              <Smartphone className="w-12 h-12 text-espresso" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">Get the Lumière App</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Shop smarter, earn rewards, and get personalized beauty recommendations – all from our award-winning app.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-foreground text-background px-6 py-3 rounded-xl font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </button>
              <button className="bg-foreground text-background px-6 py-3 rounded-xl font-medium flex items-center gap-3 hover:opacity-90 transition-opacity">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.302 2.302-8.634-8.634z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs opacity-80">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* QR Code */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-br from-espresso to-latte rounded-2xl p-8 text-center text-cream"
          >
            <h3 className="text-xl font-semibold mb-4">Scan to Download</h3>
            <div className="w-32 h-32 bg-white rounded-xl mx-auto flex items-center justify-center">
              <span className="text-espresso text-xs">QR Code</span>
            </div>
            <p className="text-cream/70 mt-4 text-sm">Scan with your phone camera to download instantly</p>
          </motion.div>
        </div>
      </div>


    </main>
  );
};

export default Download;
