import { useState, useCallback } from 'react';

/**
 * Tracks image loading state for blur-up + fade-in effect.
 * Returns { loaded, onLoad } to attach to <img onLoad={onLoad}>.
 */
export function useImageLoad() {
  const [loaded, setLoaded] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  return { loaded, onLoad };
}
