import "./main.css";
function Comp3() {
  const repeatedText = Array(20)
    .fill("DO NOT SCROLL . URBAN CLOTHING . ")
    .join("");
  return (
    <>
      <section className="h-[40vh] mt-[10vh]">
        <div className="h-[10vh] text-[3vw] flex items-center bg-[#ddc92a] border-y-[5px] border-y-[#141414] overflow-hidden relative">
          <div className="flex animate-marquee">
            <div className="whitespace-nowrap">{repeatedText}</div>
            <div className="whitespace-nowrap">{repeatedText}</div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Comp3;
