import { formatPrice } from '../../utils/formatPrice';

export function MobileStickyBar({ product, added, onAddToCart }) {
  if (!product) return null;
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-[#f5efe6] border-t-2 border-[#2a2520] px-4 py-3 flex items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] tracking-[0.15em] opacity-40 truncate">{product.title}</p>
        <p className="text-lg font-semibold">{formatPrice(product.newPrice)}</p>
      </div>
      <button
        onClick={onAddToCart}
        disabled={product.stock <= 0}
        className={`h-11 px-6 text-xs tracking-[0.2em] font-medium transition-all ${
          product.stock <= 0
            ? 'bg-[#2a2520]/20 text-[#2a2520]/30 cursor-not-allowed'
            : added
            ? 'bg-[#c4a35a] text-[#2a2520]'
            : 'bg-[#2a2520] text-white'
        }`}
      >
        {product.stock <= 0 ? 'OUT OF STOCK' : added ? 'ADDED ✓' : 'ADD TO KIT'}
      </button>
    </div>
  );
}
