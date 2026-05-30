import { useEffect } from 'react';

function logVital(name, value) {
  // Send to analytics in production; log to console in dev
  if (import.meta.env.DEV) {
    console.log(`[Web Vital] ${name}:`, value);
  }
}

export function useWebVitals() {
  useEffect(() => {
    if (!('PerformanceObserver' in window)) return;

    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            logVital('CLS', entry.value);
          }
        }
      });
      clsObserver.observe({ type: 'layout-shift', buffered: true });

      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        logVital('LCP', lastEntry.startTime);
      });
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          logVital('FID', entry.processingStart - entry.startTime);
        }
      });
      fidObserver.observe({ type: 'first-input', buffered: true });

      return () => {
        clsObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
      };
    } catch (e) {
      // Ignore unsupported browsers
    }
  }, []);
}
