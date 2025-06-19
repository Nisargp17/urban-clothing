function Hero() {
  return (
    <>
      <section className=" h-[75vh] flex flex-col items-end justify-end mr-[10vw]">
        <div className="font-[600] text-[13vw] leading-none">SPRING,</div>
        <div className="font-[600] text-[13vw] flex leading-none">
          <div className="m-0 p-0 leading-none">SUMMER</div>
          <div className="text-[4vw] font-[400] flex flex-col items-end justify-start leading-none pt-[2vh]">
            <span className="leading-none">COLL.</span>
            <span className="leading-none text-[3vw]">2025</span>
          </div>
        </div>
      </section>
    </>
  );
}
export default Hero;
