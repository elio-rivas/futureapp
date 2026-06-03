import { ArrowRight, Calendar, Clock, BookOpen, UserCheck, CheckCircle, Target, BarChart3, MessageSquare, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import QuestionnaireModal from '../components/QuestionnaireModal';
import { QuestionnaireForm } from '../components/ParentQuestionnaire';

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-warm-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-warm-50 transition-colors"
      >
        <span className="font-semibold text-brand-900 pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-brand-500 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 bg-white">
          <p className="text-brand-600 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function SummerProgramPage() {
  const { t } = useLanguage();

  return (
    <>
      <QuestionnaireModal />

      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800&fit=crop"
            alt="One-on-one tutoring session"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/85 via-brand-900/75 to-brand-950/90" />
        </div>

        <div className="relative container-max px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="inline-block text-accent-400 font-semibold text-sm tracking-wider uppercase mb-4">
              {t.summerProgramPage.limitedSpots}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              {t.summerProgramPage.heroTitle}
            </h1>
            <p className="text-xl text-brand-200/90 mb-8 leading-relaxed max-w-2xl mx-auto">
              {t.summerProgramPage.heroSubtitle}
            </p>
            <a
              href="https://form.jotform.com/261240438813049"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              {t.summerProgramPage.enrollNow}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Program overview */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-6 leading-tight">
                {t.summerProgramPage.programTitle}
              </h2>
              <p className="text-lg text-brand-800 font-medium mb-4">
                {t.summerProgramPage.headStart}
              </p>
              <p className="text-brand-600 leading-relaxed text-lg">
                {t.summerProgramPage.description1}{' '}
                <span className="text-brand-800 font-semibold">{t.summerProgramPage.descriptionHighlight}</span>
                {t.summerProgramPage.description2}
              </p>
            </div>

            <div className="bg-warm-50 rounded-2xl p-8 border border-warm-100">
              <h3 className="font-bold text-xl text-brand-900 mb-6">
                {t.summerProgramPage.programDetails}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <Calendar className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wide">{t.summerProgram.days}</div>
                    <div className="text-brand-900 font-medium">{t.summerProgramPage.daysValue}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wide">{t.summerProgram.time}</div>
                    <div className="text-brand-900 font-medium">{t.summerProgram.timeValue}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <BookOpen className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wide">{t.summerProgram.duration}</div>
                    <div className="text-brand-900 font-medium">{t.summerProgram.durationValue}</div>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <UserCheck className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-brand-600 uppercase tracking-wide">{t.summerProgram.groupSize}</div>
                    <div className="text-brand-900 font-medium">{t.summerProgramPage.groupSizeValue}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for + Why it works */}
      <section className="section-padding bg-warm-50">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-brand-600" />
                <h3 className="font-display text-2xl font-bold text-brand-900">
                  {t.summerProgramPage.whoIsItFor}
                </h3>
              </div>
              <ul className="space-y-3">
                {t.summerProgramPage.targetStudents.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success-600 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="w-5 h-5 text-brand-600" />
                <h3 className="font-display text-2xl font-bold text-brand-900">
                  {t.summerProgramPage.whyTitle}
                </h3>
              </div>
              <ul className="space-y-3">
                {t.summerProgramPage.whyReasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-700">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment + Results */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-50 rounded-2xl p-8 border border-brand-100">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-lg text-brand-900">
                  {t.summerProgramPage.assessmentTitle}
                </h3>
              </div>
              <p className="text-brand-600 leading-relaxed">
                {t.summerProgramPage.assessmentDesc}
              </p>
            </div>

            <div className="bg-success-50 rounded-2xl p-8 border border-success-100">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-success-700" />
                <h3 className="font-bold text-lg text-brand-900">
                  {t.summerProgramPage.resultsTitle}
                </h3>
              </div>
              <p className="text-brand-600 leading-relaxed">
                {t.summerProgramPage.resultsDesc}
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-16">
            <h3 className="font-display text-2xl font-bold text-brand-900 mb-6 text-center">
              {t.summerProgram.whatStudentsWork}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.summerProgram.skills.map((skill) => (
                <div key={skill} className="bg-warm-50 rounded-xl p-5 text-center border border-warm-100">
                  <CheckCircle className="w-5 h-5 text-brand-600 mx-auto mb-2" />
                  <span className="text-brand-800 font-medium text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-warm-50">
        <div className="container-max">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-8 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {t.summerProgramPage.faq.map((item) => (
                <FAQItem key={item.q} question={item.q} answer={item.a} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Inline Questionnaire */}
      <section className="section-padding bg-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-white rounded-full -translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container-max relative">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-accent-400 font-semibold text-sm tracking-wider uppercase mb-3">
                {t.questionnaire.badge}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                {t.questionnaire.title}
              </h2>
              <p className="text-brand-200 text-lg leading-relaxed">
                {t.questionnaire.subtitle}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-2xl">
              <QuestionnaireForm
                source="summer_page_inline"
                defaultService={t.questionnaire.serviceOptions[0]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-brand-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="container-max relative text-center">
          <p className="text-xl sm:text-2xl font-bold text-white mb-4 leading-relaxed max-w-2xl mx-auto">
            {t.summerProgramPage.spotsLimited}
          </p>
          <a
            href="https://form.jotform.com/261240438813049"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white px-10 py-5 rounded-xl text-xl font-bold transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.summerProgramPage.enrollNow}
            <ArrowRight className="w-6 h-6" />
          </a>
        </div>
      </section>
    </>
  );
}
