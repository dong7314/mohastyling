"use client";

import { useState, useEffect, useCallback } from "react";

const heroImages = [
  "/images/home/home_1.jpg",
  "/images/home/home_2.jpg",
  "/images/home/home_3.jpg",
  "/images/home/home_4.jpg",
];

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden mt-16 bg-neutral-900">
      {/* Main images container - all preloaded, simple opacity/transform transition */}
      <div className="relative h-full w-full">
        {heroImages.map((src, index) => {
          const isCurrent = index === currentIndex;
          const isPrev =
            index ===
            (currentIndex === 0 ? heroImages.length - 1 : currentIndex - 1);
          const isNext = index === (currentIndex + 1) % heroImages.length;

          let transform = "translateX(0)";
          let opacity = "0";

          if (isCurrent) {
            opacity = "1";
          } else if (isPrev) {
            transform = "translateX(-100%)";
            opacity = "0";
          } else if (isNext) {
            transform = "translateX(100%)";
            opacity = "0";
          } else {
            opacity = "0";
          }

          return (
            <div
              key={`img-${index}`}
              className="absolute inset-0 transition-all duration-500 ease-out"
              style={{
                transform,
                opacity,
                visibility:
                  isCurrent || isPrev || isNext ? "visible" : "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Hero slide ${index + 1}`}
                className={`h-full w-full object-cover ${
                  index === 0 ? "object-[center_75%]" : ""
                }`}
                loading="eager"
              />
            </div>
          );
        })}
      </div>

      {/* Side fade gradients */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/10 via-transparent to-black/10" />

      {/* Slide indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-12 bg-accent"
                : "w-8 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </section>
  );
}
