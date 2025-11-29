-- Migration: Create products table
-- Description: Digital products (past papers, predicted papers, worksheets, etc.)
-- Tables: products

CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  exam_board TEXT CHECK (exam_board IN ('edexcel', 'cambridge', 'aqa', 'ocr')),
  level TEXT CHECK (level IN ('gcse', 'igcse')),
  tier TEXT CHECK (tier IN ('foundation', 'higher', 'core', 'extended')),
  year TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  lemonsqueezy_id TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for common queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_exam_board ON products(exam_board);
CREATE INDEX IF NOT EXISTS idx_products_level ON products(level);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- RLS Policies for products
CREATE POLICY "Anyone can view active products" 
  ON products FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Service role can manage products" 
  ON products FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comment
COMMENT ON TABLE products IS 'Digital products available for purchase';
