'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = {
    en: [
      { label: 'Home', href: '/homepage' },
      { label: 'Who We Are', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' },
      { label: 'Diagnostic', href: '/calculator' },
    ],
    es: [
      { label: 'Inicio', href: '/homepage' },
      { label: 'Quiénes Somos', href: '/about' },
      { label: 'Servicios', href: '/services' },
      { label: 'Contacto', href: '/contact' },
      { label: 'Diagnóstico', href: '/calculator' },
    ],
  };

  const ctaText = language === 'en' ? 'Consult' : 'Consulta';

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-primary ${
        isScrolled ? 'bg-background/80 backdrop-blur-sm' : 'bg-background'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/homepage" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-heading font-bold tracking-tight text-foreground hidden sm:block">
            PTY TROPICS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navItems?.[language]?.map((item, idx) => {
            const isActive = pathname === item?.href;
            return (
              <Link
                key={`nav-${idx}`}
                href={item?.href}
                className={`label-micro transition-colors ${
                  isActive ? 'text-accent' : 'text-muted-foreground hover:text-primary'
                }`}
              >
                {item?.label}
              </Link>
            );
          })}
        </div>

        {/* Right Side: Language Toggle + CTA */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
            aria-label="Toggle language"
          >
            <Icon name="GlobeAltIcon" size={16} />
            <span className="text-xs font-bold uppercase tracking-wider">
              {language === 'en' ? 'ES' : 'EN'}
            </span>
          </button>

          {/* Desktop CTA */}
          <Link
            href="/contact"
            className="hidden lg:block bg-accent text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors"
          >
            {ctaText}
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            <Icon name={isMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
          </button>
        </div>
      </nav>
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background/98 z-40 flex flex-col items-center justify-center gap-8 animate-in fade-in duration-300">
          {navItems?.[language]?.map((item, idx) => {
            const isActive = pathname === item?.href;
            return (
              <Link
                key={`mobile-nav-${idx}`}
                href={item?.href}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-heading font-bold uppercase tracking-wider transition-colors ${
                  isActive ? 'text-accent' : 'text-foreground hover:text-primary'
                }`}
              >
                {item?.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="bg-accent text-white px-8 py-3 rounded-full text-lg font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors mt-4"
          >
            {ctaText}
          </Link>
        </div>
      )}
    </header>
  );
}