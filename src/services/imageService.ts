// Image Service for Richbecky Gallery
// Resolves production-safe image URLs for Vercel deployment & local preview

export const DEFAULT_FALLBACK_IMAGES: Record<string, string> = {
  logo: '/logo.svg',
  'art-1': 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=85',
  'art-2': 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
  'art-3': 'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=1200&q=85',
  'art-4': 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=85',
  'art-5': 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=85',
  category_abstract: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  category_minimalist: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=800&q=80',
  category_figurative: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
  category_sculpture: 'https://images.unsplash.com/photo-1561839561-213b1be4b84a?auto=format&fit=crop&w=800&q=80',
  category_landscape: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=800&q=80',
};

/**
 * Returns a production-ready image URL.
 * Handles local file:/// paths by attempting to use public relative paths or web fallbacks.
 */
export function getProductionImageUrl(url: string, fallbackKey?: keyof typeof DEFAULT_FALLBACK_IMAGES): string {
  if (!url) {
    return fallbackKey && DEFAULT_FALLBACK_IMAGES[fallbackKey] ? DEFAULT_FALLBACK_IMAGES[fallbackKey] : '/logo.svg';
  }

  // If URL is a local Windows file:/// path, transform or fallback for Vercel production
  if (url.startsWith('file:///')) {
    // Extract filename from path
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    
    // Check if filename matches known artwork images
    if (filename.includes('1786288555178') || filename.includes('isembaye')) {
      return `/images/${filename}`;
    }
    if (filename.includes('1786288739763') || filename.includes('this_is_our_way')) {
      return `/images/${filename}`;
    }
    if (filename.includes('1786288845976') || filename.includes('first_dialogue')) {
      return `/images/${filename}`;
    }
    if (filename.includes('1786289008243') || filename.includes('under_our_new_garment')) {
      return `/images/${filename}`;
    }
    if (filename.includes('1786289110407') || filename.includes('thought_of_hope')) {
      return `/images/${filename}`;
    }

    // Default web fallback for Vercel
    if (fallbackKey && DEFAULT_FALLBACK_IMAGES[fallbackKey]) {
      return DEFAULT_FALLBACK_IMAGES[fallbackKey];
    }
    return `https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80`;
  }

  return url;
}

/**
 * React Image error handler that gracefully replaces broken images with fallback
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallbackUrl?: string) {
  const target = e.currentTarget;
  if (!target.dataset.hasFallenBack) {
    target.dataset.hasFallenBack = 'true';
    target.src = fallbackUrl || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80';
  }
}
