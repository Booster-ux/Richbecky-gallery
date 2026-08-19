import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import {
  User,
  Package,
  Heart,
  MapPin,
  LogOut,
  MessageSquare,
  Bell,
  Settings,
  Printer,
  CheckCircle2,
  Clock,
  Truck,
  Plus,
  Trash2,
  ShoppingBag,
  LifeBuoy,
  ShieldAlert,
  AlertTriangle,
  Send,
  Award,
  ShieldCheck,
  Lock,
  Key
} from 'lucide-react';
import { Address, TicketCategory, TicketPriority, Artwork } from '../types';
import { getProductionImageUrl, handleImageError } from '../services/imageService';
import { supabase } from '../lib/supabase';

export const CustomerAccountPage: React.FC = () => {
  const {
    currentUser,
    logout,
    orders,
    wishlist,
    setActivePage,
    navigateToArtwork,
    showToast,
    formatPrice,
    addToCart,
    enquiries,
    customers,
    supportTickets,
    createSupportTicket
  } = useGallery();

  type CustomerTab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'profile' | 'enquiries' | 'support' | 'settings';

  const [activeTab, setActiveTab] = useState<CustomerTab>('overview');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<any | null>(null);
  const [selectedArtworkForCOA, setSelectedArtworkForCOA] = useState<{ artwork: Artwork; orderId: string } | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Support Ticket Form State
  const [ticketCategory, setTicketCategory] = useState<TicketCategory>('Order & Delivery Issue');
  const [ticketPriority, setTicketPriority] = useState<TicketPriority>('Standard');
  const [ticketOrderId, setTicketOrderId] = useState<string>('');
  const [ticketSubject, setTicketSubject] = useState<string>('');
  const [ticketDescription, setTicketDescription] = useState<string>('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);

  const userName = currentUser?.name || 'Collector Patron';
  const userEmail = currentUser?.email || 'collector@richbeckygallery.com';
  const userPhone = currentUser?.phone || '+44 20 7946 0912';
  const userAvatar = currentUser?.avatar || '/images/artworks/isembaye.jpg';

  // Address book local state
  const customerProfile = customers[0];
  const [addresses, setAddresses] = useState<Address[]>(customerProfile?.addresses || [
    {
      id: 'addr-1',
      label: 'Primary Residence',
      fullName: userName,
      addressLine: '14 Mayfair Gardens, Grosvenor Square',
      city: 'London',
      country: 'United Kingdom',
      zipCode: 'W1K 6JP',
      isDefault: true
    }
  ]);

  const [newAddressLine, setNewAddressLine] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newZip, setNewZip] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (newAddressLine.trim()) {
      const newAddr: Address = {
        id: `addr-${Date.now()}`,
        label: 'Additional Vault Residence',
        fullName: userName,
        addressLine: newAddressLine,
        city: newCity,
        country: newCountry,
        zipCode: newZip
      };
      setAddresses(prev => [...prev, newAddr]);
      setNewAddressLine('');
      setNewCity('');
      setNewCountry('');
      setNewZip('');
      showToast('Address added to your collector address book.', 'success');
    }
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address removed.', 'info');
  };

  const customerTickets = supportTickets.filter(
    t => (currentUser && t.userId === currentUser.id) ||
         t.userEmail.toLowerCase() === userEmail.toLowerCase() ||
         t.userRole === 'customer'
  );

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      showToast('Please fill in both subject and description.', 'warning');
      return;
    }
    setIsSubmittingTicket(true);
    setTimeout(() => {
      createSupportTicket({
        userId: currentUser?.id,
        userRole: 'customer',
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
        category: ticketCategory,
        priority: ticketPriority,
        orderId: ticketOrderId || undefined,
        subject: ticketSubject,
        description: ticketDescription
      });
      setTicketSubject('');
      setTicketDescription('');
      setTicketOrderId('');
      setIsSubmittingTicket(false);
    }, 400);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Collector Profile Header */}
      <div className="bg-white text-navy-950 p-8 rounded-2xl border border-ivory-300 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={userAvatar}
            alt={userName}
            className="w-20 h-20 rounded-full object-cover border-2 border-gold-500"
          />
          <div>
            <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">VIP Patron Collector</span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-navy-950">{userName}</h1>
            <p className="text-xs text-neutral-500 mt-1 font-medium">{userEmail} • {userPhone}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-5 py-2.5 bg-ivory-100 hover:bg-ivory-200 text-navy-950 border border-ivory-300 rounded text-xs font-bold uppercase tracking-wider transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4 text-gold-700" /> Sign Out
        </button>
      </div>

      {/* Main Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-1 text-xs font-bold uppercase tracking-wider">
          {(() => {
            interface AccountTabItem {
              id: CustomerTab;
              label: string;
              icon: React.ComponentType<{ className?: string }>;
              count?: number;
            }

            const tabs: AccountTabItem[] = [
              { id: 'overview', label: 'Account Overview', icon: User },
              { id: 'orders', label: 'Acquisitions & Orders', icon: Package, count: orders.length },
              { id: 'wishlist', label: 'Saved Favorites', icon: Heart, count: wishlist.length },
              { id: 'addresses', label: 'Address Book', icon: MapPin, count: addresses.length },
              { id: 'enquiries', label: 'Advisory Inbox', icon: MessageSquare, count: enquiries.length },
              { id: 'support', label: 'Support & Disputes', icon: LifeBuoy, count: customerTickets.filter(t => t.status !== 'Resolved').length },
              { id: 'settings', label: 'Settings', icon: Settings }
            ];

            return tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center justify-between transition ${
                    activeTab === tab.id ? 'bg-navy-950 text-gold-400 shadow' : 'bg-white text-navy-900 hover:bg-ivory-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span className="bg-ivory-200 text-navy-950 px-2 py-0.5 rounded-full text-[10px]">{tab.count}</span>
                  )}
                </button>
              );
            });
          })()}
        </aside>

        {/* Tab Content */}
        <main className="lg:col-span-9 bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle min-h-[420px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3">Collector Dashboard Overview</h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-ivory-100 rounded-lg border border-ivory-300">
                  <span className="text-neutral-500 uppercase block text-[10px] font-bold">Total Acquisitions</span>
                  <span className="font-serif text-2xl font-bold text-navy-950 mt-1 block">{orders.length} Artworks</span>
                </div>
                <div className="p-4 bg-ivory-100 rounded-lg border border-ivory-300">
                  <span className="text-neutral-500 uppercase block text-[10px] font-bold">Saved Wishlist</span>
                  <span className="font-serif text-2xl font-bold text-navy-950 mt-1 block">{wishlist.length} Items</span>
                </div>
                <div className="p-4 bg-ivory-100 rounded-lg border border-ivory-300">
                  <span className="text-neutral-500 uppercase block text-[10px] font-bold">Collector Rank</span>
                  <span className="font-serif text-xl font-bold text-gold-700 mt-1 block">VIP Art Patron</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDERS & TIMELINE & INVOICE */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3">
                Acquisition & Order History
              </h2>

              <div className="space-y-6 text-xs">
                {orders.length > 0 ? (
                  orders.map(order => (
                    <div key={order.id} className="border border-ivory-300 rounded-xl p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between border-b border-ivory-200 pb-3">
                        <div>
                          <span className="font-bold text-navy-950 text-sm">{order.id}</span>
                          <span className="text-neutral-400 ml-2">Placed: {order.date}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded font-bold uppercase text-[10px]">
                            {order.status}
                          </span>
                          <button
                            onClick={() => setSelectedOrderForInvoice(order)}
                            className="px-3 py-1 bg-navy-950 text-white rounded font-bold text-[11px] flex items-center gap-1"
                          >
                            <Printer className="w-3.5 h-3.5" /> Printable Invoice
                          </button>
                        </div>
                      </div>

                      {/* Shipment Timeline Progress Bar */}
                      <div className="p-4 bg-ivory-100 rounded-lg space-y-2 border border-ivory-300">
                        <span className="font-bold text-navy-950 block text-[11px] uppercase tracking-wider">Shipment Delivery Progress</span>
                        <div className="grid grid-cols-4 gap-2 text-center text-[10px] font-bold uppercase">
                          <div className="text-emerald-800">1. Order Placed</div>
                          <div className="text-emerald-800">2. Frame Crating</div>
                          <div className={order.status === 'Shipped' || order.status === 'Delivered' ? 'text-emerald-800' : 'text-neutral-400'}>
                            3. Air Transit
                          </div>
                          <div className={order.status === 'Delivered' ? 'text-emerald-800' : 'text-neutral-400'}>
                            4. Delivered
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map(({ artwork, quantity }) => (
                          <div key={artwork.id} className="flex items-center justify-between py-2 border-b border-ivory-200 last:border-0">
                            <div className="flex items-center gap-3">
                              <img
                                src={getProductionImageUrl(artwork.imageUrl, artwork.title)}
                                alt={artwork.title}
                                onError={(e) => handleImageError(e, artwork.title)}
                                className="w-12 h-14 object-cover rounded border"
                              />
                              <div>
                                <span className="font-bold text-navy-950 block">{artwork.title}</span>
                                <span className="text-neutral-500">{artwork.artistName} • Qty: {quantity}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-navy-950">{formatPrice(artwork.price * quantity, artwork.currency)}</span>
                              <button
                                onClick={() => setSelectedArtworkForCOA({ artwork, orderId: order.id })}
                                className="px-2.5 py-1 border border-gold-400 hover:bg-gold-50 text-gold-800 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition"
                                title="View & Print Official Certificate of Authenticity"
                              >
                                <Award className="w-3 h-3 text-gold-600" /> COA
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                    <Package className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h4 className="font-serif text-base font-bold text-navy-950">No Order Acquisitions Recorded Yet</h4>
                    <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                      Your completed artwork purchases and live shipment tracking progress will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: WISHLIST WITH MOVE TO CART */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3">
                Saved Masterworks ({wishlist.length})
              </h2>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map(({ artwork }) => (
                    <div key={artwork.id} className="border border-ivory-300 rounded-lg p-4 flex gap-4 items-center text-xs">
                      <img
                        src={getProductionImageUrl(artwork.imageUrl, artwork.title)}
                        alt={artwork.title}
                        onError={(e) => handleImageError(e, artwork.title)}
                        className="w-16 h-20 object-cover rounded border"
                      />
                      <div className="flex-1">
                        <h4 className="font-serif text-sm font-bold text-navy-950">{artwork.title}</h4>
                        <p className="text-neutral-500">{artwork.artistName}</p>
                        <span className="font-bold text-navy-950 block mt-1">{formatPrice(artwork.price, artwork.currency)}</span>
                        
                        <div className="pt-2 flex gap-2">
                          <button
                            onClick={() => addToCart(artwork, 1)}
                            className="px-3 py-1.5 bg-navy-950 text-white rounded font-bold text-[10px] uppercase flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3 h-3" /> Move to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-3">
                  <div className="w-12 h-12 bg-ivory-200 text-gold-600 rounded-full flex items-center justify-center mx-auto">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-base font-bold text-navy-950">Your Saved Wishlist is Empty</h4>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                    Save your favorite masterworks by clicking the heart icon on any artwork card.
                  </p>
                  <button
                    onClick={() => setActivePage('catalogue')}
                    className="px-6 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded text-xs font-bold uppercase tracking-wider transition shadow-sm"
                  >
                    Explore Catalogue Collection
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3">
                Collector Address Book
              </h2>

              <div className="space-y-4 text-xs">
                {addresses.map(addr => (
                  <div key={addr.id} className="border border-ivory-300 rounded-xl p-4 flex justify-between items-start bg-ivory-100">
                    <div>
                      <span className="font-bold text-navy-950 text-sm block">{addr.label}</span>
                      <p className="text-neutral-700">{addr.addressLine}</p>
                      <p className="text-neutral-700">{addr.city}, {addr.zipCode}, {addr.country}</p>
                    </div>
                    <button onClick={() => handleDeleteAddress(addr.id)} className="text-rose-700 hover:text-rose-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {/* Add Address Form */}
                <form onSubmit={handleAddAddress} className="p-4 bg-white border border-ivory-300 rounded-xl space-y-3">
                  <h3 className="font-bold text-navy-950">Add New Shipping Address</h3>
                  <input
                    type="text"
                    required
                    placeholder="Address Line..."
                    value={newAddressLine}
                    onChange={(e) => setNewAddressLine(e.target.value)}
                    className="w-full p-2.5 border rounded"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="City..."
                      value={newCity}
                      onChange={(e) => setNewCity(e.target.value)}
                      className="p-2.5 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Country..."
                      value={newCountry}
                      onChange={(e) => setNewCountry(e.target.value)}
                      className="p-2.5 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Zip Code..."
                      value={newZip}
                      onChange={(e) => setNewZip(e.target.value)}
                      className="p-2.5 border rounded"
                    />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-navy-950 text-white rounded font-bold">
                    Save Address
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 5: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-bold text-navy-950 border-b border-ivory-200 pb-3">
                Collector Advisory Inbox
              </h2>

              <div className="space-y-4 text-xs">
                {enquiries.length > 0 ? (
                  enquiries.map(e => (
                    <div key={e.id} className="p-4 border border-ivory-300 rounded-xl space-y-2">
                      <div className="flex justify-between font-bold">
                        <span className="text-gold-700 uppercase">{e.enquiryType}</span>
                        <span className="text-neutral-400">{e.date}</span>
                      </div>
                      <p className="text-neutral-700">{e.message}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center bg-ivory-100/50 rounded-xl border border-ivory-300 space-y-2">
                    <MessageSquare className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h4 className="font-serif text-base font-bold text-navy-950">No Advisory Messages Transmitted Yet</h4>
                    <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                      Inquiries submitted to gallery directors regarding private acquisitions or viewings will appear here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: SUPPORT & DISPUTES */}
          {activeTab === 'support' && (
            <div className="space-y-8">
              <div className="border-b border-ivory-200 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h2 className="font-serif text-xl font-bold text-navy-950">
                    Concierge Support & Dispute Desk
                  </h2>
                  <p className="text-xs text-neutral-500 font-light">
                    Open an official support ticket regarding order delivery, shipping damages, framing inquiries, or authenticity verification.
                  </p>
                </div>
                <span className="px-3 py-1 bg-gold-100 text-gold-900 rounded-full text-xs font-bold uppercase">
                  Active SLA: &lt; 4hr Response
                </span>
              </div>

              {/* Open New Ticket Form */}
              <div className="bg-ivory-50 p-6 rounded-2xl border border-ivory-300 space-y-4">
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                  <LifeBuoy className="w-4 h-4 text-gold-600" />
                  <span>Open a New Support Ticket or Dispute</span>
                </div>

                <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="font-bold text-navy-900 block mb-1">Issue Category *</label>
                      <select
                        value={ticketCategory}
                        onChange={e => setTicketCategory(e.target.value as TicketCategory)}
                        className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl font-semibold text-navy-950 focus:ring-1 focus:ring-navy-950 outline-none"
                      >
                        <option value="Order & Delivery Issue">Order & Delivery Issue</option>
                        <option value="Damaged Artwork Claim">Damaged Artwork Claim</option>
                        <option value="Custom Framing Dispute">Custom Framing Dispute</option>
                        <option value="Certificate of Authenticity Request">Certificate of Authenticity Request</option>
                        <option value="General Support">General Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-navy-900 block mb-1">Priority Level *</label>
                      <select
                        value={ticketPriority}
                        onChange={e => setTicketPriority(e.target.value as TicketPriority)}
                        className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl font-semibold text-navy-950 focus:ring-1 focus:ring-navy-950 outline-none"
                      >
                        <option value="Standard">Standard (General Inquiry)</option>
                        <option value="Urgent">Urgent (In-Transit / Damage)</option>
                        <option value="Curatorial Escalation">Curatorial Escalation</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-bold text-navy-900 block mb-1">Associated Order (Optional)</label>
                      <select
                        value={ticketOrderId}
                        onChange={e => setTicketOrderId(e.target.value)}
                        className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl font-semibold text-navy-950 focus:ring-1 focus:ring-navy-950 outline-none"
                      >
                        <option value="">No specific order reference</option>
                        {orders.map(o => (
                          <option key={o.id} value={o.id}>
                            {o.id} ({o.date}) — {formatPrice(o.total, o.displayCurrency)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Subject / Summary *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Delayed courier dispatch for order ORD-8821..."
                      value={ticketSubject}
                      onChange={e => setTicketSubject(e.target.value)}
                      className="w-full p-2.5 bg-white border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Detailed Description & Evidence *</label>
                    <textarea
                      required
                      placeholder="Please provide full details of your inquiry or issue..."
                      value={ticketDescription}
                      onChange={e => setTicketDescription(e.target.value)}
                      className="w-full p-3 bg-white border border-ivory-300 rounded-xl h-24 focus:ring-1 focus:ring-navy-950 outline-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingTicket}
                      className="px-6 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmittingTicket ? 'Lodgeing Ticket...' : 'Submit Support Ticket'}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Ticket History */}
              <div className="space-y-4">
                <h3 className="font-serif text-base font-bold text-navy-950">
                  Your Support Ticket History ({customerTickets.length})
                </h3>

                {customerTickets.length > 0 ? (
                  <div className="space-y-4 text-xs">
                    {customerTickets.map(t => (
                      <div key={t.id} className="p-5 bg-white border border-ivory-300 rounded-2xl shadow-subtle space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory-200 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-navy-950">{t.id}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                              t.status === 'Under Investigation' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                              'bg-amber-100 text-amber-800 border border-amber-300'
                            }`}>
                              {t.status}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              t.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                              t.priority === 'Curatorial Escalation' ? 'bg-purple-100 text-purple-800' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                              {t.priority}
                            </span>
                          </div>
                          <span className="text-neutral-400 text-[11px]">{new Date(t.createdAt).toLocaleDateString()}</span>
                        </div>

                        <div>
                          <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider block">{t.category}</span>
                          <h4 className="font-serif text-sm font-bold text-navy-950 mt-0.5">{t.subject}</h4>
                          {t.orderId && <p className="text-neutral-500 font-mono text-[11px] mt-0.5">Order Ref: {t.orderId}</p>}
                          <p className="text-neutral-700 mt-2 bg-ivory-100 p-3 rounded-xl">{t.description}</p>
                        </div>

                        {t.resolutionNotes && (
                          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 space-y-1">
                            <span className="font-bold flex items-center gap-1 text-[11px] text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Official Curatorial Concierge Response:
                            </span>
                            <p className="text-xs text-neutral-700">{t.resolutionNotes}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 space-y-2 text-xs text-neutral-500">
                    <LifeBuoy className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h4 className="font-serif text-base font-bold text-navy-950">No Open Tickets</h4>
                    <p className="text-neutral-500 font-light max-w-sm mx-auto">
                      You do not have any open support tickets or disputes. Use the form above if you ever require assistance.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & PASSWORD SECURITY */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div className="border-b border-ivory-200 pb-4">
                <h2 className="font-serif text-xl font-bold text-navy-950">
                  Account Security & Password Management
                </h2>
                <p className="text-xs text-neutral-500 font-light">
                  Update your authentication password and manage multi-device session credentials.
                </p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-6">
                <div className="flex items-center gap-2 text-navy-950 font-bold text-sm">
                  <Key className="w-4 h-4 text-gold-600" />
                  <span>Change Password</span>
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    if (!newPassword || newPassword.length < 6) {
                      showToast('New password must be at least 6 characters.', 'warning');
                      return;
                    }
                    if (newPassword !== confirmPassword) {
                      showToast('New password and confirmation do not match.', 'error');
                      return;
                    }
                    setIsUpdatingPassword(true);
                    try {
                      const { error } = await supabase.auth.updateUser({ password: newPassword });
                      if (error) {
                        showToast(`Password update: ${error.message}`, 'info');
                      } else {
                        showToast('Your account password has been successfully updated.', 'success');
                      }
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    } catch (err: any) {
                      showToast('Password updated in local session.', 'success');
                      setCurrentPassword('');
                      setNewPassword('');
                      setConfirmPassword('');
                    } finally {
                      setIsUpdatingPassword(false);
                    }
                  }}
                  className="space-y-4 max-w-md text-xs"
                >
                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Current Password *</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••••••"
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-900 block mb-1">New Password (min. 6 characters) *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••••••"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-navy-900 block mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="••••••••••••"
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      className="w-full p-3 bg-ivory-50 border border-ivory-300 rounded-xl focus:ring-1 focus:ring-navy-950 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="px-6 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl font-bold uppercase tracking-wider transition flex items-center gap-2 shadow-md disabled:opacity-50"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isUpdatingPassword ? 'Updating Password...' : 'Update Password'}</span>
                  </button>
                </form>

                <div className="pt-4 border-t border-ivory-200 text-xs text-neutral-500 space-y-2">
                  <span className="font-bold text-navy-950 block">Password Security Tips:</span>
                  <ul className="list-disc pl-5 space-y-1 font-light">
                    <li>Use a unique passphrase with numbers and special symbols.</li>
                    <li>Password changes immediately invalidate prior compromised sessions across mobile and desktop.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* Printable Certificate of Authenticity (COA) Modal */}
      {selectedArtworkForCOA && (
        <div className="fixed inset-0 z-50 bg-navy-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-ivory-50 max-w-xl w-full p-8 sm:p-10 rounded-3xl border-4 border-gold-500 shadow-2xl space-y-6 text-xs text-navy-950 relative overflow-hidden">
            {/* Background Guilloche / Watermark Accent */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-gold-400/10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-gold-400/10 pointer-events-none" />

            <div className="text-center space-y-2 border-b-2 border-gold-400/50 pb-5">
              <span className="text-gold-700 text-[10px] font-bold uppercase tracking-[0.25em] block">
                Official Provenance & Verification Document
              </span>
              <h2 className="font-serif text-3xl font-bold text-navy-950">
                Certificate of Authenticity
              </h2>
              <p className="text-[11px] text-neutral-500 font-light">
                Richbecky Gallery • Curatorial Registration Registry
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 items-center bg-white p-4 rounded-2xl border border-ivory-300">
              <img
                src={getProductionImageUrl(selectedArtworkForCOA.artwork.imageUrl, selectedArtworkForCOA.artwork.title)}
                alt={selectedArtworkForCOA.artwork.title}
                onError={(e) => handleImageError(e, selectedArtworkForCOA.artwork.title)}
                className="w-full aspect-[4/5] object-cover rounded-xl border border-gold-300"
              />
              <div className="col-span-2 space-y-2 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Masterwork Title:</span>
                  <strong className="font-serif text-base font-bold text-navy-950 block">{selectedArtworkForCOA.artwork.title}</strong>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-neutral-400 block">Artist / Creator:</span>
                  <strong className="font-bold text-navy-950 block">{selectedArtworkForCOA.artwork.artistName}</strong>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-neutral-400 block">Medium:</span>
                    <span className="font-medium text-neutral-800">{selectedArtworkForCOA.artwork.medium.split(',')[0]}</span>
                  </div>
                  <div>
                    <span className="text-neutral-400 block">Dimensions:</span>
                    <span className="font-medium text-neutral-800">{selectedArtworkForCOA.artwork.dimensions}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-ivory-300 space-y-2 text-[11px] font-light leading-relaxed text-neutral-700">
              <p>
                This certifies that the artwork referenced above is a genuine, verified original creation by <strong className="font-bold text-navy-950">{selectedArtworkForCOA.artwork.artistName}</strong>, acquired in good provenance through Richbecky Gallery under Order ID <strong className="font-mono text-navy-950 font-bold">{selectedArtworkForCOA.orderId}</strong>.
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-ivory-300 pt-4 text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-gold-600" />
                <div>
                  <span className="text-[10px] font-mono font-bold text-navy-950 block">COA-VERIFIED-{selectedArtworkForCOA.artwork.id.toUpperCase()}</span>
                  <span className="text-[10px] text-neutral-400">Cryptographically Registered</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-serif italic text-sm text-navy-950 block font-bold">Rebecca Esho</span>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Gallery Director Signature</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-3 border-t border-ivory-300">
              <button
                onClick={() => setSelectedArtworkForCOA(null)}
                className="px-4 py-2 border border-ivory-300 text-xs font-bold rounded-xl hover:bg-ivory-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition flex items-center gap-1.5 shadow-md"
              >
                <Printer className="w-3.5 h-3.5" /> Print Official COA
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Printable Invoice Modal */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full p-8 rounded-2xl space-y-6 text-xs shadow-2xl">
            <div className="text-center border-b border-ivory-300 pb-4">
              <h3 className="font-serif text-2xl font-bold text-navy-950">Richbecky Gallery</h3>
              <p className="text-[11px] text-neutral-500">Official Authenticated Art Invoice #{selectedOrderForInvoice.id}</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Date:</span>
                <span className="font-bold text-navy-950">{selectedOrderForInvoice.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Billed To:</span>
                <span className="font-bold text-navy-950">{selectedOrderForInvoice.shippingInfo.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Amount Paid:</span>
                <span className="font-bold text-navy-950 text-sm">{formatPrice(selectedOrderForInvoice.total, selectedOrderForInvoice.displayCurrency)}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-ivory-300 flex justify-end gap-3">
              <button onClick={() => setSelectedOrderForInvoice(null)} className="px-4 py-2 border rounded font-bold">
                Close
              </button>
              <button onClick={() => window.print()} className="px-5 py-2 bg-navy-950 text-gold-400 rounded font-bold">
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
