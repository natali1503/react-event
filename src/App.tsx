import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const/const';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { initializeAuth } from './store/authorization';
//import { HelpRequest } from './types/HelpRequest'
import { useAppDispatch } from './hooks/useAppDispatch';
import './App.css';

import Wrapper from './components/Wrapper';
import Profile from './pages/Profile/Profile';
import Helps from './pages/Helps/Helps';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  /*const handleAddUser = () => {
    const id: number = Math.floor(Math.random() * 10 + 1)
    dispatch(addUserById(id))
  }*/

  return (
    <>
      <Router>
        <Wrapper>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route path={AppRoute.Main} element={<Helps />} />
            {/* <Route element={<PrivateRoute />}> */}
            <Route path={AppRoute.Profile} element={<Profile />} />
            {/* </Route> */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
