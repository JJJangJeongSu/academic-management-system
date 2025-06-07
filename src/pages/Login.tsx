import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (role: 'student' | 'professor' | 'admin') => {
    await login('demo@example.com', 'password', role);
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Log in to AcademicMS</h2>
      
      <div className="space-y-4">
        <button
          onClick={() => handleLogin('student')}
          className="w-full btn btn-primary py-2.5"
        >
          Login as Student
        </button>
        
        <button
          onClick={() => handleLogin('professor')}
          className="w-full btn btn-secondary py-2.5"
        >
          Login as Professor
        </button>
        
        <button
          onClick={() => handleLogin('admin')}
          className="w-full btn btn-secondary py-2.5"
        >
          Login as Admin
        </button>
      </div>
    </div>
  );
};

export default Login;