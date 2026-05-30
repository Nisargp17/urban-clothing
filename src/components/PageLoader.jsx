import { useEffect, useState } from 'react';

export function PageLoader() {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '' : prev + '.'));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f5efe6]">
      <div className="text-[10px] tracking-[0.3em] opacity-40 uppercase">LOADING{dots}</div>
    </div>
  );
}
