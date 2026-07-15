import { useState } from 'react';
import {
  Calendar, Users, ClipboardList, TrendingUp, FileText, GraduationCap,
  ArrowRight, Plus, Minus, CreditCard, Building2, Award, Heart, BarChart2, Handshake,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

const TUITION_IMAGE = '/images/tuition/image copy copy.png';

const stepIcons = [Users, ClipboardList, TrendingUp, FileText, GraduationCap];

const flexPlanIcons = [Calendar, ClipboardList, CreditCard, FileText];

const trustIcons = [Award, Heart, BarChart2, Handshake];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-warm-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-warm-50 transition-colors"
      >
        <span className="font-semibold text-brand-900 text-sm sm:text-base pr-4">{q}</span>
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center">
          {open
            ? <Minus className="w-3.5 h-3.5 text-brand-700" />
            : <Plus className="w-3.5 h-3.5 text-brand-700" />}
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4 pt-1 bg-white border-t border-warm-100">
          <p className="text-brand-600 text-sm leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function PaymentPage() {
  const { t } = useLanguage();
  const p = t.tuitionPage;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-[68px] bg-[#f7f4ef] overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 2xl:px-12">
          <div className="grid lg:grid-cols-2 items-center gap-8 min-h-[260px]">
            {/* Left */}
            <div className="py-10 lg:py-12">
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-900 leading-tight mb-2">
                {p.heroTitle}
              </h1>
              <p className="text-accent-600 font-semibold text-base sm:text-lg mb-4 font-display italic">
                {p.heroSubtitle}
              </p>
              <p className="text-brand-600 text-base leading-relaxed mb-6 max-w-sm">
                {p.heroDesc}
              </p>
              <button
                onClick={() => openLeadModal()}
                className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-5 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                {p.heroButton}
              </button>
            </div>

            {/* Right – circle image, sits flush at bottom of banner */}
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

      {/* ── Enrollment Process ───────────────────────────────────────── */}
      <section className="section-padding bg-warm-50 border-t border-warm-100">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {p.enrollmentTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center gap-0">
            {p.enrollmentSteps.map((step, i) => {
              const Icon = stepIcons[i];
              return (
                <div key={i} className="flex lg:flex-col items-start lg:items-center gap-4 lg:gap-0 flex-1">
                  <div className="flex flex-col lg:flex-col items-center">
                    {/* Number bubble */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-full bg-white border-2 border-warm-200 shadow-sm flex items-center justify-center relative">
                        <Icon className="w-7 h-7 text-brand-700" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center shadow">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    {/* Text */}
                    <div className="text-center px-3 lg:px-2 max-w-[160px]">
                      <h3 className="font-bold text-brand-900 text-sm mb-0.5">{step.title}</h3>
                      {step.subtitle && (
                        <p className="text-xs text-brand-500 italic mb-1">{step.subtitle}</p>
                      )}
                      <p className="text-xs text-brand-600 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {/* Arrow connector */}
                  {i < p.enrollmentSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block w-6 h-6 text-warm-400 mx-1 flex-shrink-0 mt-[-80px]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Flexible Tuition + Scholarships ─────────────────────────── */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

            {/* Left: Flexible Tuition */}
            <div className="bg-warm-50 rounded-2xl p-8 border border-warm-100">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-7 h-7 text-accent-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-900 uppercase tracking-wider">
                    {p.flexibleTitle}
                  </h2>
                  <div className="h-0.5 w-full bg-accent-500 mt-1 rounded" />
                </div>
              </div>

              <p className="text-brand-600 leading-relaxed mb-8 text-sm">{p.flexibleDesc}</p>

              <div className="grid grid-cols-4 gap-3 mb-6">
                {p.flexiblePlans.map((plan, i) => {
                  const Icon = flexPlanIcons[i];
                  return (
                    <div key={i} className="flex flex-col items-center gap-2 text-center">
                      <div className="w-12 h-12 rounded-xl bg-white border border-warm-200 shadow-sm flex items-center justify-center">
                        <Icon className="w-5 h-5 text-brand-700" />
                      </div>
                      <span className="text-xs font-semibold text-brand-800 leading-tight">{plan}</span>
                    </div>
                  );
                })}
              </div>

              <p className="text-brand-500 text-xs italic">{p.flexibleNote}</p>
            </div>

            {/* Right: Scholarships & Payment Options */}
            <div className="bg-warm-50 rounded-2xl p-8 border border-warm-100">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-7 h-7 text-accent-400" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-900 uppercase tracking-wider">
                    {p.scholarshipsTitle}
                  </h2>
                  <div className="h-0.5 w-full bg-accent-500 mt-1 rounded" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Step Up */}
                <div>
                  <p className="text-sm font-semibold text-brand-800 mb-3">{p.scholarshipsWe}</p>
                  <div className="bg-white rounded-xl border border-warm-200 p-4 flex flex-col items-center justify-center gap-1 min-h-[90px]">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-[#e8381e] leading-none">Step</span>
                      <span className="text-2xl font-black text-[#004b8d] leading-none">Up</span>
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-brand-500 uppercase">for students</span>
                  </div>
                </div>

                {/* Accepted Payment Methods */}
                <div>
                  <p className="text-sm font-semibold text-brand-800 mb-3">{p.acceptedMethods}</p>
                  <div className="flex gap-2">
                    {/* Credit & Debit */}
                    <div className="flex-1 bg-white rounded-xl border border-warm-200 p-3 flex flex-col items-center justify-center gap-1 min-h-[90px]">
                      <CreditCard className="w-6 h-6 text-brand-600" />
                      <span className="text-[10px] font-semibold text-brand-700 text-center leading-tight">Credit & Debit Cards</span>
                    </div>
                    {/* ACH */}
                    <div className="flex-1 bg-white rounded-xl border border-warm-200 p-3 flex flex-col items-center justify-center gap-1 min-h-[90px]">
                      <Building2 className="w-6 h-6 text-brand-600" />
                      <span className="text-[10px] font-semibold text-brand-700 text-center leading-tight">ACH Bank Transfer</span>
                    </div>
                    {/* Zelle */}
                    <div className="flex-1 bg-[#6d1ed4] rounded-xl p-3 flex flex-col items-center justify-center gap-1 min-h-[90px]">
                      <span className="text-white font-black text-lg leading-none">Z</span>
                      <span className="text-[10px] font-bold text-purple-100 text-center leading-tight">Zelle®</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-brand-400 text-xs italic mt-5">{p.methodsNote}</p>
            </div>

          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-warm-50 border-t border-warm-100">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {p.faqTitle}
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 max-w-4xl mx-auto">
            {p.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="section-padding bg-brand-900">
        <div className="container-max">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 max-w-5xl mx-auto">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-8 h-8 text-accent-400" />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1">{p.ctaTitle}</h2>
                <p className="text-brand-300">{p.ctaDesc}</p>
              </div>
            </div>
            <div className="flex flex-col items-center sm:items-end gap-2 flex-shrink-0">
              <button
                onClick={() => openLeadModal()}
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-8 py-3.5 rounded-xl font-bold uppercase tracking-wide text-sm transition-all hover:shadow-xl whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                {p.ctaButton}
              </button>
              <p className="text-brand-400 text-xs">{p.ctaNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ───────────────────────────────────────────────── */}
      <section className="py-8 bg-white border-t border-warm-100">
        <div className="container-max">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {p.trustItems.map((item, i) => {
              const Icon = trustIcons[i];
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="w-6 h-6 text-brand-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-brand-900 text-xs uppercase tracking-wide">{item.title}</h4>
                    <p className="text-brand-500 text-xs leading-snug mt-0.5">{item.desc}</p>
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
