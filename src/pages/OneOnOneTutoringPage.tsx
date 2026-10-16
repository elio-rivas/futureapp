
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

type Locale = 'es' | 'en';
type Bilingual = { es: string; en: string };
type Option = {
  id: string;
  label: Bilingual;
  feedback: Bilingual;
};
type Question = {
  id: string;
  title: Bilingual;
  options: Option[];
  multiple?: boolean;
  optional?: boolean;
  helper?: Bilingual;
};
type Answers = Record<string, string[]>;

const text = (es: string, en: string): Bilingual => ({ es, en });

const questions: Question[] = [
  {
    id: 'grade',
    title: text('¿En qué grado está su hijo(a)?', 'What grade is your child in?'),
    options: [
      {
        id: 'kindergarten',
        label: text('Kindergarten', 'Kindergarten'),
        feedback: text(
          'En Kindergarten, podemos apoyar el reconocimiento de letras y sonidos, las primeras habilidades de lectura, el conteo y el reconocimiento de números.',
          'In Kindergarten, we can support letter and sound recognition, early reading skills, counting, and number recognition.'
        ),
      },
      {
        id: 'grade_1',
        label: text('1.er grado', '1st Grade'),
        feedback: text(
          'En primer grado, podemos reforzar la relación entre letras y sonidos, la lectura de palabras y oraciones, la comprensión inicial, las sumas y las restas.',
          'In first grade, we can reinforce phonics, reading words and sentences, early comprehension, addition, and subtraction.'
        ),
      },
      {
        id: 'grade_2',
        label: text('2.º grado', '2nd Grade'),
        feedback: text(
          'En segundo grado, podemos trabajar la fluidez lectora, la comprensión de textos, el vocabulario, las sumas y restas y la resolución de problemas.',
          'In second grade, we can work on reading fluency, text comprehension, vocabulary, addition and subtraction, and problem-solving.'
        ),
      },
      {
        id: 'grade_3',
        label: text('3.er grado', '3rd Grade'),
        feedback: text(
          'En tercer grado, podemos reforzar la comprensión lectora, las ideas principales, la multiplicación, la división y los conceptos iniciales de fracciones.',
          'In third grade, we can reinforce reading comprehension, main ideas, multiplication, division, and introductory fractions.'
        ),
      },
      {
        id: 'grade_4',
        label: text('4.º grado', '4th Grade'),
        feedback: text(
          'En cuarto grado, podemos apoyar la comprensión de textos más complejos,el vocabulario académico, las operaciones de varias cifras, las fracciones y los problemas de varios pasos.',
          'In fourth grade, we can support more complex reading comprehension, academic vocabulary, multi-digit operations, fractions, and multi-step problems.'
        ),
      },
      {
        id: 'grade_5',
        label: text('5.º grado', '5th Grade'),
        feedback: text(
          'En quinto grado, podemos fortalecer el análisis de textos, el razonamiento matemático, las fracciones, los decimales y las habilidades necesarias para grados superiores.',
          'In fifth grade, we can strengthen text analysis, mathematical reasoning, fractions, decimals, and skills needed for higher grades.'
        ),
      },
      {
        id: 'other',
        label: text('Otro', 'Other'),
        feedback: text(
          'Nuestro programa anunciado está dirigido a Kindergarten hasta 5.º grado. Puede consultar si existe una opción adecuada para su familia.',
          'Our advertised program serves Kindergarten through 5th Grade. You may inquire whether another suitable option is available.'
        ),
      },
    ],
  },
  {
    id: 'subjects',
    title: text('¿En qué área necesita apoyo académico?', 'In which subject does your child need academic support?'),
    multiple: true,
    options: [
      {
        id: 'reading',
        label: text('Lectura', 'Reading'),
        feedback: text(
          'Ofrecemos apoyo individualizado para desarrollar habilidades de lecturasegún las necesidades del estudiante.',
          "We provide individualized support to develop reading skills based on the student's needs."
        ),
      },
      {
        id: 'math',
        label: text('Matemáticas', 'Math'),
        feedback: text(
          'Ofrecemos apoyo individualizado para fortalecer habilidades matemáticasy trabajar las áreas que necesitan refuerzo.',
          'We provide individualized support to strengthen math skills and addressareas needing improvement.'
        ),
      },
    ],
  },
  {
    id: 'primary_need',
    title: text('¿Qué tipo de apoyo necesita principalmente su hijo(a)?', 'What type of support does your child primarily need?'),
    options: [
      {
        id: 'foundational',
        label: text('Mejorar habilidades básicas', 'Improve foundational skills'),
        feedback: text(
          'Podemos trabajar habilidades fundamentales mediante sesiones individuales adaptadas al ritmo del estudiante.',
          "We can develop foundational skills through sessions tailored to the student's learning pace."
        ),
      },
      {
        id: 'difficulties',
        label: text('Superar dificultades académicas', 'Overcome academic difficulties'),
        feedback: text(
          'La evaluación inicial nos ayuda a identificar las dificultades y establecer objetivos de aprendizaje.',
          'An initial assessment helps identify challenges and establish learning goals.'
        ),
      },
      {
        id: 'reinforcement',
        label: text('Reforzar lo aprendido en la escuela', 'Reinforce classroom learning'),
        feedback: text(
          'Podemos reforzar los conocimientos y habilidades que su hijo(a) está trabajando en la escuela.',
          'We can reinforce the knowledge and skills your child is learning at school.'
        ),
      },
      {
        id: 'guidance',
        label: text('No estoy seguro(a); necesito orientación', "I'm not sure; I need guidance"),
        feedback: text(
          'Podemos orientarle sobre cómo comenzar con una evaluación inicial para comprender las necesidades de su hijo(a).',
          "We can guide you through an initial assessment to better understand your child's needs."
        ),
      },
    ],
  },
  {
    id: 'in_person',
    title: text('¿Puede asistir a tutorías presenciales en Kissimmee, Florida?', 'Can your child attend in-person tutoring in Kissimmee, Florida?'),
    options: [
      {
        id: 'yes',
        label: text('Sí', 'Yes'),
        feedback: text(
          'Nuestro programa de tutorías individuales se ofrece presencialmente en nuestra oficina de Kissimmee, Florida, mediante cita previa.',
          'Our one-on-one tutoring program is offered in person at our Kissimmee, Florida office, by appointment.'
        ),
      },
      {
        id: 'no',
        label: text('No', 'No'),
        feedback: text(
          'Este programa se ofrece presencialmente en Kissimmee. Puede continuar con su consulta, sin que ello implique disponibilidad de otras modalidades.',
          'This program is offered in person in Kissimmee. You may continue your inquiry, but other formats are not guaranteed.'
        ),
      },
    ],
  },
  {
    id: 'five_weeks',
    title: text(
      '¿Puede comprometerse a traer a su hijo(a) a las tutorías durante un mínimo de cinco semanas consecutivas?',
      'Can you commit to bringing your child to tutoring for at least five consecutive weeks?'
    ),
    helper: text(
      'Recomendamos un mínimo de cinco semanas para comenzar a evaluar el progresoacadémico. Los resultados pueden variar.',
      'We recommend at least five weeks to begin assessing academic progress. Results may vary.'
    ),
    options: [
      {
        id: 'yes',
        label: text('Sí', 'Yes'),
        feedback: text(
          '¡Excelente! La continuidad facilita el seguimiento de los objetivos académicos y permite observar el progreso del estudiante.',
          'Excellent! Consistent attendance supports academic goal tracking and helps us observe progress.'
        ),
      },
      {
        id: 'no',
        label: text('No', 'No'),
        feedback: text(
          'Entendemos que cada familia tiene circunstancias distintas. Podemos conversar sobre las opciones disponibles.',
          'We understand each family has different circumstances. We can discuss available options.'
        ),
      },
    ],
  },
  {
    id: 'session_format',
    title: text(
      'Cada sesión de tutoría es individual, dura 60 minutos y se ofrece mediante cita previa. ¿Está de acuerdo con esta modalidad?',
      'Each tutoring session is one-on-one, lasts 60 minutes, and is offered by appointment. Do you agree with this format?'
    ),
    helper: text(
      'Atendemos de lunes a jueves, de 3:30 a 6:30 p. m. Cada estudiante asiste únicamente durante su sesión programada de 60 minutos. No ofrecemos cuidado infantil durante toda la tarde.',
      'Our hours are Monday–Thursday, 3:30–6:30 PM. Each student attends only their scheduled 60-minute session. We do not offer all-afternoon childcare.'
    ),
    options: [
      {
        id: 'yes',
        label: text('Sí, entiendo y estoy de acuerdo.', 'Yes, I understand and agree.'),
        feedback: text(
          '¡Perfecto! Cada estudiante recibe atención individual durante su sesiónprogramada de 60 minutos.',
          'Great! Each student receives individual attention during their scheduled 60-minute session.'
        ),
      },
      {
        id: 'no',
        label: text('No, necesito un programa de jornada completa.', 'No, I need afull-afternoon program.'),
        feedback: text(
          'Nuestro servicio no cubre el cuidado infantil durante toda la tarde. Puede enviar su consulta, pero esta modalidad no corresponde a un programa de jornadacompleta.',
          'Our service does not provide all-afternoon childcare. You may submit aninquiry, but this is not a full-afternoon program.'
        ),
      },
    ],
  },
  {
    id: 'payment',
    title: text('¿Cómo pagará las tutorías de su hijo(a)?', "How will you pay for your child's tutoring?"),
    optional: true,
    options: [
      {
        id: 'step_up_available',
        label: text(
          'Tengo fondos disponibles de Step Up for Students.',
          'I have available Step Up for Students funds.'
        ),
        feedback: text(
          'Aceptamos fondos elegibles de Step Up for Students. La elegibilidad delservicio y los fondos disponibles deben verificarse antes de confirmar el pago.',
          'We accept eligible Step Up for Students funds. Service eligibility and available funds must be verified before confirming payment.'
        ),
      },
      {
        id: 'step_up_pending',
        label: text(
          'Estoy esperando recibir los fondos de mi beca.',
          'I am waiting for my scholarship funds.'
        ),
        feedback: text(
          'Puede iniciar su consulta mientras espera los fondos. El pago con beca requerirá confirmación posterior.',
          'You may begin your inquiry while waiting for funds. Scholarship paymentwill require later confirmation.'
        ),
      },
      {
        id: 'other_payment',
        label: text('Utilizaré otro método de pago.', 'I will use another payment method.'),
        feedback: text(
          'Puede continuar con su solicitud y conocer las opciones de pago disponibles.',
          'You may continue your inquiry and learn about available payment options.'
        ),
      },
    ],
  },
];

