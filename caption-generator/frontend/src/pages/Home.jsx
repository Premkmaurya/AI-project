import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {AuthContext} from "../context/Context"


function Home() {
  const fileRef = useRef();
  const contentRef = useRef();
  const loginRef = useRef();
  const captionRef = useRef();
  const imgRef = useRef();
  const mainRef = useRef();
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  
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


  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (isLoginView) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          data,
          { withCredentials: true }
        );
        toast.success("Login successful.");
        loginRef.current.classList.add("hidden");
        mainRef.current.classList.remove("blur-sm");
        setUser(true)
      } catch (error) {
        toast.error(error.response?.data?.message || "Login failed.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          data,
          { withCredentials: true }
        );
        loginRef.current.classList.add("hidden");
        mainRef.current.classList.remove("blur-sm");
        setUser(true);
      } catch (error) {
        toast.error(error.response?.data.message);
      }
    }
    reset();
  };

  return (
    <>
      <div
        ref={loginRef}
        className="hidden shadow-xl/20 z-33 absolute w-[100vw] h-[90vh] bg-transparent flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transform transition-transform duration-500 ease-in-out">
          {/* Toggle button for switching views */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLoginView(true)}
              className={`px-6 py-2 rounded-l-full font-semibold transition-all duration-300 ${
                isLoginView
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLoginView(false)}
              className={`px-6 py-2 rounded-r-full font-semibold transition-all duration-300 ${
                !isLoginView
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Sign Up
            </button>
          </div>

          {isLoginView ? (
            /* Login Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                Welcome Back
              </h2>

              {/* Email Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  autoComplete="none"
                  type="email"
                  placeholder="Email Address"
                  // Register the input with validation rules
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.email.message}
                </p>
              )}

              {/* Password Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  autoComplete="none"
                  type="password"
                  placeholder="Password"
                  // Register the input with validation rules
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.password.message}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </form>
          ) : (
            /* Sign Up Form */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                Create an Account
              </h2>

              {/* Email Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  autoComplete="none"
                  type="email"
                  placeholder="Email Address"
                  // Register the input with validation rules
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.email.message}
                </p>
              )}

              {/* Password Input */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                  autoComplete="none"
                  type="password"
                  placeholder="Password"
                  // Register the input with validation rules
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm ml-2">
                  {errors.password.message}
                </p>
              )}

              {/* Sign Up Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
              >
                Sign Up
              </button>
            </form>
          )}
        </div>
      </div>

      <div
        ref={mainRef}
        className="flex items-center justify-center h-[86vh] mt-[1rem] bg-white px-4"
      >
        <div className="flex flex-col w-[50%] items-start justify-center h-full bg-white px-4">
          <div className="w-[90%] h-[90%] ">
            <img
              ref={imgRef}
              className="w-full h-[90%] shadow-xl/30 object-cover rounded-tl-full rounded-br-full"
              src="https://ik.imagekit.io/sk6swwncb/posts/dcf17697-0fc4-47c8-8d74-12f2d2359658_grjbQsFO1L?updatedAt=1754827386950"
              alt=""
            />
          </div>
          <div
            ref={captionRef}
            className="border border-gray-400 -mt-[2rem] px-4 overflow-y-auto py-3 rounded-lg text-gray-800 w-full h-[10%]"
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
          className="flex w-[50%] flex-col items-center justify-center h-full bg-white px-4"
        >
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center">
            Upload an image to <br />
            <span className="text-black font-bold">genrate ai caption</span>
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
            onClick={() => fileRef.current.click()}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-md"
          >
            Upload Image
          </button>

          <p className="mt-4 text-gray-500">or drop a file.</p>
          <p className="text-xs text-gray-400 mt-12 max-w-md text-center">
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
