import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import RequestResetPassword from './pages/RequestResetPassword';
import ResetPassword from './pages/ResetPassword';
import NewPassword from './pages/NewPassword';

export default function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/auth/login' &&
        location.pathname !== '/auth/register' &&
        location.pathname !== '/request-reset' &&
        !location.pathname.startsWith('/reset-password') && <Navbar />}
      <main>
        <ToastContainer />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/request-reset" element={<RequestResetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/reset-password/:token" element={<NewPassword />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/:profileId" element={<UserProfile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
