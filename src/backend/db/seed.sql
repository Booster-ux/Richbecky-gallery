-- =============================================================================
-- RICHBECKY GALLERY — STAGE 1 SEED DATA (PostgreSQL / Supabase)
-- =============================================================================
-- Strictly preserves the 5 real Richbecky artworks & 3 real artists represented
-- in the existing frontend without fabricating replacement content.
-- =============================================================================

-- Clear existing seed tables if re-running
TRUNCATE TABLE audit_records, notifications, commissions, order_items, orders, wishlists, customer_addresses, inventory, artwork_images, artworks, categories, artist_applications, artists, customers, users, policies, website_content RESTART IDENTITY CASCADE;

-- -----------------------------------------------------------------------------
-- 1. SEED USERS (Admin, Artists, Demo Collector)
-- -----------------------------------------------------------------------------
INSERT INTO users (id, email, password_hash, role, first_name, last_name, phone, status) VALUES
('u0000000-0000-0000-0000-000000000001', 'admin@richbeckygallery.com', '$2a$12$KIX5dM...hash...', 'admin', 'Richbecky', 'Admin', '+2348000000001', 'active'),
('u0000000-0000-0000-0000-000000000002', 'rebecca.esho@richbeckygallery.com', '$2a$12$KIX5dM...hash...', 'artist', 'Rebecca', 'Esho', '+2348000000002', 'active'),
('u0000000-0000-0000-0000-000000000003', 'kolawole.adedeji@richbeckygallery.com', '$2a$12$KIX5dM...hash...', 'artist', 'Kolawole', 'Adedeji', '+2348000000003', 'active'),
('u0000000-0000-0000-0000-000000000004', 'okunlola.palette@richbeckygallery.com', '$2a$12$KIX5dM...hash...', 'artist', 'Okunlola Olamilekan', 'J (Palette)', '+2348000000004', 'active'),
('u0000000-0000-0000-0000-000000000005', 'collector@example.com', '$2a$12$KIX5dM...hash...', 'customer', 'Demola', 'Akinyemi', '+2348012345678', 'active');

-- -----------------------------------------------------------------------------
-- 2. SEED CUSTOMER PROFILE
-- -----------------------------------------------------------------------------
INSERT INTO customers (id, user_id, account_number, vip_status, total_spend, order_count, wishlist_count, preferred_currency, status) VALUES
('c0000000-0000-0000-0000-000000000005', 'u0000000-0000-0000-0000-000000000005', 'RBG-CUST-1001', 'VIP Collector', 250000.00, 1, 2, 'USD', 'active');

INSERT INTO customer_addresses (id, customer_id, label, full_name, email, phone, address_line, city, state_region, country, postal_zip, address_type, is_default) VALUES
('addr-001', 'c0000000-0000-0000-0000-000000000005', 'Main Residence', 'Demola Akinyemi', 'collector@example.com', '+2348012345678', '14 Victoria Island Drive, Suite 4B', 'Lagos', 'Lagos State', 'Nigeria', '101241', 'both', true);

