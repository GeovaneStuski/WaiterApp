import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Login } from '../pages/login';
import { useContext, useEffect } from 'react';
import { AuthenticationContext } from '../contexts/AuthenticationContext';
import { Home } from '../pages/home';
import { AppLayout } from './AppLayout';
import { History } from '../pages/history';
import { Menu } from '../pages/menu';
import { Products } from '../pages/menu/Products';
import { Categories } from '../pages/menu/Categories';
import { Ingredients } from '../pages/menu/Ingredients';
import { Users } from '../pages/users';
import { Profile } from '../pages/profile';

export function AnimateRoutes() {
  const location = useLocation();
  const navigate = useNavigate();

  const { authenticated, loading } = useContext(AuthenticationContext);


  useEffect(() => {
    if (!authenticated && !loading) {
      navigate('/login');
    }
  }, [loading, authenticated]);

  useEffect(() => {
    if(location.pathname !== '/login') {
      localStorage.setItem('route', location.pathname);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route element={<Menu />}>
            <Route path="/menu/products" element={<Products />} />
            <Route path="/menu/categories" element={<Categories />} />
            <Route path="/menu/ingredients" element={<Ingredients />} />
          </Route>
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AnimatePresence>
  );
}

