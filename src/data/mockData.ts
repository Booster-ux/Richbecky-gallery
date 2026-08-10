import {
  Artwork,
  Artist,
  Category,
  Order,
  User,
  Enquiry,
  CustomerProfile,
  Payout,
  FAQItem,
  ShippingRegion,
  NotificationItem
} from '../types';

export const LOGO_URL = '/logo.svg';

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 'art-1',
    title: 'ISEMBAYE',
    artistId: 'artist-1',
    artistName: 'Rebecca Esho',
    artistAvatar: '/images/artworks/isembaye.jpg',
    type: 'Original',
    category: 'Figurative',
    medium: 'Oil, Traditional Beading & Fabric Collage on Canvas',
    materials: 'Oil Paint, Handcrafted Glass Beads, Vintage African Kijipa Fabric',
    dimensions: '60 x 90 cm (23.6 x 35.4 in)',
    year: 2026,
    price: 365,
    currency: 'USD',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/isembaye.jpg',
    additionalImages: ['/images/artworks/isembaye.jpg'],
    description: 'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.\n\nDespite the weight of history, Africa continues to rise with courage, strength, and unwavering hope. Every challenge has become a testament to the endurance of its people, whose determination refuses to be broken.\n\nThis artwork celebrates the unyielding character of Africa—its ability to withstand pain, preserve its identity, and keep moving forward. ISEMBAYE is a reminder that true strength is not found in a life without struggles, but in the courage to rise after every fall.',
    artistStatement: 'My work is a prayer of remembrance and a celebration of African endurance.',
    artworkStory: 'Inspired by traditional royal Yoruba beadwork and indigenous woven textiles.',
    editionInfo: '1-of-1 Original Masterpiece',
    signatureInfo: 'Signed & Dated front bottom right: Rebecca Esho 2026',
    shippingInfoNotes: 'Crated in custom wooden box, insured global air transit.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-09T10:00:00Z'
  },
  {
    id: 'art-2',
    title: 'THIS IS OUR WAY',
    artistId: 'artist-1',
    artistName: 'Rebecca Esho',
    artistAvatar: '/images/artworks/isembaye.jpg',
    type: 'Original',
    category: 'Figurative',
    medium: 'Oil on Canvas',
    materials: 'Heavy Duty Linen Canvas, Artist-Grade Windsor Oil Paints',
    dimensions: '30 x 36 inches (76.2 x 91.4 cm)',
    year: 2026,
    price: 250000,
    currency: 'NGN',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/this_is_our_way.jpg',
    additionalImages: ['/images/artworks/this_is_our_way.jpg'],
    description: 'I paint this because we must not forget.\n\nHe stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers, worn close to the skin where no foreign hand can reach. Around his neck are the sacred marks of our lineage. In his hands, the beaded crown — carried from one generation to the next, not as decoration, but as declaration of who holds authority over this land. A small blue bird rests against him — a quiet messenger between us and those who came before us.\n\nOne eye sees what is in front of him. The other eye, luminous and wide open, looks inward — into our memory, into our ancestry, into everything that was nearly stolen from us.\n\nBehind him stand the mud walls of our home. The earth that bore us. The ground that was never truly surrendered, no matter what they said.',
    artistStatement: 'Decolonization begins in the mind and lives through our visual heritage.',
    artworkStory: 'Depicts an elder guardian holding the beaded crown of Odua.',
    editionInfo: '1-of-1 Original Masterpiece',
    signatureInfo: 'Signed & Dated reverse canvas: Rebecca Esho 2026',
    shippingInfoNotes: 'Stretched canvas, corner padding, sealed waterproof wrap.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-09T11:00:00Z'
  },
  {
    id: 'art-3',
    title: 'THE FIRST DIALOGUE',
    artistId: 'artist-2',
    artistName: 'Kolawole Adedeji',
    artistAvatar: '/images/artworks/the_first_dialogue.jpg',
    type: 'Original',
    category: 'Figurative',
    medium: 'Oil on Canvas',
    materials: 'Oil Paint, Gold Foil Accents',
    dimensions: '30 x 36 inches (76.2 x 91.4 cm)',
    year: 2025,
    price: 250000,
    currency: 'NGN',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/the_first_dialogue.jpg',
    additionalImages: ['/images/artworks/the_first_dialogue.jpg'],
    description: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria. It explores the moment when conversations began that would profoundly shape the continent\'s history.\n\nThe painting expresses the idea that the intentions behind those early meetings were not fully understood by our ancestors. What appeared to be an exchange of knowledge and faith eventually led to lasting political, economic, and cultural changes that transformed African societies.\n\nThe striking yellow line running through the composition symbolizes the boundary where that first dialogue took place.',
    artistStatement: 'History is a mirror through which contemporary African society understands its present.',
    artworkStory: 'Explores early European-African encounters in West Africa.',
    editionInfo: '1-of-1 Original Masterpiece',
    signatureInfo: 'Signed lower left: Kolawole Adedeji -25',
    shippingInfoNotes: 'Insured international transit.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-09T12:00:00Z'
  },
  {
    id: 'art-4',
    title: 'UNDER OUR NEW GARMENT',
    artistId: 'artist-2',
    artistName: 'Kolawole Adedeji',
    artistAvatar: '/images/artworks/the_first_dialogue.jpg',
    type: 'Original',
    category: 'Figurative',
    medium: 'Oil on Canvas',
    materials: 'Oil Paint, Embedded Natural Cowrie Shells',
    dimensions: '30 x 36 inches (76.2 x 91.4 cm)',
    year: 2025,
    price: 250000,
    currency: 'NGN',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/under_our_new_garment.jpg',
    additionalImages: ['/images/artworks/under_our_new_garment.jpg'],
    description: 'At first glance, you see the bold red hat, the tailored modern jacket, and the bright blue turtleneck. But look closer—that is not the whole story.\n\nUnder Our New Garment is a deeply personal self-portrait and a reflection on the identity of modern Africa. It tells the story of a people who have embraced aspects of the modern world while refusing to abandon the heritage that defines them.\n\nThe cowrie shells resting on my chest are far more than ornaments. Throughout West and Central Africa, they have symbolized wealth, spirituality, wisdom, prosperity, and a sacred connection to our ancestors.',
    artistStatement: 'Progress does not mean forgetting. It means carrying your roots with pride.',
    artworkStory: 'Self-portrait exploring modern African identity layered over ancestral memory.',
    editionInfo: '1-of-1 Original Masterpiece',
    signatureInfo: 'Signed & Dated bottom left: Kolawole Adedeji 2025',
    shippingInfoNotes: 'Custom wood crate with moisture barrier.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-09T13:00:00Z'
  },
  {
    id: 'art-5',
    title: 'Thought of Hope',
    artistId: 'artist-3',
    artistName: 'Okunlola Olamilekan J (Palette)',
    artistAvatar: '/images/artworks/thought_of_hope.jpg',
    type: 'Original',
    category: 'Figurative',
    medium: 'Oil Paint on Canvas',
    materials: 'Artist-Grade Oil Pigments on Heavy Canvas',
    dimensions: '2 x 3 ft (24 x 36 in / 60.9 x 91.4 cm)',
    year: 2026,
    price: 250000,
    currency: 'NGN',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/thought_of_hope.jpg',
    additionalImages: ['/images/artworks/thought_of_hope.jpg'],
    description: 'This art piece signifies the suffering, tormenting, and challenging lives of the less privileged in Nigeria and Africa as a whole study, where the rich stay greedy and the poor stay in need, and leaders keep taking without returning or maintaining the sources for the benefit of society...\n\nThey said education is the key to success, but they changed the padlock.\nThey said young ones are the leaders of tomorrow, but the seat became family property.\n\nThe question now is: Is there hope in tomorrow? Is it truly going to be alright?...',
    artistStatement: 'Art must give voice to the unspoken questions of our youth.',
    artworkStory: 'Reflects social advocacy and youth economic resilience in modern Nigeria.',
    editionInfo: '1-of-1 Original Masterpiece',
    signatureInfo: 'Signed lower right: Okunlola Olamilekan.J \'26 (Palette)',
    shippingInfoNotes: 'Insured gallery box packaging.',
    certificateIncluded: true,
    status: 'Approved',
    createdAt: '2026-08-09T14:00:00Z'
  }
];

