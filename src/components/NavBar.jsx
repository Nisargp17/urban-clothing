function NavBar() {
  return (
    <nav className="flex flex-col justify-between items-center w-[10vw] h-screen absolute py-[2vh]">
      {/* Name box */}
      <div className="mt-[15vh] w-[30vw] h-[8vh] overflow-hidden rotate-270 group relative">
        <div className="transition-transform duration-700 ease-in-out group-hover:-translate-y-[50%]">
          <div className="h-[8vh] flex items-center justify-center">
            <span className="text-[1.5vw] font-[600] whitespace-nowrap">
              URBAN CLOTHING
            </span>
          </div>
          <div className="h-[8vh] flex items-center justify-center">
            <span className="text-[1.5vw] font-[600] whitespace-nowrap">
              URBAN CLOTHING
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[1vh] text-[1vw]">
        {["SHOP", "COLLECTIONS", "ABOUT"].map((label) => (
          <div
            key={label}
            className="h-[2vh] overflow-hidden group relative w-max"
          >
            <div className="transition-transform duration-500 ease-in-out group-hover:-translate-y-[50%]">
              <div className="h-[2vh] flex items-center justify-center">
                {label}
              </div>
              <div className="h-[2vh] flex items-center justify-center">
                {label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
