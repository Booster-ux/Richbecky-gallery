import React from 'react';
import { useGallery } from '../context/GalleryContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastNotification: React.FC = () => {
  const { toast, hideToast } = useGallery();

  if (!toast.visible) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0" />,
    info: <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md bg-navy-900 text-ivory-100 border border-gold-500/40 rounded-xl p-4 shadow-2xl flex items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center gap-3">
        {icons[toast.type]}
        <span className="text-xs sm:text-sm font-medium leading-relaxed">{toast.message}</span>
      </div>
      <button
        onClick={hideToast}
        className="text-neutral-400 hover:text-white p-1 rounded-full transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
