import Icon from '@/components/ui/AppIcon';

interface FormData {
  email: string;
  nationality: string;
  income: string;
  employment: string;
  timeline: string;
  previousVisa: string;
}

interface ResultsDisplayProps {
  formData: FormData;
  language: 'en' | 'es';
}

export default function ResultsDisplay({ formData, language }: ResultsDisplayProps) {
  // Calculate score
  const scoreMap = {
    nationality: { friendly: 10, strong: 5, weak: 1 },
    income: { investor: 10, stable: 7, savings: 4, complicated: 1 },
    employment: { remote: 10, business: 8, passive: 10, local: 3, unstable: 1 },
    timeline: { norush: 10, soon: 7, urgent: 3, illegal: 1 },
    previousVisa: { no: 10, approved: 10, process: 5, denied: 1 },
  };

  const scores = {
    nationality: (scoreMap.nationality as any)[formData.nationality] || 0,
    income: (scoreMap.income as any)[formData.income] || 0,
    employment: (scoreMap.employment as any)[formData.employment] || 0,
    timeline: (scoreMap.timeline as any)[formData.timeline] || 0,
    previousVisa: (scoreMap.previousVisa as any)[formData.previousVisa] || 0,
  };

  const finalScore = (
    (scores.nationality * 0.25) +
    (scores.income * 0.25) +
    (scores.employment * 0.20) +
    (scores.timeline * 0.15) +
    (scores.previousVisa * 0.15)
  );

  // Determine color and label
  let scoreColor = '';
  let scoreLabelEN = '';
  let scoreLabelES = '';
  let interpretationEN = '';
  let interpretationES = '';

  if (finalScore >= 8.0) {
    scoreColor = 'text-success';
    scoreLabelEN = 'Clear Path';
    scoreLabelES = 'Camino Claro';
    interpretationEN = 'You have a clear path to residency. Details matter.';
    interpretationES = 'Tienes un camino claro a la residencia. Los detalles importan.';
  } else if (finalScore >= 5.0) {
    scoreColor = 'text-warning';
    scoreLabelEN = 'Options Available';
    scoreLabelES = 'Opciones Disponibles';
    interpretationEN = 'You have options, but you need the right strategy.';
    interpretationES = 'Tienes opciones, pero necesitas la estrategia correcta.';
  } else {
    scoreColor = 'text-error';
    scoreLabelEN = 'Needs Strategy';
    scoreLabelES = 'Necesita Estrategia';
    interpretationEN = 'Your situation needs professional analysis before applying.';
    interpretationES = 'Tu situación necesita análisis profesional antes de aplicar.';
  }

  // Determine recommended visa
  let recommendedVisaEN = '';
  let recommendedVisaES = '';

  if (formData.nationality === 'friendly' && formData.income === 'stable') {
    recommendedVisaEN = 'Friendly Nations Visa';
    recommendedVisaES = 'Visa de Naciones Amigas';
  } else if (formData.income === 'investor') {
    recommendedVisaEN = 'Qualified Investor Visa';
    recommendedVisaES = 'Visa de Inversionista Calificado';
  } else if (formData.employment === 'passive') {
    recommendedVisaEN = 'Pensionado Visa';
    recommendedVisaES = 'Visa de Pensionado';
  } else {
    recommendedVisaEN = 'Full Assessment Needed';
    recommendedVisaES = 'Evaluación Completa Necesaria';
  }

  const content = {
    en: {
      title: 'Your Immigration Scorecard',
      scoreLabel: scoreLabelEN,
      interpretation: interpretationEN,
      recommendedLabel: 'Recommended Visa:',
      recommendedVisa: recommendedVisaEN,
      emailMessage: 'Check your email for the full analysis.',
      ctaButton: 'Book Consultation',
    },
    es: {
      title: 'Tu Scorecard de Inmigración',
      scoreLabel: scoreLabelES,
      interpretation: interpretationES,
      recommendedLabel: 'Visa Recomendada:',
      recommendedVisa: recommendedVisaES,
      emailMessage: 'Revisa tu correo para el análisis completo.',
      ctaButton: 'Agendar Consulta',
    },
  };

  const text = content[language];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-10 bg-background concrete-texture min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-[2px] h-4 bg-accent"></div>
            <span className="label-micro text-muted-foreground">
              Resultados / Results
            </span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">
            {text.title}
          </h1>
        </div>

        {/* Score Card */}
        <div className="bg-card border-extra-thick border-primary p-12 lg:p-16 text-center mb-8">
          {/* Score */}
          <div className={`text-8xl lg:text-9xl font-heading font-bold ${scoreColor} mb-6`}>
            {finalScore.toFixed(1)}
          </div>
          <div className="text-2xl font-heading font-bold text-foreground mb-2">
            {text.scoreLabel}
          </div>
          <p className="text-lg text-muted-foreground mb-8">
            {text.interpretation}
          </p>

          {/* Recommended Visa */}
          <div className="border-t-2 border-primary pt-8">
            <p className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-2">
              {text.recommendedLabel}
            </p>
            <p className="text-3xl font-heading font-bold text-accent">
              {text.recommendedVisa}
            </p>
          </div>
        </div>

        {/* Email Message */}
        <div className="bg-secondary border-l-4 border-accent p-8 mb-8">
          <div className="flex items-start gap-4">
            <Icon name="EnvelopeIcon" size={32} className="text-accent flex-shrink-0" />
            <div>
              <p className="text-lg font-bold text-foreground mb-2">
                {text.emailMessage}
              </p>
              <p className="text-sm text-muted-foreground">
                We've sent a detailed breakdown to <strong>{formData.email}</strong> with your visa options, 
                next steps, and personalized recommendations.
              </p>
            </div>
          </div>
        </div>

        {/* CTA - Calendly Placeholder */}
        <div className="bg-primary p-12 text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            {language === 'en' ? 'Ready to Start Your Journey?' : '¿Listo para Comenzar Tu Viaje?'}
          </h2>
          <p className="text-white/80 mb-8">
            {language === 'en' ?'A 30-minute consultation can save you months of frustration.' :'Una consulta de 30 minutos puede ahorrarte meses de frustración.'}
          </p>
          <button className="bg-accent text-white px-10 py-5 rounded-full text-lg font-bold uppercase tracking-wide hover:bg-accent/90 transition-colors inline-flex items-center gap-3">
            <span>{text.ctaButton}</span>
            <Icon name="ArrowRightIcon" size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}