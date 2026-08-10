import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { Award, Globe, Instagram, ExternalLink, Heart, Sparkles } from 'lucide-react';
import { handleImageError, getProductionImageUrl } from '../services/imageService';

export const ArtistProfilePage: React.FC = () => {
  const { selectedArtist, artists, artworks, showToast } = useGallery();
  
  // Default to first artist if none selected
  const artist = selectedArtist || artists[0];
  const [isFollowed, setIsFollowed] = useState(artist.isFollowed || false);

  const artistArtworks = artworks.filter(
    art => (art.artistId === artist.id || art.artistName === artist.name) && art.status === 'Approved'
  );

  const handleFollowToggle = () => {
    setIsFollowed(!isFollowed);
    showToast(
      isFollowed ? `Unfollowed artist ${artist.name}` : `Following ${artist.name}. You will be notified of new releases.`,
      'info'
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-12">
      
      {/* Cover Header */}
      <div className="relative rounded-2xl overflow-hidden bg-navy-900 border border-gold-500/20 shadow-gallery">
        <div className="h-64 sm:h-80 w-full relative bg-navy-950 p-4">
          <img
            src={getProductionImageUrl(artist.coverImage || artist.avatar, artist.name)}
            alt={artist.name}
            onError={(e) => handleImageError(e, artist.name)}
            className="w-full h-full object-contain brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent" />
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 sm:px-10 pb-8 -mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <img
              src={getProductionImageUrl(artist.avatar, artist.name)}
              alt={artist.name}
              onError={(e) => handleImageError(e, artist.name)}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-2xl bg-white"
            />
            
            <div className="text-white space-y-1">
              <span className="text-gold-400 text-xs uppercase tracking-widest font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Represented Master Artist
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold">{artist.name}</h1>
              <p className="text-xs text-neutral-300 flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-gold-400" /> Based in {artist.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFollowToggle}
              className={`px-5 py-2.5 rounded text-xs font-semibold uppercase tracking-wider transition flex items-center gap-2 ${
                isFollowed
                  ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                  : 'bg-white/90 text-navy-900 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFollowed ? 'fill-current' : ''}`} />
              {isFollowed ? 'Following Artist' : 'Follow Artist'}
            </button>
          </div>

        </div>
      </div>

      {/* Artist Stats & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Biography */}
        <div className="lg:col-span-8 bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
          <h2 className="font-serif text-xl font-semibold text-navy-900">Artist Biography & Statement</h2>
          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            {artist.bio}
          </p>

          <div className="pt-4 border-t border-ivory-200 flex flex-wrap gap-4 text-xs text-neutral-500">
            {artist.socialLinks?.website && (
              <a href={artist.socialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gold-700 hover:underline">
                <ExternalLink className="w-3.5 h-3.5" /> Official Website
              </a>
            )}
            {artist.socialLinks?.instagram && (
              <a href="#" className="flex items-center gap-1 text-gold-700 hover:underline">
                <Instagram className="w-3.5 h-3.5" /> {artist.socialLinks.instagram}
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Gallery Credentials */}
        <div className="lg:col-span-4 bg-navy-900 text-ivory-100 p-6 rounded-xl border border-gold-500/30 space-y-6">
          <h3 className="font-serif text-lg font-semibold text-gold-400">Gallery Representation</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <span className="text-neutral-400">Representation Status</span>
              <span className="font-bold text-white text-sm">Exclusive Gallery Roster</span>
            </div>

            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <span className="text-neutral-400">Available Catalogue Works</span>
              <span className="font-bold text-white text-sm">{artistArtworks.length} Works</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-400">Authenticity Guarantee</span>
              <span className="text-gold-400 font-semibold flex items-center gap-1">
                <Award className="w-3.5 h-3.5" /> Verified Master
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Artist Works Collection Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
          <h2 className="font-serif text-2xl font-semibold text-navy-900">
            Artworks by {artist.name} ({artistArtworks.length})
          </h2>
        </div>

        {artistArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistArtworks.map(art => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 text-center text-xs text-neutral-500 rounded-lg">
            No works currently listed for this artist.
          </div>
        )}
      </div>

    </div>
  );
};
