import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { AuthContext } from "../context/Context";

function Home() {
  const fileRef = useRef();
  const contentRef = useRef();
  const loginRef = useRef();
  const captionRef = useRef();
  const imgRef = useRef();
  const mainRef = useRef();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to(imgRef.current, {
      borderTopLeftRadius: "80%",
      borderBottomRightRadius: "80%",
      duration: 1,
      ease: "power2.out",
    });
    tl.from(contentRef.current.children, {
      scale: 0,
      opacity: 0,
      duration: 0.9,
      delay: -1,
      ease: "power2.out",
      stagger: 0.07,
    });
    tl.from(captionRef.current.children, {
      opacity: 0,
      duration: 0.1,
      delay: -0.5,
      ease: "power2.out",
      stagger: 0.03,
    });
  });

  const handleUploadClick = (dets) => {
    const file = dets.target.files[0];
    navigate("/upload", { state: { file } });
  };

  return (
    <>
      <div
        ref={mainRef}
        className="flex items-center justify-center h-[86vh] mt-[1rem] bg-white px-4"
      >
        <div className="flex flex-col w-0 sm:w-[50%] items-start justify-center h-full bg-white px-4">
          <div className="w-[90%] h-[90%] ">
            <img
              ref={imgRef}
              className="w-full h-[90%] shadow-xl/30 object-cover rounded-tl-full rounded-br-full"
              src="/image/volleyball.avif"
              alt=""
            />
          </div>
          <div
            ref={captionRef}
            className="border border-gray-400 -mt-[2rem] px-1 overflow-y-auto py-3 rounded-lg text-black/90 font-black hidden sm:block sm:w-full h-[10%]"
          >
            {[
              ..."Transform pixels into caption with AI-powered captioning",
            ].map((char, idx) => (
              <span key={idx} className="text-lg">
                {char}
              </span>
            ))}
          </div>
        </div>
        <div
          ref={contentRef}
          className="flex w-[100%] sm:w-[50%] flex-col items-center justify-center h-full bg-white px-4"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center">
            Upload an image to <br />
            <span className="text-black font-bolder">genrate ai caption</span>
          </h1>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadClick}
            name="img"
            ref={fileRef}
          />
          <button
            onClick={() => {
              if (!user) {
                navigate("/login");
                return;
              }
              fileRef.current.click();
            }}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-md"
          >
            Upload Image
          </button>

          <p className="mt-4 text-black/80 font-semibold">or drop a file.</p>
          <p className="text-sm font-semibold mt-12 max-w-md text-center text-black/80">
            By uploading an image or URL you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>
            . To learn more about how we handle data, read our{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
