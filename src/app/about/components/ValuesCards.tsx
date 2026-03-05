import Icon from '@/components/ui/AppIcon';

interface Value {
  id: string;
  titleEN: string;
  titleES: string;
  descriptionEN: string;
  descriptionES: string;
  icon: string;
}

export default function ValuesCards() {
  const values: Value[] = [
    {
      id: 'clarity',
      titleEN: 'Radical Clarity',
      titleES: 'Claridad Radical',
      descriptionEN: 'We tell you exactly what you need. And what you don\'t.',
      descriptionES: 'Te decimos exactamente qué necesitas. Y qué no.',
      icon: 'LightBulbIcon',
    },
    {
      id: 'judgment',
      titleEN: 'No Judgment',
      titleES: 'Sin Juicio',
      descriptionEN: 'Your reason for structuringoffshore is yours. Our job is to do it right.',
      descriptionES: 'Tu razón para estructurar offshore es tuya. Nuestro trabajo es hacerlo bien.',
      icon: 'ShieldCheckIcon',
    },
    {
      id: 'speed',
      titleEN: 'Real Speed',
      titleES: 'Velocidad Real',
      descriptionEN: 'Panama can be slow. We are not.',
      descriptionES: 'Panamá puede ser lento. Nosotros no.',
      icon: 'BoltIcon',
    },
  ];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Nuestros Valores / Our Values
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight">
            What We Stand For
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value) => (
            <div
              key={value.id}
              className="bg-card border-thick border-primary p-8 hover:border-accent hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-6">
                <Icon name={value.icon as any} size={28} className="text-white" />
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-foreground mb-2">
                {value.titleEN}
              </h3>
              <p className="label-micro text-primary mb-4">
                {value.titleES}
              </p>
              
              <p className="text-sm text-foreground leading-relaxed mb-3">
                {value.descriptionEN}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                {value.descriptionES}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}