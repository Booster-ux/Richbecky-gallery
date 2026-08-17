/**
 * Richbecky Gallery — Database Repository & Storage Interface
 * 
 * Provides an ORM-agnostic typed repository layer for all domain entities.
 * Initialized with the 5 real artworks and 3 real artists.
 * Easily swapped for Supabase / PostgreSQL Client in Stage 2.
 */

import {
  UserEntity,
  CustomerEntity,
  CustomerAddressEntity,
  ArtistEntity,
  ArtistApplicationEntity,
  ArtworkEntity,
  ArtworkImageEntity,
  CategoryEntity,
  InventoryEntity,
  OrderEntity,
  OrderItemEntity,
  WishlistEntity,
  CommissionEntity,
  NotificationEntity,
  AuditRecordEntity,
  PolicyEntity,
  WebsiteContentEntity,
  EnquiryEntity
} from '../types';

// ==========================================
// SEED MEMORY REPOSITORIES (STAGE 1 LOCAL)
// ==========================================

export class DatabaseMemoryStore {
  public users: Map<string, UserEntity> = new Map();
  public customers: Map<string, CustomerEntity> = new Map();
  public customerAddresses: Map<string, CustomerAddressEntity> = new Map();
  public artists: Map<string, ArtistEntity> = new Map();
  public artistApplications: Map<string, ArtistApplicationEntity> = new Map();
  public categories: Map<string, CategoryEntity> = new Map();
  public artworks: Map<string, ArtworkEntity> = new Map();
  public artworkImages: Map<string, ArtworkImageEntity[]> = new Map();
  public inventory: Map<string, InventoryEntity> = new Map();
  public orders: Map<string, OrderEntity> = new Map();
  public orderItems: Map<string, OrderItemEntity[]> = new Map();
  public wishlists: Map<string, WishlistEntity[]> = new Map();
  public commissions: Map<string, CommissionEntity> = new Map();
  public notifications: Map<string, NotificationEntity[]> = new Map();
  public auditRecords: AuditRecordEntity[] = [];
  public policies: Map<string, PolicyEntity> = new Map();
  public websiteContent: Map<string, WebsiteContentEntity> = new Map();
  public enquiries: Map<string, EnquiryEntity> = new Map();

  constructor() {
    this.seedDefaults();
    this.restoreState();
  }

