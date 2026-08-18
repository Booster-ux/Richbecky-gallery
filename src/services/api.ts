/**
 * Richbecky Gallery — Stage 2 Development API Service Bridge
 * 
 * Provides clean asynchronous API methods connecting the frontend application
 * directly to Stage 1 & Stage 2 backend services, repositories, and security guards.
 */

import {
  UserBackendService,
  ArtistBackendService,
  ArtworkBackendService,
  OrderBackendService,
  CommissionBackendService,
  AuthService,
  RBACService,
  dbStore,
  UserModel,
  CustomerModel,
  ArtistModel,
  ArtistApplicationModel,
  ArtworkModel,
  OrderModel,
  WishlistModel,
  NotificationModel,
  AuditRecordModel,
  UserEntity,
  ArtworkEntity,
  ArtistEntity,
  ArtistApplicationEntity,
  OrderEntity,
  WishlistEntity,
  AuditRecordEntity,
  CommissionEntity,
  CustomerAddressEntity
} from '../backend';

import {
  Artwork,
  Artist,
  Category,
  User,
  Order,
  CartItem,
  WishlistItem,
  ArtistApplication,
  CustomerProfile as FrontendCustomerProfile,
  NotificationItem,
  UserRole,
  CurrencyCode,
  OrderFulfillmentStatus
} from '../types';

import { getProductionImageUrl } from './imageService';
import { SupabaseService } from './supabaseService';

// =============================================================================
// BACKEND TO FRONTEND DATA MAPPERS
// =============================================================================

export function mapBackendArtworkToFrontend(art: ArtworkEntity): Artwork {
  return {
    id: art.id,
    title: art.title,
    artistId: art.artistId,
    artistName: art.artistNameSnapshot,
    artistAvatar: getProductionImageUrl(art.primaryImageUrl, art.title),
    type: art.artworkType,
    category: art.categoryNameSnapshot,
    medium: art.medium,
    materials: art.materials,
    dimensions: art.dimensionsFormatted,
    parsedDimensions: art.dimensionsParsed ? {
      ...art.dimensionsParsed,
      formatted: art.dimensionsFormatted
    } : undefined,
    year: art.yearCreated,
    price: art.price,
    currency: art.originalCurrency,
    stock: art.quantity,
    availability: art.availability,
    isSold: art.availability === 'Sold',
    isFeatured: art.isFeatured,
    isNewArrival: art.isNewArrival,
    imageUrl: getProductionImageUrl(art.primaryImageUrl, art.title),
    additionalImages: [getProductionImageUrl(art.primaryImageUrl, art.title)],
    description: art.description,
    artistStatement: art.artistStatement,
    artworkStory: art.artworkStory,
    editionInfo: art.editionInfo,
    editionNumber: art.editionNumber,
    editionTotal: art.editionTotal,
    editionType: art.editionType,
    signatureInfo: art.signatureInfo,
    framingInfo: art.framingInfo,
    shippingInfoNotes: art.shippingInfoNotes,
    shippingDetails: art.shippingDetails || art.shippingInfoNotes,
    specialHandling: art.specialHandling,
    certificateIncluded: art.certificateIncluded,
    certificateNumber: art.certificateNumber,
    certificateDetails: art.certificateDetails,
    fineArtPrintAvailable: art.fineArtPrintAvailable,
    fineArtPrintDetails: art.fineArtPrintDetails,
    status: art.status as any,
    createdAt: art.createdAt
  };
}

export function mapBackendArtistToFrontend(artist: ArtistEntity): Artist {
  return {
    id: artist.id,
    name: artist.fullName,
    avatar: getProductionImageUrl(artist.profileImage, artist.fullName),
    coverImage: getProductionImageUrl(artist.coverImage || artist.profileImage, artist.fullName),
    bio: artist.biography,
    country: artist.country,
    exhibitionsCount: artist.exhibitionsCount,
    artworksCount: artist.artworksCount,
    isFollowed: true,
    commissionRate: artist.commissionRate,
    status: artist.status,
    socialLinks: {
      website: artist.website,
      instagram: artist.socialLinks.instagram,
      twitter: artist.socialLinks.twitter
    }
  };
}

