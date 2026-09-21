'use client';
import { motion } from 'framer-motion';
import { Search, ShoppingBag, CreditCard, Truck } from 'lucide-react';

const steps = [
  { icon: Search, title: "Browse & Discover", desc: "Explore hundreds of sweets, cakes and treats from the best shops in your city." },
  { icon: ShoppingBag, title: "Add to Cart", desc: "Pick your favourites, choose customizations and add them to your cart." },
  { icon: CreditCard, title: "Secure Payment", desc: "Pay easily with UPI, cards, or wallets. 100% secure checkout." },
  { icon: Truck, title: "Fast Delivery", desc: "Fresh sweets delivered hot to your doorstep in 20-40 minutes." },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const HowItWorks = () => (
  <section className="py-24 bg-stone-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Simple & Quick</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">How It Works</h2>
        <p className="text-foreground/60 mt-4 max-w-xl mx-auto">Get your favourite sweets delivered in four easy steps</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto"
      >
        {steps.map((step, i) => (
          <motion.div key={i} variants={stepVariants} className="text-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
              <step.icon className="w-7 h-7 md:w-9 md:h-9 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-foreground/60 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
