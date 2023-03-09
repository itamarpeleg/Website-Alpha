import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react';
import React from 'react';
import AuthContext from '../context/AuthContext';

const PrivateRoutes = () => {
  let {user} = useContext(AuthContext)
  let auth = {'token':user ? true : false}
  return (
    auth.token ? <Outlet/> : <Navigate to="/login"/>
  )
}

export default PrivateRoutes;