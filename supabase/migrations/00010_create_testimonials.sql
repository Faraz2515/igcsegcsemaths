-- Migration: Create testimonials table
-- Description: Student testimonials and reviews
-- Tables: testimonials

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT,
  quote TEXT NOT NULL,
  result TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  exam_board TEXT,
  level TEXT,
  year TEXT,
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);

-- Enable Row Level Security
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for testimonials
CREATE POLICY "Anyone can view active testimonials" 
  ON testimonials FOR SELECT 
  USING (is_active = true);

CREATE POLICY "Service role can manage testimonials" 
  ON testimonials FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Add comment
COMMENT ON TABLE testimonials IS 'Student testimonials and reviews';

-- Insert sample testimonials (optional - can be removed)
INSERT INTO testimonials (name, country, quote, result, rating, level, display_order) VALUES
  ('Sarah M.', 'United Kingdom', 'Mr. Hassan helped me go from a grade 4 to a grade 8 in just 6 months. His teaching style is clear and he makes complex topics easy to understand.', 'Grade 4 to Grade 8', 5, 'gcse', 1),
  ('Ahmed K.', 'UAE', 'The predicted papers were incredibly accurate. I felt so prepared for my IGCSE exams. Highly recommend!', 'A* in IGCSE Maths', 5, 'igcse', 2),
  ('Emma T.', 'Qatar', 'The group classes are fantastic value. Small class sizes mean you get plenty of attention, and the other students help motivate you.', 'Grade 9', 5, 'gcse', 3)
ON CONFLICT DO NOTHING;
