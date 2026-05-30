import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function CursorLabel() {
  const labelRef = useRef(null);
  const [label, setLabel] = useState('');
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (labelRef.current) {
        gsap.to(labelRef.current, {
          x: e.clientX + 18,
          y: e.clientY + 18,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        setLabel(target.dataset.cursor);
        if (labelRef.current) {
          gsap.to(labelRef.current, { opacity: 1, scale: 1, duration: 0.2 });
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        if (labelRef.current) {
          gsap.to(labelRef.current, { opacity: 0, scale: 0.8, duration: 0.2 });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  if (!label) return null;

  return (
    <div
      ref={labelRef}
      className="fixed top-0 left-0 z-[999] pointer-events-none opacity-0 scale-80"
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <span className="inline-block px-3 py-1 bg-[#c4a35a] text-[#2a2520] text-[10px] font-bold tracking-[0.2em] uppercase border border-[#2a2520]">
        {label}
      </span>
    </div>
  );
}
