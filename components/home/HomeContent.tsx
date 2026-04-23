"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { IntroSection } from "@/components/home/IntroSection";
import { ContactButton } from "@/components/common/ContactButton";

export function HomeContent() {
  return (
    <motion.div
      className="h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <Header />
      <div className="flex-1 overflow-y-auto">
        <main>
          <HeroCarousel />
          <IntroSection />
        </main>
        <Footer />
        <ContactButton />
      </div>
    </motion.div>
  );
}
