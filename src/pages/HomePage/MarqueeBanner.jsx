import { Marquee } from '../../components/Marquee';

export function MarqueeBanner() {
  return (
    <section className="py-8 md:py-16 overflow-hidden">
      {/* Top marquee - left to right */}
      <div className="border-y-2 md:border-y-[3px] border-[#2a2520] py-3 md:py-5 bg-[#2a2520]">
        <Marquee speed={25} direction="left">
          <span className="text-[8vw] md:text-[4vw] font-semibold text-[#f5efe6] tracking-tight mx-4 md:mx-8">
            URBAN TREKKING
          </span>
          <span className="text-[#c4a35a] text-[6vw] md:text-[3vw] mx-4 md:mx-8">●</span>
          <span className="text-[8vw] md:text-[4vw] font-semibold text-[#f5efe6] tracking-tight mx-4 md:mx-8">
            PREMIUM FOOTWEAR
          </span>
          <span className="text-[#c4a35a] text-[6vw] md:text-[3vw] mx-4 md:mx-8">●</span>
          <span className="text-[8vw] md:text-[4vw] font-semibold text-[#f5efe6] tracking-tight mx-4 md:mx-8">
            SPRING / SUMMER 2025
          </span>
          <span className="text-[#c4a35a] text-[6vw] md:text-[3vw] mx-4 md:mx-8">●</span>
        </Marquee>
      </div>

      {/* Bottom marquee - right to left, inverted */}
      <div className="border-b-2 md:border-b-[3px] border-[#2a2520] py-3 md:py-5 bg-[#f5efe6]">
        <Marquee speed={20} direction="right">
          <span className="text-[6vw] md:text-[3vw] font-medium text-[#2a2520] tracking-wider mx-4 md:mx-8 opacity-40">
            FREE SHIPPING OVER RS. 5000
          </span>
          <span className="text-[#c4a35a] text-[4vw] md:text-[2vw] mx-4 md:mx-8">◆</span>
          <span className="text-[6vw] md:text-[3vw] font-medium text-[#2a2520] tracking-wider mx-4 md:mx-8 opacity-40">
            HANDCRAFTED IN INDIA
          </span>
          <span className="text-[#c4a35a] text-[4vw] md:text-[2vw] mx-4 md:mx-8">◆</span>
          <span className="text-[6vw] md:text-[3vw] font-medium text-[#2a2520] tracking-wider mx-4 md:mx-8 opacity-40">
            30-DAY RETURNS
          </span>
          <span className="text-[#c4a35a] text-[4vw] md:text-[2vw] mx-4 md:mx-8">◆</span>
        </Marquee>
      </div>
    </section>
  );
}
