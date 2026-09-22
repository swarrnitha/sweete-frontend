'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { X, Star, Clock } from 'lucide-react';

const cities = [
  { name: "Mumbai", count: "120+ sweet shops", image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=400&h=500&fit=crop" },
  { name: "Delhi", count: "150+ sweet shops", image: "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=400&h=500&fit=crop" },
  { name: "Bangalore", count: "95+ sweet shops", image: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=400&h=500&fit=crop" },
  { name: "Chennai", count: "80+ sweet shops", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&h=500&fit=crop" },
  { name: "Kolkata", count: "110+ sweet shops", image: "https://images.pexels.com/photos/31550557/pexels-photo-31550557.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop" },
  { name: "Hyderabad", count: "70+ sweet shops", image: "https://images.pexels.com/photos/29152632/pexels-photo-29152632.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop" },
];

export const FeaturedLocations = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>("Mumbai");

  const handlePillClick = (name: string) => {
    setSelected(selected === name ? "Mumbai" : name);
  };

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
          <span className="text-primary font-semibold tracking-[0.2em] uppercase text-sm">Explore by City</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">Sweet Shops Near You</h2>
          <p className="text-foreground/60 mt-4 max-w-xl mx-auto">Click a city to discover the best sweet shops</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => handlePillClick(city.name)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                selected === city.name
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/25'
                  : 'bg-stone-50 text-foreground/70 border-stone-200 hover:border-primary/30 hover:text-primary'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {(() => {
            const city = cities.find(c => c.name === selected)!;
            return (
              <motion.div
                key={city.name}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" as const }}
                className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#3B1F0B] flex flex-col md:flex-row relative"
              >
                <button onClick={() => setSelected("Mumbai")} className="absolute top-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white p-1.5 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="md:w-1/2 h-72 md:h-auto">
                  <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                </div>
                <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
                  <p className="text-white/50 text-xs tracking-[0.2em] uppercase font-medium">Featured City</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mt-3">{city.name}</h3>
                  <p className="text-white/60 mt-2 text-lg">{city.count}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <span className="flex items-center gap-1 text-accent text-sm"><Star className="w-4 h-4 fill-accent" /> 4.8 avg rating</span>
                    <span className="flex items-center gap-1 text-white/50 text-sm"><Clock className="w-4 h-4" /> 20-30 min</span>
                  </div>
                  <button onClick={() => router.push(`/explore?city=${city.name}`)} className="mt-6 bg-accent hover:bg-[#D4956A] text-[#3B1F0B] px-6 py-3 rounded-xl font-semibold text-sm self-start transition-all duration-200 hover:shadow-lg">
                    Explore Sweets in {city.name} &rarr;
                  </button>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};
