export type ArtworkType = 'Original' | 'Fine Art Print';

export type ArtworkStatus = 'Approved' | 'Pending Admin Approval' | 'Rejected';

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
  dimensions: string;
  year: number;
  price: number; // Stored numerical price (original artist input)
  currency: CurrencyCode; // Stored original currency code
  stock: number; // 1 for Original, N for Fine Art Print
  isSold?: boolean;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  imageUrl: string;
  additionalImages?: string[];
  description: string;
  certificateIncluded: boolean;
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

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  zipCode: string;
}

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
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface Category {
  id: string;
  name: string;
  count: number;
  image: string;
  description: string;
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
  | 'artist-register'
  | 'artist-dashboard'
  | 'add-artwork'
  | 'admin-dashboard'
  | 'order-confirmation';
