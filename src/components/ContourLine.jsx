import { useEffect, useRef, useState } from 'react';

export function ContourLine({ active = false }) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (active) {
      setVisible(true);
      // Small delay before starting animation ensures the enter transition plays
      requestAnimationFrame(() => {
        setProgress(70); // Indeterminate "working" state
      });
    } else if (visible) {
      // Complete to 100% then hide
      setProgress(100);
      timeoutRef.current = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [active, visible]);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[2px] overflow-hidden pointer-events-none"
    >
      <div
        className="h-full bg-[#c4a35a]"
        style={{
          width: `${progress}%`,
          transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
          opacity: progress >= 100 ? 0 : 1,
          marginLeft: progress < 100 ? '0' : 'auto',
        }}
      />
    </div>
  );
}
