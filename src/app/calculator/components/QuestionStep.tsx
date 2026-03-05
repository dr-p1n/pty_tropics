import Icon from '@/components/ui/AppIcon';

interface Option {
  value: string;
  labelEN: string;
  labelES: string;
  score: number;
}

interface Question {
  id: string;
  questionEN: string;
  questionES: string;
  options: Option[];
}

interface QuestionStepProps {
  question: Question;
  language: 'en' | 'es';
  onAnswer: (questionId: string, value: string) => void;
  onBack: () => void;
  isLastQuestion: boolean;
  onSubmit: () => void;
}

export default function QuestionStep({
  question,
  language,
  onAnswer,
  onBack,
  isLastQuestion,
  onSubmit,
}: QuestionStepProps) {
  const questionText = language === 'en' ? question.questionEN : question.questionES;
  const submitText = language === 'en' ? 'See My Options' : 'Ver Mis Opciones';
  const backText = language === 'en' ? 'Back' : 'Atrás';

  const handleOptionClick = (value: string) => {
    if (isLastQuestion) {
      onAnswer(question.id, value);
      setTimeout(() => {
        onSubmit();
      }, 300);
    } else {
      onAnswer(question.id, value);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-8">
        {questionText}
      </h2>

      <div className="space-y-4">
        {question.options.map((option) => {
          const label = language === 'en' ? option.labelEN : option.labelES;
          return (
            <button
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="w-full text-left p-6 border-2 border-primary hover:border-accent hover:bg-secondary transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-foreground font-medium group-hover:text-accent transition-colors">
                  {label}
                </span>
                <Icon
                  name="ChevronRightIcon"
                  size={24}
                  className="text-primary group-hover:text-accent group-hover:translate-x-1 transition-all"
                />
              </div>
            </button>
          );
        })}
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors mt-8"
      >
        <Icon name="ChevronLeftIcon" size={20} />
        <span className="font-medium">{backText}</span>
      </button>
    </div>
  );
}