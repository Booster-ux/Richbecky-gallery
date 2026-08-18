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
  Package,
  LifeBuoy,
  Send
} from 'lucide-react';
import { getProductionImageUrl, handleImageError } from '../services/imageService';
import { CurrencyCode, TicketCategory, TicketPriority, Artwork, Payout, SupportTicket } from '../types';

export const ArtistDashboardPage: React.FC = () => {
  const {
    artworks,
    setActivePage,
    navigateToArtwork,
    formatOriginalPrice,
    showToast,
    payouts,
    currentUser,
    supportTickets,
    createSupportTicket
  } = useGallery();
  
  type ArtistTab =
    | 'overview'
    | 'artworks'
    | 'sales'
    | 'earnings'
    | 'calculator'
    | 'payouts'
    | 'orders'
    | 'support'
    | 'profile'
    | 'notifications'
    | 'settings';

  const [activeTab, setActiveTab] = useState<ArtistTab>('overview');
  const [calcPrice, setCalcPrice] = useState<number>(250000);
  const [calcCurrency, setCalcCurrency] = useState<CurrencyCode>('NGN');
  const [commissionPct] = useState<number>(15);

  // Artist Ticket Form State
  const [artistTicketCategory, setArtistTicketCategory] = useState<TicketCategory>('Artist Payout Query');
  const [artistTicketPriority, setArtistTicketPriority] = useState<TicketPriority>('Standard');
  const [artistTicketSubject, setArtistTicketSubject] = useState<string>('');
  const [artistTicketDesc, setArtistTicketDesc] = useState<string>('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  const artistWorks: Artwork[] = artworks;
  const pendingCount = artistWorks.filter((a: Artwork) => a.status === 'Pending Admin Approval').length;
  const approvedCount = artistWorks.filter((a: Artwork) => a.status === 'Approved').length;
  const rejectedCount = artistWorks.filter((a: Artwork) => a.status === 'Rejected').length;

  const artistTickets: SupportTicket[] = supportTickets.filter(
    (t: SupportTicket) => t.userRole === 'artist' || (currentUser && t.userId === currentUser.id)
  );

  const handleArtistTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!artistTicketSubject.trim() || !artistTicketDesc.trim()) {
      showToast('Please provide a subject and detailed description.', 'warning');
      return;
    }
    setIsSubmittingTicket(true);
    setTimeout(() => {
      createSupportTicket({
        userId: currentUser?.id,
        userRole: 'artist',
        userName: currentUser?.name || 'Represented Studio Artist',
        userEmail: currentUser?.email || 'artist@richbeckygallery.com',
        category: artistTicketCategory,
        priority: artistTicketPriority,
        subject: artistTicketSubject,
        description: artistTicketDesc
      });
      setArtistTicketSubject('');
      setArtistTicketDesc('');
      setIsSubmittingTicket(false);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Artist Studio Header */}
      <div className="bg-white text-navy-950 p-8 rounded-2xl border border-ivory-300 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Artist Management Studio</span>
          <h1 className="font-serif text-3xl font-bold text-navy-950 mt-1">Rebecca Esho Fine Art Studio</h1>
          <p className="text-xs text-neutral-500 font-medium">Representation Status: Active Gallery Represented Artist</p>
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
            { id: 'support', label: 'Artist Helpdesk', icon: LifeBuoy },
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

      {/* TAB: ARTIST HELPDESK */}
      {activeTab === 'support' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-6">
            <div className="border-b border-ivory-200 pb-3">
              <h2 className="font-serif text-lg font-bold text-navy-950">Artist Studio Support & Inquiry Desk</h2>
              <p className="text-xs text-neutral-500 font-light">
                Submit an official inquiry to the gallery director regarding commission payouts, curatorial feedback, or exhibition schedules.
              </p>
            </div>

            {/* Lodge New Ticket Form */}
            <form onSubmit={handleArtistTicketSubmit} className="bg-ivory-50 p-5 rounded-xl border border-ivory-300 space-y-4 text-xs">
              <div className="flex items-center gap-2 text-navy-950 font-bold">
                <LifeBuoy className="w-4 h-4 text-gold-600" />
                <span>Submit a Direct Studio Inquiry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-navy-900 block mb-1">Inquiry Nature *</label>
                  <select
                    value={artistTicketCategory}
                    onChange={e => setArtistTicketCategory(e.target.value as TicketCategory)}
                    className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl font-semibold text-navy-950"
                  >
                    <option value="Artist Payout Query">Artist Payout Query</option>
                    <option value="Artist Commission Clarification">Artist Commission Clarification</option>
                    <option value="Artwork Review Appeal">Artwork Review / Curatorial Feedback Appeal</option>
                    <option value="General Support">General Studio Support</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-navy-900 block mb-1">Priority Level *</label>
                  <select
                    value={artistTicketPriority}
                    onChange={e => setArtistTicketPriority(e.target.value as TicketPriority)}
                    className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl font-semibold text-navy-950"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Urgent">Urgent (Payout Settlement)</option>
                    <option value="Curatorial Escalation">Curatorial Director Escalation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-navy-900 block mb-1">Subject *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bank wire settlement inquiry for ISEMBAYE acquisition..."
                  value={artistTicketSubject}
                  onChange={e => setArtistTicketSubject(e.target.value)}
                  className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl"
                />
              </div>

              <div>
                <label className="font-bold text-navy-900 block mb-1">Detailed Inquiry *</label>
                <textarea
                  required
                  placeholder="Provide full details and any relevant artwork or order references..."
                  value={artistTicketDesc}
                  onChange={e => setArtistTicketDesc(e.target.value)}
                  className="w-full p-3 bg-white border border-ivory-300 rounded-xl h-24"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmittingTicket}
                  className="px-5 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-md disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingTicket ? 'Transmitting...' : 'Send Inquiry to Curatorial Director'}</span>
                </button>
              </div>
            </form>

            {/* Artist Ticket History */}
            <div className="space-y-4">
              <h3 className="font-serif text-sm font-bold text-navy-950">
                Your Studio Inquiry Records ({artistTickets.length})
              </h3>

              {artistTickets.length > 0 ? (
                <div className="space-y-3">
                  {artistTickets.map(t => (
                    <div key={t.id} className="p-4 border border-ivory-300 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between items-center border-b border-ivory-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-navy-950">{t.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                            t.status === 'Under Investigation' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {t.status}
                          </span>
                        </div>
                        <span className="text-neutral-400 text-[10px]">{new Date(t.createdAt).toLocaleDateString()}</span>
                      </div>
                      <span className="text-gold-700 font-bold uppercase text-[10px] block">{t.category}</span>
                      <h4 className="font-bold text-navy-950">{t.subject}</h4>
                      <p className="text-neutral-700 bg-ivory-100 p-2.5 rounded-lg">{t.description}</p>
                      {t.resolutionNotes && (
                        <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-950">
                          <strong>Curatorial Direct Response:</strong> {t.resolutionNotes}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-xs py-4 text-center">No open studio inquiries recorded.</p>
              )}
            </div>
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
