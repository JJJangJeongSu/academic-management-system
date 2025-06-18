import React, { useState, useEffect } from 'react';
import { getAllAccounts, Account, addAccount, AddAccountRequest } from '../api/accounts';

const AccountManagement: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<AddAccountRequest>({
    userid: '',
    name: '',
    passwd: '',
    email: '',
    type: 1,
    status: 'active'
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'type' ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addAccount(formData);
      // Refresh the account list
      const response = await getAllAccounts();
      const allAccounts = [
        ...response.accounts.student,
        ...response.accounts.professor,
        ...response.accounts.admin
      ];
      setAccounts(allAccounts);
      setShowAddForm(false);
      setFormData({
        userid: '',
        name: '',
        passwd: '',
        email: '',
        type: 1,
        status: 'active'
      });
    } catch (error) {
      setError(error instanceof Error ? error.message : '계정 등록에 실패했습니다.');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-secondary-900">계정 조회</h1>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
          >
            {showAddForm ? '닫기' : '새 계정 등록'}
          </button>
        </div>

        {showAddForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded-lg bg-gray-50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
                <input
                  type="text"
                  name="userid"
                  value={formData.userid}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
                <input
                  type="password"
                  name="passwd"
                  value={formData.passwd}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">계정 유형</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value={0}>관리자</option>
                  <option value={1}>학생</option>
                  <option value={2}>교수</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">상태</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors"
              >
                계정 등록
              </button>
            </div>
          </form>
        )}

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