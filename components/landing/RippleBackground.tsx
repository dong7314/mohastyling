'use client';

import { useEffect, useRef } from 'react';

export function RippleBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initRipples = async () => {
      if (typeof window === 'undefined') return;

      try {
        // Dynamically import jQuery and jquery.ripples
        const jQueryDefault = await import('jquery');
        const $ = jQueryDefault.default;
        // @ts-expect-error - jquery.ripples has no types
        await import('jquery.ripples');

        if (!containerRef.current) return;

        // Small delay to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 300));

        // Create a canvas-based background for ripples
        const canvas = document.createElement('canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Create gradient with water/cloud colors
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#e8f4f8');
          gradient.addColorStop(0.3, '#f0f8ff');
          gradient.addColorStop(0.6, '#ffffff');
          gradient.addColorStop(1, '#d4e9ed');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Convert to data URL
        const dataUrl = canvas.toDataURL();

        // Set the background image
        containerRef.current.style.backgroundImage = `url(${dataUrl})`;
        containerRef.current.style.backgroundSize = 'cover';
        containerRef.current.style.backgroundPosition = 'center';

        // Initialize ripples
        $(containerRef.current).ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
          interactive: true,
        });

        // Mouse move effect - subtle ripple
        const handleMouseMove = (e: MouseEvent) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          try {
            $(containerRef.current).ripples('dropAt', x / rect.width, y / rect.height, 2);
          } catch {
            // Ignore if ripples not ready
          }
        };

        // Add mouse move listener to window for smoother effect
        window.addEventListener('mousemove', handleMouseMove);

        // Cleanup
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          if (containerRef.current) {
            try {
              $(containerRef.current).ripples('destroy');
            } catch {
              // Ripples may already be destroyed
            }
          }
        };
      } catch (error) {
        console.warn('Ripples effect not available:', error);
      }
    };

    initRipples();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-10"
      style={{
        background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f8ff 30%, #ffffff 60%, #d4e9ed 100%)',
      }}
    />
  );
}
