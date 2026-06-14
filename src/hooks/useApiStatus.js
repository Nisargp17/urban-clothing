import { useState, useEffect, useCallback, useRef } from 'react';
import { BASE_URL } from '../services/apiConfig';

/**
 * useApiStatus
 *
 * Monitors API connectivity with a lightweight health ping.
 * Returns:
 *   - online: browser navigator.onLine
 * *   - apiReachable: last ping succeeded
 *   - isChecking: ping in flight
 *   - checkNow: manual re-check function
 */

export function useApiStatus(intervalMs = 30000) {
  const [online, setOnline] = useState(() => navigator.onLine);
  const [apiReachable, setApiReachable] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const lastPing = useRef(0);

  const checkNow = useCallback(async () => {
    const now = Date.now();
    // Debounce: don't ping more than once every 5s
    if (now - lastPing.current < 5000) return;
    lastPing.current = now;

    setIsChecking(true);
    try {
      // Ping a lightweight endpoint (products list with limit=1)
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(`${BASE_URL}/products?limit=1`, {
        method: 'HEAD',
        signal: controller.signal,
      });
      clearTimeout(timeout);
      setApiReachable(res.ok || res.status === 404 || res.status === 405);
    } catch {
      setApiReachable(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    const onOnline = () => {
      setOnline(true);
      checkNow();
    };
    const onOffline = () => {
      setOnline(false);
      setApiReachable(false);
    };

    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    // Initial check
    checkNow();

    // Periodic health check
    const id = setInterval(checkNow, intervalMs);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
      clearInterval(id);
    };
  }, [checkNow, intervalMs]);

  return { online, apiReachable, isChecking, checkNow };
}
