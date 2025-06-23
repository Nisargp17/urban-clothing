import Img1 from "/src/assets/shoe1.jpg";
import Img2 from "/src/assets/shoe2.jpg";
import Img3 from "/src/assets/shoe3.jpg";
import Img4 from "/src/assets/shoe4.jpg";
import Img5 from "/src/assets/shoe5.jpg";
import shoelable from "/src/assets/shoelable.svg";
const shoesData = [
  { id: 1, img: Img1, title: "CACTUS", oldPrice: 5000, newPrice: 3200 },
  { id: 2, img: Img2, title: "THE EYE", oldPrice: 4500, newPrice: 3100 },
  { id: 3, img: Img3, title: "DURAN", oldPrice: 4800, newPrice: 3300 },
  { id: 4, img: Img4, title: "THE CODE", oldPrice: 4700, newPrice: 2900 },
  { id: 5, img: Img5, title: "CARNERA", oldPrice: 4900, newPrice: 3400 },
];
function Shop() {
  return (
    <>
      <section className="flex gap-[3vh] justify-center items-center">
        <div
          //   ref={scrollContainerRef}
          className="flex flex-col w-max gap-[3vh] hide-scrollbar cursor-grab"
        >
          {shoesData.map((shoe) => (
            <div
              key={shoe.id}
              className="flex flex-col justify-center items-center border-[3px] border-[#141414] bg-[#e7d6c4] h-[95vh] w-[38vw]"
            >
              <div className="w-[30vw]">
                <img src={shoe.img} alt={shoe.title} />
              </div>
              <img className="h-[3vh]" src={shoelable} alt="label" />
              <div>SS/20</div>
              <div className="text-[5vw] font-[600]">{shoe.title}</div>
              <div className="text-[1.5vw] line-through">
                Rs. {shoe.oldPrice}
              </div>
              <div className="text-[2vw]">Rs. {shoe.newPrice}</div>
            </div>
          ))}
        </div>
        <div
          //   ref={scrollContainerRef}
          className="flex flex-col w-max gap-[3vh] hide-scrollbar cursor-grab"
        >
          {shoesData.map((shoe) => (
            <div
              key={shoe.id}
              className="flex flex-col justify-center items-center border-[3px] border-[#141414] bg-[#e7d6c4] h-[95vh] w-[38vw]"
            >
              <div className="w-[30vw]">
                <img src={shoe.img} alt={shoe.title} />
              </div>
              <img className="h-[3vh]" src={shoelable} alt="label" />
              <div>SS/20</div>
              <div className="text-[5vw] font-[600]">{shoe.title}</div>
              <div className="text-[1.5vw] line-through">
                Rs. {shoe.oldPrice}
              </div>
              <div className="text-[2vw]">Rs. {shoe.newPrice}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export default Shop;
