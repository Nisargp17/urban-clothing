import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_PRESETS } from '../constants/config';

gsap.registerPlugin(ScrollTrigger);

export function RevealImage({ src, alt, className = '', direction = 'left' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const preset = GSAP_PRESETS.clipReveal;
    const clipFrom = direction === 'left' ? preset.fromLeft : preset.fromRight;

    const tween = gsap.fromTo(
      el,
      clipFrom,
      {
        ...preset.to,
        duration: preset.duration,
        ease: preset.ease,
        scrollTrigger: {
          trigger: el,
          ...preset.trigger,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" decoding="async" />
    </div>
  );
}
