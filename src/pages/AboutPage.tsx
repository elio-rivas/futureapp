import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';
import {
  BookOpen, Target, Eye, Heart, User, BarChart2, Users, Star,
  CheckCircle, ArrowRight, CalendarCheck,
} from 'lucide-react';

const DIRECTOR_IMAGE = '/DirectorPicture.png';

const differentiators = [
  {
    icon: User,
    title: 'Personalized Instruction',
    desc: 'Every student receives support based on individual strengths, needs, and goals.',
  },
  {
    icon: BarChart2,
    title: 'Data-Informed Planning',
    desc: 'Assessments and progress monitoring help guide instruction and recommendations.',
  },
  {
    icon: Users,
    title: 'Family Collaboration',
    desc: 'Parents are active partners in the learning process with clear communication and guidance.',
  },
  {
    icon: Star,
    title: 'Confidence-Focused Learning',
    desc: 'We help students build skills while developing independence, motivation, and confidence.',
  },
];

const credentials = [
  "Master's Degree in Curriculum & Instruction",
  'Florida Certified Educator',
  'Reading Endorsement K–12',
  'ESOL Endorsement',
  'Nearly 20 years of educational experience',
  'Reading intervention & structured literacy',
  'Academic assessment & progress monitoring',
  'Homeschool support experience',
];

const processSteps = [
  { number: 1, label: 'ASSESS', desc: 'Identify current academic levels.' },
  { number: 2, label: 'ANALYZE', desc: 'Review strengths and learning needs.' },
  { number: 3, label: 'PLAN', desc: 'Create a Personalized Learning Roadmap™.' },
  { number: 4, label: 'TEACH', desc: 'Provide individualized instruction and support.' },
  { number: 5, label: 'GROW', desc: 'Monitor progress and celebrate achievement.' },
];

