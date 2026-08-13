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
  MessageSquare
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
        <h2 className="font-serif text-2xl font-semibold text-navy-900">No artwork selected</h2>
        <button
          onClick={() => setActivePage('catalogue')}
          className="mt-4 px-6 py-2.5 bg-navy-900 text-white text-xs uppercase font-semibold rounded"
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-neutral-400">
        <button onClick={() => setActivePage('home')} className="hover:text-navy-800">Home</button>
        <span>/</span>
        <button onClick={() => setActivePage('catalogue')} className="hover:text-navy-800">Catalogue</button>
        <span>/</span>
        <span className="text-navy-900 font-medium">{selectedArtwork.title}</span>
      </div>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Image & Thumbnails */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Main Large Image Container */}
          <div className="relative aspect-art w-full rounded-xl overflow-hidden bg-ivory-200 border border-ivory-300 shadow-gallery group">
            <img
              src={getProductionImageUrl(galleryImages[activeImageIndex], selectedArtwork.title)}
              alt={selectedArtwork.title}
              onError={(e) => handleImageError(e, selectedArtwork.title)}
              className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-102"
            />
            
            {/* Zoom / Lightbox Trigger */}
            <button
              onClick={() => setModalOpen(true)}
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-navy-900 p-2.5 rounded-full shadow-md backdrop-blur-md transition"
              title="Expand Image"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Type Badge */}
            <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
              <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded backdrop-blur-md shadow ${
                selectedArtwork.type === 'Original' ? 'bg-navy-900 text-gold-400 border border-gold-500/40' : 'bg-white/90 text-navy-900'
              }`}>
                {selectedArtwork.type}
              </span>
            </div>
          </div>

          {/* Thumbnails list */}
          {galleryImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    activeImageIndex === idx ? 'border-gold-500 ring-2 ring-gold-200' : 'border-transparent opacity-70 hover:opacity-100'
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

        {/* Right Column: Detailed Specs & Purchasing Actions */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">
              {selectedArtwork.category} • {selectedArtwork.year}
            </span>
            
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950 mt-1">
              {selectedArtwork.title}
            </h1>
            
            {artist && (
              <button
                onClick={() => navigateToArtist(artist)}
                className="text-sm font-medium text-neutral-600 hover:text-gold-700 transition mt-1 block"
              >
                By <span className="underline">{selectedArtwork.artistName}</span> ({artist.country})
              </button>
            )}
          </div>

          {/* Price & Stock Display */}
          <div className="bg-ivory-200 p-4 rounded-xl border border-ivory-300 space-y-2">
            <div className="flex items-baseline justify-between">
              <div>
                <span className="text-2xl font-bold text-navy-950">
                  {formatPrice(selectedArtwork.price, selectedArtwork.currency)}
                </span>
                <span className="text-xs text-neutral-500 ml-2">({selectedCurrency})</span>
              </div>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded ${
                selectedArtwork.isSold ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {selectedArtwork.isSold ? 'Sold' : 'Available for Acquisition'}
              </span>
            </div>

            {/* Original Artist Price Subtitle */}
            <div className="text-xs text-neutral-600 border-t border-ivory-300/80 pt-2 font-mono">
              <span className="text-neutral-500 font-sans">Original Listing Price: </span>
              <span className="font-semibold text-navy-900">
                {formatOriginalPrice(selectedArtwork.price, selectedArtwork.currency)} {selectedArtwork.currency}
              </span>
            </div>

            {/* Original vs Fine Art Print Rules display */}
            {selectedArtwork.type === 'Original' ? (
              <div className="flex items-center gap-1.5 text-xs text-gold-800 font-medium pt-1">
                <Award className="w-4 h-4 text-gold-600 flex-shrink-0" />
                <span>One-of-a-kind Original Artwork. Includes Certificate of Authenticity.</span>
              </div>
            ) : (
              <div className="text-xs text-neutral-600 pt-1">
                Fine Art Print Series • Limited Stock Available: <span className="font-bold text-navy-900">{selectedArtwork.stock} copies</span>
              </div>
            )}
          </div>

          {/* Quantity selector (Locked to 1 if Original) */}
          {selectedArtwork.type === 'Fine Art Print' && !selectedArtwork.isSold && (
            <div className="flex items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-navy-900">Print Quantity:</span>
              <div className="flex items-center border border-ivory-400 rounded bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-sm font-bold text-neutral-600 hover:bg-ivory-200"
                >
                  -
                </button>
                <span className="px-4 text-xs font-bold text-navy-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(selectedArtwork.stock, quantity + 1))}
                  className="px-3 py-1 text-sm font-bold text-neutral-600 hover:bg-ivory-200"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={() => addToCart(selectedArtwork, quantity)}
              disabled={selectedArtwork.isSold}
              className="w-full py-3.5 bg-navy-900 hover:bg-navy-800 text-white rounded font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
            >
              <ShoppingBag className="w-4 h-4 text-gold-400" /> Add to Gallery Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={selectedArtwork.isSold}
              className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 shadow-gold-glow disabled:opacity-50"
            >
              Acquire Now — Express Checkout
            </button>

            <button
              onClick={() => toggleWishlist(selectedArtwork)}
              className={`w-full py-2.5 rounded font-medium text-xs uppercase tracking-wider transition border flex items-center justify-center gap-2 ${
                inWishlist
                  ? 'bg-gold-50 border-gold-400 text-gold-800'
                  : 'bg-white border-ivory-300 text-navy-900 hover:bg-ivory-100'
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
              className="w-full py-2.5 rounded font-bold text-xs uppercase tracking-wider transition border border-gold-500/40 bg-navy-950 text-gold-400 hover:bg-gold-500 hover:text-navy-950 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" /> Inquire About Private Viewing & Advisory
            </button>
          </div>

          {/* 1. Artwork Details Section */}
          <div className="border-t border-ivory-300 pt-6 space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-200 pb-1.5">Artwork Details</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {selectedArtwork.medium && (
                <div className="flex items-start gap-2 text-neutral-600">
                  <Layers className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>Medium: <strong className="text-navy-900 font-medium block mt-0.5">{selectedArtwork.medium}</strong></span>
                </div>
              )}

              {selectedArtwork.dimensions && (
                <div className="flex items-start gap-2 text-neutral-600">
                  <Ruler className="w-4 h-4 text-gold-600 flex-shrink-0 mt-0.5" />
                  <span>Dimensions: <strong className="text-navy-900 font-medium block mt-0.5">{selectedArtwork.dimensions}</strong></span>
                </div>
              )}

              {selectedArtwork.year && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Year Created: <strong className="text-navy-900 font-medium">{selectedArtwork.year}</strong></span>
                </div>
              )}

              {selectedArtwork.type && (
                <div className="flex items-center gap-2 text-neutral-600">
                  <Award className="w-4 h-4 text-gold-600 flex-shrink-0" />
                  <span>Artwork Type: <strong className="text-navy-900 font-medium">{selectedArtwork.type}</strong></span>
                </div>
              )}
            </div>
          </div>

          {/* 2. About the Artwork Section */}
          {(selectedArtwork.description || selectedArtwork.artworkStory || selectedArtwork.artistStatement) && (
            <div className="border-t border-ivory-300 pt-6 space-y-3">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-200 pb-1.5">About the Artwork</h3>
              
              {selectedArtwork.description && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">Description</span>
                  <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line font-light">
                    {selectedArtwork.description}
                  </div>
                </div>
              )}

              {(selectedArtwork.artworkStory || selectedArtwork.artistStatement) && (
                <div className="space-y-1 pt-2">
                  <span className="text-[10px] font-bold text-gold-700 uppercase tracking-wider block">Artwork Story & Artist Statement</span>
                  <div className="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-line bg-ivory-100 p-4 rounded-lg border border-ivory-300 italic">
                    {selectedArtwork.artworkStory || selectedArtwork.artistStatement}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Authenticity Section */}
          {(selectedArtwork.certificateIncluded || selectedArtwork.certificateDetails || selectedArtwork.editionInfo || selectedArtwork.signatureInfo) && (
            <div className="border-t border-ivory-300 pt-6 space-y-3">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-200 pb-1.5">Authenticity & Provenance</h3>

              <div className="space-y-2 text-xs">
                {selectedArtwork.certificateIncluded && (
                  <div className="flex items-start gap-2 text-emerald-900 bg-emerald-50/70 p-3 rounded border border-emerald-200">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">Certificate of Authenticity Included</strong>
                      <p className="text-[11px] text-emerald-800 mt-0.5">
                        {selectedArtwork.certificateDetails || 'Issued immediately upon acquisition and delivered with the physical artwork.'}
                      </p>
                      {selectedArtwork.certificateNumber && (
                        <span className="font-mono text-[10px] text-emerald-900 font-bold block mt-1">COA Registry #: {selectedArtwork.certificateNumber}</span>
                      )}
                    </div>
                  </div>
                )}

                {selectedArtwork.editionInfo && (
                  <div className="p-3 bg-ivory-100 rounded border border-ivory-300">
                    <span className="font-bold text-navy-950 uppercase text-[10px] block mb-0.5">Edition Specification</span>
                    <p className="text-neutral-700 font-medium">{selectedArtwork.editionInfo}</p>
                    {selectedArtwork.editionNumber && <p className="text-neutral-500 font-mono text-[11px] mt-0.5">Edition #: {selectedArtwork.editionNumber}</p>}
                  </div>
                )}

                {selectedArtwork.signatureInfo && (
                  <div className="p-3 bg-ivory-100 rounded border border-ivory-300">
                    <span className="font-bold text-navy-950 uppercase text-[10px] block mb-0.5">Signature Details</span>
                    <p className="text-neutral-700">{selectedArtwork.signatureInfo}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 4. Additional Information Section */}
          {(selectedArtwork.framingInfo || selectedArtwork.shippingInfoNotes || selectedArtwork.shippingDetails) && (
            <div className="border-t border-ivory-300 pt-6 space-y-3">
              <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-200 pb-1.5">Framing & Shipping Details</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {selectedArtwork.framingInfo && (
                  <div className="p-3 bg-ivory-100 rounded border border-ivory-300">
                    <span className="font-bold text-navy-950 uppercase text-[10px] block mb-0.5">Framing Information</span>
                    <p className="text-neutral-700">{selectedArtwork.framingInfo}</p>
                  </div>
                )}

                {(selectedArtwork.shippingInfoNotes || selectedArtwork.shippingDetails) && (
                  <div className="p-3 bg-ivory-100 rounded border border-ivory-300">
                    <span className="font-bold text-navy-950 uppercase text-[10px] block mb-0.5">Shipping & Handling</span>
                    <p className="text-neutral-700">{selectedArtwork.shippingInfoNotes || selectedArtwork.shippingDetails}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Artist Snippet */}
          {artist && (
            <div className="border-t border-ivory-300 pt-6">
              <div className="bg-ivory-100 p-4 rounded-xl border border-ivory-300 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={getProductionImageUrl(artist.avatar, artist.name)}
                    alt={artist.name}
                    onError={(e) => handleImageError(e, artist.name)}
                    className="w-12 h-12 rounded-full object-cover border border-gold-400"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-navy-900">{artist.name}</h4>
                    <span className="text-[11px] text-neutral-500">{artist.country} • {artist.exhibitionsCount} Exhibitions</span>
                  </div>
                </div>
                <button
                  onClick={() => navigateToArtist(artist)}
                  className="text-xs text-gold-700 hover:text-navy-900 font-semibold uppercase tracking-wider flex items-center gap-1"
                >
                  View Bio <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Related Artworks Section */}
      {relatedArtworks.length > 0 && (
        <section className="border-t border-ivory-300 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-navy-900">You May Also Admire</h2>
            <button
              onClick={() => setActivePage('catalogue')}
              className="text-xs font-semibold text-gold-700 hover:text-navy-900 uppercase tracking-wider"
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
