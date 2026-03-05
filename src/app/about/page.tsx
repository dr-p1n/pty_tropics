import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageHeader from './components/PageHeader';
import OriginStory from './components/OriginStory';
import TeamSection from './components/TeamSection';
import ValuesCards from './components/ValuesCards';

export const metadata: Metadata = {
  title: 'Who We Are | PTY Tropics Advisors',
  description: 'Lawyers who understand why you\'re here. Learn about our team, values, and why we started PTY Tropics.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <PageHeader />
        <OriginStory />
        <TeamSection />
        <ValuesCards />
      </main>
      <Footer />
    </>
  );
}