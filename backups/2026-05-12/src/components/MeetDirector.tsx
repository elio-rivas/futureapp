import { useLanguage } from '../i18n/LanguageContext';

export default function MeetDirector() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/8613312/pexels-photo-8613312.jpeg?auto=compress&cs=tinysrgb&w=700&h=600&fit=crop"
              alt="Educator working closely with a student"
              className="rounded-2xl shadow-lg w-full h-80 lg:h-[420px] object-cover"
            />
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
