import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Building2, Users, Award, MapPin } from "lucide-react";

const Corporate = () => {
  const stats = [
    { value: "2018", label: "Founded" },
    { value: "500+", label: "Employees" },
    { value: "50+", label: "Countries" },
    { value: "2M+", label: "Happy Customers" },
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
            Corporate Information
          </motion.h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-8 text-center border border-border">
                <p className="text-3xl md:text-4xl font-bold text-gold mb-2">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-8 border border-border space-y-4"
            >
              <Building2 className="w-10 h-10 text-gold" />
              <h2 className="text-2xl font-bold text-foreground">Registered Office</h2>
              <div className="text-muted-foreground space-y-2">
                <p>Lumière Beauty Pvt. Ltd.</p>
                <p>123 Beauty Boulevard, Bandra West</p>
                <p>Mumbai, Maharashtra 400050</p>
                <p>India</p>
                <p className="pt-2">CIN: U52100MH2018PTC123456</p>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border space-y-4"
            >
              <Users className="w-10 h-10 text-gold" />
              <h2 className="text-2xl font-bold text-foreground">Board of Directors</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• Priya Sharma - Founder & CEO</li>
                <li>• Rahul Mehta - Co-Founder & COO</li>
                <li>• Dr. Anjali Desai - Chief Scientific Officer</li>
                <li>• Vikram Singh - Chief Financial Officer</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-8 border border-border space-y-4"
            >
              <Award className="w-10 h-10 text-gold" />
              <h2 className="text-2xl font-bold text-foreground">Certifications</h2>
              <ul className="text-muted-foreground space-y-2">
                <li>• ISO 9001:2015 Certified</li>
                <li>• GMP Certified Manufacturing</li>
                <li>• Cruelty-Free Certified</li>
                <li>• PETA Approved</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-8 border border-border space-y-4"
            >
              <MapPin className="w-10 h-10 text-gold" />
              <h2 className="text-2xl font-bold text-foreground">Manufacturing Facility</h2>
              <div className="text-muted-foreground space-y-2">
                <p>Lumière Production Unit</p>
                <p>Plot No. 45, MIDC Industrial Area</p>
                <p>Pune, Maharashtra 411018</p>
                <p>India</p>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

    </main>
  );
};

export default Corporate;
