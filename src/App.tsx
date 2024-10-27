import './App.css';

import { useAppDispatch } from './hooks/useAppDispatch';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AppRoute } from './const/const';
import LoginPage from './pages/LoginPage';
import JustAnotherPage from './pages/JustAnotherPage';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { getCurrentUser, initializeAuth } from './store/authorization';
import { useAppSelector } from './hooks/useAppSelector';
import { OnlyAuth, OnlyUnAuth } from './components/ProtectedRoute';
import { useAppDispatch } from './hooks/useAppDispatch';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const/const';
import LoginPage from './pages/LoginPage';
import JustAnotherPage from './pages/JustAnotherPage';
import PrivateRoute from './components/PrivateRoute';
import { useEffect } from 'react';
import NotFoundPage from './pages/NotFoundPage';
import { initializeAuth } from './store/authorization';
import './App.css';

import HeaderNavigationApp from './components/Header/Header';
import BottomNavigationApp from './components/Footer/Footer';
import Profile from './components/profile/Profile';

function App() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);

  console.log('App component re-rendered');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(initializeAuth());
    }
  }, [dispatch]);

  return (
    <>
      <Router>
        <HeaderNavigationApp />
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<OnlyAuth component={<JustAnotherPage />} />}
          />
          <Route
            path={AppRoute.Login}
            element={<OnlyUnAuth component={<LoginPage />} />}
          />
          {/* Обновить маршруты на новую логику!! */}
          {/* <Route element={<PrivateRoute />}> */}
          {/* <Route path={AppRoute.Profile} element={<Profile />} />
          <Route path={AppRoute.TestPage} element={<JustAnotherPage />} />
          <Route path={AppRoute.TestPage} element={<JustAnotherPage />} /> */}
          {/* </Route> */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <BottomNavigationApp />
      </Router>
    </>
  );
}

export default App;
