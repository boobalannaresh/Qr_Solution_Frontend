import React from 'react'
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({children}) {

    const isAuth = localStorage.getItem("studentToken");
    console.log(isAuth)
  return (
    <div>
        { isAuth ? children : <Navigate replace to ="/" />} 
    </div>
  )
}
