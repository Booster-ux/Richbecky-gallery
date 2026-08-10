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
  EnquiryStatus
} from '../types';
import {
  INITIAL_ARTWORKS,
  ARTISTS,
  CATEGORIES,
  MOCK_USER,
  MOCK_ORDERS,
  MOCK_ENQUIRIES,
  MOCK_CUSTOMERS,
  MOCK_PAYOUTS,
  MOCK_FAQS,
  MOCK_SHIPPING_REGIONS,
  MOCK_ADMIN_NOTIFICATIONS
} from '../data/mockData';
import {
  convertPrice,
  formatPriceWithCurrency,
  formatRawAmount,
  detectCustomerCurrency
} from '../services/currencyService';

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

  // User & Roles
  currentUser: User;
  setCurrentUserRole: (role: 'customer' | 'artist' | 'admin') => void;

  // Filters & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Artist & Admin Artwork Workflows
  addNewArtwork: (artworkData: Omit<Artwork, 'id' | 'createdAt' | 'status'>) => void;
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

  // Customers & Payouts & FAQ & Shipping Domain Models
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
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(INITIAL_ARTWORKS[0]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(ARTISTS[0]);
  const [selectedArtworkForEnquiry, setSelectedArtworkForEnquiry] = useState<Artwork | null>(null);

  const [selectedCurrency, setSelectedCurrencyState] = useState<CurrencyCode>(() => {
    const savedCurrency = localStorage.getItem('richbecky_customer_currency') as CurrencyCode | null;
    return savedCurrency || detectCustomerCurrency();
  });

  const setSelectedCurrency = (currency: CurrencyCode) => {
    setSelectedCurrencyState(currency);
    localStorage.setItem('richbecky_customer_currency', currency);
    showToast(`Display currency changed to ${currency}`, 'info');
  };
  
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('richbecky_artworks');
    return saved ? JSON.parse(saved) : INITIAL_ARTWORKS;
  });

  const [artists] = useState<Artist[]>(ARTISTS);
  const [categories] = useState<Category[]>(CATEGORIES);
  const [customers] = useState<CustomerProfile[]>(MOCK_CUSTOMERS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);
  const [payouts, setPayouts] = useState<Payout[]>(MOCK_PAYOUTS);
  const [faqs, setFaqs] = useState<FAQItem[]>(MOCK_FAQS);
  const [shippingRegions, setShippingRegions] = useState<ShippingRegion[]>(MOCK_SHIPPING_REGIONS);
  const [adminNotifications, setAdminNotifications] = useState<NotificationItem[]>(MOCK_ADMIN_NOTIFICATIONS);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('richbecky_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    const saved = localStorage.getItem('richbecky_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);
  
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTER_STATE);

  const [toast, setToast] = useState<ToastState>({
    message: '',
    type: 'success',
    visible: false
  });

  useEffect(() => {
    localStorage.setItem('richbecky_artworks', JSON.stringify(artworks));
  }, [artworks]);

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
        
        if (artwork.type === 'Original') {
          showToast('Original artworks are one-of-a-kind. Maximum quantity is 1.', 'info');
          return prevCart;
        }

        const newQty = Math.min(existingItem.quantity + requestedQty, artwork.stock);
        const updated = [...prevCart];
        updated[existingIndex] = { ...existingItem, quantity: newQty };
        showToast(`Updated "${artwork.title}" quantity in cart.`);
        return updated;
      } else {
        const initialQty = artwork.type === 'Original' ? 1 : Math.min(requestedQty, artwork.stock);
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
          if (item.artwork.type === 'Original' && newQty > 1) {
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

  const setCurrentUserRole = (role: 'customer' | 'artist' | 'admin') => {
    setCurrentUser(prev => ({ ...prev, role }));
    showToast(`Switched view to: ${role.toUpperCase()}`, 'info');
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  const addNewArtwork = (data: Omit<Artwork, 'id' | 'createdAt' | 'status'>) => {
    const newArt: Artwork = {
      ...data,
      id: `art-${Date.now()}`,
      status: 'Pending Admin Approval',
      createdAt: new Date().toISOString()
    };

    setArtworks(prev => [newArt, ...prev]);
    showToast(`Artwork "${newArt.title}" submitted successfully for Admin Approval!`, 'success');
  };

  const updateArtwork = (updatedArtwork: Artwork) => {
    setArtworks(prev => prev.map(a => a.id === updatedArtwork.id ? updatedArtwork : a));
    showToast(`Updated "${updatedArtwork.title}" specifications.`, 'success');
  };

  const approveArtwork = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(art => (art.id === artworkId ? { ...art, status: 'Approved' } : art))
    );
    showToast('Artwork approved and published to the gallery catalogue!', 'success');
  };

  const rejectArtwork = (artworkId: string) => {
    setArtworks(prev =>
      prev.map(art => (art.id === artworkId ? { ...art, status: 'Rejected' } : art))
    );
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
      prev.map(art => (art.id === artworkId ? { ...art, status: 'Rejected' } : art))
    );
    showToast('Artwork archived.', 'info');
  };

  const placeOrder = (shippingInfo: any, paymentMethod: 'Card' | 'Bank Transfer') => {
    const subtotal = cartTotal;
    const shippingFee = subtotal > getConvertedPrice(3000, 'USD') ? 0 : getConvertedPrice(150, 'USD');
    const total = subtotal + shippingFee;

    const newOrder: Order = {
      id: `RBG-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      shippingFee,
      total,
      displayCurrency: selectedCurrency,
      shippingInfo,
      paymentMethod,
      status: 'Processing'
    };

    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();
    setActivePage('order-confirmation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Order confirmed! Receipt generated.', 'success');
  };

  const updateOrderStatus = (orderId: string, status: OrderFulfillmentStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
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
        currentUser,
        setCurrentUserRole,
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
