const PRESS = ['VOGUE', 'GQ', 'HYPEBEAST', 'HIGH SNOBIETY', 'ESQUIRE', 'WALLPAPER*', 'THE FACE', 'I-D'];

export function PressStrip() {
  const content = PRESS.map((name) => (
    <span key={name} className="inline-flex items-center gap-4 mx-6 md:mx-10">
      <span className="text-sm md:text-base tracking-[0.2em] font-medium opacity-30 whitespace-nowrap">{name}</span>
      <span className="w-1.5 h-1.5 rounded-full bg-[#2a2520]/20" />
    </span>
  ));

  return (
    <section className="py-6 md:py-10 border-y border-[#2a2520]/10 overflow-hidden">
      <div className="flex animate-marquee-slow">
        {content}
        {content}
        {content}
      </div>
    </section>
  );
}