-- -----------------------------------------------------------------------------
-- 3. SEED THE 3 REAL ARTISTS
-- -----------------------------------------------------------------------------
INSERT INTO artists (id, user_id, full_name, biography, artist_statement, profile_image, country, contact_info, social_links, website, exhibitions_count, artworks_count, commission_rate, status, approval_status, approved_date) VALUES
(
    'a0000000-0000-0000-0000-000000000001',
    'u0000000-0000-0000-0000-000000000002',
    'Rebecca Esho',
    'Rebecca Esho is a celebrated contemporary African visual artist specializing in mixed media, traditional beading, and figurative oil portraiture celebrating African heritage, identity, and resilience.',
    'My work is a prayer of remembrance and a celebration of African endurance.',
    '/images/artworks/isembaye.jpg',
    'Nigeria',
    '{"email": "rebecca.esho@richbeckygallery.com", "phone": "+2348000000002"}'::jsonb,
    '{"website": "https://richbeckygallery.com", "instagram": "@rebeccaesho_art"}'::jsonb,
    'https://richbeckygallery.com',
    0, 2, 15.00, 'Active', 'Approved', CURRENT_TIMESTAMP
),
(
    'a0000000-0000-0000-0000-000000000002',
    'u0000000-0000-0000-0000-000000000003',
    'Kolawole Adedeji',
    'Kolawole Adedeji is a distinguished contemporary Nigerian visual artist whose figurative oil compositions interrogate pre-colonial African sovereignty, historical encounters, and cultural preservation.',
    'Decolonization begins in the mind and lives through our visual heritage.',
    '/images/artworks/the_first_dialogue.jpg',
    'Nigeria',
    '{"email": "kolawole.adedeji@richbeckygallery.com", "phone": "+2348000000003"}'::jsonb,
    '{"website": "https://richbeckygallery.com", "instagram": "@kolawole_art"}'::jsonb,
    'https://richbeckygallery.com',
    0, 2, 15.00, 'Active', 'Approved', CURRENT_TIMESTAMP
),
(
    'a0000000-0000-0000-0000-000000000003',
    'u0000000-0000-0000-0000-000000000004',
    'Okunlola Olamilekan J (Palette)',
    'Okunlola Olamilekan J (Palette) is an emotive Nigerian oil painter whose narrative figurative works address economic justice, youth advocacy, and social resilience across Africa.',
    'Art must give voice to the unspoken questions of our youth.',
    '/images/artworks/thought_of_hope.jpg',
    'Nigeria',
    '{"email": "okunlola.palette@richbeckygallery.com", "phone": "+2348000000004"}'::jsonb,
    '{"website": "https://richbeckygallery.com", "instagram": "@palette_olamilekan"}'::jsonb,
    'https://richbeckygallery.com',
    0, 1, 15.00, 'Active', 'Approved', CURRENT_TIMESTAMP
);

-- -----------------------------------------------------------------------------
-- 4. SEED CATEGORIES
-- -----------------------------------------------------------------------------
INSERT INTO categories (id, name, slug, description, image, display_order, is_active, artwork_count) VALUES
('cat00000-0000-0000-0000-000000000001', 'Figurative', 'figurative', 'Evocative African portraiture, historical narratives, and indigenous cultural identity.', '/images/artworks/isembaye.jpg', 1, true, 5),
('cat00000-0000-0000-0000-000000000002', 'Abstract', 'abstract', 'Expressive color harmonies, geometric structures, and rich tactile textures.', '/images/artworks/the_first_dialogue.jpg', 2, true, 0),
('cat00000-0000-0000-0000-000000000003', 'Landscape', 'landscape', 'Atmospheric vistas, natural horizons, and environmental reflections.', '/images/artworks/thought_of_hope.jpg', 3, true, 0);

