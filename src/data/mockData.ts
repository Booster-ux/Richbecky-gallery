import { Artwork, Artist, Category, Order, User } from '../types';

export const LOGO_URL = 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/media__1786281072344.png';

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'Serenade in Blue & Gold',
    artistId: 'artist-1',
    artistName: 'Elena Rostova',
    artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    type: 'Original',
    category: 'Abstract',
    medium: 'Oil & 24K Gold Leaf on Linen Canvas',
    dimensions: '120 x 150 cm (47.2 x 59.1 in)',
    year: 2024,
    price: 4850,
    stock: 1, // Original artwork strictly 1
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_1_blue_gold_1786281890336.png',
    additionalImages: [
      'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_1_blue_gold_1786281890336.png',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Serenade in Blue & Gold is a monumental contemporary abstraction exploring emotional depth through layered indigo tones and authentic 24-karat champagne gold leaf gilding. Each brushstroke creates an atmospheric dialogue between light and shadow on heavy French linen canvas.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-01T10:00:00Z'
  },
  {
    id: 'art-2',
    title: 'Architectural Silence No. 4',
    artistId: 'artist-2',
    artistName: 'Marcus Vance',
    artistAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    type: 'Fine Art Print',
    category: 'Minimalist',
    medium: 'Archival Pigment Print on Hahnemühle Photo Rag',
    dimensions: '80 x 100 cm (31.5 x 39.4 in)',
    year: 2024,
    price: 950,
    stock: 15, // Limited fine art print series
    isSold: false,
    isFeatured: true,
    isNewArrival: false,
    imageUrl: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_2_architectural_1786281919518.png',
    additionalImages: [
      'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_2_architectural_1786281919518.png'
    ],
    description: 'Architectural Silence No. 4 captures the tranquil intersection of light, shadow, and minimalist architectural form. Printed on museum-grade Hahnemühle cotton rag using archival mineral pigments for a 100-year guarantee.',
    certificateIncluded: false,
    status: 'Approved',
    createdAt: '2026-08-03T14:30:00Z'
  },
  {
    id: 'art-3',
    title: 'Solitude of Dreams',
    artistId: 'artist-3',
    artistName: 'Amara Okafor',
    artistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    type: 'Original',
    category: 'Figurative',
    medium: 'Mixed Media, Acrylic & Gold Leaf on Gallery Canvas',
    dimensions: '100 x 120 cm (39.4 x 47.2 in)',
    year: 2024,
    price: 3600,
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_3_portrait_1786281939339.png',
    additionalImages: [
      'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_3_portrait_1786281939339.png'
    ],
    description: 'Solitude of Dreams presents a captivating contemporary portrait celebrating inner quietude and poise. Rich indigo washes harmonise with luminous gold leaf accents, reflecting Amara Okafor’s signature figurative elegance.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-04T09:15:00Z'
  },
  {
    id: 'art-4',
    title: 'Harmonic Continuity',
    artistId: 'artist-4',
    artistName: 'Henri Dupont',
    artistAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    type: 'Original',
    category: 'Sculpture',
    medium: 'Hand-cast Bronze & Carrara Marble Base',
    dimensions: '45 x 30 x 65 cm (17.7 x 11.8 x 25.6 in)',
    year: 2023,
    price: 6200,
    stock: 1,
    isSold: false,
    isFeatured: false,
    isNewArrival: true,
    imageUrl: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_4_sculpture_1786281959649.png',
    additionalImages: [
      'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_4_sculpture_1786281959649.png'
    ],
    description: 'Harmonic Continuity is a physical study in organic rhythm and fluid balance. Cast in patinated bronze and mounted on polished white Carrara marble, this unique masterpiece embodies Henri Dupont’s architectural sculptural ethos.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-05T11:00:00Z'
  },
  {
    id: 'art-5',
    title: 'Ethereal Dawn over Horizon',
    artistId: 'artist-5',
    artistName: 'Sophia Chen',
    artistAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    type: 'Fine Art Print',
    category: 'Landscape',
    medium: 'Giclée Fine Art Print on Smooth Cotton Velvet',
    dimensions: '90 x 120 cm (35.4 x 47.2 in)',
    year: 2024,
    price: 780,
    stock: 20,
    isSold: false,
    isFeatured: true,
    isNewArrival: false,
    imageUrl: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_5_landscape_1786282131924.png',
    additionalImages: [
      'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_5_landscape_1786282131924.png'
    ],
    description: 'Ethereal Dawn over Horizon captures sunrise mist diffusing over quiet coastal waters. The subtle gradations of navy blue, soft gold, and warm ivory invoke a meditative stillness in any gallery space.',
    certificateIncluded: false,
    status: 'Approved',
    createdAt: '2026-08-06T16:20:00Z'
  }
];

