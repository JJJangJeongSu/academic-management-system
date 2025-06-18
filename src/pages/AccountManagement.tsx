import React, { useState, useEffect } from 'react';
import { getAllAccounts, Account } from '../api/accounts';

const AccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await getAllAccounts();
        // Combine all accounts from different types into a single array
        const allAccounts = [
          ...response.accounts.student,
          ...response.accounts.professor,
          ...response.accounts.admin
        ];
        setAccounts(allAccounts);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : '계정 정보를 불러오는데 실패했습니다.');
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
        <h1 className="text-2xl font-bold text-secondary-900 mb-6">계정 조회</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이름</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">이메일</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">역할</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">상태</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {accounts.map((account) => (
                <tr key={`${account.userType}-${account.userID}`}>
                  <td className="px-6 py-4 whitespace-nowrap">{account.userID}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.userName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{account.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.userType === 'professor' ? 'bg-blue-100 text-blue-800' :
                      account.userType === 'admin' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {account.userType === 'student' ? '학생' :
                       account.userType === 'professor' ? '교수' : '관리자'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {account.userType === 'professor' 
                        ? (account.status === 'active' ? '재직' : '휴직')
                        : account.userType === 'student'
                        ? (account.status === 'active' ? '재학' : '휴학')
                        : (account.status === 'active' ? '활성' : '비활성')
                      }
                    </span>
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