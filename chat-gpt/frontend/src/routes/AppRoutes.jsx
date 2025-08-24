import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from "../pages/Home"
import Chat from "../pages/Chat"
import Register from "../pages/Register"
import Login from "../pages/Login"

function AppRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/chat" element={<Chat />} />
			<Route path="/register" element={<Register />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}

export default AppRoutes