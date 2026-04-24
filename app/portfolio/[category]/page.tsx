'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { PortfolioItem, PortfolioCategory, CategoryTab } from '@/types/portfolio';
import { useParams } from 'next/navigation';

const categories: CategoryTab[] = [
  { value: 'food', label: '푸드' },
  { value: 'beauty', label: '뷰티' },
  { value: 'product', label: '제품' },
  { value: 'video', label: '영상' },
];

const categoryLabelMap: Record<string, string> = {
  food: '푸드',
  product: '제품',
  cosmetics: '코스메틱',
  lifestyle: '라이프스타일',
  movie: '영상',
};

export default function PortfolioCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Map URL category to portfolio category
  const categoryMap: Record<string, PortfolioCategory> = {
    food: 'food',
    product: 'product',
    cosmetics: 'beauty',
    lifestyle: 'beauty',
    movie: 'video',
  };

  const selectedCategory = categoryMap[category] || 'food';

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Page title */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-open-sans text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-4">
            {categoryLabelMap[category] || 'Portfolio'}
          </h1>
          <p className="font-sans text-neutral-600">다양한 작품을 만나보세요</p>
        </section>
        
        {/* Grid */}
        <PortfolioGrid category={selectedCategory} onSelect={setSelectedItem} />
      </main>
      <Footer />

      {/* Modal */}
      {selectedItem && (
        <PortfolioModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
}
