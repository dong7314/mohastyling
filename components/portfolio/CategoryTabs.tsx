'use client';

import { motion } from 'framer-motion';
import { CategoryTab } from '@/types/portfolio';
import { cn } from '@/lib/utils';

interface Props {
  categories: CategoryTab[];
  selected: string;
  onChange: (value: string) => void;
}
