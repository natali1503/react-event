import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { APP_ROUTE } from './const/const';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Wrapper from './components/Wrapper';
import Profile from './pages/Profile/Profile';
import HelpRequest from './pages/HelpRequest';
import { Theme } from './components/Theme';
import HelpDesk from './pages/HelpDesk';

function App() {
  return (
    <Theme>
      <Router>
        <Wrapper>
          <Routes>
            <Route path={APP_ROUTE.Login} element={<LoginPage />} />
            <Route path={APP_ROUTE.Main} element={<ProtectedRoute component={<HelpDesk />} />} />
            <Route path={APP_ROUTE.Profile} element={<ProtectedRoute component={<Profile />} />} />
            <Route path={APP_ROUTE.HelpRequest} element={<ProtectedRoute component={<HelpRequest />} />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Wrapper>
      </Router>
    </Theme>
  );
}

export default App;
