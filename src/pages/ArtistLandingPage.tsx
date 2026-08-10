import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { Sparkles, Award, ShieldCheck, ArrowRight, UserCheck, Layers, HelpCircle } from 'lucide-react';

export const ArtistLandingPage: React.FC = () => {
  const { setActivePage } = useGallery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-16">
      
      {/* Hero Header */}
      <div className="bg-navy-950 text-ivory-100 p-10 md:p-16 rounded-3xl border border-gold-500/30 shadow-gallery flex flex-col items-center text-center space-y-6">
        <img src={LOGO_URL} alt="Richbecky Gallery" className="h-14 w-auto object-contain" />
        <span className="text-gold-400 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-4 h-4" /> Artist Representation Program
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white max-w-4xl leading-tight">
          Submit Your Work for Consideration.
        </h1>
        <p className="text-sm sm:text-base text-neutral-300 font-light max-w-2xl leading-relaxed">
          Richbecky Gallery carefully reviews every artist representation application before granting portal access to ensure authentic curatorial alignment and museum-grade quality for international collectors.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => setActivePage('artist-application')}
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-sm font-bold text-xs uppercase tracking-widest transition duration-300 shadow-xl flex items-center gap-2"
          >
            Apply as an Artist <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => setActivePage('artist-login')}
            className="px-8 py-4 bg-navy-900 hover:bg-navy-850 text-ivory-100 border border-ivory-300/25 rounded-sm font-bold text-xs uppercase tracking-widest transition"
          >
            Artist Portal Login
          </button>
        </div>
      </div>

      {/* Representation Standards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-3">
          <Award className="w-8 h-8 text-gold-600" />
          <h3 className="font-serif text-lg font-bold text-navy-950">Curatorial Review</h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Applications undergo curatorial evaluation by gallery directors. Approved artists receive dedicated studio management tools.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-3">
          <Layers className="w-8 h-8 text-gold-600" />
          <h3 className="font-serif text-lg font-bold text-navy-950">15% Standard Commission</h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            Artists retain 85% of net artwork listing prices with transparent financial ledger tracking and bank wire payouts.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-subtle space-y-3">
          <ShieldCheck className="w-8 h-8 text-gold-600" />
          <h3 className="font-serif text-lg font-bold text-navy-950">Global Collector Reach</h3>
          <p className="text-xs text-neutral-600 font-light leading-relaxed">
            We handle white-glove packaging, Certificate of Authenticity sealing, and insured courier logistics across Europe, the Americas, and Asia.
          </p>
        </div>
      </div>

    </div>
  );
};
