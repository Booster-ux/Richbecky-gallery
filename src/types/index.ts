export type ArtworkType = 'Original' | 'Fine Art Print';

export type ArtworkStatus = 'Approved' | 'Pending Admin Approval' | 'Rejected' | 'Draft';

export type CurrencyCode = 'NGN' | 'USD' | 'GBP' | 'EUR' | 'CAD' | 'AUD';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
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
  year: number;
  price: number; // Stored numerical price (original artist input)
  currency: CurrencyCode; // Stored original currency code
  stock: number; // 1 for Original, N for Fine Art Print
  isSold?: boolean;
  isFeatured?: boolean;
  isNewArrival?: borderCheck;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  artistStatement?: string;
  artworkStory?: string;
  editionInfo?: string;
  signatureInfo?: string;
  shippingInfoNotes?: string;
  altText?: string;
  certificateIncluded: boolean;
  status: ArtworkStatus;
  createdAt: string;
}

type borderCheck = boolean;

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
  status?: 'Active' | 'Pending Verification' | 'Suspended';
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

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'artist' | 'admin';
  avatar?: string;
  bio?: string;
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
  order: number;
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
  | 'artist-register'
  | 'artist-dashboard'
  | 'add-artwork'
  | 'admin-login'
  | 'admin-dashboard'
  | 'contact-advisory'
  | 'policies'
  | 'order-confirmation';