const values = ['Excellence', 'Integrity', 'Compassion', 'Collaboration', 'Lifelong Learning'];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="pt-24 pb-0 bg-white overflow-hidden">
        <div className="container-max">
          <div className="grid lg:grid-cols-[1fr_420px] items-end" style={{ minHeight: '520px' }}>

            {/* Left — headline + intro */}
            <div className="flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
              <span className="inline-block text-brand-600 font-semibold text-xs tracking-widest uppercase mb-4">
                About Future Foundations Education
              </span>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 leading-tight mb-5">
                Building Strong Foundations<br /> for Lifelong Success
              </h1>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-accent-400" />
                <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
                <div className="h-px w-10 bg-accent-400" />
              </div>
              <p className="text-brand-700 text-lg leading-relaxed max-w-lg">
                Future Foundations Education is a personalized educational organization dedicated to helping students develop confidence, academic skills, and lifelong learning habits through evidence-based instruction and meaningful family partnerships.
              </p>
            </div>

            {/* Right — director photo, full portrait arch anchored to bottom */}
            <div className="hidden lg:block self-end">
              <div
                className="overflow-hidden shadow-xl"
                style={{
                  width: '420px',
                  height: '520px',
                  borderTopLeftRadius: '210px',
                  borderTopRightRadius: '210px',
                  borderBottomLeftRadius: '0',
                  borderBottomRightRadius: '0',
                }}
              >
                <img
                  src={DIRECTOR_IMAGE}
                  alt="Marinette Rodriguez, Academic Director"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── OUR STORY / MISSION / VISION / VALUES ───────────────────────────── */}
      <section className="py-16 bg-white border-t border-warm-100">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-warm-200">

            {/* Our Story */}
            <div className="md:pr-8 pb-8 md:pb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-brand-900 text-sm tracking-widest uppercase">Our Story</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="h-px w-6 bg-accent-400" />
                    <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                  </div>
                </div>
              </div>
              <h3 className="font-display font-bold text-accent-600 text-base mb-3">
                Why Future Foundations Education Was Created
              </h3>
              <p className="text-brand-700 text-sm leading-relaxed mb-3">
                Future Foundations Education was created with one belief: every student deserves instruction that recognizes their strengths, supports their challenges, and helps them grow with confidence.
              </p>
              <p className="text-brand-600 text-sm leading-relaxed">
                We combine academic assessments, personalized instruction, progress monitoring, and family collaboration to create meaningful learning experiences for students from Pre-K through High School.
              </p>
            </div>

            {/* Our Mission */}
            <div className="md:px-8 py-8 md:py-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent-400 flex items-center justify-center mb-3">
                  <Target className="w-5 h-5 text-accent-500" />
                </div>
                <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">Our Mission</p>
                <div className="flex items-center gap-1 mb-4">
                  <div className="h-px w-6 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                </div>
                <p className="text-brand-600 text-sm leading-relaxed">
                  To empower students through personalized instruction, evidence-based educational practices, and strong family partnerships.
                </p>
              </div>
            </div>

            {/* Our Vision */}
            <div className="md:px-8 py-8 md:py-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent-400 flex items-center justify-center mb-3">
                  <Eye className="w-5 h-5 text-accent-500" />
                </div>
                <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">Our Vision</p>
                <div className="flex items-center gap-1 mb-4">
                  <div className="h-px w-6 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                </div>
                <p className="text-brand-600 text-sm leading-relaxed">
                  To be a trusted educational partner for families seeking high-quality academic support, individualized learning, and meaningful student growth.
                </p>
              </div>
            </div>

            {/* Our Values */}
            <div className="md:pl-8 pt-8 md:pt-0">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-accent-400 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-accent-500" />
                </div>
                <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">Our Values</p>
                <div className="flex items-center gap-1 mb-4">
                  <div className="h-px w-6 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                </div>
                <ul className="space-y-2">
                  {values.map((v) => (
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
      <section className="py-16 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-2 tracking-wide uppercase">
              What Makes Us Different
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-10 bg-accent-400" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-10 bg-accent-400" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 text-center border border-warm-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full border-2 border-brand-200 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-brand-700" />
                </div>
                <h3 className="font-bold text-brand-900 text-sm mb-2 leading-snug">{title}</h3>
                <p className="text-brand-600 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEET THE FOUNDER ─────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-warm-50 rounded-3xl border border-warm-100 overflow-hidden">
            <div className="grid lg:grid-cols-[280px_1fr_260px] gap-0">

              {/* Photo column */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={DIRECTOR_IMAGE}
                  alt="Marinette Rodriguez, Academic Director"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>

              {/* Bio column */}
              <div className="p-8 lg:p-10">
                <span className="inline-block text-accent-600 font-semibold text-xs tracking-widest uppercase mb-3">
                  Meet the Founder
                </span>
                <h2 className="font-display text-3xl font-bold text-brand-900 mb-1 leading-tight">
                  Marinette Rodriguez, M.A.Ed.
                </h2>
                <p className="text-accent-600 font-semibold text-sm mb-4">
                  Academic Director &amp; Reading Intervention Specialist
                </p>
                <p className="text-brand-700 leading-relaxed mb-6 text-sm">
                  With nearly 20 years of experience in education, Miss Mari is passionate about helping students become confident, capable, and successful learners.
                </p>
                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                  {credentials.map((c) => (
                    <div key={c} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                      <span className="text-brand-700 text-xs leading-snug">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quote column */}
              <div className="bg-brand-900 p-8 flex flex-col justify-center">
                <div className="text-accent-400 text-5xl font-display leading-none mb-4">&ldquo;</div>
                <p className="text-white text-sm leading-relaxed italic mb-6">
                  My goal is to help every student feel capable, supported, and confident as they build the skills needed for long-term success.
                </p>
                <p className="text-accent-400 font-semibold text-sm">— Marinette Rodriguez</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATIONAL PHILOSOPHY ───────────────────────────────────────────── */}
      <section className="py-14 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-warm-100 shadow-sm p-8 lg:p-12">
            <div className="grid lg:grid-cols-[120px_1fr_120px] gap-6 items-center">
              <div className="hidden lg:flex justify-center">
                <BookOpen className="w-20 h-20 text-brand-200" strokeWidth={1} />
              </div>
              <div className="text-center">
                <span className="inline-block text-brand-700 font-semibold text-xs tracking-widest uppercase mb-3">
                  Our Educational Philosophy
                </span>
                <div className="flex items-center justify-center gap-2 mb-5">
                  <div className="h-px w-8 bg-accent-400" />
                  <Star className="w-3 h-3 text-accent-500 fill-accent-400" />
                  <div className="h-px w-8 bg-accent-400" />
                </div>
                <p className="text-brand-700 leading-relaxed max-w-2xl mx-auto">
                  We believe learning should be personalized, structured, encouraging, and purposeful. Every child deserves instruction that meets them where they are and helps them move forward with confidence. Our role is to provide the tools, support, and encouragement students need to reach their full potential.
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
      <section className="py-16 bg-white">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-2 tracking-wide uppercase">
              Our Academic Success Process
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-10 bg-accent-400" />
              <Star className="w-4 h-4 text-accent-500 fill-accent-400" />
              <div className="h-px w-10 bg-accent-400" />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-center gap-0">
            {processSteps.map((step, idx) => (
              <div key={step.label} className="flex flex-col sm:flex-row items-center flex-1">
                <div className="flex flex-col items-center text-center px-4 min-w-[120px]">
                  <div className="w-14 h-14 rounded-full bg-brand-900 flex items-center justify-center mb-3 shadow-md relative">
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-accent-500 flex items-center justify-center text-white text-xs font-bold">
                      {step.number}
                    </span>
                    {idx === 0 && <CheckCircle className="w-6 h-6 text-white" />}
                    {idx === 1 && <Eye className="w-6 h-6 text-white" />}
                    {idx === 2 && <BookOpen className="w-6 h-6 text-white" />}
                    {idx === 3 && <User className="w-6 h-6 text-white" />}
                    {idx === 4 && <BarChart2 className="w-6 h-6 text-white" />}
                  </div>
                  <p className="font-bold text-brand-900 text-xs tracking-widest uppercase mb-1">{step.label}</p>
                  <p className="text-brand-600 text-xs leading-relaxed max-w-[110px]">{step.desc}</p>
                </div>
                {idx < processSteps.length - 1 && (
                  <div className="hidden sm:flex items-center justify-center flex-shrink-0 mt-[-28px]">
                    <ArrowRight className="w-5 h-5 text-brand-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────────────────── */}
      <section className="py-14" style={{ background: 'linear-gradient(135deg, #c17f24 0%, #a06818 100%)' }}>
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-bold text-white drop-shadow mb-2 leading-tight">
                  Ready to Partner with<br />Future Foundations Education?
                </h2>
                <p className="text-amber-100 text-sm leading-relaxed">
                  Let's build a personalized academic plan for your child's success.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 lg:justify-end">
              <button
                onClick={openLeadModal}
                className="inline-flex items-center gap-2 bg-white text-amber-700 hover:bg-amber-50 px-7 py-4 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5 whitespace-nowrap"
              >
                <CalendarCheck className="w-5 h-5" />
                Schedule a Consultation
              </button>
              <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
                {[
                  { icon: User, label: 'Personalized Approach' },
                  { icon: BookOpen, label: 'Evidence-Based Instruction' },
                  { icon: Users, label: 'Family-Focused Partnership' },
                  { icon: BarChart2, label: 'Measurable Growth' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-white/70" />
                    <span className="text-white/80 text-xs">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
