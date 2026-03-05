import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './components/HeroSection';
import ManifestoBlock from './components/ManifestoBlock';
import ArchetypeCards from './components/ArchetypeCards';
import ServicesPreview from './components/ServicesPreview';
import SocialProof from './components/SocialProof';
import ClosingCTA from './components/ClosingCTA';

export const metadata: Metadata = {
  title: 'PTY Tropics Advisors | Local Roots, Global Mind',
  description: 'Offshore and corporate structures for those who build different. International law firm serving digital nomads, global founders, and expat investors in Panama.',
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <HeroSection />
        <ManifestoBlock />
        <ArchetypeCards />
        <ServicesPreview />
        <SocialProof />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}