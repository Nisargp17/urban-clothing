import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function UnfoldTransition({ phase }) {
  const overlayRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Kill any running timeline
    if (tlRef.current) tlRef.current.kill();

    if (phase === 'exiting') {
      // Wipe in: diagonal sweep from left to right
      tlRef.current = gsap.timeline();
      tlRef.current
        .set(overlay, {
          x: '-120%',
          skewX: -20,
          opacity: 1,
        })
        .to(overlay, {
          x: '0%',
          duration: 0.35,
          ease: 'power3.inOut',
        });
    } else if (phase === 'entering') {
      // Wipe out: diagonal sweep revealing new content
      tlRef.current = gsap.timeline();
      tlRef.current
        .set(overlay, {
          x: '0%',
          skewX: -20,
          opacity: 1,
        })
        .to(overlay, {
          x: '120%',
          duration: 0.4,
          ease: 'power3.inOut',
        });
    } else if (phase === 'idle') {
      // Ensure overlay is hidden
      gsap.set(overlay, { x: '-120%', opacity: 0 });
    }

    return () => {
      if (tlRef.current) tlRef.current.kill();
    };
  }, [phase]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9997] bg-[#2a2520] pointer-events-none will-change-transform"
      style={{ transform: 'translateX(-120%) skewX(-20deg)' }}
    />
  );
}
