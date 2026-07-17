import {
  Calendar, ClipboardList, TrendingUp, FileText,
  ArrowRight, CreditCard, Award, BarChart2,
  Check, BookOpen, Map, Sparkles, Compass, Download, Star,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

const TUITION_IMAGE = '/images/tuition/image copy copy.png';

const benefitIcons = [BarChart2, Map, TrendingUp, BookOpen, FileText, CreditCard];
const nweaStepIcons = [ClipboardList, BarChart2, Compass, TrendingUp];
const processStepIcons = [ClipboardList, BarChart2, Map, BookOpen, Award];

export default function HomeschoolPlansPage() {
  const { t } = useLanguage();
  const p = t.tuitionPage;
  const hs = p.homeschoolPlans;

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
         1. HERO
      ════════════════════════════════════════════════════════════════ */}
      <section className="pt-[68px] bg-[#f7f4ef] overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 2xl:px-12">
          <div className="grid lg:grid-cols-2 items-center gap-8 min-h-[260px]">
            <div className="py-10 lg:py-12">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight mb-3">
                {hs.heroTitle}
              </h1>
              <p className="text-brand-600 text-base leading-relaxed mb-6 max-w-lg">
                {hs.heroSubtitle}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => openLeadModal()}
                  className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  {hs.heroPrimaryBtn}
                </button>
                <button
                  onClick={() => openLeadModal()}
                  className="inline-flex items-center gap-2 border-2 border-brand-300 text-brand-800 hover:bg-brand-50 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
                >
                  <Download className="w-4 h-4" />
                  {hs.heroSecondaryBtn}
                </button>
              </div>
            </div>

            <div className="hidden lg:flex items-end justify-center">
              <div
                className="relative overflow-hidden shadow-xl"
                style={{
                  width: '420px',
                  height: '380px',
                  borderRadius: '50% 50% 48% 48%',
                  border: '6px solid #e8e0d4',
                }}
              >
                <img
                  src={TUITION_IMAGE}
                  alt="Tutor working with student"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 18%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         2. KEY BENEFITS
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {hs.benefitsTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hs.benefits.map((b, i) => {
              const Icon = benefitIcons[i];
              return (
                <div
                  key={i}
                  className="bg-warm-50 rounded-2xl p-6 border border-warm-100 hover:shadow-lg hover:border-accent-300 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <h3 className="font-bold text-brand-900 text-base mb-1">{b.title}</h3>
                  <p className="text-brand-600 text-sm leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         3. CHOOSE YOUR PLAN
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-50 border-t border-warm-100">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {hs.plansTitle}
            </h2>
            <p className="text-brand-600 max-w-2xl mx-auto">{hs.plansSubtitle}</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            {hs.plans.map((plan, i) => {
              const isPopular = plan.popular;
              const isPremium = i === 2;
              return (
                <div
                  key={i}
                  className={`relative flex flex-col rounded-2xl bg-white border-2 transition-all duration-300 hover:shadow-xl ${
                    isPopular
                      ? 'border-green-500 lg:scale-105 lg:-translate-y-2 shadow-lg'
                      : isPremium
                      ? 'border-accent-500 lg:scale-105 lg:-translate-y-2 shadow-lg'
                      : 'border-warm-200'
                  }`}
                >
                  {/* Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                      <Star className="w-3.5 h-3.5 fill-white" />
                      Most Popular
                    </div>
                  )}
                  {isPremium && !isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                      Premium
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    <h3 className="font-display font-bold text-xl text-brand-900 mb-1">{plan.name}</h3>
                    <p className="text-accent-600 font-display italic text-sm mb-4">{plan.tagline}</p>

                    {/* Price block */}
                    <div className="bg-warm-50 rounded-xl p-4 mb-5 border border-warm-100">
                      <div className="mb-3">
                        <p className="text-xs uppercase tracking-wider text-brand-500 mb-0.5">Annual Investment</p>
                        <p className="font-display font-bold text-3xl text-brand-900">{plan.annual}</p>
                      </div>
                      <div className="pt-3 border-t border-warm-200">
                        <p className="text-xs uppercase tracking-wider text-brand-500 mb-0.5">Initial Enrollment</p>
                        <p className="font-bold text-lg text-brand-800">{plan.registration}</p>
                      </div>
                    </div>

                    <p className="text-brand-600 text-sm leading-relaxed mb-4">{plan.description}</p>

                    {/* Features */}
                    <div className="flex-1 mb-6">
                      {i > 0 && (
                        <p className="text-xs font-bold uppercase tracking-wider text-brand-400 mb-3">
                          {i === 1 ? hs.everythingInPrefix : hs.everythingInAdvantagePrefix}
                        </p>
                      )}
                      <ul className="space-y-2.5">
                        {plan.features.map((f, j) => (
                          <li key={j} className="flex items-start gap-2.5">
                            <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                              isPopular ? 'bg-green-100' : isPremium ? 'bg-accent-100' : 'bg-brand-100'
                            }`}>
                              <Check className={`w-3 h-3 ${
                                isPopular ? 'text-green-700' : isPremium ? 'text-accent-700' : 'text-brand-700'
                              }`} />
                            </span>
                            <span className="text-sm text-brand-700 leading-snug">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => openLeadModal({
                        defaultService: 'Homeschool Students',
                        defaultMessage: `I am interested in ${plan.name} — ${plan.tagline}`,
                      })}
                      className={`w-full py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all hover:shadow-lg ${
                        isPopular
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : isPremium
                          ? 'bg-accent-500 hover:bg-accent-600 text-white'
                          : 'bg-brand-900 hover:bg-brand-800 text-white'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         4. COMPARISON TABLE
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {hs.comparisonTitle}
            </h2>
            <p className="text-brand-600 max-w-2xl mx-auto">{hs.comparisonSubtitle}</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-warm-200 shadow-sm">
            <table className="w-full min-w-[700px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-brand-900 text-white">
                  <th className="text-left px-6 py-4 font-display font-bold text-sm uppercase tracking-wider">Feature</th>
                  {hs.plans.map((plan, i) => (
                    <th
                      key={i}
                      className={`px-6 py-4 font-display font-bold text-sm uppercase tracking-wider text-center ${
                        plan.popular ? 'bg-green-700' : i === 2 ? 'bg-accent-600' : ''
                      }`}
                    >
                      <div className="flex flex-col items-center gap-1">
                        {plan.popular && <Star className="w-4 h-4 fill-white text-white" />}
                        <span>{plan.name}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hs.comparisonFeatures.map((feature, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className={rowIdx % 2 === 0 ? 'bg-warm-50' : 'bg-white'}
                  >
                    <td className="px-6 py-3.5 text-sm font-semibold text-brand-800 border-t border-warm-100">
                      {feature}
                    </td>
                    {hs.comparisonValues.map((vals, colIdx) => (
                      <td
                        key={colIdx}
                        className={`px-6 py-3.5 text-sm text-center border-t border-warm-100 ${
                          colIdx === 1 ? 'bg-green-50/50' : colIdx === 2 ? 'bg-accent-50/30' : ''
                        }`}
                      >
                        {vals[rowIdx] === 'Yes' || vals[rowIdx] === 'Sí' ? (
                          <Check className="w-4 h-4 text-brand-700 mx-auto" />
                        ) : (
                          <span className={vals[rowIdx] === '—' ? 'text-brand-300' : 'text-brand-700 font-medium'}>
                            {vals[rowIdx]}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         6. PRIVATE ACADEMIC TESTING
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          <div className="bg-brand-900 rounded-2xl p-8 lg:p-10 flex flex-col lg:flex-row items-center gap-6 text-center lg:text-left">
            <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
              <ClipboardList className="w-8 h-8 text-accent-400" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl lg:text-2xl font-bold text-white mb-2">{hs.testingTitle}</h2>
              <p className="text-brand-200 text-sm leading-relaxed">{hs.testingDesc}</p>
            </div>
            <button
              onClick={() => openLeadModal()}
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-xl flex-shrink-0"
            >
              {hs.testingBtn}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         7. UNDERSTANDING NWEA MAP GROWTH
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-50 border-t border-warm-100">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left – explanation */}
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center mb-5">
                <BarChart2 className="w-7 h-7 text-accent-400" />
              </div>
              <h2 className="font-display text-2xl font-bold text-brand-900 mb-4">{hs.nweaTitle}</h2>
              <p className="text-brand-600 leading-relaxed">{hs.nweaDesc}</p>
            </div>

            {/* Right – 4-step infographic */}
            <div className="grid grid-cols-2 gap-4">
              {hs.nweaSteps.map((step, i) => {
                const Icon = nweaStepIcons[i];
                return (
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-warm-200 hover:shadow-lg hover:border-accent-300 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-accent-400" />
                    </div>
                    <h3 className="font-bold text-brand-900 text-base mb-1">{step.title}</h3>
                    <p className="text-brand-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         8. ACADEMIC SUCCESS PROCESS TIMELINE
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {hs.processTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>

          {/* Desktop: step + arrow interleaved at circle midpoint */}
          <div className="hidden lg:flex items-start justify-center">
            {hs.processSteps.map((step, i) => {
              const Icon = processStepIcons[i];
              const accent = i === 0 ? 'brand' : i === 1 ? 'green' : i === 2 ? 'accent' : i === 3 ? 'brand' : 'green';
              return (
                <div key={i} className="flex items-start">
                  {/* Step column */}
                  <div className="flex flex-col items-center w-36 xl:w-40">
                    {/* Circle */}
                    <div className="relative mb-4">
                      <div
                        className={`w-16 h-16 rounded-full border-2 shadow-sm flex items-center justify-center ${
                          accent === 'green'
                            ? 'bg-green-50 border-green-300'
                            : accent === 'accent'
                            ? 'bg-accent-50 border-accent-400'
                            : 'bg-white border-warm-200'
                        }`}
                      >
                        <Icon className={`w-7 h-7 ${
                          accent === 'green' ? 'text-green-700' : accent === 'accent' ? 'text-accent-600' : 'text-brand-700'
                        }`} />
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-900 text-white text-xs font-bold flex items-center justify-center shadow">
                          {i + 1}
                        </span>
                      </div>
                    </div>
                    {/* Label */}
                    <div className="text-center px-1">
                      <h3 className="font-bold text-brand-900 text-sm mb-0.5 leading-snug">{step.title}</h3>
                      <p className="text-xs text-brand-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>

                  {/* Arrow between steps — vertically centered on the 64px circle (h-16 = 4rem) */}
                  {i < hs.processSteps.length - 1 && (
                    <div className="flex-shrink-0 flex items-center" style={{ height: '4rem', marginTop: '0' }}>
                      <ArrowRight className="w-5 h-5 text-warm-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack */}
          <div className="flex lg:hidden flex-col items-start gap-6">
            {hs.processSteps.map((step, i) => {
              const Icon = processStepIcons[i];
              const accent = i === 0 ? 'brand' : i === 1 ? 'green' : i === 2 ? 'accent' : i === 3 ? 'brand' : 'green';
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-14 h-14 rounded-full border-2 shadow-sm flex items-center justify-center ${
                        accent === 'green'
                          ? 'bg-green-50 border-green-300'
                          : accent === 'accent'
                          ? 'bg-accent-50 border-accent-400'
                          : 'bg-white border-warm-200'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${
                        accent === 'green' ? 'text-green-700' : accent === 'accent' ? 'text-accent-600' : 'text-brand-700'
                      }`} />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-900 text-white text-xs font-bold flex items-center justify-center shadow">
                        {i + 1}
                      </span>
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-brand-900 text-sm mb-0.5">{step.title}</h3>
                    <p className="text-xs text-brand-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         9. FINAL CTA
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-brand-900 relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-accent-400" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              {hs.finalCtaTitle}
            </h2>
            <p className="text-brand-200 text-base leading-relaxed mb-8">{hs.finalCtaDesc}</p>
            <button
              onClick={() => openLeadModal()}
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              {hs.finalCtaBtn}
            </button>
          </div>
        </div>
        {/* Decorative subtle pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent-500 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-brand-400 blur-3xl" />
        </div>
      </section>
    </>
  );
}
