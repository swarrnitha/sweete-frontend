'use client';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  { name: "Priya Sharma", role: "Chocolates lover, Mumbai", text: "sweeTe has completely changed how I order sweets. The chocolate truffle cake from Theobroma was delivered fresh and absolutely divine. Best delivery experience!" },
  { name: "Arjun Patel", role: "Regular customer, Delhi", text: "The variety of Indian mithai available on sweeTe is incredible. I ordered Kaju Katli for Diwali and it arrived perfectly packed. Highly recommended for festival gifting!" },
  { name: "Meera Reddy", role: "Food blogger, Bangalore", text: "As a food blogger, I try many platforms. sweeTe stands out with its quality partners, fast delivery, and amazing customer support. The tiramisu was restaurant quality!" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const Testimonials = () => (
  <section className="py-24 bg-stone-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Testimonials</span>
        <h2 className="text-4xl md:text-5xl font-bold mt-4">Why people love sweeTe</h2>
        <p className="text-foreground/60 mt-4 max-w-xl mx-auto">Hear from our happy sweet lovers</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <motion.div key={i} variants={cardVariants} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="flex mb-4">
              {[...Array(5)].map((_, j) => <Star key={j} className="w-5 h-5 fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-foreground/70 mb-6 italic leading-relaxed">&quot;{t.text}&quot;</p>
            <div className="pt-4 border-t border-stone-100">
              <p className="font-bold">{t.name}</p>
              <p className="text-sm text-foreground/50">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);
