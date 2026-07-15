import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { submitLead } from '../lib/supabase';
import { siteImages } from '../lib/images';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      await submitLead({
        parent_name: formData.name,
        email: formData.email,
        message: formData.message,
        source: 'contact_page',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={siteImages.contactHero}
            alt="Welcoming, comfortable space for young readers"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-950/80" />
        </div>

        <div className="relative container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                {t.contactPage.title}
              </h1>
              <p className="text-xl text-brand-200 leading-relaxed">
                {t.contactPage.subtitle}
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {status === 'success' ? (
                <div className="text-center py-8">
                  <CheckCircle className="w-14 h-14 text-success-500 mx-auto mb-4" />
                  <h3 className="font-bold text-xl text-brand-900 mb-2">{t.contactPage.messageSent}</h3>
                  <p className="text-brand-600">{t.contactPage.messageSentDesc}</p>
                  <button
                    onClick={() => { setStatus('idle'); setFormData({ name: '', email: '', message: '' }); }}
                    className="mt-4 text-brand-700 font-semibold hover:underline"
                  >
                    {t.contactPage.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-brand-800 mb-1.5">
                      {t.contactPage.firstName}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder={t.contactPage.firstNamePlaceholder}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brand-800 mb-1.5">
                      {t.contactPage.email}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder={t.contactPage.emailPlaceholder}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all text-brand-900 placeholder:text-brand-400 bg-warm-50"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-brand-800 mb-1.5">
                      {t.contactPage.message}
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder={t.contactPage.messagePlaceholder}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border border-warm-200 rounded-xl focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none transition-all resize-none text-brand-900 placeholder:text-brand-400 bg-warm-50"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-error-600 text-sm font-medium">Something went wrong. Please try again or call us directly at (407) 301-9979.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-800 disabled:bg-brand-500 text-white px-6 py-3.5 rounded-xl font-bold text-lg transition-all hover:shadow-lg disabled:cursor-not-allowed"
                  >
                    {status === 'submitting' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {t.contactPage.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-brand-900 mb-4">{t.contactPage.contactUsTitle}</h2>
              <p className="text-brand-600 mb-8 leading-relaxed">
                {t.contactPage.contactUsDesc}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-900 mb-1">{t.contactPage.location}</h3>
                    <p className="text-brand-600">944 E. Osceola Parkway</p>
                    <p className="text-brand-600">Kissimmee, FL 34744</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-900 mb-1">{t.contactPage.hours}</h3>
                    <p className="text-brand-600">{t.contactPage.hoursValue}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-900 mb-1">{t.contactPage.phone}</h3>
                    <a href="tel:4073019979" className="text-brand-700 hover:text-brand-800 font-medium">
                      (407) 301-9979
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-900 mb-1">{t.contactPage.emailLabel}</h3>
                    <a href="mailto:tutoring@futurefoundationsedu.com" className="text-brand-700 hover:text-brand-800 font-medium">
                      tutoring@futurefoundationsedu.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-96">
              <iframe
                title="Future Foundations Education Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3514.2!2d-81.4!3d28.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s944+E+Osceola+Pkwy%2C+Kissimmee%2C+FL+34744!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
