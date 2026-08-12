-- =============================================================================
-- RICHBECKY GALLERY — STAGE 1 RELATIONAL DATABASE SCHEMA (PostgreSQL / Supabase)
-- =============================================================================
-- Complete relational DDL specification with Foreign Keys, Check Constraints,
-- Unique Indexes, Row-Level Security (RLS) Policies & Automatic Timestamps.
-- =============================================================================

-- Enable UUID extension if not present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. USERS TABLE
-- Core identity model for Customers, Artists, and Administrators
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    auth_ref VARCHAR(255),
    role VARCHAR(50) NOT NULL CHECK (role IN ('customer', 'artist', 'admin')),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'pending', 'suspended')),
    profile_image TEXT,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- -----------------------------------------------------------------------------
-- 2. CUSTOMERS TABLE
-- Profile, preferences, and activity metrics for gallery collectors
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    account_number VARCHAR(50) NOT NULL UNIQUE,
    vip_status VARCHAR(50) NOT NULL DEFAULT 'Standard' CHECK (vip_status IN ('Standard', 'Silver', 'Gold', 'VIP Collector')),
    total_spend NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (total_spend >= 0),
    order_count INT NOT NULL DEFAULT 0 CHECK (order_count >= 0),
    wishlist_count INT NOT NULL DEFAULT 0 CHECK (wishlist_count >= 0),
    preferred_currency VARCHAR(10) NOT NULL DEFAULT 'USD' CHECK (preferred_currency IN ('NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AUD')),
    status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_customers_user_id ON customers(user_id);
CREATE INDEX IF NOT EXISTS idx_customers_account_number ON customers(account_number);

-- -----------------------------------------------------------------------------
-- 3. CUSTOMER ADDRESSES TABLE
-- Shipping and billing addresses for customer order fulfillment
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS customer_addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    label VARCHAR(100) NOT NULL DEFAULT 'Home',
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    address_line TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state_region VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_zip VARCHAR(30) NOT NULL,
    address_type VARCHAR(20) NOT NULL DEFAULT 'both' CHECK (address_type IN ('shipping', 'billing', 'both')),
    is_default BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_addresses_customer_id ON customer_addresses(customer_id);

-- -----------------------------------------------------------------------------
-- 4. ARTISTS TABLE
-- Artist profile, biography, verification status, and commission rates
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    biography TEXT NOT NULL,
    artist_statement TEXT NOT NULL,
    profile_image TEXT NOT NULL,
    cover_image TEXT,
    country VARCHAR(100) NOT NULL DEFAULT 'Nigeria',
    contact_info JSONB NOT NULL DEFAULT '{}',
    social_links JSONB NOT NULL DEFAULT '{}',
    website TEXT,
    exhibitions_count INT NOT NULL DEFAULT 0 CHECK (exhibitions_count >= 0),
    artworks_count INT NOT NULL DEFAULT 0 CHECK (artworks_count >= 0),
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 15.00 CHECK (commission_rate >= 0 AND commission_rate <= 100),
    status VARCHAR(50) NOT NULL DEFAULT 'Pending Verification' CHECK (status IN ('Active', 'Pending Verification', 'Suspended', 'Rejected')),
    approval_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (approval_status IN ('Pending', 'Approved', 'Rejected')),
    registration_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    approved_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_artists_user_id ON artists(user_id);
CREATE INDEX IF NOT EXISTS idx_artists_status ON artists(status);

-- -----------------------------------------------------------------------------
-- 5. ARTIST APPLICATIONS TABLE
-- Registration application submissions with admin review workflow
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artist_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL,
    city VARCHAR(100) NOT NULL,
    website TEXT,
    instagram VARCHAR(100),
    artist_name VARCHAR(255) NOT NULL,
    bio TEXT NOT NULL,
    artist_statement TEXT,
    practice_areas TEXT,
    mediums TEXT NOT NULL,
    years_active INT NOT NULL CHECK (years_active >= 0),
    exhibitions TEXT,
    awards TEXT,
    collections TEXT,
    gallery_experience TEXT,
    portfolio_images JSONB NOT NULL DEFAULT '[]',
    agreed_to_terms BOOLEAN NOT NULL DEFAULT true,
    status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Approved', 'Rejected')),
    rejection_reason TEXT,
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMPTZ,
    reviewer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    admin_notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_artist_applications_status ON artist_applications(status);

