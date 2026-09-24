export interface LeadPayload {
  parent_name: string;
  phone?: string;
  email: string;
  student_name?: string;
  child_age_grade?: string;
  main_concern?: string;
  interested_service?: string;
  preferred_contact?: string;
  message?: string;
  source?: string;
  website?: string;
}

export class LeadSubmissionError extends Error {
  constructor(public code: string) {
    super(code);
    this.name = 'LeadSubmissionError';
  }
}

export interface SubmissionAttempt {
  fingerprint: string;
  id: string;
}

// One attempt per unchanged payload, including reloads when session storage is
// available. Store only its hash and random identifier, never family details.
export async function getSubmissionAttempt(data: LeadPayload, previous?: SubmissionAttempt): Promise<SubmissionAttempt> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(JSON.stringify(data)));
  const fingerprint = Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
  if (previous?.fingerprint === fingerprint) return previous;
  const storageKey = `ffe-lead-attempt:${data.source || 'website'}`;
  try {
    const stored = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
    if (stored?.fingerprint === fingerprint && typeof stored.id === 'string') return stored;
  } catch { /* Storage may be unavailable; the component retains the attempt. */ }
  const attempt = { fingerprint, id: crypto.randomUUID() };
  try { sessionStorage.setItem(storageKey, JSON.stringify(attempt)); } catch { /* noop */ }
  return attempt;
}

export async function submitLead(data: LeadPayload, submissionId: string) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new LeadSubmissionError('service_unavailable');
  let response: Response;
  try {
    response = await fetch(`${url}/functions/v1/submit-lead`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${anonKey}`,
        apikey: anonKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, submission_id: submissionId }),
      signal: AbortSignal.timeout(25000),
    });
  } catch {
    throw new LeadSubmissionError('email_status_unknown');
  }
  const result = await response.json().catch(() => null);
  if (!response.ok || result?.success !== true || result?.status !== 'accepted' ||
      result?.submission_id !== submissionId || typeof result?.email_id !== 'string' || !result.email_id) {
    throw new LeadSubmissionError(typeof result?.code === 'string' ? result.code : 'email_status_unknown');
  }
  return result as { success: true; status: 'accepted'; submission_id: string; email_id: string };
}
