'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function IntroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-8 text-neutral-900">
            소개
          </h2>
          <p className="text-lg md:text-xl text-neutral-700 leading-relaxed mb-12">
            푸드 스타일리스트로서 다양한 경험을 바탕으로 고객의 비전을 현실로 만듭니다.
            꼼꼼한 디테일과 예술적인 감각으로 각 프로젝트에 최선을 다합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              { title: '푸드', desc: '맛있는 음식의 아름다움을 담다' },
              { title: '뷰티', desc: '제품의 매력을 극대화하다' },
              { title: '영상', desc: '움직이는 예술을 표현하다' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-xl transition-shadow"
              >
                <h3 className="font-serif text-2xl mb-3 text-accent">{item.title}</h3>
                <p className="text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
