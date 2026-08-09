import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { Heart, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist, setActivePage } = useGallery();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 bg-ivory-200 text-gold-600 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-900">Your Wishlist is Empty</h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
          Save your favorite masterworks by clicking the heart icon on any artwork card.
        </p>
        <button
          onClick={() => setActivePage('catalogue')}
          className="mt-4 px-8 py-3 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition shadow-md"
        >
          Explore Catalogue Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      <div className="border-b border-ivory-300 pb-4">
        <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Saved Masterpieces</span>
        <h1 className="font-serif text-3xl font-semibold text-navy-900 mt-1">Your Curated Wishlist ({wishlist.length})</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map(({ artwork }) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
};
