/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect } from 'react';
import Register from './pages/Register';
import { useAppSelector } from './hooks';
import UserProfile from './pages/UserProfile';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from './components/Navbar';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
  }, [token]);

  return (
    <>
      {location.pathname !== '/auth/login' &&
        location.pathname !== '/auth/register' && <Navbar />}
      <main>
        <ToastContainer />
        <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/user/:profileId" element={<UserProfile />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}
