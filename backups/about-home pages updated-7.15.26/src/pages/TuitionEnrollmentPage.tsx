import { useState } from 'react';
import {
  Calendar, ClipboardList, CreditCard, Award, Check, Plus, Minus,
  GraduationCap, TrendingUp, Users, Heart, BarChart2,
  MessageSquare, FileText, ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

const HERO_IMAGE = '/images/tuition/Screenshot_2026-07-15_at_9.39.32_AM.png';

const enrollmentIcons = [MessageSquare, ClipboardList, TrendingUp, FileText, GraduationCap];
const trustIcons = [Users, Heart, BarChart2, Users];

const flexiblePlanIcons = [Calendar, ClipboardList, Award, CreditCard];

export default function TuitionEnrollmentPage() {
  const { t } = useLanguage();
  const p = t.tuitionPage;
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const leftFaqs = p.faqs.slice(0, Math.ceil(p.faqs.length / 2));
  const rightFaqs = p.faqs.slice(Math.ceil(p.faqs.length / 2));

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────── */}
      <section className="pt-[68px] bg-[#f5f1ec] overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 2xl:px-16">
          <div className="grid lg:grid-cols-2 items-center min-h-[440px]">

            {/* Left — text */}
            <div className="py-12 lg:py-16 pr-8">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 leading-tight mb-4">
                {p.heroTitle}
              </h1>
              <p className="text-accent-500 font-display italic text-xl mb-5 leading-snug">
                {p.heroSubtitle}
              </p>
              <p className="text-brand-600 text-base leading-relaxed mb-8 max-w-sm">
                {p.heroDesc}
              </p>
              <button
                onClick={() => openLeadModal()}
                className="inline-flex items-center gap-2.5 bg-brand-900 hover:bg-brand-800 text-white px-7 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                {p.heroButton}
              </button>
            </div>

            {/* Right — stadium/pill shaped image (large radius on left side) */}
            <div className="hidden lg:flex items-center justify-end py-12">
              <div
                className="relative overflow-hidden shadow-lg"
                style={{
                  width: '500px',
                  height: '340px',
                  borderRadius: '170px 20px 20px 170px',
                }}
              >
                <img
                  src={HERO_IMAGE}
                  alt="Teacher and student working together"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. ENROLLMENT PROCESS ──────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-max">

          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {p.enrollmentTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-20 bg-warm-200" />
              <span className="text-accent-500 text-base">★</span>
              <div className="h-px w-20 bg-warm-200" />
            </div>
          </div>

          {/* Desktop: horizontal with arrows */}
          <div className="hidden lg:flex items-start justify-center gap-0">
            {p.enrollmentSteps.map((step, i) => {
              const Icon = enrollmentIcons[i];
              return (
                <div key={i} className="flex items-start">
                  {/* Step */}
                  <div className="flex flex-col items-center text-center w-36 xl:w-40">
                    {/* Numbered circle */}
                    <div className="relative mb-5">
                      <div className="w-20 h-20 rounded-full bg-white border-2 border-warm-200 shadow-sm flex items-center justify-center">
                        <Icon className="w-8 h-8 text-brand-700" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shadow-md">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="font-bold text-brand-900 text-sm mb-0.5 leading-snug px-1">
                      {step.title}
                    </h3>
                    {step.subtitle && (
                      <p className="text-accent-600 text-xs italic mb-1">{step.subtitle}</p>
                    )}
                    <p className="text-xs text-brand-500 leading-relaxed px-1">{step.desc}</p>
                  </div>

                  {/* Arrow */}
                  {i < p.enrollmentSteps.length - 1 && (
                    <div className="flex-shrink-0 flex items-center mt-8">
                      <ArrowRight className="w-5 h-5 text-warm-400" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile: vertical */}
          <div className="flex lg:hidden flex-col gap-6 max-w-sm mx-auto">
            {p.enrollmentSteps.map((step, i) => {
              const Icon = enrollmentIcons[i];
              return (
                <div key={i} className="flex items-start gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-warm-200 shadow-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-brand-700" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shadow">
                      {step.number}
                    </span>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-brand-900 text-sm mb-0.5">{step.title}</h3>
                    {step.subtitle && <p className="text-accent-600 text-xs italic mb-0.5">{step.subtitle}</p>}
                    <p className="text-xs text-brand-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. FLEXIBLE TUITION + SCHOLARSHIPS ─────────────────── */}
      <section className="py-16 bg-white border-t border-warm-100">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left — Flexible Tuition */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-accent-400" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-brand-900 uppercase tracking-widest">
                    {p.flexibleTitle}
                  </h2>
                  <div className="h-0.5 w-24 bg-accent-400 mt-1" />
                </div>
              </div>

              <p className="text-brand-600 text-sm leading-relaxed mb-8">
                {p.flexibleDesc}
              </p>

              <div className="grid grid-cols-4 gap-3 mb-5">
                {p.flexiblePlans.map((plan, i) => {
                  const Icon = flexiblePlanIcons[i];
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center gap-2 bg-warm-50 border border-warm-200 rounded-xl p-3 text-center"
                    >
                      <div className="w-10 h-10 rounded-lg bg-white border border-warm-200 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-700" />
                      </div>
                      <span className="text-xs font-semibold text-brand-700 leading-tight">{plan}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-brand-400 text-sm italic">{p.flexibleNote}</p>
            </div>

            {/* Right — Scholarships & Payment */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-7 h-7 text-accent-400" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-brand-900 uppercase tracking-widest">
                    {p.scholarshipsTitle}
                  </h2>
                  <div className="h-0.5 w-24 bg-accent-400 mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* We proudly accept */}
                <div>
                  <p className="text-sm font-bold text-brand-800 mb-4">{p.scholarshipsWe}</p>
                  <div className="bg-warm-50 border border-warm-200 rounded-xl p-4 flex flex-col items-center justify-center min-h-[100px]">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-red-500 font-bold text-2xl">Step</span>
                        <span className="text-red-500 font-bold text-2xl">Up</span>
                      </div>
                      <p className="text-brand-700 text-xs font-semibold uppercase tracking-wide">for Students</p>
                    </div>
                  </div>
                </div>

                {/* Accepted payment methods */}
                <div>
                  <p className="text-sm font-bold text-brand-800 mb-4">{p.acceptedMethods}</p>
                  <div className="flex gap-3">
                    {/* Credit & Debit */}
                    <div className="flex flex-col items-center gap-1.5 bg-warm-50 border border-warm-200 rounded-xl p-3 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-brand-900 flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-accent-400" />
                      </div>
                      <span className="text-xs font-semibold text-brand-700 text-center leading-tight">Credit & Debit Cards</span>
                    </div>
                    {/* Bank Transfer */}
                    <div className="flex flex-col items-center gap-1.5 bg-warm-50 border border-warm-200 rounded-xl p-3 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-brand-900 flex items-center justify-center">
                        <Award className="w-5 h-5 text-accent-400" />
                      </div>
                      <span className="text-xs font-semibold text-brand-700 text-center leading-tight">ACH Bank Transfer</span>
                    </div>
                    {/* Zelle */}
                    <div className="flex flex-col items-center gap-1.5 bg-[#6d1ed4] border border-[#6d1ed4] rounded-xl p-3 flex-1">
                      <div className="w-9 h-9 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">Z</span>
                      </div>
                      <span className="text-xs font-semibold text-white text-center leading-tight">Zelle®</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-brand-400 text-sm italic mt-5">{p.methodsNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FAQ ─────────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-warm-100">
        <div className="container-max">

          <div className="text-center mb-10">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {p.faqTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-20 bg-warm-200" />
              <span className="text-accent-500 text-base">★</span>
              <div className="h-px w-20 bg-warm-200" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-0 max-w-5xl mx-auto">
            {/* Left column */}
            <div className="divide-y divide-warm-100">
              {leftFaqs.map((faq, i) => (
                <div key={i}>
                  <button
                    onClick={() => toggleFaq(i)}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-brand-800">{faq.q}</span>
                    <span className="flex-shrink-0 w-6 h-6 rounded-full border border-warm-300 flex items-center justify-center">
                      {openFaq === i
                        ? <Minus className="w-3 h-3 text-brand-600" />
                        : <Plus className="w-3 h-3 text-brand-600" />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="text-sm text-brand-500 leading-relaxed pb-4">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Right column */}
            <div className="divide-y divide-warm-100">
              {rightFaqs.map((faq, i) => {
                const idx = leftFaqs.length + i;
                return (
                  <div key={idx}>
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between gap-4 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-brand-800">{faq.q}</span>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full border border-warm-300 flex items-center justify-center">
                        {openFaq === idx
                          ? <Minus className="w-3 h-3 text-brand-600" />
                          : <Plus className="w-3 h-3 text-brand-600" />}
                      </span>
                    </button>
                    {openFaq === idx && (
                      <p className="text-sm text-brand-500 leading-relaxed pb-4">{faq.a}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. READY TO GET STARTED — dark card ───────────────── */}
      <section className="py-10 bg-white border-t border-warm-100">
        <div className="container-max">
          <div className="bg-brand-900 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center gap-6">

            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-full border-2 border-accent-400 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-accent-400" />
            </div>

            {/* Title + desc */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">
                {p.ctaTitle}
              </h2>
              <p className="text-brand-300 text-sm leading-relaxed">{p.ctaDesc}</p>
            </div>

            {/* Button + note */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <button
                onClick={() => openLeadModal()}
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-7 py-3.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-xl whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                {p.ctaButton}
              </button>
              <p className="text-brand-400 text-xs italic text-center">{p.ctaNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. TRUST STRIP ─────────────────────────────────────── */}
      <section className="py-10 bg-warm-50 border-t border-warm-100">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {p.trustItems.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-warm-200 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-900 text-xs uppercase tracking-wide mb-0.5">{item.title}</h3>
                    <p className="text-xs text-brand-500 leading-snug">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
