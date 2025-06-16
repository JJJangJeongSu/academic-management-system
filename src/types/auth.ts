export interface LoginRequest {
  userid: string;
  passwd: string;
}

export interface User {
  id: number;
  name: string;
  userid: string;
  role: 'student' | 'professor';
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AuthError {
  message: string;
} 