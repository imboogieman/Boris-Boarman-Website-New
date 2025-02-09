/*
  # Create subscribers table

  1. New Tables
    - `subscribers`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `twitter_handle` (text, nullable)
      - `created_at` (timestamp)
  2. Security
    - Enable RLS on `subscribers` table
    - Add policy for inserting new subscribers
*/

CREATE TABLE IF NOT EXISTS subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  twitter_handle text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for all users"
  ON subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);