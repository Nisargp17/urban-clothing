import { useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';

export function ProductHero({
  product,
  selectedSize,
  setSelectedSize,
  quantity,
  setQuantity,
  sizeError,
  setSizeError,
  added,
  setAdded,
  addedTimerRef,
  liked,
  onAddToCart,
  onToggleWishlist,
  onSizeGuideOpen,
}) {
  const imgRef = useRef(null);
  const heroContainerRef = useRef(null);

  const discount = product.oldPrice && product.newPrice != null
    ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
    : 0;

  const productImage = product.img || product.image || '';

  const handleMouseMove = (e) => {
    if (!imgRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
    gsap.to(imgRef.current, { x, y, scale: 1.05, duration: 0.8, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' });
  };

  const handleAdd = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    if (imgRef.current) onAddToCart(imgRef.current);
    else onAddToCart();
    setAdded(true);
    if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    addedTimerRef.current = setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-0 max-w-[1600px] mx-auto">
      {/* Image */}
      <div
        ref={heroContainerRef}
        className="relative overflow-hidden bg-[#e8ddd0] cursor-crosshair aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[82vh] lg:max-h-[780px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img
          ref={imgRef}
          src={productImage}
          alt={product.title}
          className="w-full h-full object-cover object-center will-change-transform image-breathe"
          decoding="async"
        />
        <div className="absolute top-4 left-4 md:top-8 md:left-8 flex gap-2">
          {product.tags?.[0] && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 bg-[#c4a35a] text-[#2a2520]">
              {product.tags[0]}
            </span>
          )}
          {discount > 0 && (
            <span className="text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 bg-red-600 text-white">
              -{discount}%
            </span>
          )}
        </div>
        <div className="absolute inset-0 border-[3px] md:border-[5px] border-[#2a2520] pointer-events-none" />
      </div>

      {/* Details */}
      <div className="px-4 md:px-[4vw] py-8 md:py-12 lg:py-16 flex flex-col justify-center">
        <p className="text-xs tracking-[0.3em] opacity-40 mb-3">
          {product.category} / {product.season || 'SS/25'}
        </p>
        <h1 className="text-[12vw] md:text-[5vw] lg:text-[4vw] font-semibold leading-[0.9] tracking-tight mb-6">
          {product.title}
        </h1>

        <div className="flex items-baseline gap-3 mb-8">
          {product.oldPrice && (
            <span className="text-lg md:text-xl opacity-40 line-through">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-3xl md:text-4xl font-medium">{formatPrice(product.newPrice)}</span>
          {discount > 0 && (
            <span className="text-xs font-bold tracking-[0.2em] px-2 py-0.5 bg-[#c4a35a] text-[#2a2520]">
              SAVE {discount}%
            </span>
          )}
        </div>

        <p className="text-sm md:text-base opacity-70 mb-10 leading-relaxed max-w-md">
          {product.description || 'Premium urban trekking footwear designed for the modern explorer. Crafted with high-quality materials and cutting-edge design for all-day comfort and style.'}
        </p>

        {/* Stock badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="mb-4 flex items-center gap-2 text-sm text-red-600 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Only {product.stock} left in stock
          </div>
        )}
        {product.stock <= 0 && (
          <div className="mb-4 flex items-center gap-2 text-sm opacity-40 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Out of stock
          </div>
        )}

        {/* Size Selector */}
        {product.sizes?.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs tracking-[0.2em] opacity-40">SELECT SIZE</label>
              <button
                onClick={onSizeGuideOpen}
                className="text-xs tracking-[0.15em] underline opacity-40 hover:opacity-80 transition-opacity"
              >
                SIZE GUIDE
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => { setSelectedSize(size); setSizeError(false); }}
                  className={`w-12 h-12 md:w-14 md:h-14 border-2 text-sm md:text-base font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-[#2a2520] text-white border-[#2a2520]'
                      : sizeError
                      ? 'bg-transparent text-[#2a2520] border-red-400'
                      : 'bg-transparent text-[#2a2520] border-[#2a2520]/30 hover:border-[#2a2520]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {sizeError && <p className="text-xs text-red-600 mt-2 tracking-wide">Please select a size</p>}
          </div>
        )}

        {/* Quantity + Add to Cart row */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center border-2 border-[#2a2520]">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-12 h-14 flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-colors text-lg"
            >
              −
            </button>
            <span className="w-12 text-center font-medium text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-12 h-14 flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-colors text-lg"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAdd}
            disabled={product.stock <= 0}
            className={`flex-1 h-14 text-sm tracking-[0.2em] font-medium transition-all duration-300 ${
              product.stock <= 0
                ? 'bg-[#2a2520]/20 text-[#2a2520]/30 cursor-not-allowed'
                : added
                ? 'bg-[#c4a35a] text-[#2a2520]'
                : 'bg-[#2a2520] text-white hover:bg-[#c4a35a] hover:text-[#2a2520]'
            }`}
          >
            {product.stock <= 0 ? 'OUT OF STOCK' : added ? 'ADDED ✓' : 'ADD TO KIT'}
          </button>
          <button
            onClick={onToggleWishlist}
            className={`w-14 h-14 border-2 flex items-center justify-center transition-all duration-300 ${
              liked
                ? 'bg-red-600 border-red-600 text-white'
                : 'border-[#2a2520]/30 text-[#2a2520] hover:border-[#2a2520]'
            }`}
            aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-4 text-xs tracking-wider opacity-40">
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            FREE SHIPPING OVER RS. 5,000
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            30-DAY RETURNS
          </span>
        </div>
      </div>
    </div>
  );
}
