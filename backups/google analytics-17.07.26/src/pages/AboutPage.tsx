import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';
import {
  BookOpen, Target, Eye, Heart, User, BarChart2, Users, Star,
  CheckCircle, ArrowRight, CalendarCheck,
} from 'lucide-react';

const DIRECTOR_IMAGE = '/images/about/image copy copy.png';

const processIcons = [CheckCircle, Eye, BookOpen, User, BarChart2];
const ctaFeatureIcons = [User, BookOpen, Users, BarChart2];
const differentiatorIcons = [User, BarChart2, Users, Heart];

export default function AboutPage() {
  const { t } = useLanguage();
  const a = t.aboutSection;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-20 bg-white overflow-hidden">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 bg-brand-50 border border-brand-100 text-brand-600 font-semibold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-6">
              <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
              {a.heroBadge}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 leading-tight mb-6">
              {a.heroTitle}
            </h1>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-16 bg-accent-300" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-16 bg-accent-300" />
            </div>
            <p className="text-brand-600 text-base sm:text-lg leading-relaxed max-w-2xl">
              {a.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR STORY / MISSION / VISION / VALUES ───────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-50 border-t border-warm-100">
        <div className="container-max px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 mb-3">
              {a.storyHeading}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-accent-300" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-12 bg-accent-300" />
            </div>
          </div>

          {/* Story full-width card */}
          <div className="bg-white rounded-3xl border border-warm-100 shadow-sm p-6 sm:p-8 lg:p-12 mb-8 max-w-4xl mx-auto text-center">
            <h3 className="font-display font-bold text-accent-600 text-xl sm:text-2xl mb-4">
              {a.storyTitle}
            </h3>
            <p className="text-brand-700 text-base leading-relaxed mb-4 max-w-2xl mx-auto">
              {a.storyP1}
            </p>
            <p className="text-brand-600 text-base leading-relaxed max-w-2xl mx-auto">
              {a.storyP2}
            </p>
          </div>

          {/* Mission / Vision / Values */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

            {/* Mission */}
            <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full border-2 border-accent-300 bg-accent-50 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent-600" />
              </div>
              <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{a.missionHeading}</p>
              <div className="flex items-center gap-1 mb-5">
                <div className="h-px w-6 bg-accent-400" />
                <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
              </div>
              <p className="text-brand-600 text-sm leading-relaxed">
                {a.missionDesc}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full border-2 border-accent-300 bg-accent-50 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent-600" />
              </div>
              <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{a.visionHeading}</p>
              <div className="flex items-center gap-1 mb-5">
                <div className="h-px w-6 bg-accent-400" />
                <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
              </div>
              <p className="text-brand-600 text-sm leading-relaxed">
                {a.visionDesc}
              </p>
            </div>

            {/* Values */}
            <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-8 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-full border-2 border-accent-300 bg-accent-50 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent-600" />
              </div>
              <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{a.valuesHeading}</p>
              <div className="flex items-center gap-1 mb-5">
                <div className="h-px w-6 bg-accent-400" />
                <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
              </div>
              <ul className="space-y-2">
                {a.valuesList.map((v: string) => (
                  <li key={v} className="flex items-center gap-2 justify-center">
                    <div className="w-2 h-2 rounded-full bg-accent-500 flex-shrink-0" />
                    <span className="text-brand-700 text-sm">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ──────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 mb-3">
              {a.whatMakesDifferent}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-accent-300" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-12 bg-accent-300" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {a.differentiators.map(({ title, desc }: { title: string; desc: string }, i: number) => {
              const Icon = differentiatorIcons[i] || User;
              return (
                <div key={i} className="bg-warm-50 rounded-2xl p-6 text-center border border-warm-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className="w-12 h-12 rounded-full border-2 border-brand-200 bg-white flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-brand-700" />
                  </div>
                  <h3 className="font-bold text-brand-900 text-sm mb-2 leading-snug">{title}</h3>
                  <p className="text-brand-600 text-xs leading-relaxed">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MEET THE FOUNDER ─────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-white border border-warm-100 text-accent-600 font-semibold text-xs tracking-widest uppercase px-4 py-2 rounded-full mb-4">
              <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
              {a.meetFounderBadge}
            </span>
          </div>
          <div className="bg-white rounded-3xl border border-warm-100 shadow-sm overflow-hidden max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-[320px_1fr] gap-0">

              {/* Photo column */}
              <div className="relative h-80 sm:h-96 lg:h-auto lg:min-h-[420px]">
                <img
                  src={DIRECTOR_IMAGE}
                  alt={a.founderName}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>

              {/* Bio column */}
              <div className="p-8 sm:p-10 lg:p-12">
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-2 leading-tight">
                  {a.founderName}
                </h2>
                <p className="text-accent-600 font-semibold text-sm mb-6">
                  {a.founderTitle}
                </p>
                <p className="text-brand-700 leading-relaxed mb-8 text-base">
                  {a.founderDesc}
                </p>
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {a.credentials.map((c: string) => (
                    <div key={c} className="flex items-start gap-2.5">
                      <CheckCircle className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-brand-700 text-sm leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote band — full width below */}
            <div className="bg-brand-900 px-8 sm:px-12 lg:px-16 py-10 flex flex-col justify-center items-center text-center">
              <div className="text-accent-400 text-5xl font-display leading-none mb-4">&ldquo;</div>
              <p className="text-white text-base sm:text-lg leading-relaxed italic mb-5 max-w-3xl">
                {a.founderQuote}
              </p>
              <p className="text-accent-400 font-semibold text-sm">{a.founderQuoteAuthor}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL PHILOSOPHY ───────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-warm-50 rounded-3xl border border-warm-100 shadow-sm p-6 sm:p-8 lg:p-16 max-w-4xl mx-auto text-center">
            <span className="inline-block text-brand-700 font-semibold text-xs tracking-widest uppercase mb-4">
              {a.philosophyBadge}
            </span>
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-12 bg-accent-300" />
              <BookOpen className="w-5 h-5 text-brand-300" strokeWidth={1.5} />
              <div className="h-px w-12 bg-accent-300" />
            </div>
            <p className="text-brand-700 leading-relaxed text-base sm:text-lg max-w-2xl mx-auto">
              {a.philosophyDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC SUCCESS PROCESS ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 mb-3">
              {a.processTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-12 bg-accent-300" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-12 bg-accent-300" />
            </div>
          </div>

          {/* Desktop: horizontal flow */}
          <div className="hidden md:flex flex-row items-start justify-center gap-0 max-w-5xl mx-auto">
            {a.processSteps.map((step: typeof a.processSteps[number], idx: number) => {
              const Icon = processIcons[idx] || CheckCircle;
              return (
                <div key={step.label} className="flex flex-row items-center flex-1">
                  <div className="flex flex-col items-center text-center px-2 md:px-3 lg:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center mb-3 shadow-md relative">
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{step.label}</p>
                    <p className="text-brand-600 text-xs leading-relaxed max-w-[140px]">{step.desc}</p>
                  </div>
                  {idx < a.processSteps.length - 1 && (
                    <div className="flex items-center justify-center flex-shrink-0 mt-[-28px]">
                      <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-brand-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack */}
          <div className="md:hidden flex flex-col gap-6 px-4">
            {a.processSteps.map((step: typeof a.processSteps[number], idx: number) => {
              const Icon = processIcons[idx] || CheckCircle;
              return (
                <div key={step.label} className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0 shadow-md relative">
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-bold">
                      {idx + 1}
                    </span>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="pt-1">
                    <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{step.label}</p>
                    <p className="text-brand-600 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-16 lg:py-20" style={{ background: 'linear-gradient(135deg, #c17f24 0%, #a06818 100%)' }}>
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/20 border border-white/30 flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow mb-4 leading-tight">
              {a.ctaTitle}
            </h2>
            <p className="text-amber-100 text-base leading-relaxed mb-8 max-w-xl mx-auto">
              {a.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <button
                onClick={openLeadModal}
                className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 px-8 py-4 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                <CalendarCheck className="w-5 h-5" />
                {a.ctaButton}
              </button>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              {a.ctaFeatures.map((label: string, i: number) => {
                const Icon = ctaFeatureIcons[i] || User;
                return (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-white/70" />
                    <span className="text-white/80 text-xs">{label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
