# Inquiry delivery: deployment and verification

## Current investigation — 2026-09-25 America/Managua

Production is **not yet repaired**. The observations below supersede the historical
September 23 status farther down this document.

- Hostinger serves `assets/index-bCfaV8De.js`, with the strict acceptance client.
- The configured Supabase project now resolves and responds. Do not replace its URL
  based on the historical NXDOMAIN finding.
- Actual production POST to
  `https://jtmkyetyjhvhutzsnyqw.supabase.co/functions/v1/submit-lead`
  using the configured public key and clearly labeled synthetic questionnaire data:
  HTTP 200, `{"success":true,"message":"Lead captured successfully","email_sent":false}`.
- This is the old backend response contract, not the checked-in handler. It provides
  neither an acceptance status nor a Resend message ID. The strict frontend correctly
  rejects it. The matching Resend log confirms HTTP 403 due to an unauthorized Gmail From
  address (details and log link below).
- CORS preflight responds HTTP 200. This failure is not currently a DNS outage.
- Public DKIM, send-subdomain SPF/MX, and rsend CNAME now match all records documented
  below. No DNS modifications were made. The authenticated Resend dashboard subsequently confirmed **Verified** after
  restarting verification. `notifications@futurefoundationsedu.com` is now a suitable sender.
- Local `.env` has only Vite Supabase public configuration, no Resend secret. No
  authenticated Supabase CLI configuration or deployment workflow is installed locally.
- Chrome shows separate FFE Hostinger/Gmail and Elio Resend sessions. Browser actions
  were repeatedly interrupted by user tab/profile changes; dashboard inspection and
  deployment have not been completed. An authenticated Supabase dashboard was requested.
- No message ID was returned by the real test. API acceptance and Gmail delivery
  remain unverified. Do not report the HTTP 200 as email success.

### Required deployment steps

1. Open the existing project at
   https://supabase.com/dashboard/project/jtmkyetyjhvhutzsnyqw/functions.
   Inspect `submit-lead` logs for the synthetic test and current deployed source.
2. Check migration history; apply the existing reliable-notification migration if
   not applied (do not rerun its constraint additions blindly).
3. In Elio's Resend account, verify `futurefoundationsedu.com` under Domains.
   Existing public DNS matches the previously supplied records. Reuse the existing
   `ResendAPIKeyFFE`; if its full value is unavailable, the owner must supply it
   directly through the project's Edge Function Secrets settings.
4. Configure **Supabase Edge Function secrets**, not Hostinger static frontend vars:
   `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. The latter must be a bare verified-domain
   sender address, such as `notifications@futurefoundationsedu.com` only after verification.
   Supabase supplies `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` at runtime.
5. Deploy both `index.ts` and `handler.ts` to `submit-lead` in that existing project.
   With authenticated CLI: `supabase functions deploy submit-lead --project-ref jtmkyetyjhvhutzsnyqw`.
6. Build with the existing confirmed public Vite configuration. Publish `dist/` through
   the FFE Hostinger site's existing workflow. Preserve SPA configuration and other assets.
7. Test the published questionnaire in English/Spanish. Expect matching submission ID,
   `success: true`, `status: accepted`, and a nonempty `email_id`. Locate that ID in
   Resend logs, confirm delivery events, and separately inspect FFE Gmail inbox/spam.

Local changes add configurable sender, escaped HTML and plain text, timestamp, exact
answer preservation, and safe provider diagnostics. Program selection uses stable
existing English submission values while labels translate; `targeted-reading` remains
an accepted context identifier. Other program-page titles map to their existing options.

Validation: 19 automated tests pass; changed-file ESLint, strict handler typecheck,
and production build pass. Full-project lint/typecheck fail on existing unrelated
analytics/dependency, unused import, and AboutPage click-handler issues. Desktop/mobile
interactive browser testing and live database migration testing remain pending.

## Historical observations — 2026-09-23 (not current status)

## Actual external results

- Published site: https://futurefoundationsedu.com/contact, HTTP 200, Hostinger CDN.
- Published JS: `assets/index-DfEY7lfX.js`. It still uses the old submission client.
- Both local configuration and that published bundle use
  `https://jtmkyetyjhvhutzsnyqw.supabase.co`, which returned DNS `NXDOMAIN`.
  Restore that project or obtain the correct active project's URL and public key.
