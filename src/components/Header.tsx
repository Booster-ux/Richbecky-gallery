import React, { useState, useRef, useEffect } from 'react';
import { useGallery } from '../context/GalleryContext';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  PlusCircle,
  LayoutDashboard
} from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

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
    setCurrentUserRole
  } = useGallery();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
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
    <header className="sticky top-0 z-40 w-full glass-header border-b border-ivory-300 transition-all duration-200">
      {/* Top Announcement Bar */}
      <div className="bg-navy-800 text-ivory-100 py-1.5 px-4 text-xs font-light text-center flex items-center justify-center gap-3">
        <span className="flex items-center gap-1 text-gold-400">
          <Sparkles className="w-3.5 h-3.5" /> Certificate of Authenticity Included
        </span>
        <span className="hidden md:inline text-navy-200">|</span>
        <span className="hidden md:inline text-navy-100">Complimentary Insured Worldwide Shipping on Select Artworks</span>
        
        {/* Quick Role Switcher for Demo Evaluation */}
        <div className="ml-auto hidden lg:flex items-center gap-2 text-xs">
          <span className="text-gold-400 font-medium">Demo View:</span>
          <button
            onClick={() => setCurrentUserRole('customer')}
            className={`px-2 py-0.5 rounded text-[11px] transition ${
              currentUser.role === 'customer' ? 'bg-gold-500 text-navy-900 font-semibold' : 'text-ivory-200 hover:text-white'
            }`}
          >
            Customer
          </button>
          <button
            onClick={() => setCurrentUserRole('artist')}
            className={`px-2 py-0.5 rounded text-[11px] transition ${
              currentUser.role === 'artist' ? 'bg-gold-500 text-navy-900 font-semibold' : 'text-ivory-200 hover:text-white'
            }`}
          >
            Artist Portal
          </button>
          <button
            onClick={() => setCurrentUserRole('admin')}
            className={`px-2 py-0.5 rounded text-[11px] transition ${
              currentUser.role === 'admin' ? 'bg-gold-500 text-navy-900 font-semibold' : 'text-ivory-200 hover:text-white'
            }`}
          >
            Admin Panel
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <button
              onClick={() => setActivePage('home')}
              className="flex items-center gap-3 group text-left focus:outline-none"
            >
              <img
                src={LOGO_URL}
                alt="Richbecky Gallery"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  // Elegant SVG fallback if local path is unavailable in certain environments
                  (e.target as HTMLElement).style.display = 'none';
                  const fallback = (e.target as HTMLElement).nextElementSibling;
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="hidden flex-col">
                <span className="font-serif text-xl tracking-wider font-bold text-navy-800 uppercase">
                  Richbecky
                </span>
                <span className="text-[10px] tracking-[0.25em] text-gold-600 font-semibold uppercase -mt-1">
                  Gallery
                </span>
              </div>
            </button>
          </div>

          {/* Desktop Live Search Bar */}
          <div ref={searchRef} className="hidden md:flex flex-1 max-w-md relative mx-4">
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
                className="w-full bg-white/80 border border-ivory-400 rounded-full py-2.5 pl-10 pr-4 text-sm text-navy-900 placeholder-neutral-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition duration-200 shadow-sm"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </form>

            {/* Live Search Autocomplete Dropdown */}
            {searchFocused && searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-gallery border border-ivory-300 overflow-hidden z-50 animate-fade-in">
                <div className="p-2 text-xs font-semibold text-neutral-400 uppercase tracking-wider px-3 border-b border-ivory-200">
                  Matching Artworks
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
                    <img src={art.imageUrl} alt={art.title} className="w-10 h-10 object-cover rounded" />
                    <div>
                      <div className="text-sm font-medium text-navy-800 line-clamp-1">{art.title}</div>
                      <div className="text-xs text-neutral-500">{art.artistName} • ${art.price.toLocaleString()}</div>
                    </div>
                  </button>
                ))}
                <button
                  onClick={() => {
                    setActivePage('catalogue');
                    setSearchFocused(false);
                  }}
                  className="w-full py-2.5 bg-ivory-100 text-center text-xs font-semibold text-gold-700 hover:bg-ivory-200 transition"
                >
                  View all matching catalogue results →
                </button>
              </div>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium">
            <button
              onClick={() => setActivePage('catalogue')}
              className={`transition-colors py-1 border-b-2 ${
                activePage === 'catalogue' ? 'border-gold-500 text-navy-800 font-semibold' : 'border-transparent text-neutral-600 hover:text-navy-800'
              }`}
            >
              Artworks
            </button>
            <button
              onClick={() => {
                setActivePage('catalogue');
                setFilterState(prev => ({ ...prev, category: 'Abstract' }));
              }}
              className="text-neutral-600 hover:text-navy-800 transition-colors py-1"
            >
              Categories
            </button>
            <button
              onClick={() => {
                setActivePage('artist-profile');
              }}
              className={`transition-colors py-1 border-b-2 ${
                activePage === 'artist-profile' ? 'border-gold-500 text-navy-800 font-semibold' : 'border-transparent text-neutral-600 hover:text-navy-800'
              }`}
            >
              Artists
            </button>

            {/* Contextual Action Links based on active role */}
            {currentUser.role === 'artist' && (
              <button
                onClick={() => setActivePage('add-artwork')}
                className="flex items-center gap-1.5 text-gold-700 hover:text-gold-800 font-medium bg-gold-50 px-3 py-1.5 rounded-full border border-gold-300 transition"
              >
                <PlusCircle className="w-4 h-4" /> Add Artwork
              </button>
            )}

            {currentUser.role === 'admin' && (
              <button
                onClick={() => setActivePage('admin-dashboard')}
                className="flex items-center gap-1.5 text-navy-800 hover:text-navy-900 font-medium bg-ivory-200 px-3 py-1.5 rounded-full border border-navy-200 transition"
              >
                <LayoutDashboard className="w-4 h-4" /> Admin Console
              </button>
            )}
          </nav>

          {/* Right Icons (Wishlist, Cart, Account) */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Wishlist Icon */}
            <button
              onClick={() => setActivePage('wishlist')}
              className="relative p-2 text-neutral-700 hover:text-gold-600 transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-gold-500 text-navy-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={() => setActivePage('cart')}
              className="relative p-2 text-neutral-700 hover:text-gold-600 transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-navy-800 text-gold-400 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account / Role dropdown */}
            <div className="relative">
              <button
                onClick={() => setActivePage('account')}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-ivory-300 transition text-neutral-700"
                aria-label="Account"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full object-cover border border-gold-400"
                />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-navy-800 hover:text-gold-600 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-100 border-b border-ivory-300 px-4 pt-2 pb-6 space-y-4 animate-fade-in">
          
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={filterState.search}
              onChange={(e) => setFilterState(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search artworks..."
              className="w-full bg-white border border-ivory-400 rounded-full py-2 pl-9 pr-4 text-sm"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          </form>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-3 pt-2 text-sm font-medium">
            <button
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200 text-navy-800"
            >
              Home Page
            </button>
            <button
              onClick={() => { setActivePage('catalogue'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200 text-navy-800"
            >
              Browse Artworks Catalogue
            </button>
            <button
              onClick={() => { setActivePage('artist-profile'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200 text-navy-800"
            >
              Featured Artists
            </button>
            <button
              onClick={() => { setActivePage('account'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200 text-navy-800"
            >
              My Account & Orders
            </button>
            <button
              onClick={() => { setActivePage('artist-register'); setMobileMenuOpen(false); }}
              className="text-left py-2 border-b border-ivory-200 text-gold-700"
            >
              Apply as Artist
            </button>
            {currentUser.role === 'artist' && (
              <button
                onClick={() => { setActivePage('artist-dashboard'); setMobileMenuOpen(false); }}
                className="text-left py-2 border-b border-ivory-200 text-gold-700"
              >
                Artist Dashboard
              </button>
            )}
            {currentUser.role === 'admin' && (
              <button
                onClick={() => { setActivePage('admin-dashboard'); setMobileMenuOpen(false); }}
                className="text-left py-2 border-b border-ivory-200 text-navy-800 font-bold"
              >
                Admin Approval Console
              </button>
            )}
          </div>

          {/* Mobile Role Switcher */}
          <div className="pt-2">
            <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
              Preview Role View:
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => { setCurrentUserRole('customer'); setMobileMenuOpen(false); }}
                className={`py-1.5 rounded ${currentUser.role === 'customer' ? 'bg-navy-800 text-gold-400 font-medium' : 'bg-ivory-200 text-navy-800'}`}
              >
                Customer
              </button>
              <button
                onClick={() => { setCurrentUserRole('artist'); setMobileMenuOpen(false); }}
                className={`py-1.5 rounded ${currentUser.role === 'artist' ? 'bg-navy-800 text-gold-400 font-medium' : 'bg-ivory-200 text-navy-800'}`}
              >
                Artist
              </button>
              <button
                onClick={() => { setCurrentUserRole('admin'); setMobileMenuOpen(false); }}
                className={`py-1.5 rounded ${currentUser.role === 'admin' ? 'bg-navy-800 text-gold-400 font-medium' : 'bg-ivory-200 text-navy-800'}`}
              >
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
