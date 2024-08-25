import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks';
import { login } from './features/auth/authSlice';

export default function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticate = () => {
      if (localStorage.getItem('token')) {
        dispatch(login());
      } else {
        navigate('/auth/login');
      }
    };
    authenticate();
  }, []);

  return (
    <main>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </main>
  );
}
