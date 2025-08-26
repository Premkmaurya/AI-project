import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import axios from 'axios'
import { toast } from 'react-toastify';


function Login() {
const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       const user = await axios.post("http://localhost:3000/api/auth/login",formData,{ withCredentials: true })
       console.log(user)
       toast.success('logged in.', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: "Flip",
       });
       navigate('/chat')
    }catch(err){
       console.log("error is occured",err)
    }
  };

  return (
    <div className="flex min-h-screen bg-[#202123] text-white">
      <div className="flex w-full lg:w-1/2 justify-center items-center p-8">
        <div className="w-full max-w-md bg-[#242424] backdrop-blur-lg rounded-2xl shadow-2xl p-10 animate-fade-in">
          <h2 className="text-3xl font-semibold text-center mb-6">Welcome Back</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

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
              Login
            </button>
          </form>

          {/* Extra */}
          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/Register" className="text-[#fff] hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login