import { useEffect } from "react";
import gsap from "gsap";
import Img1 from "/src/assets/HeroImg1.jpg";
import Img2 from "/src/assets/HeroImg2.jpg";
import Img3 from "/src/assets/circle.svg";
import Img4 from "/src/assets/arrow.svg";

function Comp2() {
  useEffect(() => {
    const imgContainers = gsap.utils.toArray(".img-container");
    const exploreText = document.querySelector(".explore-text");
    const circle = document.querySelector(".circle");

    gsap.set(imgContainers, { opacity: 0, y: 50 });
    gsap.set([exploreText, circle], { opacity: 0, y: 50 });

    gsap.to(imgContainers, {
      opacity: 1,
      y: 0,
      stagger: 0.3,
      delay: 1,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to(exploreText, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 1.5,
      ease: "power3.out",
    });

    gsap.to(circle, {
      opacity: 1,
      y: 0,
      rotation: 720,
      scale: 1.1,
      duration: 1.5,
      delay: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <section className="flex flex-col items-end gap-[5vh] mr-[10vw] mt-[5vh]">
      <div className="img flex gap-[4vh]">
        <div className="img-container w-[34vw]">
          <img className="border-[5px] border-[#141414]" src={Img1} alt="" />
          <div className="flex gap-[25vh]">
            <div>[ 01 ]</div>
            <div>MENS</div>
          </div>
        </div>

        <div className="img-container w-[34vw]">
          <img className="border-[5px] border-[#141414]" src={Img2} alt="" />
          <div className="flex gap-[25vh]">
            <div>[ 02 ]</div>
            <div>WMNS</div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center gap-[5vh]">
        <div className="explore-text text-[2vw] hover:underline transition-all duration-1000">
          <Link to="/COLLECTIONS">EXPLORE</Link>
        </div>

        <div className="circle w-[5vw] relative hover:rotate-[720deg] hover:scale-110 transition-all duration-1500">
          <img className="w-full" src={Img3} alt="circle" />
          <img
            className="absolute top-1/2 left-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%]"
            src={Img4}
            alt="arrow"
          />
        </div>
      </div>
    </section>
  );
}

export default Comp2;
