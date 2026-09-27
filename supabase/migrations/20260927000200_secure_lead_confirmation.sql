
-- Future Foundations Education
-- Secure parent confirmation delivery
--
-- Prerequisite:
-- 20260927000100_add_lead_confirmation.sql
-- must already have been applied.
--
-- This migration:
-- 1. Protects historical leads from retrospective emails.
-- 2. Stores the immutable parent confirmation payload.
-- 3. Coordinates concurrent confirmation attempts.
--
-- Existing institutional email fields remain unchanged.

BEGIN;

-- ==================================================
-- 1. Explicit confirmation eligibility
-- ==================================================
--
-- Historical leads must not become eligible
-- automatically.
--
-- Only the updated Edge Function will explicitly
-- set this field to TRUE for new submissions.

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS confirmation_eligible
BOOLEAN NOT NULL DEFAULT FALSE;

-- ==================================================
-- 2. Immutable confirmation email payload
-- ==================================================
--
-- Stores the original Resend request body:
-- from, to, reply_to, subject, html and text.
--
-- A retry must reuse this saved payload rather
-- than rebuilding the email from a newer template.

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS confirmation_payload
JSONB;

-- ==================================================
-- 3. Confirmation delivery claim
-- ==================================================
--
-- A short-lived claim prevents two simultaneous
-- requests from independently initiating the
-- same confirmation email.
--
-- The claim token identifies the request that
-- owns the current delivery attempt.

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS confirmation_claim_token
UUID;

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS confirmation_claimed_at
TIMESTAMPTZ;

-- ==================================================
-- 4. Consistency constraint
-- ==================================================
--
-- The claim token and its timestamp must either
-- both be present or both be absent.

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname =
            'leads_confirmation_claim_consistency_check'
          AND conrelid = 'public.leads'::regclass
    ) THEN
        ALTER TABLE public.leads
        ADD CONSTRAINT
            leads_confirmation_claim_consistency_check
        CHECK (
            (
                confirmation_claim_token IS NULL
                AND confirmation_claimed_at IS NULL
            )
            OR
            (
                confirmation_claim_token IS NOT NULL
                AND confirmation_claimed_at IS NOT NULL
            )
        );
    END IF;
END
$$;

-- ==================================================
-- 5. Atomic claim function
-- ==================================================
--
-- The updated Edge Function will call this RPC
-- immediately before attempting to send a
-- parent confirmation.
--
-- The UPDATE is atomic:
-- only one concurrent request can acquire
-- an available claim.
--
-- A claim expires after two minutes to allow
-- recovery if an Edge Function terminates
-- unexpectedly.
--
-- IMPORTANT:
-- An expired claim does not mean that the
-- previous email was not accepted by Resend.
-- The handler must reuse the same persisted
-- payload and the same idempotency key, and
-- respect the existing 23-hour retry window.

CREATE OR REPLACE FUNCTION
public.claim_lead_confirmation(
    p_lead_id UUID,
    p_claim_token UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
    v_claimed BOOLEAN;
BEGIN
    IF p_lead_id IS NULL
       OR p_claim_token IS NULL THEN
        RETURN FALSE;
    END IF;

    UPDATE public.leads
    SET
        confirmation_claim_token =
            p_claim_token,

        confirmation_claimed_at =
            clock_timestamp()

    WHERE id = p_lead_id

      AND confirmation_eligible = TRUE

      AND confirmation_status = 'pending'

      AND confirmation_payload IS NOT NULL

      AND (
          confirmation_claim_token IS NULL

          OR confirmation_claimed_at
              < clock_timestamp()
                - INTERVAL '2 minutes'
      );

    v_claimed := FOUND;

    RETURN v_claimed;
END;
$$;

-- ==================================================
-- 6. Release a claim owned by this request
-- ==================================================
--
-- Used after a definitive provider rejection.
--
-- A request cannot release a claim belonging
-- to a different request.

CREATE OR REPLACE FUNCTION
public.release_lead_confirmation(
    p_lead_id UUID,
    p_claim_token UUID
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
    v_released BOOLEAN;
BEGIN
    IF p_lead_id IS NULL
       OR p_claim_token IS NULL THEN
        RETURN FALSE;
    END IF;

    UPDATE public.leads
    SET
        confirmation_claim_token = NULL,
        confirmation_claimed_at = NULL

    WHERE id = p_lead_id

      AND confirmation_claim_token =
          p_claim_token

      AND confirmation_status = 'pending';

    v_released := FOUND;

    RETURN v_released;
END;
$$;

-- ==================================================
-- 7. Atomically record an accepted confirmation
-- ==================================================
--
-- Only the owner of the current claim may
-- complete the delivery attempt.
--
-- This operation records Resend's accepted
-- email identifier and clears the claim
-- in the same database transaction.

CREATE OR REPLACE FUNCTION
public.accept_lead_confirmation(
    p_lead_id UUID,
    p_claim_token UUID,
    p_email_id TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
    v_accepted BOOLEAN;
BEGIN
    IF p_lead_id IS NULL
       OR p_claim_token IS NULL
       OR NULLIF(BTRIM(p_email_id), '') IS NULL
    THEN
        RETURN FALSE;
    END IF;

    UPDATE public.leads
    SET
        confirmation_status = 'accepted',

        confirmation_email_id = p_email_id,

        confirmation_claim_token = NULL,

        confirmation_claimed_at = NULL

    WHERE id = p_lead_id

      AND confirmation_eligible = TRUE

      AND confirmation_status = 'pending'

      AND confirmation_claim_token =
          p_claim_token;

    v_accepted := FOUND;

    RETURN v_accepted;
END;
$$;

-- ==================================================
-- 8. Restrict RPC execution
-- ==================================================
--
-- These functions must be called by the
-- server-side Edge Function using its
-- service-role credentials.
--
-- They must not be directly executable
-- by anonymous website visitors.

REVOKE ALL ON FUNCTION
public.claim_lead_confirmation(UUID, UUID)
FROM PUBLIC;

REVOKE ALL ON FUNCTION
public.claim_lead_confirmation(UUID, UUID)
FROM anon, authenticated;

GRANT EXECUTE ON FUNCTION
public.claim_lead_confirmation(UUID, UUID)
TO service_role;

REVOKE ALL ON FUNCTION
public.release_lead_confirmation(UUID, UUID)
FROM PUBLIC;

REVOKE ALL ON FUNCTION
public.release_lead_confirmation(UUID, UUID)
FROM anon, authenticated;

GRANT EXECUTE ON FUNCTION
public.release_lead_confirmation(UUID, UUID)
TO service_role;

REVOKE ALL ON FUNCTION
public.accept_lead_confirmation(UUID, UUID, TEXT)
FROM PUBLIC;

REVOKE ALL ON FUNCTION
public.accept_lead_confirmation(UUID, UUID, TEXT)
FROM anon, authenticated;

GRANT EXECUTE ON FUNCTION
public.accept_lead_confirmation(UUID, UUID, TEXT)
TO service_role;

COMMIT;
