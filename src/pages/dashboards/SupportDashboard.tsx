import React, { useState } from 'react';
import { useGallery } from '../../context/GalleryContext';
import {
  Headphones, ShoppingBag, MessageSquare, Users, PackageCheck,
  Search, CheckCircle2, Truck, RefreshCw, Send, Mail
} from 'lucide-react';
import { OrderFulfillmentStatus } from '../../types';

export const SupportDashboardPage: React.FC = () => {
  const {
    orders,
    enquiries,
    artistApplications,
    updateOrderStatus,
    updateEnquiryStatus,
    currentUser,
    logout,
    showToast,
    formatPrice,
    selectedCurrency
  } = useGallery();

  const [activeTab, setActiveTab] = useState<'orders' | 'enquiries' | 'applications'>('orders');
  const [orderFilter, setOrderFilter] = useState<'All' | OrderFulfillmentStatus>('All');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);
  const [replyNotes, setReplyNotes] = useState('');

  // Filtered orders
  let filteredOrders = orders;
  if (orderFilter !== 'All') {
    filteredOrders = filteredOrders.filter(o => o.status === orderFilter);
  }
  if (orderSearch.trim()) {
    const q = orderSearch.toLowerCase();
    filteredOrders = filteredOrders.filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.shippingInfo.fullName.toLowerCase().includes(q) ||
      o.shippingInfo.country.toLowerCase().includes(q)
    );
  }

  const handleResolveEnquiry = (enquiryId: string) => {
    updateEnquiryStatus(enquiryId, 'Resolved', replyNotes || 'Resolved by Support Staff');
    showToast('Enquiry marked as resolved.', 'success');
    setSelectedEnquiry(null);
    setReplyNotes('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 p-8 rounded-3xl text-white shadow-gallery flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-gold-500/20">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-widest">
            <Headphones className="w-3.5 h-3.5 text-blue-400" /> Administrative & Customer Support Portal
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ivory-100">
            Collector Assistance & Order Operations
          </h1>
          <p className="text-xs sm:text-sm text-ivory-300/80 max-w-2xl font-light">
            Welcome back, {currentUser?.name || 'Support Agent'}. Manage collector order fulfillment, advisory requests, and preliminary application verification.
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

      {/* Quick Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-700">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-navy-950">{orders.length}</p>
            <p className="text-xs text-neutral-500 font-light">Active Collector Orders</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-xl text-amber-700">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-navy-950">{enquiries.filter(e => e.status !== 'Resolved').length}</p>
            <p className="text-xs text-neutral-500 font-light">Open Advisory Enquiries</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-ivory-300 shadow-subtle flex items-center gap-4">
          <div className="p-3 bg-purple-50 rounded-xl text-purple-700">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-2xl font-serif font-bold text-navy-950">{artistApplications.length}</p>
            <p className="text-xs text-neutral-500 font-light">Application Records</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ivory-300 space-x-6 text-sm font-medium">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 border-b-2 transition ${activeTab === 'orders' ? 'border-navy-950 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'}`}
        >
          Order Fulfillment Board ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 border-b-2 transition ${activeTab === 'enquiries' ? 'border-navy-950 text-navy-950 font-bold' : 'border-transparent text-neutral-500 hover:text-navy-900'}`}
        >
          Collector Advisory Requests ({enquiries.length})
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2 text-xs font-bold uppercase">
              {(['All', 'Processing', 'Paid', 'Shipped', 'Delivered'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setOrderFilter(st)}
                  className={`px-3 py-1.5 rounded-xl transition ${orderFilter === st ? 'bg-navy-950 text-white' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'}`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="relative max-w-xs w-full">
              <input
                type="text"
                placeholder="Search order ID or collector..."
                value={orderSearch}
                onChange={e => setOrderSearch(e.target.value)}
                className="w-full bg-white border border-ivory-300 rounded-xl py-2 pl-9 pr-3 text-xs focus:ring-1 focus:ring-navy-950 outline-none"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-ivory-300 shadow-subtle overflow-hidden">
            {filteredOrders.length > 0 ? (
              <table className="w-full text-left text-xs">
                <thead className="bg-ivory-100 border-b border-ivory-300 text-navy-950 font-serif uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Delivery Country</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Update Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ivory-200 font-light text-neutral-700">
                  {filteredOrders.map(order => (
                    <tr key={order.id} className="hover:bg-ivory-50/50 transition">
                      <td className="p-4 font-mono font-bold text-navy-950">{order.id}</td>
                      <td className="p-4 font-medium text-navy-950">{order.shippingInfo.fullName}</td>
                      <td className="p-4">{order.shippingInfo.country}</td>
                      <td className="p-4 text-neutral-500">{order.date}</td>
                      <td className="p-4 font-bold text-navy-950">{formatPrice(order.total, order.displayCurrency)}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                          order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'Processing' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderFulfillmentStatus)}
                          className="bg-ivory-200 text-navy-950 font-bold px-2 py-1 rounded-lg text-xs border border-ivory-300"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Paid">Paid</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center text-xs text-neutral-500">
                No orders match the current filter.
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {enquiries.length > 0 ? (
            enquiries.map(enq => (
              <div key={enq.id} className="p-6 bg-white rounded-2xl border border-ivory-300 shadow-subtle flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-navy-950">{enq.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      enq.status === 'New' ? 'bg-amber-100 text-amber-800' :
                      enq.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {enq.status}
                    </span>
                    <span className="text-[11px] font-bold text-gold-700 uppercase tracking-wider">{enq.enquiryType}</span>
                  </div>
                  <h3 className="font-serif text-base font-bold text-navy-950">{enq.artworkTitle || 'General Gallery Inquiry'}</h3>
                  <p className="text-xs text-neutral-600 font-light">{enq.customerName} ({enq.customerEmail}) • {enq.date}</p>
                  <p className="text-xs text-neutral-700 bg-ivory-100 p-3 rounded-xl mt-2">{enq.message}</p>
                  {enq.replyNotes && (
                    <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                      <strong>Support Notes:</strong> {enq.replyNotes}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {enq.status !== 'Resolved' && (
                    <button
                      onClick={() => handleResolveEnquiry(enq.id)}
                      className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded-xl hover:bg-emerald-800 transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Mark Resolved
                    </button>
                  )}
                  <button
                    onClick={() => showToast(`Opening advisory channel for ${enq.customerEmail}`, 'info')}
                    className="px-4 py-2 border border-ivory-300 hover:bg-ivory-100 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Mail className="w-4 h-4" /> Email Collector
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-ivory-300 text-neutral-500 text-xs">
              No advisory enquiries in the support queue.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

