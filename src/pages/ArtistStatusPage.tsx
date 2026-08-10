import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { LOGO_URL } from '../data/mockData';
import { Clock, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

export const ArtistStatusPage: React.FC = () => {
  const { artistApprovalStatus, currentUser, setActivePage, logout } = useGallery();

  const status = artistApprovalStatus || currentUser?.artistApprovalStatus || 'Pending';

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12 animate-fade-in">
      <div className="max-w-lg w-full bg-white p-8 sm:p-10 rounded-2xl border border-ivory-300 shadow-gallery space-y-8 text-center">
        
        <img src={LOGO_URL} alt="Richbecky Gallery" className="h-12 w-auto mx-auto object-contain" />
        <span className="text-gold-700 text-xs font-bold uppercase tracking-widest block">Artist Representation Status</span>

        {/* PENDING STATUS */}
        {status === 'Pending' && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center mx-auto border border-amber-300">
              <Clock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-navy-950">Application Pending Review</h2>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Your artist representation application has been submitted to gallery directors. Curatorial evaluations are completed within 24-48 hours.
              </p>
            </div>

            <div className="p-4 bg-ivory-100 rounded-xl border border-ivory-300 text-xs text-neutral-600 text-left space-y-1">
              <span className="font-bold text-navy-950 block">Next Steps:</span>
              <p>• Once approved by Admin, you will receive full access to the Artist Studio.</p>
              <p>• Check back here using your artist login credentials.</p>
            </div>
          </div>
        )}

        {/* APPROVED STATUS */}
        {status === 'Approved' && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-navy-950">Application Approved</h2>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Congratulations! Richbecky Gallery has approved your representation application. You now have full access to your Artist Studio.
              </p>
            </div>

            <button
              onClick={() => setActivePage('artist-dashboard')}
              className="w-full py-4 bg-navy-950 hover:bg-gold-500 hover:text-navy-950 text-white rounded font-bold uppercase tracking-widest text-xs transition shadow-xl flex items-center justify-center gap-2"
            >
              Enter Artist Studio <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* REJECTED STATUS */}
        {status === 'Rejected' && (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-rose-100 text-rose-800 rounded-full flex items-center justify-center mx-auto border border-rose-300">
              <XCircle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-navy-950">Application Not Approved</h2>
              <p className="text-xs text-neutral-600 font-light leading-relaxed">
                Thank you for your interest in Richbecky Gallery representation. Our curatorial committee is unable to accept your application at this time.
              </p>
            </div>

            <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-900 text-left space-y-1">
              <span className="font-bold block">Curatorial Review Note:</span>
              <p>Application does not currently align with gallery curatorial focus for this exhibition cycle.</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-ivory-200 flex justify-center gap-4 text-xs">
          <button onClick={() => setActivePage('catalogue')} className="text-gold-700 font-bold hover:underline">
            Browse Gallery
          </button>
          <span className="text-neutral-300">|</span>
          <button onClick={logout} className="text-neutral-500 hover:text-navy-950 font-semibold">
            Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};