// ONLY the 3 REAL artists represented by the 5 real artworks
export const ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Rebecca Esho',
    avatar: '/images/artworks/isembaye.jpg',
    coverImage: '/images/artworks/isembaye.jpg',
    bio: 'Rebecca Esho is a celebrated contemporary African visual artist specializing in mixed media, traditional beading, and figurative oil portraiture celebrating African heritage, identity, and resilience.',
    country: 'Nigeria',
    exhibitionsCount: 0,
    artworksCount: 2,
    isFollowed: true,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      website: 'https://richbeckygallery.com',
      instagram: '@rebeccaesho_art'
    }
  },
  {
    id: 'artist-2',
    name: 'Kolawole Adedeji',
    avatar: '/images/artworks/the_first_dialogue.jpg',
    coverImage: '/images/artworks/the_first_dialogue.jpg',
    bio: 'Kolawole Adedeji is a distinguished contemporary Nigerian visual artist whose figurative oil compositions interrogate pre-colonial African sovereignty, historical encounters, and cultural preservation.',
    country: 'Nigeria',
    exhibitionsCount: 0,
    artworksCount: 2,
    isFollowed: true,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      website: 'https://richbeckygallery.com',
      instagram: '@kolawole_art'
    }
  },
  {
    id: 'artist-3',
    name: 'Okunlola Olamilekan J (Palette)',
    avatar: '/images/artworks/thought_of_hope.jpg',
    coverImage: '/images/artworks/thought_of_hope.jpg',
    bio: 'Okunlola Olamilekan J (Palette) is an emotive Nigerian oil painter whose narrative figurative works address economic justice, youth advocacy, and social resilience across Africa.',
    country: 'Nigeria',
    exhibitionsCount: 0,
    artworksCount: 1,
    isFollowed: false,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      website: 'https://richbeckygallery.com',
      instagram: '@palette_olamilekan'
    }
  }
];

