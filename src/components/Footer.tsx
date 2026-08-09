import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { ShieldCheck, Award, Truck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setFilterState } = useGallery();

  return (
    <footer className="bg-navy-950 text-ivory-200 mt-auto border-t border-navy-900 pt-16 pb-12">
      
      {/* Gallery Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-navy-800/80 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-gold-400 mb-2.5" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-widest">Authenticated Art</h4>
            <p className="text-[11px] text-neutral-400 mt-1 font-light">Signed Certificate of Authenticity included</p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-6 h-6 text-gold-400 mb-2.5" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-widest">White-Glove Delivery</h4>
            <p className="text-[11px] text-neutral-400 mt-1 font-light">Fully insured global art transit & crating</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-gold-400 mb-2.5" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-widest">Curated Excellence</h4>
            <p className="text-[11px] text-neutral-400 mt-1 font-light">Direct representation of contemporary masters</p>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-6 h-6 text-gold-400 mb-2.5" />
            <h4 className="text-xs font-semibold text-ivory-100 uppercase tracking-widest">Collector Protection</h4>
            <p className="text-[11px] text-neutral-400 mt-1 font-light">Guaranteed authenticity & escrow security</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          
          {/* Column 1: Brand & Heritage */}
          <div className="md:col-span-2 space-y-4 pr-4">
            <div className="flex items-center">
              <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Richbecky Gallery is a premier online contemporary art marketplace connecting distinguished African visual artists and contemporary masters with international collectors, curators, and institutions.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs font-medium text-gold-400">
              <a href="#" className="hover:text-gold-300 transition">Instagram</a>
              <span>•</span>
              <a href="#" className="hover:text-gold-300 transition">Artsy</a>
              <span>•</span>
              <a href="#" className="hover:text-gold-300 transition">LinkedIn</a>
              <span>•</span>
              <a href="#" className="hover:text-gold-300 transition">Twitter</a>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-widest border-b border-navy-800 pb-2">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button onClick={() => setActivePage('catalogue')} className="hover:text-gold-400 transition">
                  Artworks
                </button>
              </li>
              <li>
                <button onClick={() => { setFilterState(prev => ({ ...prev, category: 'All' })); setActivePage('catalogue'); }} className="hover:text-gold-400 transition">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-profile')} className="hover:text-gold-400 transition">
                  Artists
                </button>
              </li>
              <li>
                <button onClick={() => { setFilterState(prev => ({ ...prev, isNew: true })); setActivePage('catalogue'); }} className="hover:text-gold-400 transition">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => { setFilterState(prev => ({ ...prev, isFeatured: true })); setActivePage('catalogue'); }} className="hover:text-gold-400 transition">
                  Featured Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: FOR ARTISTS */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-widest border-b border-navy-800 pb-2">
              For Artists
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button onClick={() => setActivePage('artist-register')} className="hover:text-gold-400 transition">
                  Sell Your Art
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-register')} className="hover:text-gold-400 transition">
                  Artist Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('account')} className="hover:text-gold-400 transition">
                  Artist Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT & SERVICES */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-gold-400 uppercase tracking-widest border-b border-navy-800 pb-2">
              About
            </h3>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gold-400 transition">
                  About Richbecky Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gold-400 transition">
                  Contact Advisory
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gold-400 transition">
                  FAQ & Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gold-400 transition">
                  Shipping & Logistics
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gold-400 transition">
                  Returns & Guarantees
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-navy-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Richbecky Gallery. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-neutral-200 transition">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-200 transition">Terms & Conditions</a>
            <button onClick={() => setActivePage('admin-login')} className="hover:text-gold-400 transition text-neutral-500">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
