export interface LoginRequest {
  userid: string;
  passwd: string;
}

export interface User {
  id: string;
  name: string;
  userid: string;
  role: 'student' | 'professor' | 'admin';
  profileImage?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthError {
  message: string;
} 