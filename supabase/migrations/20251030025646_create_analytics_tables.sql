/*
  # Create Analytics Tables for Freedom Leg Landing Pages

  ## New Tables
  
  ### `page_visits`
  - `id` (uuid, primary key) - Unique identifier for each visit
  - `variant` (text) - Which page variant: 'modal' or 'inline'
  - `session_id` (text) - Anonymous session identifier
  - `user_agent` (text) - Browser user agent string
  - `referrer` (text) - Referring page URL
  - `created_at` (timestamptz) - Visit timestamp
  
  ### `user_interactions`
  - `id` (uuid, primary key) - Unique identifier for each interaction
  - `session_id` (text) - Links to page visit session
  - `variant` (text) - Which page variant: 'modal' or 'inline'
  - `action_type` (text) - Type of action: 'button_click', 'modal_open', 'modal_close', 'form_submit', 'scroll_depth'
  - `action_target` (text) - Specific element that was interacted with
  - `action_value` (text) - Additional data (e.g., scroll percentage, form field)
  - `created_at` (timestamptz) - Interaction timestamp
  
  ### `conversions`
  - `id` (uuid, primary key) - Unique identifier for each conversion
  - `session_id` (text) - Links to page visit session
  - `variant` (text) - Which page variant: 'modal' or 'inline'
  - `conversion_type` (text) - Type: 'add_to_cart', 'quiz_complete', 'video_watch', 'measurement_complete'
  - `conversion_value` (jsonb) - Additional conversion data
  - `created_at` (timestamptz) - Conversion timestamp

  ## Security
  - Enable RLS on all tables
  - Add policies for anonymous write access (analytics tracking)
  - Add policies for authenticated read access (viewing analytics)

  ## Notes
  - All tables use anonymous session tracking (no PII)
  - Data can be aggregated to compare modal vs inline performance
  - JSONB fields allow flexible tracking of additional metadata
*/

-- Create page_visits table
CREATE TABLE IF NOT EXISTS page_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant text NOT NULL CHECK (variant IN ('modal', 'inline')),
  session_id text NOT NULL,
  user_agent text,
  referrer text,
  created_at timestamptz DEFAULT now()
);

-- Create user_interactions table
CREATE TABLE IF NOT EXISTS user_interactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  variant text NOT NULL CHECK (variant IN ('modal', 'inline')),
  action_type text NOT NULL,
  action_target text,
  action_value text,
  created_at timestamptz DEFAULT now()
);

-- Create conversions table
CREATE TABLE IF NOT EXISTS conversions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  variant text NOT NULL CHECK (variant IN ('modal', 'inline')),
  conversion_type text NOT NULL,
  conversion_value jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE page_visits ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert analytics data
CREATE POLICY "Anyone can track page visits"
  ON page_visits
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can track interactions"
  ON user_interactions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can track conversions"
  ON conversions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow authenticated users to read analytics (for dashboard)
CREATE POLICY "Authenticated users can view visits"
  ON page_visits
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view interactions"
  ON user_interactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view conversions"
  ON conversions
  FOR SELECT
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_page_visits_session ON page_visits(session_id);
CREATE INDEX IF NOT EXISTS idx_page_visits_variant ON page_visits(variant);
CREATE INDEX IF NOT EXISTS idx_page_visits_created ON page_visits(created_at);

CREATE INDEX IF NOT EXISTS idx_interactions_session ON user_interactions(session_id);
CREATE INDEX IF NOT EXISTS idx_interactions_variant ON user_interactions(variant);
CREATE INDEX IF NOT EXISTS idx_interactions_type ON user_interactions(action_type);
CREATE INDEX IF NOT EXISTS idx_interactions_created ON user_interactions(created_at);

CREATE INDEX IF NOT EXISTS idx_conversions_session ON conversions(session_id);
CREATE INDEX IF NOT EXISTS idx_conversions_variant ON conversions(variant);
CREATE INDEX IF NOT EXISTS idx_conversions_type ON conversions(conversion_type);
CREATE INDEX IF NOT EXISTS idx_conversions_created ON conversions(created_at);