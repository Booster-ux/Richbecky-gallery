// Image Service for Richbecky Gallery
// Production-safe image URL resolution, cache-busting versioning & neutral "Image Unavailable" state

export const ASSET_VERSION = '1.0.2';

/**
 * Returns a neutral SVG Data URI placeholder when an image is unavailable.
 * Strictly avoids displaying unrelated artworks to prevent misleading collectors.
 */
export function getNeutralImagePlaceholder(title?: string): string {
  const label = title ? encodeURIComponent(title) : 'Artwork Image';
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><rect width="600" height="750" fill="%23F4F1EA"/><rect x="2" y="2" width="596" height="746" fill="none" stroke="%23E2DCD0" stroke-width="2"/><g transform="translate(300, 340)" text-anchor="middle"><circle cx="0" cy="-20" r="36" fill="%23E8E3D8"/><path d="M-18 -20 L18 -20 M0 -38 L0 -2" stroke="%23A09888" stroke-width="3" stroke-linecap="round"/><text x="0" y="45" font-family="serif" font-size="16" font-weight="600" fill="%230F2537" letter-spacing="1.5">${label}</text><text x="0" y="70" font-family="sans-serif" font-size="12" fill="%238C8272" letter-spacing="2" font-weight="500">IMAGE UNAVAILABLE</text></g></svg>`;
}

/**
 * Resolves production-ready image URLs with automatic cache-busting parameters.
 * Bypasses stale browser/CDN 404 cache for returning visitors.
 */
export function getProductionImageUrl(url?: string, title?: string): string {
  if (!url) {
    return getNeutralImagePlaceholder(title);
  }

  let finalUrl = url;

  // Handle local Windows file:/// paths by mapping to production public paths
  if (url.startsWith('file:///')) {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];

    if (filename.includes('1786288555178') || filename.includes('isembaye')) {
      finalUrl = '/images/artworks/isembaye.jpg';
    } else if (filename.includes('1786288739763') || filename.includes('this_is_our_way')) {
      finalUrl = '/images/artworks/this_is_our_way.jpg';
    } else if (filename.includes('1786288845976') || filename.includes('first_dialogue')) {
      finalUrl = '/images/artworks/the_first_dialogue.jpg';
    } else if (filename.includes('1786289008243') || filename.includes('under_our_new_garment')) {
      finalUrl = '/images/artworks/under_our_new_garment.jpg';
    } else if (filename.includes('1786289110407') || filename.includes('thought_of_hope')) {
      finalUrl = '/images/artworks/thought_of_hope.jpg';
    } else {
      return getNeutralImagePlaceholder(title);
    }
  }

  // Data URIs do not require cache busting
  if (finalUrl.startsWith('data:')) {
    return finalUrl;
  }

  // Append cache busting version parameter to bypass stale 404 browser cache
  const separator = finalUrl.includes('?') ? '&' : '?';
  return `${finalUrl}${separator}v=${ASSET_VERSION}`;
}

/**
 * React image error handler that gracefully shows a neutral "Image Unavailable" placeholder.
 * Strictly avoids showing unrelated replacement artworks.
 */
export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, title?: string) {
  const target = e.currentTarget;
  if (!target.dataset.hasFallenBack) {
    target.dataset.hasFallenBack = 'true';
    target.src = getNeutralImagePlaceholder(title);
  }
}
