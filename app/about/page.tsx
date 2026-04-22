import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProfileCard } from '@/components/about/ProfileCard';
import { ContactButton } from '@/components/common/ContactButton';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <ProfileCard />
      </main>
      <Footer />
      <ContactButton />
    </div>
  );
}
