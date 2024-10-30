import { useLocation, useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';
import { useContext, useEffect } from 'react';

export function useAnimateRoutes() {
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
  return {

  };
}