const contactWindows = [
  { id: '08_11', label: '8:00 AM – 11:00 AM' },
  { id: '11_14', label: '11:00 AM – 2:00 PM' },
  { id: '14_17', label: '2:00 PM – 5:00 PM' },
  { id: '17_19', label: '5:00 PM – 7:00 PM' },
  { id: 'any', label: 'Any time' },
];

function classify(answers: Answers) {
  const selected = (id: string) => answers[id]?.[0];

  if (selected('session_format') === 'no') return 'PROGRAM_MISMATCH';

  if (
    selected('grade') === 'other' ||
    selected('in_person') === 'no' ||
    selected('five_weeks') === 'no'
  ) {
    return 'NEEDS_REVIEW';
  }

  return 'READY_TO_ENROLL';
}

export default function OneOnOneTutoringPage() {
  const { lang } = useParams<{ lang: string }>();
  const { setLocale } = useLanguage();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const locale: Locale = lang === 'es' ? 'es' : 'en';

  const [step, setStep] = useState<1 | 2>(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [parentName, setParentName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [contactWindow, setContactWindow] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [confirmationStatus, setConfirmationStatus] = useState<'accepted' | 'pending'>('pending');
  const pendingSubmission = useRef<{ signature: string; id: string } | null>(null);

  useEffect(() => {
    setLocale(locale);
    document.title = locale === 'es'
      ? 'Tutorías Individuales | Future Foundations Education'
      : 'One-on-One Tutoring | Future Foundations Education';
  }, [locale, setLocale]);

  const tr = (value: Bilingual) => value[locale];

  const changeLanguage = (next: Locale) => {
    const query = searchParams.toString();
    navigate(`/${next}/one-on-one-tutoring${query ? `?${query}` : ''}`);
  };

  const choose = (question: Question, optionId: string) => {
    setAnswers(previous => {
      const current = previous[question.id] || [];
      const next = question.multiple
        ? current.includes(optionId)
          ? current.filter(id => id !== optionId)
          : [...current, optionId]
        : [optionId];

      return { ...previous, [question.id]: next };
    });
  };

  const answered = questions
    .filter(question => !question.optional)
    .filter(question => (answers[question.id] || []).length > 0)
    .length;

  const questionnaireValid = answered === 6;

  const contactValid =
    parentName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) &&
    phone.replace(/\D/g, '').length >= 10 &&
    Boolean(contactWindow) &&
    consent;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactValid || !questionnaireValid || submitting) return;

    setSubmitting(true);
    setSubmitError('');

    const normalizedAnswers = Object.fromEntries(
      questions.map(question => [question.id, [...(answers[question.id] ?? [])].sort()])
    );
    const utm = Object.fromEntries(
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']
        .map(key => [key, searchParams.get(key)?.slice(0, 200) ?? ''])
        .filter(([, value]) => Boolean(value))
    );
    const payload = {
      parent_name: parentName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      language: locale,
      callback_window: contactWindow,
      answers: normalizedAnswers,
      consent_granted: consent,
      source_url: window.location.href,
      utm,
      website: '',
    };
    const signature = JSON.stringify(payload);
    if (!pendingSubmission.current || pendingSubmission.current.signature !== signature) {
      pendingSubmission.current = { signature, id: crypto.randomUUID() };
    }

    try {
      const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
      const key = (import.meta.env.VITE_SUPABASE_ANON_KEY ||
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string | undefined;
      if (!url || !key) throw new Error('configuration_missing');

      const result = await fetch(`${url.replace(/\/$/, '')}/functions/v1/submit-one-on-one-tutoring`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ ...payload, submission_id: pendingSubmission.current.id }),
      });
      const body: {
        success?: boolean;
        code?: string;
        confirmation_status?: 'accepted' | 'pending';
      } = await result.json();
      if (!result.ok || body.success !== true) {
        if (result.status === 409) throw new Error('submission_conflict');
        throw new Error(body.code || 'request_failed');
      }
      setConfirmationStatus(body.confirmation_status === 'accepted' ? 'accepted' : 'pending');
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const code = error instanceof Error ? error.message : 'request_failed';
      setSubmitError(code === 'configuration_missing'
        ? locale === 'es'
          ? 'Falta configurar la conexión con Supabase. Comuníquese con nuestro equipo.'
          : 'The Supabase connection is not configured. Please contact our team.'
        : code === 'submission_conflict'
          ? locale === 'es'
            ? 'Esta solicitud cambió durante el envío. Revise sus datos e intente nuevamente.'
            : 'This inquiry changed during submission. Review your details and try again.'
          : locale === 'es'
            ? 'No pudimos confirmar el envío. Su solicitud podría haberse guardado; puede reintentar sin modificar los datos.'
            : 'We could not confirm submission. Your inquiry may have been saved; you can retry without changing your details.');
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-brand-800 ' +
    'focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200';

  const programFit = classify(answers);

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {submitted ? (
          <section role="status" className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-green-700" />
            <h1 className="mb-4 text-3xl font-bold text-brand-800">
              {locale === 'es' ? '¡Hemos recibido su solicitud!' : "We've Received Your Inquiry!"}
            </h1>
            <p className="mb-4 text-gray-700">
              {locale === 'es'
                ? 'Nuestro equipo revisará su información y se comunicará con usted. La matrícula y disponibilidad requieren confirmación.'
                : 'Our team will review your information and contact you. Enrollment and availability require confirmation.'}
            </p>
            <p className="mb-3 text-sm text-gray-600">
              {locale === 'es' ? 'Horario preferido de llamada:' : 'Preferred callback time:'}{' '}
              {contactWindows.find(item => item.id === contactWindow)?.label ?? contactWindow} (Florida / Eastern Time)
            </p>
            <p className="mb-3 text-sm text-gray-600">
              {programFit === 'PROGRAM_MISMATCH'
                ? locale === 'es' ? 'Nuestro programa no es de jornada completa.' : 'Our program is not a full-afternoon program.'
                : programFit === 'NEEDS_REVIEW'
                  ? locale === 'es' ? 'Su solicitud requiere revisión adicional.' : 'Your inquiry requires additional review.'
                  : locale === 'es' ? 'Su solicitud cumple preliminarmente los criterios principales.' : 'Your inquiry preliminarily meets the main criteria.'}
            </p>
            {confirmationStatus === 'pending' && (
              <p className="text-sm text-gray-600">
                {locale === 'es'
                  ? 'La confirmación por correo electrónico puede estar pendiente.'
                  : 'Your email confirmation may still be pending.'}
              </p>
            )}
          </section>
        ) : (
          <> 
        <div className="mb-6 flex justify-end gap-2">
          {(['es', 'en'] as const).map(language => (
            <button
              key={language}
              type="button"
              onClick={() => changeLanguage(language)}
              aria-pressed={locale === language}
              className={`rounded-lg px-4 py-2 text-sm font-semibold ${
                locale === language
                  ? 'bg-brand-800 text-white'
                  : 'border border-gray-300 bg-white text-brand-800'
              }`}
            >
              {language === 'es' ? 'Español' : 'English'}
            </button>
          ))}
        </div>

        <header className="mb-8 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent-600">
            Future Foundations Education
          </p>
          <h1 className="font-display text-3xl font-bold text-brand-800 sm:text-4xl">
            {locale === 'es' ? 'Tutorías Individuales' : 'One-on-One Tutoring'}
          </h1>
          <p className="mt-2 text-xl font-semibold text-brand-600">
            {locale === 'es' ? 'Lectura y Matemáticas' : 'Reading and Math'}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {locale === 'es'
              ? 'Conozca nuestro programa mientras responde estas preguntas. Al seleccionar una respuesta, le mostraremos información que puede ayudarle a decidir sinuestras tutorías son adecuadas para su hijo(a).'
              : 'Learn about our program as you answer these questions. Each selection provides helpful information so you can decide whether our tutoring services are right for your child.'}
          </p>
        </header>

        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm font-semibold text-brand-800">
            <span>{locale === 'es' ? `Paso ${step} de 2` : `Step ${step} of 2`}</span>
            <span>
              {step === 1
                ? `${answered}/6`
                : locale === 'es' ? 'Datos de contacto' : 'Contact information'}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-accent-500 transition-all"
              style={{ width: `${step === 1 ? (answered / 6) * 50 : 100}%` }}
            />
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-5">
            {questions.map((question, index) => (
              <section
                key={question.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-lg font-bold text-brand-800">
                    {index + 1}. {tr(question.title)}
                  </h2>
                  {question.optional && (
                    <span className="text-xs text-gray-500">
                      {locale === 'es' ? 'Opcional' : 'Optional'}
                    </span>
                  )}
                </div>

                {question.multiple && (
                  <p className="mb-3 text-sm text-gray-500">
                    {locale === 'es'
                      ? 'Puede seleccionar ambas opciones.'
                      : 'You may select both options.'}
                  </p>
                )}

                <div className="space-y-2">
                  {question.options.map(option => {
                    const checked = (answers[question.id] || []).includes(option.id);

                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors ${
                          checked
                            ? 'border-brand-700 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type={question.multiple ? 'checkbox' : 'radio'}
                          name={question.id}
                          value={option.id}
                          checked={checked}
                          onChange={() => choose(question, option.id)}
                          className="h-4 w-4 accent-blue-800"
                        />
                        <span className="font-medium text-brand-800">
                          {tr(option.label)}
                        </span>
                      </label>
                    );
                  })}
                </div>

                {question.options
                  .filter(option => (answers[question.id] || []).includes(option.id))
                  .map(option => (
                    <div
                      key={`${option.id}-feedback`}
                      role="status"
                      className="mt-3 flex gap-3 rounded-xl bg-blue-50 p-4 text-smtext-brand-800"
                    >
                      <Info className="mt-0.5 h-5 w-5 shrink-0" />
                      <p>{tr(option.feedback)}</p>
                    </div>
                  ))}

                {question.helper && (
                  <p className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                    <Clock3 className="mt-0.5 h-4 w-4 shrink-0" />
                    {tr(question.helper)}
                  </p>
                )}
              </section>
            ))}

            <button
              type="button"
              disabled={!questionnaireValid}
              onClick={() => {
                setStep(2);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-6 py-4 font-bold text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {locale === 'es' ? 'Continuar a datos de contacto' : 'Continue to contact information'}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-5 rounded-2xl bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-bold text-brand-800">
              {locale === 'es' ? 'Datos de contacto' : 'Contact Information'}
            </h2>

            <p className="text-gray-600">
              {locale === 'es'
                ? 'Complete sus datos e indíquenos cuándo prefiere recibir nuestrallamada.'
                : 'Please provide your contact information and let us know when you prefer to receive a call.'}
            </p>

            <div>
              <label htmlFor="ffe-parent-name" className="mb-2 block font-semiboldtext-brand-800">
                {locale === 'es'
                  ? 'Nombre completo del padre, madre o tutor'
                  : 'Parent or Guardian Full Name'} *
              </label>
              <input
                id="ffe-parent-name"
                required
                minLength={2}
                maxLength={200}
                autoComplete="name"
                className={fieldClass}
                value={parentName}
                onChange={event => setParentName(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="ffe-email" className="mb-2 block font-semibold text-brand-800">
                {locale === 'es' ? 'Correo electrónico' : 'Email Address'} *
              </label>
              <input
                id="ffe-email"
                type="email"
                required
                maxLength={254}
                autoComplete="email"
                className={fieldClass}
                value={email}
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="ffe-phone" className="mb-2 block font-semibold text-brand-800">
                {locale === 'es' ? 'Número de teléfono' : 'Phone Number'} *
              </label>
              <input
                id="ffe-phone"
                type="tel"
                required
                minLength={10}
                maxLength={30}
                autoComplete="tel"
                placeholder="(407) 555-0123"
                className={fieldClass}
                value={phone}
                onChange={event => setPhone(event.target.value)}
              />
            </div>

            <fieldset>
              <legend className="mb-3 font-semibold text-brand-800">
                {locale === 'es'
                  ? '¿En qué horario prefiere que le llamemos?'
                  : 'What is the best time to call you?'} *
              </legend>

              <div className="space-y-2">
                {contactWindows.map(window => (
                  <label
                    key={window.id}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                      contactWindow === window.id
                        ? 'border-brand-700 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contact_window"
                      required
                      checked={contactWindow === window.id}
                      onChange={() => setContactWindow(window.id)}
                      className="h-4 w-4 accent-blue-800"
                    />
                    <span className="text-brand-800">
                      {window.id === 'any'
                        ? locale === 'es' ? 'Cualquier horario' : 'Any time'
                        : window.label}
                    </span>
                  </label>
                ))}
              </div>

              <p className="mt-3 text-sm text-gray-500">
                {locale === 'es'
                  ? 'Todos los horarios corresponden a la hora del Este (Florida).Procuraremos llamarle dentro del rango seleccionado, según la disponibilidad de nuestro equipo.'
                  : 'All times are Eastern Time (Florida). We will do our best to contact you during your preferred window, subject to staff availability.'}
              </p>
            </fieldset>

            <label className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={event => setConsent(event.target.checked)}
                className="mt-1 h-4 w-4 accent-blue-800"
              />
              <span className="text-sm text-brand-800">
                {locale === 'es'
                  ? 'Autorizo a Future Foundations Education a contactarme en relación con esta solicitud de tutorías.'
                  : 'I authorize Future Foundations Education to contact me regarding this tutoring inquiry.'}
                {' *'}
              </span>
            </label>

            <div className="rounded-xl bg-blue-50 p-4 text-sm text-brand-800">
              <div className="mb-2 flex items-center gap-2 font-bold">
                <CheckCircle2 className="h-5 w-5" />
                {locale === 'es' ? 'Resultado preliminar' : 'Preliminary Result'}
              </div>
              <p>
                {programFit === 'READY_TO_ENROLL'
                  ? locale === 'es'
                    ? 'Su familia parece cumplir las principales condiciones del programa. La admisión y disponibilidad requieren confirmación.'
                    : 'Your family appears to meet the main program conditions. Admission and availability require confirmation.'
                  : programFit === 'NEEDS_REVIEW'
                    ? locale === 'es'
                      ? 'Necesitamos confirmar algunos detalles antes de determinar si el programa es adecuado.'
                      : 'We need to confirm a few details before determining whether the program is suitable.'
                    : locale === 'es'
                      ? 'Nuestro programa ofrece sesiones individuales de 60 minutos, no cuidado infantil durante toda la tarde.'
                      : 'Our program offers individual 60-minute sessions, not all-afternoon childcare.'}
              </p>
            </div>

            {submitError && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={!contactValid || !questionnaireValid || submitting}
              className="w-full rounded-xl bg-accent-500 px-6 py-4 font-bold text-white hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {locale === 'es'
                ? submitting ? 'Enviando solicitud…' : 'Enviar solicitud de tutorías'
                : submitting ? 'Submitting inquiry…' : 'Submit Tutoring Inquiry'}
            </button>

            <button
              type="button"
              disabled={submitting}
              onClick={() => {
                setStep(1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-brand-800 hover:bg-gray-50"
            >
              <ArrowLeft className="h-5 w-5" />
              {locale === 'es' ? 'Volver a mis respuestas' : 'Back to My Answers'}
            </button>
          </form>
        )}
          </>
        )}
      </div>
    </div>
  );
}

