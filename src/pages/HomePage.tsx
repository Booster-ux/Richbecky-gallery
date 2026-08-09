import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    artworks,
    artists,
    categories,
    setActivePage,
    navigateToArtwork,
    filterState,
    setFilterState,
    formatPrice
  } = useGallery();

  // Featured artwork for Hero section
  const featuredHeroArt = artworks.find(art => art.id === 'art-1') || artworks[0];
  const featuredArtworks = artworks.filter(art => art.isFeatured && art.status === 'Approved');
  const approvedArtworks = artworks.filter(art => art.status === 'Approved');

  // Filter catalogue preview according to active filterState.type tab
  const displayArtworks = approvedArtworks.filter(art => {
    if (filterState.type && filterState.type !== 'All') {
      return art.type === filterState.type;
    }
    return true;
  });

  return (
    <div className="space-y-16 pb-16 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative bg-navy-900 text-ivory-100 overflow-hidden border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Minimalist Hero Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-navy-800 border border-gold-500/30 text-gold-400 text-xs tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" /> Featured Exhibition • Summer Collection
              </div>
              
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight tracking-tight text-ivory-100">
                Where Masterpiece Art Meets Collectors.
              </h1>
              
              <p className="text-sm sm:text-base text-neutral-300 max-w-lg font-light leading-relaxed">
                Discover authenticated original artworks and limited-edition fine art prints curated from world-renowned contemporary masters.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('catalogue')}
                  className="px-6 py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-semibold text-xs uppercase tracking-wider transition-all duration-200 shadow-gold-glow flex items-center gap-2 group"
                >
                  Explore Artworks <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, type: 'Original' }));
                    setActivePage('catalogue');
                  }}
                  className="px-6 py-3.5 bg-navy-800/80 hover:bg-navy-800 text-ivory-200 border border-ivory-300/20 rounded font-medium text-xs uppercase tracking-wider transition"
                >
                  Original Collection
                </button>
              </div>
            </div>

            {/* Featured Hero Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                onClick={() => navigateToArtwork(featuredHeroArt)}
                className="relative group cursor-pointer max-w-md w-full rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl bg-navy-800"
              >
                <img
                  src={featuredHeroArt.imageUrl}
                  alt={featuredHeroArt.title}
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-90 p-6 flex flex-col justify-end">
                  <span className="text-gold-400 text-[11px] uppercase tracking-widest font-medium mb-1">
                    Featured Masterpiece
                  </span>
                  <h3 className="font-serif text-xl text-white font-bold">{featuredHeroArt.title}</h3>
                  <p className="text-xs text-neutral-300">
                    {featuredHeroArt.artistName} • {formatPrice(featuredHeroArt.price, featuredHeroArt.currency)}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Shortcuts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Curated Media</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy-900 mt-1">Explore Categories</h2>
          </div>
          <button
            onClick={() => setActivePage('catalogue')}
            className="text-xs font-semibold text-gold-700 hover:text-navy-900 uppercase tracking-wider flex items-center gap-1 transition"
          >
            All Categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: cat.name }));
                setActivePage('catalogue');
              }}
              className="group relative h-48 rounded-lg overflow-hidden cursor-pointer border border-ivory-300 shadow-subtle hover:shadow-gallery transition duration-300"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent p-4 flex flex-col justify-end">
                <h3 className="font-serif text-base font-semibold text-white group-hover:text-gold-300 transition">{cat.name}</h3>
                <span className="text-[11px] text-neutral-300">{cat.count} Available Works</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Handpicked Selection</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy-900 mt-1">Featured Artworks</h2>
          </div>
          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, isFeatured: true }));
              setActivePage('catalogue');
            }}
            className="text-xs font-semibold text-gold-700 hover:text-navy-900 uppercase tracking-wider flex items-center gap-1 transition"
          >
            View Featured Collection <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtworks.slice(0, 4).map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* Authenticity Banner */}
      <section className="bg-ivory-200 border-y border-ivory-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <Award className="w-10 h-10 text-gold-600 mx-auto" />
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-900 max-w-2xl mx-auto">
            Guaranteed Museum-Grade Authenticity
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-light leading-relaxed">
            Every original artwork purchased through Richbecky Gallery includes a signed Certificate of Authenticity issued directly by the master artist and our gallery directors.
          </p>
        </div>
      </section>

      {/* Main Artwork Grid / Catalogue Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Gallery Collection</span>
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-navy-900 mt-1">Curated Catalogue</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'All' })); }}
              className={`px-3 py-1.5 rounded-full transition ${filterState.type === 'All' ? 'bg-navy-900 text-gold-400 font-medium' : 'bg-ivory-200 text-neutral-700'}`}
            >
              All Artworks
            </button>
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'Original' })); }}
              className={`px-3 py-1.5 rounded-full transition ${filterState.type === 'Original' ? 'bg-navy-900 text-gold-400 font-medium' : 'bg-ivory-200 text-neutral-700'}`}
            >
              Original Artworks Only
            </button>
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'Fine Art Print' })); }}
              className={`px-3 py-1.5 rounded-full transition ${filterState.type === 'Fine Art Print' ? 'bg-navy-900 text-gold-400 font-medium' : 'bg-ivory-200 text-neutral-700'}`}
            >
              Fine Art Prints
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayArtworks.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setActivePage('catalogue')}
            className="px-8 py-3.5 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition duration-300 shadow-md"
          >
            Explore Complete Gallery Catalogue ({approvedArtworks.length} Artworks)
          </button>
        </div>
      </section>

      {/* Featured Artist Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-ivory-100 rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[320px]">
              <img
                src={artists[0].coverImage}
                alt={artists[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center space-y-4">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">
                Artist Spotlight • {artists[0].country}
              </span>
              <h3 className="font-serif text-3xl font-bold text-white">{artists[0].name}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                "{artists[0].bio}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setActivePage('artist-profile');
                  }}
                  className="px-5 py-2.5 bg-gold-500 text-navy-950 hover:bg-gold-400 rounded text-xs font-semibold uppercase tracking-wider transition"
                >
                  View Artist Profile & Works
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
