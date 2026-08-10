import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  DollarSign,
  CreditCard,
  User,
  Settings,
  Bell,
  LogOut,
  FileText,
  HelpCircle,
  Layers,
  Sparkles,
  Calculator,
  Package
} from 'lucide-react';
import { getProductionImageUrl, handleImageError } from '../services/imageService';
import { CurrencyCode } from '../types';

export const ArtistDashboardPage: React.FC = () => {
  const { artworks, setActivePage, navigateToArtwork, formatOriginalPrice, showToast, payouts } = useGallery();
  
  type ArtistTab =
    | 'overview'
    | 'artworks'
    | 'sales'
    | 'earnings'
    | 'calculator'
    | 'payouts'
    | 'orders'
    | 'profile'
    | 'notifications'
    | 'settings';

  const [activeTab, setActiveTab] = useState<ArtistTab>('overview');
  const [calcPrice, setCalcPrice] = useState<number>(250000);
  const [calcCurrency, setCalcCurrency] = useState<CurrencyCode>('NGN');
  const [commissionPct] = useState<number>(15);

  const artistWorks = artworks;
  const pendingCount = artistWorks.filter(a => a.status === 'Pending Admin Approval').length;
  const approvedCount = artistWorks.filter(a => a.status === 'Approved').length;
  const rejectedCount = artistWorks.filter(a => a.status === 'Rejected').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Artist Studio Header */}
      <div className="bg-navy-950 text-ivory-100 p-8 rounded-2xl border border-gold-500/30 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-gold-400 text-xs font-bold uppercase tracking-widest">Artist Management Studio</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Rebecca Esho Fine Art Studio</h1>
          <p className="text-xs text-neutral-300">Representation Status: Active Gallery Represented Artist</p>
        </div>

        <button
          onClick={() => setActivePage('add-artwork')}
          className="px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-bold text-xs uppercase tracking-widest transition shadow-lg flex items-center gap-2"
        >
          <PlusCircle className="w-4 h-4" /> Upload New Artwork
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-bold block">Total Portfolio</span>
          <span className="font-serif text-2xl font-bold text-navy-950 mt-1 block">{artistWorks.length} Masterworks</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-bold block">Pending Admin Review</span>
          <span className="font-serif text-2xl font-bold text-amber-600 mt-1 block">{pendingCount} Works</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-bold block">Published & Live</span>
          <span className="font-serif text-2xl font-bold text-emerald-700 mt-1 block">{approvedCount} Works</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-ivory-300 shadow-subtle">
          <span className="text-xs text-neutral-500 font-bold block">Net Artist Earnings</span>
          <span className="font-serif text-2xl font-bold text-gold-600 mt-1 block">₦1,280,000</span>
        </div>
      </div>

      {/* Studio Navigation Tabs */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none border-b border-ivory-300 gap-4 text-xs font-bold uppercase tracking-wider">
        {(() => {
          interface ArtistTabItem {
            id: ArtistTab;
            label: string;
            icon: React.ComponentType<{ className?: string }>;
          }

          const tabs: ArtistTabItem[] = [
            { id: 'overview', label: 'Portfolio', icon: Layers },
            { id: 'sales', label: 'Sales & Ledger', icon: DollarSign },
            { id: 'calculator', label: 'Commission Calculator', icon: Calculator },
            { id: 'payouts', label: 'Payouts', icon: CreditCard },
            { id: 'orders', label: 'Orders', icon: Package },
            { id: 'profile', label: 'Studio Profile', icon: User },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'settings', label: 'Settings', icon: Settings }
          ];

          return tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 px-3 border-b-2 whitespace-nowrap transition flex items-center gap-1.5 ${
                  activeTab === tab.id ? 'border-gold-500 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-950'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          });
        })()}
      </div>

      {/* TAB 1: PORTFOLIO */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-xl border border-ivory-300 shadow-subtle p-6 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-navy-950">Submitted Artwork Portfolio ({artistWorks.length})</h2>
            <button
              onClick={() => setActivePage('add-artwork')}
              className="text-xs text-gold-700 font-bold hover:underline"
            >
              + Submit New Work
            </button>
          </div>

          <div className="divide-y divide-ivory-200">
            {artistWorks.map(art => (
              <div key={art.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={getProductionImageUrl(art.imageUrl, art.title)}
                    alt={art.title}
                    onError={(e) => handleImageError(e, art.title)}
                    className="w-16 h-20 object-cover rounded border"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold text-navy-950">{art.title}</h3>
                    <p className="text-xs text-neutral-500">{art.category} • {art.type} • {formatOriginalPrice(art.price, art.currency)} {art.currency}</p>
                    <span className="text-[11px] text-neutral-400">Created: {art.year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 text-xs font-bold rounded flex items-center gap-1.5 ${
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

                  <button onClick={() => navigateToArtwork(art)} className="p-2 text-neutral-400 hover:text-navy-950">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: COMMISSION CALCULATOR */}
      {activeTab === 'calculator' && (
        <div className="bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-6 max-w-xl">
          <h2 className="font-serif text-xl font-bold text-navy-950">Interactive Artist Net Earnings Calculator</h2>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-navy-950 block mb-1">Enter Intended Listing Price:</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                  className="flex-1 p-3 bg-ivory-100 border border-ivory-300 rounded text-sm font-bold"
                />
                <select
                  value={calcCurrency}
                  onChange={(e) => setCalcCurrency(e.target.value as CurrencyCode)}
                  className="p-3 bg-ivory-200 border border-ivory-300 rounded font-bold"
                >
                  <option value="NGN">NGN (₦)</option>
                  <option value="USD">USD ($)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <div className="p-5 bg-navy-950 text-ivory-100 rounded-xl space-y-3">
              <div className="flex justify-between border-b border-navy-900 pb-2">
                <span className="text-neutral-400">Artwork Listing Price:</span>
                <span className="font-bold text-white">{formatOriginalPrice(calcPrice, calcCurrency)} {calcCurrency}</span>
              </div>
              <div className="flex justify-between border-b border-navy-900 pb-2">
                <span className="text-neutral-400">Gallery Commission ({commissionPct}%):</span>
                <span className="font-bold text-gold-400">-{formatOriginalPrice(calcPrice * (commissionPct / 100), calcCurrency)} {calcCurrency}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-emerald-400 pt-1">
                <span>Your Net Payout:</span>
                <span>{formatOriginalPrice(calcPrice * (1 - commissionPct / 100), calcCurrency)} {calcCurrency}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PAYOUTS */}
      {activeTab === 'payouts' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-xs">
          <h2 className="font-serif text-lg font-bold text-navy-950">Artist Bank Wire Payout History</h2>
          <div className="space-y-3">
            {payouts.map(p => (
              <div key={p.id} className="p-4 border border-ivory-300 rounded-lg flex justify-between items-center">
                <div>
                  <span className="font-bold text-navy-950 text-sm block">{p.period}</span>
                  <span className="text-neutral-500">{p.payoutMethod}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-emerald-700 text-sm block">+{formatOriginalPrice(p.amount, p.currency)} {p.currency}</span>
                  <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded inline-block mt-1">{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-xs">
          <h2 className="font-serif text-lg font-bold text-navy-950">Studio Information & Biography</h2>
          <p className="text-neutral-600">Update your public representation details and exhibition history.</p>
        </div>
      )}

    </div>
  );
};
