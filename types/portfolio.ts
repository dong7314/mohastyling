export interface PortfolioItemImage {
  imageUrl: string;
  videoUrl?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'food' | 'product' | 'cosmetics' | 'lifestyle' | 'movie' | 'all-in-one';
  mainImage: string;
  images: PortfolioItemImage[];
  createdAt: Date;
  updatedAt: Date;
}

export type PortfolioCategory = PortfolioItem['category'];

export interface CategoryTab {
  value: PortfolioCategory;
  label: string;
}
