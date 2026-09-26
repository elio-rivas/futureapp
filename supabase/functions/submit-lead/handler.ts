// Pure request handler: the runtime adapter supplies persistence and secrets.
export interface LeadData {
  parent_name: string;
  email: string;
  phone: string;
  student_name: string;
  child_age_grade: string;
  main_concern: string;
  interested_service: string;
  preferred_contact: string;
  message: string;
  source: string;
}

export interface SavedLead extends LeadData {
  id: string;
  payload_hash: string;
  created_at: string;
  email_status: 'pending' | 'accepted';
  resend_email_id: string | null;
  notification_payload: Record<string, unknown>;
}

export interface LeadStore {
  // Atomically insert once; on an id conflict return the existing row unchanged.
  saveOnce(lead: SavedLead): Promise<SavedLead>;
  markAccepted(id: string, emailId: string): Promise<void>;
}

interface Dependencies {
  store: LeadStore;
  apiKey: () => string | undefined;
  fromEmail: () => string | undefined;
  log?: (event: Record<string, unknown>) => void;
  fetch: typeof fetch;
  now: () => number;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

const reply = (status: number, body: Record<string, unknown>) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
});
const fail = (status: number, code: string) => reply(status, { success: false, code });
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function createLeadHandler(deps: Dependencies) {
  return async (req: Request): Promise<Response> => {
    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: corsHeaders });
    if (req.method !== 'POST') return fail(405, 'method_not_allowed');

    let payload: Record<string, unknown>;
    try {
      const body = await req.text();
      if (body.length > 20000) return fail(413, 'invalid_input');
      const parsed = JSON.parse(body);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return fail(400, 'invalid_input');
      payload = parsed;
    } catch {
      return fail(400, 'invalid_input');
    }
    if (payload.website) return fail(400, 'invalid_input');
    if (typeof payload.submission_id !== 'string' || !uuid.test(payload.submission_id)) {
      return fail(400, 'invalid_input');
    }

    const data = {} as LeadData;
    const limits: Record<keyof LeadData, number> = {
      parent_name: 200, email: 254, phone: 100, student_name: 200,
      child_age_grade: 200, main_concern: 1000, interested_service: 200,
      preferred_contact: 200, message: 5000, source: 100,
    };
    for (const field of Object.keys(limits) as (keyof LeadData)[]) {
      const value = payload[field] ?? '';
      if (typeof value !== 'string' || value.length > limits[field] || value.includes(String.fromCharCode(0))) {
        return fail(400, 'invalid_input');
      }
      data[field] = value;
    }
    if (data.parent_name.trim().length < 2 || /[\r\n]/.test(data.parent_name) ||
        !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email) || /[\r\n]/.test(data.interested_service)) {
      return fail(400, 'invalid_input');
    }
    if (['popup_modal', 'homepage_inline', 'summer_questionnaire'].includes(data.source) && !data.phone.trim()) {
      return fail(400, 'invalid_input');
    }
    data.source ||= 'website';
    const apiKey = deps.apiKey();
    const fromEmail = deps.fromEmail()?.trim();
    if (!apiKey || !fromEmail || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fromEmail)) {
      deps.log?.({ event: 'configuration_error', submission_id: payload.submission_id,
        missing_key: !apiKey, invalid_sender: !fromEmail || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fromEmail) });
      return fail(503, 'configuration_error');
    }
    const log = (event: string, details = {}) => deps.log?.({ event, submission_id: payload.submission_id, ...details });

    try {
      const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(data)));
      const payloadHash = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
      const id = payload.submission_id;
      const timestamp = new Date(deps.now()).toISOString();
      const fields = [
        ['Parent / Guardian', data.parent_name], ['Phone', data.phone], ['Email', data.email],
        ['Age / Grade', data.child_age_grade], ['Main concern', data.main_concern],
        ['Interested service', data.interested_service], ['Message', data.message],
        ['Student', data.student_name], ['Preferred contact', data.preferred_contact],
        ['Submission timestamp', timestamp], ['Source', data.source], ['Reference', id],
      ];
      const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c =>
        ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
      const notification = {
        from: fromEmail,
        to: ['futurefoundations.edu@gmail.com'],
        reply_to: data.email,
        subject: `FFE | New Questionnaire Submission | ${data.parent_name}`,
        text: fields.map(([label, value]) => `${label}: ${value}`).join('\n'),
        html: '<h1>New Questionnaire Submission</h1><dl>' + fields.map(([label, value]) =>
          `<dt><strong>${label}</strong></dt><dd style="white-space:pre-wrap">${escapeHtml(value)}</dd>`).join('') + '</dl>',
      };
      let saved: SavedLead;
      try {
        saved = await deps.store.saveOnce({ ...data, id, payload_hash: payloadHash,
          created_at: new Date(deps.now()).toISOString(), email_status: 'pending',
          resend_email_id: null, notification_payload: notification });
      } catch {
        log('save_failed');
        return fail(503, 'save_failed');
      }
      if (saved.payload_hash !== payloadHash) return fail(409, 'submission_conflict');
      if (saved.email_status === 'accepted' && saved.resend_email_id) {
        return reply(200, { success: true, status: 'accepted', submission_id: id, email_id: saved.resend_email_id });
      }
      // Resend keeps idempotency keys for 24h. Stop earlier if acceptance is unknown;
      // never blindly resend an old pending email after the provider's key expires.
      if (deps.now() - Date.parse(saved.created_at) >= 23 * 60 * 60 * 1000) {
        return fail(409, 'review_required');
      }
      let response: Response;
      let result: { id?: unknown };
      try {
        response = await deps.fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json',
            'Idempotency-Key': `lead/${id}` },
          // Reuse the exact persisted body across retries and deployments.
          body: JSON.stringify(saved.notification_payload),
          signal: AbortSignal.timeout(15000),
        });
        if (!response.ok) {
          // Log status and a bounded provider error name, never its message/body (may contain PII).
          const error = await response.json().catch(() => null);
          log('resend_rejected', { provider_status: response.status,
            provider_code: typeof error?.name === 'string' && /^[a-z_]{1,80}$/.test(error.name) ? error.name : 'unknown' });
          return fail(502, 'email_not_accepted');
        }
        result = await response.json();
        if (typeof result?.id !== 'string' || !result.id) {
          log('resend_invalid_receipt');
          return fail(502, 'email_status_unknown');
        }
      } catch {
        log('resend_network_or_response_failure');
        return fail(502, 'provider_network_error');
      }
      try {
        await deps.store.markAccepted(id, result.id as string);
      } catch {
        log('receipt_save_failed', { email_id: result.id });
        // Resend accepted it, but preserve a retryable response until the receipt
        // is durable. A retry recovers the same email ID via Resend idempotency.
        return fail(503, 'email_status_unknown');
      }
      log('resend_accepted', { email_id: result.id });
      return reply(200, { success: true, status: 'accepted', submission_id: id, email_id: result.id });
    } catch {
      return fail(503, 'service_unavailable');
    }
  };
}
