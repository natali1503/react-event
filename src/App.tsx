import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppRoute } from './const/const'
import LoginPage from './pages/LoginPage'
import JustAnotherPage from './pages/JustAnotherPage'
import PrivateRoute from './components/PrivateRoute'
import { useEffect } from 'react'
import NotFoundPage from './pages/NotFoundPage'
import { initializeAuth } from './store/authorization'
//import { HelpRequest } from './types/HelpRequest'
import { useAppDispatch } from './hooks/useAppDispatch'

function App() {
  /*const counter = useAppSelector((state) => state.counter.value)
  const users = useAppSelector((state) => state.counter.users)
  const pending = useAppSelector((state) => state.counter.pending)*/

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAuth())
  }, [dispatch])

  /*const handleAddUser = () => {
    const id: number = Math.floor(Math.random() * 10 + 1)
    dispatch(addUserById(id))
  }*/

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
