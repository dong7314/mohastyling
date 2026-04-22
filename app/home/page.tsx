import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { IntroSection } from '@/components/home/IntroSection';
import { ContactButton } from '@/components/common/ContactButton';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroCarousel />
        <IntroSection />
      </main>
      <Footer />
      <ContactButton />
    </div>
  );
}
