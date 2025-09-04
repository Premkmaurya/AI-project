import React from 'react'
import { Routes, Route } from "react-router-dom";
import Upload from '../pages/Upload';
import Home from '../pages/Home';
import Login from '../pages/Login';

function AppRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/upload' element={<Upload />} />
        {!document.cookie.includes("token=") && <Route path='/login' element={<Login />} />}
    </Routes>
  )
}

export default AppRoutes