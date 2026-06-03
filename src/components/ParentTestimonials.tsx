import { Star } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function ParentTestimonials() {
  const { t } = useLanguage();

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-14">
          <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
            {t.parentTestimonials.badge}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-brand-900 mb-5 leading-tight">
            {t.parentTestimonials.title}
          </h2>
          <p className="text-lg text-brand-600 max-w-2xl mx-auto leading-relaxed">
            {t.parentTestimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {t.parentTestimonials.testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-warm-50 rounded-2xl p-7 border border-warm-100"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-accent-500 fill-accent-500" />
                ))}
              </div>

              <p className="text-brand-700 leading-relaxed mb-6 text-[15px]">
                "{testimonial.text}"
              </p>

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
  );
}
