'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  item: PortfolioItem;
  onClose: () => void;
}

export function PortfolioModal({ item, onClose }: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const allImages = item.images.length > 0
    ? item.images.map((img) => img.imageUrl)
    : item.mainImage ? [item.mainImage] : [];

  const currentVideoUrl = item.images.length > 0
    ? item.images[currentImageIndex]?.videoUrl
    : undefined;

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-5xl h-[50vh] bg-white rounded-lg overflow-hidden flex flex-col"
        >
          {/* Info bar */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-neutral-200">
            <h2 className="font-sans text-lg font-medium text-neutral-900">{item.title}</h2>
            <span className="text-neutral-300">·</span>
            <span className="inline-block px-2.5 py-0.5 bg-accent/20 text-accent rounded-full text-xs">
              {item.category === 'food' && '푸드'}
              {item.category === 'product' && '제품'}
              {item.category === 'cosmetics' && '코스메틱'}
              {item.category === 'lifestyle' && '라이프스타일'}
              {item.category === 'movie' && '영상'}
              {item.category === 'all-in-one' && 'All in One'}
            </span>
            <span className="text-neutral-300">·</span>
            <p className="text-neutral-500 text-sm">{item.date}</p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-600 transition-colors z-10"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Image gallery */}
          <div className="relative flex-1 min-h-[500px] bg-neutral-100">
            <Image
              src={allImages[currentImageIndex]}
              alt={item.title}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />

            {/* Image navigation */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-neutral-700 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 text-neutral-700 flex items-center justify-center hover:bg-white transition-colors shadow-sm"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex ? 'bg-neutral-800 w-6' : 'bg-neutral-400'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Video link for movie category */}
            {item.category === 'movie' && currentVideoUrl && (
              <a
                href={currentVideoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-full text-sm hover:bg-accent-hover transition-colors shadow-lg z-10"
              >
                <Play size={16} />
                영상 보기
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
