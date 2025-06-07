import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-primary-600 mb-6">404</h1>
        <h2 className="text-2xl font-semibold text-secondary-800 mb-4">Page Not Found</h2>
        <p className="text-secondary-600 mb-8">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link to="/dashboard" className="btn btn-primary inline-flex items-center">
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;