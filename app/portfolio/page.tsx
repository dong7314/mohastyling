import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { PortfolioSection } from '@/components/portfolio/PortfolioSection';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <PortfolioSection />
      </main>
      <Footer />
    </div>
  );
}
