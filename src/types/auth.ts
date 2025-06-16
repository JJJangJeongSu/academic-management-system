export interface LoginRequest {
  userid: string;
  passwd: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthError {
  message: string;
} 