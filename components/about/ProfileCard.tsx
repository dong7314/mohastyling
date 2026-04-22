'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ProfileCard() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const experiences = [
    {
      year: '2020 - 현재',
      title: '푸드 스타일리스트',
      company: '스튜디오 모하',
      description: '다양한 브랜드의 제품 촬영 및 광고 스타일링',
    },
    {
      year: '2018 - 2020',
      title: '어시스턴트 스타일리스트',
      company: 'Various Studios',
      description: '시장 조사, 재료 준비, 세팅 보조',
    },
    {
      year: '2014 - 2018',
      title: '조리학과',
      company: '한국대학교',
      description: '식품영양 및 조리 이론 전공',
    },
  ];

  const strengths = [
    { title: '디테일', desc: '꼼꼼한 준비와 집중력' },
    { title: '감각', desc: '트렌디한 스타일링 감각' },
    { title: '협업', desc: '원활한 커뮤니케이션' },
  ];

  return (
    <section ref={ref} className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-200">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Profile Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12"
            >
              <h1 className="font-serif text-4xl md:text-5xl mb-4 text-neutral-900">
                소개
              </h1>
              <p className="text-lg text-neutral-700 leading-relaxed mb-6">
                안녕하세요, 푸드 스타일리스트 모하입니다.
                <br />
                맛있는 음식과 아름다운 제품의 조화를 통해
                <br />
                고객의 비전을 현실로 만들어 드립니다.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                꼼꼼한 디테일과 예술적인 감각으로 각 프로젝트에 최선을 다하며,
                클라이언트와의 소통을 중요하게 생각합니다.
              </p>
            </motion.div>

            {/* Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-12"
            >
              <h2 className="font-serif text-2xl mb-6 text-neutral-900">강점</h2>
              <div className="grid grid-cols-3 gap-4">
                {strengths.map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-xl bg-neutral-50 border border-neutral-100"
                  >
                    <h3 className="font-serif text-lg mb-2 text-accent">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="font-serif text-2xl mb-6 text-neutral-900">경력</h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-accent/30">
                    <div className="absolute left-0 top-0 w-2 h-2 -translate-x-1/2 rounded-full bg-accent" />
                    <p className="text-sm text-accent mb-1">{exp.year}</p>
                    <h3 className="font-medium text-lg text-neutral-900">{exp.title}</h3>
                    <p className="text-neutral-600 mb-1">{exp.company}</p>
                    <p className="text-sm text-neutral-500">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
