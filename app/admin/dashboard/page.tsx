'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, LogOut } from 'lucide-react';
import { PortfolioItem, PortfolioCategory } from '@/types/portfolio';
import Image from 'next/image';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('food');

  useEffect(() => {
    const auth = sessionStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthenticated(true);
      // Load portfolio items
      loadItems();
    }
  }, [router]);

  const loadItems = () => {
    // TODO: Load from API
    setItems([]);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      // TODO: Delete via API
      setItems(items.filter((item) => item.id !== id));
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  const categories: { value: PortfolioCategory; label: string }[] = [
    { value: 'food', label: '푸드' },
    { value: 'beauty', label: '뷰티' },
    { value: 'product', label: '제품' },
    { value: 'video', label: '영상' },
  ];

  const filteredItems = items.filter((item) => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-serif text-2xl text-neutral-900">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <LogOut size={18} />
            로그아웃
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Category Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-accent text-white'
                  : 'bg-white text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Add Button */}
        <div className="flex justify-end mb-6">
          <button className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent-hover transition-colors">
            <Plus size={20} />
            새 포트폴리오 추가
          </button>
        </div>

        {/* Items List */}
        <div className="space-y-4">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-neutral-500">등록된 포트폴리오가 없습니다.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="bg-white rounded-lg p-4 flex gap-4 items-center"
              >
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                  <Image src={item.mainImage} alt={item.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-neutral-900 truncate">{item.title}</h3>
                  <p className="text-sm text-neutral-500">{item.date}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-neutral-600 hover:text-accent transition-colors">
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
