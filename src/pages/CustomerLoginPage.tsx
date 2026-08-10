import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomerLoginPage: React.FC = () => {
  const { loginCustomer, setActivePage, showToast } = useGallery();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setErrorMsg('Please enter your account password.');
      return;
    }

    const success = loginCustomer(email, password);
    if (success) {
      setActivePage('account');
    }
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail || !resetEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast(`Password reset link generated for ${resetEmail}. (Frontend integration placeholder)`, 'info');
    setShowForgotPasswordModal(false);
    setResetEmail('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-gallery space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
          <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Collector Portal Access</span>
          <h1 className="font-serif text-3xl font-bold text-navy-950">Welcome Back</h1>
          <p className="text-xs text-neutral-500 font-light">
            Sign in to access your saved wishlist, acquisition history, and private advisory inbox.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1.5">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rebecca@artcollector.com"
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
                onClick={() => {
                  setResetEmail(email);
                  setShowForgotPasswordModal(true);
                }}
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
            Sign In to Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-ivory-200 text-center space-y-4 text-xs">
          <p className="text-neutral-600">
            Don't have a collector account yet?{' '}
            <button
              onClick={() => setActivePage('register')}
              className="text-gold-700 font-bold hover:underline"
            >
              Create Account
            </button>
          </p>

          <button
            onClick={() => setActivePage('catalogue')}
            className="text-neutral-500 hover:text-navy-950 text-xs font-semibold inline-flex items-center gap-1"
          >
            Return to Browsing Gallery →
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-8 rounded-2xl space-y-6 text-xs shadow-2xl">
            <div className="text-center space-y-2 border-b border-ivory-300 pb-4">
              <h3 className="font-serif text-xl font-bold text-navy-950">Reset Account Password</h3>
              <p className="text-[11px] text-neutral-500">
                Enter your email address below to receive password recovery instructions.
              </p>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="rebecca@artcollector.com"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div className="p-3 bg-ivory-100 rounded border border-ivory-300 text-[11px] text-neutral-600 space-y-1">
                <span className="font-bold text-navy-950 block">Frontend Integration Note:</span>
                <p>Password reset email dispatch is ready to connect to your backend auth provider.</p>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="px-4 py-2 border rounded font-bold text-neutral-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-navy-950 text-gold-400 font-bold rounded"
                >
                  Generate Reset Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
