export type ArtworkType = 'Original' | 'Original Artwork' | 'Fine Art Print';

export type ArtworkStatus = 'Approved' | 'Pending Admin Approval' | 'Pending Approval' | 'Rejected' | 'Draft' | 'Archived' | 'Sold' | 'Published';

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
}

export interface ArtworkDimensions {
  height?: number;
  width?: number;
  depth?: number;
  unit?: 'cm' | 'in';
  formatted: string;
}

export interface Artwork {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  artistAvatar?: string;
  type: ArtworkType;
  category: string;
  medium: string;
  materials?: string;
  dimensions: string;
  parsedDimensions?: ArtworkDimensions;
  year: number;
  price: number; // Stored numerical price (original artist input)
  currency: CurrencyCode; // Stored original currency code
  stock: number; // 1 for Original, N for Fine Art Print
  availability?: 'Available' | 'Sold' | 'Reserved' | 'Not for sale';
  isSold?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  shortDescription?: string;
  artistStatement?: string;
  artworkStory?: string;
  editionInfo?: string;
  editionNumber?: string;
  editionTotal?: string;
  editionType?: 'Open Edition' | 'Limited Edition';
  signatureInfo?: string;
  framingInfo?: string;
  shippingInfoNotes?: string;
  shippingDetails?: string;
  shippingPrepTime?: string;
  specialHandling?: string;
  altText?: string;
  certificateIncluded: boolean;
  certificateNumber?: string;
  certificateDetails?: string;
  fineArtPrintAvailable?: boolean;
  fineArtPrintDetails?: string;
  status: ArtworkStatus;
  createdAt: string;
}

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  country: string;
  exhibitionsCount: number;
  artworksCount: number;
  isFollowed?: boolean;
  commissionRate?: number; // Configurable percentage (e.g. 15%)
  status?: 'Active' | 'Pending Verification' | 'Suspended' | 'Rejected';
  socialLinks?: {
    website?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface WishlistItem {
  artwork: Artwork;
  addedAt: string;
}

export type UserRole = 'customer' | 'artist' | 'admin' | 'owner_content' | 'admin_support' | 'web_developer';
export type ArtistApprovalStatus = 'Pending' | 'Approved' | 'Rejected';

export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: UserRole;
  country?: string;
  preferredCurrency?: CurrencyCode;
  avatar?: string;
  bio?: string;
  artistApprovalStatus?: ArtistApprovalStatus;
  artistApplicationId?: string;
}

export interface ArtistApplication {
  id: string;
  userId?: string;
  // Step 1: Personal Info
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  website?: string;
  instagram?: string;
  // Step 2: Artist Profile
  artistName: string;
  bio: string;
  artistStatement?: string;
  practiceAreas?: string;
  mediums: string;
  yearsActive: number;
  // Step 3: Experience
  exhibitions?: string;
  awards?: string;
  collections?: string;
  galleryExperience?: string;
  // Step 4: Portfolio
  portfolioImages: string[];
  // Step 5: Agreement
  agreedToTerms: boolean;
  status: ArtistApprovalStatus;
  rejectionReason?: string;
  submittedAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  addressLine: string;
  city: string;
  country: string;
  zipCode: string;
  isDefault?: boolean;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  vipStatus: string;
  totalSpend: number;
  orderCount: number;
  wishlistCount: number;
  addresses: Address[];
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

export type OrderFulfillmentStatus = 'Processing' | 'Paid' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number; // Stored in selected display currency
  shippingFee: number;
  total: number;
  displayCurrency: CurrencyCode;
  shippingInfo: ShippingInfo;
  paymentMethod: 'Card' | 'Bank Transfer';
  status: OrderFulfillmentStatus;
  trackingNumber?: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  description: string;
}

export type EnquiryType =
  | 'Artwork Enquiry'
  | 'Purchase Assistance'
  | 'Private Collection Advisory'
  | 'Private Viewing'
  | 'Artist Enquiry'
  | 'Exhibition Enquiry'
  | 'Corporate Art Consultation'
  | 'Shipping Enquiry'
  | 'General Enquiry';

export type EnquiryStatus = 'New' | 'In Progress' | 'Resolved';

export interface Enquiry {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  enquiryType: EnquiryType;
  artworkId?: string;
  artworkTitle?: string;
  message: string;
  date: string;
  status: EnquiryStatus;
  replyNotes?: string;
}

export type TicketCategory =
  | 'Order & Delivery Issue'
  | 'Damaged Artwork Claim'
  | 'Custom Framing Dispute'
  | 'Certificate of Authenticity Request'
  | 'Artist Payout Query'
  | 'Artist Commission Clarification'
  | 'Artwork Review Appeal'
  | 'General Support';

export type TicketPriority = 'Standard' | 'Urgent' | 'Curatorial Escalation';
export type TicketStatus = 'Open' | 'Under Investigation' | 'Resolved';

export interface SupportTicket {
  id: string;
  userId?: string;
  userRole: 'customer' | 'artist' | 'guest';
  userName: string;
  userEmail: string;
  userPhone?: string;
  category: TicketCategory;
  priority: TicketPriority;
  orderId?: string;
  artworkTitle?: string;
  subject: string;
  description: string;
  createdAt: string;
  status: TicketStatus;
  resolutionNotes?: string;
  updatedAt?: string;
}

export interface Payout {
  id: string;
  artistId: string;
  artistName: string;
  amount: number;
  currency: CurrencyCode;
  status: 'Pending' | 'Processing' | 'Paid' | 'Failed';
  period: string;
  payoutMethod: string;
  date: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  order?: number;
}

export interface ShippingRegion {
  id: string;
  regionName: string;
  fee: number;
  processingTime: string;
  internationalAvailable: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'submission' | 'enquiry' | 'payout' | 'artist';
  date: string;
  read: boolean;
  targetRole: 'admin' | 'artist' | 'customer';
}

export interface FilterState {
  search: string;
  category: string;
  artist: string;
  medium: string;
  type: 'All' | 'Original' | 'Fine Art Print';
  minPrice: number;
  maxPrice: number;
  isFeatured: boolean;
  isNew: boolean;
  sortBy: 'featured' | 'price-low' | 'price-high' | 'newest' | 'title-asc';
}

export type ActivePage =
  | 'home'
  | 'catalogue'
  | 'artwork-detail'
  | 'artist-profile'
  | 'cart'
  | 'checkout'
  | 'account'
  | 'wishlist'
  | 'about'
  | 'journal'
  | 'contact-advisory'
  | 'policies'
  | 'order-confirmation'
  | 'login'
  | 'register'
  | 'artist-landing'
  | 'artist-register'
  | 'artist-application'
  | 'artist-status'
  | 'artist-login'
  | 'artist-dashboard'
  | 'add-artwork'
  | 'admin-login'
  | 'admin-dashboard';
