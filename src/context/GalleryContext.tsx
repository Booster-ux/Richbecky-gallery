import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Artwork,
  Artist,
  Category,
  CartItem,
  WishlistItem,
  User,
  Order,
  FilterState,
  ActivePage,
  CurrencyCode,
  Enquiry,
  CustomerProfile,
  Payout,
  FAQItem,
  ShippingRegion,
  NotificationItem,
  OrderFulfillmentStatus,
  EnquiryStatus,
  ArtistApplication,
  ArtistApprovalStatus,
  UserRole,
  ArtworkStatus,
  SupportTicket,
  TicketStatus,
  TicketCategory,
  TicketPriority
} from '../types';
import {
  CATEGORIES,
  MOCK_ENQUIRIES,
  MOCK_CUSTOMERS,
  MOCK_PAYOUTS,
  MOCK_FAQS,
  MOCK_SHIPPING_REGIONS,
  MOCK_ADMIN_NOTIFICATIONS,
  MOCK_SUPPORT_TICKETS
} from '../data/mockData';
import {
  convertPrice,
  formatPriceWithCurrency,
  formatRawAmount,
  detectCustomerCurrency
} from '../services/currencyService';
import { ApiService } from '../services/api';

interface ToastState {
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  visible: boolean;
}

interface GalleryContextType {
  // Navigation
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  navigateToArtwork: (artwork: Artwork) => void;
  navigateToArtist: (artist: Artist) => void;
  
  // Core Data
  artworks: Artwork[];
  artists: Artist[];
  categories: Category[];
  selectedArtwork: Artwork | null;
  selectedArtist: Artist | null;

  // Currency System
  selectedCurrency: CurrencyCode;
  setSelectedCurrency: (currency: CurrencyCode) => void;
  formatPrice: (amount: number, fromCurrency?: CurrencyCode) => string;
  getConvertedPrice: (amount: number, fromCurrency?: CurrencyCode) => number;
  formatOriginalPrice: (amount: number, currency: CurrencyCode) => string;
  
