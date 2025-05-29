import React, { createContext, useState, useContext, ReactNode } from 'react';

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
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const generateUserData = (role: UserRole): User => {
  const userData: Record<UserRole, User> = {
    student: {
      id: '1',
      name: 'Kim Minjae',
      email: 'kim.minjae@university.edu',
      role: 'student',
      profileImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    professor: {
      id: '2',
      name: 'Dr. John Smith',
      email: 'john.smith@university.edu',
      role: 'professor',
      profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
    admin: {
      id: '3',
      name: 'Admin User',
      email: 'admin@university.edu',
      role: 'admin',
      profileImage: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    },
  };

  return userData[role];
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole = 'student'): Promise<void> => {
    const userData = generateUserData(role);
    setUser(userData);
  };

  const logout = (): void => {
    setUser(null);
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