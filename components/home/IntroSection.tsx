"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section ref={ref} className="py-24 md:py-60 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2
            variants={itemVariants}
            className="font-sans font-medium text-4xl md:text-5xl mb-14 text-neutral-900"
          >
            <span className="font-open-sans italic">&quot;</span>
            &nbsp;&nbsp;손 끝에서 나오는
          </motion.h2>

          <motion.h2
            variants={itemVariants}
            className="font-sans font-medium text-4xl md:text-5xl mb-14 text-neutral-900 leading-[90px]"
          >
            우리의 쌓인 시간들이
          </motion.h2>

          <motion.h2
            variants={itemVariants}
            className="font-sans font-medium text-4xl md:text-5xl text-neutral-900 leading-[90px]"
          >
            물결이 되기를 바랍니다.{" "}
            <span className="font-open-sans italic">&quot;</span>
          </motion.h2>
        </motion.div>
      </div>
    </section>
  );
}
