import Icon from '@/components/ui/AppIcon';

export default function Disclaimer() {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture">
      <div className="max-w-4xl mx-auto">
        <div className="bg-secondary border-extra-thick border-primary p-8 lg:p-12">
          <div className="flex items-start gap-4 mb-6">
            <Icon name="ExclamationTriangleIcon" size={32} className="text-accent flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-heading font-bold text-foreground mb-4">
                What We Don't Do / Lo Que No Hacemos
              </h3>
              
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">
                  <strong>No hacemos evasión fiscal.</strong> No ayudamos a esconder dinero ilícito. 
                  Sí ayudamos a personas honestas a estructurar legalmente sus activos globales.
                </p>
                
                <p className="text-foreground leading-relaxed">
                  <strong>We don't do tax evasion.</strong> We don't help hide illicit money. 
                  We do help honest people legally structure their global assets.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-primary pt-6 mt-6">
            <p className="text-sm text-muted-foreground leading-relaxed">
              All our services comply with Panama's legal framework, international reporting standards (FATCA, CRS), 
              and anti-money laundering regulations. We conduct thorough due diligence on all clients.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}