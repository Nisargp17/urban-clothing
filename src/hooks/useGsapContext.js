import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Robust wrapper around gsap.context() that ensures all ScrollTriggers
 * and tweens are killed on unmount. Use inside page components.
 */
export function useGsapContext(callback, deps = []) {
  const scopeRef = useRef(null);

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      callback(scopeRef.current);
    }, scopeRef);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}
