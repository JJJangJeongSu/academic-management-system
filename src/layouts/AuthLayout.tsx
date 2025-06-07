import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AuthLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2 text-2xl font-semibold text-primary-700">
            <GraduationCap className="h-8 w-8" />
            <span>AcademicMS</span>
          </div>
          <p className="mt-2 text-secondary-600">Academic Management System</p>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <Outlet />
        </div>
        
        <p className="text-center mt-6 text-secondary-500 text-sm">
          © 2025 AcademicMS. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AuthLayout;