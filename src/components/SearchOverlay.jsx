import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/formatPrice';

function useDebounce(value, delay = 200) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 150);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];
    const q = debouncedQuery.toLowerCase();
    return PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(q) ||
      p.tags?.some((t) => t.toLowerCase().includes(q))
    ).slice(0, 5);
  }, [debouncedQuery]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-all duration-500 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#f5efe6]/95 backdrop-blur-md" onClick={onClose} />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center pt-20 md:pt-32 px-6">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Search Input */}
        <div className="w-full max-w-2xl">
          <div className="flex items-center border-b-2 border-[#2a2520] focus-within:border-[#c4a35a] transition-colors pb-2">
            <svg className="w-5 h-5 opacity-40 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 bg-transparent text-2xl md:text-4xl font-medium outline-none placeholder:opacity-30"
            />
            <span className="text-xs opacity-30 hidden md:block">ESC to close</span>
          </div>

          {/* Results */}
          <div className="mt-6 space-y-3">
            {query.trim() && results.length === 0 && (
              <p className="text-lg opacity-40">No products found</p>
            )}
            {results.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                onClick={onClose}
                className="flex items-center gap-4 p-3 border-2 border-transparent hover:border-[#2a2520] hover:bg-[#e8ddd0]/30 transition-all group"
              >
                <div className="w-16 h-16 border-2 border-[#2a2520] overflow-hidden flex-shrink-0">
                  <img src={product.img} alt={product.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate group-hover:underline">{product.title}</p>
                  <p className="text-sm opacity-60">{formatPrice(product.newPrice)}</p>
                </div>
                <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}

            {query.trim() && results.length > 0 && (
              <Link
                to={`/shop`}
                onClick={onClose}
                className="block text-center text-sm underline opacity-60 hover:opacity-100 pt-2"
              >
                View all products
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
