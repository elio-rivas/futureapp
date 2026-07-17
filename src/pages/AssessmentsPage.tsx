import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import {
  BarChart2, ClipboardList, Map, FileText,
  ArrowRight, Calendar, Sparkles, Check, ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

const sectionIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  bar: BarChart2,
  clipboard: ClipboardList,
  map: Map,
  file: FileText,
};

export default function AssessmentsPage() {
  const { t } = useLanguage();
  const a = t.assessmentsPage;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
         1. HERO
      ════════════════════════════════════════════════════════════════ */}
      <section className="pt-[68px] bg-gradient-to-b from-brand-50 to-warm-50 overflow-hidden">
        <div className="max-w-screen-xl mx-auto px-8 2xl:px-12">
          <div className="py-16 lg:py-20 text-center max-w-3xl mx-auto">
            <span className="inline-block text-accent-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {a.heroBadge}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-900 leading-tight mb-4">
              {a.heroTitle}
            </h1>
            <p className="text-brand-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {a.heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => openLeadModal()}
                className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                {a.heroPrimaryBtn}
              </button>
              <a
                href={`#${a.sections[0].id}`}
                className="inline-flex items-center gap-2 border-2 border-brand-300 text-brand-800 hover:bg-brand-50 px-6 py-3 rounded-lg font-bold text-xs uppercase tracking-widest transition-all"
              >
                {a.heroSecondaryBtn}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         2. QUICK NAV / ANCHOR CARDS
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 uppercase tracking-widest mb-3">
              {a.navIntro}
            </h2>
            <p className="text-brand-600 max-w-2xl mx-auto">{a.navSubtitle}</p>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16 bg-warm-300" />
              <span className="text-accent-500 text-lg">★</span>
              <div className="h-px w-16 bg-warm-300" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {a.sections.map((s) => {
              const Icon = sectionIcons[s.icon] ?? ClipboardList;
              return (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group flex flex-col items-start bg-warm-50 rounded-2xl p-6 border border-warm-100 hover:shadow-lg hover:border-accent-300 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-900 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 text-accent-400" />
                  </div>
                  <h3 className="font-bold text-brand-900 text-base mb-1">{s.title}</h3>
                  <p className="text-brand-600 text-sm leading-relaxed mb-3">{s.tagline}</p>
                  <span className="inline-flex items-center gap-1 text-accent-600 text-xs font-bold uppercase tracking-wider mt-auto">
                    {a.heroSecondaryBtn}
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         3. ASSESSMENT SECTIONS (anchored)
      ════════════════════════════════════════════════════════════════ */}
      {a.sections.map((s, idx) => {
        const Icon = sectionIcons[s.icon] ?? ClipboardList;
        const isAlt = idx % 2 === 1;
        return (
          <section
            key={s.id}
            id={s.id}
            className={`section-padding scroll-mt-24 ${isAlt ? 'bg-warm-50 border-t border-warm-100' : 'bg-white'}`}
          >
            <div className="container-max max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-brand-900 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-7 h-7 text-accent-400" />
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 leading-tight">
                    {s.title}
                  </h2>
                  <p className="text-accent-600 font-display italic text-sm">{s.tagline}</p>
                </div>
              </div>

              <p className="text-brand-600 leading-relaxed mb-6">{s.desc}</p>

              <div className="grid sm:grid-cols-2 gap-3 mb-6">
                {s.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-brand-700" />
                    </span>
                    <span className="text-sm text-brand-700 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <div className="bg-brand-50 border-l-4 border-accent-400 rounded-r-xl p-5">
                <p className="text-brand-800 text-sm leading-relaxed">
                  <span className="font-bold uppercase tracking-wider text-xs block mb-1 text-brand-900">
                    {a.heroBadge}
                  </span>
                  {s.outcomes}
                </p>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => openLeadModal({ defaultMessage: `I am interested in ${s.title}` })}
                  className="inline-flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest transition-all hover:shadow-lg"
                >
                  <Calendar className="w-4 h-4" />
                  {a.heroPrimaryBtn}
                </button>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══════════════════════════════════════════════════════════════
         4. THE ACADEMIC ASSESSMENT REPORT
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-brand-900">
        <div className="container-max max-w-4xl">
          <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-7 h-7 text-accent-400" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              {a.reportTitle}
            </h2>
            <p className="text-brand-200 max-w-2xl mx-auto leading-relaxed">{a.reportSubtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {a.reportSections.map((rs, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-accent-500 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-white text-sm mb-1">{rs.title}</h3>
                    <p className="text-brand-200 text-sm leading-relaxed">{rs.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         5. FINAL CTA
      ════════════════════════════════════════════════════════════════ */}
      <section className="section-padding bg-warm-50 border-t border-warm-100 relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-brand-900 flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-accent-400" />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-900 mb-3">
              {a.finalCtaTitle}
            </h2>
            <p className="text-brand-600 text-base leading-relaxed mb-8">{a.finalCtaDesc}</p>
            <button
              onClick={() => openLeadModal()}
              className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all hover:shadow-xl"
            >
              <Calendar className="w-5 h-5" />
              {a.finalCtaBtn}
            </button>
            <div className="mt-6">
              <Link
                to="/homeschool-plans"
                className="inline-flex items-center gap-1 text-brand-600 hover:text-brand-900 text-sm font-semibold transition-colors"
              >
                {t.nav.services}
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
