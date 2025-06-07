import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { login as mockLogin, users, tokens } from '../data/mockData';

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

  // 자동 로그인: 앱 시작 시 localStorage의 토큰으로 사용자 정보 복원
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 users에서 해당 유저를 찾아 로그인 상태로 복원
      // mockData의 tokens 배열에서 userId를 찾고, users에서 유저 정보 조회
      // (실제 서비스라면 토큰 디코딩 또는 서버 검증 필요)
      const tokenObj = tokens.find(t => t.token === token);
      if (tokenObj) {
        const userData = users.find(u => u.id === tokenObj.userId);
        if (userData) {
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.username,
            role: userData.role,
          });
        }
      }
    }
  }, []);

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