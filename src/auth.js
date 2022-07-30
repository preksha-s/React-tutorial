import React, { Children, useContext,createContext } from 'react'
import { useState,createContext } from 'react'

const AuthContext=createContext(null)
export const auth = ({children}) => {
    const [user,setUser]=useState(null)
    const login=user=>{
        setUser(user)
    }
    const logout=()=>{
        setUser(null)
    }
    // provide values using auth comntext provider  provider component uses values=prop
  return <AuthContext.Provider value={{user,login,logout}}> {children}</AuthContext.Provider>
}

// return the function of auth context  using useContext
export const useAuth=()=>{
   return  useContext(AuthContext)
}