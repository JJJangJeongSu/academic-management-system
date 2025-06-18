import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface Account {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
}

const AccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Implement actual API call to fetch accounts
    const fetchAccounts = async () => {
      try {
        // Placeholder data
        const mockAccounts: Account[] = [
          { id: 1, name: '홍길동', email: 'hong@example.com', role: '학생', status: '활성' },
          { id: 2, name: '김교수', email: 'kim@example.com', role: '교수', status: '활성' },
        ];
        setAccounts(mockAccounts);
        setError(null);
      } catch (err) {
        setError('계정 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary-900 mb-6">계정 관리</h1>
        
        <div className="mb-4">
          <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
            새 계정 추가
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">역할</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{account.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary-600 hover:text-primary-900 mr-2">수정</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AccountManagement; 