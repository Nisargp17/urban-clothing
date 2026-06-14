import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { SEO } from '../../components/SEO';

export default function NotFoundPage() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(
      containerRef.current.querySelectorAll('.reveal'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out' }
    );
    return () => tl.kill();
  }, []);

  return (
    <>
      <SEO title="404" description="Page not found. The page you are looking for does not exist." noindex />

      <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 md:pt-0 relative overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[40vw] md:text-[30vw] font-semibold leading-none tracking-tighter opacity-[0.03]">
            404
          </span>
        </div>

        <div className="relative z-10 text-center max-w-xl">
          <p className="reveal text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-6">LOST IN TRANSIT</p>

          <h1 className="reveal text-5xl md:text-7xl lg:text-8xl font-semibold leading-[0.85] mb-6">
            <span className="block">NOT</span>
            <span className="block">FOUND</span>
          </h1>

          <p className="reveal text-sm md:text-base opacity-50 leading-relaxed mb-10">
            The path you followed leads nowhere. Maybe it never existed, or perhaps it moved when you were not looking. Either way, you are here now.
          </p>

          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.history.back()}
              className="inline-block px-8 py-3 border-2 border-[#2a2520] text-xs tracking-[0.2em] font-medium hover:bg-[#2a2520] hover:text-white transition-all"
            >
              GO BACK
            </button>
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#2a2520] text-white text-xs tracking-[0.2em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-all"
            >
              BACK TO HOME
            </Link>
          </div>
        </div>

        {/* Decorative corner lines */}
        <div className="absolute top-20 left-6 w-8 h-[1px] bg-[#2a2520]/20" />
        <div className="absolute top-20 left-6 w-[1px] h-8 bg-[#2a2520]/20" />
        <div className="absolute bottom-20 right-6 w-8 h-[1px] bg-[#2a2520]/20" />
        <div className="absolute bottom-20 right-6 w-[1px] h-8 bg-[#2a2520]/20" />
      </div>
    </>
  );
}
