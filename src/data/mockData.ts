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
    artistId: 'artist-3',
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
    artistId: 'artist-3',
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
    artistId: 'artist-5',
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

export const ARTISTS: Artist[] = [
  {
    id: 'artist-1',
    name: 'Rebecca Esho',
    avatar: '/images/artworks/isembaye.jpg',
    coverImage: '/images/artworks/isembaye.jpg',
    bio: 'Rebecca Esho is a celebrated contemporary African artist specializing in mixed media, traditional beading, and figurative oil portraiture celebrating African heritage, identity, and resilience.',
    country: 'Nigeria / Africa',
    exhibitionsCount: 16,
    artworksCount: 12,
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
    name: 'Marcus Vance',
    avatar: '/images/artworks/this_is_our_way.jpg',
    coverImage: '/images/artworks/this_is_our_way.jpg',
    bio: 'Marcus Vance explores minimalist architectural geometry and atmospheric light play. His fine art archival photography has been featured in international gallery solos.',
    country: 'United Kingdom',
    exhibitionsCount: 12,
    artworksCount: 9,
    isFollowed: false,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      website: 'https://marcusvance.co.uk',
      instagram: '@marcusvance_studio'
    }
  },
  {
    id: 'artist-3',
    name: 'Kolawole Adedeji',
    avatar: '/images/artworks/the_first_dialogue.jpg',
    coverImage: '/images/artworks/the_first_dialogue.jpg',
    bio: 'Kolawole Adedeji is a distinguished contemporary Nigerian visual artist whose figurative oil compositions interrogate pre-colonial African sovereignty and cultural preservation.',
    country: 'Nigeria',
    exhibitionsCount: 14,
    artworksCount: 10,
    isFollowed: true,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      website: 'https://richbeckygallery.com',
      instagram: '@kolawole_art'
    }
  },
  {
    id: 'artist-4',
    name: 'Henri Dupont',
    avatar: '/images/artworks/under_our_new_garment.jpg',
    coverImage: '/images/artworks/under_our_new_garment.jpg',
    bio: 'Working from Paris, Henri Dupont sculpts fluid organic forms in bronze, marble, and polished steel.',
    country: 'France',
    exhibitionsCount: 15,
    artworksCount: 11,
    isFollowed: false,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      instagram: '@henridupont_sculpture'
    }
  },
  {
    id: 'artist-5',
    name: 'Okunlola Olamilekan J (Palette)',
    avatar: '/images/artworks/thought_of_hope.jpg',
    coverImage: '/images/artworks/thought_of_hope.jpg',
    bio: 'Okunlola Olamilekan J (Palette) is an emotive Nigerian oil painter whose narrative figurative works address economic justice and youth advocacy across Africa.',
    country: 'Nigeria',
    exhibitionsCount: 11,
    artworksCount: 8,
    isFollowed: false,
    commissionRate: 15,
    status: 'Active',
    socialLinks: {
      website: 'https://richbeckygallery.com',
      instagram: '@palette_olamilekan'
    }
  }
];

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Abstract',
    count: 14,
    image: '/images/artworks/isembaye.jpg',
    description: 'Expressive color harmonies, geometric structures, and rich tactile textures.'
  },
  {
    id: 'cat-2',
    name: 'Minimalist',
    count: 9,
    image: '/images/artworks/this_is_our_way.jpg',
    description: 'Restrained compositions celebrating subtle form, balance, and quiet space.'
  },
  {
    id: 'cat-3',
    name: 'Figurative',
    count: 16,
    image: '/images/artworks/the_first_dialogue.jpg',
    description: 'Evocative human portraiture and modern narrative representations.'
  },
  {
    id: 'cat-4',
    name: 'Sculpture',
    count: 11,
    image: '/images/artworks/under_our_new_garment.jpg',
    description: 'Three-dimensional masterpieces in bronze, Carrara marble, and mixed metals.'
  },
  {
    id: 'cat-5',
    name: 'Landscape',
    count: 8,
    image: '/images/artworks/thought_of_hope.jpg',
    description: 'Atmospheric vistas, mist-laden horizons, and serene natural horizons.'
  }
];

export const MOCK_USER: User = {
  id: 'user-101',
  name: 'Lady Rebecca Sterling',
  email: 'rebecca.sterling@artcollector.com',
  phone: '+44 20 7946 0912',
  role: 'customer',
  avatar: '/images/artworks/isembaye.jpg',
  bio: 'Private art collector & patron of contemporary abstract expressionism.'
};