  // Cart
  cart: CartItem[];
  addToCart: (artwork: Artwork, quantity?: number) => void;
  removeFromCart: (artworkId: string) => void;
  updateCartQuantity: (artworkId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (artwork: Artwork) => void;
  isInWishlist: (artworkId: string) => boolean;

  // Authentication & Roles
  isAuthenticated: boolean;
  currentUser: User | null;
  artistApprovalStatus: ArtistApprovalStatus | null;
  loginCustomer: (email: string, pass: string) => boolean;
  registerCustomer: (data: { firstName: string; lastName: string; email: string; phone: string; country: string; preferredCurrency: CurrencyCode }) => void;
  loginArtist: (email: string, pass: string) => { success: boolean; message?: string };
  loginAdmin: (email: string, pass: string) => boolean;
  loginDirectly: (role: 'admin' | 'owner_content' | 'support' | 'developer' | 'artist' | 'customer', email?: string, name?: string) => void;
  updateUserCredentials: (newEmail: string, newName?: string, newPassword?: string) => Promise<boolean>;
  logout: () => void;

  // Artist Applications
  artistApplications: ArtistApplication[];
  submitArtistApplication: (appData: Omit<ArtistApplication, 'id' | 'status' | 'submittedAt'>) => void;
  approveArtistApplication: (appId: string) => void;
  rejectArtistApplication: (appId: string, reason?: string) => void;

  // Filters & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Artist & Admin Artwork Workflows
  addNewArtwork: (artworkData: Omit<Artwork, 'id' | 'createdAt' | 'status'> & { status?: ArtworkStatus }) => void;
  updateArtwork: (updatedArtwork: Artwork) => void;
  approveArtwork: (artworkId: string) => void;
  rejectArtwork: (artworkId: string) => void;
  toggleFeatureArtwork: (artworkId: string) => void;
  archiveArtwork: (artworkId: string) => void;
  
  // Orders & Fulfillment
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (shippingInfo: any, paymentMethod: 'Card' | 'Bank Transfer') => void;
  updateOrderStatus: (orderId: string, status: OrderFulfillmentStatus) => void;

  // Enquiries & Advisory
  enquiries: Enquiry[];
  addEnquiry: (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>) => void;
  updateEnquiryStatus: (enquiryId: string, status: EnquiryStatus, replyNotes?: string) => void;
  selectedArtworkForEnquiry: Artwork | null;
  setSelectedArtworkForEnquiry: (artwork: Artwork | null) => void;

  // Support Tickets & Disputes
  supportTickets: SupportTicket[];
  createSupportTicket: (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => void;
  updateTicketStatus: (ticketId: string, status: TicketStatus, notes?: string) => void;

  // Domain Models
  customers: CustomerProfile[];
  payouts: Payout[];
  updatePayoutStatus: (payoutId: string, status: Payout['status']) => void;
  faqs: FAQItem[];
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (faq: FAQItem) => void;
  deleteFAQ: (id: string) => void;
  shippingRegions: ShippingRegion[];
  updateShippingRegion: (updatedRegion: ShippingRegion) => void;
  adminNotifications: NotificationItem[];
  markNotificationRead: (id: string) => void;

  // Toast
  toast: ToastState;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  hideToast: () => void;
}

const DEFAULT_FILTER_STATE: FilterState = {
  search: '',
  category: 'All',
  artist: 'All',
  medium: 'All',
  type: 'All',
  minPrice: 0,
  maxPrice: 10000,
  isFeatured: false,
  isNew: false,
  sortBy: 'featured'
};

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const getInitialPageFromPath = (): ActivePage => {
    if (typeof window === 'undefined') return 'home';
    const path = window.location.pathname.replace(/^\//, '').trim().toLowerCase();
    if (!path || path === '') return 'home';

    // Route alias mapping for friendly deep-links & portal buttons
    const routeAliases: Record<string, ActivePage> = {
      'admin': 'admin-login',
      'admin/login': 'admin-login',
      'admin-portal': 'admin-login',
      'admin/dashboard': 'admin-dashboard',
      'admin-dashboard': 'admin-dashboard',
      'admin-login': 'admin-login',
      'artist/apply': 'artist-application',
      'artist/login': 'artist-login',
      'artist/dashboard': 'artist-dashboard',
      'artist-portal': 'artist-landing',
      'login': 'login',
      'register': 'register',
      'account': 'account'
    };

    if (routeAliases[path]) {
      return routeAliases[path];
    }

    const validPages: ActivePage[] = [
      'home', 'catalogue', 'artwork-detail', 'artist-profile', 'cart', 'checkout',
      'wishlist', 'about', 'journal', 'contact-advisory', 'policies', 'order-confirmation',
      'login', 'register', 'account', 'artist-landing', 'artist-register', 'artist-application',
      'artist-status', 'artist-login', 'artist-dashboard', 'add-artwork', 'admin-login', 'admin-dashboard'
    ];
    if (validPages.includes(path as ActivePage)) {
      return path as ActivePage;
    }
    return 'home';
  };

  const [activePage, setActivePageState] = useState<ActivePage>(getInitialPageFromPath);

  const setActivePage = (page: ActivePage) => {
    setActivePageState(page);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', page === 'home' ? '/' : `/${page}`);
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActivePageState(getInitialPageFromPath());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  const [selectedArtworkForEnquiry, setSelectedArtworkForEnquiry] = useState<Artwork | null>(null);

  // Initialize data via ApiService connected to backend
  const [artworks, setArtworks] = useState<Artwork[]>(() => ApiService.artworks.getAllForAdmin());
  const [artists, setArtists] = useState<Artist[]>(() => ApiService.artists.getAllActive());
  const [categories] = useState<Category[]>(CATEGORIES);
  const [customers, setCustomers] = useState<CustomerProfile[]>(MOCK_CUSTOMERS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);
  const [payouts, setPayouts] = useState<Payout[]>(MOCK_PAYOUTS);
  const [faqs, setFaqs] = useState<FAQItem[]>(MOCK_FAQS);
  const [shippingRegions, setShippingRegions] = useState<ShippingRegion[]>(MOCK_SHIPPING_REGIONS);
  const [adminNotifications, setAdminNotifications] = useState<NotificationItem[]>(MOCK_ADMIN_NOTIFICATIONS);

  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(artworks[0] || null);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(artists[0] || null);

  const [selectedCurrency, setSelectedCurrencyState] = useState<CurrencyCode>(() => {
    const savedCurrency = localStorage.getItem('richbecky_customer_currency') as CurrencyCode | null;
    return savedCurrency || detectCustomerCurrency();
  });

  const setSelectedCurrency = (currency: CurrencyCode) => {
    setSelectedCurrencyState(currency);
    localStorage.setItem('richbecky_customer_currency', currency);
    showToast(`Display currency changed to ${currency}`, 'info');
  };

  // Authentication State connected to ApiService
  const [currentUser, setCurrentUser] = useState<User | null>(() => ApiService.auth.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!currentUser);
  const [artistApprovalStatus, setArtistApprovalStatus] = useState<ArtistApprovalStatus | null>(() => {
    if (currentUser && currentUser.artistApprovalStatus) return currentUser.artistApprovalStatus;
    return null;
  });

  const [artistApplications, setArtistApplications] = useState<ArtistApplication[]>(() => ApiService.artists.getApplications());

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('richbecky_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    if (currentUser) {
      const dbWishlist = ApiService.wishlist.getByCustomer(currentUser.id);
      return dbWishlist.map(w => {
        const art = artworks.find(a => a.id === w.artworkId);
        return { artwork: art || artworks[0], addedAt: w.createdAt };
      });
    }
    const saved = localStorage.getItem('richbecky_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => ApiService.orders.getAllOrders());
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false
  });

  useEffect(() => {
    localStorage.setItem('richbecky_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('richbecky_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // Auth Functions via ApiService
  const loginCustomer = (email: string, pass: string): boolean => {
    const res = ApiService.auth.loginCustomer(email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('rbg_auth_user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      showToast(`Welcome back, ${res.user.name}!`, 'success');
      return true;
    }
    showToast(res.message || 'Login failed', 'error');
    return false;
  };

  const registerCustomer = (data: { firstName: string; lastName: string; email: string; phone: string; country: string; preferredCurrency: CurrencyCode }) => {
    const res = ApiService.auth.registerCustomer(data);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('rbg_auth_user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      setSelectedCurrency(data.preferredCurrency);
      showToast(`Collector account created successfully! Welcome to Richbecky Gallery.`, 'success');
      setActivePage('account');
    } else {
      showToast(res.message || 'Registration failed', 'error');
    }
  };

  const loginArtist = (email: string, pass: string): { success: boolean; message?: string } => {
    const res = ApiService.auth.loginArtist(email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('rbg_auth_user', JSON.stringify(res.user));
      setArtistApprovalStatus(res.user.artistApprovalStatus || 'Approved');
      setIsAuthenticated(true);
      showToast('Artist Studio authenticated.', 'success');
      setActivePage('artist-dashboard');
      return { success: true };
    }
    
    // Check pending application by email
    const app = artistApplications.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (app) {
      if (app.status === 'Pending') {
        showToast('Your artist application is currently pending curatorial review.', 'info');
        setArtistApprovalStatus('Pending');
        const pendingUser: User = { id: app.id, name: app.artistName, email: app.email, role: 'artist', artistApprovalStatus: 'Pending' };
        setCurrentUser(pendingUser);
        localStorage.setItem('rbg_auth_user', JSON.stringify(pendingUser));
        setIsAuthenticated(true);
        setActivePage('artist-status');
        return { success: false, message: 'Application pending review.' };
      } else if (app.status === 'Rejected') {
        showToast('Your artist application was not approved.', 'warning');
        setArtistApprovalStatus('Rejected');
        const rejectedUser: User = { id: app.id, name: app.artistName, email: app.email, role: 'artist', artistApprovalStatus: 'Rejected' };
        setCurrentUser(rejectedUser);
        localStorage.setItem('rbg_auth_user', JSON.stringify(rejectedUser));
        setIsAuthenticated(true);
        setActivePage('artist-status');
        return { success: false, message: 'Application rejected.' };
      }
    }

    showToast(res.message || 'Artist authentication failed', 'error');
    return { success: false, message: res.message };
  };

  const loginAdmin = (email: string, pass: string): boolean => {
    const res = ApiService.auth.loginAdmin(email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      localStorage.setItem('rbg_auth_user', JSON.stringify(res.user));
      setIsAuthenticated(true);
      showToast('Authenticated into Executive Admin Governance.', 'success');
      setActivePage('admin-dashboard');
      return true;
    }
    showToast(res.message || 'Admin authentication failed', 'error');
    return false;
  };

  const loginDirectly = (role: 'admin' | 'owner_content' | 'support' | 'developer' | 'artist' | 'customer', email?: string, name?: string) => {
    let user: User;
    if (role === 'artist') {
      user = {
        id: 'a0000000-0000-0000-0000-000000000001',
        name: name || 'Adebayo Ogunlesi',
        email: email || 'artist@richbeckygallery.com',
        role: 'artist',
        artistApprovalStatus: 'Approved'
      };
      setArtistApprovalStatus('Approved');
      setActivePage('artist-dashboard');
      showToast('Welcome to Artist Studio! You can personalize your email & password in Settings.', 'info');
    } else if (role === 'customer') {
      user = {
        id: 'c0000000-0000-0000-0000-000000000001',
        name: name || 'Rebecca Vanguard',
        email: email || 'collector@richbeckygallery.com',
        role: 'customer'
      };
      setActivePage('account');
      showToast('Welcome to Collector Portal! You can personalize your email & password in Settings.', 'info');
    } else {
      user = {
        id: role === 'owner_content' ? 'u0000000-0000-0000-0000-000000000002' :
            role === 'support' ? 'u0000000-0000-0000-0000-000000000003' :
            role === 'developer' ? 'u0000000-0000-0000-0000-000000000004' : 'u0000000-0000-0000-0000-000000000001',
        name: role === 'owner_content' ? 'Gallery Owner & Content Manager' :
              role === 'support' ? 'Administrative Support Agent' :
              role === 'developer' ? 'Lead Web Developer' : 'Executive Director',
        email: email || (role === 'owner_content' ? 'owner@richbeckygallery.com' :
                role === 'support' ? 'support@richbeckygallery.com' :
                role === 'developer' ? 'developer@richbeckygallery.com' : 'admin@richbeckygallery.com'),
        role: role as any
      };
      setActivePage('admin-dashboard');
      showToast(`Welcome! You are authenticated in the ${user.name} portal. Set your permanent credentials in Settings.`, 'info');
    }
    setCurrentUser(user);
    localStorage.setItem('rbg_auth_user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const updateUserCredentials = async (newEmail: string, newName?: string, newPassword?: string): Promise<boolean> => {
    if (!currentUser) return false;
    const updatedUser: User = {
      ...currentUser,
      email: newEmail || currentUser.email,
      name: newName || currentUser.name
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('rbg_auth_user', JSON.stringify(updatedUser));
    localStorage.setItem(`rbg_creds_setup_${currentUser.id}`, 'true');

    if (newPassword) {
      try {
        await supabase.auth.updateUser({ email: newEmail, password: newPassword });
      } catch (e) {
        console.warn('Supabase auth update fallback:', e);
      }
    }
    showToast('Your custom Login Email & Password have been saved successfully!', 'success');
    return true;
  };

  const logout = () => {
    ApiService.auth.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
    setArtistApprovalStatus(null);
    showToast('Signed out successfully.', 'info');
    setActivePage('home');
  };

  const submitArtistApplication = (appData: Omit<ArtistApplication, 'id' | 'status' | 'submittedAt'>) => {
    const createdApp = ApiService.artists.submitApplication(appData);
    setArtistApplications(ApiService.artists.getApplications());

    const user: User = {
      id: createdApp.id,
      name: createdApp.artistName,
      email: createdApp.email,
      phone: createdApp.phone,
      country: createdApp.country,
      role: 'artist',
      artistApprovalStatus: 'Pending',
      artistApplicationId: createdApp.id
    };

    setCurrentUser(user);
    setIsAuthenticated(true);
    setArtistApprovalStatus('Pending');
    showToast('Artist Representation Application submitted for curatorial review!', 'success');
    setActivePage('artist-status');
  };

  const approveArtistApplication = (appId: string) => {
    const adminUser = currentUser?.role === 'admin' ? currentUser : { id: 'u0000000-0000-0000-0000-000000000001', email: 'admin@richbeckygallery.com' };
    ApiService.artists.reviewApplication(adminUser.id, adminUser.email, appId, 'Approved');
    setArtistApplications(ApiService.artists.getApplications());
    setArtists(ApiService.artists.getAllActive());

    if (currentUser && currentUser.artistApplicationId === appId) {
      setCurrentUser(prev => prev ? { ...prev, artistApprovalStatus: 'Approved' } : null);
      setArtistApprovalStatus('Approved');
    }

    showToast('Artist application approved! Representation account active.', 'success');
  };

  const rejectArtistApplication = (appId: string, reason?: string) => {
    const adminUser = currentUser?.role === 'admin' ? currentUser : { id: 'u0000000-0000-0000-0000-000000000001', email: 'admin@richbeckygallery.com' };
    ApiService.artists.reviewApplication(adminUser.id, adminUser.email, appId, 'Rejected', undefined, reason);
    setArtistApplications(ApiService.artists.getApplications());

    if (currentUser && currentUser.artistApplicationId === appId) {
      setCurrentUser(prev => prev ? { ...prev, artistApprovalStatus: 'Rejected' } : null);
      setArtistApprovalStatus('Rejected');
    }

    showToast('Artist application rejected.', 'warning');
  };

  const formatPrice = (amount: number, fromCurrency: CurrencyCode = 'USD'): string => {
    return formatPriceWithCurrency(amount, fromCurrency, selectedCurrency);
  };

  const getConvertedPrice = (amount: number, fromCurrency: CurrencyCode = 'USD'): number => {
    return convertPrice(amount, fromCurrency, selectedCurrency);
  };

  const formatOriginalPrice = (amount: number, currency: CurrencyCode): string => {
    return formatRawAmount(amount, currency);
  };

  const navigateToArtwork = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setActivePage('artwork-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToArtist = (artist: Artist) => {
    setSelectedArtist(artist);
    setActivePage('artist-profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (artwork: Artwork, requestedQty: number = 1) => {
    if (artwork.isSold) {
      showToast('This artwork has already been acquired.', 'warning');
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.artwork.id === artwork.id);

      if (existingIndex > -1) {
        const existingItem = prevCart[existingIndex];
        
        if (artwork.type === 'Original' || artwork.type === 'Original Artwork') {
          showToast('Original artworks are one-of-a-kind. Maximum quantity is 1.', 'info');
          return prevCart;
        }

        const newQty = Math.min(existingItem.quantity + requestedQty, artwork.stock);
        const updated = [...prevCart];
        updated[existingIndex] = { ...existingItem, quantity: newQty };
        showToast(`Updated "${artwork.title}" quantity in cart.`);
        return updated;
      } else {
        const initialQty = (artwork.type === 'Original' || artwork.type === 'Original Artwork') ? 1 : Math.min(requestedQty, artwork.stock);
        showToast(`Added "${artwork.title}" to your gallery cart.`);
        return [...prevCart, { artwork, quantity: initialQty }];
      }
    });
  };

  const removeFromCart = (artworkId: string) => {
    setCart(prev => prev.filter(item => item.artwork.id !== artworkId));
    showToast('Item removed from cart.', 'info');
  };

  const updateCartQuantity = (artworkId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(artworkId);
      return;
    }

    setCart(prev =>
      prev.map(item => {
        if (item.artwork.id === artworkId) {
          if ((item.artwork.type === 'Original' || item.artwork.type === 'Original Artwork') && newQty > 1) {
            return { ...item, quantity: 1 };
          }
          const maxAllowed = Math.min(newQty, item.artwork.stock);
          return { ...item, quantity: maxAllowed };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => {
    const itemConvertedPrice = convertPrice(item.artwork.price, item.artwork.currency, selectedCurrency);
    return sum + itemConvertedPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const toggleWishlist = (artwork: Artwork) => {
    const custId = currentUser ? currentUser.id : 'c0000000-0000-0000-0000-000000000005';
    ApiService.wishlist.toggle(custId, artwork.id);

    setWishlist(prev => {
      const exists = prev.some(item => item.artwork.id === artwork.id);
      if (exists) {
        showToast(`Removed "${artwork.title}" from saved wishlist.`, 'info');
        return prev.filter(item => item.artwork.id !== artwork.id);
      } else {
        showToast(`Saved "${artwork.title}" to your wishlist.`);
        return [...prev, { artwork, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (artworkId: string) => {
    return wishlist.some(item => item.artwork.id === artworkId);
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  const addNewArtwork = (data: Omit<Artwork, 'id' | 'createdAt' | 'status'> & { status?: ArtworkStatus }) => {
    const actorRole = currentUser?.role === 'admin' ? 'admin' : 'artist';
    const created = ApiService.artworks.submitArtwork(actorRole, data);
    setArtworks(ApiService.artworks.getAllForAdmin());
    showToast(`Artwork "${created.title}" submitted successfully for Admin Approval!`, 'success');
  };

  const updateArtwork = (updatedArtwork: Artwork) => {
    setArtworks(prev => prev.map(a => a.id === updatedArtwork.id ? updatedArtwork : a));
    showToast(`Updated "${updatedArtwork.title}" specifications.`, 'success');
  };

  const approveArtwork = (artworkId: string) => {
    const adminUser = currentUser?.role === 'admin' ? currentUser : { id: 'u0000000-0000-0000-0000-000000000001', email: 'admin@richbeckygallery.com' };
    ApiService.artworks.approveArtwork(adminUser.id, adminUser.email, artworkId);
    setArtworks(ApiService.artworks.getAllForAdmin());
    showToast('Artwork approved and published to the gallery catalogue!', 'success');
  };

  const rejectArtwork = (artworkId: string) => {
    const adminUser = currentUser?.role === 'admin' ? currentUser : { id: 'u0000000-0000-0000-0000-000000000001', email: 'admin@richbeckygallery.com' };
    ApiService.artworks.rejectArtwork(adminUser.id, adminUser.email, artworkId, 'Did not meet curatorial standards.');
    setArtworks(ApiService.artworks.getAllForAdmin());
    showToast('Artwork status set to Rejected.', 'warning');
  };

  const toggleFeatureArtwork = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(art => (art.id === artworkId ? { ...art, isFeatured: !art.isFeatured } : art))
    );
    showToast('Toggled featured status for artwork.', 'info');
  };

  const archiveArtwork = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(art => (art.id === artworkId ? { ...art, status: 'Archived' } : art))
    );
    showToast('Artwork archived.', 'info');
  };

  const placeOrder = (shippingInfo: any, paymentMethod: 'Card' | 'Bank Transfer') => {
    const subtotal = cartTotal;
    const shippingFee = subtotal > getConvertedPrice(3000, 'USD') ? 0 : getConvertedPrice(150, 'USD');

    const createdOrder = ApiService.orders.createOrder({
      customerId: currentUser ? currentUser.id : 'c0000000-0000-0000-0000-000000000005',
      displayCurrency: selectedCurrency,
      shippingFee,
      shippingAddress: shippingInfo,
      paymentMethod,
      items: cart.map(i => ({ artworkId: i.artwork.id, quantity: i.quantity }))
    });

    setOrders(ApiService.orders.getAllOrders());
    setLastPlacedOrder(createdOrder);
    clearCart();
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Order confirmed! Development order record created.', 'success');
  };

  const updateOrderStatus = (orderId: string, status: OrderFulfillmentStatus) => {
    const adminUser = currentUser?.role === 'admin' ? currentUser : { id: 'u0000000-0000-0000-0000-000000000001', email: 'admin@richbeckygallery.com' };
    ApiService.orders.updateStatus(adminUser.id, adminUser.email, orderId, status);
    setOrders(ApiService.orders.getAllOrders());
    showToast(`Order ${orderId} fulfillment status updated to ${status}.`, 'info');
  };

  const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const newEnq: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    setEnquiries(prev => [newEnq, ...prev]);
    showToast('Your advisory enquiry has been transmitted to Gallery Directors.', 'success');
  };

  const updateEnquiryStatus = (enquiryId: string, status: EnquiryStatus, replyNotes?: string) => {
    setEnquiries(prev => prev.map(e => e.id === enquiryId ? { ...e, status, replyNotes: replyNotes || e.replyNotes } : e));
    showToast(`Enquiry ${enquiryId} status set to ${status}.`, 'info');
  };

  const updatePayoutStatus = (payoutId: string, status: Payout['status']) => {
    setPayouts(prev => prev.map(p => p.id === payoutId ? { ...p, status } : p));
    showToast(`Payout status updated to ${status}.`, 'info');
  };

  const addFAQ = (faqData: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faqData,
      id: `faq-${Date.now()}`
    };
    setFaqs(prev => [...prev, newFaq]);
    showToast('FAQ item added.', 'success');
  };

  const updateFAQ = (updatedFaq: FAQItem) => {
    setFaqs(prev => prev.map(f => f.id === updatedFaq.id ? updatedFaq : f));
    showToast('FAQ item updated.', 'info');
  };

  const deleteFAQ = (id: string) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
    showToast('FAQ item deleted.', 'warning');
  };

  const updateShippingRegion = (updatedRegion: ShippingRegion) => {
    setShippingRegions(prev => prev.map(r => r.id === updatedRegion.id ? updatedRegion : r));
    showToast('Shipping region settings updated.', 'info');
  };

  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('rbg_support_tickets');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return MOCK_SUPPORT_TICKETS;
        }
      }
    }
    return MOCK_SUPPORT_TICKETS;
  });

  const createSupportTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'status'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'Open'
    };
    setSupportTickets(prev => {
      const updated = [newTicket, ...prev];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('rbg_support_tickets', JSON.stringify(updated));
      }
      return updated;
    });
    showToast(`Support Ticket #${newTicket.id} lodged successfully. Curatorial support notified.`, 'success');
  };

  const updateTicketStatus = (ticketId: string, status: TicketStatus, notes?: string) => {
    setSupportTickets(prev => {
      const updated = prev.map(t =>
        t.id === ticketId
          ? { ...t, status, resolutionNotes: notes || t.resolutionNotes, updatedAt: new Date().toISOString() }
          : t
      );
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('rbg_support_tickets', JSON.stringify(updated));
      }
      return updated;
    });
    showToast(`Ticket #${ticketId} status set to ${status}.`, 'info');
  };

  const markNotificationRead = (id: string) => {
    setAdminNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <GalleryContext.Provider
      value={{
        activePage,
        setActivePage,
        navigateToArtwork,
        navigateToArtist,
        artworks,
        artists,
        categories,
        selectedArtwork,
        selectedArtist,
        selectedCurrency,
        setSelectedCurrency,
        formatPrice,
        getConvertedPrice,
        formatOriginalPrice,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isAuthenticated,
        currentUser,
        artistApprovalStatus,
        loginCustomer,
        registerCustomer,
        loginArtist,
        loginAdmin,
        loginDirectly,
        updateUserCredentials,
        logout,
        artistApplications,
        submitArtistApplication,
        approveArtistApplication,
        rejectArtistApplication,
        filterState,
        setFilterState,
        resetFilters,
        addNewArtwork,
        updateArtwork,
        approveArtwork,
        rejectArtwork,
        toggleFeatureArtwork,
        archiveArtwork,
        orders,
        lastPlacedOrder,
        placeOrder,
        updateOrderStatus,
        enquiries,
        addEnquiry,
        updateEnquiryStatus,
        selectedArtworkForEnquiry,
        setSelectedArtworkForEnquiry,
        supportTickets,
        createSupportTicket,
        updateTicketStatus,
        customers,
        payouts,
        updatePayoutStatus,
        faqs,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        shippingRegions,
        updateShippingRegion,
        adminNotifications,
        markNotificationRead,
        toast,
        showToast,
        hideToast
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
};

export const useGallery = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error('useGallery must be used within a GalleryProvider');
  }
  return context;
};
