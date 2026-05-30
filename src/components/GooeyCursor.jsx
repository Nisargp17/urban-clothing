import { useEffect, useRef, useState, useMemo } from "react";

const isHoverDevice = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const GooeyCursor = ({ cursorColor: propColor = "#f5efe6", adaptive = true }) => {
  const TAIL_LENGTH = 20;
  const cursorRef = useRef(null);
  const cursorHistory = useRef(Array(TAIL_LENGTH).fill({ x: 0, y: 0 }));
  const rafId = useRef(null);

  const [active, setActive] = useState(false);
  const [cursorColor, setCursorColor] = useState(propColor);
  const cursorSize = 28;
  const bgColor = propColor;

  // Only activate on hover-capable devices (desktop)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    setActive(mq.matches);
    const onChange = (e) => setActive(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const cursorCircles = useMemo(() => {
    if (!active) return [];
    const circles = [];
    for (let i = 0; i < TAIL_LENGTH; i++) {
      circles.push(
        <div
          key={i}
          className="cursor-circle absolute rounded-full"
          style={{
            backgroundColor: cursorColor,
            width: `${cursorSize}px`,
            height: `${cursorSize}px`,
          }}
        />
      );
    }
    return circles;
  }, [active, cursorColor, cursorSize]);

  useEffect(() => {
    if (!active) return;

    const handleMouseMove = (event) => {
      cursorHistory.current.shift();
      cursorHistory.current.push({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const updateCursor = () => {
      for (let i = 0; i < TAIL_LENGTH; i++) {
        const current = cursorHistory.current[i];
        const next = cursorHistory.current[i + 1] || cursorHistory.current[TAIL_LENGTH - 1];
        current.x += (next.x - current.x) * 0.35;
        current.y += (next.y - current.y) * 0.35;

        if (cursorRef.current) {
          const circle = cursorRef.current.children[i];
          if (circle) {
            circle.style.transform = `translate(${current.x}px, ${current.y}px) scale(${i / TAIL_LENGTH})`;
          }
        }
      }
      rafId.current = requestAnimationFrame(updateCursor);
    };

    rafId.current = requestAnimationFrame(updateCursor);
    return () => cancelAnimationFrame(rafId.current);
  }, [active]);

  useEffect(() => {
    if (!active || !adaptive) return;

    const handleMouseEnter = (e) => {
      const bg = window.getComputedStyle(e.target).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)") setCursorColor(bg);
    };
    const handleMouseLeave = () => setCursorColor(bgColor);

    document.querySelectorAll("*").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.querySelectorAll("*").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [active, bgColor, adaptive]);

  if (!active) return null;

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" className="goo hidden" version="1.1" width="100%">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <div
        id="cursor"
        className="fixed top-[-14px] left-[-14px] pointer-events-none z-[99999] mix-blend-difference filter"
        style={{ filter: "url(#goo)" }}
        ref={cursorRef}
      >
        {cursorCircles}
      </div>
    </>
  );
};

export default GooeyCursor;
