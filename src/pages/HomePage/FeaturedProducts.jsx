import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { PRODUCTS } from '../../data/products';
import { useWishlistContext } from '../../hooks/useRedux';
import { useImageLoad } from '../../hooks/useImageLoad';
import { formatPrice } from '../../utils/formatPrice';
import circle from '/src/assets/circle.svg';
import arrow from '/src/assets/arrow.svg';

gsap.registerPlugin(Draggable);

function FeaturedCard({ product, isActive }) {
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const { toggleWishlist, isInWishlist } = useWishlistContext();
  const liked = isInWishlist(product.id);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || !imgRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(imgRef.current, {
      x: x * 20,
      y: y * 20,
      scale: 1.08,
      duration: 0.6,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' });
  };

  const { loaded, onLoad } = useImageLoad();

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)
    : 0;

  return (
    <Link
      to={`/product/${product.id}`}
      ref={cardRef}
      data-cursor="EXPLORE"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative flex-shrink-0 block overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        w-[70vw] md:w-[34vw] lg:w-[30vw] h-[55vh] md:h-[65vh]
        ${isActive ? 'opacity-100 scale-100 shadow-[0_20px_60px_rgba(42,37,32,0.15)]' : 'opacity-50 scale-[0.97]'}
      `}
    >
      {/* Image with parallax container */}
      <div className={`absolute inset-0 overflow-hidden ${!loaded ? 'shimmer' : ''}`}>
        <img
          ref={imgRef}
          src={product.img}
          alt={product.title}
          onLoad={onLoad}
          className={`w-full h-full object-cover will-change-transform transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a2520]/70 via-[#2a2520]/10 to-transparent" />
      </div>

      {/* Top badges */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 flex gap-2">
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

      {/* Wishlist heart */}
      <button
        onClick={handleWishlist}
        className={`absolute top-4 right-4 md:top-6 md:right-6 z-10 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center transition-all duration-300 ${
          liked
            ? 'bg-red-600 text-white opacity-100'
            : 'bg-white/10 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 hover:bg-white hover:text-[#2a2520]'
        }`}
        aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg className="w-4 h-4 md:w-5 md:h-5" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Explore hover badge */}
      <div className="absolute top-14 right-4 md:top-16 md:right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase text-white border border-white/40 px-3 py-1 backdrop-blur-sm bg-white/10">
          Explore
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 z-10">
        <div className="text-[10px] md:text-xs tracking-[0.3em] text-white/60 mb-1 md:mb-2 uppercase">
          {product.category} / {product.season || 'SS/25'}
        </div>
        <h3 className="text-[9vw] md:text-[2.8vw] lg:text-[2.4vw] font-semibold text-white leading-[0.95] tracking-tight mb-2 md:mb-3">
          {product.title}
        </h3>
        <div className="flex items-center gap-3">
          {product.oldPrice && (
            <span className="text-sm md:text-base text-white/50 line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
          <span className="text-lg md:text-2xl font-medium text-white">
            {formatPrice(product.newPrice)}
          </span>
        </div>
      </div>

      {/* Border frame */}
      <div className="absolute inset-0 border-[3px] md:border-[4px] border-[#2a2520] pointer-events-none" />
      <div className="absolute inset-0 border-[3px] md:border-[4px] border-white/0 group-hover:border-white/20 transition-colors duration-500 pointer-events-none" />
    </Link>
  );
}

export function FeaturedProducts() {
  const scrollContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const itemWidthRef = useRef(0);
  const gapRef = useRef(0);
  const progressRef = useRef(null);

  const featured = PRODUCTS.filter((p) => p.isFeatured).slice(0, 5);

  const updateProgress = useCallback((index) => {
    if (progressRef.current) {
      const pct = ((index + 1) / featured.length) * 100;
      gsap.to(progressRef.current, { scaleX: pct / 100, duration: 0.5, ease: 'power2.out' });
    }
  }, [featured.length]);

  const getIndexFromX = useCallback((x) => {
    const step = itemWidthRef.current + gapRef.current;
    if (!step) return 0;
    const index = Math.round(-x / step);
    return Math.min(Math.max(index, 0), featured.length - 1);
  }, [featured.length]);

  const updateActive = useCallback((x) => {
    const idx = getIndexFromX(x);
    setActiveIndex((prev) => {
      if (prev !== idx) {
        updateProgress(idx);
        return idx;
      }
      return prev;
    });
  }, [getIndexFromX, updateProgress]);

  const snapToIndex = useCallback((index) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const clamped = Math.min(Math.max(index, 0), featured.length - 1);
    setActiveIndex(clamped);
    updateProgress(clamped);
    const targetX = -(clamped * (itemWidthRef.current + gapRef.current));
    gsap.to(container, { x: targetX, duration: 0.8, ease: 'power3.out' });
  }, [featured.length, updateProgress]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const parentWidth = container.parentElement.clientWidth;
    const containerWidth = container.scrollWidth;
    const minX = Math.min(parentWidth - containerWidth, 0);

    const firstCard = container.children[0];
    if (firstCard) {
      const gap = parseFloat(getComputedStyle(container).gap || '0');
      itemWidthRef.current = firstCard.offsetWidth;
      gapRef.current = gap;
    }

    const step = itemWidthRef.current + gapRef.current;

    const draggable = Draggable.create(container, {
      type: 'x',
      inertia: true,
      bounds: { minX, maxX: 0 },
      edgeResistance: 0.5,
      cursor: 'grab',
      activeCursor: 'grabbing',
      throwProps: true,
      onPress: () => setIsDragging(true),
      onRelease: () => setIsDragging(false),
      onDrag: function () {
        updateActive(this.x);
      },
      onThrowUpdate: function () {
        updateActive(this.x);
      },
      snap: {
        x: (value) => {
          const index = Math.round(-value / step);
          const clamped = Math.min(Math.max(index, 0), featured.length - 1);
          setActiveIndex(clamped);
          updateProgress(clamped);
          return -clamped * step;
        },
      },
    })[0];

    gsap.set(container, { x: 0 });
    updateProgress(0);

    return () => draggable.kill();
  }, [featured.length, updateProgress, updateActive]);

  return (
    <section className="w-full relative py-10 md:py-14 overflow-hidden">
      {/* Divider line */}
      <div className="mx-4 md:mx-[6vw] h-[1px] bg-[#2a2520]/10 mb-8 md:mb-10" />

      {/* Section header */}
      <div className="px-4 md:px-[6vw] mb-6 md:mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-1">CURATED SELECTION</p>
          <h2 className="text-3xl md:text-5xl font-semibold leading-[0.95] tracking-tight">
            Featured
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs opacity-40">
          <span className="tracking-[0.2em]">DRAG TO EXPLORE</span>
          <svg className="w-3 h-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          className={`flex w-max gap-3 md:gap-5 hide-scrollbar pl-[15vw] md:pl-[33vw] lg:pl-[35vw] pr-[15vw] md:pr-[33vw] lg:pr-[35vw] pb-4 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        >
          {featured.map((product, i) => (
            <FeaturedCard key={product.id} product={product} isActive={i === activeIndex} />
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div className="px-4 md:px-[6vw] mt-6 md:mt-8">
        {/* Progress bar */}
        <div className="w-full h-[2px] bg-[#2a2520]/10 mb-5 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-[#2a2520] origin-left"
            style={{ transform: 'scaleX(0.2)' }}
          />
        </div>

        <div className="flex items-center justify-between">
          {/* Numbered pagination */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => snapToIndex(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous product"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="text-sm md:text-base font-medium tracking-wider tabular-nums min-w-[60px] text-center">
              <span className="text-2xl md:text-3xl font-semibold">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="opacity-30 mx-1">/</span>
              <span className="opacity-30">{String(featured.length).padStart(2, '0')}</span>
            </div>

            <button
              onClick={() => snapToIndex(activeIndex + 1)}
              disabled={activeIndex === featured.length - 1}
              className="w-10 h-10 md:w-12 md:h-12 border-2 border-[#2a2520] flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next product"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Shop All link */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/shop" className="text-sm md:text-lg hover:underline transition-all tracking-wider">
              SHOP ALL
            </Link>
            <Link to="/shop" className="w-10 h-10 md:w-12 md:h-12 relative hover:rotate-[360deg] hover:scale-110 transition-all duration-700 flex-shrink-0">
              <img className="w-full h-full" src={circle} alt="" loading="lazy" />
              <img className="absolute top-1/2 left-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2" src={arrow} alt="" loading="lazy" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