-- -----------------------------------------------------------------------------
-- 5. SEED THE 5 REAL ARTWORKS
-- -----------------------------------------------------------------------------
INSERT INTO artworks (
    id, title, artist_id, artist_name_snapshot, description, artwork_story, artist_statement,
    artwork_type, category_id, category_name_snapshot, medium, materials, dimensions_formatted,
    dimensions_parsed, year_created, price, original_currency, availability, quantity, status,
    is_featured, is_new_arrival, certificate_included, edition_info, signature_info, shipping_info_notes,
    slug, primary_image_url
) VALUES
(
    'art00000-0000-0000-0000-000000000001',
    'ISEMBAYE',
    'a0000000-0000-0000-0000-000000000001',
    'Rebecca Esho',
    'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.',
    'Inspired by traditional royal Yoruba beadwork and indigenous woven textiles.',
    'My work is a prayer of remembrance and a celebration of African endurance.',
    'Original Artwork',
    'cat00000-0000-0000-0000-000000000001',
    'Figurative',
    'Oil, Traditional Beading & Fabric Collage on Canvas',
    'Oil Paint, Handcrafted Glass Beads, Vintage African Kijipa Fabric',
    '60 x 90 cm (23.6 x 35.4 in)',
    '{"height": 90, "width": 60, "unit": "cm"}'::jsonb,
    2026, 365.00, 'USD', 'Available', 1, 'Approved',
    true, true, true, '1-of-1 Original Masterpiece',
    'Signed & Dated front bottom right: Rebecca Esho 2026',
    'Crated in custom wooden box, insured global air transit.',
    'isembaye',
    '/images/artworks/isembaye.jpg'
),
(
    'art00000-0000-0000-0000-000000000002',
    'THIS IS OUR WAY',
    'a0000000-0000-0000-0000-000000000001',
    'Rebecca Esho',
    'I paint this because we must not forget. He stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers...',
    'Depicts an elder guardian holding the beaded crown of Odua.',
    'Decolonization begins in the mind and lives through our visual heritage.',
    'Original Artwork',
    'cat00000-0000-0000-0000-000000000001',
    'Figurative',
    'Oil on Canvas',
    'Heavy Duty Linen Canvas, Artist-Grade Windsor Oil Paints',
    '30 x 36 inches (76.2 x 91.4 cm)',
    '{"height": 91.4, "width": 76.2, "unit": "cm"}'::jsonb,
    2026, 250000.00, 'NGN', 'Available', 1, 'Approved',
    true, true, true, '1-of-1 Original Masterpiece',
    'Signed & Dated reverse canvas: Rebecca Esho 2026',
    'Stretched canvas, corner padding, sealed waterproof wrap.',
    'this-is-our-way',
    '/images/artworks/this_is_our_way.jpg'
),
(
    'art00000-0000-0000-0000-000000000003',
    'THE FIRST DIALOGUE',
    'a0000000-0000-0000-0000-000000000002',
    'Kolawole Adedeji',
    'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria.',
    'Explores early European-African encounters in West Africa.',
    'History is a mirror through which contemporary African society understands its present.',
    'Original Artwork',
    'cat00000-0000-0000-0000-000000000001',
    'Figurative',
    'Oil on Canvas',
    'Oil Paint, Gold Foil Accents',
    '30 x 36 inches (76.2 x 91.4 cm)',
    '{"height": 91.4, "width": 76.2, "unit": "cm"}'::jsonb,
    2025, 250000.00, 'NGN', 'Available', 1, 'Approved',
    true, true, true, '1-of-1 Original Masterpiece',
    'Signed lower left: Kolawole Adedeji -25',
    'Insured international transit.',
    'the-first-dialogue',
    '/images/artworks/the_first_dialogue.jpg'
),
(
    'art00000-0000-0000-0000-000000000004',
    'UNDER OUR NEW GARMENT',
    'a0000000-0000-0000-0000-000000000002',
    'Kolawole Adedeji',
    'At first glance, you see the bold red hat, the tailored modern jacket, and the bright blue turtleneck. But look closer—that is not the whole story.',
    'Self-portrait exploring modern African identity layered over ancestral memory.',
    'Progress does not mean forgetting. It means carrying your roots with pride.',
    'Original Artwork',
    'cat00000-0000-0000-0000-000000000001',
    'Figurative',
    'Oil on Canvas',
    'Oil Paint, Embedded Natural Cowrie Shells',
    '30 x 36 inches (76.2 x 91.4 cm)',
    '{"height": 91.4, "width": 76.2, "unit": "cm"}'::jsonb,
    2025, 250000.00, 'NGN', 'Available', 1, 'Approved',
    true, true, true, '1-of-1 Original Masterpiece',
    'Signed & Dated bottom left: Kolawole Adedeji 2025',
    'Custom wood crate with moisture barrier.',
    'under-our-new-garment',
    '/images/artworks/under_our_new_garment.jpg'
),
(
    'art00000-0000-0000-0000-000000000005',
    'Thought of Hope',
    'a0000000-0000-0000-0000-000000000003',
    'Okunlola Olamilekan J (Palette)',
    'This art piece signifies the suffering, tormenting, and challenging lives of the less privileged in Nigeria and Africa as a whole study...',
    'Reflects social advocacy and youth economic resilience in modern Nigeria.',
    'Art must give voice to the unspoken questions of our youth.',
    'Original Artwork',
    'cat00000-0000-0000-0000-000000000001',
    'Figurative',
    'Oil Paint on Canvas',
    'Artist-Grade Oil Pigments on Heavy Canvas',
    '2 x 3 ft (24 x 36 in / 60.9 x 91.4 cm)',
    '{"height": 91.4, "width": 60.9, "unit": "cm"}'::jsonb,
    2026, 250000.00, 'NGN', 'Available', 1, 'Approved',
    true, true, true, '1-of-1 Original Masterpiece',
    'Signed lower right: Okunlola Olamilekan.J ''26 (Palette)',
    'Insured gallery box packaging.',
    'thought-of-hope',
    '/images/artworks/thought_of_hope.jpg'
);

