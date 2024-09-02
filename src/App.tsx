/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';

import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect } from 'react';
import Register from './pages/Register';
import { useAppSelector } from './hooks';
import UserProfile from './pages/UserProfile';

export default function App() {
  const navigate = useNavigate();
  const { token } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate('/auth/login');
    }
  }, [token]);

  return (
    <main>
      <ToastContainer />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/user/:profileId" element={<UserProfile />} />
      </Routes>
    </main>
  );
}
