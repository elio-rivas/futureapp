import { ArrowRight, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

export default function CTA() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-brand-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-max relative text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
          {t.cta.title}
        </h2>
        <p className="text-brand-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.cta.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => openLeadModal()}
            className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.cta.enrollNow}
            <ArrowRight className="w-5 h-5" />
          </button>
          <a
            href="tel:4073019979"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all"
          >
            <Phone className="w-5 h-5" />
            {t.cta.callUs}
          </a>
        </div>
      </div>
    </section>
  );
}
