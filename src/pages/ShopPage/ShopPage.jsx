import { memo, useCallback, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { SEO } from '../../components/SEO';
import { PRODUCTS } from '../../data/products';
import { useCartContext, useWishlistContext } from '../../hooks/useRedux';
import { formatPrice } from '../../utils/formatPrice';
import shoelable from '/src/assets/shoelable.svg';

const ShopItem = memo(function ShopItem({ product, onAdd }) {
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      className="item group relative flex flex-col justify-center items-center border-[3px] md:border-[5px] border-[#2a2520] bg-[#e8ddd0] h-[70vh] md:h-[95vh] w-[45vw] md:w-[38vw] overflow-hidden"
    >
      {discount > 0 && (
        <div className="absolute top-3 right-3 bg-[#c4a35a] text-[#2a2520] text-xs font-bold px-2 py-1 z-10">
          -{discount}%
        </div>
      )}

      <div className="w-[35vw] md:w-[30vw] transition-transform duration-500 group-hover:scale-105">
        <img src={product.img} alt={product.title} className="w-full" loading="lazy" />
      </div>

      <img className="h-[2.5vh] md:h-[3vh] mt-2" src={shoelable} alt="label" />
      <div className="text-xs md:text-sm tracking-widest mt-1">SS/20</div>
      <div className="text-[8vw] md:text-[5vw] font-semibold leading-none mt-1">{product.title}</div>

      <div className="flex items-center gap-3 mt-2">
        <div className="text-[3vw] md:text-[1.5vw] line-through opacity-60">
          {formatPrice(product.oldPrice)}
        </div>
        <div className="text-[4vw] md:text-[2vw] font-medium">{formatPrice(product.newPrice)}</div>
      </div>

      {/* Hover overlay with Add to Cart */}
      <div className="absolute inset-0 bg-[#2a2520]/0 group-hover:bg-[#2a2520]/10 transition-all duration-500 pointer-events-none" />
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(product); }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-[#2a2520] text-white px-6 py-2 text-sm font-medium tracking-wider border-2 border-[#2a2520] hover:bg-transparent hover:text-[#2a2520] pointer-events-auto"
      >
        ADD TO CART
      </button>
    </Link>
  );
});

