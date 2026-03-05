'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import QuestionStep from './QuestionStep';
import ResultsDisplay from './ResultsDisplay';
import { useLanguage } from '@/contexts/LanguageContext';

interface FormData {
  email: string;
  nationality: string;
  income: string;
  employment: string;
  timeline: string;
  previousVisa: string;
}

export default function CalculatorForm() {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    nationality: '',
    income: '',
    employment: '',
    timeline: '',
    previousVisa: '',
  });
  const [showResults, setShowResults] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const content = {
    en: {
      title: "What\'s Your Path to Panama?",
      subtitle: 'Discover your best visa option in 2 minutes.',
      emailLabel: 'Email Address',
      emailPlaceholder: 'your@email.com',
      nextButton: 'Next',
      prevButton: 'Back',
      submitButton: 'See My Options',
    },
    es: {
      title: '¿Cuál Es Tu Camino a Panamá?',
      subtitle: 'Descubre tu mejor opción de visa en 2 minutos.',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'tu@email.com',
      nextButton: 'Siguiente',
      prevButton: 'Atrás',
      submitButton: 'Ver Mis Opciones',
    },
  };

  const questions = [
    {
      id: 'nationality',
      questionEN: 'What country are you a citizen of?',
      questionES: '¿De qué país eres ciudadano?',
      options: [
        { value: 'friendly', labelEN: 'Friendly Nations country (USA, EU, UK, Canada, etc.)', labelES: 'País de Naciones Amigas (USA, EU, UK, Canadá, etc.)', score: 10 },
        { value: 'strong', labelEN: 'Other country with strong passport', labelES: 'Otro país con buen pasaporte', score: 5 },
        { value: 'weak', labelEN: 'Country with restrictions or weak passport', labelES: 'País con restricciones o pasaporte débil', score: 1 },
      ],
    },
    {
      id: 'income',
      questionEN: 'Which best describes your financial situation?',
      questionES: '¿Cuál describe mejor tu situación financiera?',
      options: [
        { value: 'investor', labelEN: 'I can invest $300K+ in Panama', labelES: 'Puedo invertir $300K+ en Panamá', score: 10 },
        { value: 'stable', labelEN: 'I have stable income of $1K+/month from foreign source', labelES: 'Tengo ingresos estables de $1K+/mes de fuente extranjera', score: 7 },
        { value: 'savings', labelEN: 'I have savings but variable income', labelES: 'Tengo ahorros pero ingresos variables', score: 4 },
        { value: 'complicated', labelEN: 'My finances are complicated right now', labelES: 'Mis finanzas son complicadas ahora', score: 1 },
      ],
    },
    {
      id: 'employment',
      questionEN: 'How do you currently generate income?',
      questionES: '¿Cómo generas ingresos actualmente?',
      options: [
        { value: 'remote', labelEN: 'Remote work for foreign company', labelES: 'Trabajo remoto para empresa extranjera', score: 10 },
        { value: 'business', labelEN: 'Own business with international clients', labelES: 'Negocio propio con clientes internacionales', score: 8 },
        { value: 'passive', labelEN: 'Investments / passive income', labelES: 'Inversiones / ingresos pasivos', score: 10 },
        { value: 'local', labelEN: 'I want to work locally in Panama', labelES: 'Quiero trabajar localmente en Panamá', score: 3 },
        { value: 'unstable', labelEN: "I don't have stable income yet", labelES: 'No tengo ingresos estables todavía', score: 1 },
      ],
    },
    {
      id: 'timeline',
      questionEN: 'When do you need your residency?',
      questionES: '¿Para cuándo necesitas tu residencia?',
      options: [
        { value: 'norush', labelEN: 'No rush — next 6-12 months', labelES: 'Sin prisa — próximos 6-12 meses', score: 10 },
        { value: 'soon', labelEN: 'Soon — next 3-6 months', labelES: 'Pronto — próximos 3-6 meses', score: 7 },
        { value: 'urgent', labelEN: 'Urgent — under 3 months', labelES: 'Urgente — menos de 3 meses', score: 3 },
        { value: 'illegal', labelEN: "I\'m already illegal/overstayed", labelES: 'Ya estoy ilegal/overstayed', score: 1 },
      ],
    },
    {
      id: 'previousVisa',
      questionEN: 'Have you applied for a Panama visa before?',
      questionES: '¿Has aplicado a una visa panameña antes?',
      options: [
        { value: 'no', labelEN: 'No, first time', labelES: 'No, primera vez', score: 10 },
        { value: 'approved', labelEN: 'Yes, and it was approved', labelES: 'Sí, y fue aprobada', score: 10 },
        { value: 'process', labelEN: "Yes, it's in process", labelES: 'Sí, está en proceso', score: 5 },
        { value: 'denied', labelEN: 'Yes, and it was denied or I abandoned', labelES: 'Sí, y fue rechazada o abandoné el proceso', score: 1 },
      ],
    },
  ];

  const text = content[language];
  const totalSteps = questions.length + 1; // +1 for email step

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email) {
      setCurrentStep(1);
    }
  };

  const handleQuestionAnswer = (questionId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [questionId]: value,
    }));
    
    if (currentStep < totalSteps - 1) {
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    const scores = {
      nationality: questions[0].options.find(o => o.value === formData.nationality)?.score || 0,
      income: questions[1].options.find(o => o.value === formData.income)?.score || 0,
      employment: questions[2].options.find(o => o.value === formData.employment)?.score || 0,
      timeline: questions[3].options.find(o => o.value === formData.timeline)?.score || 0,
      previousVisa: questions[4].options.find(o => o.value === formData.previousVisa)?.score || 0,
    };

    const finalScore = (
      (scores.nationality * 0.25) +
      (scores.income * 0.25) +
      (scores.employment * 0.20) +
      (scores.timeline * 0.15) +
      (scores.previousVisa * 0.15)
    ).toFixed(1);

    setShowResults(true);
  };

  const progressPercent = (currentStep / totalSteps) * 100;

  if (showResults) {
    return <ResultsDisplay formData={formData} language={language} />;
  }

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Diagnóstico / Diagnostic
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground tracking-tight mb-4">
            {text.title}
          </h1>
          <p className="text-xl text-muted-foreground">
            {text.subtitle}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 text-center">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-card border-thick border-primary p-8 lg:p-12">
          {currentStep === 0 ? (
            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-lg font-bold text-foreground mb-3">
                  {text.emailLabel} *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={text.emailPlaceholder}
                  className="w-full px-6 py-4 border-2 border-primary rounded-none focus:outline-none focus:border-accent transition-colors bg-background text-foreground text-lg"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-accent text-white py-4 font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors flex items-center justify-center gap-2"
              >
                <span>{text.nextButton}</span>
                <Icon name="ArrowRightIcon" size={20} />
              </button>
            </form>
          ) : currentStep <= questions.length ? (
            <QuestionStep
              question={questions[currentStep - 1]}
              language={language}
              onAnswer={handleQuestionAnswer}
              onBack={() => setCurrentStep(prev => prev - 1)}
              isLastQuestion={currentStep === questions.length}
              onSubmit={handleSubmit}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}