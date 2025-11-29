# IGCSE GCSE Maths

A full-stack GCSE & IGCSE Maths tutoring platform built with Next.js 14, Supabase, and LemonSqueezy.

## Features

- **Marketing Pages**: Home, Tutoring (GCSE/IGCSE), Past Papers, Predicted Papers, Worksheets, Group Classes, Free Resources, About, Contact
- **Digital Product Store**: Product listings with filters by exam board, level, tier, and year
- **Student Dashboard**: View purchases, downloads, enrolled classes, and profile management
- **Admin Panel**: Manage products, classes, testimonials, messages, and enrollments
- **Authentication**: Supabase Auth with role-based access (student, parent, admin)
- **Payments**: LemonSqueezy for digital products, manual payment confirmation for group classes

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: Supabase (Postgres DB, Auth, Row Level Security)
- **Payments**: LemonSqueezy (digital products), Payoneer/Wise (manual for classes)
- **Email**: Resend
- **File Storage**: Cloudinary
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account (free tier works)
- A LemonSqueezy account (for payments)
- A Resend account (for emails)
- A Cloudinary account (for file storage)

### 1. Clone the Repository

```bash
git clone https://github.com/Faraz2515/igcsegcsemaths.git
cd igcsegcsemaths
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project" and fill in the details:
   - **Name**: igcsegcsemaths (or your preferred name)
   - **Database Password**: Generate a strong password and save it
   - **Region**: Choose the closest to your users
3. Wait for the project to be created (takes about 2 minutes)

### 4. Set Up the Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Run the following SQL to create the required tables:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'parent', 'admin')),
  country TEXT,
  timezone TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  short_description TEXT,
  category_id UUID REFERENCES categories(id),
  exam_board TEXT CHECK (exam_board IN ('edexcel', 'cambridge', 'aqa', 'ocr')),
  level TEXT CHECK (level IN ('gcse', 'igcse')),
  tier TEXT CHECK (tier IN ('foundation', 'higher', 'core', 'extended')),
  year TEXT,
  price DECIMAL(10,2) NOT NULL,
  lemonsqueezy_id TEXT,
  file_url TEXT,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  ls_order_id TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'GBP',
  status TEXT DEFAULT 'paid' CHECK (status IN ('paid', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Purchases table
CREATE TABLE purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Downloads table (optional tracking)
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_id UUID REFERENCES purchases(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  downloaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Classes table
CREATE TABLE classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  exam_board TEXT,
  level TEXT,
  tier TEXT,
  day TEXT,
  time_uk TEXT,
  time_gulf TEXT,
  zoom_link TEXT,
  price_per_student DECIMAL(10,2),
  max_students INTEGER DEFAULT 6,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Class enrollments table
CREATE TABLE class_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_method TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'confirmed', 'cancelled')),
  enrolled_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table (contact form & intro sessions)
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  level TEXT,
  exam_board TEXT,
  type TEXT DEFAULT 'contact' CHECK (type IN ('contact', 'intro-session')),
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  country TEXT,
  quote TEXT NOT NULL,
  result TEXT,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for public read access
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Anyone can view active classes" ON classes FOR SELECT USING (status = 'active');
CREATE POLICY "Anyone can view active testimonials" ON testimonials FOR SELECT USING (is_active = true);

-- RLS Policies for authenticated users
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own purchases" ON purchases FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own downloads" ON downloads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own enrollments" ON class_enrollments FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own enrollments" ON class_enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for messages (anyone can insert)
CREATE POLICY "Anyone can insert messages" ON messages FOR INSERT WITH CHECK (true);
```

3. **Create an admin user**:
   - Go to **Authentication** > **Users** in Supabase
   - Click "Add user" and create your admin account
   - Then in **SQL Editor**, run:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
   ```

### 5. Get Your Supabase API Keys

1. In Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key -> `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
   - **JWT Secret** (under JWT Settings) -> `SUPABASE_JWT_SECRET`

### 6. Set Up Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Fill in your values in `.env.local`:

| Variable | Where to get it |
|----------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase > Settings > API > Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase > Settings > API > anon public |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API > service_role |
| `SUPABASE_JWT_SECRET` | Supabase > Settings > API > JWT Settings |
| `LEMONSQUEEZY_API_KEY` | [LemonSqueezy API Keys](https://app.lemonsqueezy.com/settings/api) |
| `LEMONSQUEEZY_STORE_ID` | LemonSqueezy > Settings > Stores |
| `LEMONSQUEEZY_WEBHOOK_SECRET` | LemonSqueezy > Settings > Webhooks |
| `RESEND_API_KEY` | [Resend API Keys](https://resend.com/api-keys) |
| `ADMIN_EMAIL` | Your admin email for notifications |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary Console |
| `CLOUDINARY_API_SECRET` | Cloudinary Console |

### 7. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 8. Set Up LemonSqueezy Webhooks (for Production)

1. Go to [LemonSqueezy Webhooks](https://app.lemonsqueezy.com/settings/webhooks)
2. Add a new webhook:
   - **URL**: `https://your-domain.com/api/webhooks/lemonsqueezy`
   - **Events**: `order_created`, `order_refunded`
3. Copy the signing secret to `LEMONSQUEEZY_WEBHOOK_SECRET`

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login, Signup pages
│   ├── (marketing)/      # Public marketing pages
│   ├── admin/            # Admin panel pages
│   ├── api/              # API routes
│   └── dashboard/        # Student dashboard pages
├── components/
│   ├── admin/            # Admin components
│   ├── classes/          # Class-related components
│   ├── contact/          # Contact form components
│   ├── dashboard/        # Dashboard components
│   ├── home/             # Home page sections
│   ├── layout/           # Header, Footer, etc.
│   ├── products/         # Product components
│   ├── tutoring/         # Tutoring page components
│   └── ui/               # Shadcn UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and Supabase clients
├── middleware.ts         # Auth middleware
└── types/                # TypeScript types
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add all environment variables from `.env.local`
4. Deploy!

### Environment Variables for Production

Make sure to update these for production:
- `NEXT_PUBLIC_APP_URL` -> Your production URL
- `WEBHOOK_BASE_URL` -> Your production URL

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Shadcn UI](https://ui.shadcn.com)
- [LemonSqueezy Documentation](https://docs.lemonsqueezy.com)
- [Resend Documentation](https://resend.com/docs)

## License

This project is private and proprietary.
