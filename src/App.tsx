import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const/const';

import { useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { initializeAuth } from './store/authorization';
import { useAppSelector } from './hooks/useAppSelector';
import { OnlyAuth, OnlyUnAuth } from './components/ProtectedRoute';

import LoginPage from './pages/LoginPage';

import { useAppDispatch } from './hooks/useAppDispatch';
import './App.css';

import Wrapper from './components/Wrapper';
import Profile from './pages/Profile/Profile';
import Helps from './pages/Helps/Helps';
//import UserInfoID from './pages/Helps/UserInfoID'

function App() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  console.log('App component re-rendered');
  console.log(isAuthenticated);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(initializeAuth());
    }
  }, []);

  return (
    <>
      <Router>
        <Wrapper>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<OnlyUnAuth component={LoginPage} />}
            />
            <Route
              path={AppRoute.Main}
              element={<OnlyAuth component={Helps} />}
            />
            <Route
              path={AppRoute.Profile}
              element={<OnlyAuth component={Profile} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
