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
  }

  private seedDefaults(): void {
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
      contactInfo: { email: 'rebecca.esho@richbeckygallery.com', phone: '+2348000000002' },
      socialLinks: { website: 'https://richbeckygallery.com', instagram: '@rebeccaesho_art' },
      website: 'https://richbeckygallery.com',
      exhibitionsCount: 0,
      artworksCount: 2,
      commissionRate: 15.0,
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
      contactInfo: { email: 'kolawole.adedeji@richbeckygallery.com', phone: '+2348000000003' },
      socialLinks: { website: 'https://richbeckygallery.com', instagram: '@kolawole_art' },
      website: 'https://richbeckygallery.com',
      exhibitionsCount: 0,
      artworksCount: 2,
      commissionRate: 15.0,
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
      contactInfo: { email: 'okunlola.palette@richbeckygallery.com', phone: '+2348000000004' },
      socialLinks: { website: 'https://richbeckygallery.com', instagram: '@palette_olamilekan' },
      website: 'https://richbeckygallery.com',
      exhibitionsCount: 0,
      artworksCount: 1,
      commissionRate: 15.0,
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
      name: 'Figurative',
      slug: 'figurative',
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
      description: 'ISEMBAYE is a visual tribute to the resilience of Africa. It tells the story of a continent that has endured centuries of hardship, exploitation, and adversity, yet has never lost its spirit.',
      artworkStory: 'Inspired by traditional royal Yoruba beadwork and indigenous woven textiles.',
      artistStatement: 'My work is a prayer of remembrance and a celebration of African endurance.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil, Traditional Beading & Fabric Collage on Canvas',
      materials: 'Oil Paint, Handcrafted Glass Beads, Vintage African Kijipa Fabric',
      dimensionsFormatted: '60 x 90 cm (23.6 x 35.4 in)',
      dimensionsParsed: { height: 90, width: 60, unit: 'cm' },
      yearCreated: 2026,
      price: 365.0,
      originalCurrency: 'USD',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      editionInfo: '1-of-1 Original Masterpiece',
      signatureInfo: 'Signed & Dated front bottom right: Rebecca Esho 2026',
      shippingInfoNotes: 'Crated in custom wooden box, insured global air transit.',
      slug: 'isembaye',
      primaryImageUrl: '/images/artworks/isembaye.jpg',
      createdAt: '2026-08-09T10:00:00Z',
      updatedAt: '2026-08-09T10:00:00Z',
      publishedAt: '2026-08-09T10:00:00Z'
    };

    const art2: ArtworkEntity = {
      id: 'art00000-0000-0000-0000-000000000002',
      title: 'THIS IS OUR WAY',
      artistId: artist1.id,
      artistNameSnapshot: artist1.fullName,
      description: 'I paint this because we must not forget. He stands in the land that belongs to us — dressed in the woven stripes of who we are, the kijipa, the old cloth of our fathers...',
      artworkStory: 'Depicts an elder guardian holding the beaded crown of Odua.',
      artistStatement: 'Decolonization begins in the mind and lives through our visual heritage.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil on Canvas',
      materials: 'Heavy Duty Linen Canvas, Artist-Grade Windsor Oil Paints',
      dimensionsFormatted: '30 x 36 inches (76.2 x 91.4 cm)',
      dimensionsParsed: { height: 91.4, width: 76.2, unit: 'cm' },
      yearCreated: 2026,
      price: 250000.0,
      originalCurrency: 'NGN',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      editionInfo: '1-of-1 Original Masterpiece',
      signatureInfo: 'Signed & Dated reverse canvas: Rebecca Esho 2026',
      shippingInfoNotes: 'Stretched canvas, corner padding, sealed waterproof wrap.',
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
      description: 'The First Dialogue reflects on the historic encounter between Europeans and the indigenous people of Africa, particularly within what is now Nigeria.',
      artworkStory: 'Explores early European-African encounters in West Africa.',
      artistStatement: 'History is a mirror through which contemporary African society understands its present.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil on Canvas',
      materials: 'Oil Paint, Gold Foil Accents',
      dimensionsFormatted: '30 x 36 inches (76.2 x 91.4 cm)',
      dimensionsParsed: { height: 91.4, width: 76.2, unit: 'cm' },
      yearCreated: 2025,
      price: 250000.0,
      originalCurrency: 'NGN',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      editionInfo: '1-of-1 Original Masterpiece',
      signatureInfo: 'Signed lower left: Kolawole Adedeji -25',
      shippingInfoNotes: 'Insured international transit.',
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
      description: 'At first glance, you see the bold red hat, the tailored modern jacket, and the bright blue turtleneck. But look closer—that is not the whole story.',
      artworkStory: 'Self-portrait exploring modern African identity layered over ancestral memory.',
      artistStatement: 'Progress does not mean forgetting. It means carrying your roots with pride.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil on Canvas',
      materials: 'Oil Paint, Embedded Natural Cowrie Shells',
      dimensionsFormatted: '30 x 36 inches (76.2 x 91.4 cm)',
      dimensionsParsed: { height: 91.4, width: 76.2, unit: 'cm' },
      yearCreated: 2025,
      price: 250000.0,
      originalCurrency: 'NGN',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      editionInfo: '1-of-1 Original Masterpiece',
      signatureInfo: 'Signed & Dated bottom left: Kolawole Adedeji 2025',
      shippingInfoNotes: 'Custom wood crate with moisture barrier.',
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
      description: 'This art piece signifies the suffering, tormenting, and challenging lives of the less privileged in Nigeria and Africa as a whole study...',
      artworkStory: 'Reflects social advocacy and youth economic resilience in modern Nigeria.',
      artistStatement: 'Art must give voice to the unspoken questions of our youth.',
      artworkType: 'Original Artwork',
      categoryId: cat1.id,
      categoryNameSnapshot: cat1.name,
      medium: 'Oil Paint on Canvas',
      materials: 'Artist-Grade Oil Pigments on Heavy Canvas',
      dimensionsFormatted: '2 x 3 ft (24 x 36 in / 60.9 x 91.4 cm)',
      dimensionsParsed: { height: 91.4, width: 60.9, unit: 'cm' },
      yearCreated: 2026,
      price: 250000.0,
      originalCurrency: 'NGN',
      availability: 'Available',
      quantity: 1,
      status: 'Approved',
      isFeatured: true,
      isNewArrival: true,
      certificateIncluded: true,
      editionInfo: '1-of-1 Original Masterpiece',
      signatureInfo: 'Signed lower right: Okunlola Olamilekan.J \'26 (Palette)',
      shippingInfoNotes: 'Insured gallery box packaging.',
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
