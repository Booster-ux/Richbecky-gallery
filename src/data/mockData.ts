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
    type: 'Original Artwork',
    category: 'African Contemporary Art',
    medium: 'Mixed Media (oil paints, acrylic paints, cowries, Ghana beads, other beads, Ankara fabric, and other mixed materials)',
    materials: 'Oil paints, acrylic paints, cowries, Ghana beads, other beads, Ankara fabric, and other mixed materials',
    dimensions: '24 × 36 inches',
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
    artworkStory: 'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.\n\nDespite the weight of history, Africa continues to rise with courage, strength, and unwavering hope. Every challenge has become a testament to the endurance of its people, whose determination refuses to be broken.\n\nThis artwork celebrates the unyielding character of Africa—its ability to withstand pain, preserve its identity, and keep moving forward. ISEMBAYE is a reminder that true strength is not found in a life without struggles, but in the courage to rise after every fall.',
    artistStatement: 'My work is a prayer of remembrance and a celebration of African endurance.',
    certificateIncluded: true,
    certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
    editionInfo: 'Original artwork: 1 available. Fine-art prints: Available separately. Print edition/quantity: To be decided.',
    signatureInfo: 'The original artwork will be signed by the artist, Rebecca Esho. Exact signature placement: [To be decided]',
    framingInfo: 'The artwork is painted on canvas and is currently unframed. Framing is not required, but framing can be arranged upon the customer\'s request.',
    fineArtPrintAvailable: true,
    fineArtPrintDetails: 'Fine-art prints are available for customers who would like a printed version of the artwork.',
    shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
    status: 'Approved',
    createdAt: '2026-08-09T10:00:00Z'
  },
  {
    id: 'art-2',
    title: 'THIS IS OUR WAY',
    artistId: 'artist-1',
    artistName: 'Rebecca Esho',
    artistAvatar: '/images/artworks/isembaye.jpg',
    type: 'Original Artwork',
    category: 'African Contemporary Art',
    medium: 'Oil on Canvas',
    materials: 'Oil on Canvas',
    dimensions: '30 × 36 inches',
    year: 2026,
    price: 250000,
    currency: 'NGN',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/this_is_our_way.jpg',
    additionalImages: ['/images/artworks/this_is_our_way.jpg'],
    description: 'I paint this because we must not forget.\n\nHe stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers, worn close to the skin where no foreign hand can reach. Around his neck are the sacred marks of our lineage. In his hands, the beaded crown — carried from one generation to the next, not as decoration, but as declaration of who holds authority over this land. A small blue bird rests against him — a quiet messenger between us and those who came before us.\n\nOne eye sees what is in front of him. The other eye, luminous and wide open, looks inward — into our memory, into our ancestry, into everything that was nearly stolen from us.\n\nBehind him stand the mud walls of our home. The earth that bore us. The ground that was never truly surrendered, no matter what they said.\n\nThey came. They placed their own people in charge to rule over us. They told us our ways were worthless — that the beaded crown, the cloth of our fathers, the pride of Odua, the morning call of Ilé Karo Ojire — that these things had no value. Some of us believed them. Some of us traded our ancestral garment for their fashion, forgetting that underneath every new garment, we are still wearing the kijipa. We are still us.\n\nBut nothing changed what we are. We are Odua\'s children. We are black. We are one. Our culture did not die — it waited. And now we choose to come back to it, not with shame, but with pride. We are not bastards of this soil. We resist. We return. We decolonize — not just our land, but our minds.\n\nWe will never trade the way of our fathers to anyone. This is us. This has always been us.',
    artworkStory: 'I paint this because we must not forget. He stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers, worn close to the skin where no foreign hand can reach. Around his neck are the sacred marks of our lineage. In his hands, the beaded crown — carried from one generation to the next, not as decoration, but as declaration of who holds authority over this land. A small blue bird rests against him — a quiet messenger between us and those who came before us.\n\nOne eye sees what is in front of him. The other eye, luminous and wide open, looks inward — into our memory, into our ancestry, into everything that was nearly stolen from us.\n\nBehind him stand the mud walls of our home. The earth that bore us. The ground that was never truly surrendered, no matter what they said.\n\nThey came. They placed their own people in charge to rule over us. They told us our ways were worthless — that the beaded crown, the cloth of our fathers, the pride of Odua, the morning call of Ilé Karo Ojire — that these things had no value. Some of us believed them. Some of us traded our ancestral garment for their fashion, forgetting that underneath every new garment, we are still wearing the kijipa. We are still us.\n\nBut nothing changed what we are. We are Odua\'s children. We are black. We are one. Our culture did not die — it waited. And now we choose to come back to it, not with shame, but with pride. We are not bastards of this soil. We resist. We return. We decolonize — not just our land, but our minds.\n\nWe will never trade the way of our fathers to anyone. This is us. This has always been us.',
    artistStatement: 'Decolonization begins in the mind and lives through our visual heritage.',
    certificateIncluded: true,
    certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
    editionInfo: 'Original artwork: 1 available. Fine-art prints: [To be provided]. Print edition/quantity: [To be decided]',
    signatureInfo: 'The original artwork will be signed by the artist, Rebecca Esho. Exact signature placement: [To be decided]',
    framingInfo: 'The artwork is painted on canvas and is currently unframed. Framing is not required, but framing can be arranged upon the customer\'s request.',
    fineArtPrintAvailable: true,
    fineArtPrintDetails: 'Available on demand',
    shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
    status: 'Approved',
    createdAt: '2026-08-09T11:00:00Z'
  },
  {
    id: 'art-3',
    title: 'THE FIRST DIALOGUE',
    artistId: 'artist-2',
    artistName: 'Kolawole Adedeji',
    artistAvatar: '/images/artworks/the_first_dialogue.jpg',
    type: 'Original Artwork',
    category: 'African Contemporary Art',
    medium: 'Oil on Canvas',
    materials: 'Oil on Canvas',
    dimensions: '30 × 36 inches',
    year: 2025,
    price: 182,
    currency: 'USD',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/the_first_dialogue.jpg',
    additionalImages: ['/images/artworks/the_first_dialogue.jpg'],
    description: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria. It explores the moment when conversations began that would profoundly shape the continent\'s history.\n\nThe painting expresses the idea that the intentions behind those early meetings were not fully understood by our ancestors. What appeared to be an exchange of knowledge and faith eventually led to lasting political, economic, and cultural changes that transformed African societies.\n\nThe striking yellow line running through the composition symbolizes the boundary where that first dialogue took place. It is more than a visual element—it represents the dividing line between Africa\'s past and the new reality that followed. It marks the moment when history changed direction.\n\nInspired by the words often attributed to Jomo Kenyatta:\n\n“When the missionaries arrived, the Africans had the land and the missionaries had the Bible. They taught us to pray with our eyes closed. When we opened them, they had the land and we had the Bible.”\n\nThis artwork is also a call to preserve Africa\'s cultural identity. Languages may fade, traditions may evolve, but culture remains the strongest expression of who we are and where we come from. As long as The First Dialogue exists, that defining conversation—and the lessons it carries—will continue to inspire reflection for generations to come.',
    artworkStory: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria. It explores the moment when conversations began that would profoundly shape the continent\'s history.\n\nThe artwork reflects on how an encounter that appeared to involve an exchange of knowledge and faith eventually contributed to lasting political, economic, and cultural changes across African societies.\n\nThe striking yellow line symbolizes the boundary where that first dialogue took place—the dividing line between Africa\'s past and the new reality that followed.\n\nThe artwork ultimately calls for the preservation of Africa\'s cultural identity and encourages reflection on the historical encounter and the lessons it carries for future generations.',
    artistStatement: 'History is a mirror through which contemporary African society understands its present.',
    certificateIncluded: true,
    certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
    editionInfo: 'Original artwork: 1 available. Fine-art prints: [To be provided]. Print edition/quantity: [To be decided]',
    signatureInfo: 'The original artwork will be signed by the artist, Kolawole Adedeji. Exact signature placement: [To be decided]',
    framingInfo: 'The artwork is painted on canvas and is sold unframed. Framing is available upon the customer\'s request and will be provided at an additional cost.',
    fineArtPrintAvailable: false,
    fineArtPrintDetails: '[To be provided]',
    shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
    status: 'Approved',
    createdAt: '2026-08-09T12:00:00Z'
  },
  {
    id: 'art-4',
    title: 'UNDER OUR NEW GARMENT',
    artistId: 'artist-2',
    artistName: 'Kolawole Adedeji',
    artistAvatar: '/images/artworks/the_first_dialogue.jpg',
    type: 'Original Artwork',
    category: 'African Contemporary Art',
    medium: 'Oil on Canvas',
    materials: 'Oil Paint, Embedded Natural Cowrie Shells',
    dimensions: '30 × 36 inches',
    year: 2025,
    price: 182,
    currency: 'USD',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/under_our_new_garment.jpg',
    additionalImages: ['/images/artworks/under_our_new_garment.jpg'],
    description: 'At first glance, you see the bold red hat, the tailored modern jacket, and the bright blue turtleneck. But look closer—that is not the whole story.\n\nUnder Our New Garment is a deeply personal self-portrait and a reflection on the identity of modern Africa. It tells the story of a people who have embraced aspects of the modern world while refusing to abandon the heritage that defines them.\n\nGrowing up, my father sewed traditional clothing for our family. Today, although I wear contemporary fashion, I carry those memories and values with me. Beneath every new garment lies an older identity that continues to shape who I am.\n\nThe cowrie shells resting on my chest are far more than ornaments. Throughout West and Central Africa, they have symbolized wealth, spirituality, wisdom, prosperity, and a sacred connection to our ancestors. They represent a cultural inheritance that cannot be replaced by changing fashions or modern lifestyles.\n\nThe modern clothing symbolizes education, globalization, technology, and the opportunities of today\'s world. The cowries remind us that progress should never require the loss of our identity. We can embrace the future without abandoning the traditions, stories, and values that gave us life.\n\nUnder Our New Garment is a visual statement that African identity is layered, resilient, and enduring. It challenges viewers to reflect on the balance between cultural evolution and cultural preservation.\n\nProgress does not mean forgetting. It means carrying your roots with pride as you move forward.\n\nWhat are you wearing under your new garment?',
    artworkStory: 'Under Our New Garment is a deeply personal self-portrait and a reflection on the identity of modern Africa. It explores the relationship between contemporary life and the cultural heritage that continues to shape African identity.\n\nThe artwork reflects on how education, globalization, technology, and modern fashion can coexist with traditions, memories, values, and ancestral heritage.\n\nThe cowrie shells represent cultural inheritance, while the modern clothing represents the opportunities and realities of the contemporary world. Together, they communicate the idea that progress does not have to mean abandoning one\'s roots.',
    artistStatement: 'Progress does not mean forgetting. It means carrying your roots with pride.',
    certificateIncluded: true,
    certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
    editionInfo: 'Original artwork: 1 available. Fine-art prints: [To be provided]. Print edition/quantity: [To be decided]',
    signatureInfo: 'The original artwork will be signed by the artist, Kolawole Adedeji. Exact signature placement: [To be decided]',
    framingInfo: 'The artwork is painted on canvas and is sold unframed. Framing is available upon the customer\'s request and will be provided at an additional cost.',
    fineArtPrintAvailable: true,
    fineArtPrintDetails: 'Available on Demand',
    shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
    status: 'Approved',
    createdAt: '2026-08-09T13:00:00Z'
  },
  {
    id: 'art-5',
    title: 'Thought of Hope',
    artistId: 'artist-3',
    artistName: 'Okunlola Olamilekan J (Palette)',
    artistAvatar: '/images/artworks/thought_of_hope.jpg',
    type: 'Original Artwork',
    category: 'African Contemporary Art',
    medium: 'Oil Paint on Canvas',
    materials: 'Oil Paint on Canvas',
    dimensions: '2 × 3 feet (24 × 36 inches)',
    year: 2025,
    price: 182,
    currency: 'USD',
    stock: 1,
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/thought_of_hope.jpg',
    additionalImages: ['/images/artworks/thought_of_hope.jpg'],
    description: 'Thought of Hope explores the suffering, torment, and hopelessness experienced by less privileged people in Nigeria and Africa as a whole.\n\nThe artwork reflects on a society where the wealthy remain greedy, the poor remain in need, and those in positions of leadership continue to take without adequately returning to or maintaining the resources and systems that should benefit society.\n\nIt questions the promises made to young people and the realities they face, particularly the promise that education is the key to success and that young people are the leaders of tomorrow.\n\nThe work draws attention to the obstacles that can suppress dreams, waste time, and prevent people from reaching their potential.\n\nAt its heart, the artwork asks a difficult but important question: Is there hope for tomorrow? Is it truly going to be alright?',
    artworkStory: 'This artwork signifies the suffering, torment, and hopeless life of the less privileged in Nigeria and Africa as a whole, where the rich stay greedy and the poor remain in need, while leaders keep taking without returning to or maintaining the source for the benefit of society.\n\nThey said education is the key to success, but they changed the padlock.\n\nThey said young ones are the leaders of tomorrow, but the seat became family property.\n\nThey become giant tigers and obstacles, killing dreams and wasting the time of their own people.\n\nThe question now is: Is there hope in tomorrow? Is it truly going to be alright?',
    artistStatement: 'Art must give voice to the unspoken questions of our youth.',
    certificateIncluded: true,
    certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
    editionInfo: 'Original artwork: 1 available. Fine-art prints: Available on request. Print edition/quantity: [To be decided]',
    signatureInfo: 'The original artwork will be signed by the artist, Okunlola Olamilekan J. (Palette). Exact signature placement: [To be decided]',
    framingInfo: 'The artwork is painted on canvas and is sold unframed. Framing is available upon the customer\'s request and will be provided at an additional cost.',
    fineArtPrintAvailable: true,
    fineArtPrintDetails: 'Fine-art prints are available on request.',
    shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
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
    name: 'African Contemporary Art',
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
