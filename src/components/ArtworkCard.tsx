import React from 'react';
import { Artwork } from '../types';
import { useGallery } from '../context/GalleryContext';
import { Heart, ShoppingBag, Award, Eye } from 'lucide-react';
import { handleImageError, getProductionImageUrl } from '../services/imageService';

interface ArtworkCardProps {
  artwork: Artwork;
  showWishlist?: boolean;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, showWishlist = true }) => {
  const { navigateToArtwork, addToCart, toggleWishlist, isInWishlist, formatPrice } = useGallery();
  const inWishlist = isInWishlist(artwork.id);
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <div className="group relative bg-white rounded-lg border border-ivory-300 shadow-subtle hover:shadow-2xl transition-all duration-500 flex flex-col overflow-hidden">
      
      {/* Image Container with Editorial 4:5 Ratio & Uncropped Object-Contain */}
      <div
        className="relative aspect-[4/5] w-full overflow-hidden bg-ivory-200 flex items-center justify-center p-3 cursor-pointer"
        onClick={() => navigateToArtwork(artwork)}
      >
        {/* Warm Ivory Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-ivory-300 animate-pulse flex items-center justify-center">
            <span className="text-[11px] font-serif text-neutral-400 tracking-wider">Richbecky Fine Art</span>
          </div>
        )}

        <img
          src={getProductionImageUrl(artwork.imageUrl, artwork.title)}
          alt={artwork.title}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            setImageLoaded(true);
            handleImageError(e, artwork.title);
          }}
          className={`w-full h-full object-contain object-center transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5">
          <span
            className={`px-3 py-1 text-[11px] font-bold tracking-widest uppercase rounded-sm shadow-sm backdrop-blur-md ${
              artwork.type === 'Original'
                ? 'bg-navy-950/90 text-gold-400 border border-gold-500/30'
                : 'bg-ivory-100/90 text-navy-900 border border-ivory-400/50'
            }`}
          >
            {artwork.type}
          </span>
          {artwork.certificateIncluded && (
            <span className="inline-flex items-center gap-1 text-[11px] bg-gold-500 text-navy-950 font-bold px-2.5 py-0.5 rounded-sm shadow-sm">
              <Award className="w-3.5 h-3.5" /> Certificate
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
                : 'bg-white/90 text-navy-900 hover:bg-white hover:text-gold-600'
            }`}
            aria-label="Toggle Wishlist"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        )}

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToArtwork(artwork);
            }}
            className="w-full bg-white/95 text-navy-950 py-3 rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-gold-500 hover:text-navy-950 transition flex items-center justify-center gap-2 shadow-lg"
          >
            <Eye className="w-4 h-4" /> View Artwork Details
          </button>
        </div>
      </div>

      {/* Prominent Artwork & Artist Metadata */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-1.5">
          <div className="text-xs text-gold-700 font-bold tracking-widest uppercase">
            {artwork.category} • {artwork.medium.split(',')[0]}
          </div>
          <h3
            onClick={() => navigateToArtwork(artwork)}
            className="font-serif text-xl font-bold text-navy-950 line-clamp-1 group-hover:text-gold-700 transition cursor-pointer"
          >
            {artwork.title}
          </h3>
          <p className="text-sm text-neutral-600 font-medium">
            {artwork.artistName} ({artwork.year})
          </p>
        </div>

        <div className="pt-3 border-t border-ivory-300 flex items-center justify-between">
          <div>
            <span className="text-lg font-serif font-bold text-navy-950 block">
              {formatPrice(artwork.price, artwork.currency)}
            </span>
            <div className="text-[11px] text-neutral-500 font-light">
              {artwork.type === 'Original' ? '1-of-1 Original Work' : `${artwork.stock} prints left`}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(artwork, 1);
            }}
            disabled={artwork.isSold}
            className="px-4 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-sm text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-4 h-4" />
            {artwork.isSold ? 'Acquired' : 'Acquire'}
          </button>
        </div>
      </div>

    </div>
  );
};
