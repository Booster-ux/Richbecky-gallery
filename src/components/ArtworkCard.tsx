import React from 'react';
import { Artwork } from '../types';
import { useGallery } from '../context/GalleryContext';
import { Heart, ShoppingBag, Award, Eye } from 'lucide-react';
import { handleImageError } from '../services/imageService';

interface ArtworkCardProps {
  artwork: Artwork;
  showWishlist?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, showWishlist = true }) => {
  const { navigateToArtwork, addToCart, toggleWishlist, isInWishlist, formatPrice } = useGallery();
  const inWishlist = isInWishlist(artwork.id);

  return (
    <div className="group relative bg-white rounded-lg border border-ivory-300/80 shadow-subtle hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden">
      
      {/* Image Container with Editorial 4:5 Aspect Ratio */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200 cursor-pointer" onClick={() => navigateToArtwork(artwork)}>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          onError={(e) => handleImageError(e)}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Artwork Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
          <span
            className={`px-3 py-1 text-[10px] font-semibold tracking-widest uppercase rounded-sm shadow-sm backdrop-blur-md ${
              artwork.type === 'Original'
                ? 'bg-navy-950/90 text-gold-400 border border-gold-500/30'
                : 'bg-ivory-100/90 text-navy-900 border border-ivory-400/50'
            }`}
          >
            {artwork.type}
          </span>
          {artwork.certificateIncluded && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-gold-500 text-navy-950 font-bold px-2.5 py-0.5 rounded-sm shadow-sm">
              <Award className="w-3 h-3" /> Certificate
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        {showWishlist && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(artwork);
            }}
            className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
              inWishlist
                ? 'bg-gold-500 text-navy-950 shadow-md scale-110'
                : 'bg-white/80 text-navy-900 hover:bg-white hover:text-gold-600'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-navy-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToArtwork(artwork);
            }}
            className="w-full bg-white/95 text-navy-950 py-3 rounded-sm text-xs font-semibold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-950 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Eye className="w-4 h-4" /> View Masterwork Details
          </button>
        </div>
      </div>

      {/* Artwork Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1">
          <div className="text-[11px] text-gold-700 font-semibold tracking-widest uppercase">
            {artwork.category} • {artwork.medium.split(',')[0]}
          </div>
          <h3
            onClick={() => navigateToArtwork(artwork)}
            className="font-serif text-lg font-bold text-navy-900 line-clamp-1 group-hover:text-gold-700 transition cursor-pointer"
          >
            {artwork.title}
          </h3>
          <p className="text-xs text-neutral-500 font-medium">
            {artwork.artistName} ({artwork.year})
          </p>
        </div>

        <div className="pt-3 border-t border-ivory-200 flex items-center justify-between">
          <div>
            <span className="text-base font-serif font-bold text-navy-950">
              {formatPrice(artwork.price, artwork.currency)}
            </span>
            <div className="text-[10px] text-neutral-400 font-light">
              {artwork.type === 'Original' ? '1-of-1 Original Masterwork' : `${artwork.stock} prints available`}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(artwork, 1);
            }}
            disabled={artwork.isSold}
            className="px-4 py-2 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-sm text-xs font-semibold uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {artwork.isSold ? 'Acquired' : 'Acquire'}
          </button>
        </div>
      </div>

    </div>
  );
};
