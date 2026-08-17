-- Richbecky Gallery — Seed Production Data Script

-- 1. SEED CATEGORIES (Valid 32-char Hex UUIDs)
INSERT INTO public.categories (id, name, slug, description, image, display_order, is_active)
VALUES 
  ('c0000000-0000-0000-0000-000000000001', 'African Contemporary Art', 'african-contemporary-art', 'Masterpieces exploring contemporary African heritage, identity, and visual narratives.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/isembaye.jpg', 1, true),
  ('c0000000-0000-0000-0000-000000000002', 'Figurative', 'figurative', 'Expressive human form studies capturing emotion, movement, and ancestral presence.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/the_first_dialogue.jpg', 2, true),
  ('c0000000-0000-0000-0000-000000000003', 'Abstract', 'abstract', 'Bold non-representational compositions rich with color theory and textural depth.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/this_is_our_way.jpg', 3, true),
  ('c0000000-0000-0000-0000-000000000004', 'Minimalist', 'minimalist', 'Subtle editorial spaces focusing on essential form, light, and geometry.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/thought_of_hope.jpg', 4, true)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED ADMIN USER IN PUBLIC.USERS
INSERT INTO public.users (id, email, first_name, last_name, role, status)
VALUES ('cc46da53-2080-47dc-96e6-484346410309', 'admin@richbeckygallery.com', 'Executive', 'Director', 'admin', 'active')
ON CONFLICT (id) DO NOTHING;

-- 3. SEED ARTIST USERS
INSERT INTO public.users (id, email, first_name, last_name, role, status)
VALUES 
  ('11111111-1111-1111-1111-111111111111', 'kolawole@richbeckygallery.com', 'Kolawole', 'Adedeji', 'artist', 'active'),
  ('22222222-2222-2222-2222-222222222222', 'rebecca@richbeckygallery.com', 'Rebecca', 'Esho', 'artist', 'active'),
  ('33333333-3333-3333-3333-333333333333', 'okunlola@richbeckygallery.com', 'Okunlola', 'Olamilekan J', 'artist', 'active')
ON CONFLICT (id) DO NOTHING;

