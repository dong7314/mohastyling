'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder images - replace with actual images
const heroImages = [
  'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1920&q=80',
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=1920&q=80',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${heroImages[currentIndex]})` }}
          >
            {/* White overlay filter */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Center text */}
      <div className="absolute inset-0 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-4xl text-center"
        >
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-relaxed text-neutral-900">
            스튜디오 모하는 고객만을 위한,<br />
            그리고 제품의 탄생을 위한<br />
            사진으로 진심으로 작업을 진행합니다.
          </h1>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-12 h-1 rounded-full transition-all ${
              index === currentIndex ? 'bg-accent' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
