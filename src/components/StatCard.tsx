import React, { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, icon, className = '' }) => {
  return (
    <div className={`card p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md ${className}`}>
      <div className="text-3xl font-bold text-secondary-800">{value}</div>
      <div className="text-sm text-secondary-500 mt-1 uppercase tracking-wider">{label}</div>
    </div>
  );
};

export default StatCard;