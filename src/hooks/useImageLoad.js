import { useState, useCallback } from 'react';

/**
 * Tracks image loading state for blur-up + fade-in effect.
 * Returns { loaded, failed, onLoad, onError } to attach to an <img>.
 * `failed` lets consumers render a graceful fallback instead of an
 * endless shimmer when a (e.g. backend/CDN) image URL cannot load.
 */
export function useImageLoad() {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const onError = useCallback(() => {
    // Mark as settled so the shimmer/placeholder is removed.
    setFailed(true);
    setLoaded(true);
  }, []);

  return { loaded, failed, onLoad, onError };
}
