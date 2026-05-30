import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import { SEO } from '../../components/SEO';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLLECTIONS } from '../../data/products';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['All', 'Mens', 'Womens', 'Unisex', 'SS/25', 'FW/24'];

function Lightbox({ item, onClose, onPrev, onNext }) {
  const [isClosing, setIsClosing] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  useEffect(() => {
    setLoaded(false);
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onPrev, onNext, item.id]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 400);
  };

  // Touch swipe handlers
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const onTouchMove = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
  };
  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;
    if (diff > threshold) onNext();      // swipe left → next
    else if (diff < -threshold) onPrev(); // swipe right → prev
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="absolute inset-0 bg-[#2a2520]/85 backdrop-blur-xl" onClick={handleClose} />

      {/* Close */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 z-20 w-12 h-12 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#2a2520] transition-all"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev — vertically centered, larger touch target */}
      <button
        onClick={onPrev}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#2a2520] transition-all active:scale-95"
        aria-label="Previous image"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next — vertically centered, larger touch target */}
      <button
        onClick={onNext}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-[#2a2520] transition-all active:scale-95"
        aria-label="Next image"
      >
        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Image frame */}
      <div className="relative z-10 w-full max-w-4xl px-14 md:px-24">
        <div className="relative bg-[#f5efe6] border-4 border-[#f5efe6] shadow-2xl">
          {!loaded && (
            <div className="absolute inset-0 bg-[#e8ddd0] animate-pulse flex items-center justify-center">
              <span className="text-xs tracking-[0.3em] opacity-40">LOADING</span>
            </div>
          )}
          <img
            src={item.img}
            alt={item.title}
            onLoad={() => setLoaded(true)}
            className={`w-full max-h-[65vh] object-contain transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        <div className="mt-5 text-center text-white px-4">
          <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-50 mb-1">{item.season} / {item.category}</p>
          <h3 className="text-xl md:text-3xl font-semibold">{item.title}</h3>
          <p className="text-xs md:text-sm opacity-60 mt-1 max-w-lg mx-auto">{item.description}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

const GridItem = memo(function GridItem({ item, index, onSelect, size }) {
  const itemRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    gsap.set(el, { clipPath: 'inset(100% 0 0 0)', opacity: 0 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1,
          delay: index * 0.08,
          ease: 'power4.out',
        });
      },
    });

    return () => trigger.kill();
  }, [index]);

  const sizeClasses = {
    large: 'md:col-span-2 md:row-span-2',
    tall: 'md:row-span-2',
    normal: '',
  };

  return (
    <div
      ref={itemRef}
      className={`relative overflow-hidden group cursor-pointer ${sizeClasses[size] || ''}`}
      onClick={() => onSelect(item)}
    >
      <div className="relative w-full h-full overflow-hidden border-[3px] md:border-[4px] border-[#2a2520]">
        <img
          src={item.img}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#2a2520]/0 group-hover:bg-[#2a2520]/50 transition-all duration-500"
        />

        {/* Content overlay - slides up on hover */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="text-white">
            <p className="text-[10px] md:text-xs tracking-[0.25em] opacity-70 mb-1">
              {item.season} / {item.category}
            </p>
            <h3 className="text-xl md:text-3xl font-semibold leading-tight">{item.title}</h3>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[10px] md:text-xs tracking-wider border border-white/40 px-2 py-1">VIEW</span>
              <span className="text-[10px] md:text-xs opacity-60">{item.year}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function CollectionsPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);

  const filtered = useMemo(
    () => activeFilter === 'All'
      ? COLLECTIONS
      : COLLECTIONS.filter((c) => c.category === activeFilter || c.season === activeFilter),
    [activeFilter]
  );

  // Parallax on hero image
  useEffect(() => {
    const handleScroll = () => {
      if (!heroImgRef.current) return;
      const scrollY = window.scrollY;
      heroImgRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero entrance animation
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const title = hero.querySelector('.hero-title');
    const subtitle = hero.querySelector('.hero-subtitle');
    const meta = hero.querySelector('.hero-meta');

    gsap.set([title, subtitle, meta], { y: 60, opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(title, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to(subtitle, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7')
      .to(meta, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7');

    return () => tl.kill();
  }, []);

  const handleSelect = useCallback((item) => {
    setLightboxItem(item);
  }, []);

  const handleLightboxPrev = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((c) => c.id === lightboxItem.id);
    const newIdx = idx > 0 ? idx - 1 : filtered.length - 1;
    setLightboxItem(filtered[newIdx]);
  }, [lightboxItem, filtered]);

  const handleLightboxNext = useCallback(() => {
    if (!lightboxItem) return;
    const idx = filtered.findIndex((c) => c.id === lightboxItem.id);
    const newIdx = idx < filtered.length - 1 ? idx + 1 : 0;
    setLightboxItem(filtered[newIdx]);
  }, [lightboxItem, filtered]);

  // Grid item sizes for visual variety
  const gridSizes = ['large', 'normal', 'tall', 'normal', 'normal', 'large', 'normal', 'tall', 'normal'];

  return (
    <>
      <SEO
        title="Collections"
        description="Explore the Spring/Summer 2025 and Fall/Winter 2024 lookbooks. Editorial collections for the modern explorer."
        pathname="/collections"
      />
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[90vh] overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <img
            src={COLLECTIONS[0].img}
            alt={COLLECTIONS[0].title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[#2a2520]/40" />

        {/* Hero content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-16 text-white">
          <div className="max-w-4xl">
            <p className="hero-meta text-[10px] md:text-xs tracking-[0.3em] opacity-70 mb-3">
              {COLLECTIONS[0].season} / {COLLECTIONS[0].category}
            </p>
            <h1 className="hero-title text-5xl md:text-[8vw] font-semibold leading-none tracking-tight">
              {COLLECTIONS[0].title}
            </h1>
            <p className="hero-subtitle text-sm md:text-lg opacity-70 mt-4 max-w-xl leading-relaxed">
              {COLLECTIONS[0].description}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 animate-bounce">
          <span className="text-[0.6rem] tracking-[0.3em] uppercase">Explore</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="relative z-20 bg-[#f5efe6] border-b-2 border-[#2a2520]/10 py-4 px-4 md:px-[4vw]">
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto hide-scrollbar">
          <span className="text-[10px] md:text-xs font-medium tracking-[0.2em] opacity-40 flex-shrink-0 mr-2">
            FILTER
          </span>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`flex-shrink-0 px-3 md:px-4 py-1.5 text-[11px] md:text-xs font-medium tracking-wider border-2 transition-all ${
                activeFilter === filter
                  ? 'bg-[#2a2520] text-white border-[#2a2520]'
                  : 'bg-transparent text-[#2a2520] border-[#2a2520] hover:bg-[#2a2520] hover:text-white'
              }`}
            >
              {filter.toUpperCase()}
            </button>
          ))}
          <span className="text-[10px] md:text-xs opacity-40 flex-shrink-0 ml-auto">
            {filtered.length} COLLECTIONS
          </span>
        </div>
      </div>

      {/* Editorial Grid */}
      <section className="px-4 md:px-[4vw] py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {filtered.map((item, i) => (
            <GridItem
              key={item.id}
              item={item}
              index={i}
              onSelect={handleSelect}
              size={gridSizes[i % gridSizes.length]}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg opacity-40">No collections match this filter</p>
          </div>
        )}
      </section>

      {/* Editorial Quote */}
      <section className="px-4 md:px-[4vw] py-16 md:py-32 border-t-2 border-[#2a2520]/10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] md:text-xs tracking-[0.4em] opacity-40 mb-6">THE URBAN PHILOSOPHY</p>
          <blockquote className="text-2xl md:text-5xl font-semibold leading-tight tracking-tight">
            We do not design for the runway. We design for the pavement, the gravel, the stairs, and the unexpected detour.
          </blockquote>
          <div className="w-12 h-[2px] bg-[#c4a35a] mx-auto mt-8" />
        </div>
      </section>

      {/* Season Archive */}
      <section className="px-4 md:px-[4vw] py-12 md:py-24 border-t-2 border-[#2a2520]/10">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          {/* SS/25 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] md:text-xs tracking-[0.3em] opacity-40">SEASON</span>
              <span className="text-3xl md:text-5xl font-semibold">SS/25</span>
            </div>
            <p className="text-sm md:text-base opacity-60 leading-relaxed mb-6">
              Spring/Summer 2025 explores the tension between structure and fluidity. Lightweight materials meet reinforced construction. Colors shift from concrete grey to sun-bleached sand.
            </p>
            <div className="flex gap-3">
              {COLLECTIONS.filter((c) => c.season === 'SS/25').map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#2a2520] overflow-hidden hover:opacity-70 transition-opacity"
                >
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* FW/24 */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] md:text-xs tracking-[0.3em] opacity-40">SEASON</span>
              <span className="text-3xl md:text-5xl font-semibold">FW/24</span>
            </div>
            <p className="text-sm md:text-base opacity-60 leading-relaxed mb-6">
              Fall/Winter 2024 embraces the darkness. Rich leathers, deep tones, and reflective details for the urban night. Built for those who do not stop when the sun goes down.
            </p>
            <div className="flex gap-3">
              {COLLECTIONS.filter((c) => c.season === 'FW/24').map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  className="w-12 h-12 md:w-16 md:h-16 border-2 border-[#2a2520] overflow-hidden hover:opacity-70 transition-opacity"
                >
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-[4vw] py-12 md:py-20 border-t-2 border-[#2a2520]/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {[
            { value: '09', label: 'Collections' },
            { value: '02', label: 'Seasons' },
            { value: '04', label: 'Categories' },
            { value: '27', label: 'Looks' },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-4xl md:text-6xl font-semibold">{stat.value}</div>
              <div className="text-xs tracking-[0.2em] opacity-40 mt-1">{stat.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 md:px-[4vw] py-12 md:py-24 border-t-2 border-[#2a2520]/10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <p className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-2">SS/25</p>
            <h2 className="text-3xl md:text-6xl font-semibold">New Season Arrivals</h2>
          </div>
          <p className="text-sm md:text-base opacity-60 max-w-md">
            Discover our latest collection of urban trekking footwear. Designed for the streets, built for the journey.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={() => setLightboxItem(null)}
          onPrev={handleLightboxPrev}
          onNext={handleLightboxNext}
        />
      )}
    </div>
    </>
  );
}
