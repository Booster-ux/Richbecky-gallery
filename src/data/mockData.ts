import { Artwork, Artist, Category, Order, User } from '../types';

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
    dimensions: '60 x 90 cm (23.6 x 35.4 in)',
    year: 2026,
    price: 365,
    currency: 'USD',
    stock: 1, // Original artwork strictly 1
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/isembaye.jpg',
    additionalImages: [
      '/images/artworks/isembaye.jpg'
    ],
    description: 'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.\n\nDespite the weight of history, Africa continues to rise with courage, strength, and unwavering hope. Every challenge has become a testament to the endurance of its people, whose determination refuses to be broken.\n\nThis artwork celebrates the unyielding character of Africa—its ability to withstand pain, preserve its identity, and keep moving forward. ISEMBAYE is a reminder that true strength is not found in a life without struggles, but in the courage to rise after every fall.',
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
    dimensions: '30 x 36 inches (76.2 x 91.4 cm)',
    year: 2026,
    price: 250000,
    currency: 'NGN',
    stock: 1, // Original artwork strictly 1
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/this_is_our_way.jpg',
    additionalImages: [
      '/images/artworks/this_is_our_way.jpg'
    ],
    description: 'I paint this because we must not forget.\n\nHe stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers, worn close to the skin where no foreign hand can reach. Around his neck are the sacred marks of our lineage. In his hands, the beaded crown — carried from one generation to the next, not as decoration, but as declaration of who holds authority over this land. A small blue bird rests against him — a quiet messenger between us and those who came before us.\n\nOne eye sees what is in front of him. The other eye, luminous and wide open, looks inward — into our memory, into our ancestry, into everything that was nearly stolen from us.\n\nBehind him stand the mud walls of our home. The earth that bore us. The ground that was never truly surrendered, no matter what they said.\n\nThey came. They placed their own people in charge to rule over us. They told us our ways were worthless — that the beaded crown, the cloth of our fathers, the pride of Odua, the morning call of Ilé Karo Ojire — that these things had no value. Some of us believed them. Some of us traded our ancestral garment for their fashion, forgetting that underneath every new garment, we are still wearing the kijipa. We are still us.\n\nBut nothing changed what we are. We are Odua\'s children. We are black. We are one. Our culture did not die — it waited. And now we choose to come back to it, not with shame, but with pride. We are not bastards of this soil. We resist. We return. We decolonize — not just our land, but our minds.\n\nWe will never trade the way of our fathers to anyone. This is us. This has always been us.',
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
    dimensions: '30 x 36 inches (76.2 x 91.4 cm)',
    year: 2025,
    price: 250000,
    currency: 'NGN',
    stock: 1, // Original artwork strictly 1
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/the_first_dialogue.jpg',
    additionalImages: [
      '/images/artworks/the_first_dialogue.jpg'
    ],
    description: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria. It explores the moment when conversations began that would profoundly shape the continent\'s history.\n\nThe painting expresses the idea that the intentions behind those early meetings were not fully understood by our ancestors. What appeared to be an exchange of knowledge and faith eventually led to lasting political, economic, and cultural changes that transformed African societies.\n\nThe striking yellow line running through the composition symbolizes the boundary where that first dialogue took place. It is more than a visual element—it represents the dividing line between Africa\'s past and the new reality that followed. It marks the moment when history changed direction.\n\nInspired by the words often attributed to Jomo Kenyatta:\n\n«"When the missionaries arrived, the Africans had the land and the missionaries had the Bible. They taught us to pray with our eyes closed. When we opened them, they had the land and we had the Bible."»\n\nThis artwork is also a call to preserve Africa\'s cultural identity. Languages may fade, traditions may evolve, but culture remains the strongest expression of who we are and where we come from. As long as The First Dialogue exists, that defining conversation—and the lessons it carries—will continue to inspire reflection for generations to come.',
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
    dimensions: '30 x 36 inches (76.2 x 91.4 cm)',
    year: 2025,
    price: 250000,
    currency: 'NGN',
    stock: 1, // Original artwork strictly 1
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/under_our_new_garment.jpg',
    additionalImages: [
      '/images/artworks/under_our_new_garment.jpg'
    ],
    description: 'At first glance, you see the bold red hat, the tailored modern jacket, and the bright blue turtleneck. But look closer—that is not the whole story.\n\nUnder Our New Garment is a deeply personal self-portrait and a reflection on the identity of modern Africa. It tells the story of a people who have embraced aspects of the modern world while refusing to abandon the heritage that defines them.\n\nGrowing up, my father sewed traditional clothing for our family. Today, although I wear contemporary fashion, I carry those memories and values with me. Beneath every new garment lies an older identity that continues to shape who I am.\n\nThe cowrie shells resting on my chest are far more than ornaments. Throughout West and Central Africa, they have symbolized wealth, spirituality, wisdom, prosperity, and a sacred connection to our ancestors. They represent a cultural inheritance that cannot be replaced by changing fashions or modern lifestyles.\n\nThe modern clothing symbolizes education, globalization, technology, and the opportunities of today\'s world. The cowries remind us that progress should never require the loss of our identity. We can embrace the future without abandoning the traditions, stories, and values that gave us life.\n\nUnder Our New Garment is a visual statement that African identity is layered, resilient, and enduring. It challenges viewers to reflect on the balance between cultural evolution and cultural preservation.\n\nProgress does not mean forgetting. It means carrying your roots with pride as you move forward.\n\nWhat are you wearing under your new garment?',
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
    dimensions: '2 x 3 ft (24 x 36 in / 60.9 x 91.4 cm)',
    year: 2026,
    price: 250000,
    currency: 'NGN',
    stock: 1, // Original artwork strictly 1
    isSold: false,
    isFeatured: true,
    isNewArrival: true,
    imageUrl: '/images/artworks/thought_of_hope.jpg',
    additionalImages: [
      '/images/artworks/thought_of_hope.jpg'
    ],
    description: 'This art piece signifies the suffering, tormenting, and challenging lives of the less privileged in Nigeria and Africa as a whole study, where the rich stay greedy and the poor stay in need, and leaders keep taking without returning or maintaining the sources for the benefit of society...\n\nThey said education is the key to success, but they changed the padlock.\nThey said young ones are the leaders of tomorrow, but the seat became family property.\n\nThey become obstacles, killing dreams and wasting the time of their own people.\n\nThe question now is: Is there hope in tomorrow? Is it truly going to be alright?...',
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
    name: 'Kolawole Adedeji',
    avatar: '/images/artworks/the_first_dialogue.jpg',
    coverImage: '/images/artworks/the_first_dialogue.jpg',
    bio: 'Kolawole Adedeji is a distinguished contemporary Nigerian visual artist whose figurative oil compositions interrogate pre-colonial African sovereignty, historical encounters, and cultural preservation.',
    country: 'Nigeria',
    exhibitionsCount: 14,
    artworksCount: 10,
    isFollowed: true,
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
    name: 'Okunlola Olamilekan J (Palette)',
    avatar: '/images/artworks/thought_of_hope.jpg',
    coverImage: '/images/artworks/thought_of_hope.jpg',
    bio: 'Okunlola Olamilekan J (Palette) is an emotive Nigerian oil painter whose narrative figurative works address economic justice, youth advocacy, and social resilience across Africa.',
    country: 'Nigeria',
    exhibitionsCount: 11,
    artworksCount: 8,
    isFollowed: false,
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
    paymentMethod: 'Bank Transfer',
    status: 'Delivered'
  }
];
