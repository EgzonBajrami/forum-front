

import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
const PublicRoutes = ({ children }) => {
  const auth = useSelector((state) => state.auth.data)

 return <>{children}</>
}

export default PublicRoutes