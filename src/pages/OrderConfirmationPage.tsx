import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { CheckCircle2 } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { lastPlacedOrder, setActivePage } = useGallery();

  if (!lastPlacedOrder) {
    return (
      <div className="max-w-xl mx-auto py-20 text-center">
        <button onClick={() => setActivePage('catalogue')} className="px-6 py-2 bg-navy-900 text-white text-xs rounded">
          Return to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 animate-fade-in space-y-8">
      <div className="bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-gallery text-center space-y-6">
        <div className="w-16 h-16 bg-gold-100 text-gold-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Order Confirmed</span>
          <h1 className="font-serif text-3xl font-bold text-navy-900">Thank You For Your Acquisition</h1>
          <p className="text-xs text-neutral-500">Order Reference ID: <strong className="text-navy-900">{lastPlacedOrder.id}</strong></p>
        </div>

        <div className="bg-ivory-100 p-6 rounded-xl border border-ivory-300 text-left text-xs space-y-3">
          <h3 className="font-semibold text-navy-900 border-b border-ivory-300 pb-2 uppercase tracking-wider">
            Order & Courier Summary
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-neutral-500 block">Deliver To:</span>
              <strong className="text-navy-900 font-medium">{lastPlacedOrder.shippingInfo.fullName}</strong>
              <p className="text-neutral-500">{lastPlacedOrder.shippingInfo.address}, {lastPlacedOrder.shippingInfo.city}</p>
            </div>
            <div>
              <span className="text-neutral-500 block">Payment Method:</span>
              <strong className="text-navy-900 font-medium">{lastPlacedOrder.paymentMethod}</strong>
              <p className="text-neutral-500">Status: {lastPlacedOrder.status}</p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => setActivePage('account')}
            className="px-6 py-3 bg-navy-900 text-white rounded text-xs font-semibold uppercase tracking-wider hover:bg-gold-500 hover:text-navy-950 transition"
          >
            View Order in Collector Account
          </button>
          <button
            onClick={() => setActivePage('catalogue')}
            className="px-6 py-3 bg-ivory-200 text-navy-900 rounded text-xs font-semibold uppercase tracking-wider hover:bg-ivory-300 transition"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
