/*
  # Create leads table for parent inquiries

  1. New Tables
    - `leads`
      - `id` (uuid, primary key)
      - `parent_name` (text, required)
      - `phone` (text, optional)
      - `email` (text, required)
      - `child_age_grade` (text, optional)
      - `main_concern` (text, optional)
      - `interested_service` (text, optional)
      - `message` (text, optional)
      - `source` (text) - tracks where lead came from (contact_page, summer_questionnaire, etc.)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `leads` table
    - Add INSERT policy for anonymous users (public form submissions)
    - Add SELECT policy restricted to service_role only (no public reads)

  3. Notes
    - This table captures parent lead information from website forms
    - Leads are inserted by anonymous visitors via the public form
    - Only backend/admin can read leads (no public SELECT access)
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_name text NOT NULL,
  phone text DEFAULT '',
  email text NOT NULL,
  child_age_grade text DEFAULT '',
  main_concern text DEFAULT '',
  interested_service text DEFAULT '',
  message text DEFAULT '',
  source text DEFAULT 'website',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);
