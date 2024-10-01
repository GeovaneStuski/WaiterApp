import { BrowserRouter } from 'react-router-dom';
import { AnimateRoutes } from './components/AnimateRoutes';

export function Router() {
  return (
    <BrowserRouter>
      <AnimateRoutes />
    </BrowserRouter>
  );
}
