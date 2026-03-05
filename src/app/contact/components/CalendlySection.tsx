export default function CalendlySection() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-[2px] h-4 bg-accent"></div>
          <span className="label-micro text-muted-foreground">
            Prefer to Talk Live?
          </span>
        </div>
        <h2 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-8">
          ¿Prefieres hablar en vivo?
        </h2>

        {/* Calendly Embed Placeholder */}
        <div className="bg-card border-thick border-primary p-12 min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-xl text-foreground">
              Calendly booking widget would be embedded here
            </p>
            <button className="bg-accent text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors">
              Schedule Consultation
            </button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mt-6">
          30-minute consultation · Free · No commitment required
        </p>
      </div>
    </section>
  );
}