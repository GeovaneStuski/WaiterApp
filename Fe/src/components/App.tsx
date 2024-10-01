import { useEffect, useState } from 'react';
import { Router } from '../routes';
import { Splash } from './Splash';
import { AuthenticationProvider } from '../contexts/AuthenticationContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [splashShouldBeRender, setSplashShouldBeRender] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setSplashShouldBeRender(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AuthenticationProvider>
      <Splash isVisible={splashShouldBeRender} />
      <Router />
      <ToastContainer />
    </AuthenticationProvider>
  );
}
