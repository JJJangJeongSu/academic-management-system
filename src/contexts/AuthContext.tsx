import React, { createContext, useState, useContext, ReactNode } from 'react';
import { login as mockLogin, users } from '../data/mockData';

export type UserRole = 'student' | 'professor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<void> => {
    const result = mockLogin(email, password);
    if ('token' in result) {
      localStorage.setItem('token', result.token);
      const userData = users.find(u => u.username === email);
      if (userData) {
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.username,
          role: userData.role,
        });
        return;
      }
    }
    if ('message' in result && typeof result.message === 'string') {
      alert(result.message);
    } else {
      alert('로그인 실패');
    }
    setUser(null);
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  const register = async (
    email: string,
    password: string,
    name: string,
    role: UserRole
  ): Promise<void> => {
    setUser({
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
      role,
    });
  };

  const isAuthenticated = user !== null;

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};