'use client';

import { useState, useEffect } from 'react';
import { Mail, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ContactModal } from './ContactModal';

export function ContactButton() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const shouldHide = pathname === '/' || pathname?.startsWith('/admin');

  useEffect(() => {
    if (shouldHide) {
      setShowScrollTop(false);
      return;
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldHide]);

  useEffect(() => {
    if (shouldHide) {
      setShowModal(false);
    }
  }, [shouldHide]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (shouldHide) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full bg-neutral-700 text-white flex items-center justify-center hover:bg-neutral-600 transition-colors shadow-lg"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} />
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent-hover transition-colors"
          aria-label="Contact"
        >
          <Mail size={20} />
        </motion.button>
      </div>

      {showModal && <ContactModal onClose={() => setShowModal(false)} />}
    </>
  );
}
