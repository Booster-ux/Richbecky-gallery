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
  ActivePage
} from '../types';
import {
  INITIAL_ARTWORKS,
  ARTISTS,
  CATEGORIES,
  MOCK_USER,
  MOCK_ORDERS
} from '../data/mockData';

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
  
  // Data
  artworks: Artwork[];
  artists: Artist[];
  categories: Category[];
  selectedArtwork: Artwork | null;
  selectedArtist: Artist | null;
  
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

  // User & Auth Role (Customer / Artist / Admin)
  currentUser: User;
  setCurrentUserRole: (role: 'customer' | 'artist' | 'admin') => void;

  // Filters & Search
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  
  // Artist & Admin Workflows
  addNewArtwork: (artworkData: Omit<Artwork, 'id' | 'createdAt' | 'status'>) => void;
  approveArtwork: (artworkId: string) => void;
  rejectArtwork: (artworkId: string) => void;
  
  // Orders & Checkout
  orders: Order[];
  lastPlacedOrder: Order | null;
  placeOrder: (shippingInfo: any, paymentMethod: 'Card' | 'Bank Transfer') => void;

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
  
  // Load initial state from LocalStorage or fall back to default mock data
  const [artworks, setArtworks] = useState<Artwork[]>(() => {
    const saved = localStorage.getItem('richbecky_artworks');
    return saved ? JSON.parse(saved) : INITIAL_ARTWORKS;
  });

  const [artists, setArtists] = useState<Artist[]>(ARTISTS);
  const [categories] = useState<Category[]>(CATEGORIES);

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

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('richbecky_artworks', JSON.stringify(artworks));
  }, [artworks]);

  useEffect(() => {
    localStorage.setItem('richbecky_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('richbecky_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 4000);
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, visible: false }));
  };

  // Navigation helpers
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

  // Cart operations with strict artwork type rules
  const addToCart = (artwork: Artwork, requestedQty: number = 1) => {
    // Check if artwork is sold
    if (artwork.isSold) {
      showToast('This artwork has already been acquired.', 'warning');
      return;
    }

    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.artwork.id === artwork.id);

      if (existingIndex > -1) {
        const existingItem = prevCart[existingIndex];
        
        // RULE: Original Artwork is unique - quantity cannot exceed 1
        if (artwork.type === 'Original') {
          showToast('Original artworks are one-of-a-kind. Maximum quantity is 1.', 'info');
          return prevCart;
        }

        // Fine Art Print stock check
        const newQty = Math.min(existingItem.quantity + requestedQty, artwork.stock);
        if (newQty === existingItem.quantity && newQty >= artwork.stock) {
          showToast(`Maximum available print stock reached (${artwork.stock}).`, 'warning');
          return prevCart;
        }

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
            showToast('Original artwork quantity is restricted to 1.', 'info');
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

  const cartTotal = cart.reduce((sum, item) => sum + item.artwork.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist operations
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

  // Switch Role helper
  const setCurrentUserRole = (role: 'customer' | 'artist' | 'admin') => {
    setCurrentUser(prev => ({ ...prev, role }));
    showToast(`Switched workspace view to: ${role.toUpperCase()}`, 'info');
  };

  const resetFilters = () => {
    setFilterState(DEFAULT_FILTER_STATE);
  };

  // Artist upload artwork form handling
  const addNewArtwork = (data: Omit<Artwork, 'id' | 'createdAt' | 'status'>) => {
    const newArt: Artwork = {
      ...data,
      id: `art-${Date.now()}`,
      status: 'Pending Admin Approval', // Default status per specification
      createdAt: new Date().toISOString()
    };

    setArtworks(prev => [newArt, ...prev]);
    showToast(`Artwork "${newArt.title}" submitted successfully for Admin Approval!`, 'success');
  };

  // Admin Approval workflows
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

  // Checkout process
  const placeOrder = (shippingInfo: any, paymentMethod: 'Card' | 'Bank Transfer') => {
    const subtotal = cartTotal;
    const shippingFee = subtotal > 3000 ? 0 : 150; // Complimentary shipping on orders > $3000
    const total = subtotal + shippingFee;

    const newOrder: Order = {
      id: `RBG-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      subtotal,
      shippingFee,
      total,
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
        approveArtwork,
        rejectArtwork,
        orders,
        lastPlacedOrder,
        placeOrder,
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