-- -----------------------------------------------------------------------------
-- 6. CATEGORIES TABLE
-- Curated artwork categories (Figurative, Abstract, Landscape, Sculpture, etc.)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    slug VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    artwork_count INT NOT NULL DEFAULT 0 CHECK (artwork_count >= 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- -----------------------------------------------------------------------------
-- 7. ARTWORKS TABLE
-- Core catalog model for Original Masterpieces and Fine Art Prints
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artworks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE RESTRICT,
    artist_name_snapshot VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    artwork_story TEXT,
    artist_statement TEXT,
    artwork_type VARCHAR(50) NOT NULL CHECK (artwork_type IN ('Original Artwork', 'Fine Art Print', 'Original')),
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    category_name_snapshot VARCHAR(100) NOT NULL,
    medium VARCHAR(255) NOT NULL,
    materials TEXT,
    dimensions_formatted VARCHAR(255) NOT NULL,
    dimensions_parsed JSONB,
    year_created INT NOT NULL CHECK (year_created BETWEEN 1800 AND 2100),
    
    -- Numerical price in artist's original currency
    price NUMERIC(14, 2) NOT NULL CHECK (price >= 0),
    original_currency VARCHAR(10) NOT NULL CHECK (original_currency IN ('NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AUD')),
    
    availability VARCHAR(50) NOT NULL DEFAULT 'Available' CHECK (availability IN ('Available', 'Sold', 'Reserved', 'Not for sale')),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 0),
    
    -- Original Artwork Logic Constraint: Max quantity of 1 for Original Artworks
    CONSTRAINT chk_original_artwork_quantity CHECK (
        (artwork_type IN ('Original Artwork', 'Original') AND quantity <= 1)
        OR (artwork_type = 'Fine Art Print')
    ),
    
    status VARCHAR(50) NOT NULL DEFAULT 'Approved' CHECK (status IN ('Draft', 'Pending Admin Approval', 'Pending Approval', 'Approved', 'Rejected', 'Published', 'Sold', 'Archived')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_new_arrival BOOLEAN NOT NULL DEFAULT false,
    certificate_included BOOLEAN NOT NULL DEFAULT true,
    edition_info VARCHAR(255),
    edition_number VARCHAR(50),
    edition_total VARCHAR(50),
    edition_type VARCHAR(50) CHECK (edition_type IS NULL OR edition_type IN ('Open Edition', 'Limited Edition')),
    signature_info TEXT,
    framing_info TEXT,
    shipping_info_notes TEXT,
    shipping_prep_time VARCHAR(100),
    special_handling TEXT,
    slug VARCHAR(255) NOT NULL UNIQUE,
    primary_image_url TEXT NOT NULL,
    alt_text VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_artworks_artist_id ON artworks(artist_id);
CREATE INDEX IF NOT EXISTS idx_artworks_category_id ON artworks(category_id);
CREATE INDEX IF NOT EXISTS idx_artworks_status ON artworks(status);
CREATE INDEX IF NOT EXISTS idx_artworks_slug ON artworks(slug);
CREATE INDEX IF NOT EXISTS idx_artworks_type ON artworks(artwork_type);

-- -----------------------------------------------------------------------------
-- 8. ARTWORK IMAGES TABLE
-- Multi-image support (Primary, Gallery, Details, Certificates)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS artwork_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    image_type VARCHAR(50) NOT NULL DEFAULT 'gallery' CHECK (image_type IN ('primary', 'gallery', 'detail', 'certificate')),
    display_order INT NOT NULL DEFAULT 0,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    alt_text VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_artwork_images_artwork_id ON artwork_images(artwork_id);

-- -----------------------------------------------------------------------------
-- 9. INVENTORY TABLE
-- Fine-grained stock levels, reservations, and inventory status tracking
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    artwork_id UUID NOT NULL UNIQUE REFERENCES artworks(id) ON DELETE CASCADE,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity >= 0),
    reserved_quantity INT NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
    available_quantity INT GENERATED ALWAYS AS (quantity - reserved_quantity) STORED,
    status VARCHAR(50) NOT NULL DEFAULT 'in_stock' CHECK (status IN ('in_stock', 'low_stock', 'out_of_stock', 'reserved')),
    last_updated TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inventory_artwork_id ON inventory(artwork_id);

