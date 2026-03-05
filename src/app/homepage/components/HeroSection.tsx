'use client';

import { useState, useEffect } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { language } = useLanguage();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const content = {
    en: {
      label: 'International Law. Zero Judgment.',
      headline: ['Local Roots.', 'Global Mind.'],
      subhead: 'Offshore and corporate structures for those who build different.',
      cta: "Let\'s Talk",
      caption: 'Panama + The World',
      subcaption: 'Corporate & Offshore Law'
    },
    es: {
      label: 'Derecho Internacional. Sin Prejuicios.',
      headline: ['Raíces Locales.', 'Mente Global.'],
      subhead: 'Estructuras offshore y corporativas para los que construyen diferente.',
      cta: 'Hablemos',
      caption: 'Panamá + El Mundo',
      subcaption: 'Derecho Corporativo y Offshore'
    }
  };

  const text = content?.[language];

  return (
    <section className="relative z-10 px-4 sm:px-6 lg:px-10 py-16 lg:py-0 lg:min-h-screen concrete-texture">
      <div className="lg:grid lg:grid-cols-8 lg:gap-12">
        {/* Left Column: Headline + Image */}
        <div className="lg:col-start-2 lg:col-span-4 pt-8 lg:pt-24">
          {/* Section Label */}
          <div className="flex items-center gap-4 mb-6 lg:mb-8">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              {text?.label}
            </span>
          </div>

          {/* Massive Headline */}
          <h1 className="text-massive font-heading font-bold tracking-tight text-foreground mb-10 lg:mb-20">
            {text?.headline?.[0]}<br />
            {text?.headline?.[1]}
          </h1>

          {/* Image with Grayscale Hover */}
          <div className="w-full relative group">
            <AppImage
              src="https://images.unsplash.com/photo-1708162774482-129db99efdb0"
              alt="Aerial view of Panama City skyline with modern skyscrapers and tropical greenery"
              className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover object-center rounded-2xl lg:rounded-none grayscale-hover" />
            
            <div className="mt-6 lg:mt-8">
              <h3 className="text-xl lg:text-2xl font-heading font-medium text-foreground">
                {text?.caption}
              </h3>
              <p className="label-micro text-muted-foreground mt-1">
                {text?.subcaption}
              </p>
            </div>
            {/* Decorative Dot Grid */}
            <div className="absolute -left-10 bottom-24 opacity-20 hidden lg:block pointer-events-none">
              <div className="grid grid-cols-4 gap-2">
                {[...Array(8)]?.map((_, i) =>
                <div key={`dot-${i}`} className="w-1 h-1 bg-primary rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Floating CTA + About */}
        <div className="lg:col-start-6 lg:col-span-3 pt-12 lg:pt-24 relative">
          {/* Floating CTA Box (Desktop Only) */}
          <div className="hidden lg:flex bg-accent w-56 h-56 p-10 flex-col justify-between absolute -top-10 -left-10 scale-hover cursor-pointer">
            <Icon name="ArrowUpRightIcon" size={24} className="text-white" />
            <span className="text-white text-2xl font-heading font-bold leading-tight uppercase">
              {text?.cta}
            </span>
          </div>

          {/* Mobile CTA Button */}
          <div className="lg:hidden mb-8">
            <button className="w-full bg-accent text-white py-4 px-6 font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors flex items-center justify-center gap-2">
              <span>{text?.cta}</span>
              <Icon name="ArrowUpRightIcon" size={20} />
            </button>
          </div>

          {/* About Section */}
          <div className="lg:mt-64 lg:ml-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-[2px] h-4 bg-accent"></div>
              <span className="label-micro text-muted-foreground">
                {language === 'en' ? 'About This Firm' : 'Sobre Esta Firma'}
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {text?.subhead}
            </p>
          </div>
        </div>
      </div>
    </section>);

}