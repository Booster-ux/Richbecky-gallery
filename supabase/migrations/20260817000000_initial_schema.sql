-- Richbecky Gallery — Initial Production Database Migration & RLS Security Schema
-- Target DB Engine: PostgreSQL (Supabase)

-- 1. EXTENSIONS & ENUMS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'system_user_role') THEN
    CREATE TYPE system_user_role AS ENUM ('customer', 'artist', 'admin');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_status') THEN
    CREATE TYPE user_status AS ENUM ('active', 'pending', 'suspended');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'artist_status_type') THEN
    CREATE TYPE artist_status_type AS ENUM ('Active', 'Pending Verification', 'Suspended', 'Rejected');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'application_status_type') THEN
    CREATE TYPE application_status_type AS ENUM ('Pending', 'Approved', 'Rejected');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'artwork_availability_type') THEN
    CREATE TYPE artwork_availability_type AS ENUM ('Available', 'Sold', 'Reserved', 'Not for sale');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'artwork_status_type') THEN
    CREATE TYPE artwork_status_type AS ENUM ('Draft', 'Pending Admin Approval', 'Approved', 'Rejected', 'Published', 'Sold');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'artwork_category_type') THEN
    CREATE TYPE artwork_category_type AS ENUM ('Original Artwork', 'Fine Art Print');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'edition_type_enum') THEN
    CREATE TYPE edition_type_enum AS ENUM ('Open Edition', 'Limited Edition');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'image_type_enum') THEN
    CREATE TYPE image_type_enum AS ENUM ('primary', 'gallery', 'detail', 'certificate');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'inventory_status_enum') THEN
    CREATE TYPE inventory_status_enum AS ENUM ('in_stock', 'low_stock', 'out_of_stock', 'reserved');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'order_status_enum') THEN
    CREATE TYPE order_status_enum AS ENUM ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled', 'Refunded');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'payment_status_enum') THEN
    CREATE TYPE payment_status_enum AS ENUM ('Pending', 'Paid', 'Failed', 'Refunded');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'notification_type_enum') THEN
    CREATE TYPE notification_type_enum AS ENUM ('order', 'submission', 'enquiry', 'payout', 'artist', 'system');
  END IF;
END $$;

-- 2. USERS TABLE (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  role system_user_role NOT NULL DEFAULT 'customer',
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  profile_image TEXT,
  status user_status NOT NULL DEFAULT 'active',
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  account_number TEXT UNIQUE NOT NULL,
  vip_status TEXT NOT NULL DEFAULT 'Standard',
  total_spend NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  order_count INT NOT NULL DEFAULT 0,
  wishlist_count INT NOT NULL DEFAULT 0,
  preferred_currency TEXT NOT NULL DEFAULT 'USD',
  status user_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. CUSTOMER ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.customer_addresses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  label TEXT NOT NULL DEFAULT 'Home',
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line TEXT NOT NULL,
  city TEXT NOT NULL,
  state_region TEXT,
  country TEXT NOT NULL,
  postal_zip TEXT NOT NULL,
  address_type TEXT NOT NULL DEFAULT 'shipping',
  is_default BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. ARTISTS TABLE
CREATE TABLE IF NOT EXISTS public.artists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  biography TEXT NOT NULL,
  artist_statement TEXT DEFAULT '',
  profile_image TEXT DEFAULT '',
  cover_image TEXT,
  country TEXT NOT NULL,
  contact_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  social_links JSONB NOT NULL DEFAULT '{}'::jsonb,
  website TEXT,
  exhibitions_count INT NOT NULL DEFAULT 0,
  artworks_count INT NOT NULL DEFAULT 0,
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 30.00,
  status artist_status_type NOT NULL DEFAULT 'Active',
  approval_status application_status_type NOT NULL DEFAULT 'Approved',
  registration_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  approved_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. ARTIST APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.artist_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  country TEXT NOT NULL,
  city TEXT NOT NULL,
  website TEXT,
  instagram TEXT,
  artist_name TEXT NOT NULL,
  bio TEXT NOT NULL,
  artist_statement TEXT,
  practice_areas TEXT,
  mediums TEXT NOT NULL,
  years_active INT NOT NULL,
  exhibitions TEXT,
  awards TEXT,
  collections TEXT,
  gallery_experience TEXT,
  portfolio_images TEXT[] NOT NULL DEFAULT '{}',
  agreed_to_terms BOOLEAN NOT NULL DEFAULT FALSE,
  status application_status_type NOT NULL DEFAULT 'Pending',
  rejection_reason TEXT,
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewer_id UUID REFERENCES public.users(id),
  admin_notes TEXT
);

