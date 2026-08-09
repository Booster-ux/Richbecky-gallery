import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { Clock, PlusCircle, ArrowLeft, Image as ImageIcon, Award, AlertCircle } from 'lucide-react';

export const AddArtworkPage: React.FC = () => {
  const { addNewArtwork, setActivePage, categories } = useGallery();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Abstract');
  const [medium, setMedium] = useState('Oil & Gold Leaf on Linen Canvas');
  const [dimensions, setDimensions] = useState('100 x 120 cm (39.4 x 47.2 in)');
  const [year, setYear] = useState(2024);
  const [type, setType] = useState<'Original' | 'Fine Art Print'>('Original');
  const [price, setPrice] = useState(3200);
  const [stock, setStock] = useState(1);
  const [imageUrl, setImageUrl] = useState('file:///C:/Users/USER/.gemini/antigravity-ide/brain/5b32ac2c-1f43-4c28-a05b-5c9dd91dbad7/artwork_1_blue_gold_1786281890336.png');
  const [description, setDescription] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addNewArtwork({
      title,
      artistId: 'artist-1',
      artistName: 'Elena Rostova',
      artistAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      type,
      category,
      medium,
      dimensions,
      year,
      price,
      stock: type === 'Original' ? 1 : stock,
      isSold: false,
      isFeatured,
      isNewArrival: true,
      imageUrl,
      additionalImages: [imageUrl],
      description,
      certificateIncluded: type === 'Original'
    });

    setActivePage('artist-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
        <div>
          <button
            onClick={() => setActivePage('artist-dashboard')}
            className="text-xs text-neutral-500 hover:text-navy-900 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Artist Dashboard
          </button>
          <h1 className="font-serif text-3xl font-bold text-navy-900">Upload New Artwork</h1>
        </div>

        {/* Clear Status Badge per Specification */}
        <div className="bg-amber-50 text-amber-900 border border-amber-300 px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-600" /> Default Status: Pending Admin Approval
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-6">
        
        <h2 className="font-serif text-lg font-semibold text-navy-900 border-b border-ivory-200 pb-3">
          1. Artwork Basic Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="sm:col-span-2">
            <label className="block text-neutral-700 font-medium mb-1">Artwork Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Symphony of Midnight Gold"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500 font-serif text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Artwork Type *</label>
            <div className="grid grid-cols-2 gap-2 bg-ivory-200 p-1 rounded">
              <button
                type="button"
                onClick={() => { setType('Original'); setStock(1); }}
                className={`py-2 text-xs rounded font-semibold transition ${
                  type === 'Original' ? 'bg-navy-900 text-gold-400 shadow-sm' : 'text-neutral-600'
                }`}
              >
                Original Artwork
              </button>

              <button
                type="button"
                onClick={() => setType('Fine Art Print')}
                className={`py-2 text-xs rounded font-semibold transition ${
                  type === 'Fine Art Print' ? 'bg-navy-900 text-gold-400 shadow-sm' : 'text-neutral-600'
                }`}
              >
                Fine Art Print
              </button>
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Curatorial Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            >
              {categories.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Medium & Technique *</label>
            <input
              type="text"
              required
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              placeholder="e.g. Oil, Acrylic & 24K Gold Leaf on Linen"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Dimensions (H x W x D) *</label>
            <input
              type="text"
              required
              value={dimensions}
              onChange={(e) => setDimensions(e.target.value)}
              placeholder="100 x 120 cm (39.4 x 47.2 in)"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Price (USD $) *</label>
            <input
              type="number"
              required
              min="100"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500 font-semibold"
            />
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">
              Available Quantity / Stock *
            </label>
            <input
              type="number"
              required
              disabled={type === 'Original'}
              min="1"
              value={type === 'Original' ? 1 : stock}
              onChange={(e) => setStock(Number(e.target.value))}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500 disabled:opacity-60"
            />
            {type === 'Original' && (
              <span className="text-[11px] text-gold-700 block mt-1">
                ✓ Original artwork quantity is locked to 1.
              </span>
            )}
          </div>
        </div>

        <h2 className="font-serif text-lg font-semibold text-navy-900 border-b border-ivory-200 pb-3 pt-4">
          2. Imagery & Curatorial Statement
        </h2>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-700 font-medium mb-1">High-Resolution Image URL *</label>
            <input
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          {/* Image Preview Box */}
          {imageUrl && (
            <div className="p-3 bg-ivory-100 rounded border border-ivory-300 flex items-center gap-4">
              <img src={imageUrl} alt="Preview" className="w-20 h-24 object-cover rounded shadow" />
              <div>
                <span className="font-semibold text-navy-900 block text-xs">Artwork Image Preview</span>
                <span className="text-[11px] text-neutral-500">Museum-grade photography recommended</span>
              </div>
            </div>
          )}

          <div>
            <label className="block text-neutral-700 font-medium mb-1">Full Description / Artist Notes *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the conceptual background, symbolism, and physical finish of this work..."
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-2.5 text-navy-900 focus:outline-none focus:border-gold-500"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer text-navy-900 pt-2 font-medium">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="accent-gold-500 rounded"
            />
            Request Homepage Exhibition Spotlight Feature
          </label>
        </div>

        <div className="pt-4 border-t border-ivory-300 flex items-center justify-between">
          <div className="text-xs text-neutral-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" /> Status after submit: <strong>Pending Admin Approval</strong>
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition shadow-md flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" /> Submit Artwork for Approval
          </button>
        </div>

      </form>

    </div>
  );
};
