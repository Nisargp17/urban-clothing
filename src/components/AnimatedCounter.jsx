import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GSAP_PRESETS } from '../constants/config';

gsap.registerPlugin(ScrollTrigger);

export function AnimatedCounter({ target, suffix = '', label, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const preset = GSAP_PRESETS.counter;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: target,
      duration: preset.duration,
      ease: preset.ease,
      delay,
      scrollTrigger: {
        trigger: el,
        ...preset.trigger,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = Math.round(obj.val).toLocaleString('en-IN') + suffix;
        }
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [target, suffix, delay]);

  return (
    <div className="text-center md:text-left">
      <p ref={ref} className="text-4xl md:text-6xl font-semibold leading-none mb-2">
        {0}{suffix}
      </p>
      <p className="text-[10px] md:text-xs tracking-[0.2em] opacity-40 uppercase">{label}</p>
    </div>
  );
}
