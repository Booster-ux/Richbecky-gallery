import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { Filter, SlidersHorizontal, Search, RotateCcw, X, ChevronDown } from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const { artworks, artists, categories, filterState, setFilterState, resetFilters } = useGallery();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract available mediums
  const mediums = ['All', ...Array.from(new Set(artworks.map(a => a.medium)))];

  // Apply filters on approved artworks
  let filtered = artworks.filter(art => art.status === 'Approved');

  // Search filter
  if (filterState.search.trim()) {
    const q = filterState.search.toLowerCase();
    filtered = filtered.filter(art =>
      art.title.toLowerCase().includes(q) ||
      art.artistName.toLowerCase().includes(q) ||
      art.category.toLowerCase().includes(q) ||
      art.medium.toLowerCase().includes(q)
    );
  }

  // Category filter
  if (filterState.category && filterState.category !== 'All') {
    filtered = filtered.filter(art => art.category === filterState.category);
  }

  // Artist filter
  if (filterState.artist && filterState.artist !== 'All') {
    filtered = filtered.filter(art => art.artistId === filterState.artist || art.artistName === filterState.artist);
  }

  // Medium filter
  if (filterState.medium && filterState.medium !== 'All') {
    filtered = filtered.filter(art => art.medium === filterState.medium);
  }

  // Type filter (Original / Fine Art Print)
  if (filterState.type && filterState.type !== 'All') {
    filtered = filtered.filter(art => art.type === filterState.type);
  }

  // Price filter
  filtered = filtered.filter(art => art.price >= filterState.minPrice && art.price <= filterState.maxPrice);

  // Featured toggle
  if (filterState.isFeatured) {
    filtered = filtered.filter(art => art.isFeatured);
  }

  // New Arrivals toggle
  if (filterState.isNew) {
    filtered = filtered.filter(art => art.isNewArrival);
  }

  // Sorting
  filtered.sort((a, b) => {
    if (filterState.sortBy === 'price-low') return a.price - b.price;
    if (filterState.sortBy === 'price-high') return b.price - a.price;
    if (filterState.sortBy === 'title-asc') return a.title.localeCompare(b.title);
    if (filterState.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in space-y-8">
      
      {/* Header Banner */}
      <div className="border-b border-ivory-300 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">
            Collection Shop
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-navy-900 mt-1">
            Artwork Catalogue
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Showing {filtered.length} of {artworks.filter(a => a.status === 'Approved').length} artworks
          </p>
        </div>

        {/* Top Search & Filter Toggles */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-white border border-ivory-400 rounded text-xs font-medium text-navy-800 flex items-center gap-2 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-600" /> Filters
          </button>

          {/* Sort Dropdown */}
          <div className="relative flex items-center bg-white border border-ivory-400 rounded px-3 py-2 text-xs font-medium text-navy-900 shadow-sm">
            <span className="text-neutral-400 mr-2">Sort By:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-transparent focus:outline-none cursor-pointer pr-4 font-semibold text-navy-800"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest Arrivals</option>
              <option value="title-asc">Title: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout: Sidebar Filters + Artwork Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle h-fit">
          <div className="flex items-center justify-between border-b border-ivory-200 pb-4">
            <h3 className="font-serif text-base font-semibold text-navy-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-gold-600" /> Refine Artworks
            </h3>
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-400 hover:text-gold-700 flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
          </div>

          {/* Artwork Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider">Artwork Type</label>
            <div className="grid grid-cols-3 gap-1 bg-ivory-200 p-1 rounded">
              {(['All', 'Original', 'Fine Art Print'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterState(prev => ({ ...prev, type }))}
                  className={`py-1 text-[11px] rounded font-medium transition ${
                    filterState.type === type ? 'bg-navy-900 text-gold-400 font-semibold shadow-sm' : 'text-neutral-600 hover:text-navy-900'
                  }`}
                >
                  {type === 'Fine Art Print' ? 'Print' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider">Category</label>
            <select
              value={filterState.category}
              onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2 text-xs text-navy-900 focus:outline-none focus:border-gold-500"
            >
              <option value="All">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Artist Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider">Artist</label>
            <select
              value={filterState.artist}
              onChange={(e) => setFilterState(prev => ({ ...prev, artist: e.target.value }))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2 text-xs text-navy-900 focus:outline-none focus:border-gold-500"
            >
              <option value="All">All Artists</option>
              {artists.map(a => (
                <option key={a.id} value={a.name}>{a.name} ({a.country})</option>
              ))}
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <label className="font-semibold text-navy-900 uppercase tracking-wider">Price Range</label>
              <span className="text-gold-700 font-medium">${filterState.minPrice} - ${filterState.maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="10000"
              step="250"
              value={filterState.maxPrice}
              onChange={(e) => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
              className="w-full accent-gold-500 cursor-pointer"
            />
          </div>

          {/* Medium */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider">Medium</label>
            <select
              value={filterState.medium}
              onChange={(e) => setFilterState(prev => ({ ...prev, medium: e.target.value }))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2 text-xs text-navy-900 focus:outline-none focus:border-gold-500"
            >
              {mediums.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Special Toggles */}
          <div className="pt-2 border-t border-ivory-200 space-y-2 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-navy-800">
              <input
                type="checkbox"
                checked={filterState.isFeatured}
                onChange={(e) => setFilterState(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="accent-gold-500 rounded"
              />
              Featured Artworks Only
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-navy-800">
              <input
                type="checkbox"
                checked={filterState.isNew}
                onChange={(e) => setFilterState(prev => ({ ...prev, isNew: e.target.checked }))}
                className="accent-gold-500 rounded"
              />
              New Arrivals Only
            </label>
          </div>

        </aside>

        {/* Artwork Grid & Active Filters */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Chips */}
          {(filterState.category !== 'All' || filterState.type !== 'All' || filterState.artist !== 'All' || filterState.isFeatured || filterState.search) && (
            <div className="flex flex-wrap items-center gap-2 bg-ivory-200 p-3 rounded-lg text-xs">
              <span className="font-semibold text-navy-900">Active Filters:</span>
              {filterState.search && (
                <span className="bg-white px-2.5 py-1 rounded-full border border-ivory-300 text-navy-800 flex items-center gap-1">
                  Search: "{filterState.search}"
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(prev => ({ ...prev, search: '' }))} />
                </span>
              )}
              {filterState.category !== 'All' && (
                <span className="bg-white px-2.5 py-1 rounded-full border border-ivory-300 text-navy-800 flex items-center gap-1">
                  Category: {filterState.category}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(prev => ({ ...prev, category: 'All' }))} />
                </span>
              )}
              {filterState.type !== 'All' && (
                <span className="bg-white px-2.5 py-1 rounded-full border border-ivory-300 text-navy-800 flex items-center gap-1">
                  Type: {filterState.type}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(prev => ({ ...prev, type: 'All' }))} />
                </span>
              )}
              {filterState.artist !== 'All' && (
                <span className="bg-white px-2.5 py-1 rounded-full border border-ivory-300 text-navy-800 flex items-center gap-1">
                  Artist: {filterState.artist}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => setFilterState(prev => ({ ...prev, artist: 'All' }))} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-gold-700 underline font-medium hover:text-navy-900 ml-auto"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Grid Display */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(art => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl border border-ivory-300 p-12 text-center space-y-4">
              <Search className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="font-serif text-xl font-semibold text-navy-900">No matching artworks found</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Try adjusting your search terms or clearing selected filter criteria to explore the full gallery.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 bg-navy-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-navy-950 transition"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Drawer Filter Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
              <h3 className="font-serif text-lg font-semibold text-navy-900">Refine Artworks</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-neutral-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Filter Controls */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-navy-900 uppercase">Artwork Type</label>
                <select
                  value={filterState.type}
                  onChange={(e) => setFilterState(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full mt-1 bg-ivory-100 p-2 text-xs border border-ivory-300 rounded"
                >
                  <option value="All">All Types</option>
                  <option value="Original">Original Artwork</option>
                  <option value="Fine Art Print">Fine Art Print</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-900 uppercase">Category</label>
                <select
                  value={filterState.category}
                  onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full mt-1 bg-ivory-100 p-2 text-xs border border-ivory-300 rounded"
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-900 uppercase">Price Limit: ${filterState.maxPrice}</label>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filterState.maxPrice}
                  onChange={(e) => setFilterState(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-gold-500"
                />
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-navy-900 text-gold-400 font-semibold text-xs rounded uppercase"
            >
              Apply Filters ({filtered.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
