import Icon from '@/components/ui/AppIcon';

interface SubService {
  id: string;
  nameEN: string;
  nameES: string;
}

interface Service {
  id: string;
  titleEN: string;
  titleES: string;
  descriptionEN: string;
  descriptionES: string;
  icon: string;
  subServices: SubService[];
}

export default function ServiceSection() {
  const services: Service[] = [
    {
      id: 'offshore',
      titleEN: 'Offshore Incorporation',
      titleES: 'Incorporación Offshore',
      descriptionEN: 'Establish legal entities in Panama for global operations, asset protection, and tax optimization.',
      descriptionES: 'Establece entidades legales en Panamá para operaciones globales, protección de activos y optimización fiscal.',
      icon: 'BuildingOffice2Icon',
      subServices: [
        { id: 'sa', nameEN: 'Panama Corporations (S.A.)', nameES: 'Sociedades Anónimas (S.A.)' },
        { id: 'fip', nameEN: 'Private Interest Foundations', nameES: 'Fundaciones de Interés Privado' },
        { id: 'llc', nameEN: 'Limited Liability Companies', nameES: 'LLC (Empresa de Responsabilidad Limitada)' },
        { id: 'multi', nameEN: 'Multi-Jurisdictional Structures', nameES: 'Estructuras Multi-Jurisdiccionales' },
      ],
    },
    {
      id: 'residency',
      titleEN: 'Residency & Immigration',
      titleES: 'Residencia e Inmigración',
      descriptionEN: 'Navigate Panama\'s visa and residency pathways to establish legal presence and access banking.',
      descriptionES: 'Navega los caminos de visa y residencia de Panamá para establecer presencia legal y acceder a banca.',
      icon: 'GlobeAmericasIcon',
      subServices: [
        { id: 'fn', nameEN: 'Friendly Nations Visa', nameES: 'Visa de Naciones Amigas' },
        { id: 'qi', nameEN: 'Qualified Investor Visa', nameES: 'Visa de Inversionista Calificado' },
        { id: 'pen', nameEN: 'Pensionado Visa', nameES: 'Visa de Pensionado' },
        { id: 'perm', nameEN: 'Permanent Residency', nameES: 'Residencia Permanente' },
      ],
    },
    {
      id: 'holdings',
      titleEN: 'Holding Structures',
      titleES: 'Estructuración de Holdings',
      descriptionEN: 'Design multi-tiered holding structures for real estate, investments, and succession planning.',
      descriptionES: 'Diseña estructuras de holdings multinivel para bienes raíces, inversiones y planificación de sucesión.',
      icon: 'ChartBarIcon',
      subServices: [
        { id: 're', nameEN: 'Real Estate Holdings', nameES: 'Holdings para Bienes Raíces' },
        { id: 'inv', nameEN: 'Investment Holdings', nameES: 'Holdings para Inversiones' },
        { id: 'succ', nameEN: 'Succession Structures', nameES: 'Estructuras de Sucesión' },
      ],
    },
    {
      id: 'compliance',
      titleEN: 'Tax Compliance',
      titleES: 'Cumplimiento Fiscal',
      descriptionEN: 'Stay compliant with international reporting requirements and Panama\'s economic substance regulations.',
      descriptionES: 'Mantente conforme con requisitos de reporte internacional y regulaciones de sustancia económica de Panamá.',
      icon: 'DocumentTextIcon',
      subServices: [
        { id: 'es', nameEN: 'Economic Substance', nameES: 'Sustancia Económica' },
        { id: 'fatca', nameEN: 'FATCA/CRS Reporting', nameES: 'Reportes FATCA/CRS' },
        { id: 'ubo', nameEN: 'Ultimate Beneficial Owner Registry', nameES: 'Registro de Beneficiarios Finales' },
      ],
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-secondary">
      <div className="max-w-7xl mx-auto space-y-20">
        {services.map((service, index) => (
          <div
            key={service.id}
            className={`bg-card border-extra-thick border-primary p-8 lg:p-12 hover:border-accent transition-all duration-300 ${
              index % 2 === 0 ? '' : 'lg:ml-20'
            }`}
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Icon name={service.icon as any} size={32} className="text-white" />
            </div>

            {/* Title */}
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-primary mb-4 tracking-tight">
              {service.titleEN}
            </h2>
            <p className="label-micro text-accent mb-6">
              {service.titleES}
            </p>

            {/* Description */}
            <p className="text-lg text-foreground leading-relaxed mb-4">
              {service.descriptionEN}
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-8 italic">
              {service.descriptionES}
            </p>

            {/* Sub-services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {service.subServices.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-secondary border-l-4 border-accent p-4 hover:bg-background transition-colors"
                >
                  <p className="text-sm font-bold text-foreground">{sub.nameEN}</p>
                  <p className="text-xs text-muted-foreground italic">{sub.nameES}</p>
                </div>
              ))}
            </div>

            {/* Inquire Button */}
            <button className="bg-accent text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
              Inquire / Consultar
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}