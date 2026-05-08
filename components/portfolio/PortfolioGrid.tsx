'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';
import Image from 'next/image';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

interface Props {
  category: string;
  onSelect: (item: PortfolioItem) => void;
}

// Sample portfolio data - replace with API data
const sampleItems: PortfolioItem[] = [
  {
    id: '1',
    title: '신선한 샐러드',
    description: '건강한 재료들의 조화',
    date: '2024.01',
    category: 'food',
    mainImage: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: '아침 식사',
    description: '하루를 여는 따뜻한 식사',
    date: '2024.02',
    category: 'food',
    mainImage: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '3',
    title: '파스타',
    description: '이탈리안 클래식',
    date: '2024.03',
    category: 'food',
    mainImage: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '4',
    title: '디저트',
    description: '달콤한 마무리',
    date: '2024.03',
    category: 'food',
    mainImage: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80',
    images: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export function PortfolioGrid({ category, onSelect }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const items = sampleItems.filter((item) => item.category === category);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 min-h-[800px] flex flex-col items-center justify-center text-center">
        <ImageIcon className="w-12 h-12 text-neutral-300 mb-4" />
        <p className="text-neutral-400 font-sans">등록된 포트폴리오가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 min-h-[800px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(item)}
            className="group relative aspect-[4/5] overflow-hidden rounded-lg cursor-pointer bg-neutral-100"
          >
            <Image
              src={item.mainImage}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <h3 className="text-white font-sans text-lg">{item.title}</h3>
              <p className="text-white/80 font-sans text-sm">{item.date}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-1 mt-12">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-md flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-9 h-9 rounded-md flex items-center justify-center text-sm font-sans transition-colors ${
              page === currentPage
                ? 'bg-accent/80 text-white'
                : 'text-neutral-400/60 hover:text-neutral-500 hover:bg-neutral-100/50'
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-md flex items-center justify-center text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100/50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
