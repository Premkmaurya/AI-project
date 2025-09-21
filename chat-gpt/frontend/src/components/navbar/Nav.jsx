import { Link } from "react-router-dom";
import gpt from "../../assets/gpt.png";
import gsap from "gsap";
import { useRef, useEffect, useContext } from "react";
import { HiBars3 } from "react-icons/hi2";
import { navbarContext } from "../../context/NavContext";

function Nav() {
  const navRef = useRef(null);
  const { setOpen } = useContext(navbarContext);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: "50%",
      opacity: 0,
      delay: 4,
      duration: 1.3,
      ease: "power2.out",
    });
  }, []);
  return (
    <div className="none absolute z-3 w-full h-[5rem] py-5 bg-transparent flex items-center justify-center">
      <div
        ref={navRef}
        className="w-[90%] sm:w-[60%] shadow-xl/30 shadow-white/20 text-white flex justify-between items-center h-[4rem] px-[3rem] mt-6 backdrop-blur-[2rem] border border-white/30 rounded-4xl"
      >
        <img className="w-[3rem] h-[4rem]" src={gpt} />
        <HiBars3
          onClick={() => {
            setOpen(true);
          }}
          className="text-3xl text-white sm:hidden"
        />
        <div className="hidden sm:flex items-center gap-5 text-md ">
          <Link to={"/"}>Home</Link>
          <Link to={"/register"}>
            SignUp / <Link to={"/login"}>Login</Link>
          </Link>
          <Link to={document.cookie.includes("token") ? "/chat" : "/login"}>
            <button className="text-black bg-white rounded-lg py-[0.47rem] px-4">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Nav;
