import React, { useState, useEffect } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Lock, Crown, Headphones, Terminal, ShieldCheck, ArrowRight, LayoutDashboard, CheckCircle2 } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, loginDirectly } = useGallery();
  const [selectedRole, setSelectedRole] = useState<'director' | 'owner' | 'support' | 'developer'>('director');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCustomConfigured, setIsCustomConfigured] = useState(false);

  const getRoleKey = (role: 'director' | 'owner' | 'support' | 'developer') => {
    return role === 'director' ? 'admin' :
           role === 'owner' ? 'owner_content' :
           role === 'support' ? 'admin_support' : 'web_developer';
  };

  const updateRoleState = (role: 'director' | 'owner' | 'support' | 'developer') => {
    setSelectedRole(role);
    const roleKey = getRoleKey(role);
    
    let customAccounts: any = {};
    try {
      customAccounts = JSON.parse(localStorage.getItem('rbg_custom_admin_accounts') || '{}');
    } catch (e) {
      customAccounts = {};
    }

    const savedAccount = customAccounts[roleKey];
    const isDemoDisabled = localStorage.getItem(`rbg_demo_disabled_${roleKey}`) === 'true' || !!savedAccount;

    setIsCustomConfigured(isDemoDisabled);

    if (savedAccount && savedAccount.email) {
      setEmail(savedAccount.email);
      setPassword('');
    } else if (!isDemoDisabled) {
      if (role === 'director') {
        setEmail('admin@richbeckygallery.com');
        setPassword('admin123');
      } else if (role === 'owner') {
        setEmail('owner@richbeckygallery.com');
        setPassword('OwnerPassword123!');
      } else if (role === 'support') {
        setEmail('support@richbeckygallery.com');
        setPassword('SupportPassword123!');
      } else {
        setEmail('developer@richbeckygallery.com');
        setPassword('DeveloperPassword123!');
      }
    } else {
      setEmail('');
      setPassword('');
    }
  };

  useEffect(() => {
    updateRoleState('director');
  }, []);

  const handleRoleSelect = (role: 'director' | 'owner' | 'support' | 'developer') => {
    updateRoleState(role);
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      loginAdmin(email, password, selectedRole);
      setIsSubmitting(false);
    }, 400);
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
            Select your administrative role or sign in with your verified staff credentials.
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

        {/* Status Indicator */}
        {isCustomConfigured && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center gap-2 text-xs text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Permanent custom credentials configured. Please sign in with your personalized email & password.</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleAdminLogin} className="space-y-5 text-xs">
          <div className="space-y-1.5">
            <label className="font-semibold text-navy-900 uppercase tracking-wider block">
              {selectedRole.toUpperCase()} Login Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={`${selectedRole}@richbeckygallery.com`}
              className="w-full bg-ivory-100 border border-ivory-300 rounded-xl p-3 text-navy-900 focus:outline-none focus:border-gold-500 transition"
            />
          </div>

          <div className="space-y-1.5">
            <label className="font-semibold text-navy-900 uppercase tracking-wider block">
              Password Security Key
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full bg-ivory-100 border border-ivory-300 rounded-xl p-3 text-navy-900 focus:outline-none focus:border-gold-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-semibold uppercase tracking-widest text-xs transition duration-300 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Authenticating Portal Access...</span>
            ) : (
              <>
                <span>Enter {selectedRole.toUpperCase()} Portal</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          {/* First-Time Demo Login Option (Only visible if credentials have NOT been customized yet) */}
          {!isCustomConfigured && (
            <>
              <div className="relative py-2 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-ivory-300"></div></div>
                <span className="relative bg-white px-3 text-[11px] text-neutral-400 font-medium">INITIAL SETUP ACCESS</span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const roleKey = selectedRole === 'director' ? 'admin' :
                                  selectedRole === 'owner' ? 'owner_content' :
                                  selectedRole === 'support' ? 'support' : 'developer';
                  loginDirectly(roleKey);
                }}
                className="w-full py-3 bg-gold-50 hover:bg-gold-100 text-gold-900 border border-gold-400/60 rounded-xl font-bold uppercase tracking-wider text-xs transition flex items-center justify-center gap-2 shadow-sm"
              >
                <span>⚡ Instant One-Click Login (Without Password)</span>
              </button>
              <p className="text-[11px] text-center text-neutral-500 font-light">
                💡 First time logging in? Use one-click access, then personalize your permanent email & password in the Settings tab.
              </p>
            </>
          )}
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

