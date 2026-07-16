import { Calendar, Clock, UserCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ProgramStructure() {
  const { t } = useLanguage();

  return (
    <section id="program-structure" className="section-padding bg-brand-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-accent-400 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-400 rounded-full translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="container-max relative">
        <div className="text-center mb-16">
          <span className="inline-block text-accent-400 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.programStructure.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            {t.programStructure.title}
          </h2>
          <p className="text-lg text-brand-200/80 max-w-3xl mx-auto leading-relaxed">
            {t.programStructure.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-16">
          <div className="w-52 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
            <Calendar className="w-5 h-5 text-accent-400 mx-auto mb-2" />
            <div className="text-white font-bold text-sm">{t.programStructure.days}</div>
          </div>
          <div className="w-52 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
            <Clock className="w-5 h-5 text-accent-400 mx-auto mb-2" />
            <div className="text-white font-bold text-sm">{t.programStructure.time}</div>
          </div>
          <div className="w-52 bg-white/[0.06] backdrop-blur-sm border border-white/10 rounded-xl p-5 text-center">
            <UserCheck className="w-5 h-5 text-accent-400 mx-auto mb-2" />
            <div className="text-white font-bold text-sm">{t.programStructure.format}</div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          {t.programStructure.steps.map((step, index) => (
            <div key={step.title} className="flex gap-5 sm:gap-6 mb-8 last:mb-0">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  {index + 1}
                </div>
                {index < t.programStructure.steps.length - 1 && (
                  <div className="w-px h-full bg-white/15 mt-3" />
                )}
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-lg text-white mb-2">{step.title}</h3>
                <p className="text-brand-200/75 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
