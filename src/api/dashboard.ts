import { DashboardData } from '../types/dashboard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getDashboardData = async (): Promise<DashboardData> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error('대시보드 데이터를 불러오는데 실패했습니다.');
    }

    const data: DashboardData = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}; 