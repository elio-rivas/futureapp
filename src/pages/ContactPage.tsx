import { useState } from 'react';
import {
  MapPin, Phone, Mail, MessageSquare, Calendar, Monitor,
  Building2, CheckCircle, Loader2, Send, Info, BookOpen,
  Heart, Users, Star,
} from 'lucide-react';
import { submitLead } from '../lib/supabase';
import { openLeadModal } from '../lib/leadModalStore';
import { useLanguage } from '../i18n/LanguageContext';

const LOGO_URL =
  'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

const SERVICE_AREAS = [
  'Kissimmee', 'St. Cloud', 'Celebration', 'Poinciana',
  'Hunters Creek', 'Lake Nona', 'Orlando', 'Online Throughout Florida',
];

type FormData = {
  parentName: string;
  email: string;
  phone: string;
  studentName: string;
  studentGrade: string;
  program: string;
  howCanWeHelp: string;
  preferredContact: string;
  message: string;
};

const emptyForm: FormData = {
  parentName: '', email: '', phone: '', studentName: '',
  studentGrade: '', program: '', howCanWeHelp: '', preferredContact: '', message: '',
};

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contactPage;

  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitLead({
        parent_name: form.parentName,
        email: form.email,
        phone: form.phone,
        child_age_grade: form.studentGrade,
        interested_service: form.program,
        main_concern: form.howCanWeHelp,
        message: form.message,
        source: 'contact_page',
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="pt-20 bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-brand-900 pt-16 pb-14">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* Left — headline + value card */}
            <div>
              <h1 className="font-display font-bold text-5xl md:text-6xl text-white tracking-tight mb-3 uppercase">
                {c.title}
              </h1>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-px bg-accent-400 w-8" />
                <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                <div className="h-px bg-accent-400 w-8" />
              </div>
              <p className="text-brand-200 text-lg leading-relaxed mb-4">
                {c.heroDesc1}
              </p>
              <p className="text-brand-300 leading-relaxed mb-8">
                <strong className="text-white">{c.heroDesc2}</strong>
              </p>

              {/* Value card */}
              <div className="bg-warm-50 rounded-2xl p-6 border border-warm-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 rounded-full bg-brand-800 flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-accent-400 fill-accent-400" />
                  </div>
                  <h3 className="font-bold text-brand-900 text-base uppercase tracking-wider">{c.valueTitle}</h3>
                </div>
                <p className="text-brand-700 text-sm mb-4">
                  {c.valueDesc}
                </p>
                <div className="flex flex-wrap gap-3 mb-4">
                  {[
                    { icon: <MessageSquare className="w-4 h-4" />, label: c.connectTextWhatsapp },
                    { icon: <Mail className="w-4 h-4" />, label: c.connectEmail },
                    { icon: <Send className="w-4 h-4" />, label: c.connectRequest },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2 bg-white border border-warm-200 rounded-lg px-3 py-2 text-sm font-medium text-brand-800">
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>
                <p className="text-brand-600 text-xs leading-relaxed">
                  {c.valueNote}
                </p>
              </div>
            </div>

            {/* Right — brand panel */}
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-3xl p-10 md:p-12 text-center shadow-2xl max-w-sm w-full relative overflow-hidden">
                {/* decorative faint background icon */}
                <div className="absolute -top-6 -right-6 opacity-5">
                  <BookOpen className="w-40 h-40 text-brand-900" />
                </div>
                <img
                  src={LOGO_URL}
                  alt="Future Foundations Education"
                  className="h-24 w-auto mx-auto mb-5 object-contain"
                />
                <p className="font-display font-bold text-2xl text-brand-900 tracking-wide uppercase mb-1">
                  Future Foundations
                </p>
                <p className="text-accent-600 font-bold text-lg uppercase tracking-widest mb-5">Education</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <div className="h-px bg-accent-400 w-10" />
                  <Star className="w-3 h-3 text-accent-400 fill-accent-400" />
                  <div className="h-px bg-accent-400 w-10" />
                </div>
                <p className="font-display italic text-brand-800 text-lg leading-snug">
                  {c.tagline1}<br />
                  {c.tagline2}<br />
                  <span className="text-accent-600 font-bold not-italic">{c.tagline3}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR LOCATIONS ────────────────────────────────── */}
      <section className="bg-white py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px bg-accent-400 w-12" />
              <h2 className="font-display font-bold text-3xl text-brand-900 uppercase tracking-wide">{c.locationsTitle}</h2>
              <div className="h-px bg-accent-400 w-12" />
            </div>
            <p className="text-brand-600 font-medium">{c.locationsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Learning Center */}
            <div className="border-2 border-brand-200 rounded-2xl p-7 flex flex-col gap-4 hover:border-brand-400 transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-900 flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-brand-900 text-base uppercase tracking-wider mb-3">{c.learningCenter}</h3>
                <div className="flex items-start gap-2 justify-center mb-1">
                  <MapPin className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-brand-700 text-sm font-medium">{c.learningCenterAddr1}</p>
                    <p className="text-brand-700 text-sm">{c.learningCenterAddr2}</p>
                  </div>
                </div>
                <div className="h-px bg-warm-200 my-3" />
                <p className="text-brand-600 text-sm leading-relaxed">
                  {c.learningCenterDesc}
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=944+E+Osceola+Pkwy+Kissimmee+FL+34744"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {c.byAppointment}
              </a>
            </div>

            {/* Administration Office */}
            <div className="border-2 border-accent-300 rounded-2xl p-7 flex flex-col gap-4 hover:border-accent-500 transition-colors">
              <div className="w-16 h-16 rounded-full bg-accent-500 flex items-center justify-center mx-auto">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-accent-700 text-base uppercase tracking-wider mb-3">{c.adminOffice}</h3>
                <div className="flex items-start gap-2 justify-center mb-1">
                  <MapPin className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                  <div className="text-left">
                    <p className="text-brand-700 text-sm font-medium">{c.adminOfficeAddr1}</p>
                    <p className="text-brand-700 text-sm">{c.adminOfficeAddr2}</p>
                  </div>
                </div>
                <div className="h-px bg-warm-200 my-3" />
                <p className="text-brand-600 text-sm leading-relaxed">
                  {c.adminOfficeDesc}
                </p>
              </div>
              <a
                href="https://maps.google.com/?q=821+W+Emmett+St+Kissimmee+FL+34741"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                <Calendar className="w-4 h-4" />
                {c.byAppointment}
              </a>
            </div>

            {/* Online Services */}
            <div className="border-2 border-brand-200 rounded-2xl p-7 flex flex-col gap-4 hover:border-brand-400 transition-colors">
              <div className="w-16 h-16 rounded-full bg-brand-900 flex items-center justify-center mx-auto">
                <Monitor className="w-8 h-8 text-white" />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-brand-900 text-base uppercase tracking-wider mb-3">{c.onlineServices}</h3>
                <div className="h-px bg-warm-200 my-3" />
                <p className="text-brand-600 text-sm leading-relaxed">
                  {c.onlineServicesDesc}
                </p>
              </div>
              <button className="mt-auto w-full flex items-center justify-center gap-2 bg-brand-900 hover:bg-brand-800 text-white px-4 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors">
                <Calendar className="w-4 h-4" />
                {c.byAppointment}
              </button>
            </div>
          </div>

          {/* Info banner */}
          <div className="bg-brand-50 border border-brand-200 rounded-xl p-5 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-brand-200 flex items-center justify-center flex-shrink-0">
              <Info className="w-5 h-5 text-brand-700" />
            </div>
            <p className="text-brand-700 text-sm leading-relaxed">
              {c.infoBanner}{' '}
              <strong>{c.infoBannerStrong}</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── PREFERRED WAYS TO CONNECT ────────────────────── */}
      <section className="bg-warm-50 py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px bg-accent-400 w-12" />
              <h2 className="font-display font-bold text-3xl text-brand-900 uppercase tracking-wide">
                {c.connectTitle}
              </h2>
              <div className="h-px bg-accent-400 w-12" />
            </div>
            <p className="text-brand-600">{c.connectSubtitle}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: c.connectTextWhatsapp,
                contact: '(407) 301-9979',
                desc: c.connectTextDesc,
                accent: false,
              },
              {
                icon: <Mail className="w-8 h-8" />,
                title: c.connectEmail,
                contact: 'info@futurefoundationseducation.com',
                desc: c.connectEmailDesc,
                accent: false,
              },
              {
                icon: <Send className="w-8 h-8" />,
                title: c.connectRequest,
                contact: '',
                desc: c.connectRequestDesc,
                accent: false,
              },
              {
                icon: <Calendar className="w-8 h-8" />,
                title: c.connectSchedule,
                contact: '',
                desc: c.connectScheduleDesc,
                accent: true,
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`rounded-2xl p-7 flex flex-col items-center text-center gap-3 border-2 overflow-hidden min-w-0 ${
                  item.accent
                    ? 'bg-accent-500 border-accent-500 text-white'
                    : 'bg-white border-brand-100 text-brand-900'
                }`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                  item.accent ? 'bg-white/20' : 'bg-brand-900'
                }`}>
                  <span className={item.accent ? 'text-white' : 'text-accent-400'}>
                    {item.icon}
                  </span>
                </div>
                <h3 className={`font-bold text-sm uppercase tracking-wider ${item.accent ? 'text-white' : 'text-brand-900'}`}>
                  {item.title}
                </h3>
                {item.contact && (
                  <p className={`font-bold text-base break-all w-full ${item.accent ? 'text-white' : 'text-accent-600'}`}>
                    {item.contact}
                  </p>
                )}
                <p className={`text-sm leading-relaxed ${item.accent ? 'text-white/90' : 'text-brand-600'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBMIT A REQUEST + SERVICE AREA + MAP ─────────── */}
      <section className="bg-white py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 items-start">

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-4 h-4 text-accent-500 fill-accent-500" />
                <h2 className="font-display font-bold text-2xl text-brand-900 uppercase tracking-wide">
                  {c.formTitle}
                </h2>
              </div>
              <p className="text-brand-500 text-sm mb-6">{c.formSubtitle}</p>

              {status === 'success' ? (
                <div className="border-2 border-success-300 bg-success-50 rounded-2xl p-10 text-center">
                  <CheckCircle className="w-14 h-14 text-success-500 mx-auto mb-4" />
                  <h3 className="font-display font-bold text-2xl text-brand-900 mb-2">{c.formSuccessTitle}</h3>
                  <p className="text-brand-600 mb-6">{c.formSuccessDesc}</p>
                  <button
                    onClick={() => { setStatus('idle'); setForm(emptyForm); }}
                    className="inline-flex items-center gap-2 bg-brand-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-800 transition-colors"
                  >
                    {c.formAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">
                        {c.formParentName} <span className="text-error-500">*</span>
                      </label>
                      <input type="text" required value={form.parentName} onChange={set('parentName')}
                        placeholder={c.formPlaceholderName}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">
                        {c.formEmail} <span className="text-error-500">*</span>
                      </label>
                      <input type="email" required value={form.email} onChange={set('email')}
                        placeholder={c.formPlaceholderEmail}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">{c.formPhone}</label>
                      <input type="tel" value={form.phone} onChange={set('phone')}
                        placeholder={c.formPlaceholderPhone}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">{c.formStudentName}</label>
                      <input type="text" value={form.studentName} onChange={set('studentName')}
                        placeholder={c.formPlaceholderStudent}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">{c.formStudentGrade}</label>
                      <select value={form.studentGrade} onChange={set('studentGrade')}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all">
                        <option value="">{c.formSelectGrade}</option>
                        {c.grades.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">{c.formProgram}</label>
                      <select value={form.program} onChange={set('program')}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all">
                        <option value="">{c.formSelectProgram}</option>
                        {c.programs.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">{c.formPreferredContact}</label>
                      <select value={form.preferredContact} onChange={set('preferredContact')}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all">
                        <option value="">{c.formSelectMethod}</option>
                        {c.contactMethods.map(m => <option key={m} value={m}>{m}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">{c.formHowCanWeHelp}</label>
                      <select value={form.howCanWeHelp} onChange={set('howCanWeHelp')}
                        className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all">
                        <option value="">{c.formSelectTopic}</option>
                        {c.helpTopics.map(topic => <option key={topic} value={topic}>{topic}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5">
                      {c.formMessage} <span className="text-error-500">*</span>
                    </label>
                    <textarea required rows={4} value={form.message} onChange={set('message')}
                      placeholder={c.formPlaceholderMessage}
                      className="w-full px-4 py-2.5 border border-brand-200 rounded-xl bg-warm-50 text-brand-900 placeholder:text-brand-400 focus:ring-2 focus:ring-brand-400 focus:border-brand-400 outline-none text-sm transition-all resize-none" />
                  </div>

                  {status === 'error' && (
                    <p className="text-error-600 text-sm font-medium bg-error-50 border border-error-200 rounded-xl p-3">
                      {c.formError}
                    </p>
                  )}

                  <button type="submit" disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 bg-accent-500 hover:bg-accent-600 disabled:bg-accent-300 text-white px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-widest transition-all hover:shadow-lg disabled:cursor-not-allowed">
                    {status === 'submitting' ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {c.formSubmit}
                  </button>
                </form>
              )}
            </div>

            {/* Service Area + Map */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-brand-900 rounded-2xl p-7 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-accent-400 fill-accent-400" />
                  <h3 className="font-display font-bold text-xl uppercase tracking-wide">{c.serveTitle}</h3>
                </div>
                <p className="text-brand-300 text-xs uppercase tracking-widest mb-5">{c.serveSubtitle}</p>
                <ul className="space-y-2.5">
                  {SERVICE_AREAS.map((city, i) => (
                    <li key={city} className="flex items-center gap-3 text-sm">
                      {i === SERVICE_AREAS.length - 1 ? (
                        <Monitor className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-accent-400 flex-shrink-0" />
                      )}
                      <span className={i === SERVICE_AREAS.length - 1 ? 'text-accent-300 font-medium' : 'text-brand-200'}>
                        {city}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-brand-100 h-72">
                <iframe
                  title="Future Foundations Education Locations"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14053.4!2d-81.4235!3d28.308!3m2!1i1024!2i768!4f13.1!4m3!3e0!4m0!4m0!5e0!3m2!1sen!2sus!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Location callout overlays */}
                <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-end pr-3 gap-2.5">
                  {/* Learning Center */}
                  <div className="pointer-events-auto flex items-center gap-2 bg-brand-900 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold leading-snug max-w-[200px]">
                    <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                    <div>
                      <div className="font-bold">{c.mapLearningCenter}</div>
                      <div className="font-normal opacity-80">{c.learningCenterAddr1}</div>
                      <div className="font-normal opacity-80">{c.learningCenterAddr2}</div>
                    </div>
                  </div>

                  {/* Administration Office */}
                  <div className="pointer-events-auto flex items-center gap-2 bg-accent-500 text-white px-3 py-2 rounded-lg shadow-lg text-xs font-semibold leading-snug max-w-[200px]">
                    <MapPin className="w-4 h-4 text-white flex-shrink-0" />
                    <div>
                      <div className="font-bold">{c.mapAdminOffice}</div>
                      <div className="font-normal opacity-80">{c.adminOfficeAddr1}</div>
                      <div className="font-normal opacity-80">{c.adminOfficeAddr2}</div>
                    </div>
                  </div>

                  {/* Online Services */}
                  <div className="pointer-events-auto flex items-center gap-2 bg-white border border-brand-100 text-brand-800 px-3 py-2 rounded-lg shadow-lg text-xs font-semibold leading-snug max-w-[200px]">
                    <Monitor className="w-4 h-4 text-brand-600 flex-shrink-0" />
                    <div>
                      <div className="font-bold">{c.mapOnlineServices}</div>
                      <div className="font-normal text-brand-500">{c.mapOnlineNote}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick contact card */}
              <div className="bg-warm-50 border border-warm-200 rounded-2xl p-6 space-y-3">
                <h4 className="font-bold text-brand-900 text-sm uppercase tracking-wider mb-3">{c.quickContact}</h4>
                <a href="tel:4073019979" className="flex items-center gap-3 text-sm text-brand-700 hover:text-brand-900 transition-colors group">
                  <Phone className="w-4 h-4 text-accent-500 group-hover:text-accent-600" />
                  (407) 301-9979
                </a>
                <a href="mailto:info@futurefoundationseducation.com" className="flex items-center gap-3 text-sm text-brand-700 hover:text-brand-900 transition-colors group break-all">
                  <Mail className="w-4 h-4 text-accent-500 flex-shrink-0 group-hover:text-accent-600" />
                  info@futurefoundationseducation.com
                </a>
                <div className="flex items-center gap-3 text-sm text-brand-700">
                  <MapPin className="w-4 h-4 text-accent-500 flex-shrink-0" />
                  944 E. Osceola Pkwy, Kissimmee, FL 34744
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="bg-brand-50 py-16">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-accent-100 flex items-center justify-center flex-shrink-0">
                <Users className="w-10 h-10 text-accent-500" />
              </div>
              <div>
                <h2 className="font-display font-bold text-3xl md:text-4xl text-brand-900 mb-2">
                  {c.ctaTitle}
                </h2>
                <p className="text-brand-600 text-lg">
                  {c.ctaDesc}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-5 flex-shrink-0">
              <button
                onClick={() => openLeadModal()}
                className="inline-flex items-center gap-2 bg-accent-500 hover:bg-accent-400 text-white px-10 py-4 rounded-xl font-bold text-lg uppercase tracking-widest transition-all hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                {c.ctaButton}
              </button>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: <BookOpen className="w-4 h-4" />, label: c.ctaFeature1 },
                  { icon: <CheckCircle className="w-4 h-4" />, label: c.ctaFeature2 },
                  { icon: <Heart className="w-4 h-4" />, label: c.ctaFeature3 },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 text-brand-600 text-sm">
                    <span className="text-accent-500">{item.icon}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
