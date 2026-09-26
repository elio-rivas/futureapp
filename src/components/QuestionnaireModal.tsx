
import { useEffect, useRef, useState } from 'react';
import { questionnaireService } from '../lib/questionnairePrograms';
import { X, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { QuestionnaireForm } from './ParentQuestionnaire';
import {
  onOpenLeadModal,
  type LeadModalPayload,
} from '../lib/leadModalStore';

const SESSION_KEY = 'lead_popup_shown_this_session';

export default function QuestionnaireModal() {
  const { t } = useLanguage();

  const [selectedService, setSelectedService] = useState<
    string | undefined
  >();

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [prefill, setPrefill] = useState<LeadModalPayload>({});
  const [submitted, setSubmitted] = useState(false);

  const triggeredRef = useRef(false);
  const closeTimerRef = useRef<
    ReturnType<typeof setTimeout> | undefined
  >();

  /*
   * Automatically display the questionnaire once per
   * browser tab session, after a delay or when the
   * visitor scrolls down the page.
   */
  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) {
        return;
      }
    } catch {
      // Continue if sessionStorage is unavailable.
    }

    const show = () => {
      if (triggeredRef.current) {
        return;
      }

      triggeredRef.current = true;
      setSubmitted(false);
      setIsOpen(true);

      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // The modal can still open.
      }
    };

    const timer = window.setTimeout(show, 2500);

    const onScroll = () => {
      if (window.scrollY > 120) {
        show();
      }
    };

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  /*
   * Allow buttons throughout the website to open
   * the same questionnaire with a preselected
   * program or an introductory message.
   */
  useEffect(() => {
    return onOpenLeadModal((payload) => {
      triggeredRef.current = true;

      setPrefill(payload);
      setSelectedService(payload.defaultService);
      setSubmitted(false);
      setIsOpen(true);

      try {
        sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        // The modal can still open.
      }
    });
  }, []);

  /*
   * Entrance animation.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const animationFrame = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isOpen]);

  /*
   * Close the modal when Escape is pressed and
   * prevent the page from scrolling while open.
   */
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener(
        'keydown',
        onKeyDown
      );

      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  /*
   * Clean up any pending closing animation.
   */
  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== undefined) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  const close = () => {
    setIsVisible(false);

    if (closeTimerRef.current !== undefined) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      closeTimerRef.current = undefined;
    }, 300);
  };

  /*
   * After successful submission, keep the modal
   * open so parents can read the confirmation.
   *
   * Do not open another form or redirect.
   */
  const handleSuccess = () => {
    setSubmitted(true);
  };

  if (!isOpen) {
    return null;
  }

  const closeLabel =
    t.nav.home === 'Inicio'
      ? 'Cerrar'
      : 'Close';

  const service = questionnaireService(
    selectedService ?? prefill.defaultService
  );

  const isTutoring =
    /After-School Reading and Math Tutoring|lectura y matemáticas/i.test(
      service
    );

  const modalTitle = isTutoring
    ? t.popupModal.tutoringTitle
    : t.popupModal.title;

  const modalSubtitle = isTutoring
    ? t.popupModal.tutoringSubtitle
    : t.popupModal.subtitle;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-start overflow-hidden p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-form-title"
    >
      {/* Backdrop */}

      <div
        className={`absolute inset-0 bg-brand-900/40 backdrop-blur-[2px] transition-opacity duration-300 motion-reduce:transition-none ${
          isVisible
            ? 'opacity-100'
            : 'opacity-0'
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal container */}

      <div
        className={`relative bg-white rounded-2xl shadow-2xl w-full max-w-sm max-h-[75dvh] overflow-y-auto transition-all duration-300 motion-reduce:transition-none motion-reduce:transform-none ${
          isVisible
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-full'
        }`}
      >
        {/* Close button */}

        <button
          type="button"
          onClick={close}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-warm-100/80 hover:bg-warm-200 flex items-center justify-center transition-colors"
          aria-label={closeLabel}
        >
          <X className="w-4 h-4 text-brand-600" />
        </button>

        <div className="p-4 sm:p-5">

          {/* Header */}

          {!submitted && (
            <div className="text-center mb-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-50 border border-brand-100 mb-3">
                <BookOpen className="w-5 h-5 text-brand-600" />
              </div>

              <h2
                id="popup-form-title"
                className="font-display text-xl font-bold text-brand-900 mb-1.5 leading-tight"
              >
                {modalTitle}
              </h2>

              <p className="text-brand-500 text-sm leading-relaxed max-w-sm mx-auto">
                {modalSubtitle}
              </p>
            </div>
          )}

          {/* Keep an accessible title after submission. */}

          {submitted && (
            <h2
              id="popup-form-title"
              className="sr-only"
            >
              {modalTitle}
            </h2>
          )}

          {/*
           * The questionnaire handles validation,
           * Supabase submission and bilingual
           * confirmation.
           *
           * A successful submission does not
           * trigger enrollment or navigation.
           */}

          <QuestionnaireForm
            key={`${
              prefill.defaultService ?? ''
            }:${
              prefill.defaultMessage ?? ''
            }`}
            source="popup_modal"
            defaultService={
              prefill.defaultService ??
              t.questionnaire.serviceOptions[0]
            }
            defaultMessage={prefill.defaultMessage}
            onServiceChange={setSelectedService}
            onSuccess={handleSuccess}
          />

          {/* Privacy notice before submission only */}

          {!submitted && (
            <p className="text-center text-xs text-brand-400 mt-4 leading-relaxed">
              {t.popupModal.privacyNote}
            </p>
          )}

        </div>
      </div>
    </div>
  );
}
