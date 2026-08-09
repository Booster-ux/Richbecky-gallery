import React from 'react';
import { X, ZoomIn } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  title: string;
  artistName: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  title,
  artistName
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 text-white hover:text-gold-400 p-2 rounded-full bg-navy-900/60 border border-ivory-300/20 transition"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center">
        <img
          src={imageUrl}
          alt={title}
          className="max-w-full max-h-[80vh] object-contain rounded shadow-2xl border border-gold-500/20"
        />
        <div className="mt-4 text-center text-ivory-100">
          <h3 className="font-serif text-lg font-semibold text-gold-400">{title}</h3>
          <p className="text-xs text-neutral-400 mt-1">{artistName}</p>
        </div>
      </div>
    </div>
  );
};
