import React, { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin } from '../api/auth';
import { User } from '../types/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (userid: string, passwd: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(async (userid: string, passwd: string) => {
    const response = await apiLogin({ userid, passwd });
    setToken(response.token);
    setUser(response.user);


    console.log(response.token);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    localStorage.removeItem('uid');
  }, []);

  const value = {
    isAuthenticated: !!token,
    user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};