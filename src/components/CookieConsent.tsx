'use client';

import { useState, useEffect } from 'react';
import { usePrivacy } from '@/contexts/PrivacyContext';

const CONSENT_KEY = 'pty-cookie-consent';

type Lang = 'en' | 'es';

const copy: Record<Lang, {
  bannerTitle: string;
  bannerText: string;
  acceptAll: string;
  rejectNonEssential: string;
  viewPolicy: string;
  modalTitle: string;
  close: string;
  sections: { title: string; body: string }[];
  lastUpdated: string;
}> = {
  en: {
    bannerTitle: 'We use cookies',
    bannerText:
      'We use essential cookies to operate this site and, with your consent, analytics cookies to understand how visitors interact with our content. Your data is protected under Panama\'s Law 81 of 2019.',
    acceptAll: 'Accept All',
    rejectNonEssential: 'Essential Only',
    viewPolicy: 'Privacy Policy',
    modalTitle: 'Privacy & Cookie Policy',
    close: 'Close',
    lastUpdated: 'Last updated: March 2026 · Governed by Panama Law 81 of 2019',
    sections: [
      {
        title: '1. Who We Are (Data Controller)',
        body: 'PTY Tropics Advisors is a Panamanian law firm that acts as the Data Controller of the personal data collected through this website. For any data-related inquiry, you may contact us at: privacy@ptytropics.com · Panama City, Republic of Panama.',
      },
      {
        title: '2. What Data We Collect',
        body: 'We may collect the following categories of personal data: (a) Identification data: full name, email address, country of residence, provided voluntarily through our contact form or diagnostic tool; (b) Communication data: the contents of your consultation messages; (c) Technical data: IP address, browser type, pages visited, session duration — collected automatically via cookies when you consent; (d) No sensitive data (health, financial account numbers, biometrics) is collected through this website.',
      },
      {
        title: '3. Purpose & Legal Basis',
        body: 'We process your data for the following purposes and legal bases under Ley 81: (a) To respond to consultation requests — legal basis: performance of a pre-contractual relationship (Art. 9, Ley 81); (b) To improve our website and user experience — legal basis: your explicit consent (Art. 9, Ley 81); (c) To comply with applicable legal and regulatory obligations — legal basis: legal obligation (Art. 9, Ley 81). We do not use your data for automated profiling or automated decision-making.',
      },
      {
        title: '4. Cookies We Use',
        body: 'ESSENTIAL COOKIES (always active): These are strictly necessary for the website to function and cannot be switched off. They are set in response to actions you take, such as navigation preferences. ANALYTICS COOKIES (with your consent): We may use tools such as Google Analytics to collect anonymized information about how visitors use our site. These cookies help us understand page performance and user flow. No personally identifiable information is shared with analytics providers. Your consent for analytics cookies can be withdrawn at any time by clearing your browser\'s local storage or contacting us.',
      },
      {
        title: '5. Data Retention',
        body: 'Personal data submitted via our contact form is retained for a maximum of 24 months from the date of last interaction, unless a longer period is required by applicable law or for the pursuit of a legal claim. Analytics data is retained in anonymized form for a maximum of 14 months. After the retention period, data is securely deleted or anonymized.',
      },
      {
        title: '6. International Data Transfers',
        body: 'Some of our service providers (e.g., hosting, analytics) may process data outside the Republic of Panama. Where data is transferred internationally, we ensure that adequate safeguards are in place in accordance with Art. 21 of Ley 81, including data processing agreements that require recipients to maintain equivalent standards of protection.',
      },
      {
        title: '7. Third Parties',
        body: 'We do not sell, rent, or trade your personal data. We may share data with trusted third-party service providers (hosting, scheduling tools, email platforms) solely to deliver our services, under confidentiality agreements. We may also disclose data when required by Panamanian law, judicial order, or regulatory authority.',
      },
      {
        title: '8. Your Rights Under Ley 81',
        body: 'As a data subject under Panama\'s Law 81 of 2019, you have the following rights: RIGHT OF ACCESS — to know what personal data we hold about you; RIGHT OF RECTIFICATION — to correct inaccurate or incomplete data; RIGHT OF CANCELLATION / ERASURE — to request deletion of your data when it is no longer necessary for the purpose collected; RIGHT OF OPPOSITION — to object to the processing of your data in certain circumstances; RIGHT OF PORTABILITY — to receive your data in a structured, machine-readable format. To exercise any of these rights, please send a written request to: privacy@ptytropics.com. We will respond within 15 business days, as required by Ley 81.',
      },
      {
        title: '9. Security Measures',
        body: 'We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction, in accordance with Art. 18 of Ley 81. These measures include encrypted data transmission (HTTPS/TLS), access controls, and periodic security reviews. In the event of a data breach that poses a risk to your rights and freedoms, we will notify the ANTAI (Autoridad Nacional de Transparencia y Acceso a la Información) within 72 hours, and you directly without undue delay.',
      },
      {
        title: '10. Supervisory Authority',
        body: 'The regulatory authority overseeing compliance with Ley 81 in Panama is the ANTAI — Autoridad Nacional de Transparencia y Acceso a la Información. If you believe we have processed your data in violation of Ley 81, you have the right to file a complaint with ANTAI at: www.antai.gob.pa.',
      },
      {
        title: '11. Changes to This Policy',
        body: 'We may update this Privacy & Cookie Policy periodically to reflect changes in our practices or in applicable law. When we do, we will revise the "Last updated" date at the top. We encourage you to review this policy regularly. Continued use of this website following any change constitutes your acknowledgment of the updated policy.',
      },
    ],
  },
  es: {
    bannerTitle: 'Usamos cookies',
    bannerText:
      'Usamos cookies esenciales para operar este sitio y, con tu consentimiento, cookies analíticas para entender cómo los visitantes interactúan con nuestro contenido. Tus datos están protegidos bajo la Ley 81 de 2019 de Panamá.',
    acceptAll: 'Aceptar todo',
    rejectNonEssential: 'Solo esenciales',
    viewPolicy: 'Política de Privacidad',
    modalTitle: 'Política de Privacidad y Cookies',
    close: 'Cerrar',
    lastUpdated: 'Última actualización: marzo 2026 · Regulada por la Ley 81 de 2019 de Panamá',
    sections: [
      {
        title: '1. Quiénes Somos (Responsable del Tratamiento)',
        body: 'PTY Tropics Advisors es un bufete de abogados panameño que actúa como Responsable del Tratamiento de los datos personales recopilados a través de este sitio web. Para cualquier consulta relacionada con sus datos, puede contactarnos en: privacy@ptytropics.com · Ciudad de Panamá, República de Panamá.',
      },
      {
        title: '2. Qué Datos Recopilamos',
        body: 'Podemos recopilar las siguientes categorías de datos personales: (a) Datos de identificación: nombre completo, correo electrónico, país de residencia, proporcionados voluntariamente a través de nuestro formulario de contacto o herramienta de diagnóstico; (b) Datos de comunicación: el contenido de sus mensajes de consulta; (c) Datos técnicos: dirección IP, tipo de navegador, páginas visitadas, duración de la sesión — recopilados automáticamente mediante cookies cuando usted consiente; (d) No se recopilan datos sensibles (salud, números de cuenta financiera, biometría) a través de este sitio.',
      },
      {
        title: '3. Finalidad y Base Legal',
        body: 'Tratamos sus datos con las siguientes finalidades y bases legales conforme a la Ley 81: (a) Para responder a solicitudes de consulta — base legal: ejecución de una relación precontractual (Art. 9, Ley 81); (b) Para mejorar nuestro sitio web y la experiencia del usuario — base legal: su consentimiento explícito (Art. 9, Ley 81); (c) Para cumplir con obligaciones legales y reglamentarias aplicables — base legal: obligación legal (Art. 9, Ley 81). No utilizamos sus datos para elaboración de perfiles automáticos ni para toma de decisiones automatizada.',
      },
      {
        title: '4. Cookies que Utilizamos',
        body: 'COOKIES ESENCIALES (siempre activas): Son estrictamente necesarias para el funcionamiento del sitio web y no pueden desactivarse. Se activan en respuesta a acciones que usted realiza, como preferencias de navegación. COOKIES ANALÍTICAS (con su consentimiento): Podemos usar herramientas como Google Analytics para recopilar información anonimizada sobre cómo los visitantes usan nuestro sitio. Estas cookies nos ayudan a entender el rendimiento de las páginas y el flujo de usuarios. No se comparte información de identificación personal con los proveedores de análisis. Puede retirar su consentimiento en cualquier momento eliminando el almacenamiento local de su navegador o contactándonos.',
      },
      {
        title: '5. Retención de Datos',
        body: 'Los datos personales enviados a través de nuestro formulario de contacto se conservan durante un máximo de 24 meses desde la fecha de la última interacción, salvo que la ley aplicable exija un período mayor o sea necesario para el ejercicio de una acción legal. Los datos analíticos se conservan de forma anonimizada por un máximo de 14 meses. Transcurrido el período de retención, los datos se eliminan de forma segura o se anonimizán.',
      },
      {
        title: '6. Transferencias Internacionales de Datos',
        body: 'Algunos de nuestros proveedores de servicios (p. ej., alojamiento web, analítica) pueden tratar datos fuera de la República de Panamá. Cuando los datos se transfieren internacionalmente, garantizamos la existencia de salvaguardas adecuadas de conformidad con el Art. 21 de la Ley 81, incluidos acuerdos de tratamiento de datos que exigen a los destinatarios mantener niveles equivalentes de protección.',
      },
      {
        title: '7. Terceros',
        body: 'No vendemos, alquilamos ni intercambiamos sus datos personales. Podemos compartir datos con proveedores de servicios de terceros de confianza (alojamiento, herramientas de programación, plataformas de correo electrónico) únicamente para prestar nuestros servicios, bajo acuerdos de confidencialidad. También podemos divulgar datos cuando lo exija la ley panameña, una orden judicial o una autoridad reguladora.',
      },
      {
        title: '8. Sus Derechos bajo la Ley 81',
        body: 'Como titular de datos bajo la Ley 81 de 2019 de Panamá, usted tiene los siguientes derechos: DERECHO DE ACCESO — a conocer qué datos personales tenemos sobre usted; DERECHO DE RECTIFICACIÓN — a corregir datos inexactos o incompletos; DERECHO DE CANCELACIÓN / SUPRESIÓN — a solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad recogida; DERECHO DE OPOSICIÓN — a oponerse al tratamiento de sus datos en determinadas circunstancias; DERECHO DE PORTABILIDAD — a recibir sus datos en un formato estructurado y legible por máquina. Para ejercer cualquiera de estos derechos, envíe una solicitud escrita a: privacy@ptytropics.com. Responderemos en un plazo de 15 días hábiles, conforme a lo exigido por la Ley 81.',
      },
      {
        title: '9. Medidas de Seguridad',
        body: 'Implementamos medidas de seguridad técnicas y organizativas adecuadas para proteger sus datos personales contra el acceso, alteración, divulgación o destrucción no autorizados, de conformidad con el Art. 18 de la Ley 81. Estas medidas incluyen transmisión de datos cifrada (HTTPS/TLS), controles de acceso y revisiones de seguridad periódicas. En caso de una brecha de datos que suponga un riesgo para sus derechos y libertades, notificaremos a la ANTAI (Autoridad Nacional de Transparencia y Acceso a la Información) en un plazo de 72 horas, y a usted directamente sin demora injustificada.',
      },
      {
        title: '10. Autoridad de Control',
        body: 'La autoridad reguladora que supervisa el cumplimiento de la Ley 81 en Panamá es la ANTAI — Autoridad Nacional de Transparencia y Acceso a la Información. Si considera que hemos tratado sus datos en violación de la Ley 81, tiene derecho a presentar una reclamación ante la ANTAI en: www.antai.gob.pa.',
      },
      {
        title: '11. Cambios en esta Política',
        body: 'Podemos actualizar esta Política de Privacidad y Cookies periódicamente para reflejar cambios en nuestras prácticas o en la legislación aplicable. Cuando lo hagamos, revisaremos la fecha de "Última actualización" indicada al inicio. Le recomendamos revisar esta política regularmente. El uso continuado de este sitio web tras cualquier cambio constituye su reconocimiento de la política actualizada.',
      },
    ],
  },
};

