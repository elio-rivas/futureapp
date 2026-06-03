import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const LOGO_URL = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

const navLinks = [
  { key: 'home' as const, href: '/' },
  { key: 'summerProgram' as const, href: '/summer-program' },
  { key: 'services' as const, href: '/services' },
  { key: 'about' as const, href: '/about' },
  { key: 'contact' as const, href: '/contact' },
  { key: 'payment' as const, href: '/payment-methods' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { locale, toggleLocale, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const showTransparent = isHome && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
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

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const label = t.nav[link.key];
            const isActive = link.href === '/' ? location.pathname === '/' : location.pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
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

          <button
            onClick={toggleLocale}
            className={`ml-2 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
              showTransparent
                ? 'text-white/90 hover:text-white hover:bg-white/10 border border-white/20'
                : 'text-brand-700 hover:text-brand-900 hover:bg-warm-100 border border-warm-200'
            }`}
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {locale === 'en' ? 'ES' : 'EN'}
          </button>

          <a
            href="tel:4073019979"
            className="ml-3 inline-flex items-center gap-2 bg-brand-700 hover:bg-brand-800 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-md"
          >
            <Phone className="w-4 h-4" />
            (407) 301-9979
          </a>
        </nav>

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

      {isOpen && (
        <div className="lg:hidden bg-white border-t border-warm-100 shadow-lg">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => {
              const label = t.nav[link.key];
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-brand-800 hover:text-brand-900 hover:bg-warm-50 font-medium transition-colors"
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
