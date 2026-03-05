export default function OriginStory() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-secondary">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Spanish Story */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            Por Qué Empezamos PTY Tropics
          </h2>
          <p className="text-foreground leading-relaxed mb-6">
            Empezamos PTY Tropics porque estábamos cansados de ver a buenos clientes recibir malos consejos. 
            Gente inteligente, construyendo cosas reales, pero tratada como sospechosa por querer optimizar sus estructuras.
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            Vimos demasiadas veces a emprendedores digitales y fundadores globales navegando un laberinto de burocracia 
            sin nadie que realmente entendiera su situación. Firmas tradicionales que cobraban fortunas por soluciones 
            genéricas. Asesores que juzgaban antes de escuchar.
          </p>
          <p className="text-foreground leading-relaxed">
            Decidimos construir algo diferente: una firma que habla tu idioma (literal y figurativamente), 
            que entiende movilidad global, y que no te va a dar un sermón sobre "canales apropiados."
          </p>
        </div>

        {/* English Story */}
        <div className="prose prose-lg max-w-none border-t-2 border-primary pt-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
            Why We Started PTY Tropics
          </h2>
          <p className="text-foreground leading-relaxed mb-6">
            We started PTY Tropics because we were tired of seeing good clients get bad advice. 
            Smart people, building real things, but treated like suspects for wanting to optimize their structures.
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            We saw too many digital entrepreneurs and global founders navigating a maze of bureaucracy 
            with no one who truly understood their situation. Traditional firms charging fortunes for 
            generic solutions. Advisors judging before listening.
          </p>
          <p className="text-foreground leading-relaxed">
            We decided to build something different: a firm that speaks your language (literally and figuratively), 
            understands global mobility, and won't lecture you about "proper channels."
          </p>
        </div>

        {/* Who We Are */}
        <div className="bg-card border-l-4 border-accent p-8 lg:p-12">
          <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
            Quiénes Somos / Who We Are
          </h3>
          <p className="text-foreground leading-relaxed mb-4">
            Un equipo con experiencia en 4 continentes, 3 idiomas, y cero paciencia para la burocracia innecesaria.
          </p>
          <p className="text-foreground leading-relaxed">
            A team with experience across 4 continents, 3 languages, and zero patience for unnecessary bureaucracy.
          </p>
        </div>
      </div>
    </section>
  );
}