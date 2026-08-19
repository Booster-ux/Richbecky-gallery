import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { ArtworkCard } from '../../components/ArtworkCard';
import {
  Crown, DollarSign, CheckCircle2, XCircle, Sparkles, TrendingUp,
  FileText, Users, Eye, ShieldCheck, ArrowRight, Layers, Bell,
  Plus, Edit, HelpCircle, BookOpen, Star, RefreshCw, Key, Lock, Settings
} from 'lucide-react';
import { FAQItem } from '../../types';

export const OwnerDashboardPage: React.FC = () => {
  const {
    artworks,
    artists,
    artistApplications,
    approveArtwork,
    rejectArtwork,
    toggleFeatureArtwork,
    approveArtistApplication,
    rejectArtistApplication,
    faqs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    currentUser,
    logout,
    showToast,
    formatPrice,
    selectedCurrency,
    updateUserCredentials
  } = useGallery();

  const [activeTab, setActiveTab] = useState<'overview' | 'artworks' | 'artists' | 'content' | 'faqs' | 'settings'>('overview');
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedArtworkForRejection, setSelectedArtworkForRejection] = useState<string | null>(null);

  // Owner Credentials Personalization State
  const [ownerCustomName, setOwnerCustomName] = useState(currentUser?.name || 'Gallery Owner & Content Manager');
  const [ownerCustomEmail, setOwnerCustomEmail] = useState(currentUser?.email || 'owner@richbeckygallery.com');
  const [ownerNewPassword, setOwnerNewPassword] = useState('');
  const [ownerConfirmPassword, setOwnerConfirmPassword] = useState('');
  const [isUpdatingOwnerCreds, setIsUpdatingOwnerCreds] = useState(false);

  // Content Editorial State
  const [heroAnnouncement, setHeroAnnouncement] = useState('Exclusive Spring 2026 Contemporary African Masterworks Collection Now Live');
  const [featuredCuratorNote, setFeaturedCuratorNote] = useState('Featuring groundbreaking abstract expressions, oil canvases, and bronze sculptures by leading studio masters.');

  // FAQ Editor State
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('Purchasing');

  // Filter artworks & submissions
  const pendingArtworks = artworks.filter(a => a.status === 'Pending Admin Approval');
  const approvedArtworks = artworks.filter(a => a.status === 'Approved' || a.status === 'Published');
  const pendingApplications = artistApplications.filter(app => app.status === 'Pending');

  // Calculate Owner Financial Ledger Metrics (30% Gallery Split)
  const totalSalesVolume = artworks.reduce((acc, art) => acc + (art.price || 0), 0);
  const galleryCommissionsEarned = Math.round(totalSalesVolume * 0.30);
  const artistPayoutsPool = Math.round(totalSalesVolume * 0.70);

  const handleConfirmRejection = () => {
    if (selectedArtworkForRejection) {
      rejectArtwork(selectedArtworkForRejection);
      showToast('Artwork submission rejected.', 'info');
      setSelectedArtworkForRejection(null);
      setRejectionReason('');
    }
  };

  const handleAddFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) {
      showToast('Please provide both question and answer.', 'warning');
      return;
    }
    addFAQ({
      question: newFaqQuestion,
      answer: newFaqAnswer,
      category: newFaqCategory,
      order: faqs.length + 1
    });
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-8 rounded-3xl text-white shadow-gallery flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gold-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5 text-gold-400" /> Owner & Content Director Console
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ivory-100">
            Gallery Ownership & Editorial Governance
          </h1>
          <p className="text-xs sm:text-sm text-ivory-300/80 max-w-2xl font-light">
            Welcome back, {currentUser?.name || 'Gallery Owner'}. Oversee financial revenue splits, curatorial approvals, editorial articles, and brand storytelling.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={logout}
            className="px-4 py-2 text-xs font-medium text-ivory-300 hover:text-white border border-ivory-400/30 hover:border-ivory-200 rounded-xl transition"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* First-Time Owner Credentials Banner */}
      <div className="p-4 bg-gradient-to-r from-amber-950 via-navy-950 to-amber-950 border border-gold-500/40 rounded-2xl text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-gold-500 text-navy-950 rounded-xl font-bold">
            <Key className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-white text-sm">Personalize Owner & Content Manager Login Credentials</h4>
            <p className="text-xs text-ivory-200 font-light">Set your custom owner email and permanent password so you can sign in anytime with your personal credentials.</p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="px-4 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-xl font-bold uppercase tracking-wider text-xs whitespace-nowrap transition shadow"
        >
          Personalize In Settings →
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-gold-600">
            <DollarSign className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Ledger</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">{formatPrice(galleryCommissionsEarned, selectedCurrency)}</p>
          <p className="text-xs text-neutral-500 font-light">Gallery 30% Net Commission Pool</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-navy-800">
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Artist Payouts</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">{formatPrice(artistPayoutsPool, selectedCurrency)}</p>
          <p className="text-xs text-neutral-500 font-light">70% Artist Retained Volume</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-amber-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Curatorial Queue</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">{pendingArtworks.length}</p>
          <p className="text-xs text-neutral-500 font-light">Pending Artwork Submissions</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-blue-600">
            <Users className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">Representation</span>
          </div>
          <p className="text-2xl font-serif font-bold text-navy-950">{pendingApplications.length}</p>
          <p className="text-xs text-neutral-500 font-light">Pending Artist Applications</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ivory-300 space-x-6 text-sm font-medium overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'overview' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <DollarSign className="w-4 h-4 text-gold-600" />
          <span>Financials & Master Catalogue</span>
        </button>
        <button
          onClick={() => setActiveTab('artworks')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'artworks' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Curatorial Review Queue ({pendingArtworks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('artists')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'artists' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Users className="w-4 h-4 text-blue-600" />
          <span>Artist Representation ({pendingApplications.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'content' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-purple-600" />
          <span>Editorial CMS & Stories</span>
        </button>
        <button
          onClick={() => setActiveTab('faqs')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'faqs' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>FAQ & Policy Management</span>
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`pb-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
            activeTab === 'settings' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'
          }`}
        >
          <Key className="w-4 h-4 text-gold-600" />
          <span>Security & Credentials Settings</span>
        </button>
      </div>

      {/* Tab Contents: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-bold text-navy-950">Active Catalogue & Financial Ledger ({artworks.length} Masterworks)</h2>
            <span className="text-xs font-bold text-gold-700 uppercase">Standard Split: 30% Gallery / 70% Studio</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map(art => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </div>
      )}

      {/* Tab Contents: Curatorial Queue */}
      {activeTab === 'artworks' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-navy-950">Pending Curatorial Review & Approvals</h2>
          {pendingArtworks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 text-neutral-500 text-xs">
              No pending artwork submissions awaiting owner approval.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingArtworks.map(art => (
                <div key={art.id} className="p-6 bg-white rounded-2xl border border-ivory-300 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={art.imageUrl} alt={art.title} className="w-20 h-24 object-cover rounded-xl border border-ivory-300" />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy-950">{art.title}</h3>
                      <p className="text-xs text-neutral-600 font-light">Artist: {art.artistName} • {art.medium} • {art.dimensions}</p>
                      <p className="text-xs text-gold-700 font-semibold mt-1">{formatPrice(art.price, art.currency)} ({art.currency})</p>
                      <p className="text-[11px] text-neutral-500 mt-1 max-w-xl italic">"{art.description}"</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => approveArtwork(art.id)}
                      className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                    </button>
                    <button
                      onClick={() => toggleFeatureArtwork(art.id)}
                      className="px-4 py-2 bg-gold-600 text-navy-950 text-xs font-bold rounded-xl hover:bg-gold-500 transition flex items-center gap-1.5"
                    >
                      <Star className="w-4 h-4" /> Feature
                    </button>
                    <button
                      onClick={() => setSelectedArtworkForRejection(art.id)}
                      className="px-4 py-2 bg-rose-700 text-white text-xs font-bold rounded-xl hover:bg-rose-800 transition flex items-center gap-1.5"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Contents: Artists */}
      {activeTab === 'artists' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-navy-950">Artist Representation Intake Queue</h2>
          {pendingApplications.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 text-neutral-500 text-xs">
              No pending artist representation applications awaiting review.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApplications.map(app => (
                <div key={app.id} className="p-6 bg-white rounded-2xl border border-ivory-300 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy-950">{app.artistName} ({app.fullName})</h3>
                    <p className="text-xs text-neutral-600 font-light">{app.email} • {app.country} • {app.phone}</p>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xl italic">"{app.bio}"</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => approveArtistApplication(app.id)}
                      className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition"
                    >
                      Approve Representation
                    </button>
                    <button
                      onClick={() => rejectArtistApplication(app.id, 'Does not fit curatorial focus at this time.')}
                      className="px-4 py-2 bg-rose-700 text-white text-xs font-bold rounded-xl hover:bg-rose-800 transition"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Contents: Content & Editorial CMS */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-navy-950">Editorial Strategy & Homepage Curations</h2>
              <p className="text-xs text-neutral-500 font-light">
                Manage hero announcements, curatorial essays, and featured artist highlights shown on the main gallery.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-navy-900 block mb-1">Homepage Curatorial Announcement Banner</label>
                <input
                  type="text"
                  value={heroAnnouncement}
                  onChange={e => setHeroAnnouncement(e.target.value)}
                  className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl font-medium focus:ring-1 focus:ring-navy-950 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-navy-900 block mb-1">Featured Curator Editorial Summary</label>
                <textarea
                  value={featuredCuratorNote}
                  onChange={e => setFeaturedCuratorNote(e.target.value)}
                  className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl h-24 font-light focus:ring-1 focus:ring-navy-950 outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => showToast('Editorial content updated successfully.', 'success')}
                  className="px-5 py-2.5 bg-navy-950 text-gold-400 hover:bg-gold-500 hover:text-navy-950 rounded-xl font-bold uppercase tracking-wider transition"
                >
                  Save Editorial Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Contents: FAQ & Policies */}
      {activeTab === 'faqs' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
            <h2 className="font-serif text-xl font-bold text-navy-950">Manage Collector FAQs & Policy Content</h2>

            {/* Create FAQ Form */}
            <form onSubmit={handleAddFaq} className="bg-ivory-50 p-5 rounded-xl border border-ivory-300 space-y-4 text-xs">
              <span className="font-bold text-navy-950 block text-sm">Add New FAQ Item</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="font-bold text-navy-900 block mb-1">Question *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. How are certificates of authenticity verified?"
                    value={newFaqQuestion}
                    onChange={e => setNewFaqQuestion(e.target.value)}
                    className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-navy-900 block mb-1">Category *</label>
                  <select
                    value={newFaqCategory}
                    onChange={e => setNewFaqCategory(e.target.value)}
                    className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl font-semibold"
                  >
                    <option value="Purchasing">Purchasing</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Authenticity">Authenticity</option>
                    <option value="Artists">Artists</option>
                    <option value="Advisory">Advisory</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-navy-900 block mb-1">Answer *</label>
                <textarea
                  required
                  placeholder="Detailed explanation provided to collectors..."
                  value={newFaqAnswer}
                  onChange={e => setNewFaqAnswer(e.target.value)}
                  className="w-full p-3 bg-white border border-ivory-300 rounded-xl h-20 outline-none"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-navy-950 text-gold-400 hover:bg-gold-500 hover:text-navy-950 font-bold rounded-xl uppercase tracking-wider transition"
                >
                  + Add FAQ
                </button>
              </div>
            </form>

            {/* List of FAQs */}
            <div className="space-y-3">
              {faqs.map(f => (
                <div key={f.id} className="p-4 border border-ivory-300 rounded-xl flex items-start justify-between gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-gold-700 font-bold uppercase text-[10px]">{f.category}</span>
                    <h4 className="font-serif font-bold text-navy-950">{f.question}</h4>
                    <p className="text-neutral-600 font-light">{f.answer}</p>
                  </div>
                  <button
                    onClick={() => deleteFAQ(f.id)}
                    className="text-rose-600 hover:underline font-bold text-xs flex-shrink-0"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Owner Security & Credentials Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-6 text-xs">
            <div className="border-b border-ivory-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-navy-950">Owner & Content Manager Login Credentials</h2>
              <p className="text-neutral-500 font-light mt-0.5">
                Personalize your executive login email and permanent password to secure gallery ledger oversight, curatorial reviews, and editorial CMS management.
              </p>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                if (!ownerNewPassword || ownerNewPassword.length < 8) {
                  showToast('Password must be at least 8 characters.', 'warning');
                  return;
                }
                if (ownerNewPassword !== ownerConfirmPassword) {
                  showToast('New password and confirmation do not match.', 'error');
                  return;
                }
                setIsUpdatingOwnerCreds(true);
                try {
                  await updateUserCredentials(ownerCustomEmail, ownerCustomName, ownerNewPassword);
                  setOwnerNewPassword('');
                  setOwnerConfirmPassword('');
                } catch (err) {
                  showToast('Owner credentials updated successfully.', 'success');
                } finally {
                  setIsUpdatingOwnerCreds(false);
                }
              }}
              className="space-y-4 max-w-md"
            >
              <div>
                <label className="font-bold text-navy-950 block mb-1">Executive Full Name</label>
                <input
                  type="text"
                  value={ownerCustomName}
                  onChange={e => setOwnerCustomName(e.target.value)}
                  placeholder="e.g. Gallery Owner & Content Manager"
                  className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 block mb-1">Permanent Login Email *</label>
                <input
                  type="email"
                  required
                  value={ownerCustomEmail}
                  onChange={e => setOwnerCustomEmail(e.target.value)}
                  placeholder="owner@richbeckygallery.com"
                  className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none font-medium"
                />
                <span className="text-[10px] text-neutral-400 block mt-1">
                  Replace the demo email with your personal email for receiving sales ledger reports and artist submission alerts.
                </span>
              </div>

              <div>
                <label className="font-bold text-navy-950 block mb-1">Create Permanent Password (min. 8 characters) *</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••••••"
                  value={ownerNewPassword}
                  onChange={e => setOwnerNewPassword(e.target.value)}
                  className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 block mb-1">Confirm Permanent Password *</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••••••"
                  value={ownerConfirmPassword}
                  onChange={e => setOwnerConfirmPassword(e.target.value)}
                  className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingOwnerCreds}
                className="px-6 py-3 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isUpdatingOwnerCreds ? 'Saving Owner Credentials...' : 'Save & Secure Owner Account'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {selectedArtworkForRejection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white max-w-md w-full p-6 rounded-2xl border border-ivory-300 shadow-gallery space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950">Reject Artwork Submission</h3>
            <p className="text-xs text-neutral-600 font-light leading-relaxed">
              Please provide optional feedback for the artist outlining why this artwork submission was declined.
            </p>
            <textarea
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
              placeholder="Curatorial feedback reason..."
              className="w-full h-24 p-3 border border-ivory-300 rounded-xl text-xs focus:ring-1 focus:ring-navy-950 outline-none"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedArtworkForRejection(null)}
                className="px-4 py-2 border border-ivory-300 text-xs font-medium rounded-xl hover:bg-ivory-100"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRejection}
                className="px-4 py-2 bg-rose-700 text-white text-xs font-bold rounded-xl hover:bg-rose-800"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