export const MOCK_CUSTOMERS: CustomerProfile[] = [
  {
    id: 'cust-1',
    name: 'Lady Rebecca Sterling',
    email: 'rebecca.sterling@artcollector.com',
    phone: '+44 20 7946 0912',
    vipStatus: 'VIP Patron Collector',
    totalSpend: 14850,
    orderCount: 4,
    wishlistCount: 6,
    addresses: [
      {
        id: 'addr-1',
        label: 'Primary Mayfair Residence',
        fullName: 'Lady Rebecca Sterling',
        addressLine: '14 Mayfair Gardens, Grosvenor Square',
        city: 'London',
        country: 'United Kingdom',
        zipCode: 'W1K 6JP',
        isDefault: true
      }
    ]
  },
  {
    id: 'cust-2',
    name: 'Chief Babatunde Alabi',
    email: 'babatunde.alabi@lagosgroup.ng',
    phone: '+234 803 123 4567',
    vipStatus: 'Senior Collector Patron',
    totalSpend: 28500,
    orderCount: 6,
    wishlistCount: 12,
    addresses: [
      {
        id: 'addr-2',
        label: 'Ikoyi Private Residence',
        fullName: 'Chief Babatunde Alabi',
        addressLine: '22 Bourdillon Road',
        city: 'Ikoyi, Lagos',
        country: 'Nigeria',
        zipCode: '101233',
        isDefault: true
      }
    ]
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    id: 'RBG-88402',
    date: '2026-07-28',
    items: [{ artwork: INITIAL_ARTWORKS[0], quantity: 1 }],
    subtotal: 365,
    shippingFee: 50,
    total: 415,
    displayCurrency: 'USD',
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
    status: 'Delivered',
    trackingNumber: 'DHL-994821034'
  },
  {
    id: 'RBG-88319',
    date: '2026-06-15',
    items: [{ artwork: INITIAL_ARTWORKS[1], quantity: 1 }],
    subtotal: 250000,
    shippingFee: 15000,
    total: 265000,
    displayCurrency: 'NGN',
    shippingInfo: {
      fullName: 'Chief Babatunde Alabi',
      email: 'babatunde.alabi@lagosgroup.ng',
      phone: '+234 803 123 4567',
      address: '22 Bourdillon Road',
      city: 'Ikoyi, Lagos',
      country: 'Nigeria',
      zipCode: '101233'
    },
    paymentMethod: 'Bank Transfer',
    status: 'Shipped',
    trackingNumber: 'FEDEX-88392019'
  }
];

export const MOCK_ENQUIRIES: Enquiry[] = [
  {
    id: 'enq-101',
    customerName: 'Lord Alistair Crawford',
    customerEmail: 'alistair.crawford@artadvisory.co.uk',
    customerPhone: '+44 7700 900077',
    enquiryType: 'Private Collection Advisory',
    artworkId: 'art-1',
    artworkTitle: 'ISEMBAYE',
    message: 'We are curating a private exhibition in Geneva and would like to inquire about private viewing and authenticity provenance documentation for ISEMBAYE.',
    date: '2026-08-08',
    status: 'New'
  },
  {
    id: 'enq-102',
    customerName: 'Dr. Amina Bello',
    customerEmail: 'amina.bello@culturefoundation.ng',
    customerPhone: '+234 802 999 8811',
    enquiryType: 'Artwork Enquiry',
    artworkId: 'art-3',
    artworkTitle: 'THE FIRST DIALOGUE',
    message: 'Interested in acquiring THE FIRST DIALOGUE for our institutional collection in Abuja. Please advise on crating and insured transport logistics.',
    date: '2026-08-05',
    status: 'In Progress',
    replyNotes: 'Curatorial team preparing custom wooden crating specs.'
  }
];

export const MOCK_PAYOUTS: Payout[] = [
  {
    id: 'pay-701',
    artistId: 'artist-1',
    artistName: 'Rebecca Esho',
    amount: 212500,
    currency: 'NGN',
    status: 'Paid',
    period: '2026-07 (Cycle 2)',
    payoutMethod: 'Guaranty Trust Bank Wire',
    date: '2026-07-31'
  },
  {
    id: 'pay-702',
    artistId: 'artist-3',
    artistName: 'Kolawole Adedeji',
    amount: 212500,
    currency: 'NGN',
    status: 'Pending',
    period: '2026-08 (Cycle 1)',
    payoutMethod: 'First Bank Nigeria Wire',
    date: '2026-08-15'
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Authenticity',
    question: 'Are all artworks accompanied by an official Certificate of Authenticity?',
    answer: 'Yes. Every original artwork and fine art print acquired through Richbecky Gallery includes a signed Certificate of Authenticity specifying medium, dimensions, year of creation, artist signature verification, and gallery seal.',
    order: 1
  },
  {
    id: 'faq-2',
    category: 'Shipping',
    question: 'How are fragile oil paintings packaged and shipped internationally?',
    answer: 'Artworks are crated in custom museum-grade wooden boxes lined with moisture barrier padding. All shipments are fully insured and handled via white-glove international air couriers (DHL / FedEx Express).',
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

export const MOCK_ADMIN_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Artwork Submission',
    message: 'Rebecca Esho submitted a new masterwork: "ISEMBAYE".',
    type: 'submission',
    date: '10 mins ago',
    read: false,
    targetRole: 'admin'
  },
  {
    id: 'notif-2',
    title: 'Private Advisory Enquiry',
    message: 'Lord Alistair Crawford requested private collection consultation.',
    type: 'enquiry',
    date: '2 hours ago',
    read: false,
    targetRole: 'admin'
  }
];
