import { createContext, ReactNode, useEffect, useState } from 'react';
import UsersList from '../services/UsersList';
import { toast } from 'react-toastify';
import WrongDataError from '../Errors/WrongDataError';

type AuthenticationProviderProps = {
  children: ReactNode;
}

type LoginBody = {
  email: string;
  password: string;
}

type AuthContextProps = {
  handleLogin: (param: LoginBody) => Promise<void>;
  handleLogout: () => void;
  authenticated: boolean;
  loading: boolean;
}

export const AuthenticationContext = createContext({} as AuthContextProps);

export function AuthenticationProvider({children}: AuthenticationProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setAuthenticated(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  async function handleLogin({ email, password }: LoginBody) {
    try {
      const { token } = await UsersList.authenticate({ email, password });

      localStorage.setItem('token', token);

      setAuthenticated(true);

      return;
    } catch(error) {
      if(error instanceof WrongDataError) {
        toast.error('Credenciais erradas!');
      }
    }
  }

  async function handleLogout() {
    localStorage.removeItem('token');
    setAuthenticated(false);
  }

  return (
    <AuthenticationContext.Provider value={{handleLogin, authenticated, handleLogout, loading}}>
      {children}
    </AuthenticationContext.Provider>
  );
}
