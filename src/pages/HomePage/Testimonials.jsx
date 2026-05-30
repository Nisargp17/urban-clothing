import { useState, useEffect } from 'react';

const TESTIMONIALS = [
  {
    id: 1,
    text: 'Good things come to those who wait. Urban Clothing is what has been missing in the modern fashion industry for years.',
    author: 'THE FACE MAGAZINE',
  },
  {
    id: 2,
    text: 'The urban trekking as never seen before. An exceptional product that has no equal alongside a great team.',
    author: 'HYPEBEAST',
  },
  {
    id: 3,
    text: 'A brand that understands the balance between streetwear edge and functional design. Every pair tells a story.',
    author: 'GQ INDIA',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[50vh] md:min-h-[55vh] flex flex-col items-center justify-center px-6 md:px-[10vw] py-16 md:py-24">
      <div className="max-w-3xl w-full text-center">
        {/* Large quote mark */}
        <div className="text-6xl md:text-8xl font-serif text-[#2a2520]/10 leading-none mb-2 md:mb-4">&ldquo;</div>

        {/* Quote + Attribution — crossfade together as one unit */}
        <div className="relative min-h-[180px] md:min-h-[140px]">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.id}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ${
                i === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}
            >
              <p className="text-xl md:text-3xl font-medium leading-snug md:leading-snug text-center px-2">
                {t.text}
              </p>
              <span className="text-[10px] md:text-xs tracking-[0.3em] opacity-40 mt-5 md:mt-6">
                — {t.author}
              </span>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? 'w-6 bg-[#2a2520]' : 'w-1.5 bg-[#2a2520]/20 hover:bg-[#2a2520]/40'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
