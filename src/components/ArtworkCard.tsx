import React from 'react';
import { Artwork } from '../types';
import { useGallery } from '../context/GalleryContext';
import { Heart, ShoppingBag, Award, Eye } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  showWishlist?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, showWishlist = true }) => {
  const { navigateToArtwork, addToCart, toggleWishlist, isInWishlist } = useGallery();
  const inWishlist = isInWishlist(artwork.id);

  return (
    <div className="group relative bg-white rounded-lg border border-ivory-300 shadow-subtle hover:shadow-gallery transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-art w-full overflow-hidden bg-ivory-200 cursor-pointer" onClick={() => navigateToArtwork(artwork)}>
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Artwork Type Badge (Original vs Fine Art Print) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          <span
            className={`px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase rounded shadow-sm backdrop-blur-md ${
              artwork.type === 'Original'
                ? 'bg-navy-900/90 text-gold-400 border border-gold-500/30'
                : 'bg-ivory-100/90 text-navy-800 border border-ivory-400/50'
            }`}
          >
            {artwork.type}
          </span>
          {artwork.certificateIncluded && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-gold-500/95 text-navy-950 font-semibold px-2 py-0.5 rounded shadow-sm">
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
            className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
              inWishlist
                ? 'bg-gold-500 text-navy-950 shadow-md scale-110'
                : 'bg-white/80 text-navy-800 hover:bg-white hover:text-gold-600'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-navy-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToArtwork(artwork);
            }}
            className="w-full bg-white/95 text-navy-900 py-2.5 rounded text-xs font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-navy-950 transition flex items-center justify-center gap-2 shadow-md"
          >
            <Eye className="w-3.5 h-3.5" /> View Artwork
          </button>
        </div>
      </div>

      {/* Info Container */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs text-gold-700 font-medium tracking-wider uppercase mb-1">
            {artwork.category} • {artwork.medium.split(',')[0]}
          </div>
          <h3
            onClick={() => navigateToArtwork(artwork)}
            className="font-serif text-base font-semibold text-navy-900 line-clamp-1 group-hover:text-gold-600 transition cursor-pointer"
          >
            {artwork.title}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5 mb-2 font-medium">
            {artwork.artistName} ({artwork.year})
          </p>
        </div>

        <div className="pt-3 border-t border-ivory-200 flex items-center justify-between mt-2">
          <div>
            <span className="text-sm font-semibold text-navy-900">
              ${artwork.price.toLocaleString()}
            </span>
            <div className="text-[10px] text-neutral-400">
              {artwork.type === 'Original' ? '1-of-1 Unique' : `${artwork.stock} prints left`}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(artwork, 1);
            }}
            disabled={artwork.isSold}
            className="px-3 py-1.5 bg-navy-800 hover:bg-gold-500 hover:text-navy-950 text-white rounded text-xs font-medium transition flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            {artwork.isSold ? 'Sold' : 'Add'}
          </button>
        </div>
      </div>

    </div>
  );
};
