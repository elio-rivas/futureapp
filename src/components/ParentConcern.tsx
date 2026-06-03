import { AlertCircle } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { siteImages } from '../lib/images';

export default function ParentConcern() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t.parentConcern.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-6 leading-tight">
              {t.parentConcern.title}
            </h2>
            <p className="text-lg text-brand-700/80 leading-relaxed mb-8">
              {t.parentConcern.subtitle}
            </p>

            <ul className="space-y-4 mb-8">
              {t.parentConcern.concerns.map((concern) => (
                <li key={concern} className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <span className="text-brand-800/90">{concern}</span>
                </li>
              ))}
            </ul>

            <div className="border-l-4 border-accent-400 pl-5 py-2">
              <p className="text-brand-700 font-medium italic leading-relaxed">
                {t.parentConcern.reassurance}
              </p>
            </div>
          </div>

          <div className="relative">
            <img
              src={siteImages.parentConcern}
              alt="Child quietly focused while reading"
              className="rounded-2xl shadow-lg w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-5 shadow-lg border border-warm-100 max-w-xs hidden md:block">
              <p className="text-brand-800 font-semibold text-sm leading-relaxed">
                {t.parentConcern.ctaText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
