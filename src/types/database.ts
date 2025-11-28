export type UserRole = 'student' | 'parent' | 'admin'
export type PaymentStatus = 'pending' | 'confirmed' | 'cancelled'
export type OrderStatus = 'paid' | 'refunded'
export type MessageType = 'contact' | 'intro-session'
export type ClassStatus = 'active' | 'inactive'

export interface User {
  id: string
  email: string
  created_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  role: UserRole
  country: string | null
  timezone: string | null
  phone: string | null
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Product {
  id: string
  title: string
  slug: string
  description: string | null
  short_description: string | null
  category_id: string | null
  exam_board: string | null
  level: string | null
  tier: string | null
  year: string | null
  price: number
  lemonsqueezy_id: string | null
  file_url: string | null
  thumbnail_url: string | null
  is_active: boolean
  created_at: string
  category?: Category
}

export interface Order {
  id: string
  user_id: string
  ls_order_id: string | null
  total_amount: number
  currency: string
  status: OrderStatus
  created_at: string
}

export interface Purchase {
  id: string
  user_id: string
  product_id: string
  order_id: string | null
  created_at: string
  product?: Product
}

export interface Download {
  id: string
  purchase_id: string
  user_id: string
  product_id: string
  downloaded_at: string
}

export interface Class {
  id: string
  title: string
  description: string | null
  exam_board: string | null
  level: string | null
  tier: string | null
  day: string | null
  time_uk: string | null
  time_gulf: string | null
  zoom_link: string | null
  price_per_student: number
  max_students: number
  status: ClassStatus
  created_at: string
  enrollment_count?: number
}

export interface ClassEnrollment {
  id: string
  class_id: string
  user_id: string
  payment_method: string | null
  payment_status: PaymentStatus
  enrolled_at: string
  class?: Class
  profile?: Profile
}

export interface Message {
  id: string
  name: string
  email: string
  country: string | null
  level: string | null
  exam_board: string | null
  type: MessageType
  message: string | null
  is_read: boolean
  created_at: string
}

export interface Testimonial {
  id: string
  name: string
  country: string | null
  quote: string
  result: string | null
  rating: number
  is_active: boolean
  created_at: string
}

// Database schema type for Supabase
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<User, 'id'>>
      }
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at'> & { created_at?: string }
        Update: Partial<Omit<Profile, 'id'>>
      }
      categories: {
        Row: Category
        Insert: Omit<Category, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Category, 'id'>>
      }
      products: {
        Row: Product
        Insert: Omit<Product, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Product, 'id'>>
      }
      orders: {
        Row: Order
        Insert: Omit<Order, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Order, 'id'>>
      }
      purchases: {
        Row: Purchase
        Insert: Omit<Purchase, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Purchase, 'id'>>
      }
      downloads: {
        Row: Download
        Insert: Omit<Download, 'id' | 'downloaded_at'> & { id?: string; downloaded_at?: string }
        Update: Partial<Omit<Download, 'id'>>
      }
      classes: {
        Row: Class
        Insert: Omit<Class, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Class, 'id'>>
      }
      class_enrollments: {
        Row: ClassEnrollment
        Insert: Omit<ClassEnrollment, 'id' | 'enrolled_at'> & { id?: string; enrolled_at?: string }
        Update: Partial<Omit<ClassEnrollment, 'id'>>
      }
      messages: {
        Row: Message
        Insert: Omit<Message, 'id' | 'created_at' | 'is_read'> & { id?: string; created_at?: string; is_read?: boolean }
        Update: Partial<Omit<Message, 'id'>>
      }
      testimonials: {
        Row: Testimonial
        Insert: Omit<Testimonial, 'id' | 'created_at'> & { id?: string; created_at?: string }
        Update: Partial<Omit<Testimonial, 'id'>>
      }
    }
  }
}