- Submitted `TEST FFE 2026-09-23 Questionnaire` from the published popup:
  UI showed `Something went wrong. Please try again or call us directly.`
- Submitted `TEST FFE 2026-09-23 Contact` from the published contact form:
  UI showed `Something went wrong. Please try again or contact us at (407) 301-9979.`
- Resend credential supplied for this task successfully listed domains (HTTP 200).
  There were none. Registered `futurefoundationsedu.com` (HTTP 201), domain ID
  `dafe5826-fd07-47db-b415-1e52c99e687e`, and requested verification (HTTP 200).
  Last observed status: `pending`.
- A separate actual Resend send with the requested sender/recipient and subject
  `TEST ONLY — FFE delivery verification 2026-09-23` returned HTTP 403:
  `The futurefoundationsedu.com domain is not verified.` No email ID was returned.
  This API check is separate from the published-form attempts, not an end-to-end success.
- Gmail receipt has NOT been verified. No authenticated Gmail access was available.

## DNS records returned by Resend (not applied)

Authoritative nameservers: `ns1.dns-parking.com`, `ns2.dns-parking.com`.
Existing root MX records: priority 5 `mx1.hostinger.com`, priority 10 `mx2.hostinger.com`.
Keep the existing website records and root mail records intact.

| Type | Name | Value | Priority | TTL |
| --- | --- | --- | --- | --- |
| TXT | resend._domainkey | See exact DKIM value below | — | Auto |
| MX | send | feedback-smtp.us-east-1.amazonses.com | 10 | Auto |
| TXT | send | v=spf1 include:amazonses.com ~all | — | Auto |
| CNAME | rsend | send.forge.rmta.net | — | 3600 |

Exact public DKIM TXT value supplied by Resend:

```text
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCwoj48cvc1WYzTT/dMx/GtX3m1/V0ZO502/5J5zQBIAGumML9cwSOxYP5DMwGsfY7t6fl3lyEh2OfC35W8HHCt7ioAVgg3IeIwNVuAhcDgFCd1ky0/NbndDIka1X3B11UKBKQHX7WSUMev3HQ9EHkiaH+pZQneCZKm+GBKpldc+QIDAQAB
```

Before applying, re-read this domain's records in Resend and compare with the live
DNS zone. Add only non-conflicting records; do not replace root SPF or MX records.
Then request verification and wait for `verified` in Resend, not merely a successful
DNS edit or verification-request response.

## Deploy in order

Requires an authenticated Supabase administrator and Hostinger DNS/hosting access.
Neither was available during implementation. The Supabase connector was suggested,
but no connection was confirmed. Computer control of existing logged-in apps was
not permitted; the in-app browser can test the public site but has no admin sessions.

1. Restore/identify the active Supabase project. Confirm the production frontend URL
   and publishable/anon key match it. Do not create a replacement project blindly.
2. Apply `supabase/migrations/20260923000000_reliable_lead_notifications.sql` after
   checking existing migration history. On a new approved project, first apply the
   original leads-table migration. This adds receipt fields and removes direct
   anonymous inserts; submissions go through the service-role Edge Function.
3. Set the supplied `ResendApiKeyFFE` credential as the **Edge Function secret**
   named `RESEND_API_KEY` through Supabase's secrets settings. Do not use a VITE_
   variable. The code intentionally has no fallback key. Also verify the runtime's
   `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` target the intended project.
4. Apply the DNS records above and confirm Resend's domain status is `verified`.
5. Deploy the `submit-lead` directory, including `handler.ts`, to that same project.
   With the authenticated Supabase CLI: `supabase functions deploy submit-lead
   --project-ref <confirmed-project-ref>`. Retain the project's JWT verification
   compatible with its public anon key; the frontend sends that key in both headers.
