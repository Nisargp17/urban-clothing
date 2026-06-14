import { useEffect, useRef, useState, useCallback } from 'react';

export function ContextualCursor() {
  const cursorRef = useRef(null);
  const [active, setActive] = useState(false);
  const [cursorState, setCursorState] = useState('default'); // default, link, text, view
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);
  const tailRef = useRef(Array(12).fill(null).map(() => ({ x: -100, y: -100 })));

  // Only on hover-capable devices
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setActive(mq.matches && !reduced.matches);
    const onChange = () => setActive(mq.matches && !reduced.matches);
    mq.addEventListener('change', onChange);
    reduced.addEventListener('change', onChange);
    return () => {
      mq.removeEventListener('change', onChange);
      reduced.removeEventListener('change', onChange);
    };
  }, []);

  const updateCursor = useCallback(() => {
    const tail = tailRef.current;
    // Lerp each dot toward the next
    for (let i = 0; i < tail.length; i++) {
      const target = i === 0 ? posRef.current : tail[i - 1];
      tail[i].x += (target.x - tail[i].x) * 0.25;
      tail[i].y += (target.y - tail[i].y) * 0.25;
    }

    const container = cursorRef.current;
    if (container) {
      const dots = container.querySelectorAll('.goo-dot');
      dots.forEach((dot, i) => {
        const s = 1 - (i / tail.length) * 0.7;
        dot.style.transform = `translate(${tail[i].x}px, ${tail[i].y}px) scale(${s})`;
      });
    }
    rafRef.current = requestAnimationFrame(updateCursor);
  }, []);

  useEffect(() => {
    if (!active) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    // Event delegation for cursor state changes
    const onOver = (e) => {
      const target = e.target;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setCursorState('link');
      } else if (target.closest('img, [data-cursor]')) {
        setCursorState('view');
      } else if (target.closest('p, span, h1, h2, h3, h4, h5, h6')) {
        setCursorState('text');
      }
    };

    const onOut = (e) => {
      const related = e.relatedTarget;
      if (!related || !related.closest('a, button, [role="button"], img, [data-cursor], p, span, h1, h2, h3, h4, h5, h6, input, textarea, select')) {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    rafRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [active, updateCursor]);

  if (!active) return null;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="fixed w-0 h-0" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        ref={cursorRef}
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ filter: 'url(#goo)', willChange: 'transform' }}
        data-state={cursorState}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="goo-dot absolute block rounded-full"
            style={{
              width: '28px',
              height: '28px',
              marginLeft: '-14px',
              marginTop: '-14px',
              backgroundColor: '#c4a35a',
              opacity: 1 - (i * 0.06),
            }}
          />
        ))}
        {/* Center label text */}
        <span
          className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-[10px] font-bold tracking-wider text-white uppercase pointer-events-none transition-opacity duration-200"
          style={{
            opacity: cursorState === 'view' ? 1 : 0,
            textShadow: '0 1px 3px rgba(0,0,0,0.3)',
          }}
        >
          VIEW
        </span>
      </div>
    </>
  );
}
