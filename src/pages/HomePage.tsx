import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { ArrowRight, Sparkles, Award, ShieldCheck, BookOpen, Mail } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

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
    <div className="space-y-24 pb-20 animate-fade-in">
      
      {/* 1. HERO SECTION */}
      <section className="relative bg-navy-950 text-ivory-100 overflow-hidden border-b border-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-navy-900 border border-gold-500/30 text-gold-400 text-xs tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" /> Featured Masterpiece Exhibition
              </div>
              
              <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.1] tracking-tight text-white">
                Where Contemporary African Masterpieces Meet Discerning Collectors.
              </h1>
              
              <p className="text-sm sm:text-base text-neutral-300 max-w-lg font-light leading-relaxed">
                Richbecky Gallery curates authenticated original oil paintings, traditional fabric collages, and limited edition fine art prints directly from master visual artists.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActivePage('catalogue')}
                  className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-semibold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg flex items-center gap-2 group"
                >
                  Explore Complete Collection <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, type: 'Original' }));
                    setActivePage('catalogue');
                  }}
                  className="px-8 py-4 bg-navy-900 hover:bg-navy-800 text-ivory-200 border border-ivory-300/20 rounded font-semibold text-xs uppercase tracking-widest transition"
                >
                  Original Artworks
                </button>
              </div>
            </div>

            {/* Large Dominant Hero Visual */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                onClick={() => navigateToArtwork(featuredHeroArt)}
                className="relative group cursor-pointer w-full max-w-lg rounded-xl overflow-hidden border border-gold-500/30 shadow-2xl bg-navy-900"
              >
                <img
                  src={featuredHeroArt.imageUrl}
                  alt={featuredHeroArt.title}
                  className="w-full h-[480px] sm:h-[540px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent opacity-95 p-8 flex flex-col justify-end">
                  <span className="text-gold-400 text-xs uppercase tracking-widest font-semibold mb-1">
                    Featured Masterwork • 2026
                  </span>
                  <h3 className="font-serif text-2xl text-white font-semibold">{featuredHeroArt.title}</h3>
                  <p className="text-xs text-neutral-300 mt-1 font-light">
                    By {featuredHeroArt.artistName} • {formatPrice(featuredHeroArt.price, featuredHeroArt.currency)}
                  </p>
                  <span className="text-[11px] text-gold-400 underline font-medium mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Artwork Details & Certificate Provenance →
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 border-b border-ivory-300 pb-4">
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Curatorial Highlight</span>
            <h2 className="font-serif text-3xl font-semibold text-navy-900 mt-1">Featured Collection</h2>
          </div>
          <button
            onClick={() => {
              setFilterState(prev => ({ ...prev, isFeatured: true }));
              setActivePage('catalogue');
            }}
            className="text-xs font-semibold text-navy-900 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1 transition"
          >
            Explore Featured Works <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtworks.slice(0, 4).map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* 3. EXPLORE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10 border-b border-ivory-300 pb-4">
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Curated Media</span>
            <h2 className="font-serif text-3xl font-semibold text-navy-900 mt-1">Explore Categories</h2>
          </div>
          <button
            onClick={() => setActivePage('catalogue')}
            className="text-xs font-semibold text-navy-900 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1 transition"
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
              className="group relative h-64 rounded-xl overflow-hidden cursor-pointer border border-ivory-300 shadow-subtle hover:shadow-2xl transition duration-500"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-950/40 to-transparent p-5 flex flex-col justify-end space-y-1">
                <span className="text-[10px] text-gold-400 font-semibold uppercase tracking-widest">{cat.count} Masterworks</span>
                <h3 className="font-serif text-xl font-semibold text-white group-hover:text-gold-300 transition">{cat.name}</h3>
                <p className="text-[11px] text-neutral-300 font-light line-clamp-2">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED ARTWORKS GRID & TYPE FILTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-ivory-300 pb-4">
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Masterwork Inventory</span>
            <h2 className="font-serif text-3xl font-semibold text-navy-900 mt-1">Curated Catalogue</h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'All' })); }}
              className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition ${filterState.type === 'All' ? 'bg-navy-900 text-gold-400 shadow-md' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'}`}
            >
              All Artworks
            </button>
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'Original' })); }}
              className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition ${filterState.type === 'Original' ? 'bg-navy-900 text-gold-400 shadow-md' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'}`}
            >
              Original Artworks Only
            </button>
            <button
              onClick={() => { setFilterState(prev => ({ ...prev, type: 'Fine Art Print' })); }}
              className={`px-4 py-2 rounded-full font-semibold uppercase tracking-wider transition ${filterState.type === 'Fine Art Print' ? 'bg-navy-900 text-gold-400 shadow-md' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'}`}
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

        <div className="mt-12 text-center">
          <button
            onClick={() => setActivePage('catalogue')}
            className="px-10 py-4 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition duration-300 shadow-lg inline-flex items-center gap-2"
          >
            Explore Complete Catalogue ({approvedArtworks.length} Artworks) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10 border-b border-ivory-300 pb-4">
            <div>
              <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Recent Acquisitions</span>
              <h2 className="font-serif text-3xl font-semibold text-navy-900 mt-1">New Arrivals</h2>
            </div>
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, isNew: true }));
                setActivePage('catalogue');
              }}
              className="text-xs font-semibold text-navy-900 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1 transition"
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
            <div className="lg:col-span-5 relative min-h-[360px]">
              <img
                src={artists[0].coverImage}
                alt={artists[0].name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:col-span-7 p-8 md:p-14 flex flex-col justify-center space-y-5">
              <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">
                Artist Spotlight • {artists[0].country}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-white">{artists[0].name}</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                "{artists[0].bio}"
              </p>
              <div className="pt-3">
                <button
                  onClick={() => setActivePage('artist-profile')}
                  className="px-6 py-3 bg-gold-500 text-navy-950 hover:bg-gold-400 rounded text-xs font-semibold uppercase tracking-widest transition shadow-md inline-flex items-center gap-2"
                >
                  View Artist Roster & Works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ABOUT RICHBECKY GALLERY */}
      <section className="bg-ivory-200 border-y border-ivory-300 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-14 w-auto mx-auto object-contain" />
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-900">
            Connecting African Contemporary Masters with International Collectors
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
            Richbecky Gallery was founded as a dedicated fine art platform to represent distinguished contemporary African visual artists on the global stage. Every masterwork in our gallery represents a unique cultural lineage, narrative depth, and uncompromised curatorial excellence.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('about')}
              className="text-xs font-semibold text-gold-700 hover:text-navy-900 uppercase tracking-widest underline transition"
            >
              Read Full Gallery Story & Curatorial Philosophy →
            </button>
          </div>
        </div>
      </section>

      {/* 8. CERTIFICATE / TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 sm:p-14 rounded-2xl border border-ivory-300 shadow-gallery flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs uppercase tracking-widest font-semibold">
              <Award className="w-4 h-4" /> Signed Certificate Included
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-900">
              Guaranteed Museum-Grade Authenticity
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
              Every original artwork acquired through Richbecky Gallery arrives with a signed Certificate of Authenticity specifying medium, dimensions, provenance, and gallery director seal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="p-6 bg-navy-950 text-ivory-100 rounded-xl border border-gold-500/30 text-center space-y-2 min-w-[220px]">
              <ShieldCheck className="w-8 h-8 text-gold-400 mx-auto" />
              <span className="text-xs font-semibold uppercase tracking-wider block text-white">Insured Global Delivery</span>
              <p className="text-[11px] text-neutral-300 font-light">White-glove climate transit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. JOURNAL / NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-navy-900 text-ivory-100 p-10 sm:p-14 rounded-2xl border border-gold-500/20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-gold-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Private Advisory Circle
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white">
              Subscribe to Private Exhibition Previews
            </h3>
            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              Receive curated curatorial notes, artist interviews, and early access invitations to new masterwork collection drops.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-navy-950 text-white border border-navy-700 px-4 py-3 rounded text-xs placeholder-neutral-500 focus:outline-none focus:border-gold-500 min-w-[260px]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold text-xs uppercase tracking-widest rounded transition shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Mail className="w-4 h-4" /> Join Journal
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
