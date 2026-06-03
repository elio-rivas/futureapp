import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function RightFit() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t.rightFit.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-5 leading-tight">
              {t.rightFit.title}
            </h2>
            <p className="text-lg text-brand-600 leading-relaxed">
              {t.rightFit.subtitle}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-warm-100 shadow-sm mb-8">
            <ul className="space-y-4">
              {t.rightFit.fits.map((fit) => (
                <li key={fit} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                  <span className="text-brand-800">{fit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-brand-50 rounded-xl p-6 border border-brand-100 mb-10">
            <p className="text-brand-700 text-sm leading-relaxed">
              {t.rightFit.notFit}
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://form.jotform.com/261240438813049"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t.rightFit.ctaText}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
