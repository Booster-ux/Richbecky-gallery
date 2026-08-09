import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { FilterState } from '../types';
import { Filter, SlidersHorizontal, Search, RotateCcw, X, Layers } from 'lucide-react';

export const CataloguePage: React.FC = () => {
  const {
    artworks,
    artists,
    categories,
    filterState,
    setFilterState,
    resetFilters,
    getConvertedPrice,
    formatPrice
  } = useGallery();
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

  // Featured toggle
  if (filterState.isFeatured) {
    filtered = filtered.filter(art => art.isFeatured);
  }

  // New Arrivals toggle
  if (filterState.isNew) {
    filtered = filtered.filter(art => art.isNewArrival);
  }

  // Sorting based on converted customer display price
  filtered.sort((a, b) => {
    const priceA = getConvertedPrice(a.price, a.currency);
    const priceB = getConvertedPrice(b.price, b.currency);
    if (filterState.sortBy === 'price-low') return priceA - priceB;
    if (filterState.sortBy === 'price-high') return priceB - priceA;
    if (filterState.sortBy === 'title-asc') return a.title.localeCompare(b.title);
    if (filterState.sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-10">
      
      {/* Header Banner */}
      <div className="border-b border-ivory-300 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" /> Fine Art Catalogue
          </span>
          <h1 className="font-serif text-3xl md:text-5xl font-semibold text-navy-950">
            {filterState.category !== 'All' ? `${filterState.category} Collection` : 'All Masterworks'}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-light pt-1">
            Showing {filtered.length} of {artworks.filter(a => a.status === 'Approved').length} authenticated contemporary artworks
          </p>
        </div>

        {/* Top Controls: Mobile Filter + Sort */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden px-4 py-2.5 bg-white border border-ivory-400 rounded text-xs font-semibold text-navy-900 flex items-center gap-2 shadow-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-gold-600" /> Refine ({filtered.length})
          </button>

          <div className="relative flex items-center bg-white border border-ivory-400 rounded px-3.5 py-2.5 text-xs font-semibold text-navy-950 shadow-sm">
            <span className="text-neutral-400 uppercase tracking-wider text-[11px] mr-2">Sort:</span>
            <select
              value={filterState.sortBy}
              onChange={(e) => setFilterState(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
              className="bg-transparent focus:outline-none cursor-pointer pr-4 font-semibold text-navy-900"
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

      {/* Prominent Category Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-ivory-200">
        <span className="text-xs font-semibold text-navy-900 uppercase tracking-wider mr-2 whitespace-nowrap hidden sm:inline">
          Categories:
        </span>
        <button
          onClick={() => setFilterState(prev => ({ ...prev, category: 'All' }))}
          className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition ${
            filterState.category === 'All'
              ? 'bg-navy-950 text-gold-400 shadow-md'
              : 'bg-white text-navy-800 border border-ivory-300 hover:bg-ivory-200'
          }`}
        >
          All Categories ({artworks.filter(a => a.status === 'Approved').length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilterState(prev => ({ ...prev, category: cat.name }))}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition ${
              filterState.category === cat.name
                ? 'bg-navy-950 text-gold-400 shadow-md'
                : 'bg-white text-navy-800 border border-ivory-300 hover:bg-ivory-200'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
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
              <RotateCcw className="w-3 h-3" /> Reset All
            </button>
          </div>

          {/* Artwork Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider block">Artwork Type</label>
            <div className="grid grid-cols-3 gap-1 bg-ivory-200 p-1 rounded">
              {(['All', 'Original', 'Fine Art Print'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setFilterState(prev => ({ ...prev, type }))}
                  className={`py-1.5 text-[11px] rounded font-semibold transition ${
                    filterState.type === type ? 'bg-navy-950 text-gold-400 shadow-sm' : 'text-neutral-600 hover:text-navy-900'
                  }`}
                >
                  {type === 'Fine Art Print' ? 'Print' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider block">Category</label>
            <select
              value={filterState.category}
              onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-xs text-navy-900 font-medium focus:outline-none focus:border-gold-500"
            >
              <option value="All">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Artist Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider block">Artist</label>
            <select
              value={filterState.artist}
              onChange={(e) => setFilterState(prev => ({ ...prev, artist: e.target.value }))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-xs text-navy-900 font-medium focus:outline-none focus:border-gold-500"
            >
              <option value="All">All Artists</option>
              {artists.map(a => (
                <option key={a.id} value={a.name}>{a.name} ({a.country})</option>
              ))}
            </select>
          </div>

          {/* Medium Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-navy-900 uppercase tracking-wider block">Medium</label>
            <select
              value={filterState.medium}
              onChange={(e) => setFilterState(prev => ({ ...prev, medium: e.target.value }))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-xs text-navy-900 font-medium focus:outline-none focus:border-gold-500"
            >
              {mediums.map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          {/* Special Toggles */}
          <div className="pt-3 border-t border-ivory-200 space-y-2.5 text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-navy-900 font-medium">
              <input
                type="checkbox"
                checked={filterState.isFeatured}
                onChange={(e) => setFilterState(prev => ({ ...prev, isFeatured: e.target.checked }))}
                className="accent-gold-500 rounded"
              />
              Featured Masterworks Only
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-navy-900 font-medium">
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

        {/* Artwork Grid & Active Filter Chips */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Active Filter Chips */}
          {(filterState.category !== 'All' || filterState.type !== 'All' || filterState.artist !== 'All' || filterState.isFeatured || filterState.search) && (
            <div className="flex flex-wrap items-center gap-2 bg-ivory-200 p-3.5 rounded-lg text-xs">
              <span className="font-semibold text-navy-900">Active Criteria:</span>
              {filterState.search && (
                <span className="bg-white px-3 py-1 rounded-full border border-ivory-300 text-navy-900 font-medium flex items-center gap-1.5 shadow-sm">
                  Search: "{filterState.search}"
                  <X className="w-3.5 h-3.5 cursor-pointer text-neutral-400 hover:text-navy-950" onClick={() => setFilterState(prev => ({ ...prev, search: '' }))} />
                </span>
              )}
              {filterState.category !== 'All' && (
                <span className="bg-white px-3 py-1 rounded-full border border-ivory-300 text-navy-900 font-medium flex items-center gap-1.5 shadow-sm">
                  Category: {filterState.category}
                  <X className="w-3.5 h-3.5 cursor-pointer text-neutral-400 hover:text-navy-950" onClick={() => setFilterState(prev => ({ ...prev, category: 'All' }))} />
                </span>
              )}
              {filterState.type !== 'All' && (
                <span className="bg-white px-3 py-1 rounded-full border border-ivory-300 text-navy-900 font-medium flex items-center gap-1.5 shadow-sm">
                  Type: {filterState.type}
                  <X className="w-3.5 h-3.5 cursor-pointer text-neutral-400 hover:text-navy-950" onClick={() => setFilterState(prev => ({ ...prev, type: 'All' }))} />
                </span>
              )}
              {filterState.artist !== 'All' && (
                <span className="bg-white px-3 py-1 rounded-full border border-ivory-300 text-navy-900 font-medium flex items-center gap-1.5 shadow-sm">
                  Artist: {filterState.artist}
                  <X className="w-3.5 h-3.5 cursor-pointer text-neutral-400 hover:text-navy-950" onClick={() => setFilterState(prev => ({ ...prev, artist: 'All' }))} />
                </span>
              )}
              <button
                onClick={resetFilters}
                className="text-gold-700 underline font-semibold hover:text-navy-950 ml-auto"
              >
                Clear All Criteria
              </button>
            </div>
          )}

          {/* Grid Display */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(art => (
                <ArtworkCard key={art.id} artwork={art} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-xl border border-ivory-300 p-14 text-center space-y-4">
              <Search className="w-12 h-12 text-neutral-300 mx-auto" />
              <h3 className="font-serif text-2xl font-semibold text-navy-950">No matching artworks found</h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto font-light leading-relaxed">
                Adjust your search keywords or clear selected filter criteria to explore the complete gallery collection.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-navy-950 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-navy-950 transition shadow-md"
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
                <label className="text-xs font-semibold text-navy-900 uppercase block">Artwork Type</label>
                <select
                  value={filterState.type}
                  onChange={(e) => setFilterState(prev => ({ ...prev, type: e.target.value as FilterState['type'] }))}
                  className="w-full mt-1 bg-ivory-100 p-2.5 text-xs border border-ivory-300 rounded"
                >
                  <option value="All">All Types</option>
                  <option value="Original">Original Artwork</option>
                  <option value="Fine Art Print">Fine Art Print</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-navy-900 uppercase block">Category</label>
                <select
                  value={filterState.category}
                  onChange={(e) => setFilterState(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full mt-1 bg-ivory-100 p-2.5 text-xs border border-ivory-300 rounded"
                >
                  <option value="All">All Categories</option>
                  {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                </select>
              </div>
            </div>

            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="w-full py-3 bg-navy-950 text-gold-400 font-semibold text-xs rounded uppercase tracking-wider"
            >
              Apply Filters ({filtered.length})
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
