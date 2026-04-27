"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

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
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="relative h-[1700px] py-16 md:py-40 bg-neutral-50"
    >
      <div className="absolute inline-flex flex-col left-[300px] -rotate-6">
        <Link href="/portfolio/food">
          <h3 className="text-center mb-10 text-5xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
            # Food
            <ClickIcon className="left-[calc(50%-60px)] -top-12" type="left" />
          </h3>
        </Link>
        <motion.div
          animate={{
            rotate: [-6, 6, -6],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "backInOut",
          }}
        >
          <Image
            src={FoodImage}
            alt="Food portfolio"
            width={600}
            height={0}
            className="h-auto"
          />
        </motion.div>
      </div>
      <div className="absolute inline-flex flex-col right-[400px]">
        <Link href="/portfolio/product">
          <h3 className="text-center mb-10 text-5xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
            # Product
            <ClickIcon
              className="right-[calc(50%-60px)] -top-12"
              type="right"
            />
          </h3>
        </Link>
        <div className="flex">
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "backInOut",
            }}
          >
            <Image
              src={ProductImage1}
              alt="Product portfolio1"
              width={160}
              height={0}
              className="h-auto"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "backInOut",
            }}
            className="ml-10"
          >
            <Image
              src={ProductImage2}
              alt="Product portfolio2"
              width={160}
              height={0}
              className="h-auto"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute inline-flex flex-col left-[350px] top-[800px]">
        <Link href="/portfolio/cosmetics">
          <h3 className="text-center mb-10 text-5xl font-sans font-medium hover:text-accent cursor-pointer transition-colors">
            # Cosmetics
            <ClickIcon className="left-[calc(50%-60px)] -top-12" type="left" />
          </h3>
        </Link>
        <div className="flex relative">
          <motion.div
            animate={{
              y: [0, -30, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "backInOut",
            }}
          >
            <Image
              src={CosmeticsImage1}
              alt="Cosmetics portfolio1"
              width={300}
              height={0}
              className="h-auto mr-[200px] mt-10"
            />
          </motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "backInOut",
            }}
            className="absolute right-0 top-[200px]"
          >
            <Image
              src={CosmeticsImage2}
              alt="Cosmetics portfolio2"
              width={260}
              height={0}
              className="h-auto"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute inline-flex flex-col right-[300px] top-[1050px]">
        <Link href="/portfolio/lifestyle">
          <h3 className="text-center mb-10 text-5xl font-sans font-medium rotate-6 hover:text-accent cursor-pointer transition-colors">
            # Life Style
            <ClickIcon
              className="right-[calc(50%-60px)] -top-12"
              type="right"
            />
          </h3>
        </Link>
        <div className="flex relative">
          <motion.div
            animate={{
              rotate: [-6, 6, -6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "backInOut",
            }}
          >
            <Image
              src={LifeStyleImage}
              alt="LifeStyle portfolio1"
              width={550}
              height={0}
              className="h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
