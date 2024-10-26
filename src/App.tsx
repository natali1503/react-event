import './App.css'

import { useAppDispatch } from './hooks/useAppDispatch'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppRoute } from './const/const'
import LoginPage from './pages/LoginPage'
import JustAnotherPage from './pages/JustAnotherPage'
import PrivateRoute from './components/PrivateRoute'
import { useEffect } from 'react'
import NotFoundPage from './pages/NotFoundPage'
import { initializeAuth } from './store/authorization'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  return (
    <>
      <Router>
        <Routes>
          <Route path={AppRoute.Login} element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path={AppRoute.TestPage} element={<JustAnotherPage />} />
            {/* <Route path={AppRoute.TestPage} element={<JustAnotherPage />} /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
