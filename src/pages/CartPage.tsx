import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Award } from 'lucide-react';

export const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, setActivePage, navigateToArtwork } = useGallery();

  const shippingFee = cartTotal > 3000 ? 0 : 150;
  const grandTotal = cartTotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4 animate-fade-in">
        <div className="w-16 h-16 bg-ivory-200 text-gold-600 rounded-full flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-navy-900">Your Gallery Cart is Empty</h2>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
          Explore our curated masterworks and select original art or fine art prints to add to your acquisition portfolio.
        </p>
        <button
          onClick={() => setActivePage('catalogue')}
          className="mt-4 px-8 py-3 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition shadow-md"
        >
          Browse Catalogue Collection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="border-b border-ivory-300 pb-4">
        <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Collector Selection</span>
        <h1 className="font-serif text-3xl font-semibold text-navy-900 mt-1">Your Shopping Cart</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map(({ artwork, quantity }) => (
            <div
              key={artwork.id}
              className="bg-white rounded-xl p-4 sm:p-6 border border-ivory-300 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Artwork Thumbnail & Info */}
              <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigateToArtwork(artwork)}>
                <img
                  src={artwork.imageUrl}
                  alt={artwork.title}
                  className="w-20 h-24 object-cover rounded border border-ivory-300 flex-shrink-0"
                />
                <div>
                  <span className={`inline-block px-2 py-0.5 text-[10px] font-semibold uppercase rounded mb-1 ${
                    artwork.type === 'Original' ? 'bg-navy-900 text-gold-400' : 'bg-ivory-200 text-navy-800'
                  }`}>
                    {artwork.type}
                  </span>
                  <h3 className="font-serif text-base font-semibold text-navy-900 hover:text-gold-600 transition">
                    {artwork.title}
                  </h3>
                  <p className="text-xs text-neutral-500">{artwork.artistName}</p>
                  {artwork.type === 'Original' && (
                    <span className="text-[10px] text-gold-700 font-medium block mt-0.5">
                      ✓ Certificate of Authenticity Included
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity Controls & Price */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-ivory-200">
                
                {/* Quantity Switcher */}
                <div className="flex items-center gap-2">
                  {artwork.type === 'Original' ? (
                    <span className="text-xs bg-ivory-200 px-3 py-1 rounded text-navy-900 font-bold border border-ivory-300">
                      Qty: 1 (Unique Original)
                    </span>
                  ) : (
                    <div className="flex items-center border border-ivory-400 rounded bg-white">
                      <button
                        onClick={() => updateCartQuantity(artwork.id, quantity - 1)}
                        className="px-2.5 py-1 text-xs font-bold text-neutral-600 hover:bg-ivory-200"
                      >
                        -
                      </button>
                      <span className="px-3 text-xs font-bold text-navy-900">{quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(artwork.id, quantity + 1)}
                        className="px-2.5 py-1 text-xs font-bold text-neutral-600 hover:bg-ivory-200"
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal & Delete */}
                <div className="text-right">
                  <div className="text-base font-bold text-navy-900">
                    ${(artwork.price * quantity).toLocaleString()}
                  </div>
                  <button
                    onClick={() => removeFromCart(artwork.id)}
                    className="text-xs text-neutral-400 hover:text-rose-600 transition flex items-center gap-1 mt-1 ml-auto"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Remove
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Right Column: Order Summary & Checkout */}
        <div className="lg:col-span-4 bg-white rounded-xl p-6 border border-ivory-300 shadow-subtle space-y-6 h-fit">
          <h2 className="font-serif text-lg font-semibold text-navy-900 border-b border-ivory-200 pb-3">
            Acquisition Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Artworks Subtotal</span>
              <span className="font-semibold text-navy-900">${cartTotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-neutral-600">
              <span>White-Glove Insured Transit</span>
              <span className="font-semibold text-navy-900">
                {shippingFee === 0 ? <span className="text-emerald-700">Complimentary</span> : `$${shippingFee}`}
              </span>
            </div>

            {shippingFee > 0 && (
              <p className="text-[11px] text-gold-700 bg-gold-50 p-2 rounded">
                Add ${(3000 - cartTotal).toLocaleString()} more to qualify for complimentary global transit.
              </p>
            )}

            <div className="border-t border-ivory-200 pt-3 flex justify-between text-sm font-bold text-navy-900">
              <span>Total Investment</span>
              <span className="text-lg text-gold-600">${grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => setActivePage('checkout')}
            className="w-full py-3.5 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-semibold text-xs uppercase tracking-widest transition shadow-gold-glow flex items-center justify-center gap-2"
          >
            Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
          </button>

          <div className="space-y-2 text-[11px] text-neutral-500 pt-2 border-t border-ivory-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span>Full gallery return protection within 14 days</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-gold-600 flex-shrink-0" />
              <span>Includes signed Certificates of Authenticity</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
