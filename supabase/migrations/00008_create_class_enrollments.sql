-- Migration: Create class_enrollments table
-- Description: Student enrollments in group classes
-- Tables: class_enrollments

CREATE TABLE IF NOT EXISTS class_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_method TEXT CHECK (payment_method IN ('payoneer', 'wise', 'bank_transfer')),
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'confirmed', 'cancelled')),
  payment_reference TEXT,
  notes TEXT,
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_class_enrollments_class_id ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_user_id ON class_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_payment_status ON class_enrollments(payment_status);

-- Unique constraint to prevent duplicate enrollments
CREATE UNIQUE INDEX IF NOT EXISTS idx_class_enrollments_user_class 
  ON class_enrollments(user_id, class_id);

-- Enable Row Level Security
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for class_enrollments
CREATE POLICY "Users can view own enrollments" 
  ON class_enrollments FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own enrollments" 
  ON class_enrollments FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role can manage enrollments" 
  ON class_enrollments FOR ALL 
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Function to update class student count
CREATE OR REPLACE FUNCTION update_class_student_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
    UPDATE classes 
    SET current_students = (
      SELECT COUNT(*) FROM class_enrollments 
      WHERE class_id = NEW.class_id AND payment_status = 'confirmed'
    )
    WHERE id = NEW.class_id;
    
    -- Update status to 'full' if max students reached
    UPDATE classes 
    SET status = CASE 
      WHEN current_students >= max_students THEN 'full'
      ELSE 'active'
    END
    WHERE id = NEW.class_id AND status != 'inactive';
  END IF;
  
  IF TG_OP = 'DELETE' THEN
    UPDATE classes 
    SET current_students = (
      SELECT COUNT(*) FROM class_enrollments 
      WHERE class_id = OLD.class_id AND payment_status = 'confirmed'
    )
    WHERE id = OLD.class_id;
    
    UPDATE classes 
    SET status = 'active'
    WHERE id = OLD.class_id AND status = 'full';
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_class_count_on_enrollment ON class_enrollments;
CREATE TRIGGER update_class_count_on_enrollment
  AFTER INSERT OR UPDATE OR DELETE ON class_enrollments
  FOR EACH ROW EXECUTE FUNCTION update_class_student_count();

-- Add comment
COMMENT ON TABLE class_enrollments IS 'Student enrollments in group classes';
