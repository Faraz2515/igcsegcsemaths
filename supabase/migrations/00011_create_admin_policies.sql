-- Migration: Create admin-specific RLS policies
-- Description: Additional policies for admin users to manage all data
-- This migration adds policies that allow admin users (role = 'admin' in profiles) to manage data

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

-- Admin policies for profiles (view all profiles)
CREATE POLICY "Admins can view all profiles" 
  ON profiles FOR SELECT 
  USING (is_admin());

CREATE POLICY "Admins can update all profiles" 
  ON profiles FOR UPDATE 
  USING (is_admin());

-- Admin policies for products (full CRUD)
CREATE POLICY "Admins can manage products" 
  ON products FOR ALL 
  USING (is_admin());

-- Admin policies for categories (full CRUD)
CREATE POLICY "Admins can manage categories" 
  ON categories FOR ALL 
  USING (is_admin());

-- Admin policies for orders (view all)
CREATE POLICY "Admins can view all orders" 
  ON orders FOR SELECT 
  USING (is_admin());

CREATE POLICY "Admins can update orders" 
  ON orders FOR UPDATE 
  USING (is_admin());

-- Admin policies for purchases (view all)
CREATE POLICY "Admins can view all purchases" 
  ON purchases FOR SELECT 
  USING (is_admin());

-- Admin policies for downloads (view all)
CREATE POLICY "Admins can view all downloads" 
  ON downloads FOR SELECT 
  USING (is_admin());

-- Admin policies for classes (full CRUD)
CREATE POLICY "Admins can manage classes" 
  ON classes FOR ALL 
  USING (is_admin());

-- Admin policies for class_enrollments (full CRUD)
CREATE POLICY "Admins can manage enrollments" 
  ON class_enrollments FOR ALL 
  USING (is_admin());

-- Admin policies for messages (full CRUD)
CREATE POLICY "Admins can manage messages" 
  ON messages FOR ALL 
  USING (is_admin());

-- Admin policies for testimonials (full CRUD)
CREATE POLICY "Admins can manage testimonials" 
  ON testimonials FOR ALL 
  USING (is_admin());

-- Add comment
COMMENT ON FUNCTION is_admin() IS 'Helper function to check if current user has admin role';
