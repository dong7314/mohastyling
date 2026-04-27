"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, User, Sparkles } from "lucide-react";
import Image from "next/image";

const clients = [
  "세라젬",
  "하이뮨",
  "실리팟",
  "데켓",
  "풀무원",
  "닥터브로너스",
];

export function ProfileCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <section ref={ref} className="py-16 md:py-40 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start"
        >
          {/* Left: Profile Image */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-neutral-200 shadow-2xl max-w-[440px] mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                alt="모하 스타일링 프로필"
                fill
                className="object-cover rounded-3xl"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          </motion.div>

          {/* Right: Profile Info */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-3 space-y-8 lg:pt-8"
          >
            {/* Title */}
            <div className="mb-12">
              <h1 className="font-open-sans tracking-wide text-3xl md:text-5xl font-semibold text-neutral-900 mb-2">
                모하스타일링
              </h1>
              <div className="w-[80px] h-1 bg-accent rounded -mt-1.5" />
            </div>

            {/* Basic Info Cards */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-4 pl-5 pr-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <User className="w-6 h-6 text-accent" />
                <div>
                  <span className="font-sans text-xs text-neutral-500 block">
                    대표
                  </span>
                  <p className="font-sans text-base font-medium text-neutral-900">
                    스타일리스트 지수정
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 pl-5 pr-6 py-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <Briefcase className="w-6 h-6 text-accent" />
                <div>
                  <span className="font-sans text-xs text-neutral-500 block">
                    경력
                  </span>
                  <p className="font-sans text-base font-medium text-neutral-900">
                    7년
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="font-sans text-base text-neutral-700 leading-relaxed">
                모하스타일링은 전반적인 스타일링을 기반으로,{" "}
                <span className="text-accent font-medium">
                  푸드 · 제품 · 뷰티 · 공간
                </span>
                을 중심으로 활동하고 있습니다.
              </p>
              <p className="font-sans text-base text-neutral-700 leading-relaxed">
                SNS 콘텐츠와 지면, 영상 작업을 주로 하며, 실험적이고 감각적인
                작업을 위해 다양한 시도와 협업을 이어가고 있습니다.
              </p>
            </div>

            {/* Clients */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-accent" />
                <h2 className="font-sans text-lg font-medium text-neutral-900">
                  주요 클라이언트
                </h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {clients.map((client, index) => (
                  <span
                    key={index}
                    className="font-sans px-3 py-1.5 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-700 text-sm border border-neutral-200 hover:border-accent/50 hover:shadow-md transition-all"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
