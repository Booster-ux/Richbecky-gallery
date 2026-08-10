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
  ShoppingBag
} from 'lucide-react';
import { Address } from '../types';
import { getProductionImageUrl, handleImageError } from '../services/imageService';

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
    customers
  } = useGallery();

  type CustomerTab = 'overview' | 'orders' | 'wishlist' | 'addresses' | 'profile' | 'enquiries' | 'settings';

  const [activeTab, setActiveTab] = useState<CustomerTab>('overview');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<any | null>(null);

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

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Collector Profile Header */}
      <div className="bg-navy-950 text-ivory-100 p-8 rounded-2xl border border-gold-500/30 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={userAvatar}
            alt={userName}
            className="w-20 h-20 rounded-full object-cover border-2 border-gold-400"
          />
          <div>
            <span className="text-gold-400 text-xs font-bold uppercase tracking-widest block">VIP Patron Collector</span>
            <h1 className="font-serif text-2xl font-bold text-white mt-0.5">{userName}</h1>
            <p className="text-xs text-neutral-300 font-light">{userEmail} • {userPhone}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2.5 bg-navy-900 hover:bg-rose-900 text-ivory-200 border border-ivory-300/20 rounded text-xs font-bold transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
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
                            <span className="font-bold text-navy-950">{formatPrice(artwork.price * quantity, artwork.currency)}</span>
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
                <p className="text-xs text-neutral-500">No saved artworks in wishlist.</p>
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

        </main>
      </div>

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
