import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="font-sans text-4xl md:text-6xl font-semibold tracking-tight text-neutral-900 mb-4">
          Service
        </h1>
        <p className="font-sans text-neutral-400">
          준비 중입니다.
        </p>
      </main>
      <Footer />
    </div>
  );
}
