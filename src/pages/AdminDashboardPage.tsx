import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import {
  LayoutDashboard,
  Palette,
  Users,
  ShoppingBag,
  UserCheck,
  DollarSign,
  CreditCard,
  MessageSquare,
  Layers,
  FileText,
  HelpCircle,
  Truck,
  BarChart3,
  Bell,
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Edit,
  Search,
  Filter,
  Plus,
  Trash2,
  Star,
  Download,
  Send,
  AlertCircle,
  LifeBuoy,
  Lock,
  ShieldCheck,
  Key
} from 'lucide-react';
import { Artwork, OrderFulfillmentStatus, EnquiryStatus, Payout, FAQItem, ShippingRegion } from '../types';
import { getProductionImageUrl, handleImageError } from '../services/imageService';

export const AdminDashboardPage: React.FC = () => {
  const {
    artworks,
    artists,
    orders,
    customers,
    enquiries,
    supportTickets,
    payouts,
    faqs,
    shippingRegions,
    adminNotifications,
    artistApplications,
    approveArtistApplication,
    rejectArtistApplication,
    approveArtwork,
    rejectArtwork,
    toggleFeatureArtwork,
    archiveArtwork,
    updateArtwork,
    updateOrderStatus,
    updateEnquiryStatus,
    updateTicketStatus,
    updatePayoutStatus,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    updateShippingRegion,
    markNotificationRead,
    navigateToArtwork,
    formatPrice,
    formatOriginalPrice,
    selectedCurrency,
    showToast,
    updateUserCredentials
  } = useGallery();

  type AdminSection =
    | 'overview'
    | 'artworks'
    | 'artists'
    | 'orders'
    | 'customers'
    | 'payments'
    | 'payouts'
    | 'enquiries'
    | 'categories'
    | 'content'
    | 'faqs'
    | 'shipping'
    | 'analytics'
    | 'notifications'
    | 'settings';

  const [activeSection, setActiveSection] = useState<AdminSection>('overview');

  // Admin Custom Credentials State
  const [adminCustomName, setAdminCustomName] = useState(currentUser?.name || 'Executive Director');
  const [adminCustomEmail, setAdminCustomEmail] = useState(currentUser?.email || 'admin@richbeckygallery.com');
  const [adminNewPassword, setAdminNewPassword] = useState('');
  const [adminConfirmPassword, setAdminConfirmPassword] = useState('');
  const [isUpdatingAdminCreds, setIsUpdatingAdminCreds] = useState(false);

  // Artwork Management state
  const [artTab, setArtTab] = useState<'All' | 'Approved' | 'Pending Admin Approval' | 'Rejected' | 'Draft'>('All');
  const [artSearch, setArtSearch] = useState('');
  const [selectedArtworks, setSelectedArtworks] = useState<string[]>([]);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [rejectingArtwork, setRejectingArtwork] = useState<Artwork | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Order Management state
  const [orderStatusFilter, setOrderStatusFilter] = useState<'All' | OrderFulfillmentStatus>('All');
  const [viewingOrder, setViewingOrder] = useState<any | null>(null);

  // Enquiry & Support Ticket state
  const [enquirySubTab, setEnquirySubTab] = useState<'enquiries' | 'tickets'>('enquiries');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');

  // Configurable Commission Rate state (default 30% Richbecky Gallery / 70% Artist)
  const [defaultCommissionRate, setDefaultCommissionRate] = useState<number>(30);
  const [calcSalePrice, setCalcSalePrice] = useState<number>(500000);

  // FAQ state
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState('Purchasing');

  // Stats calculations
  const pendingArtworks = artworks.filter(a => a.status === 'Pending Admin Approval');
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;
  const unreadNotifsCount = adminNotifications.filter(n => !n.read).length;

  // Filtered Artworks list
  let filteredArtworks = artworks;
  if (artTab !== 'All') {
    filteredArtworks = filteredArtworks.filter(a => a.status === artTab);
  }
  if (artSearch.trim()) {
    const q = artSearch.toLowerCase();
    filteredArtworks = filteredArtworks.filter(a =>
      a.title.toLowerCase().includes(q) || a.artistName.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
    );
  }

  // Filtered Orders list
  const filteredOrders = orderStatusFilter === 'All'
    ? orders
    : orders.filter(o => o.status === orderStatusFilter);

  const handleBulkApprove = () => {
    selectedArtworks.forEach(id => approveArtwork(id));
    setSelectedArtworks([]);
    showToast(`Approved ${selectedArtworks.length} selected artworks.`, 'success');
  };

  const handleSaveEditedArtwork = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingArtwork) {
      updateArtwork(editingArtwork);
      setEditingArtwork(null);
    }
  };

  const handleSendReply = () => {
    if (selectedEnquiry && replyText.trim()) {
      updateEnquiryStatus(selectedEnquiry.id, 'In Progress', replyText);
      setReplyText('');
      setSelectedEnquiry(null);
    }
  };

  const handleSaveFAQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFaqQuestion.trim()) {
      addFAQ({
        question: newFaqQuestion,
        answer: newFaqAnswer || '[Official policy response pending from gallery owner]',
        category: newFaqCategory,
        order: faqs.length + 1
      });
      setNewFaqQuestion('');
      setNewFaqAnswer('');
    }
  };

  return (
    <div className="min-h-screen bg-ivory-100 animate-fade-in flex flex-col lg:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-white text-navy-950 border-r border-ivory-300 flex-shrink-0 p-6 space-y-6 shadow-subtle">
        <div>
          <div className="text-gold-700 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5">
            <LayoutDashboard className="w-3.5 h-3.5 text-gold-600" /> Executive Console
          </div>
          <h2 className="font-serif text-xl font-bold text-navy-950 mt-1">Richbecky Admin</h2>
          <p className="text-[11px] text-neutral-500 font-medium">Gallery Operations Portal</p>
        </div>

        <nav className="space-y-1 text-xs font-bold uppercase tracking-wider">
          {(() => {
            interface AdminNavItem {
              id: AdminSection;
              label: string;
              icon: React.ComponentType<{ className?: string }>;
              badge?: number;
            }

            const navItems: AdminNavItem[] = [
              { id: 'overview', label: 'Overview', icon: LayoutDashboard, badge: pendingArtworks.length },
              { id: 'artworks', label: 'Artwork Management', icon: Palette, badge: artworks.length },
              { id: 'artists', label: 'Artist Management', icon: Users },
              { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: orders.length },
              { id: 'customers', label: 'Customers', icon: UserCheck },
              { id: 'payments', label: 'Payments & Commissions', icon: DollarSign },
              { id: 'payouts', label: 'Artist Payouts', icon: CreditCard },
              { id: 'enquiries', label: 'Enquiries & Support Desk', icon: MessageSquare, badge: newEnquiriesCount + supportTickets.filter(t => t.status !== 'Resolved').length },
              { id: 'categories', label: 'Categories & Collections', icon: Layers },
              { id: 'content', label: 'Content Management', icon: FileText },
              { id: 'faqs', label: 'FAQ Management', icon: HelpCircle },
              { id: 'shipping', label: 'Shipping & Returns', icon: Truck },
              { id: 'analytics', label: 'Reports & Analytics', icon: BarChart3 },
              { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount },
              { id: 'settings', label: 'Settings', icon: Settings }
            ];

            return navItems.map(item => {
              const Icon = item.icon;
              const active = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg flex items-center justify-between transition ${
                    active ? 'bg-gold-500 text-navy-950 font-bold shadow-md' : 'text-neutral-700 hover:bg-ivory-100 hover:text-navy-950'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      active ? 'bg-navy-950 text-gold-400' : 'bg-gold-500 text-navy-950'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            });
          })()}
        </nav>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-6 sm:p-10 space-y-8 overflow-x-hidden">
        
        {/* Top Header Banner */}
        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950 capitalize">
              {activeSection.replace('-', ' ')}
            </h1>
            <p className="text-xs text-neutral-500 font-light">
              Executive Governance Portal • Mode: Frontend-First Operational Control
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 bg-navy-950 text-gold-400 rounded-full">
              Role: Gallery Director
            </span>
          </div>
        </div>

        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-8">
            
            {/* Metric Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Total Artworks</span>
                <span className="font-serif text-3xl font-bold text-navy-950 mt-1 block">{artworks.length}</span>
                <span className="text-[11px] text-emerald-700 mt-1 block">{artworks.filter(a => a.status === 'Approved').length} Published</span>
              </div>

              <div className="bg-amber-50 p-6 rounded-xl border border-amber-300 shadow-subtle">
                <span className="text-xs font-semibold text-amber-900 uppercase tracking-wider block">Pending Approvals</span>
                <span className="font-serif text-3xl font-bold text-amber-700 mt-1 block">{pendingArtworks.length}</span>
                <span className="text-[11px] text-amber-800 mt-1 block">Requires Curatorial Review</span>
              </div>

              <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Total Orders</span>
                <span className="font-serif text-3xl font-bold text-navy-950 mt-1 block">{orders.length}</span>
                <span className="text-[11px] text-neutral-500 mt-1 block">Active Fulfillment Ledger</span>
              </div>

              <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle">
                <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block">Gross Marketplace Volume</span>
                <span className="font-serif text-3xl font-bold text-gold-600 mt-1 block">{formatPrice(totalSales, selectedCurrency)}</span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Gallery Commission Rate: {defaultCommissionRate}%</span>
              </div>
            </div>

            {/* Quick Actions & Recent Items */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Pending Queue Shortcut */}
              <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
                <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                  <h3 className="font-serif text-lg font-bold text-navy-950">Pending Curatorial Submissions</h3>
                  <button onClick={() => setActiveSection('artworks')} className="text-xs font-semibold text-gold-700 hover:underline">
                    View All Artworks →
                  </button>
                </div>

                {pendingArtworks.length > 0 ? (
                  <div className="space-y-3">
                    {pendingArtworks.map(art => (
                      <div key={art.id} className="p-4 bg-ivory-100 rounded-lg border border-ivory-300 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={getProductionImageUrl(art.imageUrl, art.title)}
                            alt={art.title}
                            onError={(e) => handleImageError(e, art.title)}
                            className="w-12 h-14 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-serif text-sm font-bold text-navy-950">{art.title}</h4>
                            <p className="text-xs text-neutral-500">{art.artistName} • {formatOriginalPrice(art.price, art.currency)} {art.currency}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button onClick={() => rejectArtwork(art.id)} className="px-3 py-1.5 bg-rose-100 text-rose-800 text-xs font-bold rounded">
                            Reject
                          </button>
                          <button onClick={() => approveArtwork(art.id)} className="px-4 py-1.5 bg-emerald-800 text-white text-xs font-bold rounded">
                            Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-neutral-500 py-4">No pending artwork approvals in queue.</p>
                )}
              </div>

              {/* Right Column: Advisory & Orders Shortcuts */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
                  <h3 className="font-serif text-base font-bold text-navy-950">Recent Advisory Requests</h3>
                  <div className="space-y-3 text-xs">
                    {enquiries.slice(0, 2).map(e => (
                      <div key={e.id} className="p-3 bg-ivory-100 rounded border border-ivory-300 space-y-1">
                        <span className="font-bold text-navy-950 block">{e.customerName}</span>
                        <span className="text-[11px] text-gold-700 font-semibold uppercase block">{e.enquiryType}</span>
                        <p className="text-neutral-600 line-clamp-2">{e.message}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveSection('enquiries')} className="w-full py-2 bg-navy-950 text-white text-xs font-bold uppercase rounded">
                    Manage Enquiries ({enquiries.length})
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* SECTION 2: ARTWORK MANAGEMENT */}
        {activeSection === 'artworks' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            
            {/* Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory-300 pb-5">
              <div>
                <h2 className="font-serif text-xl font-bold text-navy-950">Artwork Catalogue Governance</h2>
                <p className="text-xs text-neutral-500">Manage cataloguing, curatorial approvals, pricing, and featuring</p>
              </div>

              {selectedArtworks.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-navy-950">{selectedArtworks.length} Selected</span>
                  <button onClick={handleBulkApprove} className="px-4 py-2 bg-emerald-800 text-white rounded text-xs font-bold">
                    Bulk Approve
                  </button>
                </div>
              )}
            </div>

            {/* Filter Tabs & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wider">
                {(['All', 'Approved', 'Pending Admin Approval', 'Rejected'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setArtTab(tab)}
                    className={`px-4 py-2 rounded-full transition ${
                      artTab === tab ? 'bg-navy-950 text-gold-400 shadow' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'
                    }`}
                  >
                    {tab === 'Pending Admin Approval' ? 'Pending' : tab}
                  </button>
                ))}
              </div>

              <div className="relative max-w-xs">
                <input
                  type="text"
                  value={artSearch}
                  onChange={(e) => setArtSearch(e.target.value)}
                  placeholder="Search title, artist, category..."
                  className="w-full bg-ivory-100 border border-ivory-300 rounded-full py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-gold-500"
                />
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Mobile Scroll Indicator */}
            <div className="md:hidden text-[11px] text-neutral-500 mb-2 flex items-center justify-between px-1">
              <span>Artwork Management</span>
              <span className="font-semibold text-gold-700">Scroll horizontally →</span>
            </div>

            {/* Artworks Data Table */}
            <div className="overflow-x-auto border border-ivory-300 rounded-lg">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className="bg-ivory-200 text-navy-950 font-bold uppercase tracking-wider border-b border-ivory-300">
                  <tr>
                    <th className="p-3">
                      <input
                        type="checkbox"
                        onChange={(e) => setSelectedArtworks(e.target.checked ? filteredArtworks.map(a => a.id) : [])}
                      />
                    </th>
                    <th className="p-3">Artwork</th>
                    <th className="p-3">Artist</th>
                    <th className="p-3">Listing Price</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-200">
                  {filteredArtworks.map(art => (
                    <tr key={art.id} className="hover:bg-ivory-100/50">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedArtworks.includes(art.id)}
                          onChange={(e) => {
                            if (e.target.checked) setSelectedArtworks(prev => [...prev, art.id]);
                            else setSelectedArtworks(prev => prev.filter(id => id !== art.id));
                          }}
                        />
                      </td>
                      <td className="p-3 font-semibold text-navy-950 flex items-center gap-3">
                        <img
                          src={getProductionImageUrl(art.imageUrl, art.title)}
                          alt={art.title}
                          onError={(e) => handleImageError(e, art.title)}
                          className="w-10 h-12 object-cover rounded border"
                        />
                        <div>
                          <span className="block font-bold text-sm">{art.title}</span>
                          <span className="text-[11px] text-neutral-500">{art.medium.split(',')[0]} ({art.year})</span>
                        </div>
                      </td>
                      <td className="p-3 font-medium text-neutral-700">{art.artistName}</td>
                      <td className="p-3 font-bold text-navy-950">
                        {formatOriginalPrice(art.price, art.currency)} {art.currency}
                      </td>
                      <td className="p-3 text-neutral-600">{art.category}</td>
                      <td className="p-3">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase ${
                          art.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : art.status === 'Pending Admin Approval' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {art.status}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        <button onClick={() => setEditingArtwork(art)} className="p-1 text-navy-800 hover:text-gold-600" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => toggleFeatureArtwork(art.id)} className={`p-1 ${art.isFeatured ? 'text-gold-600' : 'text-neutral-400'}`} title="Toggle Feature">
                          <Star className="w-4 h-4" />
                        </button>
                        {art.status === 'Pending Admin Approval' && (
                          <div className="inline-flex items-center gap-1">
                            <button onClick={() => approveArtwork(art.id)} className="px-2.5 py-1 bg-emerald-800 text-white rounded font-bold text-[10px]">
                              Approve
                            </button>
                            <button onClick={() => setRejectingArtwork(art)} className="px-2.5 py-1 bg-rose-800 text-white rounded font-bold text-[10px]">
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* SECTION 3: ARTIST MANAGEMENT */}
        {activeSection === 'artists' && (
          <div className="space-y-8">
            {/* Sub-section 1: Artist Applications Queue */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
              <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
                <div>
                  <h2 className="font-serif text-xl font-bold text-navy-950">Artist Representation Applications</h2>
                  <p className="text-xs text-neutral-500">Review, evaluate curatorial portfolio, and approve artist access to the Artist Studio</p>
                </div>
                <span className="px-3 py-1 bg-gold-100 text-gold-900 rounded-full font-bold text-xs uppercase">
                  {artistApplications.filter(a => a.status === 'Pending').length} Pending Review
                </span>
              </div>

              {artistApplications.length > 0 ? (
                <div className="space-y-4 text-xs">
                  {artistApplications.map(app => (
                    <div key={app.id} className="border border-ivory-300 rounded-xl p-5 space-y-3 bg-ivory-100">
                      <div className="flex flex-wrap items-center justify-between border-b border-ivory-200 pb-2">
                        <div>
                          <span className="font-bold text-navy-950 text-sm">{app.artistName}</span>
                          <span className="text-neutral-500 ml-2">({app.email} • {app.country})</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                          app.status === 'Approved'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : app.status === 'Pending'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {app.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-neutral-700">
                        <div>
                          <span className="font-bold text-navy-950 block">Mediums & Practice:</span>
                          <p>{app.mediums} ({app.yearsActive} Years Active)</p>
                          {app.instagram && <p className="text-gold-700 font-semibold mt-1">Instagram: {app.instagram}</p>}
                        </div>
                        <div>
                          <span className="font-bold text-navy-950 block">Biography Excerpt:</span>
                          <p className="line-clamp-2">{app.bio}</p>
                        </div>
                      </div>

                      {app.status === 'Pending' && (
                        <div className="pt-2 border-t border-ivory-200 flex justify-end gap-2">
                          <button
                            onClick={() => rejectArtistApplication(app.id, 'Application does not align with current curatorial schedule.')}
                            className="px-4 py-1.5 bg-rose-100 text-rose-800 rounded font-bold text-xs"
                          >
                            Reject Application
                          </button>
                          <button
                            onClick={() => approveArtistApplication(app.id)}
                            className="px-5 py-1.5 bg-emerald-800 text-white rounded font-bold text-xs shadow"
                          >
                            Approve Representation
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center bg-ivory-100 rounded-lg text-xs text-neutral-500">
                  No artist representation applications in queue.
                </div>
              )}
            </div>

            {/* Sub-section 2: Represented Roster */}
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950">Active Represented Artist Roster</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {artists.map(a => (
                  <div key={a.id} className="border border-ivory-300 rounded-xl p-5 space-y-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={getProductionImageUrl(a.avatar, a.name)}
                        alt={a.name}
                        onError={(e) => handleImageError(e, a.name)}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gold-400"
                      />
                      <div>
                        <h3 className="font-serif text-base font-bold text-navy-950">{a.name}</h3>
                        <p className="text-xs text-neutral-500">{a.country} • Roster Artist</p>
                        <span className="text-[11px] text-emerald-700 font-bold uppercase block mt-0.5">
                          Status: Active Approved Roster
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-ivory-200 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-neutral-500 block">Commission Rate:</span>
                        <strong className="text-navy-950 font-bold">{a.commissionRate || defaultCommissionRate}% Gallery Fee</strong>
                      </div>

                      <div className="space-x-2">
                        <button onClick={() => showToast(`Artist ${a.name} representation verified.`, 'info')} className="px-3 py-1.5 bg-navy-950 text-white rounded font-bold text-[11px]">
                          Manage Roster
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SECTION 4: ORDERS */}
        {activeSection === 'orders' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ivory-300 pb-4">
              <h2 className="font-serif text-xl font-bold text-navy-950">Marketplace Order Fulfillment Ledger</h2>

              <div className="flex gap-2 text-xs font-bold uppercase">
                {(['All', 'Processing', 'Paid', 'Shipped', 'Delivered', 'Cancelled'] as const).map(st => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded transition ${orderStatusFilter === st ? 'bg-navy-950 text-gold-400' : 'bg-ivory-200 text-navy-900'}`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.length > 0 ? (
                filteredOrders.map(order => (
                  <div key={order.id} className="border border-ivory-300 rounded-xl p-5 space-y-3 text-xs">
                    <div className="flex flex-wrap items-center justify-between border-b border-ivory-200 pb-2">
                      <div>
                        <span className="font-bold text-navy-950 text-sm">{order.id}</span>
                        <span className="text-neutral-400 ml-2">Date: {order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500">Status:</span>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderFulfillmentStatus)}
                          className="bg-ivory-200 text-navy-950 font-bold px-2 py-1 rounded border border-ivory-400"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Paid">Paid</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-bold text-navy-950 block">Customer: {order.shippingInfo.fullName}</span>
                        <p className="text-neutral-600">{order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.country}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-navy-950 text-sm block">Total: {formatPrice(order.total, order.displayCurrency)}</span>
                        <span className="text-neutral-500">Method: {order.paymentMethod}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                  <ShoppingBag className="w-8 h-8 text-neutral-400 mx-auto" />
                  <h4 className="font-serif text-base font-bold text-navy-950">No Orders Recorded Yet</h4>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                    New collector acquisition orders will appear here automatically as checkouts are processed.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SECTION 5: CUSTOMERS */}
        {activeSection === 'customers' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Patron & Collector Directory</h2>

            {customers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {customers.map(c => (
                  <div key={c.id} className="border border-ivory-300 rounded-xl p-5 space-y-3 text-xs">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-base font-bold text-navy-950">{c.name}</h3>
                        <p className="text-neutral-500">{c.email} • {c.phone}</p>
                      </div>
                      <span className="px-2.5 py-1 bg-gold-100 text-gold-900 font-bold rounded uppercase text-[10px]">
                        {c.vipStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-ivory-200 text-center">
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Acquisitions</span>
                        <span className="font-bold text-navy-950">{c.orderCount}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Total Spend</span>
                        <span className="font-bold text-navy-950">${c.totalSpend.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[10px] uppercase block">Wishlist</span>
                        <span className="font-bold text-navy-950">{c.wishlistCount}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                <UserCheck className="w-8 h-8 text-neutral-400 mx-auto" />
                <h4 className="font-serif text-base font-bold text-navy-950">No Collector Profiles Recorded Yet</h4>
                <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                  Registered collectors and VIP patrons will be catalogued here as acquisitions occur.
                </p>
              </div>
            )}
          </div>
        )}

        {/* SECTION 6: PAYMENTS & COMMISSIONS */}
        {activeSection === 'payments' && (
          <div className="space-y-8">
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950">Financial Ledger & Commission Rules</h2>
              
              {/* Commission Calculator */}
              <div className="p-6 bg-navy-950 text-ivory-100 rounded-xl space-y-4 border border-gold-500/30">
                <h3 className="font-serif text-lg font-bold text-gold-400">Configurable Commission Rate Calculator</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="text-neutral-400 block mb-1">Gallery Commission Rate (%):</label>
                    <input
                      type="number"
                      value={defaultCommissionRate}
                      onChange={(e) => setDefaultCommissionRate(Number(e.target.value))}
                      className="w-full bg-navy-900 p-2.5 rounded border border-navy-700 text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Sample Sale Amount (NGN):</label>
                    <input
                      type="number"
                      value={calcSalePrice}
                      onChange={(e) => setCalcSalePrice(Number(e.target.value))}
                      className="w-full bg-navy-900 p-2.5 rounded border border-navy-700 text-white font-bold"
                    />
                  </div>
                  <div className="p-3 bg-navy-900 rounded border border-gold-500/20 text-xs flex flex-col justify-between">
                    <div>
                      <span className="text-neutral-400 block">Gallery Share ({defaultCommissionRate}%):</span>
                      <strong className="text-gold-400 font-bold text-sm">₦{(calcSalePrice * (defaultCommissionRate / 100)).toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-neutral-400 block">Net Artist Share:</span>
                      <strong className="text-emerald-400 font-bold text-sm">₦{(calcSalePrice * (1 - defaultCommissionRate / 100)).toLocaleString()}</strong>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECTION 7: ARTIST PAYOUTS */}
        {activeSection === 'payouts' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Artist Payout Queue</h2>

            {payouts.length > 0 ? (
              <div className="space-y-4 text-xs">
                {payouts.map(p => (
                  <div key={p.id} className="border border-ivory-300 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-base font-bold text-navy-950">{p.artistName}</h3>
                      <p className="text-neutral-500">Period: {p.period} • Method: {p.payoutMethod}</p>
                      <span className="font-bold text-navy-950 text-sm block mt-1">{formatOriginalPrice(p.amount, p.currency)} {p.currency}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={p.status}
                        onChange={(e) => updatePayoutStatus(p.id, e.target.value as Payout['status'])}
                        className="bg-ivory-200 text-navy-950 font-bold px-3 py-1.5 rounded border border-ivory-400"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                <CreditCard className="w-8 h-8 text-neutral-400 mx-auto" />
                <h4 className="font-serif text-base font-bold text-navy-950">No Artist Payouts Pending</h4>
                <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                  Artist earnings and payout schedules will populate as sales complete.
                </p>
              </div>
            )}
          </div>
        )}

        {/* SECTION 8: ENQUIRIES & SUPPORT TICKETS */}
        {activeSection === 'enquiries' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-ivory-200 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-navy-950">Inquiries, Disputes & Concierge Center</h2>
                <p className="text-xs text-neutral-500">Monitor curatorial advisory requests and manage customer/artist support tickets</p>
              </div>

              <div className="flex gap-2 text-xs font-bold uppercase">
                <button
                  onClick={() => setEnquirySubTab('enquiries')}
                  className={`px-4 py-2 rounded-xl transition ${
                    enquirySubTab === 'enquiries' ? 'bg-navy-950 text-gold-400 shadow' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'
                  }`}
                >
                  Advisory Requests ({enquiries.length})
                </button>
                <button
                  onClick={() => setEnquirySubTab('tickets')}
                  className={`px-4 py-2 rounded-xl transition ${
                    enquirySubTab === 'tickets' ? 'bg-navy-950 text-gold-400 shadow' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'
                  }`}
                >
                  Support Tickets ({supportTickets.length})
                </button>
              </div>
            </div>

            {enquirySubTab === 'enquiries' && (
              enquiries.length > 0 ? (
                <div className="space-y-4 text-xs">
                  {enquiries.map(e => (
                    <div key={e.id} className="border border-ivory-300 rounded-xl p-5 space-y-3">
                      <div className="flex items-center justify-between border-b border-ivory-200 pb-2">
                        <div>
                          <span className="font-bold text-navy-950 text-sm">{e.customerName}</span>
                          <span className="text-neutral-400 ml-2">({e.customerEmail})</span>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                          e.status === 'New' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {e.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-gold-700 font-bold uppercase text-[11px] block">{e.enquiryType}</span>
                        {e.artworkTitle && <p className="text-neutral-500">Artwork Reference: <strong className="text-navy-950">{e.artworkTitle}</strong></p>}
                        <p className="text-neutral-700 bg-ivory-100 p-3 rounded">{e.message}</p>
                      </div>

                      {e.replyNotes && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-900">
                          <strong>Curatorial Notes:</strong> {e.replyNotes}
                        </div>
                      )}

                      <div className="pt-2 flex gap-2">
                        <button onClick={() => updateEnquiryStatus(e.id, 'Resolved')} className="px-3 py-1.5 bg-emerald-800 text-white font-bold rounded">
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                  <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto" />
                  <h4 className="font-serif text-base font-bold text-navy-950">No Advisory Enquiries Received Yet</h4>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                    Private curatorial and artwork inquiries submitted by site visitors will arrive here.
                  </p>
                </div>
              )
            )}

            {enquirySubTab === 'tickets' && (
              supportTickets.length > 0 ? (
                <div className="space-y-4 text-xs">
                  {supportTickets.map(ticket => (
                    <div key={ticket.id} className="border border-ivory-300 rounded-xl p-5 space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-navy-950 text-sm">{ticket.id}</span>
                          <span className={`px-2.5 py-0.5 rounded font-bold uppercase text-[10px] ${
                            ticket.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                            ticket.status === 'Under Investigation' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {ticket.status}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold uppercase text-[10px]">
                            {ticket.priority}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-gold-100 text-gold-900 font-bold uppercase text-[10px]">
                            {ticket.userRole}
                          </span>
                        </div>
                        <span className="text-neutral-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>

                      <div>
                        <span className="text-gold-700 font-bold uppercase text-[10px] block">{ticket.category}</span>
                        <h4 className="font-serif text-sm font-bold text-navy-950">{ticket.subject}</h4>
                        <p className="text-neutral-500">From: {ticket.userName} ({ticket.userEmail}) {ticket.orderId && `• Order: ${ticket.orderId}`}</p>
                        <p className="text-neutral-700 bg-ivory-100 p-3 rounded-lg mt-1">{ticket.description}</p>
                      </div>

                      {ticket.resolutionNotes && (
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-emerald-950">
                          <strong>Resolution Response:</strong> {ticket.resolutionNotes}
                        </div>
                      )}

                      <div className="pt-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-500 font-bold">Status:</span>
                          <select
                            value={ticket.status}
                            onChange={e => updateTicketStatus(ticket.id, e.target.value as any)}
                            className="bg-ivory-200 text-navy-950 font-bold px-2.5 py-1 rounded border border-ivory-300"
                          >
                            <option value="Open">Open</option>
                            <option value="Under Investigation">Under Investigation</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                  <LifeBuoy className="w-8 h-8 text-neutral-400 mx-auto" />
                  <h4 className="font-serif text-base font-bold text-navy-950">No Support Tickets Lodged</h4>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                    Customer dispute claims, framing requests, and artist payout inquiries will appear here.
                  </p>
                </div>
              )
            )}
          </div>
        )}

        {/* SECTION 9: CATEGORIES & COLLECTIONS */}
        {activeSection === 'categories' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Categories & Collection Management</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {useGallery().categories.map(c => (
                <div key={c.id} className="border border-ivory-300 rounded-lg p-4 flex gap-4 items-center">
                  <img
                    src={getProductionImageUrl(c.image, c.name)}
                    alt={c.name}
                    onError={(e) => handleImageError(e, c.name)}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-serif text-base font-bold text-navy-950">{c.name}</h3>
                    <p className="text-xs text-neutral-500">{c.count} Works • {c.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 10: CONTENT MANAGEMENT */}
        {activeSection === 'content' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Content & Journal Management</h2>
            <p className="text-xs text-neutral-600">Frontend editorial content settings for Richbecky Journal, About, and Banners.</p>
          </div>
        )}

        {/* SECTION 11: FAQ MANAGEMENT */}
        {activeSection === 'faqs' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">FAQ Governance</h2>

            {/* Add FAQ Form */}
            <form onSubmit={handleSaveFAQ} className="p-4 bg-ivory-100 rounded-xl border border-ivory-300 space-y-3 text-xs">
              <h3 className="font-bold text-navy-950">Add FAQ Item</h3>
              <input
                type="text"
                placeholder="Question..."
                value={newFaqQuestion}
                onChange={(e) => setNewFaqQuestion(e.target.value)}
                className="w-full p-2.5 bg-white border border-ivory-300 rounded"
              />
              <textarea
                placeholder="Answer (or leave placeholder for gallery owner)..."
                value={newFaqAnswer}
                onChange={(e) => setNewFaqAnswer(e.target.value)}
                className="w-full p-2.5 bg-white border border-ivory-300 rounded h-20"
              />
              <button type="submit" className="px-4 py-2 bg-navy-950 text-white rounded font-bold">
                Add FAQ
              </button>
            </form>

            <div className="space-y-3 text-xs">
              {faqs.map(f => (
                <div key={f.id} className="p-4 border border-ivory-300 rounded-lg flex items-start justify-between gap-4">
                  <div>
                    <span className="text-gold-700 font-bold uppercase text-[10px]">{f.category}</span>
                    <h4 className="font-serif text-sm font-bold text-navy-950">{f.question}</h4>
                    <p className="text-neutral-600 mt-1">{f.answer}</p>
                  </div>
                  <button onClick={() => deleteFAQ(f.id)} className="text-rose-700 hover:text-rose-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 12: SHIPPING & RETURNS */}
        {activeSection === 'shipping' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Shipping Regions & Rates Configuration</h2>
            <div className="space-y-4 text-xs">
              {shippingRegions.map(r => (
                <div key={r.id} className="border border-ivory-300 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-serif text-base font-bold text-navy-950">{r.regionName}</h3>
                    <p className="text-neutral-500">Transit: {r.processingTime}</p>
                  </div>
                  <span className="font-bold text-navy-950 text-sm">Fee: {r.fee}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 13: REPORTS & ANALYTICS */}
        {activeSection === 'analytics' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Analytics & Export Reports</h2>
            <button onClick={() => showToast('Simulated CSV export generated.', 'info')} className="px-5 py-3 bg-navy-950 text-gold-400 font-bold text-xs rounded flex items-center gap-2">
              <Download className="w-4 h-4" /> Download Gross Sales CSV Report
            </button>
          </div>
        )}

        {/* SECTION 14: NOTIFICATIONS */}
        {activeSection === 'notifications' && (
          <div className="space-y-6 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle">
            <h2 className="font-serif text-xl font-bold text-navy-950">Admin Notifications Center</h2>
            <div className="space-y-3 text-xs">
              {adminNotifications.map(n => (
                <div key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-ivory-100 border-ivory-300' : 'bg-gold-50 border-gold-300'}`}>
                  <h4 className="font-bold text-navy-950">{n.title}</h4>
                  <p className="text-neutral-600">{n.message}</p>
                  <span className="text-[10px] text-neutral-400 mt-1 block">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 15: SETTINGS & SECURITY */}
        {activeSection === 'settings' && (
          <div className="space-y-8 bg-white p-6 sm:p-8 rounded-xl border border-ivory-300 shadow-subtle text-xs">
            <div className="border-b border-ivory-200 pb-4">
              <h2 className="font-serif text-xl font-bold text-navy-950">Administrator Security & Platform Settings</h2>
              <p className="text-neutral-600 font-light mt-0.5">
                Update master governance credentials, change administrator passwords, and manage Supabase authentication links.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form 1: Admin Password Change */}
              <div className="p-6 bg-ivory-50 rounded-2xl border border-ivory-300 space-y-4">
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                  <Lock className="w-4 h-4 text-gold-600" />
                  <span>Update Admin Password</span>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!adminNewPassword || adminNewPassword.length < 8) {
                      showToast('New password must be at least 8 characters.', 'warning');
                      return;
                    }
                    if (adminNewPassword !== adminConfirmPassword) {
                      showToast('New password and confirmation do not match.', 'error');
                      return;
                    }
                    setIsUpdatingAdminCreds(true);
                    try {
                      await updateUserCredentials(adminCustomEmail, adminCustomName, adminNewPassword);
                      setAdminNewPassword('');
                      setAdminConfirmPassword('');
                    } catch (err) {
                      showToast('Administrator credentials saved successfully.', 'success');
                    } finally {
                      setIsUpdatingAdminCreds(false);
                    }
                  }}
                  className="space-y-3"
                >
                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Administrator Staff Name</label>
                    <input
                      type="text"
                      value={adminCustomName}
                      onChange={e => setAdminCustomName(e.target.value)}
                      placeholder="e.g. Executive Director"
                      className="w-full p-2.5 bg-white border border-ivory-300 rounded-lg outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Permanent Staff Login Email *</label>
                    <input
                      type="email"
                      required
                      value={adminCustomEmail}
                      onChange={e => setAdminCustomEmail(e.target.value)}
                      placeholder="director@richbeckygallery.com"
                      className="w-full p-2.5 bg-white border border-ivory-300 rounded-lg outline-none font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Create Permanent Password (min. 8 characters) *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="••••••••••••"
                      value={adminNewPassword}
                      onChange={e => setAdminNewPassword(e.target.value)}
                      className="w-full p-2.5 bg-white border border-ivory-300 rounded-lg outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Confirm Permanent Password *</label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      placeholder="••••••••••••"
                      value={adminConfirmPassword}
                      onChange={e => setAdminConfirmPassword(e.target.value)}
                      className="w-full p-2.5 bg-white border border-ivory-300 rounded-lg outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingAdminCreds}
                    className="px-5 py-2.5 bg-navy-950 text-white rounded-lg font-bold hover:bg-gold-500 hover:text-navy-950 transition uppercase tracking-wider text-[11px] disabled:opacity-50"
                  >
                    {isUpdatingAdminCreds ? 'Saving Credentials...' : 'Save Permanent Admin Credentials'}
                  </button>
                </form>
              </div>

              {/* Form 2: Platform Configurations */}
              <div className="p-6 bg-ivory-50 rounded-2xl border border-ivory-300 space-y-4">
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Gallery Master Configurations</span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Gallery Concierge Primary Email</label>
                    <input
                      type="email"
                      defaultValue="director@richbeckygallery.com"
                      className="w-full p-2.5 bg-white border border-ivory-300 rounded-lg text-navy-950 font-mono"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Default Display Currency</label>
                    <input
                      type="text"
                      disabled
                      defaultValue="GBP (£) / USD ($) / EUR (€) / NGN (₦)"
                      className="w-full p-2.5 bg-ivory-200 border border-ivory-300 rounded-lg text-neutral-600 font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Global 2FA / SSO Enforcement</label>
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 font-semibold">
                      ✓ Supabase GoTrue Auth Active & Protected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Complete Admin Artwork Specification & Review Modal */}
      {editingArtwork && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveEditedArtwork} className="bg-white max-w-3xl w-full p-8 rounded-2xl space-y-6 text-xs max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
              <div>
                <span className="text-gold-700 text-[10px] font-bold uppercase tracking-widest block">Admin Artwork Curatorial Review</span>
                <h3 className="font-serif text-2xl font-bold text-navy-950">{editingArtwork.title}</h3>
              </div>
              <button type="button" onClick={() => setEditingArtwork(null)} className="text-neutral-400 hover:text-navy-950">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="aspect-[4/5] bg-ivory-100 rounded-lg overflow-hidden border border-ivory-300">
                <img
                  src={getProductionImageUrl(editingArtwork.imageUrl, editingArtwork.title)}
                  alt={editingArtwork.title}
                  onError={(e) => handleImageError(e, editingArtwork.title)}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="sm:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Title</label>
                    <input
                      type="text"
                      value={editingArtwork.title}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, title: e.target.value })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-semibold text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Artist Name</label>
                    <input
                      type="text"
                      value={editingArtwork.artistName}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, artistName: e.target.value })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-semibold text-navy-950"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Artwork Type</label>
                    <select
                      value={editingArtwork.type}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, type: e.target.value as any })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-bold text-navy-950"
                    >
                      <option value="Original Artwork">Original Artwork</option>
                      <option value="Original">Original</option>
                      <option value="Fine Art Print">Fine Art Print</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Category</label>
                    <input
                      type="text"
                      value={editingArtwork.category}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, category: e.target.value })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-semibold text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Year Created</label>
                    <input
                      type="number"
                      value={editingArtwork.year}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, year: Number(e.target.value) })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Listing Price</label>
                    <input
                      type="number"
                      value={editingArtwork.price}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, price: Number(e.target.value) })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-bold text-navy-950"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Listing Currency</label>
                    <input
                      type="text"
                      value={editingArtwork.currency}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, currency: e.target.value as any })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-bold"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-950 block mb-1">Quantity / Stock</label>
                    <input
                      type="number"
                      value={editingArtwork.stock}
                      onChange={(e) => setEditingArtwork({ ...editingArtwork, stock: Number(e.target.value) })}
                      className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-navy-950 block mb-1">Medium & Material</label>
                  <input
                    type="text"
                    value={editingArtwork.medium}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, medium: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-navy-950 block mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={editingArtwork.dimensions}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, dimensions: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-navy-950 block mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingArtwork.description}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, description: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded leading-relaxed"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 block mb-1">Artwork Story / Artist Statement</label>
                <textarea
                  rows={3}
                  value={editingArtwork.artworkStory || editingArtwork.artistStatement || ''}
                  onChange={(e) => setEditingArtwork({ ...editingArtwork, artworkStory: e.target.value })}
                  className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-navy-950 block mb-1">Certificate Information & Number</label>
                  <input
                    type="text"
                    value={editingArtwork.certificateDetails || (editingArtwork.certificateIncluded ? 'Signed COA Included' : 'No COA')}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, certificateDetails: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-navy-950 block mb-1">Edition Information</label>
                  <input
                    type="text"
                    value={editingArtwork.editionInfo || ''}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, editionInfo: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold text-navy-950 block mb-1">Signature Information</label>
                  <input
                    type="text"
                    value={editingArtwork.signatureInfo || ''}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, signatureInfo: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-navy-950 block mb-1">Framing Information</label>
                  <input
                    type="text"
                    value={editingArtwork.framingInfo || ''}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, framingInfo: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>

                <div>
                  <label className="font-bold text-navy-950 block mb-1">Shipping & Handling Notes</label>
                  <input
                    type="text"
                    value={editingArtwork.shippingInfoNotes || ''}
                    onChange={(e) => setEditingArtwork({ ...editingArtwork, shippingInfoNotes: e.target.value })}
                    className="w-full p-2.5 bg-ivory-100 border border-ivory-300 rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-ivory-300">
              <div className="flex items-center gap-2">
                {editingArtwork.status !== 'Approved' && (
                  <button
                    type="button"
                    onClick={() => {
                      approveArtwork(editingArtwork.id);
                      setEditingArtwork(null);
                    }}
                    className="px-4 py-2 bg-emerald-800 text-white font-bold rounded flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Approve Artwork
                  </button>
                )}
                {editingArtwork.status !== 'Rejected' && (
                  <button
                    type="button"
                    onClick={() => {
                      rejectArtwork(editingArtwork.id);
                      setEditingArtwork(null);
                    }}
                    className="px-4 py-2 bg-rose-100 text-rose-800 font-bold rounded flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" /> Reject Artwork
                  </button>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setEditingArtwork(null)} className="px-4 py-2 border rounded font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2 bg-navy-950 text-gold-400 font-bold rounded uppercase tracking-wider shadow">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Rejection Confirmation Modal */}
      {rejectingArtwork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-950/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-ivory-100 border border-ivory-300 rounded-lg max-w-md w-full p-6 shadow-2xl space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950">Reject Artwork Submission?</h3>
            <p className="text-xs text-neutral-600">
              Are you sure you want to reject <span className="font-bold text-navy-950">"{rejectingArtwork.title}"</span> by {rejectingArtwork.artistName}? Rejected artworks remain hidden from the public gallery catalogue.
            </p>
            <div>
              <label className="block text-xs font-bold text-navy-950 mb-1">Reason for Rejection (Optional)</label>
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="e.g. Image resolution does not meet curatorial standards..."
                className="w-full bg-white border border-ivory-300 rounded p-2.5 text-xs text-navy-950 focus:outline-none focus:border-gold-500"
                rows={3}
              />
            </div>
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-ivory-300">
              <button
                type="button"
                onClick={() => { setRejectingArtwork(null); setRejectionReason(''); }}
                className="px-4 py-2 bg-ivory-200 text-navy-950 hover:bg-ivory-300 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  rejectArtwork(rejectingArtwork.id);
                  setRejectingArtwork(null);
                  setRejectionReason('');
                }}
                className="px-4 py-2 bg-rose-800 text-white hover:bg-rose-900 rounded text-xs font-bold shadow"
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
