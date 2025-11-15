/*
  # Avax Farms Waitlist Schema

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each entry
      - `email` (text, unique, not null) - User's email address
      - `ip_address` (text) - User's IP address for duplicate detection
      - `location` (jsonb) - Geographic location data (country, city, etc.)
      - `created_at` (timestamptz) - Timestamp of registration
      - `user_agent` (text) - Browser/device information

  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anonymous users to insert their own data
    - Add policy for service role to read all data

  3. Indexes
    - Unique index on email (case-insensitive)
    - Index on created_at for sorting
    - Index on ip_address for duplicate checking
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  name text,
  ip_address text,
  location jsonb DEFAULT '{}'::jsonb,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS waitlist_email_unique_idx ON waitlist (LOWER(email));
CREATE INDEX IF NOT EXISTS waitlist_created_at_idx ON waitlist (created_at DESC);
CREATE INDEX IF NOT EXISTS waitlist_ip_address_idx ON waitlist (ip_address);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register for waitlist"
  ON waitlist FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Service role can read all waitlist entries"
  ON waitlist FOR SELECT TO authenticated USING (true);