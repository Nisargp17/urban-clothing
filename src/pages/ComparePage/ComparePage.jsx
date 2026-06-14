import { Link } from 'react-router-dom';
import { useGetProductsQuery } from '../../store/apiSlice';
import { useCompare } from '../../context/CompareContext';
import { formatPrice } from '../../utils/formatPrice';
import { SEO } from '../../components/SEO';

export default function ComparePage() {
  const { ids, remove, clear } = useCompare();
  const { data: apiData } = useGetProductsQuery();
  const products = apiData?.products || apiData || [];

  const compared = products.filter((p) => ids.includes(p.id || p._id));

  if (compared.length < 2) {
    return (
      <div className="min-h-screen bg-[#f5efe6] pt-24 px-6 flex flex-col items-center justify-center text-center">
        <SEO title="Compare" description="Compare Urban Clothing products side by side." pathname="/compare" />
        <h2 className="text-2xl font-semibold mb-2">Select Products to Compare</h2>
        <p className="text-sm opacity-50 mb-6">Add at least 2 products from the shop.</p>
        <Link to="/shop" className="px-6 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors">
          GO TO SHOP
        </Link>
      </div>
    );
  }

  const attributes = [
    { key: 'category', label: 'Category' },
    { key: 'newPrice', label: 'Price', fmt: (v) => formatPrice(v) },
    { key: 'oldPrice', label: 'Old Price', fmt: (v) => (v ? formatPrice(v) : '—') },
    { key: 'stock', label: 'Stock', fmt: (v) => (v > 0 ? `${v} left` : 'Sold out') },
    { key: 'tags', label: 'Tags', fmt: (v) => (Array.isArray(v) ? v.join(', ') : v) },
  ];

  return (
    <div className="min-h-screen bg-[#f5efe6] pt-20 md:pt-24 pb-16">
      <SEO title="Compare" description="Compare Urban Clothing products side by side." pathname="/compare" />
      <div className="px-4 md:px-[4vw]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-1">COMPARE</p>
            <h2 className="text-2xl md:text-3xl font-semibold">Side by Side</h2>
          </div>
          <button
            onClick={clear}
            className="text-xs tracking-wider underline opacity-40 hover:opacity-80 transition-opacity"
          >
            CLEAR ALL
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto hide-scrollbar">
          <div className="grid" style={{ gridTemplateColumns: `140px repeat(${compared.length}, minmax(180px, 1fr))` }}>
            {/* Header row */}
            <div className="sticky left-0 bg-[#f5efe6] z-10" />
            {compared.map((p) => (
              <div key={p.id || p._id} className="p-3 text-center">
                <div className="aspect-[4/5] bg-[#e8ddd0] mb-3 overflow-hidden">
                  <img src={p.img || p.image || ''} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => remove(p.id || p._id)}
                  className="text-[10px] tracking-wider opacity-30 hover:opacity-80 mb-2 transition-opacity"
                >
                  REMOVE
                </button>
                <p className="text-sm font-semibold leading-tight">{p.title}</p>
                <p className="text-xs text-[#c4a35a] font-medium mt-1">{formatPrice(p.newPrice)}</p>
                <Link
                  to={`/product/${p.id || p._id}`}
                  className="inline-block mt-2 px-4 py-1.5 bg-[#2a2520] text-white text-[10px] tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
                >
                  VIEW
                </Link>
              </div>
            ))}

            {/* Attribute rows */}
            {attributes.map((attr) => {
              const values = compared.map((p) => p[attr.key]);
              const allSame = values.every((v) => JSON.stringify(v) === JSON.stringify(values[0]));
              return (
                <div key={attr.key} className="contents">
                  <div className={`sticky left-0 bg-[#f5efe6] z-10 py-3 px-2 text-xs tracking-wider font-medium border-t border-[#2a2520]/10 ${allSame ? 'opacity-30' : ''}`}>
                    {attr.label}
                  </div>
                  {compared.map((p) => {
                    const val = p[attr.key];
                    const display = attr.fmt ? attr.fmt(val) : val ?? '—';
                    const isDiff = !allSame;
                    return (
                      <div
                        key={`${attr.key}-${p.id || p._id}`}
                        className={`py-3 px-2 text-center text-sm border-t border-[#2a2520]/10 ${isDiff ? 'bg-[#c4a35a]/5' : ''}`}
                      >
                        {display}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