6. Coordinate backend/frontend publication: the new function requires
   `submission_id`; old cached frontends cannot satisfy the new contract. Publish
   the rebuilt frontend immediately after the function, and purge stale HTML from
   Hostinger's cache. Old open tabs may need a refresh.
7. Run `npm run build` with the verified production Vite URL/public key, then publish
   the contents of `dist/` to the existing site's configured document root using its
   actual deployment workflow. Preserve hosting configuration and SPA routing.
   No verified deployment credentials or automated deployment workflow were present.
8. Confirm the public bundle changed, and submit clearly labeled tests from BOTH
   the published questionnaire and contact page. Expect HTTP 200 with `success:true`,
   `status:accepted`, matching `submission_id`, and a non-empty `email_id`.
9. Match each returned ID with Resend's email record: correct sender, recipient,
   reply-to, and delivery events. Verify Gmail inbox/spam if authorized access exists.
   API acceptance alone is not mailbox receipt.

## Retry behavior

The frontend keeps an attempt ID for an unchanged form payload. Session storage
contains only its hash and ID, never the family's form values. Failed submissions
leave input values visible. In-flight fields are disabled and rapid double submits
are ignored. Edited content becomes a different submission; after an uncertain
result the UI asks families to retry without editing or to phone the team.

The database primary key prevents duplicate lead rows. The persisted notification
body and `lead/<submission_id>` Resend idempotency key stay identical across retries,
including after deployments. Successful receipts prevent further provider calls.
Resend retains idempotency keys for 24 hours; unresolved requests older than 23 hours
stop and require manual receipt reconciliation, avoiding an automatic duplicate
outside that window. Review the email in Resend and record its ID/status before
allowing another send. There is no automatic retry queue or claim of mailbox delivery.

## Local validation

- `node --test tests/lead-submission.test.mjs`: 17 passing tests, mocked DB/provider.
- ESLint on all edited application/function TypeScript files: passes.
- Standalone strict type check for `handler.ts`: passes.
- `npm run build`: passes; local `dist/` generated, not uploaded.
- Project-wide lint/typecheck still report unrelated existing problems in analytics,
  AboutPage, CareersPage and TuitionEnrollmentPage (and LanguageContext lint warning).
- Migration not applied or integration-tested against a live PostgreSQL project.

References: https://resend.com/docs/dashboard/emails/idempotency-keys,
https://supabase.com/docs/guides/functions/secrets.

## Resend dashboard evidence from this investigation

The authenticated Elio account's log for the real diagnostic submission is:
https://resend.com/logs/0ee73da0-9cae-4e05-bcc9-665243d41013

It identifies the Supabase runtime project `jtmkyetyjhvhutzsnyqw`, POST `/emails`,
HTTP **403**, and **Domain not verified: Verify gmail.com or update your from domain**.
The request sender was `futurefoundations.edu@gmail.com`, recipient the same Gmail,
and subject `New Inquiry: TEST FFE delivery diagnostic — After-School Reading and Math Tutoring`.
The production API key was **Future Foundations Notifications 3.** (sending access),
not **ResendAPIKeyFFE**. This proves the provider failure is an unauthorized Gmail
sender and the production configuration differs from the intended setup.

The domain dashboard initially showed `futurefoundationsedu.com` **Failed**, based
on missing-record checks dated September 23. All displayed DNS values matched live
public DNS. Restarted verification via Resend; observed status **Pending**. This
is a verification restart, not a new domain registration or DNS change.
Dashboard: https://resend.com/domains/dafe5826-fd07-47db-b415-1e52c99e687e

Verification completed: authenticated Resend dashboard now shows **Verified**, sending enabled, and DKIM/SPF/MX/CNAME all Verified (September 25, 6:57 PM displayed). No DNS edits were necessary.
