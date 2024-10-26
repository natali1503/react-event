import React from 'react'
import { useAppSelector } from '../hooks/useAppSelector'
import LoginPage from '../pages/LoginPage'
import { Navigate, Outlet, Route } from 'react-router-dom'
import { AppRoute } from '../const/const'

const PrivateRoute = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={AppRoute.Login} replace={true} />
  }

  if (isAuthenticated) {
    return <Outlet />
  }
}

export default PrivateRoute