-- 7. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  artwork_count INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. ARTWORKS TABLE
CREATE TABLE IF NOT EXISTS public.artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE RESTRICT,
  artist_name_snapshot TEXT NOT NULL,
  description TEXT NOT NULL,
  artwork_story TEXT,
  artist_statement TEXT,
  artwork_type artwork_category_type NOT NULL DEFAULT 'Original Artwork',
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE RESTRICT,
  category_name_snapshot TEXT NOT NULL,
  medium TEXT NOT NULL,
  materials TEXT,
  dimensions_formatted TEXT NOT NULL,
  dimensions_parsed JSONB,
  year_created INT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  original_currency TEXT NOT NULL DEFAULT 'USD',
  availability artwork_availability_type NOT NULL DEFAULT 'Available',
  quantity INT NOT NULL DEFAULT 1,
  status artwork_status_type NOT NULL DEFAULT 'Pending Admin Approval',
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  is_new_arrival BOOLEAN NOT NULL DEFAULT TRUE,
  certificate_included BOOLEAN NOT NULL DEFAULT TRUE,
  certificate_number TEXT,
  certificate_details TEXT,
  edition_info TEXT,
  edition_number TEXT,
  edition_total TEXT,
  edition_type edition_type_enum,
  signature_info TEXT,
  framing_info TEXT,
  fine_art_print_available BOOLEAN DEFAULT FALSE,
  fine_art_print_details TEXT,
  shipping_info_notes TEXT,
  shipping_details TEXT,
  shipping_prep_time TEXT,
  special_handling TEXT,
  slug TEXT UNIQUE NOT NULL,
  primary_image_url TEXT NOT NULL,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- 9. ARTWORK IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.artwork_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  image_type image_type_enum NOT NULL DEFAULT 'gallery',
  display_order INT NOT NULL DEFAULT 0,
  is_primary BOOLEAN NOT NULL DEFAULT FALSE,
  alt_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. INVENTORY TABLE
CREATE TABLE IF NOT EXISTS public.inventory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id UUID UNIQUE NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  quantity INT NOT NULL DEFAULT 1,
  reserved_quantity INT NOT NULL DEFAULT 0,
  available_quantity INT GENERATED ALWAYS AS (quantity - reserved_quantity) STORED,
  status inventory_status_enum NOT NULL DEFAULT 'in_stock',
  last_updated TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE RESTRICT,
  order_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status order_status_enum NOT NULL DEFAULT 'Pending',
  payment_status payment_status_enum NOT NULL DEFAULT 'Pending',
  display_currency TEXT NOT NULL DEFAULT 'USD',
  subtotal NUMERIC(12,2) NOT NULL,
  shipping_fee NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total NUMERIC(12,2) NOT NULL,
  shipping_address JSONB NOT NULL,
  billing_address JSONB,
  payment_method TEXT NOT NULL DEFAULT 'Card',
  tracking_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE RESTRICT,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE RESTRICT,
  artwork_title_snapshot TEXT NOT NULL,
  artwork_type_snapshot artwork_category_type NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  original_listing_price NUMERIC(12,2) NOT NULL,
  original_listing_currency TEXT NOT NULL,
  applicable_displayed_price NUMERIC(12,2) NOT NULL,
  display_currency TEXT NOT NULL,
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 30.00,
  artist_share_amount NUMERIC(12,2) NOT NULL,
  gallery_share_amount NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. WISHLISTS TABLE
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  artwork_id UUID NOT NULL REFERENCES public.artworks(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(customer_id, artwork_id)
);

