import { Search, Layers, TrendingUp, Target, Home, MessageCircle, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const stepIcons = [Search, Layers, TrendingUp, Target, Home, MessageCircle, Heart];

export default function ServicesPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-50 to-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.servicesPage.badge}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-6 leading-tight">
            {t.servicesPage.title}
          </h1>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {t.servicesPage.subtitle}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="max-w-3xl mx-auto mb-16">
            <img
              src="https://images.pexels.com/photos/8612927/pexels-photo-8612927.jpeg?auto=compress&cs=tinysrgb&w=900&h=400&fit=crop"
              alt="Child engaged in reading with personalized support"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-lg"
            />
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-brand-900 mb-12 text-center">
            {t.servicesPage.hereIsWhatWeDo}
          </h2>

          <div className="max-w-4xl mx-auto space-y-6">
            {t.servicesPage.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <div
                  key={step.title}
                  className="flex gap-5 items-start p-6 rounded-2xl bg-warm-50 hover:bg-brand-50 transition-colors duration-300 group border border-warm-100"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-brand-100 group-hover:bg-brand-200 flex items-center justify-center transition-colors">
                    <Icon className="w-5 h-5 text-brand-700" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-brand-900 mb-2">
                      <span className="text-brand-600 mr-2">{index + 1}.</span>
                      {step.title}
                    </h3>
                    <p className="text-brand-600 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-3">
              {t.servicesPage.customerFeedback}
            </h2>
            <p className="text-brand-600">{t.servicesPage.customerFeedbackDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.servicesPage.testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="bg-white rounded-2xl p-7 border border-warm-100 shadow-sm"
              >
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-4 h-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <p className="text-brand-700 leading-relaxed mb-6 text-[15px]">"{testimonial.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-warm-200">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                    <span className="text-brand-700 font-bold text-sm">
                      {testimonial.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-brand-900 text-sm">{testimonial.name}</p>
                    <p className="text-brand-500 text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-brand-800">
        <div className="container-max text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
            {t.servicesPage.readyToStart}
          </h2>
          <p className="text-brand-200 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            {t.servicesPage.readyToStartDesc}
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            {t.servicesPage.bookConsultation}
          </Link>
        </div>
      </section>
    </>
  );
}
