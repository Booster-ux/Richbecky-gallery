import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ArtworkCard } from '../components/ArtworkCard';
import { Award, Globe, Instagram, ExternalLink, Heart, Sparkles, Users, MessageSquare } from 'lucide-react';
import { handleImageError, getProductionImageUrl } from '../services/imageService';
import { Artist } from '../types';

export const ArtistProfilePage: React.FC = () => {
  const { selectedArtist, artists, artworks, showToast, navigateToArtist, setActivePage } = useGallery();
  
  // Currently active selected artist or default to first artist in roster
  const [currentArtistId, setCurrentArtistId] = useState<string>(selectedArtist?.id || artists[0]?.id || 'art-sho-001');
  
  const artist: Artist = artists.find(a => a.id === currentArtistId) || selectedArtist || artists[0];
  const [isFollowed, setIsFollowed] = useState(artist.isFollowed || false);

  const artistArtworks = artworks.filter(
    art => (art.artistId === artist.id || art.artistName === artist.name) && (art.status === 'Approved' || !art.status)
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
      
      {/* 4A. EDITORIAL GALLERY ARTISTS HERO */}
      <div className="bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#FAF8F5] p-10 sm:p-14 rounded-3xl border border-ivory-400/80 shadow-gallery space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 text-gold-900 text-xs font-bold tracking-widest uppercase border border-gold-500/30 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-gold-600" /> Contemporary Roster
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-navy-950 tracking-tight">
          ARTISTS
        </h1>
        <p className="text-lg sm:text-xl font-serif italic text-gold-800 max-w-2xl">
          "Discover the visual masters shaping contemporary African culture."
        </p>
        <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-3xl">
          Richbecky Gallery provides exclusive gallery representation for distinguished visual artists across the continent. Explore full artist biographies, curatorial statements, and catalogue works.
        </p>
      </div>

      {/* Dynamic Master Artists Directory Roster Bar */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gold-600" />
            <h3 className="font-serif text-sm font-bold text-navy-950 uppercase tracking-wider">
              Represented Master Artists Roster
            </h3>
          </div>
          <span className="text-xs text-neutral-500 font-medium">{artists.length} Active Masters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {artists.map((artItem) => {
            const count = artworks.filter(a => a.artistId === artItem.id || a.artistName === artItem.name).length;
            const isSelected = artItem.id === artist.id;

            return (
              <button
                key={artItem.id}
                onClick={() => {
                  setCurrentArtistId(artItem.id);
                  navigateToArtist(artItem);
                }}
                className={`p-4.5 rounded-xl border text-left transition flex items-center gap-4 ${
                  isSelected
                    ? 'bg-navy-950 text-white border-navy-950 shadow-md ring-2 ring-gold-400/50'
                    : 'bg-ivory-100/70 hover:bg-white text-navy-950 border-ivory-300'
                }`}
              >
                <img
                  src={getProductionImageUrl(artItem.avatar, artItem.name)}
                  alt={artItem.name}
                  onError={(e) => handleImageError(e, artItem.name)}
                  className={`w-14 h-14 rounded-full object-cover border-2 ${isSelected ? 'border-gold-400' : 'border-ivory-300'}`}
                />
                <div>
                  <h4 className={`font-serif text-base font-bold ${isSelected ? 'text-white' : 'text-navy-950'}`}>
                    {artItem.name}
                  </h4>
                  <span className={`text-xs block ${isSelected ? 'text-gold-400' : 'text-neutral-500'}`}>
                    {artItem.country} • {count} Work{count === 1 ? '' : 's'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cover Header */}
      <div className="relative rounded-3xl overflow-hidden bg-white border border-ivory-300 shadow-gallery">
        <div className="h-64 sm:h-80 w-full relative bg-ivory-100 p-4">
          <img
            src={getProductionImageUrl(artist.coverImage || artist.avatar, artist.name)}
            alt={artist.name}
            onError={(e) => handleImageError(e, artist.name)}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>

        {/* Profile Details Container */}
        <div className="relative px-6 sm:px-10 pb-8 -mt-16 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <img
              src={getProductionImageUrl(artist.avatar, artist.name)}
              alt={artist.name}
              onError={(e) => handleImageError(e, artist.name)}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-gallery bg-white"
            />
            
            <div className="text-navy-950 space-y-1">
              <span className="text-gold-700 text-xs uppercase tracking-widest font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-gold-600" /> Contemporary Visual Artist
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-950">{artist.name}</h1>
              <p className="text-sm text-neutral-600 flex items-center gap-2 font-medium">
                <Globe className="w-4 h-4 text-gold-700" /> Based in {artist.country}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFollowToggle}
              className={`px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-sm ${
                isFollowed
                  ? 'bg-gold-500 text-navy-950 hover:bg-gold-400'
                  : 'bg-navy-950 text-white hover:bg-gold-500 hover:text-navy-950'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFollowed ? 'fill-navy-950' : ''}`} />
              {isFollowed ? 'Following Artist' : 'Follow Roster'}
            </button>

            <button
              onClick={() => setActivePage('contact-advisory')}
              className="px-6 py-3.5 bg-white hover:bg-ivory-100 text-navy-950 border border-ivory-300 rounded-lg text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-gold-600" /> Enquire
            </button>
          </div>
        </div>
      </div>

      {/* Artist Stats & Bio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Biography & Artistic Practice */}
        <div className="lg:col-span-8 bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
          <div className="border-b border-ivory-200 pb-3">
            <span className="text-xs font-bold text-gold-700 uppercase tracking-widest block mb-1">Curatorial Profile</span>
            <h2 className="font-serif text-2xl font-bold text-navy-950">
              Artistic Practice & Biography
            </h2>
          </div>

          <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-light whitespace-pre-line">
            {artist.bio}
          </p>

          <div className="pt-4 border-t border-ivory-200 flex flex-wrap gap-4 text-xs font-medium text-neutral-500">
            {artist.socialLinks?.website && (
              <a href={artist.socialLinks.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-gold-700 hover:underline font-bold">
                <ExternalLink className="w-4 h-4" /> Official Website
              </a>
            )}
            {artist.socialLinks?.instagram && (
              <a href="#" className="flex items-center gap-1.5 text-gold-700 hover:underline font-bold">
                <Instagram className="w-4 h-4" /> {artist.socialLinks.instagram}
              </a>
            )}
          </div>
        </div>

        {/* Right Column: Gallery Credentials */}
        <div className="lg:col-span-4 bg-white text-navy-950 p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-6">
          <h3 className="font-serif text-lg font-bold text-navy-950 border-b border-ivory-200 pb-2">
            Gallery Representation
          </h3>
          
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <span className="text-neutral-500 font-medium">Representation Status</span>
              <span className="font-bold text-navy-950">Exclusive Gallery Roster</span>
            </div>

            <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
              <span className="text-neutral-500 font-medium">Available Catalogue Works</span>
              <span className="font-bold text-navy-950">{artistArtworks.length} Works</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-neutral-500 font-medium">Authenticity Guarantee</span>
              <span className="text-gold-700 font-bold flex items-center gap-1">
                <Award className="w-4 h-4 text-gold-600" /> Verified Master
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Artist Works Collection Grid */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">
            Available Works by {artist.name} ({artistArtworks.length})
          </h2>
        </div>

        {artistArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {artistArtworks.map(art => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center text-sm text-neutral-500 rounded-2xl border border-ivory-300">
            No works currently listed for this artist.
          </div>
        )}
      </div>

    </div>
  );
};
