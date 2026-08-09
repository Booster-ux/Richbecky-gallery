import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Sparkles, Palette, ShieldCheck, ArrowRight } from 'lucide-react';

export const ArtistRegisterPage: React.FC = () => {
  const { setActivePage, showToast, setCurrentUserRole } = useGallery();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: '',
    website: '',
    instagram: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match.', 'warning');
      return;
    }

    showToast('Artist Representation Application Submitted! Switching to Artist Dashboard.', 'success');
    setCurrentUserRole('artist');
    setActivePage('artist-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-700 text-xs font-semibold uppercase tracking-wider border border-gold-300">
          <Palette className="w-3.5 h-3.5" /> Join Richbecky Gallery Roster
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-900">
          Apply for International Artist Representation
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
          Submit your portfolio for consideration by our international curatorial advisory board. Gain access to global art collectors and white-glove gallery services.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-6">
        
        <h2 className="font-serif text-lg font-semibold text-navy-900 border-b border-ivory-200 pb-3">
          1. Artist Profile & Portfolio Information
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Full Legal / Artist Name *</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Elena Rostova"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Email Address *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="artist@studio.com"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Phone Number *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+44 7911 123456"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Profile Avatar Image URL</label>
            <input
              type="url"
              value={formData.profileImage}
              onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
              placeholder="https://..."
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-neutral-700 font-medium mb-1">Artist Bio & Curatorial Statement *</label>
            <textarea
              required
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Describe your background, artistic medium, key themes, and major exhibitions..."
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Website / Portfolio URL</label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://myartportfolio.com"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Instagram Handle</label>
            <input
              type="text"
              value={formData.instagram}
              onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
              placeholder="@artist_studio"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <h2 className="font-serif text-lg font-semibold text-navy-900 border-b border-ivory-200 pb-3 pt-4">
          2. Portal Security Password
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-neutral-700 font-medium mb-1">Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Confirm Password *</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition shadow-md flex items-center justify-center gap-2"
        >
          Submit Application & Launch Artist Dashboard <ArrowRight className="w-4 h-4" />
        </button>

      </form>

    </div>
  );
};
