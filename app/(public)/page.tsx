'use client';
import { HeroBanner } from "@/components/organisms/HeroBanner";
import { WhySweeTe } from "@/components/organisms/Why100MM";
import { FeaturedLocations } from "@/components/organisms/FeaturedLocations";
import { AvailableSweets } from "@/components/organisms/AvailableHoardings";
import { HowItWorks } from "@/components/organisms/HowItWorks";
import { PricingSection } from "@/components/organisms/PricingSection";
import { Testimonials } from "@/components/organisms/Testimonials";
import { FAQ } from "@/components/organisms/FAQ";
import { CategoryGrid } from "@/components/organisms/CategoryGrid";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroBanner />
      <CategoryGrid />
      <FeaturedLocations />
      <AvailableSweets />
      <HowItWorks />
      <WhySweeTe />
      <PricingSection />
      <Testimonials />
      <FAQ />
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 text-center bg-primary text-white"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold mb-6"
        >
          Sweet cravings never stop!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-lg opacity-90 max-w-xl mx-auto"
        >
          Download our app and get &#8377;100 off on your first order. Fresh sweets delivered in minutes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <button className="px-8 py-3 bg-white text-primary font-bold rounded-full hover:bg-stone-100 transition-all shadow-lg">
            Order Now
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all">
            Partner With Us
          </button>
        </motion.div>
      </motion.section>
    </main>
  );
}
