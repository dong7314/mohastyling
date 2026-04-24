'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import FoodImage from '../../public/images/food/food_landing_1.png';
import ProductImage1 from '../../public/images/product/product_landing_1.png';
import ProductImage2 from '../../public/images/product/product_landing_2.png';

export function PortfolioSection() {
  const ref = useRef(null);

  return (
    <section ref={ref} className="relative h-[1000px] py-16 md:py-40 bg-neutral-50">
      <div className="absolute inline-flex flex-col left-20 -rotate-6">
        <h3 className="text-center mb-10 text-4xl font-sans font-medium"># Food</h3>
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
      <div className="absolute inline-flex flex-col left-1/2">
        <h3 className="text-center mb-10 text-4xl font-sans font-medium"># Product</h3>
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
              width={200}
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
              width={200}
              height={0}
              className="h-auto"
            />
          </motion.div>
        </div>
      </div>

    </section>
  );
}
