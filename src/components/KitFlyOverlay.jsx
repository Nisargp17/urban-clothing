import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useKitFly } from '../context/KitFlyContext';
import { soundEngine } from '../utils/soundEngine';

export function KitFlyOverlay() {
  const overlayRef = useRef(null);
  const { subscribe } = useKitFly();
  const activeTimers = useRef(new Set());

  useEffect(() => {
    return subscribe((sourceEl) => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const cartBtn = document.getElementById('cart-target');
      if (!cartBtn) return;

      const srcRect = sourceEl.getBoundingClientRect();
      const destRect = cartBtn.getBoundingClientRect();

      // Wrapper div for GSAP transforms
      const wrapper = document.createElement('div');
      wrapper.style.position = 'fixed';
      wrapper.style.left = '0';
      wrapper.style.top = '0';
      wrapper.style.width = `${srcRect.width}px`;
      wrapper.style.height = `${srcRect.height}px`;
      wrapper.style.zIndex = '9999';
      wrapper.style.pointerEvents = 'none';
      wrapper.style.overflow = 'hidden';
      wrapper.style.willChange = 'transform, opacity';

      const img = document.createElement('img');
      img.src = sourceEl.currentSrc || sourceEl.src || '';
      img.alt = '';
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.style.display = 'block';

      wrapper.appendChild(img);
      overlay.appendChild(wrapper);

      const startX = srcRect.left;
      const startY = srcRect.top;
      const endX = destRect.left + destRect.width / 2 - srcRect.width / 2;
      const endY = destRect.top + destRect.height / 2 - srcRect.height / 2;

      const runAnimation = () => {
        soundEngine.play('addToCart');

        gsap.set(wrapper, { x: startX, y: startY, scale: 1, opacity: 1 });

        const tl = gsap.timeline({
          onComplete: () => {
            wrapper.remove();
            const badge = cartBtn.querySelector('.cart-badge');
            if (badge) {
              gsap.fromTo(badge,
                { scale: 1.4 },
                { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
              );
            }
          },
        });

        tl.to(wrapper, {
          x: endX,
          duration: 0.8,
          ease: 'power2.inOut',
        }, 0);

        tl.to(wrapper, {
          y: endY,
          duration: 0.8,
          ease: 'power1.in',
        }, 0);

        tl.to(wrapper, {
          scale: 0.15,
          opacity: 0.3,
          duration: 0.6,
          ease: 'power2.in',
        }, 0.2);
      };

      if (img.complete && img.naturalWidth > 0) {
        runAnimation();
      } else {
        img.onload = runAnimation;
        img.onerror = () => wrapper.remove();
        // Fallback if onload already fired before listener attached
        const timer = setTimeout(() => {
          activeTimers.current.delete(timer);
          if (wrapper.parentNode) runAnimation();
        }, 100);
        activeTimers.current.add(timer);
      }
    });
  }, [subscribe]);

  useEffect(() => {
    const timers = activeTimers.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
      timers.clear();
    };
  }, []);

  return <div ref={overlayRef} aria-hidden="true" className="fixed inset-0 pointer-events-none z-[9998]" />;
}
