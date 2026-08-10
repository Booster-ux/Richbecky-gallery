import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { HelpCircle, Truck, RefreshCw, Shield, FileText } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { faqs, shippingRegions, setActivePage } = useGallery();
  const [activeTab, setActiveTab] = useState<'faqs' | 'shipping' | 'returns' | 'privacy' | 'terms'>('faqs');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-12">
      
      <div className="text-center space-y-3">
        <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
        <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Collector Information & Standards</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-navy-950">
          Gallery Policies & Collector FAQs
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-ivory-300 gap-4 text-xs font-bold uppercase tracking-wider overflow-x-auto pb-2 scrollbar-none">
        {([
          { id: 'faqs', label: 'FAQ & Inquiries', icon: HelpCircle },
          { id: 'shipping', label: 'Shipping & Logistics', icon: Truck },
          { id: 'returns', label: 'Returns & Authenticity', icon: RefreshCw },
          { id: 'privacy', label: 'Privacy Policy', icon: Shield },
          { id: 'terms', label: 'Terms & Conditions', icon: FileText }
        ] as const).map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`py-3 px-4 rounded-t-lg transition flex items-center gap-2 whitespace-nowrap ${
              activeTab === t.id ? 'bg-navy-950 text-gold-400 font-bold' : 'bg-ivory-200 text-navy-900 hover:bg-ivory-300'
            }`}
          >
            <t.icon className="w-4 h-4" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      {/* Content Panels */}
      <div className="bg-white p-8 rounded-2xl border border-ivory-300 shadow-gallery space-y-6 text-xs text-neutral-700 leading-relaxed font-light">
        
        {/* FAQS TAB */}
        {activeTab === 'faqs' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-ivory-200 pb-3">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map(f => (
                <div key={f.id} className="p-5 bg-ivory-100 rounded-xl border border-ivory-300 space-y-2">
                  <span className="text-gold-700 font-bold uppercase text-[10px]">{f.category}</span>
                  <h3 className="font-serif text-base font-bold text-navy-950">{f.question}</h3>
                  <p className="text-neutral-700">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SHIPPING TAB */}
        {activeTab === 'shipping' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-ivory-200 pb-3">Shipping & International Logistics</h2>
            <p>
              Richbecky Gallery provides white-glove insured delivery worldwide. Every original painting is sealed with protective corner wrapping and encased in custom wooden crates built for international air cargo transit.
            </p>
            <div className="space-y-3 pt-2">
              <h3 className="font-serif text-base font-bold text-navy-950">Regional Transit Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {shippingRegions.map(r => (
                  <div key={r.id} className="p-4 bg-ivory-100 rounded-xl border border-ivory-300">
                    <strong className="font-serif text-sm font-bold text-navy-950 block">{r.regionName}</strong>
                    <span className="text-neutral-500 block mt-1">Est. Transit: {r.processingTime}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RETURNS TAB */}
        {activeTab === 'returns' && (
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-ivory-200 pb-3">Returns & Authenticity Guarantees</h2>
            <p>
              Every artwork acquired through Richbecky Gallery arrives with a signed Certificate of Authenticity specifying medium, dimensions, provenance, and gallery seal. In the rare event of transit damage, our gallery concierge coordinates full insurance claims and return logistics.
            </p>
          </div>
        )}

        {/* PRIVACY TAB */}
        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-ivory-200 pb-3">Collector Privacy Policy</h2>
            <p>
              Richbecky Gallery respects the confidentiality of private art collectors. Personal information and purchase records are encrypted using enterprise standards and are never disclosed to third parties.
            </p>
          </div>
        )}

        {/* TERMS TAB */}
        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-navy-950 border-b border-ivory-200 pb-3">Terms & Conditions of Acquisition</h2>
            <p>
              By placing an acquisition order or placing a deposit through Richbecky Gallery, collectors agree to our gallery terms regarding copyright reservation, payment settlement, and white-glove courier delivery policies.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
