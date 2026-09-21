'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, MapPin } from 'lucide-react';

const CountUp = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

export const HeroBanner = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[85vh] bg-gradient-to-br from-[#3B1F0B] via-[#5C3317] to-[#8B5E3C] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486427944544-d2c246c4df14?q=80&w=2070')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3B1F0B]/80 via-transparent to-transparent" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="max-w-3xl"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 tracking-[0.2em] uppercase text-sm font-medium"
          >
            Delivering Happiness, One Sweet at a Time
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold text-white mt-4 mb-6 leading-tight logo-font"
          >
            Craving <span className="text-accent">Something Sweet?</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-white/80 mb-10 max-w-2xl"
          >
            Order the finest sweets, pastries, chocolates and desserts from the best bakeries in your city. Delivered fresh to your doorstep.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-3xl"
          >
            <div className="md:col-span-2 flex items-center gap-2 bg-white/20 rounded-lg px-3">
              <Search className="w-5 h-5 text-white/60 shrink-0" />
              <input
                type="text"
                placeholder="Search for cakes, chocolates, mithai..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className="bg-transparent text-white placeholder:text-white/60 p-3 w-full focus:outline-none"
              />
            </div>
            <button onClick={handleSearch} className="bg-accent hover:bg-[#D4956A] text-[#3B1F0B] font-bold p-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]">
              Search Sweets
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-center sm:justify-start gap-6 sm:gap-12 mt-12"
          >
            <div className="text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-bold text-white"><CountUp end={500} suffix="+" /></p>
              <p className="text-white/50 text-xs mt-1 tracking-wide uppercase">Sweet Shops</p>
            </div>
            <div className="hidden sm:block w-px bg-white/20" />
            <div className="text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-bold text-white"><CountUp end={2000} suffix="+" /></p>
              <p className="text-white/50 text-xs mt-1 tracking-wide uppercase">Sweet Items</p>
            </div>
            <div className="hidden sm:block w-px bg-white/20" />
            <div className="text-center sm:text-left">
              <p className="text-3xl sm:text-4xl font-bold text-white"><CountUp end={50} suffix="+" /></p>
              <p className="text-white/50 text-xs mt-1 tracking-wide uppercase">Cities</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
