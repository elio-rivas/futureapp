-- Future Foundations Education
-- One-on-One Tutoring lead extension
-- Non-destructive migration: preserves existing lead submissions.
BEGIN;

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tutoring_answers jsonb,
  ADD COLUMN IF NOT EXISTS tutoring_qualification text,
  ADD COLUMN IF NOT EXISTS tutoring_payment_status text,
  ADD COLUMN IF NOT EXISTS tutoring_callback_window text,
  ADD COLUMN IF NOT EXISTS tutoring_callback_timezone text,
  ADD COLUMN IF NOT EXISTS contact_consent_granted boolean,
  ADD COLUMN IF NOT EXISTS contact_consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS contact_consent_version text,
  ADD COLUMN IF NOT EXISTS contact_consent_language text,
  ADD COLUMN IF NOT EXISTS tutoring_source_url text,
  ADD COLUMN IF NOT EXISTS tutoring_utm jsonb;

-- Check constraints are nullable to avoid altering historical submissions.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_tutoring_qualification_check'
      AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tutoring_qualification_check
      CHECK (tutoring_qualification IS NULL OR tutoring_qualification IN (
        'READY_TO_ENROLL', 'NEEDS_REVIEW', 'PROGRAM_MISMATCH'
      ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_tutoring_payment_status_check'
      AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tutoring_payment_status_check
      CHECK (tutoring_payment_status IS NULL OR tutoring_payment_status IN (
        'STEP_UP_FUNDS_REPORTED', 'STEP_UP_FUNDS_PENDING',
        'ALTERNATIVE_PAYMENT', 'PAYMENT_NOT_SPECIFIED'
      ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_tutoring_callback_window_check'
      AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tutoring_callback_window_check
      CHECK (tutoring_callback_window IS NULL OR tutoring_callback_window IN (
        '08_11', '11_14', '14_17', '17_19', 'any'
      ));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_tutoring_consent_check'
      AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tutoring_consent_check
      CHECK (
        source IS DISTINCT FROM 'one_on_one_tutoring'
        OR (
          contact_consent_granted IS TRUE
          AND contact_consent_at IS NOT NULL
          AND contact_consent_version IS NOT NULL
          AND contact_consent_language IN ('es', 'en')
          AND tutoring_answers IS NOT NULL
          AND tutoring_qualification IS NOT NULL
          AND tutoring_callback_window IS NOT NULL
        )
      );
  END IF;
END $$;

-- Existing RLS and permissions are preserved.
COMMENT ON COLUMN public.leads.tutoring_answers IS
  'Validated seven-question One-on-One Tutoring response object';
COMMENT ON COLUMN public.leads.contact_consent_at IS
  'Server-generated UTC consent receipt timestamp';
COMMENT ON COLUMN public.leads.tutoring_qualification IS
  'Preliminary routing classification, not admission approval';

COMMIT;
