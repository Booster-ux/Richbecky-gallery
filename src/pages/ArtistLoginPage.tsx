import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { Eye, EyeOff, Lock, Mail, ArrowRight, Award } from 'lucide-react';

export const ArtistLoginPage: React.FC = () => {
  const { loginArtist, loginDirectly, setActivePage, showToast } = useGallery();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid artist email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your artist portal password.');
      return;
    }

    const result = loginArtist(email, password);
    if (!result.success && result.message) {
      setErrorMsg(result.message);
    }
  };

  const handleInstantArtistLogin = () => {
    loginDirectly('artist', email || 'artist@richbeckygallery.com', 'Adebayo Ogunlesi');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-gallery space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
          <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block flex items-center justify-center gap-1">
            <Award className="w-4 h-4 text-gold-600" /> Artist Representation Portal
          </span>
          <h1 className="font-serif text-3xl font-bold text-navy-950">Artist Studio Authentication</h1>
          <p className="text-xs text-neutral-500 font-light">
            Sign in to manage portfolio masterworks, review pending approvals, and track financial earnings.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-amber-50 border border-amber-300 text-amber-900 text-xs rounded font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1.5">Artist Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="artist@richbeckygallery.com"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 pl-10 text-navy-950 focus:outline-none focus:border-gold-500"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-bold text-navy-950 uppercase tracking-wider">Password *</label>
              <button
                type="button"
                onClick={() => showToast('Password recovery email link sent.', 'info')}
                className="text-[11px] text-gold-700 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 pl-10 pr-10 text-navy-950 focus:outline-none focus:border-gold-500"
              />
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-neutral-400 hover:text-navy-950"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold uppercase tracking-widest text-xs transition duration-300 shadow-xl flex items-center justify-center gap-2"
          >
            Sign In to Artist Studio <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-ivory-200 text-center space-y-3 text-xs">
          <p className="text-neutral-600">
            Interested in representation?{' '}
            <button
              onClick={() => setActivePage('artist-landing')}
              className="text-gold-700 font-bold hover:underline"
            >
              Apply as an Artist
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
