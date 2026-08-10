import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { ArrowRight, Sparkles, Award, ShieldCheck, BookOpen, Mail } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';
import { handleImageError, getProductionImageUrl } from '../services/imageService';

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

  // Featured artwork for Hero section (ISEMBAYE)
  const featuredHeroArt = artworks.find(art => art.id === 'art-1') || artworks[0];
  const featuredArtworks = artworks.filter(art => art.isFeatured && art.status === 'Approved');
  const newArrivals = artworks.filter(art => art.isNewArrival && art.status === 'Approved');
  const approvedArtworks = artworks.filter(art => art.status === 'Approved');

  // Filter catalogue preview according to active filterState.type tab
  const displayArtworks = approvedArtworks.filter(art => {
    if (filterState.type && filterState.type !== 'All') {
      return art.type === filterState.type;
    }
    return true;
  });

  return (
    <div className="space-y-24 pb-24 animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-navy-950 text-ivory-100 overflow-hidden border-b border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-4 h-4 text-gold-400" /> Featured Masterpiece Exhibition
              </div>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.12] tracking-tight text-white">
                Where Contemporary African Masterpieces Meet Discerning Collectors.
              </h1>
              
              <p className="text-base sm:text-lg text-neutral-300 max-w-xl font-light leading-relaxed">
                Richbecky Gallery curates authenticated original oil paintings, traditional fabric collages, and limited edition fine art prints directly from master visual artists.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-5">
                <button
                  onClick={() => setActivePage('catalogue')}
                  className="px-9 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-sm font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-xl flex items-center gap-2.5 group"
                >
                  Explore Complete Collection <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, type: 'Original' }));
                    setActivePage('catalogue');
                  }}
                  className="px-9 py-4 bg-navy-900 hover:bg-navy-850 text-ivory-100 border border-ivory-300/25 rounded-sm font-bold text-xs uppercase tracking-widest transition"
                >
                  Original Collection
                </button>
              </div>
            </div>

            {/* Large Dominant Hero Visual with Uncropped Object-Contain */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                onClick={() => navigateToArtwork(featuredHeroArt)}
                className="relative group cursor-pointer w-full max-w-xl rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl bg-navy-900 p-4"
              >
                <div className="w-full h-[480px] sm:h-[600px] flex items-center justify-center bg-navy-950/60 rounded-lg overflow-hidden">
                  <img
                    src={getProductionImageUrl(featuredHeroArt.imageUrl, featuredHeroArt.title)}
                    alt={featuredHeroArt.title}
                    onError={(e) => handleImageError(e, featuredHeroArt.title)}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent opacity-95 p-8 flex flex-col justify-end">
                  <span className="text-gold-400 text-xs uppercase tracking-widest font-bold mb-1">
                    Featured Masterwork • 2026
                  </span>
                  <h3 className="font-serif text-3xl text-white font-semibold">{featuredHeroArt.title}</h3>
                  <p className="text-sm text-neutral-300 mt-1 font-light">
                    By {featuredHeroArt.artistName} • {formatPrice(featuredHeroArt.price, featuredHeroArt.currency)}
                  </p>
                  <span className="text-xs text-gold-400 underline font-semibold mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Masterwork Details & Certificate Provenance →
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 border-b border-ivory-300 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">Curatorial Highlight</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">Featured Collection</h2>
          </div>
          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, isFeatured: true }));
              setActivePage('catalogue');
            }}
            className="text-xs font-bold text-navy-950 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1.5 transition"
          >
            Explore Featured Works <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredArtworks.slice(0, 4).map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* 3. EXPLORE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12 border-b border-ivory-300 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">Curated Media</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">Explore Categories</h2>
          </div>
          <button
            onClick={() => setActivePage('catalogue')}
            className="text-xs font-bold text-navy-950 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1.5 transition"
          >
            All Categories <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: cat.name }));
                setActivePage('catalogue');
              }}
              className="group relative h-72 rounded-xl overflow-hidden cursor-pointer border border-ivory-300 shadow-subtle hover:shadow-2xl transition duration-500 bg-ivory-200 p-2"
            >
              <img
                src={cat.image}
                alt={cat.name}
                onError={(e) => handleImageError(e, cat.name)}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent p-6 flex flex-col justify-end space-y-1">
                <span className="text-xs text-gold-400 font-bold uppercase tracking-widest">{cat.count} Masterworks</span>
                <h3 className="font-serif text-2xl font-semibold text-white group-hover:text-gold-300 transition">{cat.name}</h3>
                <p className="text-xs text-neutral-300 font-light line-clamp-2">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED ARTWORKS GRID & TYPE FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-ivory-300 pb-5">
          <div className="space-y-1">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">Masterwork Inventory</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">Curated Catalogue</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'All' })); }}
              className={`px-5 py-2.5 rounded-full transition ${filterState.type === 'All' ? 'bg-navy-950 text-gold-400 shadow-md' : 'bg-ivory-200 text-navy-950 hover:bg-ivory-300'}`}
            >
              All Artworks
            </button>
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'Original' })); }}
              className={`px-5 py-2.5 rounded-full transition ${filterState.type === 'Original' ? 'bg-navy-950 text-gold-400 shadow-md' : 'bg-ivory-200 text-navy-950 hover:bg-ivory-300'}`}
            >
              Original Artworks Only
            </button>
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'Fine Art Print' })); }}
              className={`px-5 py-2.5 rounded-full transition ${filterState.type === 'Fine Art Print' ? 'bg-navy-950 text-gold-400 shadow-md' : 'bg-ivory-200 text-navy-950 hover:bg-ivory-300'}`}
            >
              Fine Art Prints
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayArtworks.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => setActivePage('catalogue')}
            className="px-10 py-4.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-sm font-bold text-xs uppercase tracking-widest transition duration-300 shadow-xl inline-flex items-center gap-2.5"
          >
            Explore Complete Catalogue ({approvedArtworks.length} Artworks) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 border-b border-ivory-300 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">Recent Acquisitions</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">New Arrivals</h2>
            </div>
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, isNew: true }));
                setActivePage('catalogue');
              }}
              className="text-xs font-bold text-navy-950 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1.5 transition"
            >
              View New Arrivals <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 3).map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </section>
      )}

      {/* 6. ARTIST SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-ivory-100 rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[400px] flex items-center justify-center bg-navy-900 p-4">
              <img
                src={artists[0].coverImage}
                alt={artists[0].name}
                onError={(e) => handleImageError(e, artists[0].name)}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center space-y-6">
              <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">
                Artist Spotlight • {artists[0].country}
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-semibold text-white">{artists[0].name}</h3>
              <p className="text-base text-neutral-300 leading-relaxed font-light">
                "{artists[0].bio}"
              </p>
              <div className="pt-4">
                <button
                  onClick={() => setActivePage('artist-profile')}
                  className="px-8 py-4 bg-gold-500 text-navy-950 hover:bg-gold-400 rounded-sm text-xs font-bold uppercase tracking-widest transition shadow-lg inline-flex items-center gap-2.5"
                >
                  View Artist Roster & Works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT RICHBECKY GALLERY */}
      <section className="bg-ivory-200 border-y border-ivory-300 py-24">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-16 w-auto mx-auto object-contain" />
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold text-navy-950">
            Connecting African Contemporary Masters with International Collectors
          </h2>
          <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed">
            Richbecky Gallery was founded as a dedicated fine art platform to represent distinguished contemporary African visual artists on the global stage. Every masterwork in our gallery represents a unique cultural lineage, narrative depth, and uncompromised curatorial excellence.
          </p>
          <div className="pt-3">
            <button
              onClick={() => setActivePage('about')}
              className="text-sm font-bold text-gold-700 hover:text-navy-950 uppercase tracking-widest underline transition"
            >
              Read Full Gallery Story & Curatorial Philosophy →
            </button>
          </div>
        </div>
      </section>

      {/* 8. CERTIFICATE / TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 sm:p-16 rounded-2xl border border-ivory-300 shadow-gallery flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs uppercase tracking-widest font-bold">
              <Award className="w-4 h-4" /> Signed Certificate Included
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">
              Guaranteed Museum-Grade Authenticity
            </h3>
            <p className="text-base text-neutral-700 font-light leading-relaxed">
              Every original artwork acquired through Richbecky Gallery arrives with a signed Certificate of Authenticity specifying medium, dimensions, provenance, and gallery director seal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="p-8 bg-navy-950 text-ivory-100 rounded-xl border border-gold-500/30 text-center space-y-3 min-w-[240px]">
              <ShieldCheck className="w-10 h-10 text-gold-400 mx-auto" />
              <span className="text-xs font-bold uppercase tracking-wider block text-white">Insured Global Delivery</span>
              <p className="text-xs text-neutral-300 font-light">White-glove climate transit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. JOURNAL / NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-950 text-ivory-100 p-10 sm:p-16 rounded-2xl border border-gold-500/20 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-gold-400 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Private Advisory Circle
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white">
              Subscribe to Private Exhibition Previews
            </h3>
            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Receive curated curatorial notes, artist interviews, and early access invitations to new masterwork collection drops.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-navy-900 text-white border border-navy-700 px-5 py-4 rounded-sm text-sm placeholder-neutral-500 focus:outline-none focus:border-gold-500 min-w-[280px]"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold text-xs uppercase tracking-widest rounded-sm transition shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" /> Join Journal
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
