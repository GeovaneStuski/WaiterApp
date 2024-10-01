import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Login } from '../pages/login';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';

export function AnimateRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const { authenticated } = useContext(AuthenticationContext);

  useEffect(() => {
    if(!authenticated) {
      navigate('/login');
    }
  }, [authenticated]);
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login />}/>
      </Routes>
    </AnimatePresence>
  );
}
