import { useLanguage } from '../i18n/LanguageContext';

export default function MeetDirector() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative flex items-center justify-center">
            <div className="w-72 h-96 sm:w-80 sm:h-[440px] lg:w-96 lg:h-[500px] rounded-[50%] overflow-hidden shadow-xl border-4 border-white ring-1 ring-brand-100">
              <img
                src="/public_assets/Screenshot_2026-05-13_at_5.43.11_PM.png"
                alt="Academic Director"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div>
            <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t.meetDirector.badge}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-6 leading-tight">
              {t.meetDirector.title}
            </h2>

            <p className="text-brand-700 leading-relaxed mb-5">
              {t.meetDirector.intro}
            </p>
            <p className="text-brand-600 leading-relaxed mb-5">
              {t.meetDirector.philosophy}
            </p>
            <p className="text-brand-600 leading-relaxed mb-8">
              {t.meetDirector.approach}
            </p>

            <blockquote className="border-l-4 border-accent-400 pl-5 py-2">
              <p className="text-brand-800 font-display text-lg italic leading-relaxed">
                {t.meetDirector.quote}
              </p>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