  public persistState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      localStorage.setItem('rbg_db_users', JSON.stringify(Array.from(this.users.entries())));
      localStorage.setItem('rbg_db_artists', JSON.stringify(Array.from(this.artists.entries())));
      localStorage.setItem('rbg_db_applications', JSON.stringify(Array.from(this.artistApplications.entries())));
      localStorage.setItem('rbg_db_artworks', JSON.stringify(Array.from(this.artworks.entries())));
    } catch (e) {
      // Ignore storage errors
    }
  }

  public restoreState(): void {
    if (typeof localStorage === 'undefined') return;
    try {
      const u = localStorage.getItem('rbg_db_users');
      if (u) {
        const entries = JSON.parse(u);
        entries.forEach(([k, v]: [string, any]) => this.users.set(k, v));
      }
      const a = localStorage.getItem('rbg_db_artists');
      if (a) {
        const entries = JSON.parse(a);
        entries.forEach(([k, v]: [string, any]) => this.artists.set(k, v));
      }
      const app = localStorage.getItem('rbg_db_applications');
      if (app) {
        const entries = JSON.parse(app);
        entries.forEach(([k, v]: [string, any]) => this.artistApplications.set(k, v));
      }
      const art = localStorage.getItem('rbg_db_artworks');
      if (art) {
        const entries = JSON.parse(art);
        entries.forEach(([k, v]: [string, any]) => this.artworks.set(k, v));
      }
    } catch (e) {
      // Fallback to seed defaults
    }
  }

  private seedDefaults(): void {
    // Seed Admin User
    const adminUser: UserEntity = {
      id: 'u0000000-0000-0000-0000-000000000001',
      email: 'admin@richbeckygallery.com',
      firstName: 'Executive',
      lastName: 'Director',
      role: 'admin',
      status: 'active',
      passwordHash: '$2a$12$RBG.YWRtaW4xMjM=',
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };
    this.users.set(adminUser.id, adminUser);

    // Seed Real Artists
    const artist1: ArtistEntity = {
      id: 'a0000000-0000-0000-0000-000000000001',
      userId: 'u0000000-0000-0000-0000-000000000002',
      fullName: 'Rebecca Esho',
      biography: 'Rebecca Esho is a celebrated contemporary African visual artist specializing in mixed media, traditional beading, and figurative oil portraiture celebrating African heritage, identity, and resilience.',
      artistStatement: 'My work is a prayer of remembrance and a celebration of African endurance.',
      profileImage: '/images/artworks/isembaye.jpg',
      coverImage: '/images/artworks/isembaye.jpg',
      country: 'Nigeria',
      contactInfo: { email: 'rebecca.esho@richbeckygallery.com', phone: '+2348000000002', country: 'Nigeria' },
      socialLinks: { website: 'https://richbeckygallery.com', instagram: '@rebeccaesho_art' },
      website: 'https://richbeckygallery.com',
      exhibitionsCount: 0,
      artworksCount: 2,
      commissionRate: 30.0,
      status: 'Active',
      approvalStatus: 'Approved',
      registrationDate: '2026-08-01T00:00:00Z',
      approvedDate: '2026-08-01T00:00:00Z',
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };

    const artist2: ArtistEntity = {
      id: 'a0000000-0000-0000-0000-000000000002',
      userId: 'u0000000-0000-0000-0000-000000000003',
      fullName: 'Kolawole Adedeji',
      biography: 'Kolawole Adedeji is a distinguished contemporary Nigerian visual artist whose figurative oil compositions interrogate pre-colonial African sovereignty, historical encounters, and cultural preservation.',
      artistStatement: 'Decolonization begins in the mind and lives through our visual heritage.',
      profileImage: '/images/artworks/the_first_dialogue.jpg',
      coverImage: '/images/artworks/the_first_dialogue.jpg',
      country: 'Nigeria',
      contactInfo: { email: 'kolawole.adedeji@richbeckygallery.com', phone: '+2348000000003', country: 'Nigeria' },
      socialLinks: { website: 'https://richbeckygallery.com', instagram: '@kolawole_art' },
      website: 'https://richbeckygallery.com',
      exhibitionsCount: 0,
      artworksCount: 2,
      commissionRate: 30.0,
      status: 'Active',
      approvalStatus: 'Approved',
      registrationDate: '2026-08-01T00:00:00Z',
      approvedDate: '2026-08-01T00:00:00Z',
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };

    const artist3: ArtistEntity = {
      id: 'a0000000-0000-0000-0000-000000000003',
      userId: 'u0000000-0000-0000-0000-000000000004',
      fullName: 'Okunlola Olamilekan J (Palette)',
      biography: 'Okunlola Olamilekan J (Palette) is an emotive Nigerian oil painter whose narrative figurative works address economic justice, youth advocacy, and social resilience across Africa.',
      artistStatement: 'Art must give voice to the unspoken questions of our youth.',
      profileImage: '/images/artworks/thought_of_hope.jpg',
      coverImage: '/images/artworks/thought_of_hope.jpg',
      country: 'Nigeria',
      contactInfo: { email: 'okunlola.palette@richbeckygallery.com', phone: '+2348000000004', country: 'Nigeria' },
      socialLinks: { website: 'https://richbeckygallery.com', instagram: '@palette_olamilekan' },
      website: 'https://richbeckygallery.com',
      exhibitionsCount: 0,
      artworksCount: 1,
      commissionRate: 30.0,
      status: 'Active',
      approvalStatus: 'Approved',
      registrationDate: '2026-08-01T00:00:00Z',
      approvedDate: '2026-08-01T00:00:00Z',
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };

    this.artists.set(artist1.id, artist1);
    this.artists.set(artist2.id, artist2);
    this.artists.set(artist3.id, artist3);

    // Seed Categories
    const cat1: CategoryEntity = {
      id: 'cat00000-0000-0000-0000-000000000001',
      name: 'African Contemporary Art',
      slug: 'african-contemporary-art',
      description: 'Evocative African portraiture, historical narratives, and indigenous cultural identity.',
      image: '/images/artworks/isembaye.jpg',
      displayOrder: 1,
      isActive: true,
      artworkCount: 5,
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };
    const cat2: CategoryEntity = {
      id: 'cat00000-0000-0000-0000-000000000002',
      name: 'Abstract',
      slug: 'abstract',
      description: 'Expressive color harmonies, geometric structures, and rich tactile textures.',
      image: '/images/artworks/the_first_dialogue.jpg',
      displayOrder: 2,
      isActive: true,
      artworkCount: 0,
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };
    const cat3: CategoryEntity = {
      id: 'cat00000-0000-0000-0000-000000000003',
      name: 'Landscape',
      slug: 'landscape',
      description: 'Atmospheric vistas, natural horizons, and environmental reflections.',
      image: '/images/artworks/thought_of_hope.jpg',
      displayOrder: 3,
      isActive: true,
      artworkCount: 0,
      createdAt: '2026-08-01T00:00:00Z',
      updatedAt: '2026-08-01T00:00:00Z'
    };

    this.categories.set(cat1.id, cat1);
    this.categories.set(cat2.id, cat2);
    this.categories.set(cat3.id, cat3);

    // Seed 5 Real Artworks
    const art1: ArtworkEntity = {
      id: 'art00000-0000-0000-0000-000000000001',
      title: 'ISEMBAYE',
      artistId: artist1.id,
      artistNameSnapshot: artist1.fullName,
      description: 'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.\n\nDespite the weight of history, Africa continues to rise with courage, strength, and unwavering hope. Every challenge has become a testament to the endurance of its people, whose determination refuses to be broken.\n\nThis artwork celebrates the unyielding character of Africa—its ability to withstand pain, preserve its identity, and keep moving forward. ISEMBAYE is a reminder that true strength is not found in a life without struggles, but in the courage to rise after every fall.',
      artworkStory: 'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.\n\nDespite the weight of history, Africa continues to rise with courage, strength, and unwavering hope. Every challenge has become a testament to the endurance of its people, whose determination refuses to be broken.\n\nThis artwork celebrates the unyielding character of Africa—its ability to withstand pain, preserve its identity, and keep moving forward. ISEMBAYE is a reminder that true strength is not found in a life without struggles, but in the courage to rise after every fall.',
      artistStatement: 'My work is a prayer of remembrance and a celebration of African endurance.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Mixed Media (oil paints, acrylic paints, cowries, Ghana beads, other beads, Ankara fabric, and other mixed materials)',
      materials: 'Oil paints, acrylic paints, cowries, Ghana beads, other beads, Ankara fabric, and other mixed materials',
      dimensionsFormatted: '24 × 36 inches',
      dimensionsParsed: { height: 36, width: 24, unit: 'in' },
      yearCreated: 2026,
      price: 365.0,
      originalCurrency: 'USD',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
      editionInfo: 'Original artwork: 1 available. Fine-art prints: Available separately. Print edition/quantity: To be decided.',
      signatureInfo: 'The original artwork will be signed by the artist, Rebecca Esho. Exact signature placement: [To be decided]',
      framingInfo: 'The artwork is painted on canvas and is currently unframed. Framing is not required, but framing can be arranged upon the customer\'s request.',
      fineArtPrintAvailable: true,
      fineArtPrintDetails: 'Fine-art prints are available for customers who would like a printed version of the artwork.',
      shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
      slug: 'isembaye',
      primaryImageUrl: '/images/artworks/isembaye.jpg',
      createdAt: '2026-08-09T10:00:00Z',
      updatedAt: '2026-08-09T10:00:00Z',
      publishedAt: '2026-08-09T10:00:00Z'
    };

    const art2: ArtworkEntity = {
      id: 'art00000-0000-0000-0000-000000000002',
      title: 'THIS IS OUR WAY',
      artistId: artist2.id,
      artistNameSnapshot: artist2.fullName,
      description: 'I paint this because we must not forget.\n\nHe stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers, worn close to the skin where no foreign hand can reach. Around his neck are the sacred marks of our lineage. In his hands, the beaded crown — carried from one generation to the next, not as decoration, but as declaration of who holds authority over this land. A small blue bird rests against him — a quiet messenger between us and those who came before us.\n\nOne eye sees what is in front of him. The other eye, luminous and wide open, looks inward — into our memory, into our ancestry, into everything that was nearly stolen from us.\n\nBehind him stand the mud walls of our home. The earth that bore us. The ground that was never truly surrendered, no matter what they said.\n\nThey came. They placed their own people in charge to rule over us. They told us our ways were worthless — that the beaded crown, the cloth of our fathers, the pride of Odua, the morning call of Ilé Karo Ojire — that these things had no value. Some of us believed them. Some of us traded our ancestral garment for their fashion, forgetting that underneath every new garment, we are still wearing the kijipa. We are still us.\n\nBut nothing changed what we are. We are Odua\'s children. We are black. We are one. Our culture did not die — it waited. And now we choose to come back to it, not with shame, but with pride. We are not bastards of this soil. We resist. We return. We decolonize — not just our land, but our minds.\n\nWe will never trade the way of our fathers to anyone. This is us. This has always been us.',
      artworkStory: 'I paint this because we must not forget. He stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers, worn close to the skin where no foreign hand can reach. Around his neck are the sacred marks of our lineage. In his hands, the beaded crown — carried from one generation to the next, not as decoration, but as declaration of who holds authority over this land. A small blue bird rests against him — a quiet messenger between us and those who came before us.\n\nOne eye sees what is in front of him. The other eye, luminous and wide open, looks inward — into our memory, into our ancestry, into everything that was nearly stolen from us.\n\nBehind him stand the mud walls of our home. The earth that bore us. The ground that was never truly surrendered, no matter what they said.\n\nThey came. They placed their own people in charge to rule over us. They told us our ways were worthless — that the beaded crown, the cloth of our fathers, the pride of Odua, the morning call of Ilé Karo Ojire — that these things had no value. Some of us believed them. Some of us traded our ancestral garment for their fashion, forgetting that underneath every new garment, we are still wearing the kijipa. We are still us.\n\nBut nothing changed what we are. We are Odua\'s children. We are black. We are one. Our culture did not die — it waited. And now we choose to come back to it, not with shame, but with pride. We are not bastards of this soil. We resist. We return. We decolonize — not just our land, but our minds.\n\nWe will never trade the way of our fathers to anyone. This is us. This has always been us.',
      artistStatement: 'Decolonization begins in the mind and lives through our visual heritage.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil on Canvas',
      materials: 'Oil on Canvas',
      dimensionsFormatted: '30 × 36 inches',
      dimensionsParsed: { height: 36, width: 30, unit: 'in' },
      yearCreated: 2026,
      price: 250000.0,
      originalCurrency: 'NGN',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
      editionInfo: 'Original artwork: 1 available. Fine-art prints: [To be provided]. Print edition/quantity: [To be decided]',
      signatureInfo: 'The original artwork will be signed by the artist, Kolawole Adedeji. Exact signature placement: [To be decided]',
      framingInfo: 'The artwork is painted on canvas and is currently unframed. Framing is not required, but framing can be arranged upon the customer\'s request.',
      fineArtPrintAvailable: true,
      fineArtPrintDetails: 'Available on demand',
      shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
      slug: 'this-is-our-way',
      primaryImageUrl: '/images/artworks/this_is_our_way.jpg',
      createdAt: '2026-08-09T11:00:00Z',
      updatedAt: '2026-08-09T11:00:00Z',
      publishedAt: '2026-08-09T11:00:00Z'
    };

    const art3: ArtworkEntity = {
      id: 'art00000-0000-0000-0000-000000000003',
      title: 'THE FIRST DIALOGUE',
      artistId: artist2.id,
      artistNameSnapshot: artist2.fullName,
      description: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria. It explores the moment when conversations began that would profoundly shape the continent\'s history.\n\nThe painting expresses the idea that the intentions behind those early meetings were not fully understood by our ancestors. What appeared to be an exchange of knowledge and faith eventually led to lasting political, economic, and cultural changes that transformed African societies.\n\nThe striking yellow line running through the composition symbolizes the boundary where that first dialogue took place. It is more than a visual element—it represents the dividing line between Africa\'s past and the new reality that followed. It marks the moment when history changed direction.\n\nInspired by the words often attributed to Jomo Kenyatta:\n\n“When the missionaries arrived, the Africans had the land and the missionaries had the Bible. They taught us to pray with our eyes closed. When we opened them, they had the land and we had the Bible.”\n\nThis artwork is also a call to preserve Africa\'s cultural identity. Languages may fade, traditions may evolve, but culture remains the strongest expression of who we are and where we come from. As long as The First Dialogue exists, that defining conversation—and the lessons it carries—will continue to inspire reflection for generations to come.',
      artworkStory: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria. It explores the moment when conversations began that would profoundly shape the continent\'s history.\n\nThe artwork reflects on how an encounter that appeared to involve an exchange of knowledge and faith eventually contributed to lasting political, economic, and cultural changes across African societies.\n\nThe striking yellow line symbolizes the boundary where that first dialogue took place—the dividing line between Africa\'s past and the new reality that followed.\n\nThe artwork ultimately calls for the preservation of Africa\'s cultural identity and encourages reflection on the historical encounter and the lessons it carries for future generations.',
      artistStatement: 'History is a mirror through which contemporary African society understands its present.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil on Canvas',
      materials: 'Oil on Canvas',
      dimensionsFormatted: '30 × 36 inches',
      dimensionsParsed: { height: 36, width: 30, unit: 'in' },
      yearCreated: 2025,
      price: 182.0,
      originalCurrency: 'USD',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
      editionInfo: 'Original artwork: 1 available. Fine-art prints: [To be provided]. Print edition/quantity: [To be decided]',
      signatureInfo: 'The original artwork will be signed by the artist, Kolawole Adedeji. Exact signature placement: [To be decided]',
      framingInfo: 'The artwork is painted on canvas and is sold unframed. Framing is available upon the customer\'s request and will be provided at an additional cost.',
      fineArtPrintAvailable: false,
      fineArtPrintDetails: '[To be provided]',
      shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
      slug: 'the-first-dialogue',
      primaryImageUrl: '/images/artworks/the_first_dialogue.jpg',
      createdAt: '2026-08-09T12:00:00Z',
      updatedAt: '2026-08-09T12:00:00Z',
      publishedAt: '2026-08-09T12:00:00Z'
    };

    const art4: ArtworkEntity = {
      id: 'art00000-0000-0000-0000-000000000004',
      title: 'UNDER OUR NEW GARMENT',
      artistId: artist2.id,
      artistNameSnapshot: artist2.fullName,
      description: 'At first glance, you see the bold red hat, the tailored modern jacket, and the bright blue turtleneck. But look closer—that is not the whole story.\n\nUnder Our New Garment is a deeply personal self-portrait and a reflection on the identity of modern Africa. It tells the story of a people who have embraced aspects of the modern world while refusing to abandon the heritage that defines them.\n\nGrowing up, my father sewed traditional clothing for our family. Today, although I wear contemporary fashion, I carry those memories and values with me. Beneath every new garment lies an older identity that continues to shape who I am.\n\nThe cowrie shells resting on my chest are far more than ornaments. Throughout West and Central Africa, they have symbolized wealth, spirituality, wisdom, prosperity, and a sacred connection to our ancestors. They represent a cultural inheritance that cannot be replaced by changing fashions or modern lifestyles.\n\nThe modern clothing symbolizes education, globalization, technology, and the opportunities of today\'s world. The cowries remind us that progress should never require the loss of our identity. We can embrace the future without abandoning the traditions, stories, and values that gave us life.\n\nUnder Our New Garment is a visual statement that African identity is layered, resilient, and enduring. It challenges viewers to reflect on the balance between cultural evolution and cultural preservation.\n\nProgress does not mean forgetting. It means carrying your roots with pride as you move forward.\n\nWhat are you wearing under your new garment?',
      artworkStory: 'Under Our New Garment is a deeply personal self-portrait and a reflection on the identity of modern Africa. It explores the relationship between contemporary life and the cultural heritage that continues to shape African identity.\n\nThe artwork reflects on how education, globalization, technology, and modern fashion can coexist with traditions, memories, values, and ancestral heritage.\n\nThe cowrie shells represent cultural inheritance, while the modern clothing represents the opportunities and realities of the contemporary world. Together, they communicate the idea that progress does not have to mean abandoning one\'s roots.',
      artistStatement: 'Progress does not mean forgetting. It means carrying your roots with pride.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil on Canvas',
      materials: 'Oil Paint, Embedded Natural Cowrie Shells',
      dimensionsFormatted: '30 × 36 inches',
      dimensionsParsed: { height: 36, width: 30, unit: 'in' },
      yearCreated: 2025,
      price: 182.0,
      originalCurrency: 'USD',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
      editionInfo: 'Original artwork: 1 available. Fine-art prints: [To be provided]. Print edition/quantity: [To be decided]',
      signatureInfo: 'The original artwork will be signed by the artist, Kolawole Adedeji. Exact signature placement: [To be decided]',
      framingInfo: 'The artwork is painted on canvas and is sold unframed. Framing is available upon the customer\'s request and will be provided at an additional cost.',
      fineArtPrintAvailable: true,
      fineArtPrintDetails: 'Available on Demand',
      shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
      slug: 'under-our-new-garment',
      primaryImageUrl: '/images/artworks/under_our_new_garment.jpg',
      createdAt: '2026-08-09T13:00:00Z',
      updatedAt: '2026-08-09T13:00:00Z',
      publishedAt: '2026-08-09T13:00:00Z'
    };

    const art5: ArtworkEntity = {
      id: 'art00000-0000-0000-0000-000000000005',
      title: 'Thought of Hope',
      artistId: artist3.id,
      artistNameSnapshot: artist3.fullName,
      description: 'Thought of Hope explores the suffering, torment, and hopelessness experienced by less privileged people in Nigeria and Africa as a whole.\n\nThe artwork reflects on a society where the wealthy remain greedy, the poor remain in need, and those in positions of leadership continue to take without adequately returning to or maintaining the resources and systems that should benefit society.\n\nIt questions the promises made to young people and the realities they face, particularly the promise that education is the key to success and that young people are the leaders of tomorrow.\n\nThe work draws attention to the obstacles that can suppress dreams, waste time, and prevent people from reaching their potential.\n\nAt its heart, the artwork asks a difficult but important question: Is there hope for tomorrow? Is it truly going to be alright?',
      artworkStory: 'This artwork signifies the suffering, torment, and hopeless life of the less privileged in Nigeria and Africa as a whole, where the rich stay greedy and the poor remain in need, while leaders keep taking without returning to or maintaining the source for the benefit of society.\n\nThey said education is the key to success, but they changed the padlock.\n\nThey said young ones are the leaders of tomorrow, but the seat became family property.\n\nThey become giant tigers and obstacles, killing dreams and wasting the time of their own people.\n\nThe question now is: Is there hope in tomorrow? Is it truly going to be alright?',
      artistStatement: 'Art must give voice to the unspoken questions of our youth.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil Paint on Canvas',
      materials: 'Oil Paint on Canvas',
      dimensionsFormatted: '2 × 3 feet (24 × 36 inches)',
      dimensionsParsed: { height: 36, width: 24, unit: 'in' },
      yearCreated: 2025,
      price: 182.0,
      originalCurrency: 'USD',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      certificateDetails: 'A Certificate of Authenticity will be issued immediately after purchase and provided to the buyer together with the artwork upon delivery.',
      editionInfo: 'Original artwork: 1 available. Fine-art prints: Available on request. Print edition/quantity: [To be decided]',
      signatureInfo: 'The original artwork will be signed by the artist, Okunlola Olamilekan J. (Palette). Exact signature placement: [To be decided]',
      framingInfo: 'The artwork is painted on canvas and is sold unframed. Framing is available upon the customer\'s request and will be provided at an additional cost.',
      fineArtPrintAvailable: true,
      fineArtPrintDetails: 'Fine-art prints are available on request.',
      shippingInfoNotes: 'The artwork will be shipped or delivered to the customer. Shipping/delivery fee depends on the customer\'s location and distance.',
      slug: 'thought-of-hope',
      primaryImageUrl: '/images/artworks/thought_of_hope.jpg',
      createdAt: '2026-08-09T14:00:00Z',
      updatedAt: '2026-08-09T14:00:00Z',
      publishedAt: '2026-08-09T14:00:00Z'
    };

    const artworksList = [art1, art2, art3, art4, art5];
    artworksList.forEach((art) => {
      this.artworks.set(art.id, art);
      
      // Initialize Inventory
      this.inventory.set(art.id, {
        id: `inv-${art.id}`,
        artworkId: art.id,
        quantity: art.quantity,
        reservedQuantity: 0,
        availableQuantity: art.quantity,
        status: 'in_stock',
        lastUpdated: art.updatedAt
      });
      
      // Initialize Artwork Images
      this.artworkImages.set(art.id, [
        {
          id: `img-${art.id}-1`,
          artworkId: art.id,
          imageUrl: art.primaryImageUrl,
          imageType: 'primary',
          displayOrder: 1,
          isPrimary: true,
          altText: `${art.title} by ${art.artistNameSnapshot}`,
          createdAt: art.createdAt
        }
      ]);
    });
  }
}

// Global Singleton Store Instance
export const dbStore = new DatabaseMemoryStore();