// Categories matching the 5 real artworks
export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Figurative',
    count: 5,
    image: '/images/artworks/isembaye.jpg',
    description: 'Evocative African portraiture, historical narratives, and indigenous cultural identity.'
  },
  {
    id: 'cat-2',
    name: 'Abstract',
    count: 0,
    image: '/images/artworks/the_first_dialogue.jpg',
    description: 'Expressive color harmonies, geometric structures, and rich tactile textures.'
  },
  {
    id: 'cat-3',
    name: 'Landscape',
    count: 0,
    image: '/images/artworks/thought_of_hope.jpg',
    description: 'Atmospheric vistas, natural horizons, and environmental reflections.'
  }
];

export const MOCK_USER: User = {
  id: 'user-101',
  name: 'Richbecky Collector',
  email: 'collector@richbeckygallery.com',
  phone: '+234 800 RICHBECKY',
  role: 'customer',
  avatar: '/images/artworks/isembaye.jpg',
  bio: 'Patron of contemporary African visual art & culture.'
};

// Real empty states instead of fabricated demo records
export const MOCK_CUSTOMERS: CustomerProfile[] = [];
export const MOCK_ORDERS: Order[] = [];
export const MOCK_ENQUIRIES: Enquiry[] = [];
export const MOCK_PAYOUTS: Payout[] = [];
export const MOCK_ADMIN_NOTIFICATIONS: NotificationItem[] = [];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Authenticity',
    question: 'Are all artworks accompanied by an official Certificate of Authenticity?',
    answer: 'Yes. Every original artwork acquired through Richbecky Gallery includes a signed Certificate of Authenticity specifying medium, dimensions, year of creation, artist signature verification, and gallery director seal.',
    order: 1
  },
  {
    id: 'faq-2',
    category: 'Shipping',
    question: 'How are fragile oil paintings packaged and shipped internationally?',
    answer: 'Artworks are crated in custom museum-grade wooden boxes lined with moisture barrier padding. All shipments are fully insured and handled via white-glove international courier service.',
    order: 2
  },
  {
    id: 'faq-3',
    category: 'Payments',
    question: 'Which currencies and payment methods are accepted?',
    answer: 'Richbecky Gallery supports multi-currency display and settlement in NGN, USD, GBP, EUR, CAD, and AUD via major debit/credit cards and verified bank wire transfers.',
    order: 3
  }
];

export const MOCK_SHIPPING_REGIONS: ShippingRegion[] = [
  {
    id: 'ship-1',
    regionName: 'Nigeria & West Africa',
    fee: 15000,
    processingTime: '2-4 Business Days',
    internationalAvailable: true
  },
  {
    id: 'ship-2',
    regionName: 'Europe & United Kingdom',
    fee: 150,
    processingTime: '5-7 Business Days',
    internationalAvailable: true
  },
  {
    id: 'ship-3',
    regionName: 'Americas (USA, Canada, LATAM)',
    fee: 180,
    processingTime: '6-9 Business Days',
    internationalAvailable: true
  }
];
