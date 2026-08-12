/**
 * Richbecky Gallery — Backend Stage 1 Types & Interfaces
 * 
 * Strict TypeScript definition for all backend domain entities,
 * database tables, DTOs, Enums, and Security contexts.
 */

import { CurrencyCode, ArtworkType, ArtworkStatus } from '../../types';

// ==========================================
// 1. USER & AUTHENTICATION TYPES
// ==========================================

export type SystemUserRole = 'customer' | 'artist' | 'admin';
export type UserStatus = 'active' | 'pending' | 'suspended';

export interface UserEntity {
  id: string;
  email: string;
  passwordHash?: string;
  authRef?: string;
  role: SystemUserRole;
  firstName: string;
  lastName: string;
  phone?: string;
  status: UserStatus;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface AuthSession {
  user: Omit<UserEntity, 'passwordHash'>;
  token: string;
  expiresAt: string;
}

// ==========================================
// 2. CUSTOMER TYPES
// ==========================================

export interface CustomerEntity {
  id: string; // Foreign key to UserEntity.id
  userId: string;
  accountNumber: string;
  vipStatus: 'Standard' | 'Silver' | 'Gold' | 'VIP Collector';
  totalSpend: number;
  orderCount: number;
  wishlistCount: number;
  preferredCurrency: CurrencyCode;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerAddressEntity {
  id: string;
  customerId: string;
  label: string; // e.g. "Home", "Office", "Gallery Storage"
  fullName: string;
  email: string;
  phone: string;
  addressLine: string;
  city: string;
  stateRegion: string;
  country: string;
  postalZip: string;
  addressType: 'shipping' | 'billing' | 'both';
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 3. ARTIST TYPES
// ==========================================

export type ArtistStatusType = 'Active' | 'Pending Verification' | 'Suspended' | 'Rejected';
export type ApplicationStatusType = 'Pending' | 'Approved' | 'Rejected';

export interface ArtistSocialLinks {
  website?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

export interface ArtistContactInfo {
  email: string;
  phone: string;
  city?: string;
  country: string;
}

export interface ArtistEntity {
  id: string;
  userId: string; // Foreign key to UserEntity.id
  fullName: string;
  biography: string;
  artistStatement: string;
  profileImage: string;
  coverImage?: string;
  country: string;
  contactInfo: ArtistContactInfo;
  socialLinks: ArtistSocialLinks;
  website?: string;
  exhibitionsCount: number;
  artworksCount: number;
  commissionRate: number; // e.g. 15.0 for 15% gallery commission
  status: ArtistStatusType;
  approvalStatus: ApplicationStatusType;
  registrationDate: string;
  approvedDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArtistApplicationEntity {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  website?: string;
  instagram?: string;
  artistName: string;
  bio: string;
  artistStatement?: string;
  practiceAreas?: string;
  mediums: string;
  yearsActive: number;
  exhibitions?: string;
  awards?: string;
  collections?: string;
  galleryExperience?: string;
  portfolioImages: string[];
  agreedToTerms: boolean;
  status: ApplicationStatusType;
  rejectionReason?: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewerId?: string;
  adminNotes?: string;
}

// ==========================================
// 4. CATEGORY TYPES
// ==========================================

export interface CategoryEntity {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
  artworkCount: number;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 5. ARTWORK & INVENTORY TYPES
// ==========================================

export interface ArtworkParsedDimensions {
  height?: number;
  width?: number;
  depth?: number;
  unit?: 'cm' | 'in';
}

export interface ArtworkEntity {
  id: string;
  title: string;
  artistId: string;
  artistNameSnapshot: string;
  description: string;
  artworkStory?: string;
  artistStatement?: string;
  artworkType: ArtworkType; // 'Original' | 'Fine Art Print'
  categoryId: string;
  categoryNameSnapshot: string;
  medium: string;
  materials?: string;
  dimensionsFormatted: string;
  dimensionsParsed?: ArtworkParsedDimensions;
  yearCreated: number;
  price: number; // Numerical listing price in original listing currency
  originalCurrency: CurrencyCode;
  availability: 'Available' | 'Sold' | 'Reserved' | 'Not for sale';
  quantity: number; // For Original Artwork: restricted to 1; For Fine Art Print: >= 0
  status: ArtworkStatus | 'Published' | 'Sold';
  isFeatured: boolean;
  isNewArrival: boolean;
  certificateIncluded: boolean;
  editionInfo?: string;
  editionNumber?: string;
  editionTotal?: string;
  editionType?: 'Open Edition' | 'Limited Edition';
  signatureInfo?: string;
  framingInfo?: string;
  shippingInfoNotes?: string;
  shippingPrepTime?: string;
  specialHandling?: string;
  slug: string;
  primaryImageUrl: string;
  altText?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface ArtworkImageEntity {
  id: string;
  artworkId: string;
  imageUrl: string;
  imageType: 'primary' | 'gallery' | 'detail' | 'certificate';
  displayOrder: number;
  isPrimary: boolean;
  altText?: string;
  createdAt: string;
}

export type InventoryStatusType = 'in_stock' | 'low_stock' | 'out_of_stock' | 'reserved';

export interface InventoryEntity {
  id: string;
  artworkId: string;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number; // quantity - reservedQuantity
  status: InventoryStatusType;
  lastUpdated: string;
}

// ==========================================
// 6. ORDER & ORDER ITEM TYPES
// ==========================================

export type DatabaseOrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Refunded';
export type DatabasePaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface OrderShippingInfoSnapshot {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  stateRegion?: string;
  country: string;
  zipCode: string;
}

export interface OrderEntity {
  id: string;
  orderNumber: string; // Unique human readable ID, e.g., "RBG-2026-0081"
  customerId: string;
  orderDate: string;
  status: DatabaseOrderStatus;
  paymentStatus: DatabasePaymentStatus;
  displayCurrency: CurrencyCode; // Customer's chosen checkout display currency
  subtotal: number; // Stored in displayCurrency
  shippingFee: number; // Stored in displayCurrency
  total: number; // Stored in displayCurrency
  shippingAddress: OrderShippingInfoSnapshot;
  billingAddress?: OrderShippingInfoSnapshot;
  paymentMethod: 'Card' | 'Bank Transfer' | 'Pending Selection';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemEntity {
  id: string;
  orderId: string;
  artworkId: string;
  artistId: string;
  artworkTitleSnapshot: string;
  artworkTypeSnapshot: ArtworkType;
  quantity: number;
  
  // Historical listing price in artist's original listing currency
  originalListingPrice: number;
  originalListingCurrency: CurrencyCode;
  
  // Converted price shown to customer at time of checkout
  applicableDisplayedPrice: number;
  displayCurrency: CurrencyCode;
  
  // Commission snapshots
  commissionRate: number; // e.g. 15%
  artistShareAmount: number; // in originalListingCurrency
  galleryShareAmount: number; // in originalListingCurrency
  
  createdAt: string;
}

// ==========================================
// 7. WISHLIST & FAVOURITES TYPES
// ==========================================

export interface WishlistEntity {
  id: string;
  customerId: string;
  artworkId: string;
  createdAt: string;
}

// ==========================================
// 8. COMMISSION & PAYOUT TYPES
// ==========================================

export type CommissionStatusType = 'pending' | 'calculated' | 'approved' | 'disputed';
export type PayoutStatusType = 'unpaid' | 'processing' | 'paid' | 'failed';

export interface CommissionEntity {
  id: string;
  orderId: string;
  orderItemId: string;
  artistId: string;
  saleAmount: number; // Original listing price
  currency: CurrencyCode; // Original listing currency
  commissionPercentage: number; // Gallery rate (e.g., 15%)
  artistShare: number; // Sale amount * (100 - commissionPercentage) / 100
  galleryShare: number; // Sale amount * commissionPercentage / 100
  commissionStatus: CommissionStatusType;
  payoutStatus: PayoutStatusType;
  payoutId?: string;
  createdAt: string;
  updatedAt: string;
}

// ==========================================
// 9. NOTIFICATION TYPES
// ==========================================

export type NotificationRecipientRole = 'customer' | 'artist' | 'admin';
export type NotificationType = 'order' | 'submission' | 'enquiry' | 'payout' | 'artist' | 'system';

export interface NotificationEntity {
  id: string;
  recipientId: string; // Foreign key to UserEntity.id
  recipientRole: NotificationRecipientRole;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

// ==========================================
// 10. ADMIN AUDIT & ACTIVITY TYPES
// ==========================================

export interface AuditRecordEntity {
  id: string;
  actorId: string; // FK to UserEntity.id
  actorEmail: string;
  actorRole: SystemUserRole;
  action: string; // e.g. "ARTIST_APPROVED", "ARTWORK_REJECTED", "ORDER_STATUS_UPDATED"
  affectedEntity: string; // e.g. "Artist", "Artwork", "Order"
  affectedEntityId: string;
  metadata?: Record<string, unknown>;
  timestamp: string;
}

// ==========================================
// 11. WEBSITE CONTENT & POLICIES TYPES
// ==========================================

export interface WebsiteContentEntity {
  id: string;
  sectionKey: string; // e.g., "homepage_hero", "about_gallery", "contact_info"
  title: string;
  contentData: Record<string, unknown>;
  isPublished: boolean;
  updatedAt: string;
}

export type PolicyType = 'privacy' | 'terms' | 'shipping' | 'returns' | 'artist_agreement' | 'copyright';

export interface PolicyEntity {
  id: string;
  policyType: PolicyType;
  title: string;
  slug: string;
  content: string;
  version: string; // e.g., "1.0.0"
  isActive: boolean;
  updatedAt: string;
}

export interface EnquiryEntity {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  enquiryType: string;
  artworkId?: string;
  artworkTitle?: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved';
  replyNotes?: string;
  date: string;
}
