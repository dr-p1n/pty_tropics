export default function PageHeader() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-[2px] h-4 bg-accent"></div>
          <span className="label-micro text-muted-foreground">
            Servicios / Services
          </span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
          Services for Global Builders
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Servicios para Constructores Globales
        </p>
      </div>
    </section>
  );
}