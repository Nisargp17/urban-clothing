import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../store/apiSlice';
import { ProductCard } from '../../components/ProductCard';
import { ProductSkeleton } from '../../components/ProductSkeleton';
import { SEO } from '../../components/SEO';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'mens', label: 'Mens' },
  { id: 'womens', label: 'Womens' },
  { id: 'unisex', label: 'Unisex' },
];

const SORT_OPTIONS = [
  { id: '', label: 'Default' },
  { id: 'price', label: 'Price: Low to High' },
  { id: '-price', label: 'Price: High to Low' },
  { id: 'newest', label: 'Newest' },
];

function SkeletonGrid({ count = 8 }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState('');

  const page = parseInt(searchParams.get('page') || '1', 10);
  const category = searchParams.get('category') || 'all';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';

  const params = useMemo(() => {
    const p = { page, limit: 12 };
    if (category !== 'all') p.category = category;
    if (search) p.search = search;
    if (sort) p.sort = sort;
    return p;
  }, [page, category, search, sort]);

  // Auto-fetches and refetches whenever `params` (page/category/sort/search) change.
  const { data, isLoading, isFetching, error, refetch } = useGetProductsQuery(params);

  const products = useMemo(() => {
    const raw = data?.products || data || [];
    return Array.isArray(raw) ? raw : [];
  }, [data]);

  const pagination = useMemo(() => {
    return {
      page: data?.page ?? page,
      pages: data?.pages ?? 1,
      total: data?.total ?? products.length,
    };
  }, [data, page, products.length]);

  const handleCategoryChange = (cat) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', '1');
    if (cat === 'all') {
      next.delete('category');
    } else {
      next.set('category', cat);
    }
    setSearchParams(next);
  };

  const handleSortChange = (val) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', '1');
    if (!val) {
      next.delete('sort');
    } else {
      next.set('sort', val);
    }
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const next = new URLSearchParams(searchParams);
    next.set('page', '1');
    if (!searchInput.trim()) {
      next.delete('search');
    } else {
      next.set('search', searchInput.trim());
    }
    setSearchParams(next);
  };

  const goToPage = (p) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(p));
    setSearchParams(next, { replace: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SEO title="Shop" description="Browse the full Urban Clothing catalog." pathname="/shop" />
      <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 md:px-[4vw]">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">CATALOG</p>
          <h1 className="text-4xl md:text-6xl font-semibold leading-[0.95]">The Shop</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#2a2520]/10">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-4 py-2 text-xs tracking-[0.15em] font-medium border-2 transition-all ${
                  (cat.id === 'all' && !category) || category === cat.id
                    ? 'border-[#2a2520] bg-[#2a2520] text-white'
                    : 'border-[#2a2520]/20 hover:border-[#2a2520]'
                }`}
              >
                {cat.label.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearchSubmit} className="flex items-center border-2 border-[#2a2520]/20 focus-within:border-[#2a2520] transition-colors">
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search..."
                className="bg-transparent px-3 py-2 text-sm outline-none w-32 sm:w-44"
              />
              <button type="submit" className="px-3 py-2 text-xs tracking-wider hover:bg-[#2a2520] hover:text-white transition-colors">
                GO
              </button>
            </form>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border-2 border-[#2a2520]/20 px-3 py-2 text-xs tracking-wider outline-none focus:border-[#2a2520] bg-white"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active search tag */}
        {search && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs opacity-60">Results for:</span>
            <span className="text-xs tracking-wider px-2 py-1 bg-[#2a2520] text-white">{search}</span>
            <button
              onClick={() => {
                const next = new URLSearchParams(searchParams);
                next.delete('search');
                setSearchParams(next);
                setSearchInput('');
              }}
              className="text-xs underline opacity-40 hover:opacity-100"
            >
              Clear
            </button>
          </div>
        )}

        {/* Loading (initial or pagination) */}
        {(isLoading || isFetching) && <SkeletonGrid count={12} />}

        {/* Error */}
        {error && !isLoading && !isFetching && (
          <div className="text-center py-20">
            <p className="text-sm text-red-600 mb-2">Failed to load products.</p>
            <p className="text-xs opacity-50 mb-4">{error.data?.message || error.error || 'Please try again.'}</p>
            <button
              onClick={refetch}
              className="px-6 py-2 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
            >
              RETRY
            </button>
          </div>
        )}

        {/* Products grid - only show when NOT loading AND NOT fetching */}
        {!isLoading && !isFetching && !error && (
          <>
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm opacity-40 mb-2">No products found.</p>
                <p className="text-xs opacity-30">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id || product._id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                {isFetching && !isLoading && (
                  <span className="flex items-center gap-2 text-xs opacity-40 mr-2">
                    <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                    </svg>
                    Loading...
                  </span>
                )}
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1 || isFetching}
                  className="w-10 h-10 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                {Array.from({ length: pagination.pages }).map((_, i) => {
                  const p = i + 1;
                  const isActive = p === page;
                  // Show first, last, current, and neighbors
                  if (
                    p === 1 ||
                    p === pagination.pages ||
                    (p >= page - 1 && p <= page + 1)
                  ) {
                    return (
                      <button
                        key={p}
                        onClick={() => goToPage(p)}
                        disabled={isFetching}
                        className={`w-10 h-10 text-xs font-medium border-2 transition-all disabled:opacity-40 ${
                          isActive
                            ? 'border-[#2a2520] bg-[#2a2520] text-white'
                            : 'border-[#2a2520]/20 hover:border-[#2a2520]'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  }
                  if (p === page - 2 || p === page + 2) {
                    return (
                      <span key={p} className="text-xs opacity-30 px-1">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= pagination.pages || isFetching}
                  className="w-10 h-10 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}

            <p className="text-center text-xs opacity-30 mt-4">
              Showing {products.length} of {pagination.total} products
            </p>
          </>
        )}
      </div>
    </>
  );
}
