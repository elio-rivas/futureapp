import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const SOURCE = 'one_on_one_tutoring';
const STAFF_EMAIL = 'futurefoundations.edu@gmail.com';
const TIMEZONE = 'America/New_York';
const CONSENT_VERSION = 'one-on-one-tutoring-v1';
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
const OPTIONS: Record<string, readonly string[]> = {
  grade: ['kindergarten', 'grade_1', 'grade_2', 'grade_3', 'grade_4', 'grade_5', 'other'],
  subjects: ['reading', 'math'],
  primary_need: ['foundational', 'difficulties', 'reinforcement', 'guidance'],
  in_person: ['yes', 'no'],
  five_weeks: ['yes', 'no'],
  session_format: ['yes', 'no'],
  payment: ['step_up_available', 'step_up_pending', 'other_payment'],
};
const CALLBACKS = ['08_11', '11_14', '14_17', '17_19', 'any'];
type Language = 'es' | 'en';
type Channel = 'staff' | 'parent';
type Answers = Record<string, string[]>;
type Data = Record<string, unknown>;

function response(status: number, body: Data): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}
function string(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null;
  const v = value.trim();
  return v.length <= max ? v : null;
}
function html(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[char] ?? char));
}
function canonicalJson(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, item]) => item !== undefined)
      .sort(([left], [right]) => left.localeCompare(right));
    return `{${entries.map(([key, item]) => `${JSON.stringify(key)}:${canonicalJson(item)}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

