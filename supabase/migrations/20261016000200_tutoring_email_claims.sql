-- Future Foundations Education
-- One-on-One Tutoring: atomic claims for staff and parent email attempts.
-- Does not alter existing submit-lead flows.
BEGIN;

ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS tutoring_staff_claim_token uuid,
  ADD COLUMN IF NOT EXISTS tutoring_staff_claimed_at timestamptz,
  ADD COLUMN IF NOT EXISTS tutoring_parent_claim_token uuid,
  ADD COLUMN IF NOT EXISTS tutoring_parent_claimed_at timestamptz;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_tutoring_staff_claim_pair_check'
      AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tutoring_staff_claim_pair_check
      CHECK ((tutoring_staff_claim_token IS NULL) =
             (tutoring_staff_claimed_at IS NULL));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'leads_tutoring_parent_claim_pair_check'
      AND conrelid = 'public.leads'::regclass
  ) THEN
    ALTER TABLE public.leads
      ADD CONSTRAINT leads_tutoring_parent_claim_pair_check
      CHECK ((tutoring_parent_claim_token IS NULL) =
             (tutoring_parent_claimed_at IS NULL));
  END IF;
END $$;

-- Returns TRUE only when the caller acquires the email attempt.
-- Claims expire after two minutes; the application MUST reuse a stable
-- provider idempotency key and the original email payload on every retry.
CREATE OR REPLACE FUNCTION public.claim_tutoring_email(
  p_lead_id uuid,
  p_channel text,
  p_claim_token uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_claimed boolean;
BEGIN
  IF p_lead_id IS NULL OR p_claim_token IS NULL
     OR p_channel NOT IN ('staff', 'parent') THEN
    RETURN FALSE;
  END IF;

  IF p_channel = 'staff' THEN
    UPDATE public.leads
       SET tutoring_staff_claim_token = p_claim_token,
           tutoring_staff_claimed_at = clock_timestamp()
     WHERE id = p_lead_id
       AND source = 'one_on_one_tutoring'
       AND tutoring_staff_email_id IS NULL
       AND (tutoring_staff_claim_token IS NULL
            OR tutoring_staff_claimed_at < clock_timestamp() - interval '2 minutes');
  ELSE
    UPDATE public.leads
       SET tutoring_parent_claim_token = p_claim_token,
           tutoring_parent_claimed_at = clock_timestamp()
     WHERE id = p_lead_id
       AND source = 'one_on_one_tutoring'
       AND tutoring_staff_email_id IS NOT NULL
       AND tutoring_parent_email_id IS NULL
       AND (tutoring_parent_claim_token IS NULL
            OR tutoring_parent_claimed_at < clock_timestamp() - interval '2 minutes');
  END IF;

  v_claimed := FOUND;
  RETURN v_claimed;
END;
$$;

-- Atomically record the provider acceptance receipt and clear the claim.
CREATE OR REPLACE FUNCTION public.accept_tutoring_email(
  p_lead_id uuid,
  p_channel text,
  p_claim_token uuid,
  p_email_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_accepted boolean;
BEGIN
  IF p_lead_id IS NULL OR p_claim_token IS NULL
     OR p_channel NOT IN ('staff', 'parent')
     OR NULLIF(btrim(p_email_id), '') IS NULL THEN
    RETURN FALSE;
  END IF;

  IF p_channel = 'staff' THEN
    UPDATE public.leads
       SET tutoring_staff_email_id = p_email_id,
           tutoring_staff_claim_token = NULL,
           tutoring_staff_claimed_at = NULL
     WHERE id = p_lead_id
       AND source = 'one_on_one_tutoring'
       AND tutoring_staff_email_id IS NULL
       AND tutoring_staff_claim_token = p_claim_token;
  ELSE
    UPDATE public.leads
       SET tutoring_parent_email_id = p_email_id,
           tutoring_parent_claim_token = NULL,
           tutoring_parent_claimed_at = NULL
     WHERE id = p_lead_id
       AND source = 'one_on_one_tutoring'
       AND tutoring_staff_email_id IS NOT NULL
       AND tutoring_parent_email_id IS NULL
       AND tutoring_parent_claim_token = p_claim_token;
  END IF;

  v_accepted := FOUND;
  RETURN v_accepted;
END;
$$;

-- Release only a claim owned by the calling attempt.
-- Use only after a DEFINITIVE provider rejection, not a timeout or
-- unknown network outcome. Unknown outcomes must wait for expiry and
-- retry with the SAME provider idempotency key and payload.
CREATE OR REPLACE FUNCTION public.release_tutoring_email(
  p_lead_id uuid,
  p_channel text,
  p_claim_token uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_released boolean;
BEGIN
  IF p_lead_id IS NULL OR p_claim_token IS NULL
     OR p_channel NOT IN ('staff', 'parent') THEN
    RETURN FALSE;
  END IF;

  IF p_channel = 'staff' THEN
    UPDATE public.leads
       SET tutoring_staff_claim_token = NULL,
           tutoring_staff_claimed_at = NULL
     WHERE id = p_lead_id
       AND source = 'one_on_one_tutoring'
       AND tutoring_staff_email_id IS NULL
       AND tutoring_staff_claim_token = p_claim_token;
  ELSE
    UPDATE public.leads
       SET tutoring_parent_claim_token = NULL,
           tutoring_parent_claimed_at = NULL
     WHERE id = p_lead_id
       AND source = 'one_on_one_tutoring'
       AND tutoring_parent_email_id IS NULL
       AND tutoring_parent_claim_token = p_claim_token;
  END IF;

  v_released := FOUND;
  RETURN v_released;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_tutoring_email(uuid, text, uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.accept_tutoring_email(uuid, text, uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.release_tutoring_email(uuid, text, uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_tutoring_email(uuid, text, uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.accept_tutoring_email(uuid, text, uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.release_tutoring_email(uuid, text, uuid) TO service_role;

COMMIT;
