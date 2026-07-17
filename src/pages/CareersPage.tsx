import { Briefcase, MapPin, Clock, CheckCircle, Mail, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function CareersPage() {
  const { t } = useLanguage();
  const c = t.careersPage;

  return (
    <div className="pt-20 bg-white">
      {/* HERO */}
      <section className="bg-brand-900 pt-16 pb-14">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-accent-500/20 text-accent-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-5">
              <Sparkles className="w-4 h-4" />
              {c.heroBadge}
            </span>
            <h1 className="font-display font-bold text-5xl md:text-6xl text-white tracking-tight mb-4 uppercase">
              {c.heroTitle}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="h-px bg-accent-400 w-8" />
              <div className="h-px bg-accent-400 w-8" />
            </div>
            <p className="text-brand-200 text-lg leading-relaxed">
              {c.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section className="bg-warm-50 py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px bg-accent-400 w-12" />
              <h2 className="font-display font-bold text-3xl text-brand-900 uppercase tracking-wide">
                {c.openPositionsTitle}
              </h2>
              <div className="h-px bg-accent-400 w-12" />
            </div>
            <p className="text-brand-600 font-medium max-w-2xl mx-auto">
              {c.openPositionsSubtitle}
            </p>
          </div>

          {/* Job card */}
          <div className="bg-white rounded-2xl border-2 border-brand-100 overflow-hidden max-w-5xl mx-auto">
            <div className="bg-brand-900 px-7 py-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-2xl uppercase tracking-wide">{c.jobTitle}</h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-brand-200">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-accent-400" />
                      {c.jobType}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-accent-400" />
                      {c.jobLocation}
                    </span>
                  </div>
                </div>
                <Briefcase className="w-10 h-10 text-accent-400 hidden sm:block" />
              </div>
            </div>

            <div className="p-7 space-y-8">
              <p className="text-brand-700 leading-relaxed">{c.jobSummary}</p>

              {/* Responsibilities */}
              <div>
                <h4 className="font-bold text-brand-900 text-sm uppercase tracking-wider mb-3">
                  {c.responsibilitiesTitle}
                </h4>
                <ul className="space-y-2.5">
                  {c.responsibilities.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
                      <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Requirements */}
              <div>
                <h4 className="font-bold text-brand-900 text-sm uppercase tracking-wider mb-3">
                  {c.requirementsTitle}
                </h4>
                <ul className="space-y-2.5">
                  {c.requirements.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
                      <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="font-bold text-brand-900 text-sm uppercase tracking-wider mb-3">
                  {c.benefitsTitle}
                </h4>
                <ul className="space-y-2.5">
                  {c.benefits.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-brand-700">
                      <CheckCircle className="w-4 h-4 text-success-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to apply */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-6">
                <h4 className="font-bold text-brand-900 text-sm uppercase tracking-wider mb-2">
                  {c.applyTitle}
                </h4>
                <p className="text-brand-700 text-sm leading-relaxed mb-4">{c.applyDesc}</p>
                <div className="flex items-center gap-2 text-sm text-brand-600 font-medium">
                  <Mail className="w-4 h-4 text-accent-500" />
                  {c.applyEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
