import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = () => {
  const faqs = [
    { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days within India. Express shipping (2-3 days) is available at checkout. International orders typically take 10-15 business days." },
    { q: "Are your products cruelty-free?", a: "Yes! All Lumière products are 100% cruelty-free. We never test on animals and are certified by PETA and Leaping Bunny." },
    { q: "What is your return policy?", a: "We offer a 30-day hassle-free return policy. If you're not satisfied with your purchase, you can return unopened products for a full refund." },
    { q: "Are your products suitable for sensitive skin?", a: "Most of our products are formulated for all skin types, including sensitive skin. However, we always recommend doing a patch test first. Check individual product pages for specific guidance." },
    { q: "Do you offer international shipping?", a: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. Enter your address at checkout for exact rates." },
    { q: "How can I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also track your order on our Track Order page." },
    { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, net banking, and popular wallets like PayTM and PhonePe. Cash on delivery is available for eligible orders." },
    { q: "How do I know which products are right for me?", a: "Take our online skin quiz for personalized recommendations, or contact our skincare experts via chat or email for tailored advice." },
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
            FAQs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-cream/70 mt-4"
          >
            Find answers to commonly asked questions.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-gold py-5 hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/footer/Help" className="inline-block bg-gold text-espresso px-6 py-3 rounded-lg font-medium hover:bg-gold-light transition-colors">
              Contact Support
            </Link>
          </motion.div>
        </div>
      </div>


    </main>
  );
};

export default FAQs;
