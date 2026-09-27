
import {
  buildConfirmationEmail,
  type EmailLanguage,
} from './email-template.ts';

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
  language: EmailLanguage;
}

export interface SavedLead extends LeadData {
  id: string;
  payload_hash: string;
  created_at: string;
  email_status: 'pending' | 'accepted';
  resend_email_id: string | null;
  confirmation_status: 'pending' | 'accepted';
  confirmation_email_id: string | null;
  confirmation_eligible: boolean;
  confirmation_payload: Record<string, unknown> | null;
  notification_payload: Record<string, unknown>;
}

export interface LeadStore {
  saveOnce(lead: SavedLead): Promise<SavedLead>;
  markAccepted(id: string, emailId: string): Promise<void>;
  markConfirmationAccepted(
      id: string,
      emailId: string,
  ): Promise<void>;
}

interface Dependencies {
  store: LeadStore;
  apiKey: () => string | undefined;
  fromEmail: () => string | undefined;
  logoUrl: () => string | undefined;
  log?: (event: Record<string, unknown>) => void;
  fetch: typeof fetch;
  now: () => number;
}

type SendResult =
    | { success: true; emailId: string }
    | { success: false; code: string };

const INSTITUTIONAL_EMAIL =
    'futurefoundations.edu@gmail.com';

const DEFAULT_LOGO_URL =
    'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=375,fit=crop/dWxv3J07bnh78Qgv/screenshot-2025-02-01-161224-AVL7Zbq4VKsNQVn6.png';

const RESEND_ENDPOINT =
    'https://api.resend.com/emails';

const IDEMPOTENCY_WINDOW_MS =
    23 * 60 * 60 * 1000;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Client-Info, Apikey',
};

const uuid =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const emailPattern =
    /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

function reply(
    status: number,
    body: Record<string, unknown>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}

function fail(
    status: number,
    code: string,
): Response {
  return reply(status, {
    success: false,
    code,
  });
}

function escapeHtml(value: string): string {
  return value.replace(
      /[&<>"']/g,
      (character) =>
          ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
          })[character]!,
  );
}

async function sha256(
    value: unknown,
): Promise<string> {
  const encoded = new TextEncoder().encode(
      JSON.stringify(value),
  );

  const digest = await crypto.subtle.digest(
      'SHA-256',
      encoded,
  );

  return Array.from(
      new Uint8Array(digest),
      (byte) => byte.toString(16).padStart(2, '0'),
  ).join('');
}

function legacyPayload(data: LeadData) {
  return {
    parent_name: data.parent_name,
    email: data.email,
    phone: data.phone,
    student_name: data.student_name,
    child_age_grade: data.child_age_grade,
    main_concern: data.main_concern,
    interested_service: data.interested_service,
    preferred_contact: data.preferred_contact,
    message: data.message,
    source: data.source,
  };
}

async function sendEmail(
    deps: Dependencies,
    apiKey: string,
    idempotencyKey: string,
    payload: Record<string, unknown>,
    log: (
        event: string,
        details?: Record<string, unknown>,
    ) => void,
): Promise<SendResult> {
  try {
    const response = await deps.fetch(
        RESEND_ENDPOINT,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
          },
          body: JSON.stringify(payload),
          signal: AbortSignal.timeout(15000),
        },
    );

    if (!response.ok) {
      const providerError = await response
          .json()
          .catch(() => null);

      const providerCode =
          typeof providerError?.name === 'string' &&
          /^[a-z_]{1,80}$/.test(providerError.name)
              ? providerError.name
              : 'unknown';

      log('resend_rejected', {
        provider_status: response.status,
        provider_code: providerCode,
      });

      return {
        success: false,
        code: 'email_not_accepted',
      };
    }

    const result = await response
        .json()
        .catch(() => null);

    if (
        !result ||
        typeof result.id !== 'string' ||
        !result.id
    ) {
      log('resend_invalid_receipt');

      return {
        success: false,
        code: 'email_status_unknown',
      };
    }

    return {
      success: true,
      emailId: result.id,
    };
  } catch {
    log('resend_network_or_response_failure');

    return {
      success: false,
      code: 'provider_network_error',
    };
  }
}

