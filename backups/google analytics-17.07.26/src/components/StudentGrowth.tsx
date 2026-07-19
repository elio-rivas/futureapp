import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function StudentGrowth() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.studentGrowth.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-5 leading-tight">
            {t.studentGrowth.title}
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {t.studentGrowth.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {t.studentGrowth.stories.map((story) => (
            <div
              key={story.label}
              className="bg-white rounded-2xl p-7 border border-warm-100 shadow-sm"
            >
              <div className="text-xs font-bold text-accent-600 uppercase tracking-wider mb-4">
                {story.label}
              </div>

              <div className="space-y-4">
                <div className="bg-error-50 rounded-lg px-4 py-3 border border-error-100">
                  <div className="text-xs font-semibold text-error-600 uppercase mb-1">Before</div>
                  <p className="text-sm text-brand-800">{story.before}</p>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-4 h-4 text-brand-400 rotate-90" />
                </div>

                <div className="bg-success-50 rounded-lg px-4 py-3 border border-success-100">
                  <div className="text-xs font-semibold text-success-700 uppercase mb-1">After</div>
                  <p className="text-sm text-brand-800">{story.after}</p>
                </div>
              </div>

              <div className="mt-4 text-xs text-brand-500 font-medium text-center">
                {story.timeframe}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-brand-500 italic">
          {t.studentGrowth.note}
        </p>
      </div>
    </section>
  );
}
