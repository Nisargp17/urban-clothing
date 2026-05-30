import { useEffect, useState, useRef } from 'react';

export function useInView(ref, options = {}) {
  const [isInView, setIsInView] = useState(false);
  const hasBeenInView = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        hasBeenInView.current = true;
      } else if (!options.once) {
        setIsInView(false);
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, options.once, options.threshold]);

  return options.once ? hasBeenInView.current || isInView : isInView;
}
