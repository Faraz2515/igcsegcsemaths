-- Migration: Create messages table
-- Description: Contact form and intro session request messages
-- Tables: messages

CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  level TEXT,
  exam_board TEXT,
  type TEXT DEFAULT 'contact' CHECK (type IN ('contact', 'intro-session')),
  message TEXT NOT NULL,
  phone TEXT,
  preferred_time TEXT,
  is_read BOOLEAN DEFAULT false,
  is_archived BOOLEAN DEFAULT false,
  replied_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

-- Enable Row Level Security
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for messages
-- Anyone can insert messages (contact form is public)
CREATE POLICY "Anyone can insert messages" 
  ON messages FOR INSERT 
  WITH CHECK (true);

-- Only service role can read/manage messages (admin only)
CREATE POLICY "Service role can manage messages" 
  ON messages FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comment
COMMENT ON TABLE messages IS 'Contact form and intro session request messages';
