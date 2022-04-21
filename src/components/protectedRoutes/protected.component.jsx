// import React from "react"
// import { useNavigate, Route, Outlet, Navigate } from "react-router-dom"

// function ProtectedRoute({ component: Component, ...restOfProps }) {
//   const navigate = useNavigate()
//   const isAuthenticated = localStorage.getItem("isAuthenticated")
//   console.log("this", isAuthenticated)

//   return <Route {...restOfProps} render={(props) => (isAuthenticated ? <Outlet /> : navigate("/login", { replace: true }))} />
// //   return isAuthenticated ? <Outlet /> : navigate("/login", { replace: true })
// //   return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
// }

// export default ProtectedRoute
