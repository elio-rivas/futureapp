
-- Future Foundations Education
-- Automatic acknowledgment emails
--
-- Adds independent tracking for the confirmation
-- email sent to each parent or guardian.
--
-- Existing institutional notification fields
-- remain unchanged.

BEGIN;

-- 1. Confirmation delivery status

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS confirmation_status
TEXT NOT NULL DEFAULT 'pending';

-- 2. Resend confirmation email identifier

ALTER TABLE public.leads
ADD COLUMN IF NOT EXISTS confirmation_email_id
TEXT;

-- 3. Ensure existing records have a valid status

UPDATE public.leads
SET confirmation_status = 'pending'
WHERE confirmation_status IS NULL;

-- 4. Restrict status to supported values

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'leads_confirmation_status_check'
          AND conrelid = 'public.leads'::regclass
    ) THEN
        ALTER TABLE public.leads
        ADD CONSTRAINT leads_confirmation_status_check
        CHECK (
            confirmation_status IN (
                'pending',
                'accepted'
            )
        );
    END IF;
END
$$;

COMMIT;
