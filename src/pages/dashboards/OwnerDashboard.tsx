import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import { ArtworkCard } from '../../components/ArtworkCard';
import {
  Crown, DollarSign, CheckCircle2, XCircle, Sparkles, TrendingUp,
  FileText, Users, Eye, ShieldCheck, ArrowRight, Layers, Bell
} from 'lucide-react';

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
    currentUser,
    logout,
    showToast,
    formatPrice,
    selectedCurrency
  } = useGallery();

  const [activeTab, setActiveTab] = useState<'overview' | 'artworks' | 'artists' | 'financials'>('overview');
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedArtworkForRejection, setSelectedArtworkForRejection] = useState<string | null>(null);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-8 rounded-3xl text-white shadow-gallery flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gold-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-300 text-xs font-bold uppercase tracking-widest">
            <Crown className="w-3.5 h-3.5 text-gold-400" /> Owner & Content Director Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ivory-100">
            Executive Gallery Governance
          </h1>
          <p className="text-xs sm:text-sm text-ivory-300/80 max-w-2xl font-light">
            Welcome back, {currentUser?.name || 'Owner'}. Oversee financial ledgers, curatorial approvals, and brand editorial strategy.
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
      <div className="flex border-b border-ivory-300 space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`pb-3 border-b-2 transition ${activeTab === 'overview' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'}`}
        >
          Executive Overview
        </button>
        <button
          onClick={() => setActiveTab('artworks')}
          className={`pb-3 border-b-2 transition ${activeTab === 'artworks' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'}`}
        >
          Curatorial Artwork Queue ({pendingArtworks.length})
        </button>
        <button
          onClick={() => setActiveTab('artists')}
          className={`pb-3 border-b-2 transition ${activeTab === 'artists' ? 'border-gold-600 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'}`}
        >
          Artist Applications ({pendingApplications.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-navy-950">Active Catalogue Governance</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map(art => (
              <ArtworkCard key={art.id} artwork={art} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'artworks' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-navy-950">Pending Curatorial Review</h2>
          {pendingArtworks.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 text-neutral-500">
              No pending artwork submissions awaiting owner approval.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingArtworks.map(art => (
                <div key={art.id} className="p-6 bg-white rounded-2xl border border-ivory-300 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={art.imageUrl} alt={art.title} className="w-20 h-20 object-cover rounded-xl border border-ivory-300" />
                    <div>
                      <h3 className="font-serif text-lg font-bold text-navy-950">{art.title}</h3>
                      <p className="text-xs text-neutral-600 font-light">Artist: {art.artistName} • {art.medium}</p>
                      <p className="text-xs text-gold-700 font-semibold mt-1">${art.price.toLocaleString()} {art.currency}</p>
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

      {activeTab === 'artists' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-navy-950">Artist Representation Submissions</h2>
          {pendingApplications.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 text-neutral-500">
              No pending artist representation applications.
            </div>
          ) : (
            <div className="space-y-4">
              {pendingApplications.map(app => (
                <div key={app.id} className="p-6 bg-white rounded-2xl border border-ivory-300 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-navy-950">{app.artistName} ({app.fullName})</h3>
                    <p className="text-xs text-neutral-600 font-light">{app.email} • {app.country}</p>
                    <p className="text-xs text-neutral-500 mt-1 max-w-xl italic">"{app.bio}"</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => approveArtistApplication(app.id)}
                      className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition"
                    >
                      Approve Artist
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
