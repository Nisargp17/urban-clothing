import { useEffect } from "react";
import gsap from "gsap";

function Hero() {
  useEffect(() => {
    const springContainer = document.querySelector(".spring-container");
    const summerContainer = document.querySelector(".summer-container");

    gsap.set([springContainer, summerContainer], {
      height: 0,
      overflow: "hidden",
    });

    gsap.to([springContainer, summerContainer], {
      height: "auto",
      opacity: 1,
      delay: 1,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="h-[75vh] flex flex-col items-end justify-end mr-[10vw]">
      <div className="spring-container">
        <div className="font-[600] text-[13vw] leading-none">SPRING,</div>
      </div>

      <div className="summer-container">
        <div className="font-[600] text-[13vw] flex leading-none">
          <div className="m-0 p-0 leading-none">SUMMER</div>
          <div className="text-[4vw] font-[400] flex flex-col items-end justify-start leading-none pt-[2vh]">
            <span className="leading-none">COLL.</span>
            <span className="leading-none text-[3vw]">2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
