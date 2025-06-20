import mail from "/src/assets/email.svg";
import circle from "/src/assets/circle.svg";
import arrow from "/src/assets/arrow.svg";

function Footer() {
  return (
    <section className="relative  h-[60vh] bg-[#f8f5eb] flex justify-between items-center px-[5vw] z-50">
      <div className="flex flex-col justify-between h-[40vh]">
        <img className="w-[4vw]" src={mail} alt="mail" />

        <div>
          <div className="text-[1vw] text-gray-700 mb-2">
            SUBSCRIBE TO OUR NEWSLETTER
          </div>
          <div className="border-b-[2px] pb-[2vh] flex gap-2 items-center">
            <input
              className="w-[20vw] text-[1.2vw] bg-transparent outline-none"
              type="email"
              placeholder="email address"
            />
            <button className="text-[1vw]" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-[8vw] items-start">
        <div className="flex gap-[5vw]">
          <div className="flex flex-col gap-[2vh] text-[1.5vw]">
            {["FAQ", "RETURNS", "CONTACTS"].map((label) => (
              <div
                key={label}
                className="h-[5vh] overflow-hidden group relative w-max"
              >
                <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-[50%]">
                  <div className="h-[5vh] flex items-center justify-start">
                    {label}
                  </div>
                  <div className="h-[5vh] flex items-center justify-start">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-[2vh] text-[1.5vw]">
            {["TERMS", "PRIVACY", "COOKIE"].map((label) => (
              <div
                key={label}
                className="h-[5vh] overflow-hidden group relative w-max"
              >
                <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-[50%]">
                  <div className="h-[5vh] flex items-center justify-start">
                    {label}
                  </div>
                  <div className="h-[5vh] flex items-center justify-start">
                    {label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center rotate-[270deg] hover:rotate-[990deg] hover:scale-110 transition-all duration-1500">
          <div className="w-[5vw] relative">
            <img className="w-full" src={circle} alt="circle" />
            <img
              className="absolute top-1/2 left-1/2 w-[50%] translate-x-[-50%] translate-y-[-50%]"
              src={arrow}
              alt="arrow"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
