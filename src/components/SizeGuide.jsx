import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';

const SIZE_CHART = [
  { us: '6', uk: '5.5', eu: '39', cm: '24.5' },
  { us: '7', uk: '6.5', eu: '40', cm: '25.5' },
  { us: '8', uk: '7.5', eu: '41', cm: '26.5' },
  { us: '9', uk: '8.5', eu: '42', cm: '27.5' },
  { us: '10', uk: '9.5', eu: '43', cm: '28.5' },
  { us: '11', uk: '10.5', eu: '44', cm: '29.5' },
  { us: '12', uk: '11.5', eu: '45', cm: '30.5' },
];

export function SizeGuide({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    const prevTouchAction = document.body.style.touchAction;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(panelRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', delay: 0.05 });

    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
      document.body.style.touchAction = prevTouchAction;
    };
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: onClose,
    });
    tl.to(panelRef.current, { y: 40, opacity: 0, duration: 0.25, ease: 'power2.in' });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, 0.05);
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#2a2520]/80 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div
        ref={panelRef}
        className="relative bg-[#f5efe6] border-2 border-[#2a2520] w-[90vw] max-w-lg max-h-[80vh] overflow-y-auto shadow-[8px_8px_0px_0px_#2a2520]"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:p-6 border-b border-[#2a2520]/10">
          <div>
            <p className="text-[10px] tracking-[0.3em] opacity-40 mb-1">FOOTWEAR</p>
            <h3 className="text-xl md:text-2xl font-semibold">Size Guide</h3>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 border border-[#2a2520]/20 flex items-center justify-center hover:bg-[#2a2520] hover:text-white transition-all"
            aria-label="Close size guide"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Table */}
        <div className="p-5 md:p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[#2a2520]">
                  <th className="text-left py-3 px-2 text-[10px] tracking-[0.2em] opacity-40 font-medium">US</th>
                  <th className="text-left py-3 px-2 text-[10px] tracking-[0.2em] opacity-40 font-medium">UK</th>
                  <th className="text-left py-3 px-2 text-[10px] tracking-[0.2em] opacity-40 font-medium">EU</th>
                  <th className="text-left py-3 px-2 text-[10px] tracking-[0.2em] opacity-40 font-medium">CM</th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((row, i) => (
                  <tr
                    key={row.us}
                    className={`border-b border-[#2a2520]/10 ${i % 2 === 0 ? 'bg-[#e8ddd0]/30' : ''}`}
                  >
                    <td className="py-3 px-2 font-medium">{row.us}</td>
                    <td className="py-3 px-2 opacity-70">{row.uk}</td>
                    <td className="py-3 px-2 opacity-70">{row.eu}</td>
                    <td className="py-3 px-2 opacity-70">{row.cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure */}
          <div className="mt-6 p-4 bg-[#e8ddd0]/50 border border-[#2a2520]/10">
            <p className="text-[10px] tracking-[0.2em] opacity-40 mb-2">HOW TO MEASURE</p>
            <p className="text-xs opacity-70 leading-relaxed">
              Stand on a piece of paper with your heel against a wall. Mark the longest part of your foot and measure the distance in centimeters.
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
