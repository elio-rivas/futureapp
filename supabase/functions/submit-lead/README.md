# Inquiry delivery: deployment and verification

Status checked 2026-09-23. Local implementation is ready; production is NOT repaired or deployed.

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
