import { Heart, Lightbulb, Target, UserCheck, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

const valueIcons = [Heart, Lightbulb, Target];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <section className="pt-32 pb-16 bg-gradient-to-b from-brand-50 to-warm-50">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-brand-600 font-semibold text-sm tracking-wider uppercase mb-3">
              {t.about.badge}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-brand-900 mb-8 leading-tight">
              {t.aboutPage.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-lg text-brand-700 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.aboutPage.p1 }} />
              <p className="text-brand-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.aboutPage.p2 }} />
              <p className="text-brand-600 leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: t.aboutPage.p3 }} />
              <p className="text-brand-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: t.aboutPage.p4 }} />
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop"
                alt="Children reading together in a classroom"
                className="rounded-2xl shadow-lg w-full h-80 lg:h-[420px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-800">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {t.aboutPage.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-brand-200 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Director Section */}
      <section className="section-padding bg-warm-50">
        <div className="container-max">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-3 leading-tight">
                {t.aboutPage.directorTitle}
              </h2>
            </div>
            <div className="bg-white rounded-2xl p-8 lg:p-10 border border-warm-100 shadow-sm">
              <p className="text-brand-700 leading-relaxed mb-5 text-lg">
                {t.aboutPage.directorPhilosophy}
              </p>
              <p className="text-brand-600 leading-relaxed">
                {t.aboutPage.directorApproach}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-tight">
              {t.about.visionTitle}
            </h2>
            <p className="text-lg text-brand-600 max-w-3xl mx-auto leading-relaxed" dangerouslySetInnerHTML={{ __html: t.aboutPage.visionDescription }} />
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-warm-50 rounded-2xl p-7 text-center border border-warm-100 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-brand-700" />
              </div>
              <h3 className="font-bold text-lg text-brand-900 mb-2">{t.aboutPage.academicExcellence}</h3>
              <p className="text-brand-600 text-sm leading-relaxed">{t.aboutPage.academicExcellenceDesc}</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-7 text-center border border-warm-100 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-6 h-6 text-accent-700" />
              </div>
              <h3 className="font-bold text-lg text-brand-900 mb-2">{t.aboutPage.smallGroups}</h3>
              <p className="text-brand-600 text-sm leading-relaxed">{t.aboutPage.smallGroupsDesc}</p>
            </div>
            <div className="bg-warm-50 rounded-2xl p-7 text-center border border-warm-100 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-success-700" />
              </div>
              <h3 className="font-bold text-lg text-brand-900 mb-2">{t.aboutPage.characterBuilding}</h3>
              <p className="text-brand-600 text-sm leading-relaxed">{t.aboutPage.characterBuildingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-warm-50">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-brand-900 mb-4 leading-tight">
              {t.about.missionTitle}
            </h2>
            <p className="text-brand-600 max-w-3xl mx-auto leading-relaxed">
              {t.aboutPage.missionDescription}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {t.about.values.map((val, index) => {
              const Icon = valueIcons[index];
              return (
                <div
                  key={val.title}
                  className="text-center p-7 rounded-2xl bg-white border border-warm-100 hover:shadow-sm transition-shadow duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-6 h-6 text-brand-700" />
                  </div>
                  <h4 className="font-bold text-xl text-brand-900 mb-3">{val.title}</h4>
                  <p className="text-brand-600 leading-relaxed text-sm">{val.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center bg-brand-700 hover:bg-brand-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              {t.aboutPage.bookConsultation}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