-- -----------------------------------------------------------------------------
-- 6. SEED ARTWORK IMAGES
-- -----------------------------------------------------------------------------
INSERT INTO artwork_images (artwork_id, image_url, image_type, display_order, is_primary, alt_text) VALUES
('art00000-0000-0000-0000-000000000001', '/images/artworks/isembaye.jpg', 'primary', 1, true, 'ISEMBAYE by Rebecca Esho'),
('art00000-0000-0000-0000-000000000002', '/images/artworks/this_is_our_way.jpg', 'primary', 1, true, 'THIS IS OUR WAY by Rebecca Esho'),
('art00000-0000-0000-0000-000000000003', '/images/artworks/the_first_dialogue.jpg', 'primary', 1, true, 'THE FIRST DIALOGUE by Kolawole Adedeji'),
('art00000-0000-0000-0000-000000000004', '/images/artworks/under_our_new_garment.jpg', 'primary', 1, true, 'UNDER OUR NEW GARMENT by Kolawole Adedeji'),
('art00000-0000-0000-0000-000000000005', '/images/artworks/thought_of_hope.jpg', 'primary', 1, true, 'Thought of Hope by Okunlola Olamilekan J (Palette)');

-- -----------------------------------------------------------------------------
-- 7. SEED INVENTORY
-- -----------------------------------------------------------------------------
INSERT INTO inventory (artwork_id, quantity, reserved_quantity, status) VALUES
('art00000-0000-0000-0000-000000000001', 1, 0, 'in_stock'),
('art00000-0000-0000-0000-000000000002', 1, 0, 'in_stock'),
('art00000-0000-0000-0000-000000000003', 1, 0, 'in_stock'),
('art00000-0000-0000-0000-000000000004', 1, 0, 'in_stock'),
('art00000-0000-0000-0000-000000000005', 1, 0, 'in_stock');

-- -----------------------------------------------------------------------------
-- 8. SEED POLICIES & CONTENT
-- -----------------------------------------------------------------------------
INSERT INTO policies (policy_type, title, slug, content, version, is_active) VALUES
('privacy', 'Privacy Policy', 'privacy-policy', 'Richbecky Gallery values collector privacy and data protection...', '1.0.0', true),
('terms', 'Terms & Conditions', 'terms-conditions', 'Welcome to Richbecky Gallery. By browsing or purchasing fine art...', '1.0.0', true),
('shipping', 'Shipping Policy', 'shipping-policy', 'All fine artworks are crated in custom protective packaging and insured...', '1.0.0', true),
('returns', 'Returns & Refund Policy', 'returns-refunds', 'Collectors enjoy a 14-day inspection guarantee upon delivery...', '1.0.0', true),
('artist_agreement', 'Artist Agreement', 'artist-agreement', 'Richbecky Gallery acts as a global representative platform operating on a 15% commission model...', '1.0.0', true);

INSERT INTO website_content (section_key, title, content_data, is_published) VALUES
('homepage_hero', 'Curated African Contemporary Art', '{"headline": "Masterpieces from West Africa to the World", "subheadline": "Connecting discerning global collectors with authenticated contemporary African artists."}'::jsonb, true);
