import { createContext, ReactNode, useEffect, useState } from 'react';
import { api } from '../utils/api';
import { User } from '../types/User';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthProviderProps = {
  children: ReactNode;
}

type LoginBody = {
  email: string;
  password: string;
}

type AuthContextProps = {
  onUserAuthencation: (user: LoginBody) => void;
  onLogout: () => void;
  authenticated: boolean;
  user: null | User;
  loading: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children}: AuthProviderProps) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<null | User>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');

      if(!token) {
        setAuthenticated(false);
      } else {
        const { data } = await api.get('/me');
        setUser(data);
        setAuthenticated(true);
      }

      setLoading(false);
    }

    getToken();
  }, []);

  async function handleUserAuthencation({email, password}: LoginBody) {
    try {
      const { data } = await api.post('/authentication', {
        email,
        password
      });

      setUser(data.user);
      setAuthenticated(true);
      
      await AsyncStorage.setItem('token', data.token);
    } catch {
      alert('Erro');
    }
  }

  async function handleLogout() {
    await AsyncStorage.removeItem('token');

    setAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{
      onUserAuthencation: handleUserAuthencation,
      onLogout: handleLogout,
      authenticated,
      user,
      loading,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}