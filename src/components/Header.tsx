import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { openLeadModal } from '../lib/leadModalStore';

const LOGO_URL =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

const SHOW_SUMMER_PROGRAM = false;

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'summerProgram' as const, href: '/summer-program', hidden: !SHOW_SUMMER_PROGRAM },
  { key: 'services' as const, href: '/homeschool-plans' },
  { key: 'payment' as const, href: '/tuition-enrollment' },
  { key: 'about' as const, href: '/about' },
  { key: 'contact' as const, href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [assessmentsOpen, setAssessmentsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileAssessmentsOpen, setMobileAssessmentsOpen] = useState(false);
  const location = useLocation();
  const { locale, toggleLocale, t } = useLanguage();
  const programsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const assessmentsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
    setAssessmentsOpen(false);
    setMobileProgramsOpen(false);
    setMobileAssessmentsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const openPrograms = () => {
    if (programsTimer.current) clearTimeout(programsTimer.current);
    setProgramsOpen(true);
  };
  const closePrograms = () => {
    programsTimer.current = setTimeout(() => setProgramsOpen(false), 150);
  };

  const openAssessments = () => {
    if (assessmentsTimer.current) clearTimeout(assessmentsTimer.current);
    setAssessmentsOpen(true);
  };
  const closeAssessments = () => {
    assessmentsTimer.current = setTimeout(() => setAssessmentsOpen(false), 150);
  };

  const navItemBase = `
    inline-flex items-center gap-1 px-2.5 py-2 rounded-md
    text-[11px] font-semibold uppercase tracking-normal
    whitespace-nowrap transition-all duration-150
  `;
  const navItemActive = 'text-brand-800 bg-brand-50';
  const navItemIdle = 'text-brand-700 hover:text-brand-900 hover:bg-warm-100';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* ── Top info bar ───────────────────────────────────────────── */}
      <div className="hidden xl:block bg-brand-900 text-white">
        <div className="max-w-screen-xl mx-auto px-6 2xl:px-8 flex items-center justify-between h-8 text-xs">
          <div className="flex items-center gap-2 text-brand-100">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>Kissimmee, FL · Serving Central Florida</span>
          </div>
          <button
            onClick={toggleLocale}
            className="flex items-center gap-1.5 text-brand-100 hover:text-white transition-colors font-semibold py-1 px-2 rounded"
            aria-label="Toggle language"
          >
            <Globe className="w-3.5 h-3.5" />
            {locale === 'en' ? 'Español' : 'English'}
          </button>
        </div>
      </div>

      {/* ── Main nav bar — always solid white ─────────────────────── */}
      <div className="bg-white shadow-sm border-b border-warm-100">
        <div className="max-w-screen-xl mx-auto px-6 2xl:px-8 flex items-center h-[68px] gap-6">

          {/* ── Zone 1: Logo ─────────────────────────────────────── */}
          <Link
            to="/"
            aria-label="Future Foundations Education — Home"
            className="flex items-center gap-3 flex-none group"
          >
            <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={LOGO_URL}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover scale-[1.15]"
              />
            </div>
            <div className="leading-none">
              <span className="font-display font-bold text-[15px] leading-tight block text-brand-900">
                Future Foundations
              </span>
              <span className="text-[10px] font-semibold tracking-widest text-brand-500">
                EDUCATION
              </span>
            </div>
          </Link>

          {/* ── Zone 2: Desktop nav ──────────────────────────────── */}
          <nav
            aria-label="Main navigation"
            className="hidden xl:flex items-center justify-center flex-1 gap-0.5"
          >
            <Link
              to="/"
              className={`${navItemBase} ${location.pathname === '/' ? navItemActive : navItemIdle}`}
            >
              {t.nav.home}
            </Link>

            {/* Programs dropdown */}
            <div
              className="relative"
              onMouseEnter={openPrograms}
              onMouseLeave={closePrograms}
            >
              <Link
                to="/programs"
                aria-haspopup="true"
                aria-expanded={programsOpen}
                className={`${navItemBase} ${location.pathname === '/programs' ? navItemActive : navItemIdle}`}
              >
                {t.nav.programs}
                <ChevronDown
                  className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                    programsOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>
              {programsOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-64"
                  onMouseEnter={openPrograms}
                  onMouseLeave={closePrograms}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-warm-100 overflow-hidden py-1.5">
                    {t.nav.programItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-4 py-2.5 text-sm text-brand-700 hover:text-brand-900 hover:bg-warm-50 font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Homeschool Plans */}
            <Link
              to="/homeschool-plans"
              className={`${navItemBase} ${
                location.pathname === '/homeschool-plans' ? navItemActive : navItemIdle
              }`}
            >
              {t.nav.services}
            </Link>

            {/* Academic Assessments dropdown */}
            <div
              className="relative"
              onMouseEnter={openAssessments}
              onMouseLeave={closeAssessments}
            >
              <Link
                to="/assessments"
                aria-haspopup="true"
                aria-expanded={assessmentsOpen}
                className={`${navItemBase} ${location.pathname === '/assessments' ? navItemActive : navItemIdle}`}
              >
                {t.nav.assessments}
                <ChevronDown
                  className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                    assessmentsOpen ? 'rotate-180' : ''
                  }`}
                />
              </Link>
              {assessmentsOpen && (
                <div
                  className="absolute top-full left-0 pt-2 w-72"
                  onMouseEnter={openAssessments}
                  onMouseLeave={closeAssessments}
                >
                  <div className="bg-white rounded-xl shadow-xl border border-warm-100 overflow-hidden py-1.5">
                    {t.nav.assessmentItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="block px-4 py-2.5 text-sm text-brand-700 hover:text-brand-900 hover:bg-warm-50 font-medium transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Payment */}
            <Link
              to="/tuition-enrollment"
              className={`${navItemBase} ${
                location.pathname === '/tuition-enrollment' ? navItemActive : navItemIdle
              }`}
            >
              {t.nav.payment}
            </Link>

            {/* About & Contact */}
            {navLinks
              .filter(
                (l) =>
                  !l.hidden &&
                  l.key !== 'home' &&
                  l.key !== 'services' &&
                  l.key !== 'payment'
              )
              .map((link) => {
                const label = t.nav[link.key];
                const isActive = location.pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`${navItemBase} ${isActive ? navItemActive : navItemIdle}`}
                  >
                    {label}
                  </Link>
                );
              })}
          </nav>

          {/* ── Zone 3: CTA + mobile controls ────────────────────── */}
          <div className="flex items-center gap-3 flex-none ml-auto xl:ml-0">
            <button
              onClick={() => openLeadModal()}
              className="hidden xl:inline-flex items-center justify-center whitespace-nowrap bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-normal transition-all hover:shadow-md"
            >
              {t.nav.scheduleConsultation}
            </button>

            {/* Mobile: language toggle */}
            <button
              onClick={toggleLocale}
              className="xl:hidden inline-flex items-center gap-1.5 h-10 px-3 rounded-lg text-sm font-semibold transition-all text-brand-700 hover:text-brand-900 hover:bg-warm-100 border border-warm-200"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              {locale === 'en' ? 'ES' : 'EN'}
            </button>

            {/* Mobile: hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="xl:hidden h-10 w-10 flex items-center justify-center rounded-lg transition-colors text-brand-800 hover:bg-warm-100"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ── Mobile menu ────────────────────────────────────────────── */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="xl:hidden fixed inset-0 top-[68px] bg-white z-40 flex flex-col"
        >
          <div className="bg-brand-900 text-brand-100 flex items-center gap-2 px-5 py-2.5 text-xs">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span>Kissimmee, FL · Serving Central Florida</span>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1"
          >
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors"
            >
              {t.nav.home}
            </Link>

            <div>
              <button
                onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                aria-expanded={mobileProgramsOpen}
                aria-controls="mobile-programs"
                className="w-full flex items-center justify-between h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors"
              >
                {t.nav.programs}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileProgramsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileProgramsOpen && (
                <div
                  id="mobile-programs"
                  className="mt-1 mb-1 ml-4 border-l-2 border-warm-200 pl-3 flex flex-col gap-0.5"
                >
                  {t.nav.programItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center h-10 px-4 rounded-lg text-brand-700 hover:text-brand-900 hover:bg-warm-50 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/homeschool-plans"
              onClick={() => setIsOpen(false)}
              className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors"
            >
              {t.nav.services}
            </Link>

            <div>
              <div className="flex items-center justify-between">
                <Link
                  to="/assessments"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors"
                >
                  {t.nav.assessments}
                </Link>
                <button
                  onClick={() => setMobileAssessmentsOpen(!mobileAssessmentsOpen)}
                  aria-expanded={mobileAssessmentsOpen}
                  aria-controls="mobile-assessments"
                  className="h-11 w-11 flex items-center justify-center rounded-lg text-brand-800 hover:bg-warm-50 transition-colors"
                >
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileAssessmentsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
              {mobileAssessmentsOpen && (
                <div
                  id="mobile-assessments"
                  className="mt-1 mb-1 ml-4 border-l-2 border-warm-200 pl-3 flex flex-col gap-0.5"
                >
                  {t.nav.assessmentItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center h-10 px-4 rounded-lg text-brand-700 hover:text-brand-900 hover:bg-warm-50 text-sm font-medium transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/tuition-enrollment"
              onClick={() => setIsOpen(false)}
              className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors"
            >
              {t.nav.payment}
            </Link>

            {navLinks
              .filter(
                (l) =>
                  !l.hidden &&
                  l.key !== 'home' &&
                  l.key !== 'services' &&
                  l.key !== 'payment'
              )
              .map((link) => {
                const label = t.nav[link.key];
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors"
                  >
                    {label}
                  </Link>
                );
              })}

            <div className="mt-4 pt-4 border-t border-warm-100">
              <button
                onClick={() => {
                  openLeadModal();
                  setIsOpen(false);
                }}
                className="w-full flex items-center justify-center h-12 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-sm uppercase tracking-normal transition-all"
              >
                {t.nav.scheduleConsultation}
              </button>
            </div>
          </nav>
        </div>
      )}

    </header>
  );
}
