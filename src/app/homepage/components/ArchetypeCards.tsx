import Icon from '@/components/ui/AppIcon';

interface Archetype {
  id: string;
  titleEN: string;
  titleES: string;
  descriptionEN: string;
  descriptionES: string;
  icon: string;
}

export default function ArchetypeCards() {
  const archetypes: Archetype[] = [
    {
      id: 'nomad',
      titleEN: 'The Digital Nomad',
      titleES: 'El Nómada Digital',
      descriptionEN: 'Needs residency, banking, and a clean structure to operate globally without friction.',
      descriptionES: 'Necesita residencia, banca y una estructura limpia para operar globalmente sin fricciones.',
      icon: 'GlobeAltIcon',
    },
    {
      id: 'founder',
      titleEN: 'The Global Founder',
      titleES: 'El Fundador Global',
      descriptionEN: 'Building across borders, needs corporate clarity and strategic entity structuring.',
      descriptionES: 'Construyendo a través de fronteras, necesita claridad corporativa y estructuración estratégica.',
      icon: 'RocketLaunchIcon',
    },
    {
      id: 'investor',
      titleEN: 'The Expat Investor',
      titleES: 'El Inversionista Expatriado',
      descriptionEN: 'Relocating wealth, needs transparent asset protection and tax optimization.',
      descriptionES: 'Reubicando riqueza, necesita protección de activos transparente y optimización fiscal.',
      icon: 'BanknotesIcon',
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 concrete-texture">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Para Quién Trabajamos / Who We Work With
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight">
            Three Types of Builders
          </h2>
        </div>

        {/* Archetype Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {archetypes.map((archetype) => (
            <div
              key={archetype.id}
              className="bg-secondary border-l-4 border-accent p-8 hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Icon name={archetype.icon as any} size={24} className="text-white" />
              </div>

              {/* English Title */}
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {archetype.titleEN}
              </h3>

              {/* Spanish Title */}
              <p className="label-micro text-primary mb-4">
                {archetype.titleES}
              </p>

              {/* English Description */}
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {archetype.descriptionEN}
              </p>

              {/* Spanish Description */}
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                {archetype.descriptionES}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}