'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { RippleBackground } from '@/components/landing/RippleBackground';

export default function LandingPage() {
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    setIsExiting(true);
    setTimeout(() => {
      router.push('/home');
    }, 1000);
  };

  return (
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          className="h-screen w-screen overflow-hidden cursor-pointer relative"
          onClick={handleClick}
          style={{ zIndex: 1 }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <RippleBackground />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="text-center"
            >
              <motion.h1
                className="font-open-sans text-7xl md:text-9xl font-normal text-neutral-800 tracking-[3px]"
                animate={{
                  textShadow: [
                    '0 0 20px rgba(255,255,255,0.8)',
                    '0 0 40px rgba(255,255,255,1)',
                    '0 0 20px rgba(255,255,255,0.8)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Moha Styling
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1, duration: 1 }}
                exit={{ opacity: 0 }}
                className="w-full mt-5 text-left text-sm "
              >
                <span className="text-neutral-600 tracking-[0.15em] ml-1">Food</span>
                <span className="text-neutral-600 tracking-[0.15em] ml-2">product</span>
                <span className="text-neutral-600 tracking-[0.15em] ml-2">cosmetics</span>
                <span className="text-neutral-600 tracking-[0.15em] ml-2">life</span>
                <span className="text-neutral-600 tracking-[0.15em] ml-2">style</span>
                <span className="text-neutral-600 tracking-[0.15em] ml-2">movie</span>
              </motion.p>
            </motion.div>
          </div>

          {/* Click hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 2, duration: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-xs tracking-widest text-neutral-500 pointer-events-none"
          >
            CLICK TO ENTER
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
