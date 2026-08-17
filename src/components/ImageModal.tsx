import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { getProductionImageUrl, handleImageError } from '../services/imageService';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  images?: string[];
  title: string;
  artistName: string;
  initialIndex?: number;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  images,
  title,
  artistName,
  initialIndex = 0
}) => {
  const imageList = images && images.length > 0 ? images : [imageUrl];
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const previousFocusedElement = React.useRef<HTMLElement | null>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    if (isOpen) {
      previousFocusedElement.current = document.activeElement as HTMLElement;
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else if (previousFocusedElement.current) {
      previousFocusedElement.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();

      if (e.key === 'Tab') {
        const focusable = document.querySelectorAll<HTMLElement>(
          '#image-lightbox-modal button, #image-lightbox-modal [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, imageList.length]);

  if (!isOpen) return null;

  const currentImage = imageList[currentIndex] || imageUrl;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) handleNext(); // swipe left
    if (diff < -50) handlePrev(); // swipe right
    setTouchStartX(null);
  };

  return (
    <div
      id="image-lightbox-modal"
      className="fixed inset-0 z-50 bg-navy-950/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fade-in select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="flex items-center justify-between z-50 w-full max-w-7xl mx-auto pt-2 pb-4">
        <div className="space-y-0.5 text-left">
          <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest block">
            Exhibition View • Richbecky Masterwork
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-ivory-100">{title}</h2>
          <p className="text-xs text-neutral-400">By {artistName}</p>
        </div>

        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-950 text-white border border-white/20 transition shadow-lg flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider"
          aria-label="Close Lightbox"
        >
          <X className="w-5 h-5" /> <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Main Exhibition Viewer with Navigation Arrows */}
      <div className="relative flex-1 flex items-center justify-center my-auto w-full max-w-7xl mx-auto">
        {imageList.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-40 p-3.5 rounded-full bg-navy-900/80 hover:bg-gold-500 hover:text-navy-950 text-white border border-ivory-300/20 transition backdrop-blur-md shadow-2xl"
            aria-label="Previous Image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        <div className="w-full h-full flex items-center justify-center p-2 sm:p-6">
          <img
            src={getProductionImageUrl(currentImage, title)}
            alt={`${title} - View ${currentIndex + 1}`}
            onError={(e) => handleImageError(e, title)}
            className="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl border border-gold-500/20 transition-all duration-300 transform scale-100"
          />
        </div>

        {imageList.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-40 p-3.5 rounded-full bg-navy-900/80 hover:bg-gold-500 hover:text-navy-950 text-white border border-ivory-300/20 transition backdrop-blur-md shadow-2xl"
            aria-label="Next Image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Thumbnail Navigation Bar */}
      {imageList.length > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4 pb-2 z-50 overflow-x-auto max-w-full">
          {imageList.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-md overflow-hidden border-2 transition ${
                idx === currentIndex
                  ? 'border-gold-400 scale-105 shadow-gold-glow'
                  : 'border-white/20 opacity-50 hover:opacity-100'
              }`}
            >
              <img
                src={getProductionImageUrl(img, title)}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
