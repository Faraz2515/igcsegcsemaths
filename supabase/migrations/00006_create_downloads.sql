-- Migration: Create downloads table
-- Description: Track download history for purchased products
-- Tables: downloads

CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_product_id ON downloads(product_id);
CREATE INDEX IF NOT EXISTS idx_downloads_purchase_id ON downloads(purchase_id);
CREATE INDEX IF NOT EXISTS idx_downloads_downloaded_at ON downloads(downloaded_at DESC);

-- Enable Row Level Security
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for downloads
CREATE POLICY "Users can view own downloads" 
  ON downloads FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own downloads" 
  ON downloads FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage downloads" 
  ON downloads FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comment
COMMENT ON TABLE downloads IS 'Download history tracking for purchased products';
