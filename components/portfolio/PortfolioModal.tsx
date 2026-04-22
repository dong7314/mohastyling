'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  item: PortfolioItem;
  onClose: () => void;
}

export function PortfolioModal({ item, onClose }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = [item.mainImage, ...item.images];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-6xl h-[90vh] bg-neutral-900 rounded-lg overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Image gallery */}
          <div className="w-full md:w-2/3 h-1/2 md:h-full relative bg-neutral-800">
            <Image
              src={allImages[currentImageIndex]}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 66vw"
            />

            {/* Image navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  →
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Info panel */}
          <div className="w-full md:w-1/3 h-1/2 md:h-full p-6 md:p-8 overflow-y-auto bg-neutral-900 text-white">
            <h2 className="font-serif text-3xl md:text-4xl mb-2">{item.title}</h2>
            <p className="text-neutral-400 text-sm mb-6">{item.date}</p>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>

            {/* Category badge */}
            <div className="mt-6">
              <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">
                {item.category === 'food' && '푸드'}
                {item.category === 'beauty' && '뷰티'}
                {item.category === 'product' && '제품'}
                {item.category === 'video' && '영상'}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
