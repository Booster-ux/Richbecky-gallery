import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { LayoutDashboard, CheckCircle2, XCircle, Clock, Eye, Users, ShoppingBag, DollarSign, Settings, Palette, Award } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { artworks, artists, orders, approveArtwork, rejectArtwork, navigateToArtwork } = useGallery();
  const [activeTab, setActiveTab] = useState<'approvals' | 'artworks' | 'artists' | 'sales'>('approvals');

  const pendingArtworks = artworks.filter(a => a.status === 'Pending Admin Approval');
  const approvedArtworks = artworks.filter(a => a.status === 'Approved');
  const rejectedArtworks = artworks.filter(a => a.status === 'Rejected');

  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Admin Header */}
      <div className="bg-navy-950 text-ivory-100 p-8 rounded-2xl border border-gold-500/30 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4" /> Richbecky Gallery Executive Control
          </span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Admin Operations Portal</h1>
          <p className="text-xs text-neutral-300">Curatorial Approval & Platform Governance Console</p>
        </div>

        <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-full border border-gold-500/30 text-xs text-gold-400 font-semibold">
          <span>{pendingArtworks.length} Action Items Pending</span>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Total Gallery Artworks</span>
          <span className="font-serif text-2xl font-bold text-navy-900 mt-1 block">{artworks.length}</span>
        </div>

        <div className="bg-amber-50 p-5 rounded-xl border border-amber-300 shadow-subtle">
          <span className="text-xs text-amber-900 font-medium block">Pending Approvals</span>
          <span className="font-serif text-2xl font-bold text-amber-700 mt-1 block">{pendingArtworks.length}</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Represented Artists</span>
          <span className="font-serif text-2xl font-bold text-navy-900 mt-1 block">{artists.length}</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Total Orders</span>
          <span className="font-serif text-2xl font-bold text-navy-900 mt-1 block">{orders.length}</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-medium block">Gross Marketplace Volume</span>
          <span className="font-serif text-2xl font-bold text-gold-600 mt-1 block">${totalSales.toLocaleString()}</span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-ivory-300 space-x-6 text-xs font-semibold uppercase tracking-wider">
        <button
          onClick={() => setActiveTab('approvals')}
          className={`py-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'approvals' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-600" /> Pending Approvals ({pendingArtworks.length})
        </button>

        <button
          onClick={() => setActiveTab('artworks')}
          className={`py-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'artworks' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'
          }`}
        >
          <Palette className="w-4 h-4" /> All Artworks ({artworks.length})
        </button>

        <button
          onClick={() => setActiveTab('artists')}
          className={`py-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'artists' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'
          }`}
        >
          <Users className="w-4 h-4" /> Artists Management ({artists.length})
        </button>

        <button
          onClick={() => setActiveTab('sales')}
          className={`py-3 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'sales' ? 'border-gold-500 text-navy-900 font-bold' : 'border-transparent text-neutral-500'
          }`}
        >
          <DollarSign className="w-4 h-4" /> Sales & Reports
        </button>
      </div>

      {/* Tab 1: Pending Artwork Approval Queue */}
      {activeTab === 'approvals' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-semibold text-navy-900">Curatorial Review Queue</h2>

          {pendingArtworks.length > 0 ? (
            <div className="space-y-4">
              {pendingArtworks.map(art => (
                <div key={art.id} className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  
                  {/* Artwork Preview & Details */}
                  <div className="flex items-center gap-4">
                    <img src={art.imageUrl} alt={art.title} className="w-24 h-28 object-cover rounded border border-ivory-300 flex-shrink-0" />
                    <div className="space-y-1">
                      <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase rounded ${
                        art.type === 'Original' ? 'bg-navy-900 text-gold-400' : 'bg-ivory-200 text-navy-800'
                      }`}>
                        {art.type}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-navy-900">{art.title}</h3>
                      <p className="text-xs text-neutral-600">Artist: <strong className="text-navy-900">{art.artistName}</strong></p>
                      <p className="text-xs text-neutral-500">{art.category} • {art.medium} • {art.dimensions}</p>
                      <span className="text-xs font-bold text-navy-900 block pt-1">${art.price.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Actions: Approve & Reject */}
                  <div className="flex items-center gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-ivory-200">
                    <button
                      onClick={() => navigateToArtwork(art)}
                      className="px-3 py-2 bg-ivory-200 hover:bg-ivory-300 text-navy-900 rounded text-xs font-semibold flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>

                    <button
                      onClick={() => rejectArtwork(art.id)}
                      className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 border border-rose-300 transition"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>

                    <button
                      onClick={() => approveArtwork(art.id)}
                      className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Approve & Publish
                    </button>
                  </div>

                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-12 text-center rounded-xl border border-ivory-300 space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-lg font-semibold text-navy-900">All submissions reviewed!</h3>
              <p className="text-xs text-neutral-500">There are currently no artworks awaiting approval.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: All Artworks Management */}
      {activeTab === 'artworks' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Full Artwork Inventory ({artworks.length})</h2>
          
          <div className="divide-y divide-ivory-200 text-xs">
            {artworks.map(art => (
              <div key={art.id} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={art.imageUrl} alt="" className="w-10 h-12 object-cover rounded" />
                  <div>
                    <span className="font-semibold text-navy-900 block">{art.title}</span>
                    <span className="text-neutral-500">{art.artistName} • ${art.price.toLocaleString()}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                  art.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {art.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Artist Management */}
      {activeTab === 'artists' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Represented Roster Artists ({artists.length})</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {artists.map(a => (
              <div key={a.id} className="border border-ivory-300 rounded-lg p-4 flex items-center gap-3">
                <img src={a.avatar} alt="" className="w-12 h-12 rounded-full object-cover border" />
                <div>
                  <h4 className="font-serif text-sm font-bold text-navy-900">{a.name}</h4>
                  <p className="text-xs text-neutral-500">{a.country} • {a.exhibitionsCount} Exhibitions</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Sales & Reports */}
      {activeTab === 'sales' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-xs">
          <h2 className="font-serif text-lg font-semibold text-navy-900">Executive Marketplace Sales Ledger</h2>
          <div className="p-4 bg-navy-900 text-ivory-100 rounded-xl space-y-1">
            <span className="text-gold-400 font-semibold block text-xs">Total Marketplace Sales</span>
            <span className="text-3xl font-bold font-serif">${totalSales.toLocaleString()}</span>
            <p className="text-[11px] text-neutral-400">Net Gallery Commission (15%): ${(totalSales * 0.15).toLocaleString()}</p>
          </div>
        </div>
      )}

    </div>
  );
};
