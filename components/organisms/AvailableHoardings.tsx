'use client';
import { motion } from 'framer-motion';
import { Star, Clock, ShoppingBag } from 'lucide-react';
import { sweets } from './hoardings-data';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
};

export const AvailableSweets = () => {
  return (
    <section className="py-24 bg-stone-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Top Picks</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Bestselling Sweets</h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">Handpicked favourites loved by thousands of sweet lovers</p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {sweets.slice(0, 6).map((s) => (
            <motion.div
              key={s.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500 group"
            >
              <div className="aspect-video w-full relative overflow-hidden">
                <img src={s.image} alt={s.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <span className="absolute top-3 right-3 bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-full">{s.tag}</span>
                {s.originalPrice && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {Math.round((1 - s.price / s.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-3 h-3 rounded-sm bg-green-500 border border-green-600" title="Veg" />
                  <span className="text-xs text-foreground/50">{s.weight}</span>
                </div>
                <h3 className="text-lg font-bold">{s.name}</h3>
                <p className="text-foreground/50 text-sm mt-1">by {s.shop}</p>
                <div className="flex items-center gap-3 mt-2 text-sm">
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-green-600" /> {s.rating}
                  </span>
                  <span className="text-foreground/40">({s.reviews})</span>
                  <span className="flex items-center gap-1 text-foreground/50">
                    <Clock className="w-3.5 h-3.5" /> {s.deliveryTime}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-stone-100">
                  <div className="flex items-baseline gap-2">
                    <p className="text-primary font-bold text-xl">&#8377;{s.price}</p>
                    {s.originalPrice && (
                      <p className="text-foreground/40 text-sm line-through">&#8377;{s.originalPrice}</p>
                    )}
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4" /> ADD
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