export function mapBackendUserToFrontend(user: UserEntity): User {
  const customer = CustomerModel.findByUserId(user.id);
  const artist = ArtistModel.findByUserId(user.id);

  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    country: artist ? artist.country : 'Nigeria',
    preferredCurrency: customer ? customer.preferredCurrency : 'USD',
    avatar: user.profileImage || (artist ? artist.profileImage : undefined),
    artistApprovalStatus: artist ? artist.approvalStatus : undefined
  };
}

export function mapBackendOrderToFrontend(order: OrderEntity): Order {
  const lineItems = dbStore.orderItems.get(order.id) || [];
  
  const items: CartItem[] = lineItems.map(item => {
    const art = dbStore.artworks.get(item.artworkId);
    const mappedArt: Artwork = art ? mapBackendArtworkToFrontend(art) : {
      id: item.artworkId,
      title: item.artworkTitleSnapshot,
      artistId: item.artistId,
      artistName: 'Gallery Artist',
      type: item.artworkTypeSnapshot,
      category: 'Figurative',
      medium: 'Oil on Canvas',
      dimensions: 'Standard',
      year: 2026,
      price: item.originalListingPrice,
      currency: item.originalListingCurrency,
      stock: 1,
      imageUrl: '/images/artworks/isembaye.jpg',
      description: 'Gallery Original Artwork',
      certificateIncluded: true,
      status: 'Approved',
      createdAt: item.createdAt
    };

    return {
      artwork: mappedArt,
      quantity: item.quantity
    };
  });

  return {
    id: order.id,
    date: order.orderDate,
    items,
    subtotal: order.subtotal,
    shippingFee: order.shippingFee,
    total: order.total,
    displayCurrency: order.displayCurrency,
    shippingInfo: order.shippingAddress,
    paymentMethod: order.paymentMethod === 'Pending Selection' ? 'Card' : order.paymentMethod,
    status: order.status as OrderFulfillmentStatus,
    trackingNumber: order.trackingNumber
  };
}

// =============================================================================
// API SERVICE HANDLERS
// =============================================================================

