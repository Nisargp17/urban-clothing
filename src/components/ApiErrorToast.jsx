import { useState, useEffect, useRef } from 'react';

/**
 * Global API error toast listener.
 * Subscribes to the 'api-error' CustomEvent dispatched by errorMiddleware.
 */
export function ApiErrorToast() {
  const [message, setMessage] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleError = (e) => {
      const msg = e.detail?.message;
      if (msg) {
        setMessage(msg);
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setMessage(null), 4000);
      }
    };

    window.addEventListener('api-error', handleError);
    return () => {
      window.removeEventListener('api-error', handleError);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] max-w-sm animate-slide-up">
      <div className="border-2 border-red-400 bg-red-50 px-5 py-3 shadow-lg flex items-start gap-3">
        <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p className="text-xs font-medium text-red-700 tracking-wide">Something went wrong</p>
          <p className="text-xs text-red-600 mt-0.5">{message}</p>
        </div>
      </div>
    </div>
  );
}
