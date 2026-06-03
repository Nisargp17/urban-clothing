import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { HERO_IMAGES } from '../../data/collections';
import circle from '/src/assets/circle.svg';
import arrow from '/src/assets/arrow.svg';

export function FeaturedCategories() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imgContainers = section.querySelectorAll('.img-container');
    const exploreText = section.querySelector('.explore-text');
    const circleEl = section.querySelector('.circle-btn');

    gsap.set(imgContainers, { opacity: 0, y: 50 });
    gsap.set([exploreText, circleEl], { opacity: 0, y: 50 });

    gsap.to(imgContainers, {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      delay: 0.5,
      duration: 1,
      ease: 'power3.out',
    });

    gsap.to(exploreText, {
      opacity: 1, y: 0, duration: 1, delay: 0.8, ease: 'power3.out',
    });

    gsap.to(circleEl, {
      opacity: 1, y: 0, rotation: 720, scale: 1.1, duration: 1.5, delay: 0.8, ease: 'power3.out',
    });

    return () => {
      gsap.killTweensOf([...imgContainers, exploreText, circleEl]);
    };
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col items-end gap-[3vh] md:gap-[5vh] ml-4 md:ml-[6vw] mr-4 md:mr-[10vw] mt-[3vh] md:mt-[5vh]">
      <div className="flex flex-col md:flex-row gap-6 md:gap-[4vh] w-full md:w-auto">
        {HERO_IMAGES.map((item) => (
          <div key={item.id} className="img-container w-full md:w-[34vw] group">
            <div className="overflow-hidden border-[3px] md:border-[5px] border-[#2a2520]">
              <img
                className="w-full transition-transform duration-700 ease-out group-hover:scale-105"
                src={item.img}
                alt={item.label}
                loading="lazy"
              />
            </div>
            <div className="flex justify-between items-center mt-3 px-1">
              <span className="text-xs md:text-sm tracking-[0.15em] opacity-60">[ {item.index} ]</span>
              <span className="text-xs md:text-sm font-medium tracking-[0.2em]">{item.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-[2vh] md:gap-[5vh]">
        <div className="explore-text text-lg md:text-[2vw] hover:underline transition-all duration-1000 opacity-0">
          <Link to="/collections">EXPLORE</Link>
        </div>
        <Link to="/collections" className="circle-btn w-[8vw] md:w-[5vw] relative opacity-0 hover:rotate-[720deg] hover:scale-110 transition-all duration-1500">
          <img className="w-full" src={circle} alt="circle" loading="lazy" decoding="async" />
          <img className="absolute top-1/2 left-1/2 w-[50%] -translate-x-1/2 -translate-y-1/2" src={arrow} alt="arrow" loading="lazy" decoding="async" />
        </Link>
      </div>
    </section>
  );
}
