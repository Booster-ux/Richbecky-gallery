import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ShieldAlert, KeyRound, Eye, EyeOff, Lock, CheckCircle2, LogOut } from 'lucide-react';

export const SetAdminPasswordModal: React.FC = () => {
  const { needsPasswordSetup, currentUser, saveAdminInitialPassword } = useGallery();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!needsPasswordSetup || !currentUser) {
    return null;
  }

  const roleTitle =
    currentUser.role === 'admin' ? 'Executive Director' :
    currentUser.role === 'owner_content' ? 'Gallery Owner & Content Curator' :
    currentUser.role === 'admin_support' ? 'Operations & Support Specialist' :
    'Lead Web Developer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match. Please verify.');
      return;
    }

    setIsSubmitting(true);
    try {
      await saveAdminInitialPassword(password);
    } catch (err: any) {
      setError(err?.message || 'Failed to save password. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white max-w-lg w-full rounded-3xl border border-gold-300/40 shadow-2xl overflow-hidden animate-scale-up">
        
        {/* Top Header Banner */}
        <div className="bg-navy-950 text-white p-6 text-center relative border-b border-gold-500/30">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gold-500/20 border border-gold-400/40 flex items-center justify-center mb-3 text-gold-400 shadow-inner">
            <KeyRound className="w-7 h-7" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-[10px] font-bold tracking-widest uppercase mb-1">
            <ShieldAlert className="w-3 h-3 text-gold-400" /> Mandatory First-Time Setup
          </div>
          <h2 className="font-serif text-2xl font-bold text-ivory-100">
            Set Your Permanent Password
          </h2>
          <p className="text-xs text-neutral-300 mt-1 max-w-sm mx-auto">
            Account: <span className="font-semibold text-gold-300">{roleTitle}</span> ({currentUser.email})
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-amber-900">Security Governance Policy</p>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                To protect gallery data and orders, please create a secure password now. Once saved, you will be logged out to sign in securely with your new password.
              </p>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="font-bold text-navy-950 uppercase tracking-wider block">
                Create New Password (min. 6 characters) *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your new secret password..."
                  className="w-full bg-ivory-50 border border-ivory-300 rounded-xl p-3 pr-10 text-navy-900 focus:outline-none focus:border-gold-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy-950 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-navy-950 uppercase tracking-wider block">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password to confirm..."
                  className="w-full bg-ivory-50 border border-ivory-300 rounded-xl p-3 pr-10 text-navy-900 focus:outline-none focus:border-gold-500 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-navy-950 transition"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 py-3.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Securing Account...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>Save Password & Log Out</span>
                  <LogOut className="w-3.5 h-3.5 ml-1" />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
