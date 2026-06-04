"use client";

import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import FoodImage from "../../public/images/food/food_landing_1.png";
import ProductImage1 from "../../public/images/product/product_landing_1.png";
import ProductImage2 from "../../public/images/product/product_landing_2.png";
import LifeStyleImage from "../../public/images/lifestyle/llifestyle_landing_1.png";
import CosmeticsImage1 from "../../public/images/cosmetics/cosmetics_landing_1.png";
import CosmeticsImage2 from "../../public/images/cosmetics/cosmetics_landing_2.png";
import { ClickIcon } from "./ClickIcon";

export function PortfolioSection() {
  return (
    <section className="py-16 md:py-40 xl:h-[1600px] bg-neutral-50 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 px-6 min-[1700px]:px-60 min-[1400px]:px-40 min-[1200px]:px-20">
        {/* Food */}
        <div className="flex flex-col items-center -rotate-6">
          <Link href="/portfolio/food">
            <h3 className="text-center mb-6 md:mb-10 xl:text-5xl md:text-4xl text-3xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
              # Food
              <ClickIcon
                className="left-[calc(50%-60px)] -top-12"
                type="left"
              />
            </h3>
          </Link>
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "backInOut" }}
          >
            <Image
              src={FoodImage}
              alt="Food portfolio"
              width={0}
              height={0}
              sizes="(max-width: 768px) 90vw, 40vw"
              className="w-full max-w-[350px] md:max-w-[500px] h-auto"
            />
          </motion.div>
        </div>

        {/* Product */}
        <div className="flex flex-col items-center">
          <Link href="/portfolio/product">
            <h3 className="text-center mb-6 md:mb-10 xl:text-5xl md:text-4xl text-3xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
              # Product
              <ClickIcon
                className="right-[calc(50%-60px)] -top-12"
                type="right"
              />
            </h3>
          </Link>
          <div className="flex items-start justify-center gap-6 sm:gap-8 md:gap-10">
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "backInOut" }}
            >
              <Image
                src={ProductImage1}
                alt="Product portfolio1"
                width={178}
                height={500}
                sizes="(max-width: 640px) 34vw, (max-width: 1024px) 18vw, 180px"
                className="h-[clamp(260px,58vw,360px)] w-auto max-w-[38vw] object-contain sm:h-[340px] md:h-[380px] lg:h-[440px] xl:h-[500px]"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "backInOut" }}
            >
              <Image
                src={ProductImage2}
                alt="Product portfolio2"
                width={146}
                height={500}
                sizes="(max-width: 640px) 30vw, (max-width: 1024px) 16vw, 150px"
                className="h-[clamp(260px,58vw,360px)] w-auto max-w-[34vw] object-contain sm:h-[340px] md:h-[380px] lg:h-[440px] xl:h-[500px]"
              />
            </motion.div>
          </div>
        </div>

        {/* Cosmetics */}
        <div className="flex flex-col items-center">
          <Link href="/portfolio/cosmetics">
            <h3 className="text-center mb-6 md:mb-10 xl:text-5xl md:text-4xl text-3xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
              # Cosmetics
              <ClickIcon
                className="left-[calc(50%-60px)] -top-12"
                type="left"
              />
            </h3>
          </Link>
          <div className="flex relative justify-center">
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "backInOut" }}
            >
              <Image
                src={CosmeticsImage1}
                alt="Cosmetics portfolio1"
                width={0}
                height={0}
                sizes="300px"
                className="w-[75%] max-w-[260px] h-auto mr-10 md:mr-[200px] mt-6 md:mt-10"
              />
            </motion.div>
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "backInOut" }}
              className="mt-[200px] -ml-[35%] max-sm:mt-[150px]"
            >
              <Image
                src={CosmeticsImage2}
                alt="Cosmetics portfolio2"
                width={0}
                height={0}
                sizes="260px"
                className="w-[100%] max-w-[250px] max-sm:max-w-[180px] h-auto"
              />
            </motion.div>
          </div>
        </div>

        {/* Life Style */}
        <div className="flex flex-col items-center rotate-6">
          <Link href="/portfolio/lifestyle">
            <h3 className="text-center mb-6 md:mb-10 md:text-4xl xl:text-5xl text-3xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
              # Life Style
              <ClickIcon
                className="right-[calc(50%-60px)] -top-12"
                type="right"
              />
            </h3>
          </Link>
          <motion.div
            animate={{ rotate: [-6, 6, -6] }}
            transition={{ duration: 3, repeat: Infinity, ease: "backInOut" }}
          >
            <Image
              src={LifeStyleImage}
              alt="LifeStyle portfolio1"
              width={0}
              height={0}
              sizes="(max-width: 768px) 90vw, 40vw"
              className="w-full max-w-[320px] md:max-w-[450px] h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
