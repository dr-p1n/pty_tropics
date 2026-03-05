export default function StatementPanel() {
  return (
    <div className="bg-primary p-8 lg:p-12 flex flex-col justify-center h-full min-h-[400px]">
      <div className="space-y-8">
        <blockquote className="space-y-6">
          <p className="text-3xl lg:text-4xl font-heading font-bold text-white leading-tight">
            "Escribimos en menos de 24 horas. Sin filtros. Sin secretarias."
          </p>
          <p className="text-3xl lg:text-4xl font-heading font-bold text-white leading-tight">
            "We write back in less than 24 hours. No gatekeepers. No secretaries."
          </p>
        </blockquote>

        <div className="border-t-2 border-white/20 pt-6">
          <p className="text-white/80 text-sm leading-relaxed">
            Direct access to lawyers who understand your situation. No sales team, no bureaucracy, just straight answers.
          </p>
        </div>
      </div>
    </div>
  );
}