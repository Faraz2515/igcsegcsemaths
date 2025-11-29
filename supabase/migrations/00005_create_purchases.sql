-- Migration: Create purchases table
-- Description: Individual product purchases linked to orders
-- Tables: purchases

CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_order_id ON purchases(order_id);

-- Unique constraint to prevent duplicate purchases
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_user_product 
  ON purchases(user_id, product_id);

-- Enable Row Level Security
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

-- RLS Policies for purchases
CREATE POLICY "Users can view own purchases" 
  ON purchases FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage purchases" 
  ON purchases FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comment
COMMENT ON TABLE purchases IS 'Individual product purchases linked to orders';
