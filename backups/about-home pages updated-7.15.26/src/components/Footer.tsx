import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.88 2.89 2.89 0 0 1-2.88-2.88 2.89 2.89 0 0 1 2.88-2.88c.28 0 .56.04.82.1v-3.5a6.37 6.37 0 0 0-.82-.05A6.34 6.34 0 0 0 3.15 15.7a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.4a8.16 8.16 0 0 0 3.76.92V6.87a4.85 4.85 0 0 1-.01-.18Z" />
    </svg>
  );
}

const LOGO_URL = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand-900 text-white">
      <div className="container-max section-padding">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={LOGO_URL}
                  alt="Future Foundations Education"
                  className="w-full h-full object-cover scale-[1.15]"
                />
              </div>
              <div>
                <span className="font-display font-bold text-lg block">Future Foundations</span>
                <span className="text-xs text-brand-300 font-medium tracking-wide">EDUCATION</span>
              </div>
            </Link>
            <p className="text-brand-300 leading-relaxed max-w-md mb-6">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-brand-800 hover:bg-brand-700 flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">{t.footer.quickLinks}</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-brand-300 hover:text-white transition-colors">{t.nav.home}</Link>
              <Link to="/summer-program" className="text-brand-300 hover:text-white transition-colors">{t.nav.summerProgram}</Link>
              <Link to="/homeschool-plans" className="text-brand-300 hover:text-white transition-colors">{t.nav.services}</Link>
              <Link to="/about" className="text-brand-300 hover:text-white transition-colors">{t.nav.about}</Link>
              <Link to="/contact" className="text-brand-300 hover:text-white transition-colors">{t.nav.contact}</Link>
            </nav>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-5">{t.footer.contactUs}</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-400 flex-shrink-0 mt-0.5" />
                <div className="text-brand-300">
                  <p>944 E Osceola Pkwy</p>
                  <p>Kissimmee, FL 34744</p>
                </div>
              </div>
              <a href="tel:4073019979" className="flex items-center gap-3 text-brand-300 hover:text-white transition-colors">
                <Phone className="w-5 h-5 text-brand-400 flex-shrink-0" />
                (407) 301-9979
              </a>
              <a href="mailto:tutoring@futurefoundationsedu.com" className="flex items-center gap-3 text-brand-300 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-brand-400 flex-shrink-0" />
                <span className="break-all">tutoring@futurefoundationsedu.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-800 pt-8 text-center">
          <p className="text-brand-500 text-sm">
            &copy; {new Date().getFullYear()} {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
