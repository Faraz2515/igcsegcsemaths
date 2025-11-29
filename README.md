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

The database schema is provided as SQL migration files in the `supabase/migrations/` directory. You have two options:

#### Option A: Run the Full Schema (Recommended for New Projects)

1. In your Supabase dashboard, go to **SQL Editor**
2. Open the file `supabase/migrations/00000_full_schema.sql` from this repository
3. Copy the entire contents and paste it into the SQL Editor
4. Click **Run** to execute

This creates all 11 tables with indexes, RLS policies, triggers, and sample data in one go.

#### Option B: Run Individual Migrations (For Granular Control)

Run each migration file in order (00001 through 00011) in the SQL Editor:

| File | Description |
|------|-------------|
| `00001_create_profiles.sql` | User profiles with auto-creation trigger |
| `00002_create_categories.sql` | Product categories with defaults |
| `00003_create_products.sql` | Digital products table |
| `00004_create_orders.sql` | LemonSqueezy orders |
| `00005_create_purchases.sql` | Individual product purchases |
| `00006_create_downloads.sql` | Download tracking |
| `00007_create_classes.sql` | Group tutoring classes |
| `00008_create_class_enrollments.sql` | Class enrollment with auto-count |
| `00009_create_messages.sql` | Contact form messages |
| `00010_create_testimonials.sql` | Student testimonials |
| `00011_create_admin_policies.sql` | Admin RLS policies |

#### Database Schema Overview

The schema includes 11 tables:

- **profiles** - User profiles extending Supabase auth (role: student/parent/admin)
- **categories** - Product categories (Past Papers, Predicted Papers, Worksheets, Revision Packs)
- **products** - Digital products with exam board, level, tier, year filters
- **orders** - LemonSqueezy payment orders
- **purchases** - Individual product purchases linked to orders
- **downloads** - Download history tracking
- **classes** - Group tutoring classes with scheduling
- **class_enrollments** - Student enrollments with payment status
- **messages** - Contact form and intro session requests
- **testimonials** - Student reviews and results

All tables have Row Level Security (RLS) enabled with appropriate policies for public access, authenticated users, and admin management.

### 5. Create an Admin User

1. Go to **Authentication** > **Users** in Supabase
2. Click "Add user" and create your admin account
3. Copy the user's UUID from the Users table
4. In **SQL Editor**, run:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = 'YOUR_USER_ID';
   ```
   Replace `YOUR_USER_ID` with the UUID you copied.

### 6. Get Your Supabase API Keys

1. In Supabase dashboard, go to **Settings** > **API**
2. Copy the following values:
   - **Project URL** -> `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key -> `SUPABASE_SERVICE_ROLE_KEY` (keep this secret!)
   - **JWT Secret** (under JWT Settings) -> `SUPABASE_JWT_SECRET`

### 7. Set Up Environment Variables

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

### 8. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 9. Set Up LemonSqueezy Webhooks (for Production)

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
