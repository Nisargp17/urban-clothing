import { useEffect, useState } from 'react';
import gsap from 'gsap';

export function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      },
    });

    // Animate progress
    gsap.to({}, {
      duration: 1.8,
      ease: 'power2.inOut',
      onUpdate: function () {
        setProgress(Math.round(this.progress() * 100));
      },
    });

    // Exit animation
    tl.to('.loader-bg', {
      y: '-100%',
      duration: 0.8,
      ease: 'power4.inOut',
      delay: 2,
    });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="loader-bg fixed inset-0 z-[99999] bg-[#2a2520] flex flex-col items-center justify-center text-[#f5efe6]">
      <div className="text-[10vw] md:text-[8vw] font-semibold tracking-tighter leading-none mb-4">
        URBAN
      </div>
      <div className="w-48 h-[2px] bg-[#f5efe6]/20 overflow-hidden">
        <div
          className="h-full bg-[#c4a35a] transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-3 text-xs tracking-[0.3em] opacity-60">{progress}%</div>
    </div>
  );
}
