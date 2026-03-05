import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface Service {
  id: string;
  titleEN: string;
  titleES: string;
  icon: string;
  size: 'large' | 'medium' | 'small';
}

export default function ServicesPreview() {
  const services: Service[] = [
    {
      id: 'offshore',
      titleEN: 'Offshore Incorporation',
      titleES: 'Incorporación Offshore',
      icon: 'BuildingOffice2Icon',
      size: 'large',
    },
    {
      id: 'residency',
      titleEN: 'Residency & Immigration',
      titleES: 'Residencia e Inmigración',
      icon: 'GlobeAmericasIcon',
      size: 'medium',
    },
    {
      id: 'holdings',
      titleEN: 'Holding Structures',
      titleES: 'Estructuración de Holdings',
      icon: 'ChartBarIcon',
      size: 'medium',
    },
    {
      id: 'compliance',
      titleEN: 'Tax Compliance',
      titleES: 'Cumplimiento Fiscal',
      icon: 'DocumentTextIcon',
      size: 'small',
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Lo Que Hacemos / What We Do
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight">
            Core Services
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:auto-rows-[200px]">
          {services.map((service, index) => {
            const sizeClasses = {
              large: 'lg:col-span-2 lg:row-span-2',
              medium: 'lg:col-span-1 lg:row-span-2',
              small: 'lg:col-span-2 lg:row-span-1',
            };

            return (
              <div
                key={service.id}
                className={`${sizeClasses[service.size]} min-h-[200px] bg-card border-2 border-primary p-8 flex flex-col justify-between group hover:shadow-2xl hover:border-accent transition-all duration-300 relative overflow-hidden`}
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform mb-auto">
                  <Icon name={service.icon as any} size={28} className="text-white" />
                </div>

                {/* Title (English) */}
                <div className="mt-auto">
                  <h3 className="text-2xl font-heading font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {service.titleEN}
                  </h3>
                  {/* Title (Spanish) */}
                  <p className="label-micro text-primary">
                    {service.titleES}
                  </p>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-4 right-4 w-16 h-16 border-4 border-accent/20 rounded-full -rotate-45 group-hover:rotate-0 transition-transform duration-500"></div>
              </div>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider hover:underline"
          >
            <span>View All Services</span>
            <Icon name="ArrowRightIcon" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}