export default function CookieConsent() {
  const { isModalOpen, openModal, closeModal } = usePrivacy();
  const [consentGiven, setConsentGiven] = useState(true); // default true, updated in effect
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    // Detect stored consent
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setConsentGiven(false);
    }
    // Detect page language from html[lang] or default
    const htmlLang = document.documentElement.lang;
    if (htmlLang?.startsWith('es')) setLang('es');
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(CONSENT_KEY, 'all');
    setConsentGiven(true);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem(CONSENT_KEY, 'essential');
    setConsentGiven(true);
  };

  const t = copy[lang];

  return (
    <>
      {/* ── Cookie Banner ── */}
      {!consentGiven && (
        <div
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-0 left-0 right-0 z-40 bg-foreground text-white shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              {/* Text */}
              <div className="flex-1">
                <p className="text-sm font-bold mb-1">{t.bannerTitle}</p>
                <p className="text-xs text-white/70 leading-relaxed">{t.bannerText}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => { openModal(); }}
                  className="text-xs underline text-white/60 hover:text-white transition-colors whitespace-nowrap"
                >
                  {t.viewPolicy}
                </button>
                <button
                  onClick={handleEssentialOnly}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-white/40 text-white/80 hover:border-white hover:text-white transition-colors whitespace-nowrap"
                >
                  {t.rejectNonEssential}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent/90 transition-colors whitespace-nowrap"
                >
                  {t.acceptAll}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Privacy Policy Modal ── */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label="Privacy policy"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Modal Panel */}
          <div className="relative w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-background flex flex-col shadow-2xl sm:rounded-none border-t-4 sm:border-t-4 sm:border-l-0 border-accent overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b-2 border-primary shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-heading font-bold text-foreground">
                  {t.modalTitle}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">{t.lastUpdated}</p>
              </div>

              <div className="flex items-center gap-3">
                {/* Language toggle inside modal */}
                <button
                  onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
                  className="text-xs font-bold uppercase tracking-widest px-3 py-1.5 border-2 border-primary rounded-full hover:bg-primary hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'ES' : 'EN'}
                </button>
                <button
                  onClick={closeModal}
                  aria-label="Close privacy policy"
                  className="w-9 h-9 flex items-center justify-center border-2 border-primary text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable body */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-7 flex-1">
              {t.sections.map((section, i) => (
                <div key={i}>
                  <h3 className="text-sm font-heading font-bold text-foreground uppercase tracking-wider mb-2 border-l-4 border-accent pl-3">
                    {section.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}

              {/* Contact callout */}
              <div className="bg-secondary border-2 border-primary p-5 mt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">
                  {lang === 'en' ? 'Exercise Your Rights' : 'Ejerce tus Derechos'}
                </p>
                <p className="text-sm text-foreground font-medium">
                  privacy@ptytropics.com
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {lang === 'en'
                    ? 'Response within 15 business days · Art. 34, Ley 81'
                    : 'Respuesta en 15 días hábiles · Art. 34, Ley 81'}
                </p>
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-6 sm:px-8 py-4 border-t-2 border-primary flex flex-col sm:flex-row gap-3 shrink-0">
              {!consentGiven && (
                <>
                  <button
                    onClick={() => { handleEssentialOnly(); closeModal(); }}
                    className="flex-1 py-3 text-xs font-bold uppercase tracking-wider border-2 border-primary text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {t.rejectNonEssential}
                  </button>
                  <button
                    onClick={() => { handleAcceptAll(); closeModal(); }}
                    className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent/90 transition-colors"
                  >
                    {t.acceptAll}
                  </button>
                </>
              )}
              {consentGiven && (
                <button
                  onClick={closeModal}
                  className="w-full py-3 text-xs font-bold uppercase tracking-wider bg-accent text-white hover:bg-accent/90 transition-colors"
                >
                  {t.close}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
