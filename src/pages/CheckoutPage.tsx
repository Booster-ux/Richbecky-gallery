import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { ShieldCheck, CreditCard, Landmark, Info, Lock, CheckCircle2 } from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, placeOrder, currentUser } = useGallery();

  const shippingFee = cartTotal > 3000 ? 0 : 150;
  const grandTotal = cartTotal + shippingFee;

  const [shippingInfo, setShippingInfo] = useState({
    fullName: currentUser.name || 'Lady Rebecca Sterling',
    email: currentUser.email || 'rebecca.sterling@artcollector.com',
    phone: currentUser.phone || '+44 20 7946 0912',
    address: '14 Mayfair Gardens, Grosvenor Square',
    city: 'London',
    country: 'United Kingdom',
    zipCode: 'W1K 6JP'
  });

  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Bank Transfer'>('Card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder(shippingInfo, paymentMethod);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-2xl font-semibold text-navy-900">Your cart is currently empty</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      <div className="border-b border-ivory-300 pb-4">
        <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Collector Checkout</span>
        <h1 className="font-serif text-3xl font-semibold text-navy-900 mt-1">Complete Artwork Acquisition</h1>
      </div>

      {/* Backend Integration Disclaimer Notice per Specification */}
      <div className="bg-amber-50 border-l-4 border-gold-500 p-4 rounded shadow-sm text-xs text-amber-900 flex items-start gap-3">
        <Info className="w-5 h-5 text-gold-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Frontend Demonstration Mode:</span> Real payment gateway processing (Stripe / Bank Wire API) and database synchronization will be connected during the backend integration phase.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Customer & Shipping Info + Payment Method */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Customer Information */}
          <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
            <h2 className="font-serif text-base font-semibold text-navy-900 border-b border-ivory-200 pb-2">
              1. Collector Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-neutral-700 mb-1 font-medium">Full Name</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-neutral-700 mb-1 font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-neutral-700 mb-1 font-medium">Telephone Number</label>
                <input
                  type="tel"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
            <h2 className="font-serif text-base font-semibold text-navy-900 border-b border-ivory-200 pb-2">
              2. Delivery Address (Insured Art Courier)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-neutral-700 mb-1 font-medium">Street Address</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-neutral-700 mb-1 font-medium">City</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-neutral-700 mb-1 font-medium">Country</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.country}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, country: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-neutral-700 mb-1 font-medium">Postal / Zip Code</label>
                <input
                  type="text"
                  required
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                  className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection UI */}
          <div className="bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-4">
            <h2 className="font-serif text-base font-semibold text-navy-900 border-b border-ivory-200 pb-2">
              3. Select Preferred Payment Method
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                onClick={() => setPaymentMethod('Card')}
                className={`p-4 rounded-lg border-2 cursor-pointer transition flex items-center gap-3 ${
                  paymentMethod === 'Card' ? 'border-gold-500 bg-gold-50/50' : 'border-ivory-300 hover:border-ivory-400'
                }`}
              >
                <CreditCard className="w-6 h-6 text-gold-600" />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Credit / Debit Card</h4>
                  <p className="text-[11px] text-neutral-500">Visa, Mastercard, AMEX</p>
                </div>
              </div>

              <div
                onClick={() => setPaymentMethod('Bank Transfer')}
                className={`p-4 rounded-lg border-2 cursor-pointer transition flex items-center gap-3 ${
                  paymentMethod === 'Bank Transfer' ? 'border-gold-500 bg-gold-50/50' : 'border-ivory-300 hover:border-ivory-400'
                }`}
              >
                <Landmark className="w-6 h-6 text-gold-600" />
                <div>
                  <h4 className="text-xs font-bold text-navy-900">Gallery Wire / Bank Transfer</h4>
                  <p className="text-[11px] text-neutral-500">Direct IBAN wire transfer</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-semibold text-xs uppercase tracking-widest transition shadow-gold-glow"
          >
            Confirm & Place Artwork Order (${grandTotal.toLocaleString()})
          </button>

        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-ivory-300 shadow-subtle space-y-6 h-fit">
          <h2 className="font-serif text-lg font-semibold text-navy-900 border-b border-ivory-200 pb-3">
            Acquisition Summary ({cart.length} Works)
          </h2>

          <div className="space-y-4 divide-y divide-ivory-200">
            {cart.map(({ artwork, quantity }) => (
              <div key={artwork.id} className="pt-3 first:pt-0 flex items-center gap-3 text-xs">
                <img src={artwork.imageUrl} alt="" className="w-12 h-14 object-cover rounded border" />
                <div className="flex-1">
                  <div className="font-semibold text-navy-900 line-clamp-1">{artwork.title}</div>
                  <div className="text-neutral-500">{artwork.artistName} • Qty: {quantity}</div>
                  <span className="text-[10px] text-gold-700 font-medium">{artwork.type}</span>
                </div>
                <div className="font-bold text-navy-900">
                  ${(artwork.price * quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-navy-900/10 pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Subtotal</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Insured Courier Delivery</span>
              <span>{shippingFee === 0 ? 'Complimentary' : `$${shippingFee}`}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-navy-950 pt-2 border-t border-ivory-200">
              <span>Total Payable</span>
              <span className="text-gold-600">${grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
