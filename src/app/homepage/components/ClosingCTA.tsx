import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

export default function ClosingCTA() {
  return (
    <section className="py-20 lg:py-32 bg-accent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 sm:mb-8 leading-tight">
          ¿Listo para construir sin fronteras?
        </h2>
        <p className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium text-white mb-10 sm:mb-12 leading-relaxed">
          Ready to build without borders?
        </p>
        <Link
          href="/contact"
          className="inline-flex flex-wrap items-center justify-center gap-3 bg-primary text-white px-8 sm:px-10 py-4 sm:py-5 rounded-full text-base sm:text-lg font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors scale-hover text-center"
        >
          <span>Agendar Consulta</span>
          <span className="hidden sm:inline">/</span>
          <span className="sm:inline">Book Consultation</span>
          <Icon name="ArrowRightIcon" size={24} />
        </Link>
      </div>
    </section>
  );
}