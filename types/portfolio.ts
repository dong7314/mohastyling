export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'food' | 'beauty' | 'product' | 'video';
  mainImage: string;
  images: string[];
  videoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PortfolioCategory = PortfolioItem['category'];

export interface CategoryTab {
  value: PortfolioCategory;
  label: string;
}
