import React, { useEffect, useRef } from "react";
import Img1 from "/src/assets/shoe1.jpg";
import Img2 from "/src/assets/shoe2.jpg";
import Img3 from "/src/assets/shoe3.jpg";
import Img4 from "/src/assets/shoe4.jpg";
import Img5 from "/src/assets/shoe5.jpg";
import shoelable from "/src/assets/shoelable.svg";
import { gsap } from "gsap";

const shoesData = [
  { id: 1, img: Img1, title: "CACTUS", oldPrice: 5000, newPrice: 3200 },
  { id: 2, img: Img2, title: "THE EYE", oldPrice: 4500, newPrice: 3100 },
  { id: 3, img: Img3, title: "DURAN", oldPrice: 4800, newPrice: 3300 },
  { id: 4, img: Img4, title: "THE CODE", oldPrice: 4700, newPrice: 2900 },
  { id: 5, img: Img5, title: "CARNERA", oldPrice: 4900, newPrice: 3400 },
];

function Shop() {
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const leftDiv = leftRef.current;
    const rightDiv = rightRef.current;

    const itemHeight = leftDiv.querySelector(".item").offsetHeight + 24;
    const totalItems = shoesData.length * 3;
    const totalHeight = itemHeight * totalItems;

    gsap.to(leftDiv, {
      y: `-=${totalHeight}px`,
      duration: 200,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
      },
    });

    gsap.to(rightDiv, {
      y: `+=${totalHeight}px`,
      duration: 200,
      ease: "none",
      repeat: -1,
      modifiers: {
        y: gsap.utils.unitize((y) => parseFloat(y) % totalHeight),
      },
    });
  }, []);

  const extendedLeft = [
    shoesData[shoesData.length - 1],
    ...shoesData,
    ...shoesData,
  ];
  const extendedRight = [...shoesData, ...shoesData, shoesData[0]];

  const renderItems = (data, side) =>
    data.map((shoe, index) => (
      <div
        key={`${side}-${index}`}
        className="item flex flex-col justify-center items-center border-[3px] border-[#141414] bg-[#e7d6c4] h-[95vh] w-[38vw]"
      >
        <div className="w-[30vw]">
          <img src={shoe.img} alt={shoe.title} />
        </div>
        <img className="h-[3vh]" src={shoelable} alt="label" />
        <div>SS/20</div>
        <div className="text-[5vw] font-[600]">{shoe.title}</div>
        <div className="text-[1.5vw] line-through">Rs. {shoe.oldPrice}</div>
        <div className="text-[2vw]">Rs. {shoe.newPrice}</div>
      </div>
    ));

  return (
    <section className="flex gap-[3vh] justify-center items-center h-screen w-full bg-white overflow-hidden">
      <div
        ref={leftRef}
        className="left-div flex flex-col w-max gap-[3vh] cursor-grab"
      >
        {renderItems(extendedLeft, "left")}
      </div>

      <div
        ref={rightRef}
        className="right-div flex flex-col w-max gap-[3vh] cursor-grab"
      >
        {renderItems(extendedRight, "right")}
      </div>
    </section>
  );
}

export default Shop;
