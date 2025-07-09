import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Context
import { AuthProvider } from './context/AuthContext';

// Route
import PrivateRoute from '../src/routes/PrivateRoutes';
import PublicRoute from '../src/routes/PublicRoutes';

// Pages
import AuthPage from "./pages/public/AuthPage/AuthPage";
import Login from './pages/public/AuthPage/Login/Login';
import RegistrationDefault from './pages/public/AuthPage/Registration/RegistrationDefault';
import EmailAuth from './pages/public/AuthPage/Registration/EmailAuth/EmailAuth';
import Main from './pages/private/Main/Main';
import Balance from './pages/private/Balance/Balance';
import Drop from './pages/private/Drop/Drop';
import ReferralProgram from './pages/private/ReferralProgram/ReferralProgram';

// Components
import ScrollToTop from "./components/ScrollToTop";

const App = () => {
  return (
    <AuthProvider>
        <Router>
          <ScrollToTop />
          <Routes>

            {/*Додаток*/}
            <Route path="/" element={<PrivateRoute><Main /></PrivateRoute>} />
            <Route path="/balance" element={<PrivateRoute><Balance /></PrivateRoute>} />
            <Route path="/drop" element={<PrivateRoute><Drop /></PrivateRoute>} />
            <Route path="/referral" element={<PrivateRoute><ReferralProgram /></PrivateRoute>} />

            {/*Авторизація*/}
            <Route path="/auth" element={<PublicRoute><AuthPage /></PublicRoute>} />
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/register" element={<PublicRoute><RegistrationDefault /></PublicRoute>} />
            <Route path="/register-email" element={<PublicRoute><EmailAuth /></PublicRoute>} />
          </Routes>
        </Router>
    </AuthProvider>
  );
}

export default App;