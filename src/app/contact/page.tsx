import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from './components/ContactForm';
import StatementPanel from './components/StatementPanel';
import CalendlySection from './components/CalendlySection';

export const metadata: Metadata = {
  title: 'Contact | PTY Tropics Advisors',
  description: 'Get in touch with PTY Tropics. We respond within 24 hours with no gatekeepers.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-[2px] h-4 bg-accent"></div>
                <span className="label-micro text-muted-foreground">
                  Contacto / Contact
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground tracking-tight">
                Let's Talk
              </h1>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <ContactForm />
              <StatementPanel />
            </div>
          </div>
        </section>

        <CalendlySection />
      </main>
      <Footer />
    </>
  );
}