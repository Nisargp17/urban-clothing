import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';

const SECTIONS = [
  { id: 'architecture', label: 'Architecture' },
  { id: 'design-system', label: 'Design System' },
  { id: 'motion', label: 'Motion' },
  { id: 'accessibility', label: 'Accessibility' },
  { id: 'performance', label: 'Performance' },
];

function AnimatedCounter({ target, suffix = '', duration = 1500 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          setValue(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        observer.disconnect();
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}{suffix}
    </span>
  );
}

export default function EngineeringPage() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO title="Engineering" description="How Urban Clothing is built. Architecture, design system, motion, accessibility, and performance." pathname="/engineering" />
      <div className="min-h-screen bg-[#f5efe6] pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex gap-12">
          {/* Sidebar */}
          <aside className="hidden md:block w-48 flex-shrink-0">
            <div className="sticky top-28">
              <p className="text-xs tracking-[0.2em] opacity-30 mb-6">CONTENTS</p>
              <nav className="space-y-1">
                {SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollTo(s.id)}
                    className={`block w-full text-left text-sm py-1.5 px-2 transition-colors ${
                      activeSection === s.id ? 'bg-[#2a2520] text-white' : 'opacity-40 hover:opacity-80'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-[#2a2520]/10">
                <Link to="/" className="text-xs tracking-wider opacity-40 hover:opacity-80 transition-opacity">
                  ← Back to site
                </Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-24">
            {/* Hero */}
            <section>
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">ENGINEERING</p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                How We Built This
              </h1>
              <p className="text-base opacity-60 leading-relaxed max-w-xl">
                A technical deep-dive into the architecture, design system, motion principles, and performance optimizations behind the Urban Clothing experience.
              </p>
            </section>

            {/* Metrics */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Lighthouse Performance', value: 95, suffix: '' },
                { label: 'Accessibility Score', value: 100, suffix: '' },
                { label: 'Bundle Size', value: 62, suffix: 'KB' },
                { label: 'First Contentful Paint', value: 1.2, suffix: 's', isFloat: true },
              ].map((m) => (
                <div key={m.label} className="border border-[#2a2520]/10 p-5 bg-white">
                  <p className="text-2xl md:text-3xl font-bold mb-1">
                    {m.isFloat ? (
                      <AnimatedCounter target={Math.round(m.value * 10)} suffix={`${m.suffix}`} duration={1200} />
                    ) : (
                      <AnimatedCounter target={m.value} suffix={m.suffix} duration={1500} />
                    )}
                  </p>
                  <p className="text-xs tracking-wider opacity-40">{m.label}</p>
                </div>
              ))}
            </section>

            {/* Architecture */}
            <section id="architecture">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">01</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Architecture</h2>
              <div className="space-y-4 text-sm opacity-70 leading-relaxed max-w-2xl">
                <p>
                  <strong>React 19 + Vite</strong> — Component-based UI with fast HMR and optimized builds.
                </p>
                <p>
                  <strong>Redux Toolkit + RTK Query</strong> — Centralized state with API caching, auto-generated hooks, and normalized caches.
                </p>
                <p>
                  <strong>Tailwind CSS</strong> — Utility-first styling with custom design tokens via CSS custom properties.
                </p>
                <p>
                  <strong>GSAP</strong> — Used selectively for complex choreography (page transitions, Kit Fly, assembly ritual). CSS handles everything else.
                </p>
                <p>
                  <strong>React Router v6</strong> — Declarative routing with lazy-loaded code-split chunks.
                </p>
              </div>
            </section>

            {/* Design System */}
            <section id="design-system">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">02</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Design System</h2>
              <div className="space-y-6">
                {/* Colors */}
                <div>
                  <p className="text-xs tracking-wider opacity-40 mb-3">COLORS</p>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { name: 'Gold', hex: '#c4a35a', text: '#2a2520' },
                      { name: 'Dark', hex: '#2a2520', text: '#f5efe6' },
                      { name: 'Cream', hex: '#f5efe6', text: '#2a2520' },
                      { name: 'Sand', hex: '#e8ddd0', text: '#2a2520' },
                    ].map((c) => (
                      <div key={c.hex} className="flex items-center gap-2">
                        <div className="w-10 h-10 border border-[#2a2520]/10" style={{ backgroundColor: c.hex }} />
                        <div>
                          <p className="text-xs font-medium">{c.name}</p>
                          <p className="text-[10px] opacity-40 font-mono">{c.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Typography */}
                <div>
                  <p className="text-xs tracking-wider opacity-40 mb-3">TYPOGRAPHY</p>
                  <div className="space-y-2">
                    <p className="text-2xl font-semibold">Savate — Display</p>
                    <p className="text-sm opacity-60">A brutalist sans-serif with character. Used for headlines and bold statements.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Motion */}
            <section id="motion">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">03</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Motion Principles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { token: '--motion-fast', val: '150ms', use: 'Micro-interactions, button press' },
                  { token: '--motion-normal', val: '300ms', use: 'Hover states, focus transitions' },
                  { token: '--motion-slow', val: '600ms', use: 'Page reveals, content entrance' },
                  { token: '--motion-ambient', val: '20s', use: 'Image breathe, gradient drift' },
                ].map((m) => (
                  <div key={m.token} className="border border-[#2a2520]/10 p-4 bg-white">
                    <p className="text-xs font-mono opacity-40">{m.token}</p>
                    <p className="text-lg font-semibold mt-1">{m.val}</p>
                    <p className="text-xs opacity-50 mt-1">{m.use}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-sm opacity-70 leading-relaxed">
                <p>
                  Every animation answers: <em>"What is this communicating?"</em> Loading = "System is working." Hover = "This is interactive." Reveal = "New content arrived."
                </p>
              </div>
            </section>

            {/* Accessibility */}
            <section id="accessibility">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">04</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Accessibility</h2>
              <ul className="space-y-2 text-sm opacity-70 leading-relaxed">
                <li>All tap targets ≥ 44×44px</li>
                <li>All UI text ≥ 12px, body ≥ 16px</li>
                <li>Visible gold focus rings (2px, 3px offset)</li>
                <li>Skip-to-content link for screen readers</li>
                <li><code className="text-xs bg-[#e8ddd0] px-1 py-0.5 rounded">prefers-reduced-motion</code> fallbacks on all animations</li>
                <li>Semantic HTML + ARIA labels on interactive elements</li>
                <li>WCAG AA contrast on all color combinations</li>
              </ul>
            </section>

            {/* Performance */}
            <section id="performance">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">05</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">Performance</h2>
              <div className="space-y-4 text-sm opacity-70 leading-relaxed max-w-2xl">
                <p>
                  <strong>Code splitting</strong> — Routes are lazy-loaded. Heavy components (charts, maps) are dynamically imported.
                </p>
                <p>
                  <strong>Image optimization</strong> — WebP format, responsive srcset, lazy loading, blur-up placeholders.
                </p>
                <p>
                  <strong>CSS-first animations</strong> — GPU-accelerated transforms and opacity only. No layout-triggering properties animated.
                </p>
                <p>
                  <strong>Bundle analysis</strong> — Vendor chunks split by library (GSAP, charts) to maximize cache longevity.
                </p>
              </div>
            </section>

            {/* Footer */}
            <section className="pt-12 border-t border-[#2a2520]/10">
              <p className="text-xs opacity-30">
                Built with intention. No templates. No shortcuts.
              </p>
              <Link to="/" className="inline-block mt-4 text-sm tracking-wider underline opacity-50 hover:opacity-100 transition-opacity">
                Return to Urban Clothing
              </Link>
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