-- -----------------------------------------------------------------------------
-- 10. ORDERS TABLE
-- Customer order master table storing display currency total snapshots
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
    order_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL DEFAULT 'Processing' CHECK (status IN ('Pending', 'Processing', 'Paid', 'Shipped', 'Delivered', 'Cancelled', 'Refunded')),
    payment_status VARCHAR(50) NOT NULL DEFAULT 'Pending' CHECK (payment_status IN ('Pending', 'Paid', 'Failed', 'Refunded')),
    display_currency VARCHAR(10) NOT NULL CHECK (display_currency IN ('NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AUD')),
    subtotal NUMERIC(14, 2) NOT NULL CHECK (subtotal >= 0),
    shipping_fee NUMERIC(14, 2) NOT NULL DEFAULT 0.00 CHECK (shipping_fee >= 0),
    total NUMERIC(14, 2) NOT NULL CHECK (total >= 0),
    shipping_address JSONB NOT NULL,
    billing_address JSONB,
    payment_method VARCHAR(50) NOT NULL DEFAULT 'Card' CHECK (payment_method IN ('Card', 'Bank Transfer', 'Pending Selection')),
    tracking_number VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- -----------------------------------------------------------------------------
-- 11. ORDER ITEMS TABLE
-- Order line items preserving historical original listing price + currency
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE RESTRICT,
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE RESTRICT,
    artwork_title_snapshot VARCHAR(255) NOT NULL,
    artwork_type_snapshot VARCHAR(50) NOT NULL,
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    
    -- Historical listing price (unmutated original currency)
    original_listing_price NUMERIC(14, 2) NOT NULL CHECK (original_listing_price >= 0),
    original_listing_currency VARCHAR(10) NOT NULL CHECK (original_listing_currency IN ('NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AUD')),
    
    -- Display currency price shown to collector at checkout time
    applicable_displayed_price NUMERIC(14, 2) NOT NULL CHECK (applicable_displayed_price >= 0),
    display_currency VARCHAR(10) NOT NULL CHECK (display_currency IN ('NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AUD')),
    
    -- Historical commission calculation snapshot
    commission_rate NUMERIC(5, 2) NOT NULL DEFAULT 15.00,
    artist_share_amount NUMERIC(14, 2) NOT NULL CHECK (artist_share_amount >= 0),
    gallery_share_amount NUMERIC(14, 2) NOT NULL CHECK (gallery_share_amount >= 0),
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_artwork_id ON order_items(artwork_id);
CREATE INDEX IF NOT EXISTS idx_order_items_artist_id ON order_items(artist_id);

