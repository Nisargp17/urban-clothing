import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import { MagneticButton } from '../../components/MagneticButton';
import { HERO_IMAGES } from '../../data/collections';

export function HeroSection() {
  const containerRef = useRef(null);
  const frameRef = useRef(null);
  const innerImgRef = useRef(null);

  // Scroll parallax: image inside frame moves slower
  useEffect(() => {
    const handleScroll = () => {
      if (!innerImgRef.current) return;
      const y = window.scrollY * 0.15;
      innerImgRef.current.style.transform = `translateY(${y}px) scale(1.1)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Entrance animation
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const textEls = container.querySelectorAll('.hero-text');
    const frame = frameRef.current;

    gsap.set(textEls, { x: -60, opacity: 0 });
    gsap.set(frame, { x: 80, opacity: 0, rotation: 2 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(textEls, {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: 'power4.out',
      stagger: 0.12,
    })
    .to(frame, {
      x: 0,
      opacity: 1,
      rotation: 1,
      duration: 1.4,
      ease: 'power3.out',
    }, '-=0.8');

    return () => tl.kill();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen md:h-[95vh] overflow-hidden bg-[#f5efe6]"
    >
      {/* Decorative vertical line */}
      <div className="hidden md:block absolute left-[6vw] top-[15vh] bottom-[15vh] w-[2px] bg-[#2a2520]/10" />

      <div className="h-full flex flex-col md:flex-row items-center md:items-stretch pt-20 md:pt-0">
        {/* LEFT: Typography */}
        <div className="flex-1 flex flex-col justify-center px-4 md:pl-[10vw] md:pr-8 z-10">
          <p className="hero-text text-[10px] md:text-xs tracking-[0.3em] opacity-40 mb-4 md:mb-6">
            SS/25 COLLECTION
          </p>

          <h1 className="hero-text font-semibold text-[18vw] md:text-[9vw] leading-[0.85] tracking-tight">
            <span className="block">SPRING,</span>
            <span className="block">SUMMER</span>
          </h1>

          <div className="hero-text flex items-center gap-4 mt-3 md:mt-4">
            <span className="text-xs md:text-sm tracking-[0.2em] opacity-40 font-light">
              COLL. 2025
            </span>
            <span className="hidden md:block w-12 h-[1px] bg-[#2a2520]/20" />
            <span className="hidden md:block text-xs tracking-[0.2em] opacity-40 font-light">
              URBAN TREKKING
            </span>
          </div>

          <p className="hero-text text-sm md:text-base opacity-60 max-w-sm mt-6 md:mt-8 leading-relaxed">
            Designed for the modern explorer. Where urban architecture meets outdoor terrain.
          </p>

          {/* CTAs */}
          <div className="hero-text flex items-center gap-4 mt-6 md:mt-10">
            <MagneticButton strength={0.4}>
              <Link
                to="/shop"
                className="inline-block px-5 py-2.5 md:px-7 md:py-3 bg-[#2a2520] text-white text-xs tracking-[0.15em] font-medium hover:bg-[#c4a35a] hover:text-[#2a2520] transition-colors"
              >
                SHOP NOW
              </Link>
            </MagneticButton>
            <MagneticButton strength={0.2}>
              <Link
                to="/collections"
                className="inline-block text-xs tracking-[0.15em] font-medium underline underline-offset-4 opacity-60 hover:opacity-100 transition-opacity py-2.5 md:py-3"
              >
                VIEW LOOKBOOK
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT: Framed image (gallery print) */}
        <div className="flex-1 flex items-center justify-center md:justify-start px-4 md:px-0 md:pr-[5vw] mt-6 md:mt-0">
          <div
            ref={frameRef}
            className="relative w-[85vw] md:w-[38vw] aspect-[3/4] md:aspect-[4/5] border-[4px] md:border-[6px] border-[#2a2520] bg-[#e8ddd0] p-2 md:p-3 shadow-[12px_12px_0px_0px_#2a2520] md:shadow-[20px_20px_0px_0px_#2a2520]"
            style={{ transform: 'rotate(1deg)' }}
          >
            {/* Inner image with parallax */}
            <div className="relative w-full h-full overflow-hidden border-2 border-[#2a2520]/10">
              <img
                ref={innerImgRef}
                src={HERO_IMAGES[0].img}
                alt="Urban Clothing SS/25"
                className="w-full h-[120%] object-cover"
                style={{ transform: 'translateY(0) scale(1.1)' }}
                loading="eager"
                fetchpriority="high"
              />
            </div>

            {/* Frame label */}
            <div className="absolute -bottom-6 left-4 bg-[#c4a35a] text-[#2a2520] text-[9px] md:text-[10px] font-bold tracking-[0.2em] px-2 py-1 border-2 border-[#2a2520]">
              FIG. 01 — SS/25
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 opacity-30">
        <span className="text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-[1px] h-6 bg-[#2a2520]/40 animate-pulse" />
      </div>
    </section>
  );
}
