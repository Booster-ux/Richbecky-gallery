import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { ImageModal } from '../components/ImageModal';
import {
  Heart,
  ShoppingBag,
  Award,
  ShieldCheck,
  ArrowRight,
  Maximize2,
  Calendar,
  Layers,
  Ruler,
  MessageSquare,
  Truck,
  Frame
} from 'lucide-react';
import { handleImageError, getProductionImageUrl } from '../services/imageService';

export const ArtworkDetailsPage: React.FC = () => {
  const {
    selectedArtwork,
    artworks,
    artists,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setActivePage,
    navigateToArtist,
    formatPrice,
    formatOriginalPrice,
    selectedCurrency,
    setSelectedArtworkForEnquiry
  } = useGallery();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (!selectedArtwork) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-bold text-navy-950">No artwork selected</h2>
        <button
          onClick={() => setActivePage('catalogue')}
          className="mt-4 px-6 py-3 bg-navy-950 text-gold-400 text-xs uppercase tracking-widest font-bold rounded"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  const inWishlist = isInWishlist(selectedArtwork.id);
  const artist = artists.find(a => a.id === selectedArtwork.artistId || a.name === selectedArtwork.artistName);

  // Gallery thumbnails
  const galleryImages = [
    selectedArtwork.imageUrl,
    ...(selectedArtwork.additionalImages || [])
  ];

  // Related artworks
  const relatedArtworks = artworks.filter(
    art => art.id !== selectedArtwork.id && (art.category === selectedArtwork.category || art.artistName === selectedArtwork.artistName)
  ).slice(0, 4);

  const handleBuyNow = () => {
    addToCart(selectedArtwork, quantity);
    setActivePage('checkout');
  };

  // Logic to determine if a SEPARATE, meaningful artist statement / story exists
  const separateStoryOrStatement = (() => {
    const desc = selectedArtwork.description?.trim() || '';
    const story = selectedArtwork.artworkStory?.trim() || '';
    const statement = selectedArtwork.artistStatement?.trim() || '';

    if (statement && statement !== desc) {
      return { label: 'Artist Statement', text: statement };
    }
    if (story && story !== desc) {
      return { label: 'Artwork Story', text: story };
    }
    return null;
  })();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-neutral-500 font-medium">
        <button onClick={() => setActivePage('home')} className="hover:text-navy-950 transition">Home</button>
        <span>/</span>
        <button onClick={() => setActivePage('catalogue')} className="hover:text-navy-950 transition">Catalogue</button>
        <span>/</span>
        <span className="text-navy-950 font-bold">{selectedArtwork.title}</span>
      </div>

      {/* TOP SECTION: TWO-COLUMN EDITORIAL SHOWCASE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column (7 cols): Artwork Image Experience & Lightbox */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="relative aspect-art w-full rounded-2xl overflow-hidden bg-ivory-200 border border-ivory-300 shadow-gallery group">
            <img
              src={getProductionImageUrl(galleryImages[activeImageIndex], selectedArtwork.title)}
              alt={selectedArtwork.title}
              onError={(e) => handleImageError(e, selectedArtwork.title)}
              className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-[1.02]"
            />
            
            {/* Zoom / Lightbox Trigger */}
            <button
              onClick={() => setModalOpen(true)}
              className="absolute top-4 right-4 bg-white/95 hover:bg-white text-navy-950 p-3 rounded-full shadow-md backdrop-blur-md transition hover:scale-105"
              title="Expand Image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Type Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className={`px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md backdrop-blur-md shadow-sm ${
                selectedArtwork.type === 'Original' || selectedArtwork.type === 'Original Artwork'
                  ? 'bg-navy-950 text-gold-400 border border-gold-500/40'
                  : 'bg-white/95 text-navy-950 border border-ivory-300'
              }`}>
                {selectedArtwork.type}
              </span>
            </div>
          </div>

          {/* Gallery Thumbnails List */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-gold-500 ring-2 ring-gold-200' : 'border-ivory-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={getProductionImageUrl(img, selectedArtwork.title)}
                    alt=""
                    onError={(e) => handleImageError(e, selectedArtwork.title)}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

        </div>

        {/* Right Column (5 cols): Key Artwork Meta, Pricing, Purchase Actions & Quick Specs */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest block">
              {selectedArtwork.category} • {selectedArtwork.year}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 leading-tight">
              {selectedArtwork.title}
            </h1>
            
            {artist && (
              <button
                onClick={() => navigateToArtist(artist)}
                className="text-base font-semibold text-neutral-700 hover:text-gold-700 transition block"
              >
                By <span className="underline font-bold text-navy-950">{selectedArtwork.artistName}</span> ({artist.country})
              </button>
            )}
          </div>

          {/* Pricing & Stock Card */}
          <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-3">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-3xl font-bold text-navy-950">
                  {formatPrice(selectedArtwork.price, selectedArtwork.currency)}
                </span>
                <span className="text-xs text-neutral-500 ml-2 font-medium">({selectedCurrency})</span>
              </div>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                selectedArtwork.isSold ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedArtwork.isSold ? 'Sold' : 'Available for Acquisition'}
              </span>
            </div>

            {/* Original Listing Price Reference */}
            <div className="text-xs text-neutral-600 border-t border-ivory-200 pt-2.5 flex items-center justify-between">
              <span>Original Listing Price:</span>
              <span className="font-bold text-navy-950 font-mono">
                {formatOriginalPrice(selectedArtwork.price, selectedArtwork.currency)} {selectedArtwork.currency}
              </span>
            </div>

            {/* Availability rule note */}
            {(selectedArtwork.type === 'Original' || selectedArtwork.type === 'Original Artwork') ? (
              <div className="flex items-center gap-2 text-xs text-gold-800 font-medium pt-1">
                <Award className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span>1-of-1 Masterpiece. Includes Signed Certificate of Authenticity.</span>
              </div>
            ) : (
              <div className="text-xs text-neutral-600 pt-1">
                Fine Art Print Series • Available Stock: <span className="font-bold text-navy-950">{selectedArtwork.stock} units</span>
              </div>
            )}
          </div>

          {/* Quantity selector (Only for Fine Art Print) */}
          {(selectedArtwork.type === 'Fine Art Print') && !selectedArtwork.isSold && (
            <div className="flex items-center gap-4 bg-ivory-100 p-3 rounded-xl border border-ivory-300">
              <span className="text-xs font-bold uppercase tracking-wider text-navy-950">Print Quantity:</span>
              <div className="flex items-center border border-ivory-300 rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm font-bold text-neutral-600 hover:bg-ivory-200"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-navy-950">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedArtwork.stock, quantity + 1))}
                  className="px-3 py-1.5 text-sm font-bold text-neutral-600 hover:bg-ivory-200"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Purchasing & Advisory CTAs */}
          <div className="space-y-3">
            <button
              onClick={() => addToCart(selectedArtwork, quantity)}
              disabled={selectedArtwork.isSold}
              className="w-full py-4 bg-navy-950 hover:bg-navy-900 text-white rounded-lg font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" /> Add to Gallery Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={selectedArtwork.isSold}
              className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-lg font-bold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-gold-glow disabled:opacity-50"
            >
              Acquire Now — Express Checkout
            </button>

            <button
              onClick={() => toggleWishlist(selectedArtwork)}
              className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition border flex items-center justify-center gap-2 ${
                inWishlist
                  ? 'bg-gold-50 border-gold-400 text-gold-900'
                  : 'bg-white border-ivory-300 text-navy-950 hover:bg-ivory-100'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current text-gold-600' : ''}`} />
              {inWishlist ? 'Saved in Wishlist' : 'Save to Favorites Wishlist'}
            </button>

            <button
              onClick={() => {
                setSelectedArtworkForEnquiry(selectedArtwork);
                setActivePage('contact-advisory');
              }}
              className="w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider transition border border-gold-500/40 bg-navy-950 text-gold-400 hover:bg-gold-500 hover:text-navy-950 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Inquire About Private Advisory
            </button>
          </div>

          {/* Quick Specifications Summary Box */}
          <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle space-y-3 text-xs">
            <h4 className="font-serif font-bold text-navy-950 uppercase tracking-wider border-b border-ivory-200 pb-2">
              Key Artwork Specifications
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-neutral-600">
                <span className="flex items-center gap-1.5"><Layers className="w-3.5 h-3.5 text-gold-600" /> Medium:</span>
                <strong className="text-navy-950 text-right">{selectedArtwork.medium}</strong>
              </div>

              <div className="flex items-center justify-between text-neutral-600">
                <span className="flex items-center gap-1.5"><Ruler className="w-3.5 h-3.5 text-gold-600" /> Dimensions:</span>
                <strong className="text-navy-950 font-medium">{selectedArtwork.dimensions}</strong>
              </div>

              <div className="flex items-center justify-between text-neutral-600">
                <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gold-600" /> Year Created:</span>
                <strong className="text-navy-950">{selectedArtwork.year}</strong>
              </div>

              <div className="flex items-center justify-between text-neutral-600">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-gold-600" /> Authenticity:</span>
                <strong className="text-emerald-800 font-bold">{selectedArtwork.certificateIncluded ? 'Signed COA Included' : 'Standard Gallery Records'}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* LOWER SECTION: FULL-WIDTH EDITORIAL CURATORIAL DETAILS */}
      <div className="border-t border-ivory-300 pt-12 space-y-12 max-w-5xl mx-auto">
        
        {/* 1. About the Artwork (Primary Description) */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-subtle space-y-4">
          <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-ivory-200 pb-3">
            About the Artwork
          </h2>
          <div className="text-sm sm:text-base text-neutral-700 leading-relaxed font-light whitespace-pre-line space-y-4">
            {selectedArtwork.description}
          </div>
        </section>

        {/* 2. Artwork Story & Artist Statement (ONLY rendered if distinct separate text exists!) */}
        {separateStoryOrStatement && (
          <section className="bg-ivory-100 p-8 sm:p-10 rounded-2xl border border-ivory-300/80 shadow-subtle space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gold-500" />
              <h3 className="font-serif text-xl font-bold text-navy-950">
                {separateStoryOrStatement.label}
              </h3>
            </div>
            <p className="text-sm sm:text-base text-neutral-800 leading-relaxed font-serif italic border-l-2 border-gold-500 pl-4 py-1">
              "{separateStoryOrStatement.text}"
            </p>
          </section>
        )}

        {/* 3. Authenticity & Provenance */}
        <section className="bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
          <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-gold-600" /> Authenticity & Gallery Guarantee
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {selectedArtwork.certificateIncluded && (
              <div className="p-5 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 text-emerald-950 font-bold">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                  <span>Official Certificate of Authenticity</span>
                </div>
                <p className="text-neutral-700 text-xs leading-relaxed">
                  {selectedArtwork.certificateDetails || 'Issued immediately upon acquisition and provided to the buyer together with the physical artwork.'}
                </p>
                {selectedArtwork.certificateNumber && (
                  <span className="font-mono text-xs font-bold text-emerald-900 block pt-1">
                    Registry #: {selectedArtwork.certificateNumber}
                  </span>
                )}
              </div>
            )}

            {selectedArtwork.signatureInfo && (
              <div className="p-5 bg-ivory-100 rounded-xl border border-ivory-300 space-y-1">
                <span className="font-bold text-navy-950 uppercase text-xs block text-gold-800">Artist Signature</span>
                <p className="text-neutral-700 leading-relaxed">{selectedArtwork.signatureInfo}</p>
              </div>
            )}

            {selectedArtwork.editionInfo && (
              <div className="p-5 bg-ivory-100 rounded-xl border border-ivory-300 space-y-1">
                <span className="font-bold text-navy-950 uppercase text-xs block text-gold-800">Edition Information</span>
                <p className="text-neutral-700 leading-relaxed">{selectedArtwork.editionInfo}</p>
                {selectedArtwork.editionNumber && (
                  <span className="font-mono text-xs text-neutral-600 block pt-1">Edition #: {selectedArtwork.editionNumber}</span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 4. Framing & Shipping Details */}
        {(selectedArtwork.framingInfo || selectedArtwork.shippingInfoNotes || selectedArtwork.shippingDetails) && (
          <section className="bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3 flex items-center gap-2">
              <Truck className="w-5 h-5 text-gold-600" /> Framing & Delivery Specifications
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
              {selectedArtwork.framingInfo && (
                <div className="p-5 bg-ivory-100 rounded-xl border border-ivory-300 space-y-1">
                  <span className="font-bold text-navy-950 uppercase text-xs flex items-center gap-1.5 text-gold-800">
                    <Frame className="w-4 h-4 text-gold-600" /> Framing Details
                  </span>
                  <p className="text-neutral-700 leading-relaxed">{selectedArtwork.framingInfo}</p>
                </div>
              )}

              {(selectedArtwork.shippingInfoNotes || selectedArtwork.shippingDetails) && (
                <div className="p-5 bg-ivory-100 rounded-xl border border-ivory-300 space-y-1">
                  <span className="font-bold text-navy-950 uppercase text-xs flex items-center gap-1.5 text-gold-800">
                    <Truck className="w-4 h-4 text-gold-600" /> Global Transit & Logistics
                  </span>
                  <p className="text-neutral-700 leading-relaxed">
                    {selectedArtwork.shippingInfoNotes || selectedArtwork.shippingDetails}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 5. About the Artist */}
        {artist && (
          <section className="bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
            <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3">
              About the Artist
            </h2>

            <div className="flex flex-col sm:flex-row items-start gap-6">
              <img
                src={getProductionImageUrl(artist.avatar, artist.name)}
                alt={artist.name}
                onError={(e) => handleImageError(e, artist.name)}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gold-400 shadow-md flex-shrink-0"
              />

              <div className="space-y-3 flex-1">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-navy-950">{artist.name}</h3>
                  <span className="text-xs font-semibold text-gold-700 block uppercase tracking-wider mt-0.5">
                    {artist.country} • {artist.exhibitionsCount} Exhibitions
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed font-light line-clamp-4">
                  {artist.bio}
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => navigateToArtist(artist)}
                    className="px-6 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 shadow"
                  >
                    Explore Artist Profile & Collection <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

      </div>

      {/* You May Also Admire Section */}
      {relatedArtworks.length > 0 && (
        <section className="border-t border-ivory-300 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-navy-950">You May Also Admire</h2>
            <button
              onClick={() => setActivePage('catalogue')}
              className="text-xs font-bold text-gold-700 hover:text-navy-950 uppercase tracking-wider flex items-center gap-1"
            >
              Explore Full Collection →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedArtworks.map(art => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        imageUrl={galleryImages[activeImageIndex]}
        title={selectedArtwork.title}
        artistName={selectedArtwork.artistName}
      />

    </div>
  );
};
