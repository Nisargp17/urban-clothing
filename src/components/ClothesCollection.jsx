import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "/src/assets/col1.jpg";
import img2 from "/src/assets/col2.jpg";
import img3 from "/src/assets/col3.jpg";
import img4 from "/src/assets/col4.jpg";
import img5 from "/src/assets/col5.jpg";
import img6 from "/src/assets/col6.jpg";
import img7 from "/src/assets/col7.jpg";
import img8 from "/src/assets/col8.jpg";
import img9 from "/src/assets/col9.jpg";
import shoelable from "/src/assets/shoelable.svg";
import circle from "/src/assets/circle.svg";
import arrow from "/src/assets/arrow.svg";

gsap.registerPlugin(Draggable, ScrollTrigger);

const shoesData = [
  { id: 1, img: img1 },
  { id: 2, img: img2 },
  { id: 3, img: img3 },
  { id: 4, img: img4 },
  { id: 5, img: img5 },
  { id: 6, img: img6 },
  { id: 7, img: img7 },
  { id: 8, img: img8 },
  { id: 9, img: img9 },
];

function ClothedCollection() {
  const scrollContainerRef = useRef(null);
  const currentIndexRef = useRef(0);
  const cardWidthRef = useRef(0);
  const containerOffsetX = useRef(0);
  const totalCards = shoesData.length;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const cards = container.children;
    if (!cards.length) return;

    const card = cards[0];
    const cardWidth =
      card.offsetWidth + parseFloat(getComputedStyle(container).gap || "0");
    cardWidthRef.current = cardWidth;

    const initialOffset =
      window.innerWidth / 2 -
      card.offsetWidth / 2 -
      (40 * window.innerWidth) / 100;
    containerOffsetX.current = initialOffset;

    gsap.set(container, {
      x: -cardWidth * currentIndexRef.current + initialOffset,
    });

    const draggable = Draggable.create(container, {
      type: "x",
      inertia: true,
      edgeResistance: 0.85,
      onRelease: function () {
        const delta = this.getDirection() === "left" ? 1 : -1;
        const newIndex = Math.min(
          Math.max(currentIndexRef.current + delta, 0),
          totalCards - 1
        );
        currentIndexRef.current = newIndex;

        const newX = -cardWidth * newIndex + initialOffset;

        gsap.to(container, {
          x: newX,
          duration: 1,
          ease: "back",
        });
      },
      onThrowComplete: function () {
        const finalX = container._gsap.x;
        const relativeX = finalX - initialOffset;
        const index = Math.round(-relativeX / cardWidth);
        const clampedIndex = Math.min(Math.max(index, 0), totalCards - 1);
        currentIndexRef.current = clampedIndex;

        const newX = -cardWidth * clampedIndex + initialOffset;
        gsap.to(container, {
          x: newX,
          duration: 0.3,
          ease: "power2.out",
        });
      },
    })[0];

    return () => {
      draggable.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden w-full h-[100vh] relative">
      <div className="highlighted-box absolute z-10 top-[9.3vh] right-[37.8vw] border-[5px] border-[#141414] h-[66vh] w-[24.4vw] pointer-events-none"></div>

      <div
        ref={scrollContainerRef}
        className="flex w-max gap-[5vh] hide-scrollbar mt-[10vh] pl-[40vw] cursor-grab"
      >
        {shoesData.map((shoe) => (
          <div
            key={shoe.id}
            className="flex-shrink-0 flex flex-col justify-center items-center h-[64.6vh] w-[24vw]"
          >
            <img src={shoe.img} alt={`Shoe ${shoe.id}`} />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-[10vh] mr-[10vw] items-center gap-[5vh]">
        <div className="w-[5vw] relative hover:rotate-[720deg] hover:scale-110 transition-all duration-1500">
          <img className="w-full" src={circle} alt="circle" />
          <img
            className="absolute rotate-180 top-1/2 left-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%]"
            src={arrow}
            alt="arrow"
          />
        </div>
        <div className="w-[5vw] relative hover:rotate-[720deg] hover:scale-110 transition-all duration-1500">
          <img className="w-full" src={circle} alt="circle" />
          <img
            className="absolute top-1/2 left-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%]"
            src={arrow}
            alt="arrow"
          />
        </div>
      </div>
    </section>
  );
}

export default ClothedCollection;
