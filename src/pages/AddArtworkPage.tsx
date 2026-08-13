import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { CurrencyCode, ArtworkType } from '../types';
import { Upload, Award, ShieldCheck, ArrowRight, Eye, CheckCircle2, X, Info } from 'lucide-react';

export const AddArtworkPage: React.FC = () => {
  const { addNewArtwork, setActivePage, artists, currentUser, formatOriginalPrice } = useGallery();

  // Selected Artist (Default to logged-in user if artist, or first available artist)
  const defaultArtist = artists.find(a => a.name === currentUser?.name) || artists[0];
  const [selectedArtistId, setSelectedArtistId] = useState(defaultArtist?.id || 'artist-1');

  // SECTION A: BASIC INFORMATION
  const [title, setTitle] = useState('');
  const [type, setType] = useState<ArtworkType>('Original Artwork');
  const [category, setCategory] = useState('African Contemporary Art');
  const [description, setDescription] = useState('');
  const [artworkStory, setArtworkStory] = useState('');
  const [artistStatement, setArtistStatement] = useState('');

  // SECTION B: ARTWORK SPECIFICATIONS
  const [medium, setMedium] = useState('Oil on Canvas');
  const [materials, setMaterials] = useState('');
  const [dimensions, setDimensions] = useState('30 × 36 inches');
  const [year, setYear] = useState(2026);
  const [signatureInfo, setSignatureInfo] = useState('');
  const [framingInfo, setFramingInfo] = useState('');

  // SECTION C: PRICING & AVAILABILITY
  const [price, setPrice] = useState<number>(250000);
  const [currency, setCurrency] = useState<CurrencyCode>('NGN');
  const [stock, setStock] = useState(1);
  const [availability, setAvailability] = useState<'Available' | 'Sold' | 'Reserved' | 'Not for sale'>('Available');

  // SECTION D: AUTHENTICITY / EDITION
  const [certificateIncluded, setCertificateIncluded] = useState(true);
  const [certificateNumber, setCertificateNumber] = useState('');
  const [certificateDetails, setCertificateDetails] = useState('');
  const [editionInfo, setEditionInfo] = useState('1-of-1 Original Masterpiece');
  const [editionNumber, setEditionNumber] = useState('');

  // SECTION E: IMAGES
  const [imageUrl, setImageUrl] = useState('/images/artworks/isembaye.jpg');
  const [additionalImagesText, setAdditionalImagesText] = useState('');
  const [altText, setAltText] = useState('');

  // SECTION F: SHIPPING
  const [shippingInfoNotes, setShippingInfoNotes] = useState('Shipped in museum-grade protective packaging with insured courier transit.');

  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const selectedArtistObj = artists.find(a => a.id === selectedArtistId) || defaultArtist;

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
      artistId: selectedArtistObj.id,
      artistName: selectedArtistObj.name,
      artistAvatar: selectedArtistObj.avatar,
      type,
      category,
      medium,
      materials,
      dimensions,
      year,
      price,
      currency,
      stock: (type === 'Original' || type === 'Original Artwork') ? 1 : stock,
      availability,
      isSold: availability === 'Sold',
      isFeatured: false,
      isNewArrival: true,
      imageUrl: imageUrl || '/images/artworks/isembaye.jpg',
      additionalImages: additionalImages.length > 0 ? additionalImages : [imageUrl],
      altText,
      description,
      artistStatement,
      artworkStory,
      editionInfo,
      editionNumber,
      signatureInfo,
      framingInfo,
      certificateIncluded,
      certificateNumber,
      certificateDetails,
      shippingInfoNotes,
      status: 'Pending Admin Approval'
    });

    setShowPreviewModal(false);
    setActivePage('artist-dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      <div className="border-b border-ivory-300 pb-6">
        <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Studio Submission Standard</span>
        <h1 className="font-serif text-3xl font-bold text-navy-950 mt-1">Submit Artwork to Richbecky Gallery</h1>
        <p className="text-xs text-neutral-500 font-light mt-1">
          Complete the standardized artwork specification form. Submissions undergo curatorial review before publication.
        </p>
      </div>

      <form onSubmit={handleOpenPreview} className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-8 text-xs">
        
        {/* SECTION A — BASIC INFORMATION */}
        <div className="space-y-4">
          <div className="border-b border-ivory-200 pb-2 flex items-center justify-between">
            <h3 className="font-serif text-base font-bold text-navy-950">SECTION A — BASIC INFORMATION</h3>
            <span className="text-[10px] text-gold-700 font-semibold uppercase">* Required Core Fields</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artwork Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ISEMBAYE"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 focus:outline-none focus:border-gold-500 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artist *</label>
              <select
                value={selectedArtistId}
                onChange={(e) => setSelectedArtistId(e.target.value)}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-semibold text-navy-950"
              >
                {artists.map(art => (
                  <option key={art.id} value={art.id}>{art.name} ({art.country})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artwork Type *</label>
              <select
                value={type}
                onChange={(e) => {
                  const t = e.target.value as ArtworkType;
                  setType(t);
                  if (t === 'Original' || t === 'Original Artwork') setStock(1);
                }}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-bold text-navy-950"
              >
                <option value="Original Artwork">Original Artwork (Single Original Piece)</option>
                <option value="Fine Art Print">Fine Art Print (Multi-Unit Series)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-semibold text-navy-950"
              >
                <option value="African Contemporary Art">African Contemporary Art</option>
                <option value="Figurative">Figurative</option>
                <option value="Abstract">Abstract</option>
                <option value="Minimalist">Minimalist</option>
                <option value="Sculpture">Sculpture</option>
                <option value="Landscape">Landscape</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artwork Description *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide a detailed description of the artwork's subject, history, meaning, and composition..."
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artwork Story (Optional)</label>
              <textarea
                rows={3}
                value={artworkStory}
                onChange={(e) => setArtworkStory(e.target.value)}
                placeholder="Narrative story or cultural context behind the artwork..."
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Artist Statement (Optional)</label>
              <textarea
                rows={3}
                value={artistStatement}
                onChange={(e) => setArtistStatement(e.target.value)}
                placeholder="Personal statement or philosophical vision regarding this creation..."
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>
          </div>
        </div>

        {/* SECTION B — ARTWORK SPECIFICATIONS */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">SECTION B — ARTWORK SPECIFICATIONS</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Medium / Material *</label>
              <input
                type="text"
                required
                value={medium}
                onChange={(e) => setMedium(e.target.value)}
                placeholder="e.g. Mixed Media (oil paints, cowries, Ghana beads)"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Dimensions *</label>
              <input
                type="text"
                required
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="e.g. 30 × 36 inches"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 text-navy-950 font-medium"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Year Created *</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Signature Information (Optional)</label>
              <input
                type="text"
                value={signatureInfo}
                onChange={(e) => setSignatureInfo(e.target.value)}
                placeholder="e.g. Signed by artist, Rebecca Esho. Exact placement to be decided."
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Framing Information (Optional)</label>
              <input
                type="text"
                value={framingInfo}
                onChange={(e) => setFramingInfo(e.target.value)}
                placeholder="e.g. Painted on canvas, currently unframed. Framing available upon request."
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>
          </div>
        </div>

        {/* SECTION C — PRICING & AVAILABILITY */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">SECTION C — PRICING & AVAILABILITY</h3>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Listing Price *</label>
              <input
                type="number"
                required
                min={0}
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
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Quantity *</label>
              <input
                type="number"
                min={0}
                max={(type === 'Original' || type === 'Original Artwork') ? 1 : 999}
                disabled={type === 'Original' || type === 'Original Artwork'}
                value={(type === 'Original' || type === 'Original Artwork') ? 1 : stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-bold disabled:opacity-60"
              />
              {(type === 'Original' || type === 'Original Artwork') && (
                <span className="text-[10px] text-gold-700 block mt-0.5">Original Artwork restricted to 1 piece</span>
              )}
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Availability *</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value as any)}
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-bold text-navy-950"
              >
                <option value="Available">Available</option>
                <option value="Sold">Sold</option>
                <option value="Reserved">Reserved</option>
                <option value="Not for sale">Not for sale</option>
              </select>
            </div>
          </div>
        </div>

        {/* SECTION D — AUTHENTICITY / EDITION */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">SECTION D — AUTHENTICITY & EDITION DETAILS</h3>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="cert"
              checked={certificateIncluded}
              onChange={(e) => setCertificateIncluded(e.target.checked)}
              className="w-4 h-4 accent-gold-500 rounded"
            />
            <label htmlFor="cert" className="font-bold text-navy-950 flex items-center gap-1.5 cursor-pointer">
              <Award className="w-4 h-4 text-gold-600" /> Certificate of Authenticity will be issued with this artwork
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Certificate Number (Optional)</label>
              <input
                type="text"
                value={certificateNumber}
                onChange={(e) => setCertificateNumber(e.target.value)}
                placeholder="e.g. RBG-COA-2026-001"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Edition Information (Optional)</label>
              <input
                type="text"
                value={editionInfo}
                onChange={(e) => setEditionInfo(e.target.value)}
                placeholder="e.g. Original artwork: 1 available. Fine-art prints: Available separately."
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Edition Number / Size (Optional)</label>
              <input
                type="text"
                value={editionNumber}
                onChange={(e) => setEditionNumber(e.target.value)}
                placeholder="e.g. 1 of 1 or AP 2/10"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION E — IMAGES */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">SECTION E — ARTWORK IMAGES</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Main Artwork Image URL *</label>
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
              <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Image Alt Text (Optional)</label>
              <input
                type="text"
                value={altText}
                onChange={(e) => setAltText(e.target.value)}
                placeholder="e.g. ISEMBAYE original oil and mixed media portrait by Rebecca Esho"
                className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Additional Artwork Detail Image URLs (one per line)</label>
            <textarea
              rows={2}
              value={additionalImagesText}
              onChange={(e) => setAdditionalImagesText(e.target.value)}
              placeholder="/images/artworks/isembaye.jpg"
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3 font-mono"
            />
          </div>
        </div>

        {/* SECTION F — SHIPPING */}
        <div className="space-y-4 pt-4 border-t border-ivory-200">
          <h3 className="font-serif text-base font-bold text-navy-950 border-b border-ivory-200 pb-2">SECTION F — SHIPPING & HANDLING</h3>

          <div>
            <label className="font-bold text-navy-950 uppercase tracking-wider block mb-1">Shipping & Packaging Notes (Optional)</label>
            <textarea
              rows={2}
              value={shippingInfoNotes}
              onChange={(e) => setShippingInfoNotes(e.target.value)}
              placeholder="e.g. Shipped or delivered directly to customer. Fee depends on location and distance."
              className="w-full bg-ivory-100 border border-ivory-300 rounded p-3"
            />
          </div>
        </div>

        {/* Submission Action */}
        <div className="pt-6 flex justify-end">
          <button
            type="submit"
            className="px-9 py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold text-xs uppercase tracking-widest transition duration-300 shadow-xl flex items-center gap-2"
          >
            <Eye className="w-4 h-4" /> Preview Artwork Submission
          </button>
        </div>

      </form>

      {/* Standardized Pre-Submission Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full p-8 rounded-2xl space-y-6 text-xs shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-ivory-300 pb-4">
              <div>
                <span className="text-gold-700 font-bold uppercase text-[10px]">Standardized Artwork Review Preview</span>
                <h3 className="font-serif text-2xl font-bold text-navy-950">{title || 'Untitled Artwork'}</h3>
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
                  <span className="text-neutral-500 uppercase text-[10px] block font-bold">Artist & Year:</span>
                  <strong className="text-navy-950 text-sm">{selectedArtistObj.name} ({year})</strong>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block font-bold">Medium & Dimensions:</span>
                  <p className="font-medium text-navy-950">{medium}</p>
                  <p className="text-neutral-600">{dimensions}</p>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block font-bold">Listing Price:</span>
                  <strong className="text-navy-950 text-base">{formatOriginalPrice(price, currency)} {currency}</strong>
                </div>

                <div>
                  <span className="text-neutral-500 uppercase text-[10px] block font-bold">Authenticity & Certificate:</span>
                  <p className="text-emerald-800 font-semibold">{certificateIncluded ? '✓ Signed Certificate Included' : 'No Certificate'}</p>
                  {certificateNumber && <p className="text-neutral-500 font-mono">COA #: {certificateNumber}</p>}
                </div>
              </div>
            </div>

            <div>
              <span className="text-neutral-500 uppercase text-[10px] block font-bold mb-1">Description:</span>
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
                <CheckCircle2 className="w-4 h-4" /> Confirm & Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
