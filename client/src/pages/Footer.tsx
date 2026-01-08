import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const companyLinks = [
    { name: "About Us", path: "/Footer/About" },
    { name: "Our Values", path: "/Footer/Values" },
    { name: "Privacy Notice", path: "/Footer/Privacy" },
    { name: "Terms & Conditions", path: "/Footer/Terms" },
    { name: "Disclaimer", path: "/Footer/Disclaimer" },
    { name: "Corporate Information", path: "/Footer/Corporate" },
    { name: "Media Outreach", path: "/Footer/Media" },
    { name: "Distributor Queries", path: "/Footer/Distributors" },
    { name: "Grievance Redressal", path: "/Footer/Grievance" },
  ];

  const quickLinks = [
    { name: "Knowledge", path: "/Footer/Knowledge" },
    { name: "FAQs", path: "/Footer/FAQs" },
    { name: "Shipping Policy", path: "/Footer/Shipping" },
    { name: "Return & Refund Policy", path: "/Footer/Returns" },
    { name: "Payment Policy", path: "/Footer/Payment" },
    { name: "Track Order", path: "/Footer/TrackOrder" },
    { name: "Help Center", path: "/Footer/Help" },
    { name: "Download App", path: "/Footer/Download" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Youtube, href: "#", label: "Youtube" },
  ];

  return (
    <footer className="relative bg-espresso text-primary-foreground overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gradient-gold">Lumière</h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                Redefining personal care with transparency, efficacy, and global accessibility. Your beauty, our commitment.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold/30 transition-all duration-300 group"
                  >
                    <social.icon className="w-5 h-5 text-cream/70 group-hover:text-gold transition-colors" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Company Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-cream">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-cream/60 hover:text-gold text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-cream">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-cream/60 hover:text-gold text-sm transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-cream">Get In Touch</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-cream/60 text-sm">
                    123 Beauty Boulevard,<br />
                    Mumbai, Maharashtra 400001
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold flex-shrink-0" />
                  <a href="tel:+911234567890" className="text-cream/60 text-sm hover:text-gold transition-colors">
                    +91 123 456 7890
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold flex-shrink-0" />
                  <a href="mailto:hello@lumiere.com" className="text-cream/60 text-sm hover:text-gold transition-colors">
                    hello@lumiere.com
                  </a>
                </li>
              </ul>

              {/* Newsletter */}
              <div className="pt-4">
                <p className="text-cream/80 text-sm mb-3">Subscribe to our newsletter</p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-sm text-cream placeholder:text-cream/40 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                  <button className="bg-gold hover:bg-gold-light text-espresso px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Join
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-cream/50 text-sm">
                © 2026 Lumière. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/privacy" className="text-cream/50 text-sm hover:text-gold transition-colors">
                  Privacy
                </Link>
                <Link to="/terms" className="text-cream/50 text-sm hover:text-gold transition-colors">
                  Terms
                </Link>
                <Link to="/disclaimer" className="text-cream/50 text-sm hover:text-gold transition-colors">
                  Disclaimer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
