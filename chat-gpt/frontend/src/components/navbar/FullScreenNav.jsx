import React, { useContext, useEffect, useRef } from "react";
import { navbarContext } from "../../context/NavContext";
import { gsap } from "gsap";
import gpt from "../../assets/gpt.png";
import { IoClose } from "react-icons/io5"

function FullScreenNav() {
  const fullNavRef = useRef(null);
  const tl = useRef();
  const { open, setOpen } = useContext(navbarContext);
  useEffect(() => {
    fullNavRef.current.classList.remove("hidden");
    fullNavRef.current.classList.add("flex");
    tl.current = gsap.timeline({ paused: true });
    tl.current.to(fullNavRef.current, {
      y: "100%",
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);
  useEffect(() => {
    if (open) {
      tl.current.play();
    } else {
      tl.current.reverse();
    }
  }, [open]);
  return (
    <>
      <div
        ref={fullNavRef}
        className="hidden absolute z-50 -top-[100%] justify-center left-0 w-full h-full bg-black"
      >
        <div
          className="w-[100vw] sm:w-[60%] text-white flex justify-between items-center h-[4rem] px-[3rem] mt-6 backdrop-blur-[2rem]"
        >
          <img className="w-[3rem] h-[4rem]" src={gpt} />
          <IoClose
            onClick={() => {
              setOpen(false);
            }}
            className="text-3xl text-white sm:hidden"
          />
        </div>
      </div>
    </>
  );
}

export default FullScreenNav;
