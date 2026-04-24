import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { ContactButton } from '@/components/common/ContactButton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroCarousel />
        <ProfileCard />
      </main>
      <Footer />
      <ContactButton />
    </div>
  );
}
