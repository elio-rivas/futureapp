import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const LOGO_URL =
    'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

const SHOW_SUMMER_PROGRAM = false;

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'summerProgram' as const, href: '/summer-program', hidden: !SHOW_SUMMER_PROGRAM },
  { key: 'services' as const, href: '/services' },
  { key: 'payment' as const, href: '/payment-methods' },
  { key: 'about' as const, href: '/about' },
  { key: 'contact' as const, href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [assessmentsOpen, setAssessmentsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const [mobileAssessmentsOpen, setMobileAssessmentsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { locale, toggleLocale, t } = useLanguage();
  const programsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const assessmentsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
    setAssessmentsOpen(false);
    setMobileProgramsOpen(false);
    setMobileAssessmentsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const showTransparent = isHome && !scrolled;

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

  // Shared nav item styles
  const navItemBase = `
    inline-flex items-center gap-1 px-2.5 py-2 rounded-md
    text-[11px] font-semibold uppercase tracking-normal
    whitespace-nowrap transition-all duration-150
  `;
  const navItemActive = showTransparent
      ? 'text-white bg-white/15'
      : 'text-brand-800 bg-brand-50';
  const navItemIdle = showTransparent
      ? 'text-white/90 hover:text-white hover:bg-white/10'
      : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100';

  return (
      <header className="fixed top-0 left-0 right-0 z-50">

        {/* ── Top info bar ───────────────────────────────────────────── */}
        <div className="hidden xl:block bg-brand-900 text-white">
          <div className="max-w-screen-xl mx-auto px-6 2xl:px-8 flex items-center justify-between h-8 text-xs">
            <div className="flex items-center gap-2 text-brand-100">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>Orlando, FL · Serving Central Florida</span>
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

        {/* ── Main nav bar ───────────────────────────────────────────── */}
        <div
            className={`transition-all duration-300 ${
                showTransparent
                    ? 'bg-transparent'
                    : 'bg-white/97 backdrop-blur-md shadow-sm border-b border-warm-100'
            }`}
        >
          {/*
          Three-zone layout:
            [logo — flex-none]  [nav — flex-1 centered]  [cta — flex-none]
        */}
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
              <span
                  className={`font-display font-bold text-[15px] leading-tight block transition-colors ${
                      showTransparent ? 'text-white' : 'text-brand-900'
                  }`}
              >
                Future Foundations
              </span>
                <span
                    className={`text-[10px] font-semibold tracking-widest transition-colors ${
                        showTransparent ? 'text-brand-200' : 'text-brand-500'
                    }`}
                >
                EDUCATION
              </span>
              </div>
            </Link>

            {/* ── Zone 2: Desktop nav (hidden below xl) ────────────── */}
            <nav
                aria-label="Main navigation"
                className="hidden xl:flex items-center justify-center flex-1 gap-0.5"
            >
              {/* Home */}
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
                <button
                    aria-haspopup="true"
                    aria-expanded={programsOpen}
                    className={`${navItemBase} ${navItemIdle}`}
                >
                  {t.nav.programs}
                  <ChevronDown
                      className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                          programsOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>
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
                  to="/services"
                  className={`${navItemBase} ${
                      location.pathname === '/services' ? navItemActive : navItemIdle
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
                <button
                    aria-haspopup="true"
                    aria-expanded={assessmentsOpen}
                    className={`${navItemBase} ${navItemIdle}`}
                >
                  {t.nav.assessments}
                  <ChevronDown
                      className={`w-3 h-3 flex-shrink-0 transition-transform duration-200 ${
                          assessmentsOpen ? 'rotate-180' : ''
                      }`}
                  />
                </button>
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
                  to="/payment-methods"
                  className={`${navItemBase} ${
                      location.pathname === '/payment-methods' ? navItemActive : navItemIdle
                  }`}
              >
                {t.nav.payment}
              </Link>

              {/* Remaining links (about, contact) */}
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
              {/* Desktop CTA */}
              <button
                  onClick={() => window.dispatchEvent(new Event('openLeadModal'))}
                  className="hidden xl:inline-flex items-center justify-center whitespace-nowrap bg-accent-500 hover:bg-accent-600 text-white px-4 py-2 rounded-lg text-[11px] font-bold uppercase tracking-normal transition-all hover:shadow-md"
              >
                {t.nav.scheduleConsultation}
              </button>

              {/* Mobile: language toggle */}
              <button
                  onClick={toggleLocale}
                  className={`xl:hidden inline-flex items-center gap-1.5 h-10 px-3 rounded-lg text-sm font-semibold transition-all ${
                      showTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10 border border-white/25'
                          : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100 border border-warm-200'
                  }`}
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
                  className={`xl:hidden h-10 w-10 flex items-center justify-center rounded-lg transition-colors ${
                      showTransparent
                          ? 'text-white hover:bg-white/10'
                          : 'text-brand-800 hover:bg-warm-100'
                  }`}
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
                style={{ top: scrolled || !isHome ? '68px' : '68px' }}
            >
              {/* Location bar on mobile */}
              <div className="bg-brand-900 text-brand-100 flex items-center gap-2 px-5 py-2.5 text-xs">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span>Orlando, FL · Serving Central Florida</span>
              </div>

              <nav
                  aria-label="Mobile navigation"
                  className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-1"
              >
                <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {t.nav.home}
                </Link>

                {/* Programs expandable */}
                <div>
                  <button
                      onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                      aria-expanded={mobileProgramsOpen}
                      aria-controls="mobile-programs"
                      className="w-full flex items-center justify-between h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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
                                className="flex items-center h-10 px-4 rounded-lg text-brand-700 hover:text-brand-900 hover:bg-warm-50 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                            >
                              {item.label}
                            </Link>
                        ))}
                      </div>
                  )}
                </div>

                <Link
                    to="/services"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  {t.nav.services}
                </Link>

                {/* Assessments expandable */}
                <div>
                  <button
                      onClick={() => setMobileAssessmentsOpen(!mobileAssessmentsOpen)}
                      aria-expanded={mobileAssessmentsOpen}
                      aria-controls="mobile-assessments"
                      className="w-full flex items-center justify-between h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                  >
                    {t.nav.assessments}
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                            mobileAssessmentsOpen ? 'rotate-180' : ''
                        }`}
                    />
                  </button>
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
                                className="flex items-center h-10 px-4 rounded-lg text-brand-700 hover:text-brand-900 hover:bg-warm-50 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                            >
                              {item.label}
                            </Link>
                        ))}
                      </div>
                  )}
                </div>

                <Link
                    to="/payment-methods"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
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
                              className="flex items-center h-11 px-4 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold text-sm uppercase tracking-normal transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                          >
                            {label}
                          </Link>
                      );
                    })}

                <div className="mt-4 pt-4 border-t border-warm-100">
                  <button
                      onClick={() => {
                        window.dispatchEvent(new Event('openLeadModal'));
                        setIsOpen(false);
                      }}
                      className="w-full flex items-center justify-center h-12 bg-accent-500 hover:bg-accent-600 text-white rounded-lg font-bold text-sm uppercase tracking-normal transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2"
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
