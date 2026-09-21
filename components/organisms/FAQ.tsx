'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: "How long does delivery take?", a: "Most orders are delivered within 20-30 minutes. Premium and Elite members enjoy priority delivery in under 25 minutes." },
  { q: "Are the sweets fresh?", a: "Absolutely! We partner only with shops that prepare fresh sweets daily. Each item goes through our quality check before dispatch." },
  { q: "Can I schedule orders for later?", a: "Yes, you can pre-order up to 3 days in advance. Perfect for birthday cakes and festival orders." },
  { q: "What if I am not satisfied with my order?", a: "We offer a full refund or replacement if you are not 100% satisfied. Just reach out to our support team within 1 hour of delivery." },
  { q: "Do you deliver bulk or party orders?", a: "Yes! We handle bulk orders for weddings, birthdays, corporate events and festivals. Contact our support for special pricing." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } }
};

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Frequently Asked Questions</h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">Everything you need to know about ordering sweets</p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-4"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={itemVariants}>
              <div className="bg-stone-50 rounded-xl p-5 cursor-pointer hover:bg-stone-100 transition-colors duration-200" onClick={() => setOpen(open === i ? null : i)}>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{faq.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-foreground/40 transition-all duration-300 ${open === i ? 'rotate-180 text-primary' : ''}`} />
                </div>
                <AnimatePresence>
                  {open === i && (
                    <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="mt-4 text-foreground/60 leading-relaxed">
                      {faq.a}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
