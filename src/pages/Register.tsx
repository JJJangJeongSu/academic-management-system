import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../api/auth';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userid: '',
    name: '',
    email: '',
    passwd: '',
    confirmPasswd: '',
    type: 1 as 1 | 2,
    status: 'active' as 'active' | 'inactive'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 비밀번호 확인
    if (formData.passwd !== formData.confirmPasswd) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    setIsLoading(true);

    try {
      await signup({
        userid: formData.userid,
        name: formData.name,
        email: formData.email,
        passwd: formData.passwd,
        type: formData.type,
        status: formData.status
      });
      
      // 회원가입 성공 시 로그인 페이지로 이동
      navigate('/login', { 
        state: { message: '회원가입이 완료되었습니다. 로그인해주세요.' }
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-extrabold text-center mb-8">회원가입</h2>
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userid" className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
          <input
            id="userid"
            name="userid"
            type="text"
            required
            value={formData.userid}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="아이디를 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">이름</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">이메일</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="이메일을 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="passwd" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            id="passwd"
            name="passwd"
            type="password"
            required
            value={formData.passwd}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="confirmPasswd" className="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
          <input
            id="confirmPasswd"
            name="confirmPasswd"
            type="password"
            required
            value={formData.confirmPasswd}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">회원 유형</label>
          <select
            id="type"
            name="type"
            required
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value={1}>학생</option>
            <option value={2}>교수</option>
          </select>
        </div>

        {formData.type === 1 && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">학적 상태</label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="active">재학</option>
              <option value="inactive">휴학</option>
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {isLoading ? '처리 중...' : '회원가입'}
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">이미 계정이 있으신가요? </span>
          <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;