-- 14. COMMISSIONS TABLE
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  order_item_id UUID NOT NULL REFERENCES public.order_items(id) ON DELETE CASCADE,
  artist_id UUID NOT NULL REFERENCES public.artists(id) ON DELETE RESTRICT,
  sale_amount NUMERIC(12,2) NOT NULL,
  currency TEXT NOT NULL,
  commission_percentage NUMERIC(5,2) NOT NULL DEFAULT 30.00,
  artist_share NUMERIC(12,2) NOT NULL,
  gallery_share NUMERIC(12,2) NOT NULL,
  commission_status TEXT NOT NULL DEFAULT 'pending',
  payout_status TEXT NOT NULL DEFAULT 'unpaid',
  payout_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 15. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  recipient_role system_user_role NOT NULL,
  type notification_type_enum NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 16. AUDIT RECORDS TABLE
CREATE TABLE IF NOT EXISTS public.audit_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  actor_email TEXT NOT NULL,
  actor_role system_user_role NOT NULL,
  action TEXT NOT NULL,
  affected_entity TEXT NOT NULL,
  affected_entity_id TEXT NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. AUTH TRIGGER FOR AUTO USER PROFILE SYNC
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, role, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'first_name', 'Collector'),
    COALESCE(NEW.raw_user_meta_data->>'last_name', 'Patron'),
    COALESCE((NEW.raw_user_meta_data->>'role')::system_user_role, 'customer'),
    'active'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artist_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artwork_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_records ENABLE ROW LEVEL SECURITY;

-- USERS & PROFILES RLS
DROP POLICY IF EXISTS "Public profiles read policy" ON public.users;
CREATE POLICY "Public profiles read policy" ON public.users FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users edit own profile" ON public.users;
CREATE POLICY "Users edit own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

-- ARTWORKS RLS
DROP POLICY IF EXISTS "Public catalogue view" ON public.artworks;
CREATE POLICY "Public catalogue view" ON public.artworks FOR SELECT USING (status IN ('Approved', 'Published', 'Sold'));

DROP POLICY IF EXISTS "Artist view own pending artworks" ON public.artworks;
CREATE POLICY "Artist view own pending artworks" ON public.artworks FOR SELECT USING (
  artist_id IN (SELECT id FROM public.artists WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Artist submit artwork" ON public.artworks;
CREATE POLICY "Artist submit artwork" ON public.artworks FOR INSERT WITH CHECK (
  artist_id IN (SELECT id FROM public.artists WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Admin full artwork management" ON public.artworks;
CREATE POLICY "Admin full artwork management" ON public.artworks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- ARTIST APPLICATIONS RLS
DROP POLICY IF EXISTS "Anyone can submit artist application" ON public.artist_applications;
CREATE POLICY "Anyone can submit artist application" ON public.artist_applications FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Applicant view own application" ON public.artist_applications;
CREATE POLICY "Applicant view own application" ON public.artist_applications FOR SELECT USING (
  email IN (SELECT email FROM public.users WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Admin manage applications" ON public.artist_applications;
CREATE POLICY "Admin manage applications" ON public.artist_applications FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);

-- ORDERS & COMMISSIONS RLS
DROP POLICY IF EXISTS "Customer view own orders" ON public.orders;
CREATE POLICY "Customer view own orders" ON public.orders FOR SELECT USING (
  customer_id IN (SELECT id FROM public.customers WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Artist view own sales commissions" ON public.commissions;
CREATE POLICY "Artist view own sales commissions" ON public.commissions FOR SELECT USING (
  artist_id IN (SELECT id FROM public.artists WHERE user_id = auth.uid())
);

DROP POLICY IF EXISTS "Admin manage orders and commissions" ON public.orders;
CREATE POLICY "Admin manage orders and commissions" ON public.orders FOR ALL USING (
  EXISTS (SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin')
);
