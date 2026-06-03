import { CreditCard, Building, GraduationCap, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

const methodIcons = [GraduationCap, CreditCard, Building];
const methodColors = ['brand', 'accent', 'success'];

const colorMap: Record<string, { bg: string; icon: string }> = {
  brand: { bg: 'bg-brand-50', icon: 'text-brand-600' },
  accent: { bg: 'bg-accent-50', icon: 'text-accent-600' },
  success: { bg: 'bg-success-50', icon: 'text-success-600' },
};

export default function PaymentPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.paymentPage.badge}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            {t.paymentPage.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t.paymentPage.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-4xl mx-auto space-y-8">
            {t.paymentPage.methods.map((method, index) => {
              const Icon = methodIcons[index];
              const colors = colorMap[methodColors[index]];
              return (
                <div
                  key={method.title}
                  className="flex flex-col sm:flex-row gap-6 p-8 rounded-2xl bg-gray-50 hover:shadow-md transition-all"
                >
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${colors.icon}`} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{method.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{method.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-4">{t.paymentPage.contactTitle}</h2>
              <p className="text-gray-600 mb-8">
                {t.paymentPage.contactDesc}
              </p>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{t.paymentPage.location}</h3>
                    <p className="text-gray-600 text-sm">944 E. Osceola Parkway, Kissimmee, FL 34744</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{t.paymentPage.hours}</h3>
                    <p className="text-gray-600 text-sm">{t.paymentPage.hoursValue}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{t.paymentPage.phone}</h3>
                    <a href="tel:4073019979" className="text-brand-600 text-sm font-medium">(407) 301-9979</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-brand-50 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-0.5">{t.paymentPage.emailLabel}</h3>
                    <a href="mailto:tutoring@futurefoundationsedu.com" className="text-brand-600 text-sm font-medium">
                      tutoring@futurefoundationsedu.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-lg h-72 lg:h-80">
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
