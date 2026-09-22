'use client';
import { motion } from 'framer-motion';

const features = [
  { title: "Fresh & Authentic", desc: "We partner with the finest bakeries and sweet shops to bring you authentic, freshly made sweets and desserts every single time." },
  { title: "Lightning Fast Delivery", desc: "Our delivery network ensures your sweets arrive fresh and on time. Most orders delivered within 20-30 minutes." },
  { title: "Quality Guaranteed", desc: "Every sweet is handpicked and quality-checked. If you are not satisfied, we offer a full refund. Your happiness is our promise." },
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const WhySweeTe = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Why Choose Us</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 leading-tight">India&apos;s sweetest delivery experience</h2>
          <p className="text-foreground/70 mb-10 leading-relaxed">We connect you with the best sweet shops and bakeries in your city. From traditional Indian mithai to artisan pastries and gourmet chocolates, we deliver happiness right to your doorstep.</p>
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={itemVariants} className="flex gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{f.title}</h3>
                  <p className="text-foreground/60 mt-1">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <img src="https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&h=600&fit=crop" alt="Sweets collection" className="w-full h-64 md:h-96 object-cover rounded-3xl" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-6 -left-6 bg-primary text-white p-8 rounded-2xl shadow-xl"
          >
            <p className="text-2xl md:text-3xl font-bold leading-tight">Fresh Sweets<br />Delivered Daily</p>
            <p className="text-sm opacity-80 mt-2">From 500+ partner shops</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);
