import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';
import { PRODUCTS } from '../../data/products';
import { useCartContext, useWishlistContext } from '../../hooks/useRedux';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { formatPrice } from '../../utils/formatPrice';
import { SEO } from '../../components/SEO';
import { JsonLdProduct } from '../../components/JsonLd';
import { SizeGuide } from '../../components/SizeGuide';

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'shipping', label: 'Shipping & Returns' },
  { id: 'reviews', label: 'Reviews' },
];

const FEATURES = [
  'Handcrafted with premium full-grain leather',
  'Breathable mesh lining for all-day comfort',
  'Durable rubber outsole with urban tread pattern',
  'Cushioned insole with arch support',
];

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCartContext();
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const { trackView, recentIds } = useRecentlyViewed();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const imgRef = useRef(null);

  const product = PRODUCTS.find((p) => p.id === Number(id));
  const relatedProducts = useMemo(
    () => PRODUCTS.filter((p) => p.id !== Number(id)).slice(0, 4),
    [id]
  );

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-24">
        <h1 className="text-4xl font-semibold mb-4">Product Not Found</h1>
        <button
          onClick={() => navigate('/shop')}
          className="px-8 py-3 bg-[#2a2520] text-white text-sm tracking-[0.2em] hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
        >
          BACK TO SHOP
        </button>
      </div>
    );
  }

  useEffect(() => {
    trackView(product.id);
  }, [product.id, trackView]);

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

  const handleAddToCart = () => {
    if (product.sizes?.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
    : 0;

  const liked = isInWishlist(product.id);

  const recentlyViewed = useMemo(() => {
    const others = recentIds.filter((rid) => rid !== product.id).slice(0, 4);
    return others.map((id) => PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  }, [recentIds, product.id]);

  return (
    <>
      <SEO title={product.title} description={product.description} pathname={`/product/${product.id}`} type="product" />
      <JsonLdProduct name={product.title} description={product.description} image={product.img} price={product.newPrice} />

      <div className="min-h-screen pt-16 md:pt-0">
        {/* Breadcrumb */}
        <div className="px-4 md:px-[4vw] pt-20 md:pt-24 pb-4">
          <div className="flex items-center gap-2 text-xs md:text-sm opacity-40">
            <Link to="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link to="/shop" className="hover:underline">Shop</Link>
            <span>/</span>
            <span className="truncate max-w-[120px] md:max-w-none">{product.title}</span>
          </div>
        </div>

        {/* Hero — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Image */}
          <div
            className="relative overflow-hidden bg-[#e8ddd0] cursor-crosshair aspect-square lg:aspect-auto lg:min-h-screen"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              ref={imgRef}
              src={product.img}
              alt={product.title}
              className="w-full h-full object-cover will-change-transform"
            />
            {/* Tags overlay */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 flex gap-2">
              {product.tags?.[0] && (
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 bg-[#c4a35a] text-[#2a2520]">
                  {product.tags[0]}
                </span>
              )}
              {discount > 0 && (
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 bg-red-600 text-white">
                  -{discount}%
                </span>
              )}
            </div>
            {/* Border */}
            <div className="absolute inset-0 border-[3px] md:border-[5px] border-[#2a2520] pointer-events-none" />
          </div>

          {/* Details */}
          <div className="px-4 md:px-[4vw] py-8 md:py-16 lg:py-24 flex flex-col justify-center">
            <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-3">
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
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] px-2 py-0.5 bg-[#c4a35a] text-[#2a2520]">
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
                  <label className="text-[10px] md:text-xs tracking-[0.2em] opacity-40">SELECT SIZE</label>
                  <button
                    onClick={() => setSizeGuideOpen(true)}
                    className="text-[10px] md:text-xs tracking-[0.15em] underline opacity-40 hover:opacity-80 transition-opacity"
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
                {sizeError && (
                  <p className="text-xs text-red-600 mt-2 tracking-wide">Please select a size</p>
                )}
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
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className={`flex-1 h-14 text-sm tracking-[0.2em] font-medium transition-all duration-300 ${
                  product.stock <= 0
                    ? 'bg-[#2a2520]/20 text-[#2a2520]/30 cursor-not-allowed'
                    : added
                    ? 'bg-[#c4a35a] text-[#2a2520]'
                    : 'bg-[#2a2520] text-white hover:bg-[#c4a35a] hover:text-[#2a2520]'
                }`}
              >
                {product.stock <= 0 ? 'OUT OF STOCK' : added ? 'ADDED ✓' : 'ADD TO CART'}
              </button>
              <button
                onClick={() => toggleWishlist(product)}
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
            <div className="flex flex-wrap gap-4 text-[10px] md:text-xs tracking-wider opacity-40">
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

        {/* Tabs Section */}
        <div className="px-4 md:px-[4vw] py-12 md:py-20 border-t border-[#2a2520]/10">
          <div className="max-w-4xl">
            <div className="flex gap-8 md:gap-12 border-b border-[#2a2520]/10 mb-8">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-xs md:text-sm tracking-[0.2em] transition-all relative ${
                    activeTab === tab.id
                      ? 'text-[#2a2520] font-medium'
                      : 'opacity-30 hover:opacity-60'
                  }`}
                >
                  {tab.label.toUpperCase()}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#2a2520]" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[160px]">
              {activeTab === 'description' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                  <div>
                    <p className="text-sm md:text-base opacity-70 leading-relaxed">
                      {product.description || 'Premium urban trekking footwear designed for the modern explorer. Crafted with high-quality materials and cutting-edge design for all-day comfort and style.'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs tracking-[0.2em] opacity-40 mb-4">FEATURES</p>
                    <ul className="space-y-3">
                      {FEATURES.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm opacity-70">
                          <span className="w-1.5 h-1.5 bg-[#c4a35a] mt-1.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {activeTab === 'shipping' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm opacity-70 leading-relaxed">
                  <div className="p-6 border-2 border-[#2a2520]/10">
                    <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">DOMESTIC</p>
                    <p className="font-medium text-base mb-1">3-5 Business Days</p>
                    <p>Free on orders over Rs. 5,000</p>
                  </div>
                  <div className="p-6 border-2 border-[#2a2520]/10">
                    <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">INTERNATIONAL</p>
                    <p className="font-medium text-base mb-1">7-14 Business Days</p>
                    <p>Rates calculated at checkout</p>
                  </div>
                  <div className="p-6 border-2 border-[#2a2520]/10">
                    <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">RETURNS</p>
                    <p className="font-medium text-base mb-1">30-Day Window</p>
                    <p>Unworn items with original tags</p>
                  </div>
                  <div className="p-6 border-2 border-[#2a2520]/10">
                    <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">EXCHANGES</p>
                    <p className="font-medium text-base mb-1">Free Size Exchanges</p>
                    <p>Available within India</p>
                  </div>
                </div>
              )}
              {activeTab === 'reviews' && (
                <div className="text-center py-12">
                  <p className="text-lg opacity-40 mb-2">No reviews yet</p>
                  <p className="text-sm opacity-30">Be the first to review this product</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="px-4 md:px-[4vw] py-12 md:py-20 border-t border-[#2a2520]/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-2">BACK AGAIN</p>
                <h2 className="text-3xl md:text-5xl font-semibold leading-[0.95]">Recently<br />Viewed</h2>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4">
              {recentlyViewed.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group flex-shrink-0 w-[60vw] md:w-[22vw] lg:w-[18vw]"
                >
                  <div className="aspect-square overflow-hidden bg-[#e8ddd0] border-2 border-[#2a2520] mb-3">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs tracking-[0.2em] opacity-40 mb-1">{p.category}</p>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:underline">{p.title}</h3>
                  <p className="text-sm font-medium">{formatPrice(p.newPrice)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Products — horizontal scroll */}
        {relatedProducts.length > 0 && (
          <div className="px-4 md:px-[4vw] py-12 md:py-20 border-t border-[#2a2520]/10">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-2">COMPLETE THE LOOK</p>
                <h2 className="text-3xl md:text-5xl font-semibold leading-[0.95]">You May<br />Also Like</h2>
              </div>
              <Link to="/shop" className="text-xs md:text-sm tracking-[0.2em] opacity-40 hover:opacity-80 transition-opacity hidden md:block">
                VIEW ALL
              </Link>
            </div>
            <div className="flex gap-4 md:gap-6 overflow-x-auto hide-scrollbar pb-4">
              {relatedProducts.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group flex-shrink-0 w-[60vw] md:w-[22vw] lg:w-[18vw]"
                >
                  <div className="aspect-square overflow-hidden bg-[#e8ddd0] border-2 border-[#2a2520] mb-3">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs tracking-[0.2em] opacity-40 mb-1">{p.category}</p>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:underline">{p.title}</h3>
                  <p className="text-sm font-medium">{formatPrice(p.newPrice)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-[#f5efe6] border-t-2 border-[#2a2520] px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[10px] tracking-[0.15em] opacity-40 truncate">{product.title}</p>
          <p className="text-lg font-semibold">{formatPrice(product.newPrice)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
          className={`h-11 px-6 text-xs tracking-[0.2em] font-medium transition-all ${
            product.stock <= 0
              ? 'bg-[#2a2520]/20 text-[#2a2520]/30 cursor-not-allowed'
              : added
              ? 'bg-[#c4a35a] text-[#2a2520]'
              : 'bg-[#2a2520] text-white'
          }`}
        >
          {product.stock <= 0 ? 'OUT OF STOCK' : added ? 'ADDED ✓' : 'ADD TO CART'}
        </button>
      </div>

      <SizeGuide isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />
    </>
  );
}
