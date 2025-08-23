import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'

export default function Register() {
  const [formData, setFormData] = useState({
    fullName:{
      firstName: "",
      lastName: "",
      },
    email: "",
    password: "",
  });

  const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "firstName" || name === "lastName") {
    // nested update ke liye
    setFormData((prev) => ({
      ...prev,
      fullName: {
        ...prev.fullName,
        [name]: value,
      },
    }));
  } else {
    // baaki fields (email, password)
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       const user = await axios.post("http://localhost:3000/api/auth/register",formData,{ withCredentials: true })
       navigate('/')
    }catch(err){
       console.log("error is occured",err)
    }
  };

  return (
    <div className="flex min-h-screen bg-[#202123] text-white">

      {/* Right Side Register Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md bg-[#242424] backdrop-blur-lg rounded-2xl shadow-2xl p-10 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center mb-6">Create an Account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* firstName */}
            <div className="relative">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 focus:scale-[1.05] focus:[box-shadow:0_0_10px_#303030] rounded-xl border-b border-gray-700 outline-none transition"
              />
            </div>

            {/* lastName */}
            <div className="relative">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 focus:scale-[1.05] focus:[box-shadow:0_0_10px_#303030] rounded-xl border-b border-gray-700 outline-none transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 focus:scale-[1.05] focus:[box-shadow:0_0_10px_#303030] rounded-xl border-b border-gray-700 outline-none transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 focus:scale-[1.05] focus:[box-shadow:0_0_10px_#303030] rounded-xl border-b border-gray-700 outline-none transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 shadow-white/40 shadow-sm bg-black rounded-3xl font-medium transition transform"
            >
              Register
            </button>
          </form>

          {/* Extra */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-[#fff] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
