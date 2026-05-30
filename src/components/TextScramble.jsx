import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function TextScramble({ text, className = '', delay = 0, speed = 30 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { threshold: 0.3 });
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!isInView || started) return;

    const startTimeout = setTimeout(() => {
      setStarted(true);
      let iteration = 0;
      const totalIterations = text.length * 3;

      const interval = setInterval(() => {
        setDisplay(
          text
            .split('')
            .map((char, index) => {
              if (char === ' ') return ' ';
              if (index < iteration / 3) return text[index];
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join('')
        );

        iteration++;
        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplay(text);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [isInView, text, delay, speed, started]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {display || text.replace(/[^\s]/g, '\u00A0')}
    </span>
  );
}
