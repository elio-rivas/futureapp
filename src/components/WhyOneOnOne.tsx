import { UserCheck, Target, TrendingUp, Shield } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const icons = [UserCheck, Target, TrendingUp, Shield];

export default function WhyOneOnOne() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.whyOneOnOne.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-5 leading-tight">
            {t.whyOneOnOne.title}
          </h2>
          <p className="text-lg text-brand-600 max-w-3xl mx-auto leading-relaxed">
            {t.whyOneOnOne.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {t.whyOneOnOne.points.map((point, index) => {
            const Icon = icons[index];
            return (
              <div
                key={point.title}
                className="bg-warm-50 rounded-2xl p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 border border-warm-100"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-100 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand-700" />
                </div>
                <h3 className="font-bold text-xl text-brand-900 mb-3">{point.title}</h3>
                <p className="text-brand-600 leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
