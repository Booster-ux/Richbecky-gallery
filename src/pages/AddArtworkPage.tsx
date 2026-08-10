import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { CurrencyCode, ArtworkType } from '../types';
import { Upload, Award, ShieldCheck, ArrowRight, Eye, CheckCircle2, X } from 'lucide-react';

export const AddArtworkPage: React.FC = () => {
  const { addNewArtwork, setActivePage, selectedCurrency, formatOriginalPrice } = useGallery();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<ArtworkType>('Original');
  const [category, setCategory] = useState('Figurative');
  const [medium, setMedium] = useState('Oil on Canvas');
  const [materials, setMaterials] = useState('');
  const [dimensions, setDimensions] = useState('30 x 36 inches');
  const [year, setYear] = useState(2026);
  const [price, setPrice] = useState<number>(250000);
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const [stock, setStock] = useState(1);
  const [imageUrl, setImageUrl] = useState('/images/artworks/isembaye.jpg');
  const [additionalImagesText, setAdditionalImagesText] = useState('');
  const [description, setDescription] = useState('');
  const [artistStatement, setArtistStatement] = useState('');
  const [artworkStory, setArtworkStory] = useState('');
  const [editionInfo, setEditionInfo] = useState('1-of-1 Original Masterpiece');
  const [signatureInfo, setSignatureInfo] = useState('Signed & Dated front bottom right');
  const [shippingInfoNotes, setShippingInfoNotes] = useState('Crated in custom wooden box with insured global air transit');
  const [certificateIncluded, setCertificateIncluded] = useState(true);

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handleOpenPreview = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPreviewModal(true);
  };

  const handleFinalSubmit = () => {
    const additionalImages = additionalImagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    addNewArtwork({
      title,
      artistId: 'artist-1',
      artistName: 'Rebecca Esho',
      artistAvatar: '/images/artworks/isembaye.jpg',
      type,
      category,
      medium,
      materials,
      dimensions,
      year,
      price,
      currency,
      stock: type === 'Original' ? 1 : stock,
      isSold: false,
      isFeatured: false,
      isNewArrival: true,
      imageUrl: imageUrl || '/images/artworks/isembaye.jpg',
      additionalImages: additionalImages.length > 0 ? additionalImages : [imageUrl],
      description,
      artistStatement,
      artworkStory,
      editionInfo,
      signatureInfo,
      shippingInfoNotes,
      certificateIncluded
    });

    setShowPreviewModal(false);
    setActivePage('artist-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      <div className="border-b border-ivory-300 pb-6">
        <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Studio Submission Workflow</span>
        <h1 className="font-serif text-3xl font-bold text-navy-950 mt-1">Submit New Masterwork for Exhibition</h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Submissions undergo curatorial review by gallery directors within 24-48 hours before being published.
        </p>
      </div>

      <form onSubmit={handleOpenPreview} className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-6 text-xs">
        
        {/* Basic Details */}
        <div className="space-y-4">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">1. Primary Artwork Specifications</h3>
          
          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artwork Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ISEMBAYE"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artwork Type</label>
              <select
                value={type}
                onChange={(e) => {
                  const t = e.target.value as ArtworkType;
                  setType(t);
                  if (t === 'Original') setStock(1);
                }}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-semibold text-navy-950"
              >
                <option value="Original">Original Artwork (1-of-1)</option>
                <option value="Fine Art Print">Fine Art Print Series</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-semibold text-navy-950"
              >
                <option value="Figurative">Figurative</option>
                <option value="Abstract">Abstract</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Landscape">Landscape</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Year of Creation</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">2. Artist Listing Price & Stock</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Listing Price *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-sm font-bold text-navy-950"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Original Listing Currency *</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-bold text-navy-950"
              >
                <option value="NGN">NGN - Nigerian Naira (₦)</option>
                <option value="USD">USD - US Dollar ($)</option>
                <option value="GBP">GBP - British Pound (£)</option>
                <option value="EUR">EUR - Euro (€)</option>
                <option value="CAD">CAD - Canadian Dollar ($)</option>
                <option value="AUD">AUD - Australian Dollar ($)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Available Quantity</label>
              <input
                type="number"
                disabled={type === 'Original'}
                value={type === 'Original' ? 1 : stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-bold disabled:opacity-60"
              />
            </div>
          </div>
        </div>

        {/* Medium & Technical Specs */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">3. Physical & Technical Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Primary Medium *</label>
              <input
                type="text"
                required
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="e.g. Oil, Traditional Beading & Fabric Collage on Canvas"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Dimensions *</label>
              <input
                type="text"
                required
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g. 30 x 36 inches (76.2 x 91.4 cm)"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Detailed Materials & Pigments</label>
            <input
              type="text"
              value={materials}
              onChange={(e) => setMaterials(e.target.value)}
              placeholder="e.g. Heavy Duty Linen Canvas, Windsor Artist-Grade Oil Pigments, Vintage Kijipa Fabric"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950"
            />
          </div>
        </div>

        {/* Story & Statements */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">4. Curatorial Narrative & Story</h3>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Story Behind the Artwork *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain the background, meaning, and inspiration..."
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artist Statement</label>
              <input
                type="text"
                value={artistStatement}
                onChange={(e) => setArtistStatement(e.target.value)}
                placeholder="Short statement regarding your creative vision..."
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Signature Information</label>
              <input
                type="text"
                value={signatureInfo}
                onChange={(e) => setSignatureInfo(e.target.value)}
                placeholder="e.g. Signed & Dated bottom right"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>
          </div>
        </div>

        {/* Artwork Image Assets */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">5. High-Resolution Artwork Image URLs</h3>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Main Image Asset URL *</label>
            <input
              type="text"
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="/images/artworks/isembaye.jpg"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-mono text-navy-950"
            />
          </div>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Additional Detail Image URLs (one per line)</label>
            <textarea
              rows={2}
              value={additionalImagesText}
              onChange={(e) => setAdditionalImagesText(e.target.value)}
              placeholder="/images/artworks/isembaye.jpg"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-mono"
            />
          </div>
        </div>

        {/* Certificate */}
        <div className="pt-4 border-t border-ivory-200 flex items-center gap-3">
          <input
            type="checkbox"
            id="cert"
            checked={certificateIncluded}
            onChange={(e) => setCertificateIncluded(e.target.checked)}
            className="w-4 h-4 accent-gold-500 rounded"
          />
          <label htmlFor="cert" className="font-bold text-navy-950 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-gold-600" /> Include Signed Certificate of Authenticity with this artwork
          </label>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="px-9 py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold text-xs uppercase tracking-widest transition duration-300 shadow-xl flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview Masterwork Submission
          </button>
        </div>

      </form>

      {/* Complete Artwork Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-8 rounded-2xl space-y-6 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
              <div>
                <span className="text-gold-700 font-bold uppercase text-[10px]">Pre-Submission Curatorial Preview</span>
                <h3 className="font-serif text-2xl font-bold text-navy-950">{title || 'Untitled Masterwork'}</h3>
              </div>
              <button onClick={() => setShowPreviewModal(false)} className="text-neutral-400 hover:text-navy-950">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="aspect-[4/5] bg-navy-950/5 rounded-lg overflow-hidden border">
                <img src={imageUrl} alt="" className="w-full h-full object-contain" />
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block">Artist & Year:</span>
                  <strong className="text-navy-950 text-sm">Rebecca Esho ({year})</strong>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block">Medium & Dimensions:</span>
                  <p className="font-medium text-navy-950">{medium}</p>
                  <p className="text-neutral-600">{dimensions}</p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block">Listing Price:</span>
                  <strong className="text-navy-950 text-base">{formatOriginalPrice(price, currency)} {currency}</strong>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block">Authenticity & Certificate:</span>
                  <p className="text-emerald-800 font-semibold">{certificateIncluded ? '✓ Signed Certificate Included' : 'No Certificate'}</p>
                </div>
              </div>
            </div>

            <div>
              <span className="text-neutral-500 uppercase text-[10px] block font-bold mb-1">Curatorial Narrative:</span>
              <p className="bg-ivory-100 p-3 rounded border text-neutral-700 leading-relaxed font-light">{description}</p>
            </div>

            <div className="pt-4 border-t border-ivory-300 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPreviewModal(false)}
                className="px-5 py-2.5 border rounded font-bold text-neutral-700"
              >
                Back to Edit
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-7 py-2.5 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold text-xs uppercase tracking-widest shadow-xl flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Submit for Review
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
