import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppRoute } from './const/const';
import NotFoundPage from './pages/NotFoundPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Wrapper from './components/Wrapper';
import Profile from './pages/Profile/Profile';
import Helps from './pages/Helps/Helps';
import UserInfoID from './pages/Helps/UserInfoID';

function App() {
  return (
    <>
      <Router>
        <Wrapper>
          <Routes>
            <Route path={AppRoute.Login} element={<LoginPage />} />
            <Route
              path={AppRoute.Main}
              element={<ProtectedRoute component={<Helps />} />}
            />
            <Route
              path={AppRoute.Profile}
              element={<ProtectedRoute component={<Profile />} />}
            />
            <Route
              path={AppRoute.HelpRequest}
              element={<ProtectedRoute component={<UserInfoID />} />}
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Router>
    </>
  );
}

export default App;
