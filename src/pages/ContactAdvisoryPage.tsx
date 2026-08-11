import React, { useState } from 'react';
import { useGallery } from '../context/GalleryContext';
import { EnquiryType } from '../types';
import { LOGO_URL } from '../data/mockData';
import { Mail, Phone, MapPin, Send, ShieldCheck, Award } from 'lucide-react';
import { getProductionImageUrl, handleImageError } from '../services/imageService';

export const ContactAdvisoryPage: React.FC = () => {
  const { addEnquiry, selectedArtworkForEnquiry, showToast } = useGallery();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [enquiryType, setEnquiryType] = useState<EnquiryType>(
    selectedArtworkForEnquiry ? 'Artwork Enquiry' : 'Private Collection Advisory'
  );
  const [message, setMessage] = useState(
    selectedArtworkForEnquiry
      ? `I am interested in inquiring about private viewing, authenticity provenance, and acquisition logistics for "${selectedArtworkForEnquiry.title}" by ${selectedArtworkForEnquiry.artistName}.`
      : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEnquiry({
      customerName,
      customerEmail,
      customerPhone,
      enquiryType,
      artworkId: selectedArtworkForEnquiry?.id,
      artworkTitle: selectedArtworkForEnquiry?.title,
      message
    });
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <img src={LOGO_URL} alt="Richbecky Gallery" className="h-16 w-auto mx-auto object-contain" />
        <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Private Curatorial Advisory</span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-navy-950">
          Contact Advisory & Collector Concierge
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 font-light leading-relaxed">
          Our gallery directors and curatorial advisors provide confidential guidance on private acquisitions, institutional loans, corporate collection strategy, and artwork provenance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-gallery space-y-6 text-xs">
          
          {selectedArtworkForEnquiry && (
            <div className="p-4 bg-ivory-100 rounded-xl border border-ivory-300 flex items-center gap-4">
              <img
                src={getProductionImageUrl(selectedArtworkForEnquiry.imageUrl, selectedArtworkForEnquiry.title)}
                alt={selectedArtworkForEnquiry.title}
                onError={(e) => handleImageError(e, selectedArtworkForEnquiry.title)}
                className="w-14 h-16 object-cover rounded border"
              />
              <div>
                <span className="text-gold-700 font-bold uppercase text-[10px]">Auto-Attached Artwork Reference</span>
                <h4 className="font-serif text-base font-bold text-navy-950">{selectedArtworkForEnquiry.title}</h4>
                <p className="text-neutral-500">By {selectedArtworkForEnquiry.artistName}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Lady Rebecca Sterling"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="rebecca@artcollector.com"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Telephone / WhatsApp</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+44 20 7946 0912"
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
                />
              </div>

              <div>
                <label className="font-bold text-navy-950 uppercase block mb-1">Enquiry Nature / Type *</label>
                <select
                  value={enquiryType}
                  onChange={(e) => setEnquiryType(e.target.value as EnquiryType)}
                  className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded font-semibold text-navy-950"
                >
                  <option value="Artwork Enquiry">Artwork Enquiry</option>
                  <option value="Purchase Assistance">Purchase Assistance</option>
                  <option value="Private Collection Advisory">Private Collection Advisory</option>
                  <option value="Private Viewing">Private Viewing</option>
                  <option value="Artist Enquiry">Artist Enquiry</option>
                  <option value="Exhibition Enquiry">Exhibition Enquiry</option>
                  <option value="Corporate Art Consultation">Corporate Art Consultation</option>
                  <option value="Shipping Enquiry">Shipping Enquiry</option>
                  <option value="General Enquiry">General Enquiry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-navy-950 uppercase block mb-1">Confidential Advisory Message *</label>
              <textarea
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your inquiry or request..."
                className="w-full p-3 bg-ivory-100 border border-ivory-300 rounded text-navy-950"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold uppercase tracking-widest text-xs transition flex items-center justify-center gap-2 shadow-xl"
            >
              <Send className="w-4 h-4" /> Transmit Confidential Advisory Enquiry
            </button>
          </form>

        </div>

        {/* Gallery Contact Information */}
        <div className="lg:col-span-5 bg-white text-navy-950 p-8 rounded-2xl border border-ivory-300 space-y-8 shadow-gallery">
          
          <div>
            <span className="text-gold-700 text-xs font-bold uppercase tracking-widest">Global Curatorial Desk</span>
            <h3 className="font-serif text-2xl font-bold text-navy-950 mt-1">Richbecky Gallery Headquarters</h3>
            <p className="text-xs text-neutral-600 font-light mt-2 leading-relaxed">
              Our advisory team operates across Lagos, London, and Paris, facilitating private acquisitions for international patrons.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gold-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block font-bold">Gallery Physical Desk</strong>
                <span className="text-neutral-600">Victoria Island, Lagos • Mayfair, London</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-gold-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block font-bold">Curatorial Advisory Email</strong>
                <span className="text-neutral-600">advisory@richbeckygallery.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gold-700 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950 block font-bold">Concierge Telephone</strong>
                <span className="text-neutral-600">+234 800 RICHBECKY / +44 20 7946 0912</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-ivory-200 flex items-center gap-2 text-xs text-gold-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-gold-600" />
            <span>Guaranteed 24-Hour Confidential Response</span>
          </div>

        </div>

      </div>
    </div>
  );
};
