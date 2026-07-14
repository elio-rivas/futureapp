import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe, ChevronDown, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const LOGO_URL = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

const SHOW_SUMMER_PROGRAM = false;

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'summerProgram' as const, href: '/summer-program', hidden: !SHOW_SUMMER_PROGRAM },
  { key: 'services' as const, href: '/services' },
  { key: 'about' as const, href: '/about' },
  { key: 'contact' as const, href: '/contact' },
  { key: 'payment' as const, href: '/payment-methods' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { locale, toggleLocale, t } = useLanguage();
  const programsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setProgramsOpen(false);
    setMobileProgramsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showTransparent = isHome && !scrolled;

  const openPrograms = () => {
    if (programsTimer.current) clearTimeout(programsTimer.current);
    setProgramsOpen(true);
  };
  const closePrograms = () => {
    programsTimer.current = setTimeout(() => setProgramsOpen(false), 150);
  };

  return (
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Top info bar */}
        <div className="hidden lg:block bg-brand-900 text-white">
          <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 py-2 text-xs">
            <div className="flex items-center gap-2 text-brand-100">
              <MapPin className="w-3.5 h-3.5" />
              <span>Orlando, FL · Serving Central Florida</span>
            </div>
            <div className="flex items-center gap-5">
              <a href="tel:4073019979" className="flex items-center gap-1.5 text-brand-100 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
                (407) 301-9979
              </a>
              <span className="text-brand-300">|</span>
              <button
                  onClick={toggleLocale}
                  className="flex items-center gap-1.5 text-brand-100 hover:text-white transition-colors font-semibold"
                  aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'en' ? 'Español' : 'English'}
              </button>
            </div>
          </div>
        </div>

        {/* Main nav bar */}
        <div
            className={`transition-all duration-300 ${
                showTransparent
                    ? 'bg-transparent'
                    : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-warm-100'
            }`}
        >
          <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform">
                <img
                    src={LOGO_URL}
                    alt="Future Foundations Education"
                    className="w-full h-full object-cover scale-[1.15]"
                />
              </div>
              <div>
              <span className={`font-display font-bold text-lg leading-tight block transition-colors ${showTransparent ? 'text-white' : 'text-brand-900'}`}>
                Future Foundations
              </span>
                <span className={`text-xs font-medium tracking-wide transition-colors ${showTransparent ? 'text-brand-200' : 'text-brand-600'}`}>
                EDUCATION
              </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Home */}
              <Link
                  to="/"
                  className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
                      location.pathname === '/'
                          ? showTransparent
                              ? 'text-white bg-white/10'
                              : 'text-brand-800 bg-brand-50'
                          : showTransparent
                              ? 'text-white/90 hover:text-white hover:bg-white/10'
                              : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100'
                  }`}
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
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
                        showTransparent
                            ? 'text-white/90 hover:text-white hover:bg-white/10'
                            : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100'
                    }`}
                >
                  {t.nav.programs}
                  <ChevronDown className={`w-4 h-4 transition-transform ${programsOpen ? 'rotate-180' : ''}`} />
                </button>
                {programsOpen && (
                    <div className="absolute top-full left-0 pt-2 w-72">
                      <div className="bg-white rounded-xl shadow-xl border border-warm-100 overflow-hidden py-2">
                        {t.nav.programItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                className="block px-5 py-3 text-sm text-brand-700 hover:text-brand-900 hover:bg-warm-50 font-medium transition-colors"
                            >
                              {item.label}
                            </Link>
                        ))}
                      </div>
                    </div>
                )}
              </div>

              {/* Remaining links */}
              {navLinks.filter((l) => !l.hidden && l.key !== 'home').map((link) => {
                const label = t.nav[link.key];
                const isActive = location.pathname.startsWith(link.href);
                return (
                    <Link
                        key={link.href}
                        to={link.href}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all ${
                            isActive
                                ? showTransparent
                                    ? 'text-white bg-white/10'
                                    : 'text-brand-800 bg-brand-50'
                                : showTransparent
                                    ? 'text-white/90 hover:text-white hover:bg-white/10'
                                    : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100'
                        }`}
                    >
                      {label}
                    </Link>
                );
              })}

              <a
                  href="tel:4073019979"
                  className="ml-3 inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-md"
              >
                <Phone className="w-4 h-4" />
                (407) 301-9979
              </a>
            </nav>

            {/* Mobile controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                  onClick={toggleLocale}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      showTransparent
                          ? 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                          : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100 border border-warm-200'
                  }`}
                  aria-label="Toggle language"
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'ES' : 'EN'}
              </button>

              <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`p-2 rounded-lg transition-colors ${
                      showTransparent ? 'text-white hover:bg-white/10' : 'text-brand-800 hover:bg-warm-100'
                  }`}
                  aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
            <div className="lg:hidden bg-white border-t border-warm-100 shadow-lg max-h-[calc(100vh-80px)] overflow-y-auto">
              <nav className="flex flex-col px-4 py-4 gap-1">
                <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold uppercase tracking-wide text-sm transition-colors"
                >
                  {t.nav.home}
                </Link>

                {/* Programs expandable */}
                <div>
                  <button
                      onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold uppercase tracking-wide text-sm transition-colors"
                  >
                    {t.nav.programs}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileProgramsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileProgramsOpen && (
                      <div className="ml-4 mt-1 mb-1 border-l-2 border-warm-200 pl-2 flex flex-col">
                        {t.nav.programItems.map((item) => (
                            <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2.5 rounded-lg text-brand-700 hover:text-brand-900 hover:bg-warm-50 text-sm font-medium transition-colors"
                            >
                              {item.label}
                            </Link>
                        ))}
                      </div>
                  )}
                </div>

                {navLinks.filter((l) => !l.hidden && l.key !== 'home').map((link) => {
                  const label = t.nav[link.key];
                  return (
                      <Link
                          key={link.href}
                          to={link.href}
                          onClick={() => setIsOpen(false)}
                          className="px-4 py-3 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-semibold uppercase tracking-wide text-sm transition-colors"
                      >
                        {label}
                      </Link>
                  );
                })}

                <a
                    href="tel:4073019979"
                    className="mt-2 inline-flex items-center justify-center gap-2 bg-brand-700 text-white px-5 py-3 rounded-lg font-semibold"
                >
                  <Phone className="w-4 h-4" />
                  (407) 301-9979
                </a>
              </nav>
            </div>
        )}
      </header>
  );
}
