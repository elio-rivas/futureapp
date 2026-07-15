import { CheckCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function WhyFamiliesChoose() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.whyFamiliesChoose.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-5 leading-tight">
            {t.whyFamiliesChoose.title}
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {t.whyFamiliesChoose.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {t.whyFamiliesChoose.reasons.map((reason) => (
            <div
              key={reason.title}
              className="bg-warm-50 rounded-2xl p-6 border border-warm-100 hover:shadow-sm transition-shadow duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                <h3 className="font-bold text-brand-900">{reason.title}</h3>
              </div>
              <p className="text-brand-600 text-sm leading-relaxed pl-8">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
