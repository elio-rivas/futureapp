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
      <section className="pt-24 pb-0 bg-white overflow-hidden">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center py-12 lg:py-20 max-w-2xl">
            <span className="inline-block text-brand-600 font-semibold text-xs tracking-widest uppercase mb-4">
              {a.heroBadge}
            </span>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight mb-5">
              {a.heroTitle}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-accent-400" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-10 bg-accent-400" />
            </div>
            <p className="text-brand-700 text-base sm:text-lg leading-relaxed">
              {a.heroDesc}
            </p>
          </div>
        </div>
      </section>

      {/* ── OUR STORY / MISSION / VISION / VALUES ───────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white border-t border-warm-100">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-warm-200">

            {/* Our Story */}
            <div className="md:pr-8 pb-8 md:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-brand-900 text-sm tracking-widest uppercase">{a.storyHeading}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="h-px w-6 bg-accent-400" />
                    <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                  </div>
                </div>
              </div>
              <h3 className="font-display font-bold text-accent-600 text-base mb-3">
                {a.storyTitle}
              </h3>
              <p className="text-brand-700 text-sm leading-relaxed mb-3">
                {a.storyP1}
              </p>
              <p className="text-brand-600 text-sm leading-relaxed">
                {a.storyP2}
              </p>
            </div>

            {/* Our Mission */}
            <div className="md:px-8 pt-8 md:pt-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent-400 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-accent-500" />
                </div>
                <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{a.missionHeading}</p>
                <div className="flex items-center gap-1 mb-4">
                  <div className="h-px w-6 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                </div>
                <p className="text-brand-600 text-sm leading-relaxed">
                  {a.missionDesc}
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="md:px-8 pt-8 md:pt-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent-400 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 text-accent-500" />
                </div>
                <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{a.visionHeading}</p>
                <div className="flex items-center gap-1 mb-4">
                  <div className="h-px w-6 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                </div>
                <p className="text-brand-600 text-sm leading-relaxed">
                  {a.visionDesc}
                </p>
              </div>
            </div>

            {/* Our Values */}
            <div className="md:pl-8 pt-8 md:pt-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent-400 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-accent-500" />
                </div>
                <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{a.valuesHeading}</p>
                <div className="flex items-center gap-1 mb-4">
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
        </div>
      </section>

      {/* ── WHAT MAKES US DIFFERENT ──────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-brand-900 mb-2 tracking-wide uppercase">
              {a.whatMakesDifferent}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-10 bg-accent-400" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-10 bg-accent-400" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {a.differentiators.map(({ title, desc }: { title: string; desc: string }, i: number) => {
              const Icon = differentiatorIcons[i] || User;
              return (
              <div key={i} className="bg-white rounded-2xl p-6 text-center border border-warm-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full border-2 border-brand-200 flex items-center justify-center mx-auto mb-4">
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
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-warm-50 rounded-3xl border border-warm-100 overflow-hidden">
            <div className="grid lg:grid-cols-[280px_1fr_260px] gap-0">

              {/* Photo column */}
              <div className="relative h-72 sm:h-80 lg:h-auto">
                <img
                  src={DIRECTOR_IMAGE}
                  alt={a.founderName}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>

              {/* Bio column */}
              <div className="p-6 sm:p-8 lg:p-10">
                <span className="inline-block text-accent-600 font-semibold text-xs tracking-widest uppercase mb-3">
                  {a.meetFounderBadge}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-1 leading-tight">
                  {a.founderName}
                </h2>
                <p className="text-accent-600 font-semibold text-sm mb-4">
                  {a.founderTitle}
                </p>
                <p className="text-brand-700 leading-relaxed mb-6 text-sm">
                  {a.founderDesc}
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {a.credentials.map((c: string) => (
                    <div key={c} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-brand-700 text-xs leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote column */}
              <div className="bg-brand-900 p-6 sm:p-8 flex flex-col justify-center">
                <div className="text-accent-400 text-5xl font-display leading-none mb-4">&ldquo;</div>
                <p className="text-white text-sm leading-relaxed italic mb-6">
                  {a.founderQuote}
                </p>
                <p className="text-accent-400 font-semibold text-sm">{a.founderQuoteAuthor}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL PHILOSOPHY ───────────────────────────────────────────── */}
      <section className="py-12 lg:py-14 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-6 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-[120px_1fr_120px] gap-6 items-center">
              <div className="hidden lg:flex justify-center">
                <BookOpen className="w-20 h-20 text-brand-200" strokeWidth={1} />
              </div>
              <div className="text-center">
                <span className="inline-block text-brand-700 font-semibold text-xs tracking-widest uppercase mb-3">
                  {a.philosophyBadge}
                </span>
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="h-px w-8 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                  <div className="h-px w-8 bg-accent-400" />
                </div>
                <p className="text-brand-700 leading-relaxed max-w-2xl mx-auto text-sm sm:text-base">
                  {a.philosophyDesc}
                </p>
              </div>
              <div className="hidden lg:flex justify-center">
                <BookOpen className="w-20 h-20 text-brand-200" strokeWidth={1} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACADEMIC SUCCESS PROCESS ─────────────────────────────────────────── */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-brand-900 mb-2 tracking-wide uppercase">
              {a.processTitle}
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-10 bg-accent-400" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-10 bg-accent-400" />
            </div>
          </div>

          {/* Desktop: horizontal flow with arrows */}
          <div className="hidden sm:flex flex-row items-start justify-center gap-0">
            {a.processSteps.map((step: typeof a.processSteps[number], idx: number) => {
              const Icon = processIcons[idx] || CheckCircle;
              return (
                <div key={step.label} className="flex flex-row items-center flex-1">
                  <div className="flex flex-col items-center text-center px-3 min-w-[100px] lg:min-w-[120px]">
                    <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center mb-3 shadow-md relative">
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-bold">
                        {idx + 1}
                      </span>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{step.label}</p>
                    <p className="text-brand-600 text-xs leading-relaxed max-w-[110px]">{step.desc}</p>
                  </div>
                  {idx < a.processSteps.length - 1 && (
                    <div className="flex items-center justify-center flex-shrink-0 mt-[-28px]">
                      <ArrowRight className="w-5 h-5 text-brand-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical stack, no arrows */}
          <div className="sm:hidden flex flex-col gap-6">
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
      <section className="py-12 lg:py-14" style={{ background: 'linear-gradient(135deg, #c17f24 0%, #a06818 100%)' }}>
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-white drop-shadow mb-2 leading-tight">
                  {a.ctaTitle}
                </h2>
                <p className="text-amber-100 text-sm leading-relaxed">
                  {a.ctaDesc}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-end">
              <button
                onClick={openLeadModal}
                className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 px-6 sm:px-7 py-3 sm:py-4 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                <CalendarCheck className="w-5 h-5" />
                {a.ctaButton}
              </button>
              <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center sm:gap-x-6 lg:justify-start">
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
        </div>
      </section>
    </>
  );
}
