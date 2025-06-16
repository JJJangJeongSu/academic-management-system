import { LoginRequest, LoginResponse } from '../types/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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