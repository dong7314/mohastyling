'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { PortfolioModal } from '@/components/portfolio/PortfolioModal';
import { PortfolioItem, PortfolioCategory, CategoryTab } from '@/types/portfolio';
import { useParams } from 'next/navigation';

const categories: CategoryTab[] = [
  { value: 'food', label: 'Food' },
  { value: 'cosmetics', label: 'Cosmetics' },
  { value: 'product', label: 'Product' },
  { value: 'movie', label: 'Movie' },
  { value: 'lifestyle', label: 'Life Style' },
  { value: 'all-in-one', label: 'All in One' },
];

const categoryLabelMap: Record<string, string> = {
  food: 'Food',
  product: 'Product',
  cosmetics: 'Cosmetics',
  lifestyle: 'Life Style',
  movie: 'Movie',
  'all-in-one': 'All in One',
};

const subtitleMap: Record<string, string> = {
  food: '신선함과 감성이 담긴 푸드 스타일링을 만나보세요',
  product: '제품의 가치를 돋보이게 하는 스타일링을 확인해보세요',
  cosmetics: '아름다움을 완성하는 뷰티 & 코스메틱 스타일링입니다',
  lifestyle: '일상 속 감각적인 라이프스타일을 구경해보세요',
  movie: '움직이는 감성, 영상으로 전하는 이야기입니다',
  'all-in-one': '모든 순간을 스타일링합니다',
};

export default function PortfolioCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  // Map URL category to portfolio category (DB uses underscore)
  const categoryMap: Record<string, string> = {
    food: 'food',
    product: 'product',
    cosmetics: 'cosmetics',
    lifestyle: 'lifestyle',
    movie: 'movie',
    'all-in-one': 'all_in_one',
  };

  const selectedCategory = categoryMap[category] || category;

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Page title */}
        <section className="py-16 md:py-24 text-center">
          <h1 className="font-open-sans text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-4">
            {categoryLabelMap[category] || 'Portfolio'}
          </h1>
          <p className="font-sans text-neutral-600">{subtitleMap[category] || '다양한 작품을 만나보세요'}</p>
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
