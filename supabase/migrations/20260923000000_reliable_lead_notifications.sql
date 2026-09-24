-- Historical leads retain unknown delivery status. New submissions explicitly
-- start pending, and become accepted only after Resend returns an email ID.
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS student_name text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS preferred_contact text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS payload_hash text,
  ADD COLUMN IF NOT EXISTS notification_payload jsonb,
  ADD COLUMN IF NOT EXISTS email_status text,
  ADD COLUMN IF NOT EXISTS resend_email_id text,
  ADD COLUMN IF NOT EXISTS email_accepted_at timestamptz;

ALTER TABLE public.leads ADD CONSTRAINT leads_email_status_check
  CHECK (email_status IS NULL OR email_status IN ('pending', 'accepted'));
ALTER TABLE public.leads ADD CONSTRAINT leads_accepted_receipt_check
  CHECK (email_status IS DISTINCT FROM 'accepted' OR resend_email_id IS NOT NULL);

-- Only the Edge Function's service role may write or read inquiries and receipts.
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;
REVOKE ALL ON public.leads FROM anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.leads TO service_role;
