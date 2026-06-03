import { useEffect, useState, useRef } from 'react';
import { X, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { QuestionnaireForm } from './ParentQuestionnaire';

const SESSION_KEY = 'lead_popup_shown_this_session';

export default function QuestionnaireModal() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    // Only suppress if already shown in this browser tab session
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch { /* sessionStorage unavailable -- show popup */ }

    const show = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setIsOpen(true);
      try { sessionStorage.setItem(SESSION_KEY, '1'); } catch { /* noop */ }
    };

    const timer = window.setTimeout(show, 2500);

    const onScroll = () => {
      if (window.scrollY > 120) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsVisible(true));
      });
    }
  }, [isOpen]);

  const close = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-form-title"
    >
      <div
        className={`absolute inset-0 bg-brand-900/40 backdrop-blur-[2px] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`relative bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl w-full sm:max-w-md max-h-[85vh] sm:max-h-[90vh] overflow-y-auto transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 sm:translate-y-4'}`}
      >
        <button
          onClick={close}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-warm-100/80 hover:bg-warm-200 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-brand-600" />
        </button>

        <div className="p-5 sm:p-7">
          <div className="text-center mb-5">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 border border-brand-100 mb-3">
              <BookOpen className="w-5 h-5 text-brand-600" />
            </div>
            <h2
              id="popup-form-title"
              className="font-display text-xl sm:text-2xl font-bold text-brand-900 mb-1.5 leading-tight"
            >
              {t.popupModal.title}
            </h2>
            <p className="text-brand-500 text-sm leading-relaxed max-w-sm mx-auto">
              {t.popupModal.subtitle}
            </p>
          </div>

          <QuestionnaireForm
            source="popup_modal"
            defaultService={t.questionnaire.serviceOptions[0]}
            onSuccess={() => {
              setTimeout(close, 4000);
            }}
          />

          <p className="text-center text-xs text-brand-400 mt-4 leading-relaxed">
            {t.popupModal.privacyNote}
          </p>
        </div>
      </div>
    </div>
  );
}