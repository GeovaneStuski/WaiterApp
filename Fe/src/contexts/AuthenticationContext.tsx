import { createContext, ReactNode, useEffect, useState } from 'react';
import UsersList from '../services/UsersList';
import { toast } from 'react-toastify';
import WrongDataError from '../Errors/WrongDataError';
import { User } from '../types/User';

type AuthenticationProviderProps = {
  children: ReactNode;
};

type LoginBody = {
  email: string;
  password: string;
};

type AuthContextProps = {
  handleLogin: (param: LoginBody) => Promise<void>;
  handleLogout: () => void;
  authenticated: boolean;
  loading: boolean;
  user: User | null;
};

export const AuthenticationContext = createContext({} as AuthContextProps);

export function AuthenticationProvider({ children }: AuthenticationProviderProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      const user = await UsersList.getUser();

      setUser(user);
    }

    if(localStorage.getItem('token')) {
      setAuthenticated(true);
      getUser();
    } else {
      setAuthenticated(false);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ email, password }: LoginBody) {
    try {
      const { token } = await UsersList.authenticate({ email, password });

      localStorage.setItem('token', token);

      setAuthenticated(true);

      return;
    } catch (error) {
      if (error instanceof WrongDataError) {
        toast.error('Credenciais erradas!');
      }
    }
  }

  async function handleLogout() {
    localStorage.removeItem('token');
    setAuthenticated(false);
  }

  return (
    <AuthenticationContext.Provider
      value={{ handleLogin, authenticated, handleLogout, loading, user }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

