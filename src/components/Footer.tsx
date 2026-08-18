import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { ShieldCheck, Award, Truck, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActivePage, setFilterState } = useGallery();

  return (
    <footer className="bg-ivory-200 text-navy-950 mt-auto border-t border-ivory-300 pt-16 pb-12">
      
      {/* Gallery Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-ivory-300 mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-gold-700 mb-2.5" />
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-widest">Authenticated Art</h4>
            <p className="text-[11px] text-neutral-600 mt-1 font-light">Signed Certificate of Authenticity included</p>
          </div>
          <div className="flex flex-col items-center">
            <Truck className="w-6 h-6 text-gold-700 mb-2.5" />
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-widest">White-Glove Delivery</h4>
            <p className="text-[11px] text-neutral-600 mt-1 font-light">Fully insured global art transit & crating</p>
          </div>
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-gold-700 mb-2.5" />
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-widest">Curated Excellence</h4>
            <p className="text-[11px] text-neutral-600 mt-1 font-light">Direct representation of contemporary masters</p>
          </div>
          <div className="flex flex-col items-center">
            <Lock className="w-6 h-6 text-gold-700 mb-2.5" />
            <h4 className="text-xs font-bold text-navy-950 uppercase tracking-widest">Collector Protection</h4>
            <p className="text-[11px] text-neutral-600 mt-1 font-light">Guaranteed authenticity & escrow security</p>
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
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Richbecky Gallery is a premier online contemporary art marketplace connecting distinguished African visual artists and contemporary masters with international collectors, curators, and institutions.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-xs font-semibold text-gold-700">
              <a href="#" className="hover:underline transition">Instagram</a>
              <span>•</span>
              <a href="#" className="hover:underline transition">Artsy</a>
              <span>•</span>
              <a href="#" className="hover:underline transition">LinkedIn</a>
              <span>•</span>
              <a href="#" className="hover:underline transition">Twitter</a>
            </div>
          </div>

          {/* Column 2: EXPLORE */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-300 pb-2">
              Explore
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>
                <button onClick={() => setActivePage('catalogue')} className="hover:text-gold-700 transition">
                  Artworks
                </button>
              </li>
              <li>
                <button onClick={() => { setFilterState(prev => ({ ...prev, category: 'All' })); setActivePage('catalogue'); }} className="hover:text-gold-700 transition">
                  Categories
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-profile')} className="hover:text-gold-700 transition">
                  Artists
                </button>
              </li>
              <li>
                <button onClick={() => { setFilterState(prev => ({ ...prev, isNew: true })); setActivePage('catalogue'); }} className="hover:text-gold-700 transition">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => { setFilterState(prev => ({ ...prev, isFeatured: true })); setActivePage('catalogue'); }} className="hover:text-gold-700 transition">
                  Featured Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: FOR ARTISTS */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-300 pb-2">
              For Artists
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>
                <button onClick={() => setActivePage('artist-landing')} className="hover:text-gold-700 transition">
                  Sell Your Art
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-application')} className="hover:text-gold-700 transition">
                  Artist Representation Application
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('artist-login')} className="hover:text-gold-700 transition">
                  Artist Studio Portal Login
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: ABOUT & SERVICES */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-300 pb-2">
              About
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-gold-700 transition">
                  About Richbecky Gallery
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('contact-advisory')} className="hover:text-gold-700 transition">
                  Contact Advisory
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('policies')} className="hover:text-gold-700 transition">
                  FAQ & Inquiries
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('policies')} className="hover:text-gold-700 transition">
                  Shipping & Logistics
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('policies')} className="hover:text-gold-700 transition">
                  Returns & Guarantees
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: CONCIERGE & ORDER TRACKING */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-navy-950 uppercase tracking-widest border-b border-ivory-300 pb-2">
              Concierge & Tracking
            </h3>
            <ul className="space-y-2 text-xs text-neutral-600 font-medium">
              <li>
                <button onClick={() => setActivePage('contact-advisory')} className="hover:text-gold-700 transition">
                  Collector Support Desk
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('account')} className="hover:text-gold-700 transition">
                  Track My Acquisitions
                </button>
              </li>
              <li>
                <a
                  href="https://wa.me/2348000000000?text=Hello%20Richbecky%20Gallery%20Curator,%20I%20would%20like%20to%20inquire%20about%20an%20artwork%20acquisition."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
                >
                  WhatsApp Advisory →
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-ivory-300 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 font-medium">
          <div>
            © {new Date().getFullYear()} Richbecky Gallery. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <button onClick={() => setActivePage('policies')} className="hover:text-navy-950 transition">Privacy Policy</button>
            <button onClick={() => setActivePage('policies')} className="hover:text-navy-950 transition">Terms & Conditions</button>
            <button onClick={() => setActivePage('admin-login')} className="hover:text-gold-700 transition text-neutral-500 font-semibold">
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
