import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXT_LINES = [
  { label: 'WHO ARE WE', isLabel: true },
  { text: 'An independent brand of' },
  { text: 'urban trekking shoes and accessories' },
  { text: 'that comes from a convergence of' },
  { text: 'arts and personalities.' },
];

export function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const textElements = section.querySelectorAll('.text-element');
    const textBoxes = section.querySelectorAll('.text-box');

    gsap.set(textBoxes, { height: 0, overflow: 'hidden' });
    gsap.set(textElements, { opacity: 0, y: 50 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 10%',
        toggleActions: 'play none none none',
      },
    });

    tl.to(textBoxes, { height: 'auto', opacity: 1, duration: 0.8, ease: 'power3.out', stagger: 0.1 })
      .to(textElements, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.1 }, '<');

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="min-h-[30vh] md:min-h-[60vh] flex flex-col ml-4 md:ml-[6vw] py-8 md:py-[5vh] justify-center">
      {TEXT_LINES.map((line, i) => (
        <div key={i} className={`text-box overflow-hidden ${i === 0 ? 'flex flex-col md:flex-row gap-2 md:gap-[11vw] items-start md:items-center mb-2' : 'mb-1 md:mb-0'}`}>
          <div
            className={`text-element leading-tight md:leading-none ${
              line.isLabel
                ? 'underline text-sm md:text-[2vw] font-light tracking-[0.15em]'
                : 'text-xl sm:text-2xl md:text-[4vw] font-medium'
            }`}
          >
            {line.label || line.text}
          </div>
        </div>
      ))}
    </section>
  );
}