export const ApiService = {
  // 1. AUTHENTICATION & SESSION
  auth: {
    loginCustomer: (email: string, pass: string): { success: boolean; user?: User; message?: string } => {
      try {
        const session = UserBackendService.loginUser(email);
        const frontendUser = mapBackendUserToFrontend(session.user as UserEntity);
        localStorage.setItem('rbg_auth_user', JSON.stringify(frontendUser));
        return { success: true, user: frontendUser };
      } catch (err: any) {
        return { success: false, message: err.message || 'Invalid credentials' };
      }
    },

    registerCustomer: (data: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      country: string;
      preferredCurrency: CurrencyCode;
    }): { success: boolean; user?: User; message?: string } => {
      try {
        const session = UserBackendService.registerCustomer({
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone
        });
        
        // Update customer preferred currency
        const customer = CustomerModel.findByUserId(session.user.id);
        if (customer) {
          CustomerModel.updatePreferredCurrency(customer.id, data.preferredCurrency);
        }

        const frontendUser = mapBackendUserToFrontend(session.user as UserEntity);
        localStorage.setItem('rbg_auth_user', JSON.stringify(frontendUser));
        return { success: true, user: frontendUser };
      } catch (err: any) {
        return { success: false, message: err.message || 'Registration failed' };
      }
    },

    loginArtist: (email: string, pass: string): { success: boolean; user?: User; message?: string } => {
      try {
        const session = UserBackendService.loginUser(email);
        if (session.user.role !== 'artist') {
          return { success: false, message: 'Account is not registered as an Artist.' };
        }
        const frontendUser = mapBackendUserToFrontend(session.user as UserEntity);
        localStorage.setItem('rbg_auth_user', JSON.stringify(frontendUser));
        return { success: true, user: frontendUser };
      } catch (err: any) {
        return { success: false, message: err.message || 'Artist login failed' };
      }
    },

    loginAdmin: (email: string, pass: string): { success: boolean; user?: User; message?: string } => {
      try {
        const cleanEmail = email.toLowerCase().trim();
        let role: UserRole = 'admin';
        let name = 'Executive Director';

        if (cleanEmail.includes('owner')) {
          role = 'owner_content';
          name = 'Owner & Content Manager';
        } else if (cleanEmail.includes('support')) {
          role = 'admin_support';
          name = 'Administrative & Customer Support';
        } else if (cleanEmail.includes('developer') || cleanEmail.includes('dev')) {
          role = 'web_developer';
          name = 'Web Developer & Infrastructure Engineer';
        } else {
          role = 'admin';
          name = 'Executive Director';
        }

        const teamUser: User = {
          id: `u-${role}-${Date.now()}`,
          email: cleanEmail,
          name: name,
          firstName: name.split(' ')[0],
          lastName: name.split(' ').slice(1).join(' ') || 'Admin',
          role: role
        };

        localStorage.setItem('rbg_auth_user', JSON.stringify(teamUser));
        return { success: true, user: teamUser };
      } catch (err: any) {
        return { success: false, message: err.message || 'Team authentication failed' };
      }
    },

    getCurrentUser: (): User | null => {
      const stored = localStorage.getItem('rbg_auth_user');
      if (!stored) return null;
      try {
        return JSON.parse(stored) as User;
      } catch {
        return null;
      }
    },

    logout: (): void => {
      localStorage.removeItem('rbg_auth_user');
    }
  },

  // 2. ARTWORKS & CATALOGUE
  artworks: {
    getCatalog: (): Artwork[] => {
      const backendArtworks = ArtworkBackendService.getPublicCatalog();
      return backendArtworks.map(mapBackendArtworkToFrontend);
    },

    getAllForAdmin: (): Artwork[] => {
      const backendArtworks = ArtworkModel.findAll();
      return backendArtworks.map(mapBackendArtworkToFrontend);
    },

    submitArtwork: (actorRole: 'artist' | 'admin', artworkData: Omit<Artwork, 'id' | 'createdAt' | 'status'>): Artwork => {
      const safePrimaryImage = getProductionImageUrl(artworkData.imageUrl, artworkData.title);

      const createdBackend = ArtworkBackendService.submitNewArtwork(actorRole, {
        title: artworkData.title,
        artistId: artworkData.artistId,
        artistNameSnapshot: artworkData.artistName,
        description: artworkData.description,
        artworkStory: artworkData.artworkStory,
        artistStatement: artworkData.artistStatement,
        artworkType: artworkData.type,
        categoryId: 'c0000000-0000-0000-0000-000000000001',
        categoryNameSnapshot: artworkData.category,
        medium: artworkData.medium,
        materials: artworkData.materials,
        dimensionsFormatted: artworkData.dimensions,
        dimensionsParsed: artworkData.parsedDimensions,
        yearCreated: artworkData.year,
        price: artworkData.price,
        originalCurrency: artworkData.currency,
        availability: artworkData.availability || 'Available',
        quantity: artworkData.stock,
        status: actorRole === 'admin' ? 'Approved' : 'Pending Admin Approval',
        isFeatured: artworkData.isFeatured || false,
        isNewArrival: artworkData.isNewArrival || true,
        certificateIncluded: artworkData.certificateIncluded,
        certificateNumber: artworkData.certificateNumber,
        certificateDetails: artworkData.certificateDetails,
        editionInfo: artworkData.editionInfo,
        editionNumber: artworkData.editionNumber,
        editionTotal: artworkData.editionTotal,
        editionType: artworkData.editionType,
        signatureInfo: artworkData.signatureInfo,
        framingInfo: artworkData.framingInfo,
        fineArtPrintAvailable: artworkData.fineArtPrintAvailable,
        fineArtPrintDetails: artworkData.fineArtPrintDetails,
        shippingInfoNotes: artworkData.shippingInfoNotes,
        shippingDetails: artworkData.shippingDetails || artworkData.shippingInfoNotes,
        specialHandling: artworkData.specialHandling,
        primaryImageUrl: safePrimaryImage,
        altText: artworkData.altText || `${artworkData.title} by ${artworkData.artistName}`
      });

      // Async sync to live Supabase DB
      SupabaseService.saveArtwork(createdBackend).catch(console.error);

      return mapBackendArtworkToFrontend(createdBackend);
    },

    approveArtwork: (adminUserId: string, adminEmail: string, artworkId: string): Artwork => {
      const updated = ArtworkBackendService.approveArtwork(adminUserId, adminEmail, artworkId);
      SupabaseService.updateArtworkStatus(artworkId, 'Approved').catch(console.error);
      return mapBackendArtworkToFrontend(updated);
    },

    rejectArtwork: (adminUserId: string, adminEmail: string, artworkId: string, reason: string): Artwork => {
      const updated = ArtworkBackendService.rejectArtwork(adminUserId, adminEmail, artworkId, reason);
      SupabaseService.updateArtworkStatus(artworkId, 'Rejected').catch(console.error);
      return mapBackendArtworkToFrontend(updated);
    }
  },

  // 3. ARTISTS & APPLICATIONS
  artists: {
    getAllActive: (): Artist[] => {
      return ArtistBackendService.getAllActiveArtists().map(mapBackendArtistToFrontend);
    },

    getApplications: (): ArtistApplication[] => {
      const apps = ArtistApplicationModel.findAll();
      return apps.map(app => ({
        id: app.id,
        userId: app.userId,
        fullName: app.fullName,
        email: app.email,
        phone: app.phone,
        country: app.country,
        city: app.city,
        website: app.website,
        instagram: app.instagram,
        artistName: app.artistName,
        bio: app.bio,
        artistStatement: app.artistStatement,
        practiceAreas: app.practiceAreas,
        mediums: app.mediums,
        yearsActive: app.yearsActive,
        exhibitions: app.exhibitions,
        awards: app.awards,
        collections: app.collections,
        galleryExperience: app.galleryExperience,
        portfolioImages: app.portfolioImages,
        agreedToTerms: app.agreedToTerms,
        status: app.status,
        rejectionReason: app.rejectionReason,
        submittedAt: app.submittedAt
      }));
    },

    submitApplication: (appData: Omit<ArtistApplication, 'id' | 'status' | 'submittedAt'>): ArtistApplicationEntity => {
      const created = ArtistBackendService.submitApplication(appData);
      SupabaseService.saveArtistApplication(created).catch(console.error);
      return created;
    },

    reviewApplication: (adminUserId: string, adminEmail: string, appId: string, action: 'Approved' | 'Rejected', notes?: string, reason?: string) => {
      const result = ArtistBackendService.reviewApplication(adminUserId, adminEmail, appId, action, notes, reason);
      SupabaseService.updateArtistApplicationStatus(appId, action, reason).catch(console.error);
      return result;
    }
  },

  // 4. ORDERS & FULFILLMENT
  orders: {
    getAllOrders: (): Order[] => {
      return OrderModel.findAll().map(mapBackendOrderToFrontend);
    },

    createOrder: (data: {
      customerId: string;
      displayCurrency: CurrencyCode;
      shippingFee: number;
      shippingAddress: any;
      paymentMethod: 'Card' | 'Bank Transfer';
      items: Array<{ artworkId: string; quantity: number }>;
    }): Order => {
      const result = OrderBackendService.createCustomerOrder(data);
      return mapBackendOrderToFrontend(result.order);
    },

    updateStatus: (adminUserId: string, adminEmail: string, orderId: string, status: OrderFulfillmentStatus): Order => {
      const updated = OrderBackendService.updateFulfillmentStatus(adminUserId, adminEmail, orderId, status as any);
      return mapBackendOrderToFrontend(updated);
    }
  },

  // 5. WISHLIST & FAVOURITES
  wishlist: {
    getByCustomer: (customerId: string): WishlistEntity[] => {
      return WishlistModel.findByCustomerId(customerId);
    },

    toggle: (customerId: string, artworkId: string): WishlistEntity[] => {
      const existing = WishlistModel.findByCustomerId(customerId);
      const isSaved = existing.some(item => item.artworkId === artworkId);

      if (isSaved) {
        WishlistModel.remove(customerId, artworkId);
      } else {
        WishlistModel.add(customerId, artworkId);
      }

      return WishlistModel.findByCustomerId(customerId);
    }
  },

  // 6. ADMIN DASHBOARD & AUDIT
  admin: {
    getAuditLogs: (): AuditRecordEntity[] => {
      return AuditRecordModel.findAll();
    },

    getDashboardMetrics: () => {
      return {
        totalArtworks: dbStore.artworks.size,
        pendingArtworks: Array.from(dbStore.artworks.values()).filter(a => (a.status as string) === 'Pending Admin Approval' || (a.status as string) === 'Pending Approval').length,
        totalArtists: dbStore.artists.size,
        pendingArtistApplications: Array.from(dbStore.artistApplications.values()).filter(app => app.status === 'Pending').length,
        totalCustomers: dbStore.customers.size,
        totalOrders: dbStore.orders.size,
        commissionsCount: dbStore.commissions.size
      };
    }
  }
};
