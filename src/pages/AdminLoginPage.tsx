import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Lock, ShieldCheck, ArrowRight, LayoutDashboard } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useGallery();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      loginAdmin(email, password);
    }, 600);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 animate-fade-in">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-300 text-[11px] font-bold tracking-widest uppercase">
            <Lock className="w-3 h-3 text-gold-600" /> Private Curatorial Access
          </div>
          <h1 className="font-serif text-2xl font-semibold text-navy-900">
            Executive Governance Authentication
          </h1>
          <p className="text-xs text-neutral-500 font-light">
            Restricted portal for gallery directors, curatorial approval board, and escrow administrators.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-navy-900 uppercase tracking-wider block">
              Director Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="director@richbeckygallery.com"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-900 focus:outline-none focus:border-gold-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-navy-900 uppercase tracking-wider block">
              Security Credential / Token
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-900 focus:outline-none focus:border-gold-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold uppercase tracking-widest text-xs transition duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LayoutDashboard className="w-4 h-4" /> Authenticate & Access Admin Portal <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="pt-4 border-t border-ivory-200 text-center flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
          <span>256-Bit Encrypted Curatorial Escrow Channel</span>
        </div>

      </div>
    </div>
  );
};
