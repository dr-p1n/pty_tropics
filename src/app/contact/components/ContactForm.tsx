'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  name: string;
  email: string;
  location: string;
  service: string;
  context: string;
}

export default function ContactForm() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    location: '',
    service: '',
    context: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const serviceOptions = {
    en: [
      { value: '', label: 'Select a service' },
      { value: 'offshore', label: 'Offshore Structure' },
      { value: 'residency', label: 'Residency' },
      { value: 'holding', label: 'Holding Structure' },
      { value: 'compliance', label: 'Tax Compliance' },
      { value: 'unsure', label: 'Not Sure' },
    ],
    es: [
      { value: '', label: 'Selecciona un servicio' },
      { value: 'offshore', label: 'Estructura Offshore' },
      { value: 'residency', label: 'Residencia' },
      { value: 'holding', label: 'Estructura de Holding' },
      { value: 'compliance', label: 'Cumplimiento Fiscal' },
      { value: 'unsure', label: 'No Estoy Seguro' },
    ],
  };

  const labels = {
    en: {
      name: 'Name',
      email: 'Email',
      location: 'Where are you now?',
      service: 'What do you need?',
      context: 'Tell us more',
      submit: 'Send',
    },
    es: {
      name: 'Nombre',
      email: 'Email',
      location: '¿Dónde estás ahora?',
      service: '¿Qué necesitas?',
      context: 'Cuéntanos más',
      submit: 'Enviar',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    alert('Form submitted! We will respond within 24 hours.');
    setIsSubmitting(false);
    setFormData({
      name: '',
      email: '',
      location: '',
      service: '',
      context: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const text = labels[language];

  return (
    <div className="bg-card border-thick border-primary p-8 lg:p-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-foreground mb-2">
            {text.name} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-primary rounded-none focus:outline-none focus:border-accent transition-colors bg-background text-foreground"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-foreground mb-2">
            {text.email} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-primary rounded-none focus:outline-none focus:border-accent transition-colors bg-background text-foreground"
          />
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-bold text-foreground mb-2">
            {text.location}
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Bali, Berlin, Bogotá..."
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-primary rounded-none focus:outline-none focus:border-accent transition-colors bg-background text-foreground placeholder:text-muted-foreground"
          />
        </div>

        {/* Service */}
        <div>
          <label htmlFor="service" className="block text-sm font-bold text-foreground mb-2">
            {text.service} *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-primary rounded-none focus:outline-none focus:border-accent transition-colors bg-background text-foreground appearance-none"
          >
            {serviceOptions[language].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Context */}
        <div>
          <label htmlFor="context" className="block text-sm font-bold text-foreground mb-2">
            {text.context} *
          </label>
          <textarea
            id="context"
            name="context"
            required
            rows={6}
            value={formData.context}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-primary rounded-none focus:outline-none focus:border-accent transition-colors bg-background text-foreground resize-none"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent text-white py-4 font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>{text.submit}</span>
              <Icon name="PaperAirplaneIcon" size={20} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}