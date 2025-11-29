-- Migration: Create categories table
-- Description: Product categories for organizing digital products
-- Tables: categories

CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read access)
CREATE POLICY "Anyone can view categories" 
  ON categories FOR SELECT 
  USING (true);

-- Admin policies (using service role for admin operations)
CREATE POLICY "Service role can manage categories" 
  ON categories FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comment
COMMENT ON TABLE categories IS 'Product categories for digital products';

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Past Papers', 'past-papers', 'Solved past examination papers'),
  ('Predicted Papers', 'predicted-papers', 'Predicted examination papers based on exam trends'),
  ('Worksheets', 'worksheets', 'Practice worksheets for specific topics'),
  ('Revision Packs', 'revision-packs', 'Comprehensive revision materials')
ON CONFLICT (slug) DO NOTHING;
