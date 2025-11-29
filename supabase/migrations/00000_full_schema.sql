-- ============================================
-- IGCSE GCSE Maths - Full Database Schema
-- ============================================
-- This file contains the complete database schema for the application.
-- Run this in your Supabase SQL Editor to set up all tables at once.
-- 
-- Alternatively, you can run the individual migration files (00001-00011)
-- in order for a more granular approach.
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'parent', 'admin')),
  country TEXT,
  timezone TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 2. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);

-- Insert default categories
INSERT INTO categories (name, slug, description) VALUES
  ('Past Papers', 'past-papers', 'Solved past examination papers'),
  ('Predicted Papers', 'predicted-papers', 'Predicted examination papers based on exam trends'),
  ('Worksheets', 'worksheets', 'Practice worksheets for specific topics'),
  ('Revision Packs', 'revision-packs', 'Comprehensive revision materials')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- 3. PRODUCTS TABLE
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_exam_board ON products(exam_board);
CREATE INDEX IF NOT EXISTS idx_products_level ON products(level);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);

-- Updated_at trigger function
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

-- ============================================
-- 4. ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ls_order_id TEXT UNIQUE,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'refunded', 'pending')),
  customer_email TEXT,
  customer_name TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_ls_order_id ON orders(ls_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 5. PURCHASES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_product_id ON purchases(product_id);
CREATE INDEX IF NOT EXISTS idx_purchases_order_id ON purchases(order_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_purchases_user_product ON purchases(user_id, product_id);

ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- 6. DOWNLOADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  ip_address TEXT,
  user_agent TEXT,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_downloads_user_id ON downloads(user_id);
CREATE INDEX IF NOT EXISTS idx_downloads_product_id ON downloads(product_id);
CREATE INDEX IF NOT EXISTS idx_downloads_purchase_id ON downloads(purchase_id);
CREATE INDEX IF NOT EXISTS idx_downloads_downloaded_at ON downloads(downloaded_at DESC);

ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own downloads" ON downloads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own downloads" ON downloads FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- 7. CLASSES TABLE
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_classes_status ON classes(status);
CREATE INDEX IF NOT EXISTS idx_classes_level ON classes(level);
CREATE INDEX IF NOT EXISTS idx_classes_exam_board ON classes(exam_board);

ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active classes" ON classes FOR SELECT USING (status = 'active' OR status = 'full');

DROP TRIGGER IF EXISTS update_classes_updated_at ON classes;
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 8. CLASS ENROLLMENTS TABLE
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_class_enrollments_class_id ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_user_id ON class_enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_payment_status ON class_enrollments(payment_status);
CREATE UNIQUE INDEX IF NOT EXISTS idx_class_enrollments_user_class ON class_enrollments(user_id, class_id);

ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own enrollments" ON class_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON class_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

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

-- ============================================
-- 9. MESSAGES TABLE
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_messages_type ON messages(type);
CREATE INDEX IF NOT EXISTS idx_messages_is_read ON messages(is_read);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert messages" ON messages FOR INSERT WITH CHECK (true);

-- ============================================
-- 10. TESTIMONIALS TABLE
-- ============================================
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

CREATE INDEX IF NOT EXISTS idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_display_order ON testimonials(display_order);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- Insert sample testimonials
INSERT INTO testimonials (name, country, quote, result, rating, level, display_order) VALUES
  ('Sarah M.', 'United Kingdom', 'Mr. Hassan helped me go from a grade 4 to a grade 8 in just 6 months. His teaching style is clear and he makes complex topics easy to understand.', 'Grade 4 to Grade 8', 5, 'gcse', 1),
  ('Ahmed K.', 'UAE', 'The predicted papers were incredibly accurate. I felt so prepared for my IGCSE exams. Highly recommend!', 'A* in IGCSE Maths', 5, 'igcse', 2),
  ('Emma T.', 'Qatar', 'The group classes are fantastic value. Small class sizes mean you get plenty of attention, and the other students help motivate you.', 'Grade 9', 5, 'gcse', 3)
ON CONFLICT DO NOTHING;

-- ============================================
-- 11. ADMIN POLICIES
-- ============================================
-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for all tables
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update all profiles" ON profiles FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can manage products" ON products FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage categories" ON categories FOR ALL USING (is_admin());
CREATE POLICY "Admins can view all orders" ON orders FOR SELECT USING (is_admin());
CREATE POLICY "Admins can update orders" ON orders FOR UPDATE USING (is_admin());
CREATE POLICY "Admins can view all purchases" ON purchases FOR SELECT USING (is_admin());
CREATE POLICY "Admins can view all downloads" ON downloads FOR SELECT USING (is_admin());
CREATE POLICY "Admins can manage classes" ON classes FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage enrollments" ON class_enrollments FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage messages" ON messages FOR ALL USING (is_admin());
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL USING (is_admin());

-- ============================================
-- SETUP COMPLETE
-- ============================================
-- Don't forget to:
-- 1. Create your admin user in Authentication > Users
-- 2. Run: UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
