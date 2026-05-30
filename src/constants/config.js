/** Centralized application configuration */

export const THEME = {
  colors: {
    primary: '#2a2520',
    accent: '#c4a35a',
    bg: '#f5efe6',
    card: '#e8ddd0',
    footer: '#ede6da',
    white: '#ffffff',
  },
  font: {
    tracking: {
      tight: 'tracking-tight',
      wide: 'tracking-wider',
      extra: 'tracking-[0.3em]',
    },
  },
};

export const CART_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 5000,
  MAX_RECENTLY_VIEWED: 8,
};

export const GSAP_PRESETS = {
  scrollReveal: {
    from: { y: 60, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 1,
    ease: 'power3.out',
    trigger: { start: 'top 85%', toggleActions: 'play none none none' },
  },
  scrollRevealFast: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    ease: 'power3.out',
    trigger: { start: 'top 80%', toggleActions: 'play none none none' },
  },
  slideInLeft: {
    from: { x: -40, opacity: 0 },
    to: { x: 0, opacity: 1 },
    duration: 0.8,
    ease: 'power3.out',
    trigger: { start: 'top 80%', toggleActions: 'play none none none' },
  },
  fadeIn: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0 },
    duration: 0.8,
    ease: 'power3.out',
  },
  stagger: {
    from: { y: 40, opacity: 0 },
    to: { y: 0, opacity: 1 },
    duration: 0.8,
    stagger: 0.12,
    ease: 'power3.out',
    trigger: { start: 'top 80%', toggleActions: 'play none none none' },
  },
  clipReveal: {
    fromLeft: { clipPath: 'inset(0 100% 0 0)' },
    fromRight: { clipPath: 'inset(0 0 0 100%)' },
    to: { clipPath: 'inset(0 0% 0 0)' },
    duration: 1.2,
    ease: 'power3.inOut',
    trigger: { start: 'top 80%', toggleActions: 'play none none none' },
  },
  counter: {
    duration: 2,
    ease: 'power2.out',
    trigger: { start: 'top 85%', toggleActions: 'play none none none' },
  },
  heroEntrance: {
    text: { from: { x: -60, opacity: 0 }, to: { x: 0, opacity: 1 }, duration: 1.2, ease: 'power4.out' },
    frame: { from: { x: 80, opacity: 0, rotation: 2 }, to: { x: 0, opacity: 1, rotation: 1 }, duration: 1.4, ease: 'power3.out' },
  },
};
