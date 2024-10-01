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
  handleLogin: (param: LoginBody) => void;
  authenticated: boolean;
}

export const AuthenticationContext = createContext({} as AuthContextProps);

export function AuthenticationProvider({children}: AuthenticationProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setAuthenticated(true);
    }
  }, []);

  async function handleLogin({ email, password }: LoginBody) {
    try {
      const { token } = await UsersList.authenticate({ email, password });

      localStorage.setItem('token', token);
      setAuthenticated(true);
    } catch(error) {
      if(error instanceof WrongDataError) {
        toast.error('Credenciais erradas!');
      }
    }
  }

  return (
    <AuthenticationContext.Provider value={{handleLogin, authenticated}}>
      {children}
    </AuthenticationContext.Provider>
  );
}
