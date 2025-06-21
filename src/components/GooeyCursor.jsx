import React, { useEffect, useRef, useState } from "react";

const GooeyCursor = () => {
  const TAIL_LENGTH = 20;
  const cursorRef = useRef(null);
  const cursorHistory = useRef(Array(TAIL_LENGTH).fill({ x: 0, y: 0 }));

  const [cursorCircles, setCursorCircles] = useState([]);
  const cursorSize = 28;
  const bgColor = "#FAF7EE";
  const [cursorColor, setCursorColor] = useState(bgColor);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      cursorHistory.current.shift();
      cursorHistory.current.push({ x: mouseX, y: mouseY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    const initCursor = () => {
      let circles = [];
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
      setCursorCircles(circles);
    };

    initCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorSize, cursorColor]);

  useEffect(() => {
    const updateCursor = () => {
      for (let i = 0; i < TAIL_LENGTH; i++) {
        const current = cursorHistory.current[i];
        const next =
          cursorHistory.current[i + 1] ||
          cursorHistory.current[TAIL_LENGTH - 1];

        const xDiff = next.x - current.x;
        const yDiff = next.y - current.y;

        current.x += xDiff * 0.35;
        current.y += yDiff * 0.35;

        if (cursorRef.current) {
          const circle = cursorRef.current.children[i];
          if (circle) {
            circle.style.transform = `translate(${current.x}px, ${
              current.y
            }px) scale(${i / TAIL_LENGTH})`;
          }
        }
      }

      requestAnimationFrame(updateCursor);
    };

    updateCursor();
  }, []);

  useEffect(() => {
    const handleMouseEnter = (e) => {
      const bg = window.getComputedStyle(e.target).backgroundColor;
      if (bg && bg !== "rgba(0, 0, 0, 0)") {
        setCursorColor(bg);
      }
    };

    const handleMouseLeave = () => {
      setCursorColor(bgColor);
    };

    document.querySelectorAll("*").forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      document.querySelectorAll("*").forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [bgColor]);

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="goo hidden"
        version="1.1"
        width="100%"
      >
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
