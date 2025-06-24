import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Comp4() {
  useEffect(() => {
    const textElements = gsap.utils.toArray(".text-element");
    const textBoxes = gsap.utils.toArray(".text-box");

    gsap.set(textBoxes, { height: 0, overflow: "hidden" });
    gsap.set(textElements, { opacity: 0, y: 50 });

    ScrollTrigger.create({
      trigger: ".comp4-section",
      start: "top 70%",
      end: "bottom 10%",
      scrub: true,
      onEnter: () => {
        gsap.to(textBoxes, {
          height: "auto",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        });

        gsap.to(textElements, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });
      },
    });
  }, []);

  return (
    <section className="comp4-section h-[60vh] flex flex-col ml-[20vw]">
      <div className="flex gap-[11vw] items-center">
        <div className="text-box">
          <div className="text-element underline text-[2vw] font-[300]">
            WHO ARE WE
          </div>
        </div>
        <div className="text-box">
          <div className="text-element text-[4vw] font-[500]">
            An independent brand of
          </div>
        </div>
      </div>
      <div className="text-box">
        <div className="text-element text-[4vw] font-[500]">
          urban trekking shoes and accessories
        </div>
      </div>
      <div className="text-box">
        <div className="text-element text-[4vw] font-[500]">
          that comes from a convergence of
        </div>
      </div>
      <div className="text-box">
        <div className="text-element text-[4vw] font-[500]">
          arts and personalities.
        </div>
      </div>
    </section>
  );
}

export default Comp4;
