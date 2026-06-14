import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function FlipOverlay({ fromRect, toRect, imageUrl, onComplete }) {
  const overlayRef = useRef(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!fromRect || !toRect || !imageUrl) {
      onComplete?.();
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // FLIP animation
    const img = overlay.querySelector('img');
    if (!img) return;

    // Set initial state (First)
    gsap.set(overlay, {
      position: 'fixed',
      left: fromRect.x,
      top: fromRect.y,
      width: fromRect.width,
      height: fromRect.height,
      zIndex: 9999,
      pointerEvents: 'none',
    });

    // Animate to final state (Last)
    gsap.to(overlay, {
      left: toRect.x,
      top: toRect.y,
      width: toRect.width,
      height: toRect.height,
      duration: 0.5,
      ease: 'power3.inOut',
      onComplete: () => {
        setActive(false);
        onComplete?.();
      },
    });

    return () => {
      gsap.killTweensOf(overlay);
    };
  }, [fromRect, toRect, imageUrl, onComplete]);

  if (!active) return null;

  return (
    <div ref={overlayRef} className="overflow-hidden" style={{ willChange: 'transform, width, height, left, top' }}>
      <img src={imageUrl} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
