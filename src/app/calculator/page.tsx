import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorForm from './components/CalculatorForm';

export const metadata: Metadata = {
  title: 'Visa Diagnostic | PTY Tropics Advisors',
  description: 'Discover your best Panama visa option in 2 minutes. Get personalized pathway recommendations.',
};

export default function CalculatorPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <CalculatorForm />
      </main>
      <Footer />
    </>
  );
}