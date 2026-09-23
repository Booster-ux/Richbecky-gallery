import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Lock, Crown, Headphones, Terminal, ShieldCheck, ArrowRight, LayoutDashboard, Eye, EyeOff } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin } = useGallery();
  const [selectedRole, setSelectedRole] = useState<'director' | 'owner' | 'support' | 'developer'>('director');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRoleKey = (role: 'director' | 'owner' | 'support' | 'developer') => {
    return role === 'director' ? 'admin' :
           role === 'owner' ? 'owner_content' :
           role === 'support' ? 'admin_support' : 'web_developer';
  };

  const isRolePasswordConfigured = (role: 'director' | 'owner' | 'support' | 'developer') => {
    const roleKey = getRoleKey(role);
    try {
      const customAccounts = JSON.parse(localStorage.getItem('rbg_custom_admin_accounts') || '{}');
      return Boolean(customAccounts[roleKey]?.password || localStorage.getItem(`rbg_password_set_${roleKey}`));
    } catch {
      return false;
    }
  };

  const hasConfiguredPassword = isRolePasswordConfigured(selectedRole);

  const handleRoleSelect = (role: 'director' | 'owner' | 'support' | 'developer') => {
    setSelectedRole(role);
    setEmail('');
    setPassword('');
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      loginAdmin(email, password, selectedRole);
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 animate-fade-in">
      <div className="max-w-xl w-full bg-white p-8 sm:p-10 rounded-3xl border border-ivory-300 shadow-2xl space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-50 text-gold-700 border border-gold-300 text-[11px] font-bold tracking-widest uppercase">
            <Lock className="w-3 h-3 text-gold-600" /> Dedicated Team Governance Portals
          </div>
          <h1 className="font-serif text-2xl font-semibold text-navy-900">
            Executive Governance Authentication
          </h1>
          <p className="text-xs text-neutral-500 font-light">
            Select your administrative portal and sign in with your authorized staff credentials.
          </p>
        </div>

        {/* Role Selection Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-ivory-100 p-1.5 rounded-2xl border border-ivory-300 text-xs font-semibold">
          <button
            type="button"
            onClick={() => handleRoleSelect('director')}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              selectedRole === 'director' ? 'bg-navy-950 text-white shadow-md' : 'text-neutral-600 hover:text-navy-950'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-gold-400" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Director</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('owner')}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              selectedRole === 'owner' ? 'bg-navy-950 text-white shadow-md' : 'text-neutral-600 hover:text-navy-950'
            }`}
          >
            <Crown className="w-4 h-4 text-gold-400" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Owner</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('support')}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              selectedRole === 'support' ? 'bg-navy-950 text-white shadow-md' : 'text-neutral-600 hover:text-navy-950'
            }`}
          >
            <Headphones className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Support</span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('developer')}
            className={`py-2.5 px-2 rounded-xl flex flex-col items-center gap-1 transition ${
              selectedRole === 'developer' ? 'bg-navy-950 text-white shadow-md' : 'text-neutral-600 hover:text-navy-950'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span className="text-[10px] uppercase font-bold tracking-wider">Dev</span>
          </button>
        </div>

        {/* Clean Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-navy-900 uppercase tracking-wider block">
              Staff Email Address *
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your authorized staff email..."
              className="w-full bg-ivory-100 border border-ivory-300 rounded-xl p-3 text-navy-900 focus:outline-none focus:border-gold-500 transition font-medium"
            />
          </div>

          {/* Password field only shown once password has been configured for this role */}
          {hasConfiguredPassword && (
            <div className="space-y-1.5">
              <label className="font-semibold text-navy-900 uppercase tracking-wider block">
                Password Security Key *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="w-full bg-ivory-100 border border-ivory-300 rounded-xl p-3 pr-10 text-navy-900 focus:outline-none focus:border-gold-500 transition"
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
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-bold uppercase tracking-widest text-xs transition duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating Portal Access...</span>
            ) : (
              <>
                <span>Sign In to Governance Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Security Note */}
        <div className="pt-4 border-t border-ivory-200 text-center flex items-center justify-center gap-2 text-[11px] text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
          <span>Role-Based Access Control (RBAC) Active & Enforced</span>
        </div>

      </div>
    </div>
  );
};
