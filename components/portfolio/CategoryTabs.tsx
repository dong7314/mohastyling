'use client';

import { motion } from 'framer-motion';
import { CategoryTab } from '@/types/portfolio';
import { cn } from '@/lib/utils';

interface Props {
  categories: CategoryTab[];
  selected: string;
  onChange: (value: string) => void;
}

export function CategoryTabs({ categories, selected, onChange }: Props) {
  return (
    <div className="flex justify-center gap-2 md:gap-4 py-8 px-4">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={cn(
            'relative px-6 py-3 font-medium transition-all',
            selected === category.value
              ? 'text-accent'
              : 'text-neutral-500 hover:text-neutral-900'
          )}
        >
          {category.label}
          {selected === category.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}
