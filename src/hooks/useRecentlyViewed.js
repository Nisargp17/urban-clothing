import { useState, useCallback } from 'react';
import { CART_CONFIG } from '../constants/config';

const STORAGE_KEY = 'urban_recently_viewed';

export function useRecentlyViewed() {
  const [recentIds, setRecentIds] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const trackView = useCallback((productId) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      const next = [productId, ...filtered].slice(0, CART_CONFIG.MAX_RECENTLY_VIEWED);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setRecentIds([]);
  }, []);

  return { recentIds, trackView, clearRecent };
}