const MobileProductCard = memo(function MobileProductCard({ product, onAdd }) {
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const liked = isInWishlist(product.id);
  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
    : 0;

  const handleWishlist = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  }, [toggleWishlist, product]);

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative block overflow-hidden border-[3px] border-[#2a2520] bg-[#e8ddd0]"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.img}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discount > 0 && (
          <span className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 tracking-wider">
            -{discount}%
          </span>
        )}
        {product.tags?.[0] && (
          <span className="absolute top-3 left-3 bg-[#c4a35a] text-[#2a2520] text-[10px] font-bold px-2 py-1 tracking-wider uppercase">
            {product.tags[0]}
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute bottom-3 left-3 bg-red-600/90 text-white text-[10px] font-bold px-2 py-1 tracking-wider">
            Only {product.stock} left
          </span>
        )}
        <button
          onClick={handleWishlist}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all duration-300 ${
            liked
              ? 'bg-red-600 text-white'
              : 'bg-[#2a2520] text-white opacity-0 group-hover:opacity-100 hover:bg-[#c4a35a] hover:text-[#2a2520]'
          }`}
          aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className="w-4 h-4" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <p className="text-[10px] tracking-[0.2em] opacity-40 mb-1">{product.category} / SS/25</p>
        <h3 className="text-2xl font-semibold leading-tight mb-2">{product.title}</h3>
        <div className="flex items-center gap-2">
          {product.oldPrice && (
            <span className="text-sm line-through opacity-40">{formatPrice(product.oldPrice)}</span>
          )}
          <span className="text-lg font-medium">{formatPrice(product.newPrice)}</span>
        </div>
      </div>
      <button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); onAdd(product); }}
        className="absolute bottom-0 left-0 right-0 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300"
      >
        ADD TO CART
      </button>
    </Link>
  );
});

export default function ShopPage() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const leftAnim = useRef(null);
  const rightAnim = useRef(null);
  const leftScrollTween = useRef(null);
  const rightScrollTween = useRef(null);
  const scrollTimeout = useRef(null);
  const { addToCart: rawAddToCart } = useCartContext();
  const addToCart = useCallback((product) => rawAddToCart(product, 1), [rawAddToCart]);

  const extendedLeft = useMemo(
    () => [PRODUCTS[PRODUCTS.length - 1], ...PRODUCTS, ...PRODUCTS],
    []
  );
  const extendedRight = useMemo(
    () => [...PRODUCTS, ...PRODUCTS, PRODUCTS[0]],
    []
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    let isSetup = false;
    let handleScroll = null;

    function setupAnimations() {
      // Clean up any previous setup
      if (isSetup) {
        document.body.style.overflow = '';
        if (handleScroll) window.removeEventListener('wheel', handleScroll);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        leftAnim.current?.kill();
        rightAnim.current?.kill();
        leftScrollTween.current?.kill();
        rightScrollTween.current?.kill();
        isSetup = false;
      }

      if (!mq.matches) return;

      const leftDiv = leftRef.current;
      const rightDiv = rightRef.current;
      if (!leftDiv || !rightDiv) return;

      document.body.style.overflow = 'hidden';
      isSetup = true;

      const gapVh = 3;
      const vhInPx = window.innerHeight / 100;
      const gapPx = gapVh * vhInPx;

      const firstItem = leftDiv.querySelector('.item');
      if (!firstItem) return;

      const itemHeight = firstItem.offsetHeight + gapPx;
      // FIX: use actual DOM children count, not PRODUCTS.length * 3
      const totalItems = leftDiv.children.length;
      const totalHeight = itemHeight * totalItems;

      leftAnim.current = gsap.to(leftDiv, {
        y: `-=${totalHeight}px`,
        duration: 200,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
        },
      });

      rightAnim.current = gsap.to(rightDiv, {
        y: `+=${totalHeight}px`,
        duration: 200,
        ease: 'none',
        repeat: -1,
        modifiers: {
          y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
        },
      });

      handleScroll = (e) => {
        e.preventDefault();

        const scrollFactor = 0.05;
        const direction = e.deltaY > 0 ? 1 : -1;
        const scrollAmount = direction * itemHeight * scrollFactor;

        leftAnim.current.pause();
        rightAnim.current.pause();

        leftScrollTween.current?.kill();
        rightScrollTween.current?.kill();

        leftScrollTween.current = gsap.to(leftDiv, {
          y: `+=${scrollAmount}px`,
          duration: 1,
          ease: 'power2.out',
          modifiers: {
            y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
          },
        });

        rightScrollTween.current = gsap.to(rightDiv, {
          y: `-=${scrollAmount}px`,
          duration: 1,
          ease: 'power2.out',
          modifiers: {
            y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
          },
        });

        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
          leftAnim.current?.play();
          rightAnim.current?.play();
        }, 3000);
      };

      window.addEventListener('wheel', handleScroll, { passive: false });
    }

    setupAnimations();
    mq.addEventListener('change', setupAnimations);

    return () => {
      mq.removeEventListener('change', setupAnimations);
      if (isSetup) {
        document.body.style.overflow = '';
        if (handleScroll) window.removeEventListener('wheel', handleScroll);
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        leftAnim.current?.kill();
        rightAnim.current?.kill();
        leftScrollTween.current?.kill();
        rightScrollTween.current?.kill();
      }
    };
  }, []);

  return (
    <>
      <SEO title="Shop" description="Shop premium urban trekking footwear. Men's, women's, and unisex styles." pathname="/shop" />

      {/* Mobile — product grid */}
      <div className="md:hidden px-4 pt-20 pb-12">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] opacity-40 mb-2">COLLECTION</p>
          <h1 className="text-4xl font-semibold leading-[0.95]">Shop</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRODUCTS.map((product) => (
            <MobileProductCard key={product.id} product={product} onAdd={addToCart} />
          ))}
        </div>
      </div>

      {/* Desktop — dual-column infinite scroll */}
      <section className="hidden md:flex gap-[2vh] md:gap-[3vh] justify-center items-center h-screen w-full bg-white overflow-hidden pt-14 md:pt-16">
        <div ref={leftRef} className="left-div flex flex-col w-max gap-[2vh] md:gap-[3vh] cursor-grab">
          {extendedLeft.map((shoe, index) => (
            <ShopItem key={`left-${index}`} product={shoe} onAdd={addToCart} />
          ))}
        </div>
        <div ref={rightRef} className="right-div flex flex-col w-max gap-[2vh] md:gap-[3vh] cursor-grab">
          {extendedRight.map((shoe, index) => (
            <ShopItem key={`right-${index}`} product={shoe} onAdd={addToCart} />
          ))}
        </div>
      </section>
    </>
  );
}
