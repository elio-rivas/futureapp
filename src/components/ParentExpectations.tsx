import { ClipboardCheck, MessageSquare, BarChart3, Home, Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [ClipboardCheck, MessageSquare, BarChart3, Home, Star];

export default function ParentExpectations() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.parentExpectations.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-5 leading-tight">
            {t.parentExpectations.title}
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {t.parentExpectations.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {t.parentExpectations.expectations.map((item, index) => {
            const Icon = icons[index];
            return (
              <div
                key={item.title}
                className="bg-warm-50 rounded-2xl p-7 border border-warm-100 hover:shadow-sm transition-shadow duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-100 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-700" />
                </div>
                <h3 className="font-bold text-lg text-brand-900 mb-2">{item.title}</h3>
                <p className="text-brand-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
