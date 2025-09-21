import React, { createContext, useState } from 'react'

export const navbarContext = createContext();

const NavContext = ({children}) => {

  const [open, setOpen] = useState(false)

  return (
    <navbarContext.Provider value={{open, setOpen}}>
        {children}
    </navbarContext.Provider>
  )
}

export default NavContext