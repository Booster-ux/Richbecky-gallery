import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { CurrencyCode } from '../types';
import { LOGO_URL } from '../data/mockData';
import { Eye, EyeOff, Lock, Mail, User, Phone, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

export const CustomerRegisterPage: React.FC = () => {
  const { registerCustomer, setActivePage } = useGallery();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [preferredCurrency, setPreferredCurrency] = useState<CurrencyCode>('USD');
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!firstName.trim() || !lastName.trim()) {
      setErrorMsg('Please enter your full first and last name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please re-enter your password.');
      return;
    }

    if (!agreedTerms || !agreedPrivacy) {
      setErrorMsg('You must accept the Terms & Conditions and Privacy Policy to create an account.');
      return;
    }

    registerCustomer({
      firstName,
      lastName,
      email,
      phone,
      country,
      preferredCurrency
    });
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-gallery space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
          <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Collector Account Registration</span>
          <h1 className="font-serif text-3xl font-bold text-navy-950">Join Private Collector Circle</h1>
          <p className="text-xs text-neutral-500 font-light">
            Create an account to save wishlists, manage multi-currency acquisitions, and track white-glove shipments.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          
          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">First Name *</label>
              <input
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Rebecca"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Last Name *</label>
              <input
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Sterling"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rebecca@artcollector.com"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Phone / WhatsApp</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+44 20 7946 0912"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Country & Preferred Currency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Country of Residence</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="United Kingdom / Nigeria / USA"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Preferred Currency</label>
              <select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-bold text-navy-950 focus:outline-none focus:border-gold-500"
              >
                <option value="USD">USD ($) - US Dollar</option>
                <option value="NGN">NGN (₦) - Nigerian Naira</option>
                <option value="GBP">GBP (£) - British Pound</option>
                <option value="EUR">EUR (€) - Euro</option>
                <option value="CAD">CAD ($) - Canadian Dollar</option>
                <option value="AUD">AUD ($) - Australian Dollar</option>
              </select>
            </div>
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Password *</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 pr-10 text-navy-950 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-neutral-400 hover:text-navy-950"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Confirm Password *</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 pr-10 text-navy-950 focus:outline-none focus:border-gold-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3.5 text-neutral-400 hover:text-navy-950"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Legal Consents */}
          <div className="space-y-2 pt-2 border-t border-ivory-200">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-gold-500 rounded"
              />
              <span className="text-neutral-600">
                I agree to the <button type="button" onClick={() => setActivePage('policies')} className="text-gold-700 underline font-semibold">Terms & Conditions</button> of Richbecky Gallery.
              </span>
            </label>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={agreedPrivacy}
                onChange={(e) => setAgreedPrivacy(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-gold-500 rounded"
              />
              <span className="text-neutral-600">
                I acknowledge the <button type="button" onClick={() => setActivePage('policies')} className="text-gold-700 underline font-semibold">Privacy Policy</button> regarding collector data protection.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold uppercase tracking-widest text-xs transition duration-300 shadow-xl flex items-center justify-center gap-2"
          >
            Create Collector Account <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-ivory-200 text-center space-y-3 text-xs">
          <p className="text-neutral-600">
            Already have an account?{' '}
            <button
              onClick={() => setActivePage('login')}
              className="text-gold-700 font-bold hover:underline"
            >
              Sign In Here
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};
