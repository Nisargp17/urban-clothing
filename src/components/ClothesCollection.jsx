import { useEffect, useRef } from "react";
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

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);

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
  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const threshold = 20;

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const parentWidth = container.parentElement.clientWidth;
    const containerWidth = container.scrollWidth;

    const minX = Math.min(parentWidth - containerWidth, 0);
    const maxX = 0;

    const threshold = 20;
    const inertiaDuration = 0.7;

    const draggable = Draggable.create(container, {
      type: "x",
      inertia: true,
      bounds: { minX, maxX },
      edgeResistance: 0.4,
      cursor: "grab",
      activeCursor: "grabbing",
      throwProps: true,

      onPress() {
        dragStartX.current = this.pointerX;
        lastX.current = this.x;
      },

      onDrag() {
        const delta = this.pointerX - dragStartX.current;
        if (Math.abs(delta) < threshold) {
          gsap.to(container, {
            x: lastX.current,
            duration: 0.2,
            ease: "power2.out",
            overwrite: "auto",
          });
          this.update();
        }
      },

      onRelease() {
        const delta = Math.abs(this.pointerX - dragStartX.current);
        if (delta < threshold) {
          gsap.to(container, {
            x: lastX.current,
            duration: 0.3,
            ease: "power3.out",
          });
        }
      },

      onThrowUpdate() {
        lastX.current = this.x;
      },
      onThrowComplete() {
        lastX.current = this.x;
      },
    })[0];

    gsap.set(container, { x: 0 });
    lastX.current = 0;

    return () => draggable.kill();
  }, []);
  return (
    <section className="overflow-hidden w-full h-[90vh] relative">
      <div className="absolute z-10 top-[9.3vh] right-[35vw] border-[5px] border-[#141414]  h-[66vh] w-[24.4vw]"></div>
      <div
        ref={scrollContainerRef}
        className="flex  w-max gap-[5vh] hide-scrollbar mt-[10vh] pl-[40vw] cursor-grab"
      >
        {shoesData.map((shoe) => (
          <div
            key={shoe.id}
            className="flex-shrink-0 flex flex-col justify-center items-center  h-[64.6vh] w-[24vw]"
          >
            <img src={shoe.img} alt={shoe.title} />
          </div>
        ))}
      </div>
    </section>
  );
}
export default ClothedCollection;
