import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isLoggedIn = document.cookie.includes("token"); 
  return isLoggedIn ? <Navigate to="/chat" replace /> : children;
};

export default PublicRoute;
