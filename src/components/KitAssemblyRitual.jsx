import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useSelector } from 'react-redux';

export function KitAssemblyRitual({ orderId, onComplete }) {
  const containerRef = useRef(null);
  const [phase, setPhase] = useState(0); // 0=enter, 1=pack, 2=tag, 3=shelf, 4=done
  const navigate = useNavigate();
  const cartItems = useSelector((s) => s.cart?.items || []);
  const itemRefs = useRef([]);
  const bagRef = useRef(null);
  const tagRef = useRef(null);
  const shelfRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({
      onComplete: () => setPhase(4),
    });

    // Phase 0: Items fly in from edges
    tl.set(itemRefs.current, { opacity: 0, scale: 0.5, x: (i) => (i % 2 === 0 ? -200 : 200) });
    tl.to(itemRefs.current, {
      opacity: 1,
      scale: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.4)',
    });

    // Phase 1: Bag unzips and items shrink into it
    tl.call(() => setPhase(1));
    tl.to(bagRef.current, { scaleY: 1.1, duration: 0.3, ease: 'power2.out' });
    tl.to(itemRefs.current, {
      scale: 0.3,
      opacity: 0,
      y: 60,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.in',
    }, '-=0.1');
    tl.to(bagRef.current, { scaleY: 1, duration: 0.3, ease: 'power2.in' });

    // Phase 2: Tag slides out
    tl.call(() => setPhase(2));
    tl.fromTo(tagRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });

    // Phase 3: Bag moves to shelf
    tl.call(() => setPhase(3));
    tl.to(bagRef.current, { y: 40, scale: 0.8, opacity: 0.7, duration: 0.6, ease: 'power2.inOut' });
    tl.to(shelfRef.current, { opacity: 1, duration: 0.4 }, '-=0.3');
    tl.to(tagRef.current, { y: 40, scale: 0.8, opacity: 0.7, duration: 0.6, ease: 'power2.inOut' }, '-=0.6');

    return () => { tl.kill(); };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[200] bg-[#f5efe6] flex flex-col items-center justify-center"
      role="dialog"
      aria-label="Order confirmation"
    >
      {/* Skip button */}
      <button
        onClick={() => { onComplete?.(); }}
        className="absolute top-6 right-6 text-xs tracking-wider opacity-40 hover:opacity-100 transition-opacity"
      >
        SKIP
      </button>

      {/* Shelf */}
      <div
        ref={shelfRef}
        className="absolute bottom-[15vh] w-[300px] h-[4px] bg-[#2a2520]/20 opacity-0"
      />

      {/* Bag SVG */}
      <div ref={bagRef} className="relative w-40 h-40 mb-8">
        <svg viewBox="0 0 160 160" className="w-full h-full">
          <rect x="30" y="50" width="100" height="90" rx="8" fill="#2a2520" />
          <path d="M30 50 Q30 20 55 20 L105 20 Q130 20 130 50" fill="none" stroke="#2a2520" strokeWidth="4" />
          <rect x="50" y="10" width="60" height="20" rx="4" fill="#c4a35a" opacity={phase >= 2 ? 0.3 : 0} />
        </svg>
      </div>

      {/* Items */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {cartItems.slice(0, 4).map((item, i) => (
          <div
            key={item.id || i}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="absolute w-16 h-16 rounded-lg overflow-hidden shadow-lg"
            style={{ transform: `translate(${(i - 1.5) * 60}px, -80px)` }}
          >
            <img
              src={item.img || item.image || ''}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Tag */}
      <div
        ref={tagRef}
        className="absolute mt-48 opacity-0 bg-white px-4 py-2 shadow-md border border-[#2a2520]/10"
      >
        <p className="text-xs tracking-[0.2em] opacity-40">ORDER</p>
        <p className="text-sm font-mono font-bold">{orderId || 'UC-2506-001'}</p>
      </div>

      {/* Text */}
      <div className="text-center mt-8">
        <h2 className="text-2xl md:text-4xl font-semibold mb-2">Your Kit is Packed</h2>
        <p className="text-sm opacity-50 mb-6">Everything you need. Ready for the unplanned.</p>
        <button
          onClick={() => { onComplete?.(); navigate('/'); }}
          className="inline-block px-8 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors active:scale-[0.98]"
        >
          BACK TO HOME
        </button>
        <button
          onClick={() => { onComplete?.(); navigate('/track-order'); }}
          className="block mx-auto mt-4 text-xs tracking-wider underline opacity-40 hover:opacity-80 transition-opacity"
        >
          TRACK YOUR ORDER
        </button>
      </div>
    </div>
  );
}
