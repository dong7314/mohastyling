'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem } from '@/types/portfolio';
import Image from 'next/image';
import { ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 12;

interface Props {
  category: string;
  onSelect: (item: PortfolioItem) => void;
}

export function PortfolioGrid({ category, onSelect }: Props) {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/portfolio?category=${category}&page=${currentPage}&limit=${ITEMS_PER_PAGE}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();

        const mapped: PortfolioItem[] = (data.items || []).map(
          (item: Record<string, unknown>) => ({
            id: item.id as string,
            title: item.title as string,
            description: (item.description as string) || "",
            date: item.date as string,
            category: item.category as string,
            mainImage: (item.mainImage as string) || "",
            images: ((item.images as Array<{ imageUrl: string; videoUrl?: string }>) || []).map(
              (img) => ({
                imageUrl: img.imageUrl,
                videoUrl: img.videoUrl || undefined,
              })
            ),
            createdAt: new Date(item.createdAt as string),
            updatedAt: new Date(item.updatedAt as string),
          })
        );

        setItems(mapped);
        setTotalPages(Math.ceil((data.total || 0) / ITEMS_PER_PAGE));
      } catch (err) {
        console.error("Failed to fetch portfolio:", err);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [category, currentPage]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 min-h-[800px] flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

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
        {items.map((item, index) => (
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
              src={item.mainImage || item.images[0]?.imageUrl || ""}
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

      {totalPages > 1 && (
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
      )}
    </div>
  );
}
