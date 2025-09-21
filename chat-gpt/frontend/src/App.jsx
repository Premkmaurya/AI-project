import React from 'react'
import AppRoutes from './routes/AppRoutes'
import FullScreenNav from './components/navbar/FullScreenNav'


function App() {
  return (
    <div className="overflow-hidden w-[100vw] h-[100vh] ">
      <AppRoutes />
      <FullScreenNav />
    </div>
  )
}

export default App