export function createLeadHandler(
    deps: Dependencies,
) {
  return async (
      req: Request,
  ): Promise<Response> => {
    if (req.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    if (req.method !== 'POST') {
      return fail(405, 'method_not_allowed');
    }

    let payload: Record<string, unknown>;

    try {
      const body = await req.text();

      if (body.length > 20000) {
        return fail(413, 'invalid_input');
      }

      const parsed = JSON.parse(body);

      if (
          !parsed ||
          typeof parsed !== 'object' ||
          Array.isArray(parsed)
      ) {
        return fail(400, 'invalid_input');
      }

      payload = parsed;
    } catch {
      return fail(400, 'invalid_input');
    }

    if (payload.website) {
      return fail(400, 'invalid_input');
    }

    if (
        typeof payload.submission_id !== 'string' ||
        !uuid.test(payload.submission_id)
    ) {
      return fail(400, 'invalid_input');
    }

    const submissionId = payload.submission_id;

    const log = (
        event: string,
        details: Record<string, unknown> = {},
    ) => {
      deps.log?.({
        event,
        submission_id: submissionId,
        ...details,
      });
    };

    const limits = {
      parent_name: 200,
      email: 254,
      phone: 100,
      student_name: 200,
      child_age_grade: 200,
      main_concern: 1000,
      interested_service: 200,
      preferred_contact: 200,
      message: 5000,
      source: 100,
    };

    const data = {} as LeadData;

    for (
        const field of Object.keys(limits) as
        Array<keyof typeof limits>
        ) {
      const value = payload[field] ?? '';

      if (
          typeof value !== 'string' ||
          value.length > limits[field] ||
          value.includes(String.fromCharCode(0))
      ) {
        return fail(400, 'invalid_input');
      }

      data[field] = value;
    }

    if (
        data.parent_name.trim().length < 2 ||
        /[\r\n]/.test(data.parent_name) ||
        !emailPattern.test(data.email) ||
        /[\r\n]/.test(data.interested_service)
    ) {
      return fail(400, 'invalid_input');
    }

    if (
        [
          'popup_modal',
          'homepage_inline',
          'summer_questionnaire',
        ].includes(data.source) &&
        !data.phone.trim()
    ) {
      return fail(400, 'invalid_input');
    }

    data.source ||= 'website';

    if (
        payload.language !== undefined &&
        payload.language !== 'en' &&
        payload.language !== 'es'
    ) {
      return fail(400, 'invalid_input');
    }

    data.language =
        payload.language === 'es'
            ? 'es'
            : 'en';

    const apiKey = deps.apiKey();
    const fromEmail = deps.fromEmail()?.trim();

    if (
        !apiKey ||
        !fromEmail ||
        !emailPattern.test(fromEmail)
    ) {
      log('configuration_error', {
        missing_key: !apiKey,
        invalid_sender:
            !fromEmail ||
            !emailPattern.test(fromEmail),
      });

      return fail(503, 'configuration_error');
    }

    try {
      const oldPayload = legacyPayload(data);
      const legacyHash = await sha256(oldPayload);

      const payloadHash = await sha256({
        ...oldPayload,
        language: data.language,
      });

      const timestamp =
          new Date(deps.now()).toISOString();

      // Existing institutional notification.

      const fields: Array<[string, string]> = [
        ['Parent / Guardian', data.parent_name],
        ['Phone', data.phone],
        ['Email', data.email],
        ['Age / Grade', data.child_age_grade],
        ['Main concern', data.main_concern],
        ['Interested service', data.interested_service],
        ['Message', data.message],
        ['Student', data.student_name],
        ['Preferred contact', data.preferred_contact],
        ['Submission timestamp', timestamp],
        ['Source', data.source],
        ['Reference', submissionId],
        ['Language', data.language],
      ];

      const notification = {
        from: fromEmail,
        to: [INSTITUTIONAL_EMAIL],
        reply_to: data.email,
        subject:
            `FFE | New Questionnaire Submission | ${data.parent_name}`,
        text: fields
            .map(
                ([label, value]) =>
                    `${label}: ${value}`,
            )
            .join('\n'),
        html:
            '<h1>New Questionnaire Submission</h1><dl>' +
            fields
                .map(
                    ([label, value]) =>
                        `<dt><strong>${escapeHtml(label)}</strong></dt>` +
                        `<dd style="white-space:pre-wrap">${escapeHtml(value)}</dd>`,
                )
                .join('') +
            '</dl>',
      };

      // Parent acknowledgment: English or Spanish.

      const configuredLogo =
          deps.logoUrl()?.trim();

      const logoUrl =
          configuredLogo &&
          /^https:\/\//i.test(configuredLogo)
              ? configuredLogo
              : DEFAULT_LOGO_URL;

      const acknowledgment =
          buildConfirmationEmail({
            parentName: data.parent_name,
            language: data.language,
            logoUrl,
          });

      const confirmationPayload:
          Record<string, unknown> = {
        from: fromEmail,
        to: [data.email],
        reply_to: INSTITUTIONAL_EMAIL,
        subject: acknowledgment.subject,
        html: acknowledgment.html,
        text: acknowledgment.text,
      };

      // Save the lead and both email payloads.

      let saved: SavedLead;

      try {
        saved = await deps.store.saveOnce({
          ...data,
          id: submissionId,
          payload_hash: payloadHash,
          created_at: timestamp,
          email_status: 'pending',
          resend_email_id: null,
          confirmation_status: 'pending',
          confirmation_email_id: null,
          confirmation_eligible: true,
          confirmation_payload: confirmationPayload,
          notification_payload: notification,
        });
      } catch {
        log('save_failed');

        return fail(503, 'save_failed');
      }

      // Accept compatible retries of historical leads,
      // but never send them retrospective confirmations.

      const isLegacy =
          saved.payload_hash === legacyHash &&
          saved.payload_hash !== payloadHash &&
          data.language === 'en';

      const isCurrent =
          saved.payload_hash === payloadHash;

      if (!isLegacy && !isCurrent) {
        return fail(409, 'submission_conflict');
      }

      const createdAt =
          Date.parse(saved.created_at);

      if (!Number.isFinite(createdAt)) {
        log('invalid_saved_timestamp');

        return fail(
            503,
            'service_unavailable',
        );
      }

      const expired =
          deps.now() - createdAt >=
          IDEMPOTENCY_WINDOW_MS;

      // Send the institutional notification first.

      let institutionalEmailId =
          saved.resend_email_id;

      if (
          saved.email_status !== 'accepted' ||
          !institutionalEmailId
      ) {
        if (expired) {
          log('institutional_review_required');

          return fail(409, 'review_required');
        }

        const result = await sendEmail(
            deps,
            apiKey,
            `lead/${submissionId}`,
            saved.notification_payload,
            log,
        );

        if (result.success === false) {
          return fail(502, result.code);
        }

        institutionalEmailId =
            result.emailId;

        try {
          await deps.store.markAccepted(
              submissionId,
              institutionalEmailId,
          );
        } catch {
          log(
              'institutional_receipt_save_failed',
          );

          return fail(
              503,
              'email_status_unknown',
          );
        }

        log('institutional_email_accepted');
      }

      // Never send acknowledgments for historical
      // or otherwise ineligible submissions.

      if (
          isLegacy ||
          saved.confirmation_eligible !== true
      ) {
        log('confirmation_not_eligible');

        return reply(200, {
          success: true,
          status: 'accepted',
          submission_id: submissionId,
          email_id: institutionalEmailId,
          confirmation_status:
              'not_applicable',
        });
      }

      // Do not resend an accepted confirmation.

      if (
          saved.confirmation_status ===
          'accepted' &&
          saved.confirmation_email_id
      ) {
        return reply(200, {
          success: true,
          status: 'accepted',
          submission_id: submissionId,
          email_id: institutionalEmailId,
          confirmation_status: 'accepted',
        });
      }

      // Do not retry an uncertain delivery after
      // the provider's idempotency window.

      if (expired) {
        log('confirmation_review_required');

        return reply(200, {
          success: true,
          status: 'accepted',
          submission_id: submissionId,
          email_id: institutionalEmailId,
          confirmation_status:
              'review_required',
        });
      }

      if (!saved.confirmation_payload) {
        log('confirmation_payload_missing');

        return reply(200, {
          success: true,
          status: 'accepted',
          submission_id: submissionId,
          email_id: institutionalEmailId,
          confirmation_status: 'pending',
        });
      }

      // Send the parent acknowledgment using
      // the original saved email content.

      const confirmationResult =
          await sendEmail(
              deps,
              apiKey,
              `confirmation/${submissionId}`,
              saved.confirmation_payload,
              log,
          );

      if (
          confirmationResult.success === false
      ) {
        log('confirmation_not_accepted', {
          code: confirmationResult.code,
        });

        // The original inquiry remains successful
        // even if the acknowledgment fails.

        return reply(200, {
          success: true,
          status: 'accepted',
          submission_id: submissionId,
          email_id: institutionalEmailId,
          confirmation_status: 'pending',
        });
      }

      try {
        await deps.store
            .markConfirmationAccepted(
                submissionId,
                confirmationResult.emailId,
            );
      } catch {
        log(
            'confirmation_receipt_save_failed',
        );

        return reply(200, {
          success: true,
          status: 'accepted',
          submission_id: submissionId,
          email_id: institutionalEmailId,
          confirmation_status: 'unknown',
        });
      }

      log('confirmation_accepted');

      return reply(200, {
        success: true,
        status: 'accepted',
        submission_id: submissionId,
        email_id: institutionalEmailId,
        confirmation_status: 'accepted',
      });
    } catch {
      log('service_unavailable');

      return fail(
          503,
          'service_unavailable',
      );
    }
  };
}

