import { targetedReading } from '../lib/targetedReading';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

const PROGRAM_IMAGES: Record<string, string> = {
  [targetedReading.id]: targetedReading.image,
  'early-learners':
    'https://images.pexels.com/photos/8612992/pexels-photo-8612992.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
  elementary:
    'https://images.pexels.com/photos/5212695/pexels-photo-5212695.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
  'unique-needs':
    'https://images.pexels.com/photos/8422144/pexels-photo-8422144.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
  homeschool:
    'https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop',
};

const PROGRAM_ACCENTS: Record<string, string> = {
  [targetedReading.id]: targetedReading.accent,
  'early-learners': '#16a34a',
  elementary: '#486581',
  'unique-needs': '#b44d12',
  homeschool: '#334e68',
};

export default function ProgramsPage() {
  const { t } = useLanguage();
  const p = t.programsPage;
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        const timer = setTimeout(() => {
          el.focus({ preventScroll: true });
          el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.hash]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-brand-50 to-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {p.badge}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-5 leading-tight">
            {p.title}
          </h1>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {p.subtitle}
          </p>
        </div>
      </section>

      {/* Quick-nav chips */}
      <section className="pb-8 bg-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {p.programs.map((program) => (
              <a
                key={program.id}
                href={`#${program.id}`}
                className="inline-flex items-center gap-2 bg-white border border-warm-200 rounded-full px-5 py-2.5 text-sm font-semibold text-brand-700 hover:text-brand-900 hover:border-accent-400 hover:shadow-md transition-all"
              >
                {program.title}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Program sections */}
      {p.programs.map((program, index) => {
        const isEven = index % 2 === 0;
        const accent = PROGRAM_ACCENTS[program.id] ?? '#334e68';
        return (
          <section
            key={program.id}
            id={program.id}
            tabIndex={-1}
            aria-labelledby={`${program.id}-title`}
            className={`section-padding scroll-mt-24 ${isEven ? 'bg-white' : 'bg-warm-50'}`}
          >
            <div className="container-max">
              <div className={`grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto ${isEven ? '' : 'lg:flex-row-reverse'} ${program.id === targetedReading.id ? 'lg:items-start' : ''}`}>
                {/* Image */}
                <div className={`order-1 ${isEven ? '' : 'lg:order-2'}`}>
                  <div className="relative overflow-hidden rounded-2xl shadow-xl">
                    <img
                      src={PROGRAM_IMAGES[program.id]}
                      alt={'imageAlt' in program ? program.imageAlt : program.title}
                      className="w-full h-72 sm:h-80 object-cover"
                      style={{ objectPosition: program.id === targetedReading.id ? 'center 65%' : undefined }}
                      loading="lazy"
                    />
                    <div
                      className="absolute bottom-0 left-0 right-0 h-1.5"
                      style={{ background: accent, color: program.id === targetedReading.id ? '#102a43' : undefined }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`order-2 ${isEven ? '' : 'lg:order-1'}`}>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                    style={{ background: `${accent}20`, color: program.id === targetedReading.id ? '#8d2b0b' : accent }}
                  >
                    {program.tag}
                  </span>
                  <h2 id={`${program.id}-title`} className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-4 leading-tight">
                    {program.title}
                  </h2>
                  {'tagline' in program && (
                    <p className="font-display text-xl font-bold text-brand-900 mb-4">{program.tagline}</p>
                  )}
                  <p className="text-brand-600 text-base leading-relaxed mb-3 font-medium">
                    {program.summary}
                  </p>
                  <p className="text-brand-600 text-base leading-relaxed mb-6">
                    {program.description}
                  </p>
                  {'infoCards' in program && (
                    <dl className="grid sm:grid-cols-2 gap-4 mb-6">
                      {program.infoCards.map((card) => (
                        <div key={card.label} className="rounded-xl border border-warm-200 bg-warm-50 p-4">
                          <dt className="text-sm text-brand-600 mb-1">{card.label}</dt>
                          <dd className="font-semibold text-brand-900">{card.value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {'options' in program && (
                    <div className="mb-8">
                      <h3 className="font-display text-xl font-bold text-brand-900 mb-4">{program.optionsTitle}</h3>
                      <div className="grid sm:grid-cols-2 gap-4">
                        {program.options.map((option) => (
                          <div key={option.title} className="rounded-xl border border-warm-200 bg-warm-50 p-5">
                            <h4 className="font-display text-lg font-bold text-brand-900 mb-2">{option.title}</h4>
                            <p className="font-semibold text-brand-800 mb-2">{option.tagline}</p>
                            <p className="font-medium text-brand-700 text-sm mb-3">{option.schedule}</p>
                            <p className="text-brand-600 text-sm leading-relaxed">{option.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {'highlightsTitle' in program && (
                    <h3 className="font-display text-xl font-bold text-brand-900 mb-4">{program.highlightsTitle}</h3>
                  )}
                  <ul className="space-y-2.5 mb-8">
                    {program.highlights.map((highlight) => (
                      <li key={highlight} className="flex items-start gap-3">
                        <CheckCircle
                          className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: program.id === targetedReading.id ? '#8d2b0b' : accent }}
                        />
                        <span className="text-brand-700 text-sm leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  {'closingTitle' in program && (
                    <div className="rounded-xl border-l-4 border-accent-500 bg-brand-50 p-5 text-sm leading-relaxed text-brand-700 mb-6">
                      <h3 className="font-display text-xl font-bold text-brand-900 mb-3">{program.closingTitle}</h3>
                      <p className="mb-2">{program.closingQuestion}</p>
                      <p>{program.closingDescription}</p>
                    </div>
                  )}
                  <button
                    onClick={() => openLeadModal({ defaultService: program.title })}
                    className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all hover:shadow-lg hover:-translate-y-0.5"
                    style={{ background: accent, color: program.id === targetedReading.id ? '#102a43' : undefined }}
                  >
                    {'inquireBtn' in program ? program.inquireBtn : p.inquireBtn}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Final CTA */}
      <section className="section-padding bg-brand-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-80 h-80 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container-max relative text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-brand-200 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            {t.cta.description}
          </p>
          <button
            onClick={() => openLeadModal()}
            className="inline-flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.cta.enrollNow}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </>
  );
}
