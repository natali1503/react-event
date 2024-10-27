import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppRoute } from './const/const';

import JustAnotherPage from './pages/JustAnotherPage';

import { useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { getCurrentUser, initializeAuth } from './store/authorization';
import { useAppSelector } from './hooks/useAppSelector';
import { OnlyAuth, OnlyUnAuth } from './components/ProtectedRoute';
import { useAppDispatch } from './hooks/useAppDispatch';

import LoginPage from './pages/LoginPage';

import './App.css';

import HeaderNavigationApp from './components/Header/Header';
import BottomNavigationApp from './components/Footer/Footer';
import Profile from './components/profile/Profile';

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
        <HeaderNavigationApp />
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          <Route
            path={AppRoute.Main}
            element={<OnlyAuth component={<JustAnotherPage />} />}
          />
          <Route
            path={AppRoute.Profile}
            element={<OnlyAuth component={<Profile />} />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BottomNavigationApp />
      </Router>
    </>
  );
}

export default App;