function answersOf(value: unknown): Answers | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const source = value as Data;
  if (Object.keys(source).some((key) => !(key in OPTIONS))) return null;
  const output: Answers = {};
  for (const [key, allowed] of Object.entries(OPTIONS)) {
    const selected = source[key] ?? (key === 'payment' ? [] : null);
    if (!Array.isArray(selected)) return null;
    if (selected.length < (key === 'payment' ? 0 : 1)) return null;
    if (selected.length > (key === 'subjects' ? 2 : 1)) return null;
    if (selected.some((item) => typeof item !== 'string' || !allowed.includes(item))) return null;
    if (new Set(selected).size !== selected.length) return null;
    output[key] = [...selected].sort();
  }
  return output;
}
function qualification(a: Answers): string {
  if (a.session_format[0] === 'no') return 'PROGRAM_MISMATCH';
  if (a.grade[0] === 'other' || a.in_person[0] === 'no' || a.five_weeks[0] === 'no') return 'NEEDS_REVIEW';
  return 'READY_TO_ENROLL';
}
function payment(a: Answers): string {
  return ({
    step_up_available: 'STEP_UP_FUNDS_REPORTED',
    step_up_pending: 'STEP_UP_FUNDS_PENDING',
    other_payment: 'ALTERNATIVE_PAYMENT',
  } as Record<string, string>)[a.payment[0]] ?? 'PAYMENT_NOT_SPECIFIED';
}
function summary(a: Answers, language: Language): string {
  const labels: Record<string, [string, string]> = {
    grade: ['Grado', 'Grade'], subjects: ['Materias', 'Subjects'],
    primary_need: ['Necesidad principal', 'Primary need'],
    in_person: ['Presencial en Kissimmee', 'In-person in Kissimmee'],
    five_weeks: ['Cinco semanas', 'Five weeks'],
    session_format: ['Sesión individual de 60 minutos', 'One-on-one 60-minute session'],
    payment: ['Pago', 'Payment'],
  };
  return Object.entries(labels).map(([key, labels]) =>
    `${labels[language === 'es' ? 0 : 1]}: ${(a[key] ?? []).join(', ') || (language === 'es' ? 'No especificado' : 'Not specified')}`
  ).join('\n');
}
function callbackLabel(code: string, language: Language): string {
  const values: Record<string, [string, string]> = {
    '08_11': ['8:00–11:00 a. m.', '8:00–11:00 AM'],
    '11_14': ['11:00 a. m.–2:00 p. m.', '11:00 AM–2:00 PM'],
    '14_17': ['2:00–5:00 p. m.', '2:00–5:00 PM'],
    '17_19': ['5:00–7:00 p. m.', '5:00–7:00 PM'],
    any: ['Cualquier horario', 'Any time'],
  };
  return values[code]?.[language === 'es' ? 0 : 1] ?? code;
}
function normalizeUtm(value: unknown): Record<string, string> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const result: Record<string, string> = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = string((value as Data)[key], 200);
    if (v) result[key] = v;
  }
  return result;
}
function normalizeSourceUrl(value: unknown): string {
  const raw = string(value, 2000);
  if (!raw) return '';
  try {
    const parsed = new URL(raw);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:' ? parsed.toString() : '';
  } catch { return ''; }
}
function stablePayload(lead: Data, channel: Channel): { to: string[]; subject: string; text: string; html: string; from: string; reply_to: string } {
  const language: Language = lead.language === 'es' ? 'es' : 'en';
  const a = lead.tutoring_answers as Answers;
  const parent = String(lead.parent_name);
  const callback = `${callbackLabel(String(lead.tutoring_callback_window), language)} (${TIMEZONE})`;
  const staff = channel === 'staff';
  const text = staff ? [
    'NEW ONE-ON-ONE TUTORING INQUIRY', '',
    `Submission ID: ${lead.id}`,
    `Parent/Guardian: ${parent}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    `Language: ${language}`,
    `Preferred callback: ${callback}`,
    `Qualification (preliminary): ${lead.tutoring_qualification}`,
    `Payment status: ${lead.tutoring_payment_status}`,
    `Consent: ${lead.contact_consent_granted === true ? 'Yes' : 'No'}`,
    `Consent time (UTC): ${lead.contact_consent_at}`,
    `Consent version: ${lead.contact_consent_version}`,
    `Source URL: ${lead.tutoring_source_url || 'Not specified'}`,
    `UTM: ${JSON.stringify(lead.tutoring_utm ?? {})}`, '',
    summary(a, language),
  ].join('\n') : language === 'es' ? [
    `Estimado(a) ${parent}:`, '',
    'Hemos recibido su solicitud de tutorías individuales.',
    'Nuestro equipo revisará su información y se comunicará con usted.', '',
    `Grado: ${a.grade[0]}`,
    `Materias: ${a.subjects.join(', ')}`,
    `Horario preferido de llamada: ${callback}`, '',
    'Esta solicitud no garantiza matrícula, disponibilidad ni elegibilidad para fondos de beca.',
    'Future Foundations Education',
  ].join('\n') : [
    `Dear ${parent},`, '',
    'We have received your one-on-one tutoring inquiry.',
    'Our team will review your information and contact you.', '',
    `Grade: ${a.grade[0]}`,
    `Subjects: ${a.subjects.join(', ')}`,
    `Preferred callback time: ${callback}`, '',
    'This inquiry does not guarantee enrollment, availability, or scholarship eligibility.',
    'Future Foundations Education',
  ].join('\n');
  return {
    from: Deno.env.get('RESEND_FROM_EMAIL')!,
    to: [staff ? STAFF_EMAIL : String(lead.email)],
    reply_to: STAFF_EMAIL,
    subject: staff ? 'New One-on-One Tutoring Inquiry | FFE' : language === 'es'
      ? 'Recibimos su solicitud de tutorías | Future Foundations Education'
      : 'We Received Your Tutoring Inquiry | Future Foundations Education',
    text,
    html: `<div style="font-family:Arial,sans-serif;color:#183153;max-width:640px;margin:auto"><h2>Future Foundations Education</h2><div style="white-space:pre-wrap">${html(text)}</div></div>`,
  };
}

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  if (request.method !== 'POST') return response(405, { success: false, code: 'method_not_allowed' });
  const url = Deno.env.get('SUPABASE_URL');
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const resendKey = Deno.env.get('RESEND_API_KEY');
  const sender = Deno.env.get('RESEND_FROM_EMAIL');
  if (!url || !key || !resendKey || !sender) return response(503, { success: false, code: 'service_unavailable' });

  let data: Data;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return response(400, { success: false, code: 'invalid_input' });
    data = JSON.parse(raw);
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw Error('invalid');
  } catch { return response(400, { success: false, code: 'invalid_input' }); }

  if (data.website) return response(400, { success: false, code: 'invalid_input' });
  const id = string(data.submission_id, 36);
  const parent = string(data.parent_name, 200);
  const email = string(data.email, 254)?.toLowerCase();
  const phone = string(data.phone, 30);
  const language = data.language;
  const callback = string(data.callback_window, 20);
  const answers = answersOf(data.answers);
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!id || !uuid.test(id) || !parent || parent.length < 2 ||
    !email || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email) ||
    !phone || !/^\+?[\d\s().-]+$/.test(phone) ||
    phone.replace(/\D/g, '').length < 10 || phone.replace(/\D/g, '').length > 15 ||
    (language !== 'es' && language !== 'en') ||
    !callback || !CALLBACKS.includes(callback) ||
    data.consent_granted !== true || !answers) {
    return response(400, { success: false, code: 'invalid_input' });
  }
  const utm = normalizeUtm(data.utm);
  const sourceUrl = normalizeSourceUrl(data.source_url);
  const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const initial = {
    id, parent_name: parent, email, phone, source: SOURCE,
    language, child_age_grade: answers.grade[0],
    main_concern: answers.primary_need[0],
    interested_service: answers.subjects.join(', '),
    message: summary(answers, language),
    tutoring_answers: answers,
    tutoring_qualification: qualification(answers),
    tutoring_payment_status: payment(answers),
    tutoring_callback_window: callback,
    tutoring_callback_timezone: TIMEZONE,
    contact_consent_granted: true,
    contact_consent_at: new Date().toISOString(),
    contact_consent_version: CONSENT_VERSION,
    contact_consent_language: language,
    tutoring_source_url: sourceUrl,
    tutoring_utm: utm,
  };

  try {
    // First writer wins via the existing UUID primary key. Concurrent duplicates
    // are checked against the saved immutable request, never overwritten.
    const { error: insertError } = await db.from('leads').insert(initial);
    if (insertError && insertError.code !== '23505') throw Error('insert_failed');

    const { data: saved, error: readError } = await db.from('leads').select('*').eq('id', id).single();
    if (readError || !saved) throw Error('read_failed');
    const equal = (a: unknown, b: unknown) => canonicalJson(a) === canonicalJson(b);
    if (saved.source !== SOURCE || saved.parent_name !== parent || saved.email !==email ||
      saved.phone !== phone || saved.language !== language ||
      saved.tutoring_callback_window !== callback ||
      saved.contact_consent_version !== CONSENT_VERSION ||
      saved.contact_consent_granted !== true ||
      saved.contact_consent_language !== language ||
      !equal(saved.tutoring_answers, answers) ||
      !equal(saved.tutoring_utm ?? {}, utm) ||
      saved.tutoring_source_url !== sourceUrl) {
      return response(409, { success: false, code: 'submission_conflict' });
    }

    async function deliver(channel: Channel): Promise<'accepted' | 'pending'> {
      const receiptColumn = channel === 'staff' ? 'tutoring_staff_email_id' : 'tutoring_parent_email_id';
      const { data: before, error: beforeError } = await db.from('leads')
        .select('tutoring_staff_email_id,tutoring_parent_email_id').eq('id', id).single();
      if (beforeError) throw Error('receipt_read_failed');
      if (before[receiptColumn]) return 'accepted';
      if (channel === 'parent' && !before.tutoring_staff_email_id) return 'pending';

      const token = crypto.randomUUID();
      const { data: claimed, error: claimError } = await db.rpc('claim_tutoring_email', {
        p_lead_id: id, p_channel: channel, p_claim_token: token,
      });
      if (claimError) throw Error('claim_failed');
      if (claimed !== true) {
        const { data: current, error: currentError } = await db.from('leads')
          .select(receiptColumn).eq('id', id).single();
        if (currentError) throw Error('receipt_read_failed');
        return current[receiptColumn] ? 'accepted' : 'pending';
      }

      // Stable payload is always derived from the saved row. Stable idempotency
      // key allows retries after uncertain provider/network outcomes.
      const payload = stablePayload(saved, channel);
      let providerResponse: Response;
      try {
        providerResponse = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${resendKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': `ffe-one-on-one-${channel}-${id}`,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(15000),
        });
      } catch {
        // Unknown delivery outcome: do NOT release the claim. It expires in
        // two minutes, after which a retry uses the SAME provider key/payload.
        return 'pending';
      }
      if (!providerResponse.ok) {
        // Even a non-2xx response can be ambiguous (e.g. gateway errors).
        // Keep the claim until expiry; do not risk immediate duplicate sends.
        console.error('Resend response not accepted', { channel, status: providerResponse.status });
        return 'pending';
      }
      let providerId: string | null = null;
      try {
        const body = await providerResponse.json();
        if (body && typeof body.id === 'string') providerId = body.id;
      } catch { /* Receipt outcome unknown; retry with same idempotency key. */ }
      if (!providerId) return 'pending';
      const { data: accepted, error: acceptError } = await db.rpc('accept_tutoring_email', {
        p_lead_id: id, p_channel: channel, p_claim_token: token, p_email_id: providerId,
      });
      if (acceptError || accepted !== true) {
        // A provider acceptance without DB receipt is an uncertain state.
        // Stable provider key makes later retries safe within provider limits.
        console.error('Could not record Resend receipt', { channel });
        return 'pending';
      }
      return 'accepted';
    }

    const staff = await deliver('staff');
    if (staff !== 'accepted') {
      return response(503, { success: false, code: 'email_status_unknown', submission_id: id });
    }
    const confirmation = await deliver('parent');
    return response(200, {
      success: true, status: 'accepted', submission_id: id,
      qualification: saved.tutoring_qualification,
      payment_status: saved.tutoring_payment_status,
      confirmation_status: confirmation,
    });
  } catch (error) {
    console.error('Tutoring submission failed', { message: error instanceof Error ? error.message : 'unknown' });
    return response(503, { success: false, code: 'review_required', submission_id:id });
  }
});

