import axios from 'axios';
import React, { createContext, useContext, useState } from 'react'

export const AuthContext=createContext();

export default function AuthProvider  ({children}) {
      const[username,setUsername]=useState(null)
      const[password,setPassword]=useState(null)
      const[email,setEmail]=useState(null);
      const[isAuthenticated,setIsAuthenticated]=useState(false);
      
      function setUserInfo(username,password)
      {
            setUsername(username);
            setPassword(password);
            setIsAuthenticated(true);
      }
      const login=async(users)=>{
        console.log(users.email+" "+users.password)
            try {
                  const response = await axios.get(`http://localhost:8080/users/${users.email}/${users.password}`, {
                    headers: { Authorization: "Basic cHJhY3RpY2U6dGVzdDEyMzQ=" }
                  });
                  
                  if(response.status===200)
                  {
                        setEmail(users.email)
                        setPassword(users.password)
                        setIsAuthenticated(true)
                        localStorage.setItem('email',email)
                        const findUsername=await axios.get(`http://localhost:8080/users/${users.email}`)
                        .then(response=>{console.log(response);setUsername(response.data.username)})
                  }
                  else
                  {
                    localStorage.removeItem('email')
                        setEmail(null)
                        setPassword(null)
                        setIsAuthenticated(false)
                  }
                  return response.status; 
                } catch (error) {
                  if (error.response) {
                    return error.response.status; 
                  } else {
                    return 500;
                  }
                }
        }

        const logout=()=>{
          setEmail(null);
          setPassword(null);
          setIsAuthenticated(false);
          localStorage.removeItem('email')
        }
      const values={logout,email,setEmail,login,setUserInfo,username,setUsername,password,setPassword,isAuthenticated,setIsAuthenticated};

  return (
    <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
  )
}
export const useAuth=()=>useContext(AuthContext);