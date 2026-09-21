'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const plans = [
  { name: "Sweet Starter", price: "99", desc: "Per order delivery fee", features: ["Free delivery on orders above 499", "Access to all sweet shops", "Standard delivery (30-40 min)", "Basic customer support"] },
  { name: "Sweet Premium", price: "299", desc: "Monthly subscription", features: ["Free delivery on all orders", "Priority delivery (20-25 min)", "Exclusive discounts up to 20%", "24/7 customer support", "Early access to new items"], popular: true },
  { name: "Sweet Elite", price: "599", desc: "Quarterly subscription", features: ["Everything in Premium", "Free delivery + surprise gifts", "Exclusive festival hampers", "Dedicated account manager", "VIP early access to launches", "Birthday special discounts"], popular: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const planVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const PricingSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Plans</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Choose Your Sweet Plan</h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">Unlock exclusive benefits and save more on every order</p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              variants={planVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className={`bg-white rounded-2xl p-6 md:p-8 shadow-md border border-stone-100 relative ${plan.popular ? 'ring-2 ring-primary md:scale-105 shadow-xl' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full">Most Popular</div>
              )}
              <h3 className="text-2xl font-bold mt-2">{plan.name}</h3>
              <p className="text-3xl md:text-4xl font-extrabold mt-4">&#8377;{plan.price}<span className="text-base font-normal text-foreground/60">/{plan.desc.includes('Monthly') ? 'mo' : plan.desc.includes('Quarterly') ? 'qtr' : 'order'}</span></p>
              <p className="text-sm text-foreground/50 mt-1">{plan.desc}</p>
              <ul className="space-y-3 mt-6 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></span>
                    <span className="text-foreground/70 text-sm">{f}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all ${plan.popular ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20' : 'bg-stone-100 text-foreground hover:bg-stone-200'}`}>
                {plan.popular ? 'Get Started' : 'Choose Plan'}
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
