import { useContext } from "react";
import { NavLink } from "react-router-dom";
import {AuthContext} from "../context/Context"

function Nav() {
  const { user } = useContext(AuthContext);;
  return (
    <div className="w-full h-12 shadow-xl px-[1.8rem] py-[2rem] flex items-center justify-between">
      <h1 className="text-blue-500 text-2xl font-black">AI-Caption</h1>
      <div className="flex items-center justify-center gap-9 text-md font-semibold">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/upload">Upload</NavLink>
        {!user && <NavLink to="/login">Login/Register</NavLink>}
      </div>
    </div>
  );
}

export default Nav;
