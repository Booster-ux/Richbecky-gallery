import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { PlusCircle, Palette, DollarSign, ShoppingBag, Clock, CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export const ArtistDashboardPage: React.FC = () => {
  const { artworks, setActivePage, navigateToArtwork, currentUser } = useGallery();
  const [activeTab, setActiveTab] = useState<'overview' | 'artworks' | 'sales' | 'profile'>('overview');

  // Filter artworks for this artist demo
  const artistWorks = artworks;
  const pendingCount = artistWorks.filter(a => a.status === 'Pending Admin Approval').length;
  const approvedCount = artistWorks.filter(a => a.status === 'Approved').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Artist Portal Header */}
      <div className="bg-navy-900 text-ivory-100 p-8 rounded-2xl border border-gold-500/30 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Artist Management Studio</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Elena Rostova Studio</h1>
          <p className="text-xs text-neutral-300">Representation Status: Active Gallery Artist</p>
        </div>

        <button
          onClick={() => setActivePage('add-artwork')}
          className="px-5 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-semibold text-xs uppercase tracking-wider transition shadow-gold-glow flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Add New Artwork
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Total Listed Artworks</span>
          <span className="font-serif text-2xl font-bold text-navy-900 mt-1 block">{artistWorks.length} Works</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Pending Admin Approval</span>
          <span className="font-serif text-2xl font-bold text-amber-600 mt-1 block">{pendingCount} Works</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Published & Active</span>
          <span className="font-serif text-2xl font-bold text-emerald-700 mt-1 block">{approvedCount} Works</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Net Artist Earnings</span>
          <span className="font-serif text-2xl font-bold text-gold-600 mt-1 block">$18,450</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ivory-300 space-x-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('overview')}
          className={`py-3 border-b-2 transition ${activeTab === 'overview' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'}`}
        >
          My Artworks Portfolio ({artistWorks.length})
        </button>
        <button
          onClick={() => setActiveTab('sales')}
          className={`py-3 border-b-2 transition ${activeTab === 'sales' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'}`}
        >
          Sales & Commissions
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 border-b-2 transition ${activeTab === 'profile' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'}`}
        >
          Studio Profile Settings
        </button>
      </div>

      {/* Tab Content: Artworks List with Approval Statuses */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl border border-ivory-300 shadow-subtle p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-navy-900">Submitted Artwork Catalog</h2>
            <button
              onClick={() => setActivePage('add-artwork')}
              className="text-xs text-gold-700 font-semibold hover:underline flex items-center gap-1"
            >
              + Upload Artwork
            </button>
          </div>

          <div className="divide-y divide-ivory-200">
            {artistWorks.map(art => (
              <div key={art.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4">
                  <img src={art.imageUrl} alt={art.title} className="w-16 h-16 object-cover rounded border" />
                  <div>
                    <h3 className="font-serif text-base font-semibold text-navy-900">{art.title}</h3>
                    <p className="text-xs text-neutral-500">{art.category} • {art.type} • ${art.price.toLocaleString()}</p>
                    <span className="text-[10px] text-neutral-400">Created: {art.year}</span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="flex items-center gap-4">
                  <span className={`px-3 py-1 text-xs font-semibold rounded flex items-center gap-1.5 ${
                    art.status === 'Approved'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : art.status === 'Pending Admin Approval'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}>
                    {art.status === 'Approved' && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {art.status === 'Pending Admin Approval' && <Clock className="w-3.5 h-3.5" />}
                    {art.status === 'Rejected' && <AlertCircle className="w-3.5 h-3.5" />}
                    {art.status}
                  </span>

                  <button
                    onClick={() => navigateToArtwork(art)}
                    className="p-2 text-neutral-400 hover:text-navy-900 transition"
                    title="Preview Artwork Page"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Sales & Commission Breakdown */}
      {activeTab === 'sales' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Recent Sales & Payout Records</h2>
          <div className="text-xs text-neutral-500">
            Artist commission is paid bi-weekly upon gallery delivery confirmation.
          </div>

          <div className="border border-ivory-300 rounded-lg p-4 bg-ivory-100 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-navy-900 block text-sm">Sale #RBG-88402 — Serenade in Blue & Gold</span>
              <span className="text-neutral-500">Acquired by Lady Rebecca Sterling on 2026-07-28</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-emerald-700 text-sm block">+$4,122.50 Net</span>
              <span className="text-[10px] text-neutral-400">15% Gallery Commission Deducted</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-xs">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Artist Studio Information</h2>
          <p className="text-neutral-600">Update your public biography, social links, and bank wire payout settings.</p>
        </div>
      )}

    </div>
  );
};
