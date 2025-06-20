import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import img1 from "/src/assets/shoe1.jpg";
import img2 from "/src/assets/shoe2.jpg";
import img3 from "/src/assets/shoe3.jpg";
import img4 from "/src/assets/shoe4.jpg";
import img5 from "/src/assets/shoe5.jpg";
import shoelable from "/src/assets/shoelable.svg";
import circle from "/src/assets/circle.svg";
import arrow from "/src/assets/arrow.svg";
import "../index.css";

gsap.registerPlugin(Draggable);
gsap.registerPlugin(ScrollTrigger);

const shoesData = [
  { id: 1, img: img1, title: "CACTUS", oldPrice: 5000, newPrice: 3200 },
  { id: 2, img: img2, title: "THE EYE", oldPrice: 4500, newPrice: 3100 },
  { id: 3, img: img3, title: "DURAN", oldPrice: 4800, newPrice: 3300 },
  { id: 4, img: img4, title: "THE CODE", oldPrice: 4700, newPrice: 2900 },
  { id: 5, img: img5, title: "CARNERA", oldPrice: 4900, newPrice: 3400 },
];

function Shoes() {
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
      <div
        ref={scrollContainerRef}
        className="flex w-max gap-[5vh] hide-scrollbar pl-[20vw] cursor-grab"
      >
        {shoesData.map((shoe) => (
          <div
            key={shoe.id}
            className="flex-shrink-0 flex flex-col justify-center items-center border-[3px] border-[#141414] bg-[#e7d6c4] h-[70vh] w-[29vw]"
          >
            <div className="w-[20vw]">
              <img src={shoe.img} alt={shoe.title} />
            </div>
            <img className="h-[3vh]" src={shoelable} alt="label" />
            <div>SS/20</div>
            <div className="text-[5vw] font-[600]">{shoe.title}</div>
            <div className="text-[1.5vw] line-through">Rs. {shoe.oldPrice}</div>
            <div className="text-[2vw]">Rs. {shoe.newPrice}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-[10vh] mr-[10vw] items-center gap-[5vh]">
        <div className="text-[2vw]">SHOP ALL</div>
        <div className="w-[5vw] relative">
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

export default Shoes;
