import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../store/apiSlice';
import { formatPrice } from '../utils/formatPrice';

const POPULAR_SEARCHES = ['Urban Trekker', 'Trail Runner', 'SS/25', 'Waterproof', 'Leather'];
const TRENDING = ['Trail Runner', 'Waterproof', 'Leather'];
const RECENT_KEY = 'uc_recent_searches';

function useDebounce(value, delay = 150) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

function getRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]'); } catch { return []; }
}
function saveRecent(term) {
  const prev = getRecent();
  const next = [term, ...prev.filter((t) => t !== term)].slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

export function SearchOverlay({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recents, setRecents] = useState([]);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const debouncedQuery = useDebounce(query, 200);
  const navigate = useNavigate();
  const { data: apiData, isFetching } = useGetProductsQuery(
    { search: debouncedQuery, limit: 6 },
    { skip: !debouncedQuery.trim() }
  );

  const results = useMemo(() => {
    const products = apiData?.products || apiData || [];
    if (!debouncedQuery.trim() || !Array.isArray(products)) return [];
    return products.slice(0, 6);
  }, [debouncedQuery, apiData]);

  const ghostText = useMemo(() => {
    if (!query.trim() || results.length === 0) return '';
    const first = results[0];
    const title = first.title || '';
    if (title.toLowerCase().startsWith(query.toLowerCase())) {
      return title;
    }
    return '';
  }, [query, results]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
      setSelectedIndex(-1);
      setRecents(getRecent());
      return () => clearTimeout(timer);
    }
    document.body.style.overflow = '';
    setQuery('');
    setSelectedIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      const items = results.length > 0 ? results : POPULAR_SEARCHES;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % items.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + items.length) % items.length);
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          const item = items[selectedIndex];
          if (typeof item === 'string') {
            setQuery(item);
            setSelectedIndex(-1);
          } else {
            navigate(`/product/${item.id || item._id}`);
            onClose();
          }
        }
        return;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose, results, selectedIndex, navigate]);

  // Scroll selected item into view
  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current) return;
    const el = listRef.current.children[selectedIndex];
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  const handleResultClick = useCallback((id, title) => {
    if (title) saveRecent(title);
    navigate(`/product/${id}`);
    onClose();
  }, [navigate, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      aria-modal="true"
      role="dialog"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#f5efe6]/98 backdrop-blur-sm" onClick={onClose} />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center pt-24 md:pt-32 px-4 md:px-6">
        <div className="w-full max-w-2xl">
          {/* Search Input */}
          <div className="relative flex items-center border-b border-[#2a2520]/20 focus-within:border-[#c4a35a] transition-colors pb-3">
            <svg className="w-5 h-5 opacity-30 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(-1); }}
                placeholder="Search products, categories, tags..."
                className="w-full bg-transparent text-xl md:text-3xl font-medium outline-none placeholder:opacity-20 relative z-10"
                aria-label="Search query"
              />
              {ghostText && (
                <span className="absolute inset-0 text-xl md:text-3xl font-medium text-[#2a2520]/20 pointer-events-none truncate">
                  {ghostText}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-wider opacity-30 hidden md:block ml-3 border border-[#2a2520]/20 px-1.5 py-0.5 rounded">
              ESC
            </span>
          </div>

          {/* Results / Popular */}
          <div ref={listRef} className="mt-6 space-y-1 max-h-[60vh] overflow-y-auto hide-scrollbar">
            {!query.trim() && (
              <div className="space-y-5">
                {recents.length > 0 && (
                  <div>
                    <p className="text-xs tracking-[0.2em] opacity-30 mb-2">RECENT</p>
                    <div className="flex flex-wrap gap-2">
                      {recents.map((term) => (
                        <button
                          key={term}
                          onClick={() => setQuery(term)}
                          className="px-3 py-1 text-xs tracking-wider border border-[#2a2520]/20 hover:border-[#2a2520] hover:bg-[#2a2520] hover:text-white transition-all"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-xs tracking-[0.2em] opacity-30 mb-2">TRENDING</p>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING.map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1 text-xs tracking-wider border border-[#c4a35a]/40 text-[#c4a35a] hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs tracking-[0.2em] opacity-30 mb-2">POPULAR</p>
                  {POPULAR_SEARCHES.map((term, i) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      onMouseEnter={() => setSelectedIndex(i)}
                      className={`w-full text-left px-3 py-2.5 text-sm md:text-base transition-colors ${
                        selectedIndex === i ? 'bg-[#2a2520] text-white' : 'hover:bg-[#e8ddd0]/40'
                      }`}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() && isFetching && (
              <div className="flex items-center gap-2 py-4">
                <svg className="animate-spin w-4 h-4 opacity-40" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="text-sm opacity-40">Searching...</p>
              </div>
            )}

            {query.trim() && !isFetching && results.length === 0 && (
              <p className="text-sm opacity-40 py-4">No products found for "{query}"</p>
            )}

            {results.map((product, i) => (
              <button
                key={product.id || product._id}
                onClick={() => handleResultClick(product.id || product._id, product.title)}
                onMouseEnter={() => setSelectedIndex(i)}
                className={`w-full flex items-center gap-4 px-3 py-2.5 text-left transition-all ${
                  selectedIndex === i
                    ? 'bg-[#2a2520] text-white'
                    : 'hover:bg-[#e8ddd0]/40'
                }`}
              >
                <div className="w-12 h-12 overflow-hidden flex-shrink-0 bg-[#e8ddd0]">
                  <img
                    src={product.img || product.image || ''}
                    alt=""
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.title}</p>
                  <p className={`text-sm ${selectedIndex === i ? 'opacity-70' : 'opacity-50'}`}>
                    {formatPrice(product.newPrice)} · {product.category}
                  </p>
                </div>
                <svg className={`w-4 h-4 flex-shrink-0 ${selectedIndex === i ? 'opacity-70' : 'opacity-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
