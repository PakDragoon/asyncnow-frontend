import React from 'react';
import {Navigate, Outlet} from 'react-router-dom'

const useAuth=()=>{
  const isAuthenticated = sessionStorage.getItem("isAuthenticated")
  if(isAuthenticated){
    return true
  } else {
    return false
  }
}

const  ProtectedRoutes=(props) =>{

  const auth=useAuth()

  return auth?<Outlet/>: <Navigate to="/login"/>
}

export default ProtectedRoutes;