export const ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    bio: 'Elena Rostova is a renowned contemporary painter based in Vienna. Known for her large-scale oil and gold leaf abstractions, her works are held in private collections across Europe, North America, and Asia.',
    country: 'Austria',
    exhibitionsCount: 18,
    artworksCount: 14,
    isFollowed: true,
    socialLinks: {
      website: 'https://elenarostova.art',
      instagram: '@elena.rostova.art'
    }
  },
  {
    id: 'artist-2',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80',
    bio: 'Marcus Vance explores minimalist architectural geometry and atmospheric light play. His fine art archival photography has been featured in Architectural Digest and international gallery solos.',
    country: 'United Kingdom',
    exhibitionsCount: 12,
    artworksCount: 9,
    isFollowed: false,
    socialLinks: {
      website: 'https://marcusvance.co.uk',
      instagram: '@marcusvance_studio'
    }
  },
  {
    id: 'artist-3',
    name: 'Amara Okafor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
    bio: 'Amara Okafor blends traditional African figurative motifs with modern abstract expressionism. Her vibrant portraiture investigates memory, identity, and quiet dignity.',
    country: 'Nigeria / United Kingdom',
    exhibitionsCount: 22,
    artworksCount: 16,
    isFollowed: true,
    socialLinks: {
      website: 'https://amaraokafor.com',
      instagram: '@amara.okafor.fineart'
    }
  },
  {
    id: 'artist-4',
    name: 'Henri Dupont',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    bio: 'Working from Paris, Henri Dupont sculpts fluid organic forms in bronze, marble, and polished steel. His sculptures embody continuous movement and architectural weightlessness.',
    country: 'France',
    exhibitionsCount: 15,
    artworksCount: 11,
    isFollowed: false,
    socialLinks: {
      instagram: '@henridupont_sculpture'
    }
  },
  {
    id: 'artist-5',
    name: 'Sophia Chen',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    bio: 'Sophia Chen creates serene, atmospheric landscapes inspired by East Asian ink painting techniques and Western impressionism.',
    country: 'Canada',
    exhibitionsCount: 10,
    artworksCount: 8,
    isFollowed: false,
    socialLinks: {
      website: 'https://sophiachenart.com'
    }
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Abstract',
    count: 14,
    image: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_1_blue_gold_1786281890336.png',
    description: 'Expressive color harmonies, geometric structures, and rich tactile textures.'
  },
  {
    id: 'cat-2',
    name: 'Minimalist',
    count: 9,
    image: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_2_architectural_1786281919518.png',
    description: 'Restrained compositions celebrating subtle form, balance, and quiet space.'
  },
  {
    id: 'cat-3',
    name: 'Figurative',
    count: 16,
    image: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_3_portrait_1786281939339.png',
    description: 'Evocative human portraiture and modern narrative representations.'
  },
  {
    id: 'cat-4',
    name: 'Sculpture',
    count: 11,
    image: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_4_sculpture_1786281959649.png',
    description: 'Three-dimensional masterpieces in bronze, Carrara marble, and mixed metals.'
  },
  {
    id: 'cat-5',
    name: 'Landscape',
    count: 8,
    image: 'file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_5_landscape_1786282131924.png',
    description: 'Atmospheric vistas, mist-laden horizons, and serene natural horizons.'
  }
];

export const MOCK_USER: User = {
  id: 'user-101',
  name: 'Lady Rebecca Sterling',
  email: 'rebecca.sterling@artcollector.com',
  phone: '+44 20 7946 0912',
  role: 'customer',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
  bio: 'Private art collector & patron of contemporary abstract expressionism.'
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'RBG-88402',
    date: '2026-07-28',
    items: [
      {
        artwork: INITIAL_ARTWORKS[0],
        quantity: 1
      }
    ],
    subtotal: 4850,
    shippingFee: 150,
    total: 5000,
    shippingInfo: {
      fullName: 'Lady Rebecca Sterling',
      email: 'rebecca.sterling@artcollector.com',
      phone: '+44 20 7946 0912',
      address: '14 Mayfair Gardens, Grosvenor Square',
      city: 'London',
      country: 'United Kingdom',
      zipCode: 'W1K 6JP'
    },
    paymentMethod: 'Card',
    status: 'Delivered'
  },
  {
    id: 'RBG-88319',
    date: '2026-06-15',
    items: [
      {
        artwork: INITIAL_ARTWORKS[1],
        quantity: 2
      }
    ],
    subtotal: 1900,
    shippingFee: 80,
    total: 1980,
    shippingInfo: {
      fullName: 'Lady Rebecca Sterling',
      email: 'rebecca.sterling@artcollector.com',
      phone: '+44 20 7946 0912',
      address: '14 Mayfair Gardens, Grosvenor Square',
      city: 'London',
      country: 'United Kingdom',
      zipCode: 'W1K 6JP'
    },
    paymentMethod: 'Bank Transfer',
    status: 'Delivered'
  }
];
