import { LoginRequest, LoginResponse } from '../types/auth';
import { API_BASE_URL } from '../config';

interface SignupRequest {
  userid: string;
  name: string;
  email: string;
  passwd: string;
  type: 1 | 2; // 1: 학생, 2: 교수
  status: 'active' | 'inactive';
}

interface SignupResponse {
  message: string;
}

export const login = async (request: LoginRequest): Promise<LoginResponse> => {
  try {
    console.log(API_BASE_URL);
    console.log(request);
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
      else if (response.status === 404) {
        throw new Error('서버가 존재하지 않습니다.');
      }
      throw new Error('로그인에 실패했습니다.');
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const signup = async (data: SignupRequest): Promise<SignupResponse> => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('회원가입에 실패했습니다.');
  }

  return response.json();
}; 