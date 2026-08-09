import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { ShieldCheck, Award, Truck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage } = useGallery();

  return (
    <footer className="bg-navy-900 text-ivory-200 mt-auto border-t border-navy-800 pt-12 pb-8">
      {/* Gallery Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 border-b border-navy-700/60 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-gold-400 mb-2" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-wider">Authenticated Art</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Certificates of Authenticity included</p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-6 h-6 text-gold-400 mb-2" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-wider">White-Glove Delivery</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Fully insured global art transit</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-gold-400 mb-2" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-wider">Curated Excellence</h4>
            <p className="text-[11px] text-neutral-400 mt-1">Selected by international art advisors</p>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-6 h-6 text-gold-400 mb-2" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-wider">Collector Protection</h4>
            <p className="text-[11px] text-neutral-400 mt-1">14-day gallery return guarantee</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Logo & About */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Richbecky Gallery" className="h-10 w-auto object-contain brightness-110" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Richbecky Gallery is a curated online fine art marketplace connecting discerning global art collectors with leading contemporary original artworks and archival fine art prints.
            </p>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">Marketplace</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('catalogue')} className="hover:text-gold-300 transition">
                  Explore Artworks
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-profile')} className="hover:text-gold-300 transition">
                  Featured Artists
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-register')} className="hover:text-gold-300 transition">
                  Artist Representation Application
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('account')} className="hover:text-gold-300 transition">
                  Collector Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">Collector Services</h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li><a href="#" className="hover:text-gold-300 transition">Shipping & Customs</a></li>
              <li><a href="#" className="hover:text-gold-300 transition">Returns & Guarantees</a></li>
              <li><a href="#" className="hover:text-gold-300 transition">Art Advisory Services</a></li>
              <li><a href="#" className="hover:text-gold-300 transition">Certificate Verification</a></li>
              <li><a href="#" className="hover:text-gold-300 transition">Contact Advisory Team</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-wider mb-4">Connect</h3>
            <p className="text-xs text-neutral-400 mb-3">
              Enquiries: concierge@richbeckygallery.com
            </p>
            <div className="flex space-x-4 text-xs">
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition">Instagram</a>
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition">Artsuites</a>
              <a href="#" className="text-neutral-400 hover:text-gold-400 transition">LinkedIn</a>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Richbecky Gallery. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-3 sm:mt-0">
            <a href="#" className="hover:text-neutral-200">Terms of Sale</a>
            <a href="#" className="hover:text-neutral-200">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-200">Authenticity Guarantee</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
