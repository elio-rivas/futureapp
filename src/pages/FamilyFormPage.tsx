import { useEffect } from 'react';
import { BookOpen, Globe, MessageCircle } from 'lucide-react';
import { QuestionnaireForm } from '../components/ParentQuestionnaire';
import { useLanguage } from '../i18n/LanguageContext';

const LOGO_URL =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

export default function FamilyFormPage() {
  const { locale, setLocale, t } = useLanguage();

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get('lang');
    if (requestedLocale === 'en' || requestedLocale === 'es') setLocale(requestedLocale);
  }, [setLocale]);

  const chooseLanguage = (language: 'en' | 'es') => {
    setLocale(language);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', language);
    window.history.replaceState({}, '', url);
  };

  const copy = locale === 'es'
    ? {
        eyebrow: 'Consulta para Padres',
        title: 'Ayuda a Tu Hijo a Avanzar con Confianza',
        subtitle: 'Comparte algunos detalles y nuestro equipo se comunicará contigo para hablar sobre el apoyo adecuado para tu familia.',
        share: 'Compartir por WhatsApp',
        shareMessage: '¡Hola! Para ayudarnos a conocer las necesidades de su hijo(a), complete este breve formulario:',
        language: 'Seleccionar idioma',
      }
    : {
        eyebrow: 'Parent Inquiry',
        title: 'Help Your Child Move Forward with Confidence',
        subtitle: 'Share a few details and our team will reach out to discuss the right support for your family.',
        share: 'Share via WhatsApp',
        shareMessage: 'Hello! To help us understand your child’s needs, please complete this short form:',
        language: 'Select language',
      };

  const shareUrl = new URL(window.location.href);
  shareUrl.searchParams.set('lang', locale);
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${copy.shareMessage}\n${shareUrl.toString()}`)}`;

  return (
    <main className="min-h-screen bg-brand-900 px-2 py-2 sm:px-4 sm:py-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between gap-2 text-white sm:mb-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full bg-white sm:h-11 sm:w-11">
              <img src={LOGO_URL} alt="Future Foundations Education" className="h-full w-full object-cover scale-[1.15]" />
            </div>
            <div className="leading-tight">
              <p className="font-display text-sm font-bold sm:text-base">Future Foundations</p>
              <p className="text-[9px] font-semibold tracking-widest text-brand-300 sm:text-[10px]">EDUCATION</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 rounded-xl bg-white/10 p-1" aria-label={copy.language}>
            <Globe className="hidden h-4 w-4 text-brand-200 sm:block" aria-hidden="true" />
            {(['en', 'es'] as const).map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => chooseLanguage(language)}
                className={`rounded-lg px-2 py-1.5 text-xs font-bold transition-colors sm:px-3 sm:py-2 sm:text-sm ${
                  locale === language ? 'bg-white text-brand-900' : 'text-white hover:bg-white/10'
                }`}
                aria-pressed={locale === language}
              >
                {language === 'en' ? 'English' : 'Español'}
              </button>
            ))}
          </div>
        </div>

        <section className="rounded-xl bg-white p-3 shadow-2xl sm:rounded-2xl sm:p-6">
          <div className="mb-3 text-center sm:mb-5">
            <div className="mx-auto mb-2 hidden h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 sm:flex">
              <BookOpen className="h-5 w-5 text-brand-600" aria-hidden="true" />
            </div>
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.14em] text-accent-600 sm:text-xs">{copy.eyebrow}</p>
            <h1 className="font-display text-xl font-bold leading-tight text-brand-900 sm:text-3xl">{copy.title}</h1>
            <p className="mx-auto mt-1.5 max-w-lg text-xs leading-snug text-brand-500 sm:mt-3 sm:text-base sm:leading-relaxed">{copy.subtitle}</p>
          </div>

          <QuestionnaireForm
            key={locale}
            source="whatsapp_shared_form"
            defaultService={t.questionnaire.serviceOptions[0]}
            showEnrollmentCta={false}
            compact
          />

          <div className="mt-3 border-t border-warm-200 pt-3 text-center sm:mt-5 sm:pt-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#1fbd5a] hover:shadow-lg sm:mb-4 sm:w-auto sm:py-3.5 sm:text-base"
            >
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              {copy.share}
            </a>
            <p className="mt-1 text-[10px] leading-snug text-brand-400 sm:mt-3 sm:text-xs sm:leading-relaxed">{t.popupModal.privacyNote}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
