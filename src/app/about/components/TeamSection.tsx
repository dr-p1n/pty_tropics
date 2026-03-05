import AppImage from '@/components/ui/AppImage';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  superpower: string;
  image: string;
  alt: string;
}

export default function TeamSection() {
  // Stub version with single statement (can be replaced with detailed cards)
  const useDetailedTeam = false;

  const teamMembers: TeamMember[] = [
  {
    id: 'maria',
    name: 'Maria Rodriguez',
    role: 'Managing Partner',
    superpower: 'Offshore Structures — Speaks compliance fluently',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1af838840-1763299444132.png",
    alt: 'Woman in casual business attire standing outdoors with tropical plants in background'
  },
  {
    id: 'carlos',
    name: 'Carlos Mendez',
    role: 'Immigration Counsel',
    superpower: 'Residency Pathways — Navigates SBP like a GPS',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_129bbbb38-1763294239540.png",
    alt: 'Man in casual shirt smiling with modern office background'
  },
  {
    id: 'sofia',
    name: 'Sofia Chen',
    role: 'Tax Strategist',
    superpower: 'International Compliance — Makes FATCA/CRS make sense',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12df152c5-1770102733625.png",
    alt: 'Woman with glasses in professional attire working at desk'
  }];


  if (!useDetailedTeam) {
    return (
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Nuestro Equipo / Our Team
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight mb-8">
            Global Experience, Local Expertise
          </h2>
          <div className="bg-card border-2 border-primary p-12">
            <p className="text-xl text-foreground leading-relaxed mb-4">
              Un equipo con experiencia en 4 continentes, 3 idiomas, y cero paciencia para la burocracia innecesaria.
            </p>
            <p className="text-xl text-foreground leading-relaxed">
              A team with experience across 4 continents, 3 languages, and zero patience for unnecessary bureaucracy.
            </p>
          </div>
        </div>
      </section>);

  }

  // Detailed team cards (if useDetailedTeam = true)
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Nuestro Equipo / Our Team
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground tracking-tight">
            Meet the Team
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) =>
          <div
            key={member.id}
            className="bg-card border-2 border-primary p-6 hover:shadow-xl transition-shadow duration-300 group">
            
              <div className="overflow-hidden rounded-lg mb-6">
                <AppImage
                src={member.image}
                alt={member.alt}
                className="w-full h-64 object-cover grayscale-hover" />
              
              </div>
              <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                {member.name}
              </h3>
              <p className="label-micro text-primary mb-4">
                {member.role}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.superpower}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}