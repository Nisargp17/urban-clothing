import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      animation = { opacity: 1, y: 0 },
      from = { opacity: 0, y: 50 },
      triggerOptions = { start: 'top 80%', toggleActions: 'play none none none' },
      duration = 1,
      ease = 'power3.out',
      stagger = 0,
      delay = 0,
    } = options;

    gsap.set(element, from);

    const tween = gsap.to(element, {
      ...animation,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: element,
        ...triggerOptions,
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === element) st.kill();
      });
    };
  }, []);

  return ref;
}

export function useFadeInOnMount(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const {
      from = { opacity: 0, y: 30 },
      to = { opacity: 1, y: 0 },
      duration = 1,
      ease = 'power3.out',
      delay = 0,
    } = options;

    gsap.set(element, from);
    const tween = gsap.to(element, { ...to, duration, ease, delay });

    return () => tween.kill();
  }, []);

  return ref;
}
