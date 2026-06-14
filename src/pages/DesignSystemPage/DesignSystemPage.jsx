import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SEO } from '../../components/SEO';

const SECTIONS = [
  { id: 'colors', label: 'Colors' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'motion', label: 'Motion' },
  { id: 'components', label: 'Components' },
];

const COLORS = [
  { name: 'Gold', hex: '#c4a35a', usage: 'Primary accent, CTAs, focus rings' },
  { name: 'Dark', hex: '#2a2520', usage: 'Text, borders, primary surfaces' },
  { name: 'Cream', hex: '#f5efe6', usage: 'Page backgrounds, cards' },
  { name: 'Sand', hex: '#e8ddd0', usage: 'Secondary backgrounds, placeholders' },
  { name: 'Bronze', hex: '#8a7a60', usage: 'Trail world accent' },
  { name: 'Graphite', hex: '#1a1a1a', usage: 'Technical world background' },
];

const SPACING_STEPS = [4, 8, 12, 16, 24, 32, 48, 64, 96, 128];

function EasingDemo({ name, ease, duration = 600 }) {
  const [animating, setAnimating] = useState(false);
  return (
    <div className="border border-[#2a2520]/10 p-4 bg-white">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-mono opacity-40">{name}</p>
        <button
          onClick={() => setAnimating(true)}
          onAnimationEnd={() => setAnimating(false)}
          className="text-[10px] tracking-wider border border-[#2a2520]/20 px-2 py-0.5 hover:bg-[#2a2520] hover:text-white transition-colors"
        >
          PLAY
        </button>
      </div>
      <div className="h-8 bg-[#e8ddd0]/30 relative overflow-hidden">
        <div
          className="absolute top-1 left-0 w-6 h-6 bg-[#c4a35a] rounded-full"
          style={{
            transition: animating ? `transform ${duration}ms ${ease}` : 'none',
            transform: animating ? 'translateX(calc(100% + 200px))' : 'translateX(0)',
          }}
        />
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <SEO title="Design System" description="The Urban Clothing design system. Colors, typography, spacing, motion, and components." pathname="/design-system" />
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
                    className="block w-full text-left text-sm py-1.5 px-2 transition-colors opacity-40 hover:opacity-80"
                  >
                    {s.label}
                  </button>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-[#2a2520]/10">
                <Link to="/" className="text-xs tracking-wider opacity-40 hover:opacity-80 transition-opacity">
                  Back to site
                </Link>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 space-y-24">
            {/* Hero */}
            <section>
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">DESIGN SYSTEM</p>
              <h1 className="text-3xl md:text-5xl font-semibold leading-tight mb-4">
                How It Looks
              </h1>
              <p className="text-base opacity-60 leading-relaxed max-w-xl">
                The visual and interaction language of Urban Clothing. Every decision documented, every token named.
              </p>
            </section>

            {/* Colors */}
            <section id="colors">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">01</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Colors</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {COLORS.map((c) => (
                  <div key={c.hex} className="border border-[#2a2520]/10 bg-white p-4 group">
                    <div className="w-full h-20 mb-3 border border-[#2a2520]/10" style={{ backgroundColor: c.hex }} />
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-[10px] font-mono opacity-40">{c.hex}</p>
                    <p className="text-xs opacity-50 mt-2">{c.usage}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Typography */}
            <section id="typography">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">02</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Typography</h2>
              <div className="space-y-6">
                <div className="border border-[#2a2520]/10 bg-white p-6">
                  <p className="text-[10px] tracking-[0.2em] opacity-30 mb-2">DISPLAY</p>
                  <p className="text-4xl md:text-5xl font-semibold">Savate</p>
                  <p className="text-sm opacity-50 mt-2">Used for headlines and bold statements.</p>
                </div>
                <div className="border border-[#2a2520]/10 bg-white p-6">
                  <p className="text-[10px] tracking-[0.2em] opacity-30 mb-2">BODY</p>
                  <p className="text-base leading-relaxed opacity-70">
                    The quick brown fox jumps over the lazy dog. Engineered for 14km of unplanned terrain.
                  </p>
                </div>
                <div className="border border-[#2a2520]/10 bg-white p-6">
                  <p className="text-[10px] tracking-[0.2em] opacity-30 mb-2">LABELS</p>
                  <p className="text-xs tracking-[0.2em] opacity-50 uppercase">Collection / SS25</p>
                </div>
              </div>
            </section>

            {/* Spacing */}
            <section id="spacing">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">03</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Spacing</h2>
              <div className="space-y-2">
                {SPACING_STEPS.map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <span className="text-xs font-mono opacity-40 w-8">{s}px</span>
                    <div className="h-4 bg-[#c4a35a]" style={{ width: `${s}px` }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Motion */}
            <section id="motion">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">04</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Motion</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <EasingDemo name="ease-out-expo" ease="cubic-bezier(0.16, 1, 0.3, 1)" />
                <EasingDemo name="ease-out-quart" ease="cubic-bezier(0.25, 1, 0.5, 1)" />
                <EasingDemo name="ease-in-out-sine" ease="cubic-bezier(0.37, 0, 0.63, 1)" />
                <EasingDemo name="linear" ease="linear" />
              </div>
              <div className="mt-6 border border-[#2a2520]/10 bg-white p-5">
                <p className="text-xs tracking-wider opacity-40 mb-3">DURATION TOKENS</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { token: '--motion-instant', val: '0ms' },
                    { token: '--motion-fast', val: '150ms' },
                    { token: '--motion-normal', val: '300ms' },
                    { token: '--motion-slow', val: '600ms' },
                  ].map((t) => (
                    <div key={t.token} className="bg-[#f5efe6] p-3">
                      <p className="text-[10px] font-mono opacity-40">{t.token}</p>
                      <p className="text-sm font-semibold">{t.val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Components */}
            <section id="components">
              <p className="text-xs tracking-[0.2em] text-[#c4a35a] mb-3">05</p>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6">Components</h2>
              <div className="space-y-6">
                {/* Button states */}
                <div className="border border-[#2a2520]/10 bg-white p-6">
                  <p className="text-xs tracking-wider opacity-40 mb-4">BUTTON STATES</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-2.5 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium">DEFAULT</button>
                    <button className="px-6 py-2.5 bg-[#c4a35a] text-[#2a2520] text-xs tracking-[0.15em] font-medium">HOVER</button>
                    <button className="px-6 py-2.5 bg-[#2a2520]/80 text-white text-xs tracking-[0.15em] font-medium scale-[0.98]">ACTIVE</button>
                    <button className="px-6 py-2.5 bg-[#2a2520]/20 text-[#2a2520]/30 text-xs tracking-[0.15em] font-medium cursor-not-allowed">DISABLED</button>
                  </div>
                </div>

                {/* Input states */}
                <div className="border border-[#2a2520]/10 bg-white p-6">
                  <p className="text-xs tracking-wider opacity-40 mb-4">INPUT STATES</p>
                  <div className="space-y-3 max-w-sm">
                    <input
                      type="text"
                      placeholder="Default"
                      className="w-full px-3 py-2 border border-[#2a2520]/20 bg-transparent text-sm outline-none focus:border-[#c4a35a] transition-colors"
                    />
                    <input
                      type="text"
                      value="Focused"
                      readOnly
                      className="w-full px-3 py-2 border border-[#c4a35a] bg-transparent text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Card */}
                <div className="border border-[#2a2520]/10 bg-white p-6">
                  <p className="text-xs tracking-wider opacity-40 mb-4">PRODUCT CARD</p>
                  <div className="w-48 bg-[#e8ddd0] aspect-[4/5] mb-3" />
                  <p className="text-sm font-medium">Urban Trekker Boot</p>
                  <p className="text-xs text-[#c4a35a] font-medium mt-1">₹12,999</p>
                </div>
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
