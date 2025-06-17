import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userid, setUserid] = useState('');
  const [passwd, setPasswd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 회원가입 성공 메시지 표시
  const message = location.state?.message;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(userid, passwd);
      console.log('login success');
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : '로그인에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-extrabold text-center mb-8">로그인</h2>
      {message && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {message}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label htmlFor="userid" className="block text-sm font-medium text-gray-700 mb-1">아이디</label>
          <input
            id="userid"
            type="text"
            placeholder="아이디를 입력하세요"
            value={userid}
            onChange={e => setUserid(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="username"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="passwd" className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
          <input
            id="passwd"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={passwd}
            onChange={e => setPasswd(e.target.value)}
            className="w-full px-4 py-3 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            autoComplete="current-password"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? '로그인 중...' : '로그인'}
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">계정이 없으신가요? </span>
          <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
            회원가입
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;