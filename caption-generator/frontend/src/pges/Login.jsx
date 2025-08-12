import { useForm } from "react-hook-form";
import { useContext,useRef, useState } from "react";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/Context";

function Login() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const { setUser } = useContext(AuthContext);

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
        setUser(true);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data.message || "Login failed.");
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/auth/register",
          data,
          { withCredentials: true }
        );
        toast.success("Registration successful.");
        setUser(true);
        navigate("/");
      } catch (error) {
        toast.error(error.response?.data.message || "registration failed");
      }
    }
  };
  return (
    <div className="shadow-xl/20 z-33 absolute w-[100vw] h-[90vh] bg-transparent flex items-center justify-center p-4">
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
  );
}

export default Login;
