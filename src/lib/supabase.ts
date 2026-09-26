export interface LeadPayload {
  parent_name: string;
  email: string;
  phone?: string;
  student_name?: string;
  child_age_grade?: string;
  main_concern?: string;
  interested_service?: string;
  preferred_contact?: string;
  message?: string;
  source?: string;
  website?: string;
}

export interface SubmissionAttempt {
  fingerprint: string;
  id: string;
}

export class LeadSubmissionError extends Error {
  constructor(public readonly code: string) {
    super(code);
    this.name = 'LeadSubmissionError';
  }
}

export interface LeadSubmissionResult {
  success: true;
  email_sent: boolean;
  message?: string;
}

export async function getSubmissionAttempt(
  data: LeadPayload,
  previous?: SubmissionAttempt
): Promise<SubmissionAttempt> {
  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(JSON.stringify(data))
  );

  const fingerprint = Array.from(
    new Uint8Array(digest),
    byte => byte.toString(16).padStart(2, '0')
  ).join('');

  if (previous?.fingerprint === fingerprint) {
    return previous;
  }

  const storageKey = `ffe-lead-attempt:${data.source || 'website'}`;

  try {
    const stored = JSON.parse(
      sessionStorage.getItem(storageKey) || 'null'
    );

    if (
      stored?.fingerprint === fingerprint &&
      typeof stored.id === 'string'
    ) {
      return stored as SubmissionAttempt;
    }
  } catch {
    // Browser storage may be unavailable.
  }

  const attempt: SubmissionAttempt = {
    fingerprint,
    id: crypto.randomUUID(),
  };

  try {
    sessionStorage.setItem(
      storageKey,
      JSON.stringify(attempt)
    );
  } catch {
    // Storage is optional.
  }

  return attempt;
}

export async function submitLead(
  data: LeadPayload,
  _submissionId?: string
): Promise<LeadSubmissionResult> {
  const url = import.meta.env.VITE_SUPABASE_URL
    ?.replace(/\/$/, '');

  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new LeadSubmissionError('service_unavailable');
  }

  let response: Response;

  try {
    response = await fetch(
      `${url}/functions/v1/submit-lead`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${anonKey}`,
          apikey: anonKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(25000),
      }
    );
  } catch {
    // The request may already have reached the server.
    throw new LeadSubmissionError('review_required');
  }

  let result: unknown;

  try {
    result = await response.json();
  } catch {
    throw new LeadSubmissionError('review_required');
  }

  const body =
    result !== null && typeof result === 'object'
      ? result as Record<string, unknown>
      : null;

  if (!response.ok || body?.success !== true) {
    if (response.status === 400) {
      throw new LeadSubmissionError('invalid_input');
    }

    throw new LeadSubmissionError('review_required');
  }

  if (body.email_sent === false) {
    throw new LeadSubmissionError('saved_no_email');
  }

  if (body.email_sent !== true) {
    throw new LeadSubmissionError('review_required');
  }

  return {
    success: true,
    email_sent: true,
    message:
      typeof body.message === 'string'
        ? body.message
        : undefined,
  };
}
