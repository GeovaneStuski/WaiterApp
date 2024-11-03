import { createContext, ReactNode, useEffect, useState } from 'react';
import { ApiRequest } from '../utils/ApiRequest';
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
  onReloadUser: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children}: AuthProviderProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<null | User>(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');

      if(!token) {
        setAuthenticated(false);
      } else {
        handleGetUser();
      }

      setLoading(false);
    }

    getToken();
  }, []);

  async function handleGetUser() {
    const user = await ApiRequest({
      method: 'get',
      endPoint: '/me',
    });

    setUser(user);
    setAuthenticated(true);
  }

  async function handleUserAuthencation(body: LoginBody) {
    setLoading(true);

    try {
      const { user, token } = await ApiRequest({
        method: 'post',
        endPoint: '/authentication',
        body,
      });

      setUser(user);
      setAuthenticated(true);
      
      await AsyncStorage.setItem('token', token);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
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
      onReloadUser: handleGetUser,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}