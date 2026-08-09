import React, { useState, useRef, useEffect } from 'react';
import { useGallery } from '../context/GalleryContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  Globe,
  User
} from 'lucide-react';
import { LOGO_URL } from '../data/mockData';
import { SUPPORTED_CURRENCIES } from '../services/currencyService';
import { CurrencyCode } from '../types';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cartCount,
    wishlist,
    filterState,
    setFilterState,
    artworks,
    navigateToArtwork,
    currentUser,
    selectedCurrency,
    setSelectedCurrency,
    formatPrice
  } = useGallery();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Live search predictions
  const searchResults = filterState.search.trim()
    ? artworks.filter(art =>
        art.title.toLowerCase().includes(filterState.search.toLowerCase()) ||
        art.artistName.toLowerCase().includes(filterState.search.toLowerCase()) ||
        art.category.toLowerCase().includes(filterState.search.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filterState.search.trim()) {
      setActivePage('catalogue');
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-ivory-100/95 backdrop-blur-md border-b border-ivory-300 transition-all duration-200 shadow-subtle">
      
      {/* Top Announcement & Currency Bar */}
      <div className="bg-navy-950 text-ivory-100 py-2 px-4 sm:px-8 text-xs font-light tracking-wide flex items-center justify-between gap-4 border-b border-navy-800">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-gold-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Certificate of Authenticity Included
          </span>
          <span className="hidden md:inline text-navy-700">|</span>
          <span className="hidden lg:inline text-neutral-300">Complimentary Insured Worldwide Courier Delivery</span>
        </div>
        
        {/* Currency Selector */}
        <div className="flex items-center gap-2 bg-navy-900/90 px-3 py-1 rounded border border-gold-500/25">
          <Globe className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[11px] text-neutral-300 font-medium hidden sm:inline">Currency:</span>
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value as CurrencyCode)}
            className="bg-transparent text-gold-400 text-xs font-semibold focus:outline-none cursor-pointer"
          >
            {SUPPORTED_CURRENCIES.map(curr => (
              <option key={curr.code} value={curr.code} className="bg-navy-900 text-white">
                {curr.code} ({curr.symbol})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">
          
          {/* Official Logo */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center group focus:outline-none"
            >
              <img
                src={LOGO_URL}
                alt="Richbecky Gallery"
                className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
              />
            </button>
          </div>

          {/* Desktop Search Input */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-sm relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                value={filterState.search}
                onChange={(e) => {
                  setFilterState(prev => ({ ...prev, search: e.target.value }));
                  setSearchFocused(true);
                }}
                onFocus={() => setSearchFocused(true)}
                placeholder="Search artworks, artists, mediums..."
                className="w-full bg-white border border-ivory-400 rounded-full py-2 pl-9 pr-4 text-xs text-navy-900 placeholder-neutral-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition duration-200 shadow-sm"
              />
              <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-2.5" />
            </form>

            {/* Live Search Results Overlay */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-ivory-300 overflow-hidden z-50 animate-fade-in">
                <div className="p-2 text-[11px] font-semibold text-neutral-400 uppercase tracking-wider px-3 border-b border-ivory-200">
                  Matching Works
                </div>
                {searchResults.map(art => (
                  <button
                    key={art.id}
                    onClick={() => {
                      navigateToArtwork(art);
                      setSearchFocused(false);
                    }}
                    className="w-full text-left px-3 py-2.5 hover:bg-ivory-200 flex items-center gap-3 transition"
                  >
                    <img src={art.imageUrl} alt={art.title} className="w-9 h-9 object-cover rounded" />
                    <div>
                      <div className="text-xs font-semibold text-navy-900 line-clamp-1">{art.title}</div>
                      <div className="text-[11px] text-neutral-500">{art.artistName} • {formatPrice(art.price, art.currency)}</div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setActivePage('catalogue');
                    setSearchFocused(false);
                  }}
                  className="w-full py-2 bg-ivory-100 text-center text-xs font-semibold text-gold-700 hover:bg-ivory-200 transition"
                >
                  View full catalogue results →
                </button>
              </div>
            )}
          </div>

          {/* Desktop Main Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-navy-900">
            <button
              onClick={() => setActivePage('catalogue')}
              className={`transition-colors py-1.5 border-b-2 ${
                activePage === 'catalogue' ? 'border-gold-500 text-gold-700' : 'border-transparent hover:text-gold-600'
              }`}
            >
              Artworks
            </button>

            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'All' }));
                setActivePage('catalogue');
              }}
              className="hover:text-gold-600 transition-colors py-1.5 border-b-2 border-transparent"
            >
              Categories
            </button>

            <button
              onClick={() => setActivePage('artist-profile')}
              className={`transition-colors py-1.5 border-b-2 ${
                activePage === 'artist-profile' ? 'border-gold-500 text-gold-700' : 'border-transparent hover:text-gold-600'
              }`}
            >
              Artists
            </button>

            <button
              onClick={() => setActivePage('about')}
              className={`transition-colors py-1.5 border-b-2 ${
                activePage === 'about' ? 'border-gold-500 text-gold-700' : 'border-transparent hover:text-gold-600'
              }`}
            >
              About
            </button>

            <button
              onClick={() => setActivePage('journal')}
              className={`transition-colors py-1.5 border-b-2 ${
                activePage === 'journal' ? 'border-gold-500 text-gold-700' : 'border-transparent hover:text-gold-600'
              }`}
            >
              Journal
            </button>
          </nav>

          {/* Right Action Icons (Wishlist, Cart, Account) */}
          <div className="flex items-center gap-4">
            
            {/* Wishlist */}
            <button
              onClick={() => setActivePage('wishlist')}
              className="relative p-2 text-navy-900 hover:text-gold-600 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-gold-500 text-navy-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setActivePage('cart')}
              className="relative p-2 text-navy-900 hover:text-gold-600 transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-navy-900 text-gold-400 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Account */}
            <button
              onClick={() => setActivePage('account')}
              className="flex items-center gap-1.5 p-1 rounded-full text-navy-900 hover:text-gold-600 transition border border-ivory-300"
              aria-label="Account"
            >
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-full object-cover border border-gold-400"
                />
              ) : (
                <User className="w-5 h-5" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-navy-900 hover:text-gold-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Clean Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-100 border-b border-ivory-300 px-6 py-6 space-y-6 animate-fade-in shadow-xl">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={filterState.search}
              onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search catalogue..."
              className="w-full bg-white border border-ivory-400 rounded-full py-2.5 pl-9 pr-4 text-xs"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 text-xs font-semibold uppercase tracking-widest text-navy-900">
            <button
              onClick={() => { setActivePage('catalogue'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200"
            >
              Artworks Catalogue
            </button>
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: 'All' }));
                setActivePage('catalogue');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-ivory-200"
            >
              Explore Categories
            </button>
            <button
              onClick={() => { setActivePage('artist-profile'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200"
            >
              Master Artists
            </button>
            <button
              onClick={() => { setActivePage('about'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200"
            >
              About Richbecky Gallery
            </button>
            <button
              onClick={() => { setActivePage('journal'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200"
            >
              The Collector's Journal
            </button>
            <button
              onClick={() => { setActivePage('artist-register'); setMobileMenuOpen(false); }}
              className="text-left py-2 text-gold-700 font-bold border-b border-ivory-200"
            >
              For Artists • Sell Your Art
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
