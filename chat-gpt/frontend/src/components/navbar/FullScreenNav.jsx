import React, { useContext, useEffect, useRef } from "react";
import { navbarContext } from "../../context/NavContext";
import { gsap } from "gsap";
import gpt from "../../assets/gpt.png";
import { FaInstagram } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

function FullScreenNav() {
  const fullNavRef = useRef(null);
  const tl = useRef();
  const { open, setOpen } = useContext(navbarContext);
  useEffect(() => {
    fullNavRef.current.classList.remove("hidden");
    fullNavRef.current.classList.add("flex");
    tl.current = gsap.timeline({ paused: true });
    tl.current
      .to(fullNavRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.out",
      })
      .from(".link", {
        rotateX: 90,
        delay: -0.2,
        duration: 0.3,
        ease: "power2.out",
        stagger: {
          amount: 0.2,
        },
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
        className="hidden absolute z-50 -top-[100%] flex-col justify-center left-0 w-full h-full bg-black"
      >
        <div className="w-[100vw] sm:w-[60%] text-white flex justify-between items-center h-[4rem] px-[3rem] mt-6 backdrop-blur-[2rem]">
          <img className="w-[3rem] h-[4rem]" src={gpt} />
          <IoClose
            onClick={() => {
              setOpen(false);
            }}
            className="text-3xl text-white sm:hidden"
          />
        </div>
        <div className="relative w-full h-full text-white flex justify-center items-center">
          <div>
            <div className="link w-[100vw] uppercase text-center text-2xl py-4 border-t-1 border-b-1 border-white">
              <h1>home</h1>
            </div>
            <div className="link w-[100vw] uppercase text-center text-2xl py-4 border-b-1 border-white">
              <h1>about</h1>
            </div>
            <div className="link w-[100vw] uppercase text-center text-2xl py-4 border-b-1 border-white">
              <h1>contact us</h1>
            </div>
            <div className="link w-[100vw] uppercase text-center text-2xl py-4 px-7">
              <button className="w-full text-black bg-white rounded-full py-[0.47rem] px-4">
                Explore
              </button>
            </div>
          </div>

            <div className="link absolute top-2 right-6">
              <button className="text-black bg-white rounded-full py-[0.47rem] px-4">
                Log In
              </button>
            </div>
          
          <div className="link absolute bottom-6 right-6">
            <p className="text-white text-sm">© 2024 ChatGPT</p>
          </div>
          <div className="link absolute bottom-6 left-6">
            <div className="flex justify-center items-center">
              <FaInstagram color={"white"} size={23} />
              <FaGithub color={"white"} size={23} className="ml-4" />
              <FaLinkedin color={"white"} size={23} className="ml-4" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FullScreenNav;
