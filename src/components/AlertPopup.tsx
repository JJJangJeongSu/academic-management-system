import React from 'react';
import { X } from 'lucide-react';

interface AlertPopupProps {
  type: 'error' | 'success';
  message: string;
  onClose: () => void;
}

const AlertPopup: React.FC<AlertPopupProps> = ({ type, message, onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-50' : 'bg-green-50';
  const borderColor = type === 'error' ? 'border-red-200' : 'border-green-200';
  const textColor = type === 'error' ? 'text-red-600' : 'text-green-600';

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in">
      <div className={`${bgColor} ${borderColor} ${textColor} px-4 py-3 rounded-lg shadow-lg border flex items-center min-w-[300px] max-w-md`}>
        <div className="flex-1">
          {message}
        </div>
        <button
          onClick={onClose}
          className="ml-4 p-1 hover:bg-opacity-10 hover:bg-black rounded-full transition-colors"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default AlertPopup; 