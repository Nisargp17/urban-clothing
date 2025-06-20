import Img1 from "/src/assets/HeroImg1.jpg";
import Img2 from "/src/assets/HeroImg2.jpg";
import Img3 from "/src/assets/circle.svg";
import Img4 from "/src/assets/arrow.svg";
function Comp2() {
  return (
    <>
      <section className="flex flex-col items-end gap-[5vh] mr-[10vw] mt-[5vh] ">
        <div className="img flex gap-[4vh]">
          <div className="w-[34vw]">
            <img className="border-[5px] border-[#141414]" src={Img1} alt="" />
            <div className="flex gap-[25vh]">
              <div>[ 01 ]</div>
              <div>MENS</div>
            </div>
          </div>
          <div className="w-[34vw]">
            <img className="border-[5px] border-[#141414]" src={Img2} alt="" />
            <div className="flex gap-[25vh]">
              <div>[ 02 ]</div>
              <div>WMNS</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center gap-[5vh]">
          <div className="text-[2vw]">EXPLORE</div>
          <div className="w-[5vw] relative">
            <img className="w-full" src={Img3} alt="circle" />
            <img
              className="absolute top-1/2 left-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%]"
              src={Img4}
              alt="arrow"
            />
          </div>
        </div>
      </section>
    </>
  );
}
export default Comp2;
