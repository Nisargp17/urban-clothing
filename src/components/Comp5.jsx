import { useState, useEffect } from "react";
import img1 from "/src/assets/11.svg";

function Comp5() {
  const [showFirst, setShowFirst] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowFirst((prev) => !prev);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-[65vh] flex items-center justify-end mr-[10vw] overflow-hidden">
      <div className="w-[20vw]">
        <img src={img1} alt="" />
      </div>

      <div className="w-[40vw] h-[20vh] flex items-center justify-end relative overflow-hidden">
        <div
          className={`absolute w-[35vw] transition-all duration-1500 ease-in-out ${
            showFirst ? "translate-y-0" : "-translate-y-[10vw]"
          } text-[1.5vw] font-[400] leading-none`}
        >
          Good things come to those who wait – Urban Clothing is what has been
          missing in the modern fashion industry for years. Buy a shoe of high
          quality and design it finally happened.
        </div>

        <div
          className={`absolute w-[35vw] transition-all duration-1500 ease-in-out ${
            !showFirst ? "translate-y-0" : "translate-y-[10vw]"
          } text-[1.5vw] font-[400] leading-none`}
        >
          Urban Clothing is a convincer for anticipation. The urban trekking as
          never seen before. An exceptional product that has no equal alongside
          a great team represent the brand professionally.
        </div>
      </div>
    </section>
  );
}

export default Comp5;
