import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { GoldAtmosphereCanvas } from '../components/GoldAtmosphereCanvas';
import { LOGO_URL } from '../data/mockData';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  Mail
} from 'lucide-react';
import { handleImageError, getProductionImageUrl } from '../services/imageService';

export const HomePage: React.FC = () => {
  const {
    artworks,
    artists,
    categories,
    setActivePage,
    setFilterState,
    navigateToArtwork,
    formatPrice
  } = useGallery();

  const featuredHeroArt = artworks.find(a => a.id === 'art-1') || artworks[0];
  const featuredCollection = artworks.filter(a => a.isFeatured).slice(0, 4);
  const newArrivals = artworks.filter(a => a.isNewArrival).slice(0, 3);

  return (
    <div className="space-y-16 pb-20 animate-fade-in">
      
      {/* 1. HERO EXHIBITION SECTION — WARM IVORY EDITORIAL CANVAS WITH SOFT GOLD ATMOSPHERE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-gradient-to-br from-[#FAF8F5] via-[#F3EDE0] to-[#EBE3D3] text-navy-950 p-8 sm:p-14 lg:p-20 rounded-3xl border border-ivory-400/80 shadow-2xl relative overflow-hidden">
          
          {/* Faint Abstract Gallery Architectural Arch Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-30">
            <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="900" cy="400" r="500" stroke="url(#goldGradient1)" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="900" cy="400" r="350" stroke="url(#goldGradient1)" strokeWidth="0.75" />
              <path d="M-100 700 C 300 500, 700 700, 1300 400" stroke="url(#goldGradient1)" strokeWidth="1" opacity="0.6" />
              <defs>
                <linearGradient id="goldGradient1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#C5A059" stopOpacity="0.05" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Subtle Ambient Gold Particle Canvas */}
          <GoldAtmosphereCanvas />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Editorial Header & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 text-gold-900 text-xs font-bold tracking-wider uppercase border border-gold-500/30 shadow-sm backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                Curated Masterwork Exhibition
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.12] tracking-tight text-navy-950">
                African Contemporary Masters & Fine Art
              </h1>

              <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-xl">
                Richbecky Gallery represents distinguished contemporary visual artists across Africa. Every original painting and fine art print is backed by an official signed Certificate of Authenticity and white-glove global delivery.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() => setActivePage('catalogue')}
                  className="px-9 py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition duration-300 shadow-xl flex items-center justify-center gap-2"
                >
                  Explore Catalogue <ArrowRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => {
                    setFilterState(prev => ({ ...prev, type: 'Original' }));
                    setActivePage('catalogue');
                  }}
                  className="px-9 py-4 bg-white/90 hover:bg-white text-navy-950 border border-ivory-400 rounded-lg font-bold text-xs uppercase tracking-widest transition shadow-sm backdrop-blur-sm"
                >
                  Original Collection
                </button>
              </div>
            </div>

            {/* Museum Exhibition Frame for Featured Masterwork */}
            <div className="lg:col-span-6 flex justify-center">
              <div
                onClick={() => navigateToArtwork(featuredHeroArt)}
                className="relative group cursor-pointer w-full max-w-xl rounded-2xl overflow-hidden border border-gold-500/30 shadow-2xl bg-white/95 p-4 transition duration-500 hover:shadow-gold-glow backdrop-blur-sm"
              >
                <div className="w-full h-[480px] sm:h-[580px] flex items-center justify-center bg-[#FAF8F5] rounded-xl overflow-hidden border border-ivory-300/80 p-3 relative">
                  <img
                    src={getProductionImageUrl(featuredHeroArt.imageUrl, featuredHeroArt.title)}
                    alt={featuredHeroArt.title}
                    onError={(e) => handleImageError(e, featuredHeroArt.title)}
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                
                <div className="mt-4 p-5 bg-white rounded-xl border border-ivory-200 shadow-subtle space-y-1">
                  <span className="text-gold-700 text-xs uppercase tracking-widest font-bold block">
                    Featured Masterwork • 2026
                  </span>
                  <h3 className="font-serif text-2xl text-navy-950 font-bold">{featuredHeroArt.title}</h3>
                  <p className="text-xs text-neutral-600 font-medium">
                    By {featuredHeroArt.artistName} • {formatPrice(featuredHeroArt.price, featuredHeroArt.currency)}
                  </p>
                  <span className="text-xs text-gold-700 font-bold underline block pt-1 group-hover:translate-x-1 transition-transform">
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
          {featuredCollection.map((art) => (
            <ArtworkCard key={art.id} artwork={art} />
          ))}
        </div>
      </section>

      {/* 3. CATEGORIES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">Curated Classification</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">Explore by Category</h2>
          <p className="text-xs text-neutral-500 font-light">
            Discover masterworks sorted by medium, themes, and aesthetic movement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setFilterState(prev => ({ ...prev, category: cat.name }));
                setActivePage('catalogue');
              }}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer border border-ivory-300 shadow-subtle hover:shadow-2xl transition duration-500 bg-white p-3 flex flex-col"
            >
              <div className="w-full h-48 bg-ivory-100 rounded-xl overflow-hidden p-2 flex items-center justify-center">
                <img
                  src={getProductionImageUrl(cat.image, cat.name)}
                  alt={cat.name}
                  onError={(e) => handleImageError(e, cat.name)}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-1">
                <span className="text-[11px] text-gold-700 font-bold uppercase tracking-widest">{cat.count} Masterworks</span>
                <h3 className="font-serif text-xl font-bold text-navy-950 group-hover:text-gold-700 transition">{cat.name}</h3>
                <p className="text-xs text-neutral-500 font-light line-clamp-2">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. RECENT ACQUISITIONS / NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12 border-b border-ivory-300 pb-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gold-700 uppercase tracking-widest">Fresh From Studio</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">New Masterwork Releases</h2>
            </div>
            <button
              onClick={() => {
                setFilterState(prev => ({ ...prev, isNew: true }));
                setActivePage('catalogue');
              }}
              className="text-xs font-bold text-navy-950 hover:text-gold-700 uppercase tracking-widest flex items-center gap-1.5 transition"
            >
              View All Releases <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {newArrivals.slice(0, 3).map((art) => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </section>
      )}

      {/* 5. ARTIST SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white text-navy-950 rounded-2xl overflow-hidden shadow-gallery border border-ivory-300">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-5 relative min-h-[380px] flex items-center justify-center bg-ivory-100 p-6 border-b lg:border-b-0 lg:border-r border-ivory-300">
              <img
                src={getProductionImageUrl(artists[0].coverImage || artists[0].avatar, artists[0].name)}
                alt={artists[0].name}
                onError={(e) => handleImageError(e, artists[0].name)}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="lg:col-span-7 p-10 md:p-16 flex flex-col justify-center space-y-6">
              <span className="text-gold-700 text-xs font-bold uppercase tracking-widest">
                Artist Spotlight • {artists[0].country}
              </span>
              <h3 className="font-serif text-4xl sm:text-5xl font-bold text-navy-950">{artists[0].name}</h3>
              <p className="text-base text-neutral-600 leading-relaxed font-light">
                "{artists[0].bio}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActivePage('artist-profile')}
                  className="px-8 py-4 bg-navy-950 text-white hover:bg-gold-500 hover:text-navy-950 rounded-sm text-xs font-bold uppercase tracking-widest transition shadow-md inline-flex items-center gap-2.5"
                >
                  View Artist Roster & Works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ABOUT RICHBECKY GALLERY */}
      <section className="bg-ivory-200 border-y border-ivory-300 py-20">
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

      {/* 7. CERTIFICATE / TRUST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 sm:p-16 rounded-2xl border border-ivory-300 shadow-gallery flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-gold-700 text-xs uppercase tracking-widest font-bold">
              <Award className="w-4 h-4 text-gold-600" /> Signed Certificate Included
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">
              Guaranteed Museum-Grade Authenticity
            </h3>
            <p className="text-base text-neutral-700 font-light leading-relaxed">
              Every original artwork acquired through Richbecky Gallery arrives with a signed Certificate of Authenticity specifying medium, dimensions, provenance, and gallery director seal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="p-8 bg-ivory-100 text-navy-950 rounded-2xl border border-ivory-300 text-center space-y-3 min-w-[240px]">
              <ShieldCheck className="w-10 h-10 text-gold-600 mx-auto" />
              <span className="text-xs font-bold uppercase tracking-wider block text-navy-950">Insured Global Delivery</span>
              <p className="text-xs text-neutral-500 font-light">White-glove climate transit</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. JOURNAL / NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-ivory-200 text-navy-950 p-10 sm:p-16 rounded-2xl border border-ivory-300 flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-xl">
            <span className="text-gold-700 text-xs uppercase tracking-widest font-bold flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-gold-600" /> Private Advisory Circle
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">
              Subscribe to Private Exhibition Previews
            </h3>
            <p className="text-sm text-neutral-600 font-light leading-relaxed">
              Receive curated curatorial notes, artist interviews, and early access invitations to new masterwork collection drops.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email address..."
              className="bg-white text-navy-950 border border-ivory-300 px-5 py-4 rounded-sm text-sm placeholder-neutral-400 focus:outline-none focus:border-gold-500 min-w-[280px]"
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

      {/* 9. FOR ARTISTS ENTRY POINT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-10 sm:p-16 rounded-2xl border border-ivory-300 shadow-gallery flex flex-col lg:flex-row items-center justify-between gap-10">
          <div className="space-y-4 max-w-2xl">
            <span className="text-gold-700 text-xs uppercase tracking-widest font-bold block">
              FOR ARTISTS
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-navy-950">
              Share your work with Richbecky Gallery.
            </h3>
            <p className="text-base text-neutral-700 font-light leading-relaxed">
              Artists can submit their work for consideration and, once approved, manage their collection through the Artist Portal.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <button
              onClick={() => setActivePage('artist-application')}
              className="w-full sm:w-auto px-8 py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-sm font-bold text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center gap-2"
            >
              Apply as an Artist <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActivePage('artist-login')}
              className="w-full sm:w-auto px-8 py-4 bg-ivory-100 hover:bg-ivory-200 text-navy-950 border border-ivory-300 rounded-sm font-bold text-xs uppercase tracking-widest transition flex items-center justify-center"
            >
              Artist Login
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
