"use client";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NaverMap } from "@/components/studio/NaverMap";
import { motion } from "framer-motion";
import Image from "next/image";

import Studio1 from "../../public/images/studio/studio1.jpg";
import Studio2 from "../../public/images/studio/studio2.jpg";
import Studio3 from "../../public/images/studio/studio3.jpg";
import Studio4 from "../../public/images/studio/studio4.jpg";
import Studio5 from "../../public/images/studio/studio5.jpg";
import Studio6 from "../../public/images/studio/studio6.jpg";
import Studio7 from "../../public/images/studio/studio7.jpg";

const images = [
  { src: Studio1, alt: "Studio 1", className: "md:col-span-2 aspect-square" },
  {
    src: Studio2,
    alt: "Studio 2",
    className: "aspect-[3/2]",
    caption: ["모하 스튜디오", "공간 "],
  },
  { src: Studio3, alt: "Studio 3", className: "md:row-span-2 aspect-[2/3] md:aspect-auto md:h-full" },
  { src: Studio4, alt: "Studio 4", className: "aspect-[4/3]" },
  { src: Studio5, alt: "Studio 5", className: "aspect-[4/3]" },
  { src: Studio6, alt: "Studio 6", className: "aspect-[4/3]" },
  { src: Studio7, alt: "Studio 7", className: "aspect-[4/3]" },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Title */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-4">
            Studio
          </h1>
          <p className="font-sans text-neutral-500">
            감각적인 공간에서 완성되는 스타일링을 만나보세요
          </p>
        </section>

        {/* Image Grid */}
        <div className="container mx-auto px-6 pb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className={
                  image.caption
                    ? "flex flex-col gap-3"
                    : `relative overflow-hidden rounded-lg ${image.className}`
                }
              >
                <div
                  className={`relative overflow-hidden rounded-lg ${image.className}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                {image.caption && (
                  <div className="flex-1 flex items-center justify-end text-right">
                    <div>
                      {image.caption.map((line, i) => (
                        <p
                          key={i}
                          className="font-sans font-semibold text-4xl text-neutral-800 max-md:text-2xl"
                        >
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="container mx-auto px-6 pb-24">
          <NaverMap />
        </div>
      </main>
      <Footer />
    </div>
  );
}
