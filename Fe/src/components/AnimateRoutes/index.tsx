import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Login } from '../../pages/login';
import { Home } from '../../pages/home';
import { AppLayout } from '../AppLayout';
import { History } from '../../pages/history';
import { Menu } from '../../pages/menu';
import { Products } from '../../pages/menu/Products';
import { Categories } from '../../pages/menu/Categories';
import { Ingredients } from '../../pages/menu/Ingredients';
import { Users } from '../../pages/users';
import { Profile } from '../../pages/profile';
import { useAnimateRoutes } from './useAnimateRoutes';

export function AnimateRoutes() {
  useAnimateRoutes();

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

