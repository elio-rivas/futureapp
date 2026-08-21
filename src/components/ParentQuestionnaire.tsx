import { useState, useRef } from 'react';
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { submitLead } from '../lib/supabase';
import { trackGenerateLead, trackFormSubmit } from '../lib/analytics';

const RATE_LIMIT_KEY = 'lead_form_last_submit';
const RATE_LIMIT_MS = 60_000;

interface QuestionnaireFormProps {
  source?: string;
  defaultService?: string;
  defaultMessage?: string;
  onSuccess?: () => void;
  showEnrollmentCta?: boolean;
  compact?: boolean;
}

export function QuestionnaireForm({ source = 'summer_questionnaire', defaultService = '', defaultMessage = '', onSuccess, showEnrollmentCta = true, compact = false }: QuestionnaireFormProps) {
  const { locale, t } = useLanguage();
  const [formData, setFormData] = useState({
    parent_name: '',
    phone: '',
    email: '',
    child_age_grade: '',
    main_concern: '',
    interested_service: defaultService,
    message: defaultMessage,
  });
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const renderedAt = useRef(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setStatus('success');
      return;
    }

    try {
      const lastSubmit = localStorage.getItem(RATE_LIMIT_KEY);
      if (lastSubmit && Date.now() - parseInt(lastSubmit, 10) < RATE_LIMIT_MS) {
        setStatus('success');
        return;
      }
    } catch { /* localStorage unavailable */ }

    setStatus('submitting');
    trackFormSubmit(source, source);

    try {
      await submitLead({
        ...formData,
        source,
        website: honeypot,
        form_rendered_at: renderedAt.current,
      });
      setStatus('success');
      trackGenerateLead({ source, service: formData.interested_service });
      try { localStorage.setItem(RATE_LIMIT_KEY, Date.now().toString()); } catch { /* noop */ }
      onSuccess?.();
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-8">
        <CheckCircle className="w-14 h-14 text-success-500 mx-auto mb-4" />
        <h3 className="font-display text-2xl font-bold text-brand-900 mb-3">
          {t.questionnaire.successTitle}
        </h3>
        <p className="text-brand-600 leading-relaxed mb-6">
          {t.questionnaire.successMessage}
        </p>
        {showEnrollmentCta && (
          <div className="bg-warm-50 border border-warm-200 rounded-xl p-5">
            <p className="text-brand-600 text-sm mb-3">{t.questionnaire.successCtaNote}</p>
            <a
              href="https://form.jotform.com/261240438813049"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-5 py-3 rounded-xl font-bold transition-all hover:shadow-lg"
            >
              {t.questionnaire.successCta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={compact ? 'questionnaire-compact' : undefined}>
      {/* Honeypot -- invisible to real users, bots fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor={`${source}-website`}>Website</label>
        <input
          id={`${source}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${source}-name`} className="block text-sm font-medium text-brand-800 mb-1.5">
            {t.questionnaire.parentName} *
          </label>
          <input
            id={`${source}-name`}
            type="text"
            required
            placeholder={t.questionnaire.parentNamePlaceholder}
            value={formData.parent_name}
            onChange={(e) => setFormData({ ...formData, parent_name: e.target.value })}
            className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
          />
        </div>
        <div>
          <label htmlFor={`${source}-phone`} className="block text-sm font-medium text-brand-800 mb-1.5">
            {t.questionnaire.phone} *
          </label>
          <input
            id={`${source}-phone`}
            type="tel"
            required
            placeholder={t.questionnaire.phonePlaceholder}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${source}-email`} className="block text-sm font-medium text-brand-800 mb-1.5">
            {t.questionnaire.email} *
          </label>
          <input
            id={`${source}-email`}
            type="email"
            required
            placeholder={t.questionnaire.emailPlaceholder}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
          />
        </div>
        <div>
          <label htmlFor={`${source}-age`} className="block text-sm font-medium text-brand-800 mb-1.5">
            {t.questionnaire.childAgeGrade}
          </label>
          <input
            id={`${source}-age`}
            type="text"
            placeholder={t.questionnaire.childAgeGradePlaceholder}
            value={formData.child_age_grade}
            onChange={(e) => setFormData({ ...formData, child_age_grade: e.target.value })}
            className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor={`${source}-concern`} className="block text-sm font-medium text-brand-800 mb-1.5">
          {t.questionnaire.mainConcern}
        </label>
        <input
          id={`${source}-concern`}
          type="text"
          placeholder={t.questionnaire.mainConcernPlaceholder}
          value={formData.main_concern}
          onChange={(e) => setFormData({ ...formData, main_concern: e.target.value })}
          className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
        />
      </div>

      <div className="mb-4">
        <label htmlFor={`${source}-service`} className="block text-sm font-medium text-brand-800 mb-1.5">
          {t.questionnaire.interestedService}
        </label>
        <select
          id={`${source}-service`}
          value={formData.interested_service}
          onChange={(e) => setFormData({ ...formData, interested_service: e.target.value })}
          className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 bg-warm-50"
        >
          <option value="">--</option>
          {t.questionnaire.serviceOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor={`${source}-message`} className="block text-sm font-medium text-brand-800 mb-1.5">
          {t.questionnaire.message}
        </label>
        <textarea
          id={`${source}-message`}
          rows={compact ? 2 : 3}
          placeholder={t.questionnaire.messagePlaceholder}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all resize-none text-brand-900 placeholder:text-brand-400 bg-warm-50"
        />
      </div>

      {status === 'error' && (
        <p className="text-error-600 text-sm mb-4 font-medium">
          {locale === 'es'
            ? 'Algo salió mal. Inténtalo de nuevo o llámanos directamente.'
            : 'Something went wrong. Please try again or call us directly.'}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 disabled:bg-accent-400 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg disabled:cursor-not-allowed"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            {t.questionnaire.submitting}
          </>
        ) : (
          <>
            {t.questionnaire.submit}
            <ArrowRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}

export default function ParentQuestionnaire() {
  const { t } = useLanguage();

  return (
    <section id="questionnaire" className="section-padding bg-brand-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-max relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <span className="inline-block text-accent-400 font-semibold text-sm tracking-wider uppercase mb-3">
              {t.questionnaire.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              {t.questionnaire.title}
            </h2>
            <p className="text-brand-200 text-lg leading-relaxed">
              {t.questionnaire.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
            <QuestionnaireForm
              source="homepage_inline"
              defaultService={t.questionnaire.serviceOptions[0]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
