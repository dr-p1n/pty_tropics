import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from './components/PageHeader';
import ServiceSection from './components/ServiceSection';
import Disclaimer from './components/Disclaimer';

export const metadata: Metadata = {
  title: 'Services | PTY Tropics Advisors',
  description: 'Offshore incorporation, residency & immigration, holding structures, and tax compliance for global builders.',
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <PageHeader />
        <ServiceSection />
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}