-- 4. SEED ARTISTS
INSERT INTO public.artists (id, user_id, full_name, biography, artist_statement, profile_image, country, contact_info, social_links, status, approval_status)
VALUES 
  ('a0000000-0000-0000-0000-000000000101', '11111111-1111-1111-1111-111111111111', 'Kolawole Adedeji', 'Kolawole Adedeji is a distinguished contemporary visual artist based in Nigeria, renowned for his textured figurative narratives exploring identity, spatial memory, and cultural heritage.', 'Visual art is a bridge connecting historical memory to modern consciousness.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/isembaye.jpg', 'Nigeria', '{"email": "kolawole@richbeckygallery.com", "phone": "+234 800 111 2222"}'::jsonb, '{}'::jsonb, 'Active', 'Approved'),
  ('a0000000-0000-0000-0000-000000000102', '22222222-2222-2222-2222-222222222222', 'Rebecca Esho', 'Rebecca Esho is a celebrated visual artist exploring intimate spiritual dialogues, feminine presence, and editorial minimalism in contemporary art.', 'Art reflects the quiet strength residing within spatial relationships.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/the_first_dialogue.jpg', 'Nigeria', '{"email": "rebecca@richbeckygallery.com", "phone": "+234 800 333 4444"}'::jsonb, '{}'::jsonb, 'Active', 'Approved'),
  ('a0000000-0000-0000-0000-000000000103', '33333333-3333-3333-3333-333333333333', 'Okunlola Olamilekan J', 'Okunlola Olamilekan J is an emerging contemporary artist working in mixed media and oil on canvas, detailing African urban life.', 'Capturing everyday human stories through vivid palette harmonies.', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/thought_of_hope.jpg', 'Nigeria', '{"email": "okunlola@richbeckygallery.com", "phone": "+234 800 555 6666"}'::jsonb, '{}'::jsonb, 'Active', 'Approved')
ON CONFLICT (id) DO NOTHING;

-- 5. SEED FIVE CORE PRODUCTION ARTWORKS
-- Artwork 1: ISEMBAYE (Kolawole Adedeji)
INSERT INTO public.artworks (
  id, title, artist_id, artist_name_snapshot, description, artwork_story, artist_statement, artwork_type,
  category_id, category_name_snapshot, medium, dimensions_formatted, year_created, price, original_currency,
  availability, quantity, status, is_featured, is_new_arrival, certificate_included, slug, primary_image_url
) VALUES (
  'a0000000-0000-0000-0000-000000000001', 'ISEMBAYE', 'a0000000-0000-0000-0000-000000000101', 'Kolawole Adedeji',
  'An evocative masterpiece exploring cultural heritage, spatial memory, and contemporary African identity through intricate texture work.',
  'ISEMBAYE represents the enduring lineage of African heritage, capturing the quiet dignity of ancestral presence.',
  'Through textured layers and deep earth tones, ISEMBAYE invites viewers to honor history.',
  'Original Artwork', 'c0000000-0000-0000-0000-000000000001', 'African Contemporary Art',
  'Acrylic and Mixed Media on Canvas', '36 × 48 inches (91.4 × 121.9 cm)', 2024, 365, 'USD',
  'Available', 1, 'Approved', true, true, true, 'isembaye', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/isembaye.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Artwork 2: THIS IS OUR WAY (Kolawole Adedeji) - MANDATORY ATTRIBUTION CHECK
INSERT INTO public.artworks (
  id, title, artist_id, artist_name_snapshot, description, artwork_story, artist_statement, artwork_type,
  category_id, category_name_snapshot, medium, dimensions_formatted, year_created, price, original_currency,
  availability, quantity, status, is_featured, is_new_arrival, certificate_included, slug, primary_image_url
) VALUES (
  'a0000000-0000-0000-0000-000000000002', 'THIS IS OUR WAY', 'a0000000-0000-0000-0000-000000000101', 'Kolawole Adedeji',
  'A profound visual narrative detailing community resilience, shared paths, and enduring traditions.',
  'THIS IS OUR WAY is a visual anthem honoring the collective journey of African communities navigating modern realities.',
  'We move forward together, carrying the wisdom of our progenitors.',
  'Original Artwork', 'c0000000-0000-0000-0000-000000000001', 'African Contemporary Art',
  'Oil and Charcoal on Canvas', '40 × 50 inches (101.6 × 127.0 cm)', 2024, 250000, 'NGN',
  'Available', 1, 'Approved', true, true, true, 'this-is-our-way', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/this_is_our_way.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Artwork 3: THE FIRST DIALOGUE (Rebecca Esho)
INSERT INTO public.artworks (
  id, title, artist_id, artist_name_snapshot, description, artwork_story, artist_statement, artwork_type,
  category_id, category_name_snapshot, medium, dimensions_formatted, year_created, price, original_currency,
  availability, quantity, status, is_featured, is_new_arrival, certificate_included, slug, primary_image_url
) VALUES (
  'a0000000-0000-0000-0000-000000000003', 'THE FIRST DIALOGUE', 'a0000000-0000-0000-0000-000000000102', 'Rebecca Esho',
  'An intimate figurative study capturing the subtle emotional resonance of initial encounters and silent understanding.',
  'THE FIRST DIALOGUE captures the delicate moment when two souls connect without speaking.',
  'In silence, the deepest truths are articulated.',
  'Original Artwork', 'c0000000-0000-0000-0000-000000000002', 'Figurative',
  'Oil on Fine Linen Canvas', '30 × 40 inches (76.2 × 101.6 cm)', 2024, 182, 'USD',
  'Available', 1, 'Approved', true, true, true, 'the-first-dialogue', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/the_first_dialogue.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Artwork 4: UNDER OUR NEW GARMENT (Rebecca Esho)
INSERT INTO public.artworks (
  id, title, artist_id, artist_name_snapshot, description, artwork_story, artist_statement, artwork_type,
  category_id, category_name_snapshot, medium, dimensions_formatted, year_created, price, original_currency,
  availability, quantity, status, is_featured, is_new_arrival, certificate_included, slug, primary_image_url
) VALUES (
  'a0000000-0000-0000-0000-000000000004', 'UNDER OUR NEW GARMENT', 'a0000000-0000-0000-0000-000000000102', 'Rebecca Esho',
  'A striking figurative composition examining transformation, self-actualization, and cultural adornment.',
  'UNDER OUR NEW GARMENT explores the shedding of old constraints and embracing renewed identity.',
  'Our garments are reflections of our inner evolution.',
  'Original Artwork', 'c0000000-0000-0000-0000-000000000002', 'Figurative',
  'Mixed Media and Textiles on Canvas', '36 × 48 inches (91.4 × 121.9 cm)', 2024, 182, 'USD',
  'Available', 1, 'Approved', true, true, true, 'under-our-new-garment', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/under_our_new_garment.jpg'
) ON CONFLICT (id) DO NOTHING;

-- Artwork 5: Thought of Hope (Rebecca Esho)
INSERT INTO public.artworks (
  id, title, artist_id, artist_name_snapshot, description, artwork_story, artist_statement, artwork_type,
  category_id, category_name_snapshot, medium, dimensions_formatted, year_created, price, original_currency,
  availability, quantity, status, is_featured, is_new_arrival, certificate_included, slug, primary_image_url
) VALUES (
  'a0000000-0000-0000-0000-000000000005', 'Thought of Hope', 'a0000000-0000-0000-0000-000000000102', 'Rebecca Esho',
  'A contemplative masterpiece evoking optimism, light, and quiet reflection in a changing world.',
  'Thought of Hope was created as a beacon during times of uncertainty.',
  'Hope is an active choice, cultivated through visual harmony.',
  'Original Artwork', 'c0000000-0000-0000-0000-000000000004', 'Minimalist',
  'Oil and Soft Pastel on Canvas', '32 × 40 inches (81.3 × 101.6 cm)', 2024, 182, 'USD',
  'Available', 1, 'Approved', true, true, true, 'thought-of-hope', 'https://qsgdjgugapehrpionvbl.supabase.co/storage/v1/object/public/artwork-images/artworks/thought_of_hope.jpg'
) ON CONFLICT (id) DO NOTHING;

-- 6. SEED INVENTORY
INSERT INTO public.inventory (artwork_id, quantity, reserved_quantity, status)
VALUES 
  ('a0000000-0000-0000-0000-000000000001', 1, 0, 'in_stock'),
  ('a0000000-0000-0000-0000-000000000002', 1, 0, 'in_stock'),
  ('a0000000-0000-0000-0000-000000000003', 1, 0, 'in_stock'),
  ('a0000000-0000-0000-0000-000000000004', 1, 0, 'in_stock'),
  ('a0000000-0000-0000-0000-000000000005', 1, 0, 'in_stock')
ON CONFLICT (artwork_id) DO NOTHING;

-- FORCE POSTGREST SCHEMA CACHE RELOAD
NOTIFY pgrst, 'reload schema';
