import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { User, Package, Heart, MapPin, LogOut, Award, Clock } from 'lucide-react';

export const CustomerAccountPage: React.FC = () => {
  const { currentUser, orders, wishlist, setActivePage, navigateToArtwork, setCurrentUserRole, showToast } = useGallery();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'addresses'>('profile');

  const handleLogout = () => {
    showToast('Logged out of demo account session.', 'info');
    setActivePage('home');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Collector Profile Header */}
      <div className="bg-navy-900 text-ivory-100 p-8 rounded-2xl border border-gold-500/20 shadow-gallery flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-gold-400"
          />
          <div>
            <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest">Collector Account</span>
            <h1 className="font-serif text-2xl font-bold text-white">{currentUser.name}</h1>
            <p className="text-xs text-neutral-300">{currentUser.email}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-navy-800 hover:bg-rose-900 text-ivory-200 border border-ivory-300/20 rounded text-xs font-medium transition flex items-center gap-2"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Tabs */}
        <aside className="lg:col-span-3 space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition ${
              activeTab === 'profile' ? 'bg-navy-900 text-gold-400 shadow' : 'bg-white text-navy-800 hover:bg-ivory-200'
            }`}
          >
            <User className="w-4 h-4" /> Collector Profile
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition ${
              activeTab === 'orders' ? 'bg-navy-900 text-gold-400 shadow' : 'bg-white text-navy-800 hover:bg-ivory-200'
            }`}
          >
            <Package className="w-4 h-4" /> Order History ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition ${
              activeTab === 'wishlist' ? 'bg-navy-900 text-gold-400 shadow' : 'bg-white text-navy-800 hover:bg-ivory-200'
            }`}
          >
            <Heart className="w-4 h-4" /> Saved Artworks ({wishlist.length})
          </button>

          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left px-4 py-3 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-3 transition ${
              activeTab === 'addresses' ? 'bg-navy-900 text-gold-400 shadow' : 'bg-white text-navy-800 hover:bg-ivory-200'
            }`}
          >
            <MapPin className="w-4 h-4" /> Saved Addresses
          </button>
        </aside>

        {/* Tab Content Display */}
        <main className="lg:col-span-9 bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle min-h-[400px]">
          
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-semibold text-navy-900 border-b border-ivory-200 pb-3">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-neutral-500 block">Full Name:</span>
                  <strong className="text-navy-900 text-sm font-medium">{currentUser.name}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">Email Address:</span>
                  <strong className="text-navy-900 text-sm font-medium">{currentUser.email}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">Phone:</span>
                  <strong className="text-navy-900 text-sm font-medium">{currentUser.phone}</strong>
                </div>
                <div>
                  <span className="text-neutral-500 block">Collector Status:</span>
                  <strong className="text-gold-700 text-sm font-medium">VIP Art Collector</strong>
                </div>
              </div>
            </div>
          )}

          {/* Orders History Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-semibold text-navy-900 border-b border-ivory-200 pb-3">
                Acquisition History
              </h2>

              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="border border-ivory-300 rounded-xl p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between text-xs border-b border-ivory-200 pb-2">
                      <div>
                        <span className="font-bold text-navy-900 text-sm">{order.id}</span>
                        <span className="text-neutral-400 ml-2 font-medium">{order.date}</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-semibold text-[11px]">
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2">
                      {order.items.map(({ artwork, quantity }) => (
                        <div key={artwork.id} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-3">
                            <img src={artwork.imageUrl} alt="" className="w-10 h-10 object-cover rounded" />
                            <div>
                              <span className="font-semibold text-navy-900 block">{artwork.title}</span>
                              <span className="text-neutral-500">{artwork.artistName} • Qty: {quantity}</span>
                            </div>
                          </div>
                          <span className="font-bold text-navy-900">${(artwork.price * quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-ivory-200 flex justify-between items-center text-xs">
                      <span className="text-neutral-500">Payment: {order.paymentMethod}</span>
                      <span className="font-bold text-navy-900">Total: ${order.total.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-semibold text-navy-900 border-b border-ivory-200 pb-3">
                Saved Favorites ({wishlist.length})
              </h2>

              {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {wishlist.map(({ artwork }) => (
                    <div key={artwork.id} className="border border-ivory-300 rounded-lg p-3 flex gap-3 items-center">
                      <img src={artwork.imageUrl} alt="" className="w-16 h-20 object-cover rounded" />
                      <div>
                        <h4 className="font-serif text-sm font-semibold text-navy-900">{artwork.title}</h4>
                        <p className="text-xs text-neutral-500">{artwork.artistName}</p>
                        <span className="text-xs font-bold text-navy-900 block mt-1">${artwork.price.toLocaleString()}</span>
                        <button
                          onClick={() => navigateToArtwork(artwork)}
                          className="text-[11px] text-gold-700 underline font-semibold mt-1"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-neutral-500">No saved artworks in wishlist.</p>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <h2 className="font-serif text-xl font-semibold text-navy-900 border-b border-ivory-200 pb-3">
                Saved Shipping Address
              </h2>
              <div className="border border-ivory-300 rounded-xl p-4 text-xs space-y-1 bg-ivory-100">
                <span className="font-bold text-navy-900 block text-sm">Primary Gallery Address</span>
                <p className="text-neutral-700">14 Mayfair Gardens, Grosvenor Square</p>
                <p className="text-neutral-700">London, W1K 6JP, United Kingdom</p>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
