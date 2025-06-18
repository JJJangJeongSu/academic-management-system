import { API_BASE_URL } from '../config';

const ADMIN_TOKEN = localStorage.getItem('token');

export interface Account {
  userID: string;
  userName: string;
  userType: 'student' | 'professor' | 'admin';
  email: string;
  status: 'active' | 'inactive';
}

export interface AccountsResponse {
  accounts: {
    student: Account[];
    professor: Account[];
    admin: Account[];
  };
}

export const getAllAccounts = async (): Promise<AccountsResponse> => {
  const response = await fetch(`${API_BASE_URL}/accounts`, {
    method: 'GET',
    headers: {
      'Authorization': ADMIN_TOKEN || '',
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch accounts');
  }

  return response.json();
};

export interface AddAccountRequest {
  userid: string;
  name: string;
  passwd: string;
  email: string;
  type: number;  // 0: 관리자, 1: 학생, 2: 교수
  status: 'active' | 'inactive';
}

export const addAccount = async (accountData: AddAccountRequest): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/addAccount`, {
    method: 'POST',
    headers: {
      'Authorization': ADMIN_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(accountData),
  });

  if (!response.ok) {
    throw new Error('계정 등록에 실패했습니다.');
  }
}; 