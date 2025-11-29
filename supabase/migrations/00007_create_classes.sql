-- Migration: Create classes table
-- Description: Group tutoring classes with scheduling information
-- Tables: classes

CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  exam_board TEXT CHECK (exam_board IN ('edexcel', 'cambridge', 'aqa', 'ocr')),
  level TEXT CHECK (level IN ('gcse', 'igcse')),
  tier TEXT CHECK (tier IN ('foundation', 'higher', 'core', 'extended')),
  day TEXT,
  time_uk TEXT,
  time_gulf TEXT,
  zoom_link TEXT,
  price_per_student DECIMAL(10,2) DEFAULT 0,
  max_students INTEGER DEFAULT 6,
  current_students INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'full')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
CREATE INDEX IF NOT EXISTS idx_classes_level ON classes(level);
CREATE INDEX IF NOT EXISTS idx_classes_exam_board ON classes(exam_board);

-- Enable Row Level Security
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for classes
CREATE POLICY "Anyone can view active classes" 
  ON classes FOR SELECT 
  USING (status = 'active' OR status = 'full');

CREATE POLICY "Service role can manage classes" 
  ON classes FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Create updated_at trigger
DROP TRIGGER IF EXISTS update_classes_updated_at ON classes;
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Add comment
COMMENT ON TABLE classes IS 'Group tutoring classes with scheduling information';
