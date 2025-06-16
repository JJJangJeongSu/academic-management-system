import React, { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin } from '../api/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userid: string, passwd: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = useCallback(async (userid: string, passwd: string) => {
    try {
      const response = await apiLogin({ userid, passwd });
      setToken(response.token);
      localStorage.setItem('token', response.token);
    } catch (error) {
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  const value = {
    isAuthenticated: !!token,
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