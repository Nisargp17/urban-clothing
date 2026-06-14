/* Urban Clothing — Micro Physics System
 * Spring constants for UI interactions.
 * Usage with GSAP: gsap.to(el, { ...springTo('snappy', { x: 100 }) })
 * Usage with Framer Motion: transition={springs.snappy}
 */

export const springs = {
  spring: {
    stiffness: 300,
    damping: 25,
    mass: 1,
  },
  gentle: {
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  snappy: {
    stiffness: 500,
    damping: 30,
    mass: 0.8,
  },
  heavy: {
    stiffness: 80,
    damping: 15,
    mass: 2,
  },
};

// Convert spring params to GSAP-friendly config
// GSAP does not natively support springs, but we can approximate with ease + duration
export function springTo(name, vars) {
  const s = springs[name] || springs.spring;
  // Map spring constants to approximate GSAP ease + duration
  // Higher stiffness = shorter duration. Higher damping = less overshoot.
  const duration = Math.min(0.8, 0.2 + (500 / s.stiffiness) * 0.15);
  return {
    ...vars,
    duration,
    ease: s.damping > 25 ? 'power2.out' : 'back.out(1.2)',
  };
}

// CSS custom property helper for runtime animation speed (respects seasonal motion speed)
export function getMotionSpeed() {
  const root = document.documentElement;
  const speed = parseFloat(getComputedStyle(root).getPropertyValue('--season-motion-speed')) || 1;
  return speed;
}

// Normalize a duration by the current seasonal motion speed
export function seasonalDuration(ms) {
  return ms / getMotionSpeed();
}