-- -----------------------------------------------------------------------------
-- 12. WISHLIST TABLE
-- Favourites with unique constraint (customer_id, artwork_id) to prevent duplicates
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS wishlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    artwork_id UUID NOT NULL REFERENCES artworks(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_customer_artwork UNIQUE (customer_id, artwork_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlists_customer_id ON wishlists(customer_id);

-- -----------------------------------------------------------------------------
-- 13. COMMISSIONS TABLE
-- Gallery vs Artist marketplace financial calculation foundation
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS commissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    order_item_id UUID NOT NULL UNIQUE REFERENCES order_items(id) ON DELETE CASCADE,
    artist_id UUID NOT NULL REFERENCES artists(id) ON DELETE RESTRICT,
    sale_amount NUMERIC(14, 2) NOT NULL CHECK (sale_amount >= 0),
    currency VARCHAR(10) NOT NULL CHECK (currency IN ('NGN', 'USD', 'GBP', 'EUR', 'CAD', 'AUD')),
    commission_percentage NUMERIC(5, 2) NOT NULL DEFAULT 15.00,
    artist_share NUMERIC(14, 2) NOT NULL CHECK (artist_share >= 0),
    gallery_share NUMERIC(14, 2) NOT NULL CHECK (gallery_share >= 0),
    commission_status VARCHAR(50) NOT NULL DEFAULT 'calculated' CHECK (commission_status IN ('pending', 'calculated', 'approved', 'disputed')),
    payout_status VARCHAR(50) NOT NULL DEFAULT 'unpaid' CHECK (payout_status IN ('unpaid', 'processing', 'paid', 'failed')),
    payout_id VARCHAR(100),
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_commissions_artist_id ON commissions(artist_id);
CREATE INDEX IF NOT EXISTS idx_commissions_order_id ON commissions(order_id);

-- -----------------------------------------------------------------------------
-- 14. NOTIFICATIONS TABLE
-- Platform multi-role event notifications (Customer, Artist, Administrator)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    recipient_role VARCHAR(50) NOT NULL CHECK (recipient_role IN ('customer', 'artist', 'admin')),
    notification_type VARCHAR(50) NOT NULL CHECK (notification_type IN ('order', 'submission', 'enquiry', 'payout', 'artist', 'system')),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    read BOOLEAN NOT NULL DEFAULT false,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id ON notifications(recipient_id);

-- -----------------------------------------------------------------------------
-- 15. AUDIT RECORDS TABLE
-- Security and compliance activity log for administrative actions
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_email VARCHAR(255) NOT NULL,
    actor_role VARCHAR(50) NOT NULL,
    action VARCHAR(100) NOT NULL,
    affected_entity VARCHAR(100) NOT NULL,
    affected_entity_id VARCHAR(100) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    timestamp TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_records_actor_id ON audit_records(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_records_entity ON audit_records(affected_entity, affected_entity_id);

-- -----------------------------------------------------------------------------
-- 16. WEBSITE CONTENT TABLE
-- Editable CMS website sections
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS website_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    section_key VARCHAR(100) NOT NULL UNIQUE,
    title VARCHAR(255) NOT NULL,
    content_data JSONB NOT NULL DEFAULT '{}',
    is_published BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 17. POLICIES TABLE
-- Dynamic policy document management (Privacy, Terms, Shipping, Refunds, Artist Agreement)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_type VARCHAR(50) NOT NULL UNIQUE CHECK (policy_type IN ('privacy', 'terms', 'shipping', 'returns', 'artist_agreement', 'copyright')),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    version VARCHAR(20) NOT NULL DEFAULT '1.0.0',
    is_active BOOLEAN NOT NULL DEFAULT true,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 18. ENQUIRIES TABLE
-- Private advisory, viewing requests & artwork enquiries
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    enquiry_type VARCHAR(100) NOT NULL,
    artwork_id UUID REFERENCES artworks(id) ON DELETE SET NULL,
    artwork_title VARCHAR(255),
    message TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'In Progress', 'Resolved')),
    reply_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES FOR SUPABASE
-- =============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE artist_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

-- Public Read for Published Artworks & Active Artists & Active Categories
CREATE POLICY "Public Read Artworks" ON artworks FOR SELECT USING (status IN ('Approved', 'Published'));
CREATE POLICY "Public Read Artists" ON artists FOR SELECT USING (status = 'Active');
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (is_active = true);

-- Customer Row Level Access
CREATE POLICY "Customer Own Data" ON customers FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Customer Own Addresses" ON customer_addresses FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);
CREATE POLICY "Customer Own Orders" ON orders FOR SELECT USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);
CREATE POLICY "Customer Own Wishlist" ON wishlists FOR ALL USING (
    customer_id IN (SELECT id FROM customers WHERE user_id = auth.uid())
);

-- Artist Row Level Access
CREATE POLICY "Artist Own Profile" ON artists FOR ALL USING (user_id = auth.uid());
CREATE POLICY "Artist Own Artworks" ON artworks FOR ALL USING (
    artist_id IN (SELECT id FROM artists WHERE user_id = auth.uid())
);

-- Admin Global Access Override
CREATE POLICY "Admin Full Access Users" ON users FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
);
