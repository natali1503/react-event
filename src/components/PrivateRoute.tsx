import { useAppSelector } from '../hooks/useAppSelector'
import { Navigate, Outlet } from 'react-router-dom'
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
