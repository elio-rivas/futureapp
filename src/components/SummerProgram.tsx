import { BookOpen, UserCheck, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { QuestionnaireForm } from './ParentQuestionnaire';
import { siteImages } from '../lib/images';

export default function SummerProgram() {
  const { t } = useLanguage();

  return (
    <section id="summer-program" className="section-padding bg-warm-50">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.summerProgram.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-4 leading-tight">
            {t.summerProgram.title}
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {t.summerProgram.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={siteImages.summerSection}
                alt="Young reader enjoying a book in a bright, comfortable space"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-900/50 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white font-display text-xl font-bold">
                  {t.summerProgram.quote}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 text-center border border-warm-100">
                <Calendar className="w-5 h-5 text-brand-600 mx-auto mb-2" />
                <div className="text-xs text-brand-500 mb-1">{t.summerProgram.days}</div>
                <div className="font-bold text-brand-900 text-sm">{t.summerProgram.daysValue}</div>
              </div>
              <div className="bg-white rounded-xl p-5 text-center border border-warm-100">
                <Clock className="w-5 h-5 text-brand-600 mx-auto mb-2" />
                <div className="text-xs text-brand-500 mb-1">{t.summerProgram.time}</div>
                <div className="font-bold text-brand-900 text-sm">{t.summerProgram.timeValue}</div>
              </div>
              <div className="bg-white rounded-xl p-5 text-center border border-warm-100">
                <BookOpen className="w-5 h-5 text-brand-600 mx-auto mb-2" />
                <div className="text-xs text-brand-500 mb-1">{t.summerProgram.duration}</div>
                <div className="font-bold text-brand-900 text-sm">{t.summerProgram.durationValue}</div>
              </div>
              <div className="bg-white rounded-xl p-5 text-center border border-warm-100">
                <UserCheck className="w-5 h-5 text-brand-600 mx-auto mb-2" />
                <div className="text-xs text-brand-500 mb-1">{t.summerProgram.groupSize}</div>
                <div className="font-bold text-brand-900 text-sm">{t.summerProgram.groupSizeValue}</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg text-brand-900 mb-3">{t.summerProgram.whatStudentsWork}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {t.summerProgram.skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" />
                    <span className="text-brand-700 text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <a
                href="https://form.jotform.com/261240438813049"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                {t.summerProgram.requestPlacement}
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-sm text-brand-600 font-medium mt-3">{t.summerProgram.limitedSpots}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {t.summerProgram.benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-7 text-center border border-warm-100 hover:shadow-sm transition-shadow duration-300"
            >
              <h4 className="font-bold text-lg text-brand-900 mb-2">{b.title}</h4>
              <p className="text-brand-600 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div id="summer-lead-form" className="mt-20 max-w-2xl mx-auto">
          <div className="bg-brand-800 rounded-2xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white rounded-full translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-36 h-36 bg-white rounded-full -translate-x-1/3 translate-y-1/3" />
            </div>
            <div className="relative">
              <div className="text-center mb-6">
                <span className="inline-block text-accent-400 font-semibold text-xs tracking-wider uppercase mb-2">
                  {t.summerProgram.badge}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                  {t.questionnaire.title}
                </h3>
                <p className="text-brand-200 text-sm leading-relaxed max-w-md mx-auto">
                  {t.questionnaire.subtitle}
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 sm:p-7 shadow-lg">
                <QuestionnaireForm
                  source="summer_section_embedded"
                  defaultService={t.questionnaire.serviceOptions[0]}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
