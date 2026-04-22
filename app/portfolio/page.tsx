'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CategoryTabs } from '@/components/portfolio/CategoryTabs';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { PortfolioItem, PortfolioCategory, CategoryTab } from '@/types/portfolio';

const categories: CategoryTab[] = [
  { value: 'food', label: '푸드' },
  { value: 'beauty', label: '뷰티' },
  { value: 'product', label: '제품' },
  { value: 'video', label: '영상' },
];

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('food');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Page title */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-serif text-4xl md:text-6xl mb-4 text-neutral-900">포트폴리오</h1>
          <p className="text-neutral-600">다양한 작품을 만나보세요</p>
        </section>

        {/* Category tabs */}
        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onChange={(value) => setSelectedCategory(value as PortfolioCategory)}
        />

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
