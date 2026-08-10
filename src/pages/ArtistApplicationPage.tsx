import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { Upload, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, FileText, Image as ImageIcon } from 'lucide-react';

export const ArtistApplicationPage: React.FC = () => {
  const { submitArtistApplication, setActivePage } = useGallery();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // STEP 1: Personal Info
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Nigeria');
  const [city, setCity] = useState('Lagos');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');

  // STEP 2: Artist Profile
  const [artistName, setArtistName] = useState('');
  const [bio, setBio] = useState('');
  const [artistStatement, setArtistStatement] = useState('');
  const [practiceAreas, setPracticeAreas] = useState('');
  const [mediums, setMediums] = useState('Oil, Traditional Beading & Fabric Collage');
  const [yearsActive, setYearsActive] = useState(5);

  // STEP 3: Experience
  const [exhibitions, setExhibitions] = useState('');
  const [awards, setAwards] = useState('');
  const [collections, setCollections] = useState('');
  const [galleryExperience, setGalleryExperience] = useState('');

  // STEP 4: Portfolio
  const [portfolioImages, setPortfolioImages] = useState<string[]>([
    '/images/artworks/isembaye.jpg',
    '/images/artworks/this_is_our_way.jpg'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  // STEP 5: Agreement
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [agreedAccuracy, setAgreedAccuracy] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const handleAddPortfolioImage = () => {
    if (newImageUrl.trim()) {
      setPortfolioImages(prev => [...prev, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemovePortfolioImage = (index: number) => {
    setPortfolioImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateStep1 = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim() || !city.trim()) {
      setErrorMsg('Please complete all required personal information fields.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const validateStep2 = () => {
    if (!artistName.trim() || !bio.trim() || !mediums.trim()) {
      setErrorMsg('Please fill in your artist name, biography, and primary mediums.');
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) setCurrentStep(2);
    else if (currentStep === 2 && validateStep2()) setCurrentStep(3);
    else if (currentStep === 3) setCurrentStep(4);
    else if (currentStep === 4) setCurrentStep(5);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!agreedToTerms || !agreedAccuracy) {
      setErrorMsg('You must acknowledge the artist agreement and confirm accuracy to submit.');
      return;
    }

    submitArtistApplication({
      fullName,
      email,
      phone,
      country,
      city,
      website,
      instagram,
      artistName: artistName || fullName,
      bio,
      artistStatement,
      practiceAreas,
      mediums,
      yearsActive,
      exhibitions,
      awards,
      collections,
      galleryExperience,
      portfolioImages,
      agreedToTerms
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
        <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Curatorial Admission Workflow</span>
        <h1 className="font-serif text-3xl font-bold text-navy-950">Artist Representation Application</h1>
      </div>

      {/* Progress Steps Header */}
      <div className="bg-white p-4 rounded-xl border border-ivory-300 shadow-subtle flex items-center justify-between text-xs font-bold uppercase tracking-wider overflow-x-auto scrollbar-none">
        {[
          { step: 1, label: '1. Personal Info' },
          { step: 2, label: '2. Profile & Bio' },
          { step: 3, label: '3. Experience' },
          { step: 4, label: '4. Portfolio' },
          { step: 5, label: '5. Agreement' }
        ].map(s => (
          <div
            key={s.step}
            className={`px-3 py-1.5 rounded-full transition flex items-center gap-1.5 whitespace-nowrap ${
              currentStep === s.step
                ? 'bg-navy-950 text-gold-400 font-bold'
                : currentStep > s.step
                ? 'bg-emerald-100 text-emerald-800'
                : 'text-neutral-400'
            }`}
          >
            {currentStep > s.step ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : null}
            <span>{s.label}</span>
          </div>
        ))}
      </div>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded font-medium">
          {errorMsg}
        </div>
      )}

      {/* Form Card */}
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-6 text-xs">
        
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950 border-b border-ivory-200 pb-2">Step 1 — Personal & Contact Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rebecca Esho"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rebecca@artist.com"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 800 000 0000"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Country *</label>
                <input
                  type="text"
                  required
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Nigeria / UK / USA"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Lagos"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Website URL (Optional)</label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://rebeccaesho.com"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Instagram Handle (Optional)</label>
                <input
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@rebeccaesho_art"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950 border-b border-ivory-200 pb-2">Step 2 — Artist Profile & Artistic Statement</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Professional Artist Name *</label>
                <input
                  type="text"
                  required
                  value={artistName}
                  onChange={(e) => setArtistName(e.target.value)}
                  placeholder="Rebecca Esho"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Years Active in Practice *</label>
                <input
                  type="number"
                  required
                  value={yearsActive}
                  onChange={(e) => setYearsActive(Number(e.target.value))}
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded font-bold"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Primary Mediums & Materials *</label>
              <input
                type="text"
                required
                value={mediums}
                onChange={(e) => setMediums(e.target.value)}
                placeholder="e.g. Oil, Traditional Beading & Fabric Collage on Canvas"
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Artist Biography *</label>
              <textarea
                required
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Detail your background, training, and creative journey..."
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Artist Statement (Optional)</label>
              <textarea
                rows={3}
                value={artistStatement}
                onChange={(e) => setArtistStatement(e.target.value)}
                placeholder="Key philosophy or themes driving your work..."
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950 border-b border-ivory-200 pb-2">Step 3 — Exhibition & Career Credentials</h3>
            
            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Selected Exhibitions (Optional)</label>
              <textarea
                rows={3}
                value={exhibitions}
                onChange={(e) => setExhibitions(e.target.value)}
                placeholder="List major solo or group exhibitions..."
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Awards & Recognition (Optional)</label>
              <textarea
                rows={2}
                value={awards}
                onChange={(e) => setAwards(e.target.value)}
                placeholder="List key awards or grants..."
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Collections & Previous Representation (Optional)</label>
              <textarea
                rows={2}
                value={collections}
                onChange={(e) => setCollections(e.target.value)}
                placeholder="Institutional or private collections housing your works..."
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>
          </div>
        )}

        {/* STEP 4 */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950 border-b border-ivory-200 pb-2">Step 4 — Portfolio & Visual Works Preview</h3>
            
            <p className="text-neutral-600 font-light">
              Add image preview links for your representative masterworks.
            </p>

            <div className="flex gap-2">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="/images/artworks/isembaye.jpg"
                className="flex-1 p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950 font-mono"
              />
              <button
                type="button"
                onClick={handleAddPortfolioImage}
                className="px-5 py-3 bg-navy-950 text-white rounded font-bold uppercase"
              >
                Add Image
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {portfolioImages.map((url, idx) => (
                <div key={idx} className="relative group rounded-lg overflow-hidden border border-ivory-300 aspect-square bg-ivory-100">
                  <img src={url} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemovePortfolioImage(idx)}
                    className="absolute top-2 right-2 bg-rose-900 text-white text-[10px] font-bold px-2 py-0.5 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 5 */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-bold text-navy-950 border-b border-ivory-200 pb-2">Step 5 — Representation Agreement & Submission</h3>

            <div className="p-4 bg-ivory-100 rounded-xl border border-ivory-300 space-y-2 text-neutral-700 leading-relaxed font-light">
              <span className="font-bold text-navy-950 block uppercase text-[11px]">Artist Representation Guidelines Summary</span>
              <p>• Standard gallery commission rate is 15% on completed artwork sales.</p>
              <p>• Artworks must be authentic original creations signed by the artist.</p>
              <p>• Submissions undergo curatorial review before portal access is granted.</p>
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold-500 rounded"
                />
                <span className="text-neutral-700">
                  I acknowledge and agree to the Richbecky Gallery Artist Representation Terms.
                </span>
              </label>

              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedAccuracy}
                  onChange={(e) => setAgreedAccuracy(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-gold-500 rounded"
                />
                <span className="text-neutral-700">
                  I confirm that all portfolio information and credentials provided are accurate.
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-ivory-200 flex justify-between items-center">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4 | 5)}
              className="px-5 py-3 border border-ivory-300 rounded font-bold text-navy-950 flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Previous Step
            </button>
          ) : <div />}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3.5 bg-navy-950 text-gold-400 rounded font-bold uppercase tracking-widest flex items-center gap-2"
            >
              Continue to Step {currentStep + 1} <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-9 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded font-bold uppercase tracking-widest shadow-xl flex items-center gap-2"
            >
              Submit Representation Application <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </form>

    </div>
  );
};
