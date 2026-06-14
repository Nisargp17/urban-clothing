import { memo, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useCartContext, useWishlistContext } from '../hooks/useRedux';
import { useImageLoad } from '../hooks/useImageLoad';
import { TiltCard } from './TiltCard';
import { formatPrice } from '../utils/formatPrice';
import { Button } from './ui/Button';

const BADGE_STYLES = {
  new: 'bg-[#c4a35a] text-[#2a2520]',
  sale: 'bg-red-600 text-white',
  trending: 'bg-[#2a2520] text-white',
  bestseller: 'bg-[#c4a35a] text-[#2a2520]',
  premium: 'bg-[#2a2520] text-white',
  street: 'bg-[#2a2520] text-white',
  classic: 'bg-[#2a2520] text-white',
};

const StockBadge = memo(function StockBadge({ stock }) {
  if (stock <= 0) return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#2a2520]/10 text-[#2a2520]/50">Out of Stock</span>;
  if (stock <= 5) return <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-red-600/90 text-white">Only {stock} left</span>;
  return null;
});

export const ProductCard = memo(function ProductCard({ product, showAddToCart = true }) {
  const { addToCart, toggleDrawer } = useCartContext();
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const { loaded, failed, onLoad, onError } = useImageLoad();
  const imageRef = useRef(null);
  const liked = isInWishlist(product.id || product._id);
  const productId = product.id || product._id;

  const flyToCart = useCallback(() => {
    const imgEl = imageRef.current;
    const cartEl = document.getElementById('cart-target');
    if (!imgEl || !cartEl) return false;

    const imgRect = imgEl.getBoundingClientRect();
    const cartRect = cartEl.getBoundingClientRect();

    const clone = imgEl.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.left = `${imgRect.left}px`;
    clone.style.top = `${imgRect.top}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.objectFit = 'cover';
    clone.style.zIndex = '9999';
    clone.style.pointerEvents = 'none';
    clone.style.borderRadius = '0px';
    document.body.appendChild(clone);

    gsap.to(clone, {
      left: cartRect.left + cartRect.width / 2 - 20,
      top: cartRect.top + cartRect.height / 2 - 20,
      width: 40,
      height: 40,
      opacity: 0.4,
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        gsap.to(clone, {
          opacity: 0,
          scale: 0.5,
          duration: 0.15,
          onComplete: () => clone.remove(),
        });
      },
    });
    return true;
  }, []);

  const performAddToCart = useCallback((delayDrawer = true) => {
    addToCart(product, 1);
    if (delayDrawer) {
      setTimeout(() => toggleDrawer(), 900);
    } else {
      toggleDrawer();
    }
  }, [addToCart, product, toggleDrawer]);

  const handleAddToCart = useCallback((e) => {
    e?.stopPropagation?.();
    const didFly = flyToCart();
    if (didFly) {
      // Add to cart immediately but delay drawer until fly animation finishes (~850ms)
      performAddToCart(true);
    } else {
      performAddToCart(false);
    }
  }, [flyToCart, performAddToCart]);

  const handleWishlist = useCallback((e) => {
    e?.stopPropagation?.();
    toggleWishlist(product);
  }, [toggleWishlist, product]);

  const discount = product.oldPrice && product.newPrice != null
    ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
    : 0;

  const primaryTag = product.tags?.[0];

  return (
    <TiltCard maxTilt={6} className="group">
      <div className="relative flex flex-col items-center border-[3px] border-[#2a2520] bg-[#e8ddd0] p-3 md:p-4 transition-all duration-300 hover:shadow-[6px_6px_0px_0px_#2a2520]">
        {/* Wishlist heart */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
            liked
              ? 'bg-red-600 text-white opacity-100'
              : 'bg-[#2a2520] text-white opacity-0 group-hover:opacity-100 hover:bg-[#c4a35a] hover:text-[#2a2520]'
          }`}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick add badge */}
        <button
          onClick={handleAddToCart}
          className="absolute top-11 right-2 z-20 w-8 h-8 bg-[#2a2520] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#c4a35a] hover:text-[#2a2520]"
          aria-label="Add to cart"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>

        {/* Clickable product area */}
        <Link
          to={`/product/${productId}`}
          data-cursor="VIEW"
          className="flex flex-col items-center w-full flex-1"
        >
          {/* Badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
            {primaryTag && (
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${BADGE_STYLES[primaryTag] || 'bg-[#2a2520] text-white'}`}>
                {primaryTag}
              </span>
            )}
            {discount > 0 && (
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-red-600 text-white">
                -{discount}%
              </span>
            )}
            <StockBadge stock={product.stock} />
          </div>

          <div className={`w-full aspect-square overflow-hidden mb-3 md:mb-4 ${!loaded ? 'shimmer' : ''}`}>
            {(product.img || product.image) && !failed ? (
              <img
                ref={imageRef}
                src={product.img || product.image}
                alt={product.title}
                onLoad={onLoad}
                onError={onError}
                className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-[#2a2520]/5 text-[#2a2520]/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-[9px] tracking-wider uppercase">No image</span>
              </div>
            )}
          </div>

          <div className="text-[10px] md:text-sm tracking-[0.2em] mb-1 opacity-70">SS/25</div>

          <h3 className="text-xl md:text-3xl font-semibold mb-1 md:mb-2 tracking-tight">{product.title}</h3>

          <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
            {product.oldPrice && (
              <span className="text-xs md:text-sm line-through opacity-50">{formatPrice(product.oldPrice)}</span>
            )}
            <span className="text-base md:text-lg font-medium">{formatPrice(product.newPrice)}</span>
          </div>
        </Link>

        {showAddToCart && (
          <Button
            variant="secondary"
            className="w-full py-2 text-xs md:text-sm opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-2 group-hover:translate-y-0"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </div>
    </TiltCard>
  );
});
