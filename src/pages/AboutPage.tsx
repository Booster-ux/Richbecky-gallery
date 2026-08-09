import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { Award, ShieldCheck, Globe, Users, ArrowRight } from 'lucide-react';
import { LOGO_URL } from '../data/mockData';

export const AboutPage: React.FC = () => {
  const { setActivePage } = useGallery();

  return (
    <div className="animate-fade-in space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="bg-navy-950 text-ivory-100 py-20 border-b border-navy-900">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <img src={LOGO_URL} alt="Richbecky Gallery" className="h-16 w-auto mx-auto object-contain mb-4" />
          <span className="text-gold-400 text-xs uppercase tracking-widest font-semibold block">Curatorial Vision</span>
          <h1 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight text-white">
            Elevating Contemporary African Masterpieces to the Global Stage
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 max-w-3xl mx-auto font-light leading-relaxed">
            Richbecky Gallery is a premier online contemporary art marketplace and digital curatorial institution. We represent distinguished master painters, sculptors, and mixed-media visionaries across West Africa and the global diaspora.
          </p>
        </div>
      </section>

      {/* Core Values / Pillar Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold text-gold-700 uppercase tracking-widest">Our Promise</span>
          <h2 className="font-serif text-3xl font-semibold text-navy-900">Museum-Grade Standards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-center">
            <Award className="w-10 h-10 text-gold-600 mx-auto" />
            <h3 className="font-serif text-xl font-semibold text-navy-900">Authenticated Lineage</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Every original work acquired through Richbecky Gallery arrives accompanied by an official Certificate of Authenticity signed directly by the artist and gallery director.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-center">
            <Globe className="w-10 h-10 text-gold-600 mx-auto" />
            <h3 className="font-serif text-xl font-semibold text-navy-900">White-Glove Logistics</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              We coordinate fully insured, climate-controlled art transit and customs clearance across North America, Europe, Asia, and Africa.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl border border-ivory-300 shadow-subtle space-y-4 text-center">
            <Users className="w-10 h-10 text-gold-600 mx-auto" />
            <h3 className="font-serif text-xl font-semibold text-navy-900">Artist Empowerment</h3>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              We ensure transparent, fair marketplace compensation that empowers contemporary African artists to continue building sustainable studio practices.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-ivory-200 border-y border-ivory-300 py-16 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="font-serif text-3xl font-semibold text-navy-900">Begin Your Fine Art Collection</h2>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto font-light">
            Browse our curated catalogue of authenticated original oil paintings, traditional fabric collages, and limited edition fine art prints.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('catalogue')}
              className="px-8 py-3.5 bg-navy-900 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-semibold text-xs uppercase tracking-widest transition shadow-md inline-flex items-center gap-2"
            >
              Explore Catalogue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
