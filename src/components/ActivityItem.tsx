import React from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { Activity } from '../data/mockData';

interface ActivityItemProps {
  activity: Activity;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ activity }) => {
  const getIcon = () => {
    switch (activity.type) {
      case 'assignment':
        return <CheckCircle size={18} className="text-success-500" />;
      case 'material':
        return <FileText size={18} className="text-primary-500" />;
      case 'notice':
        return <FileText size={18} className="text-warning-500" />;
      default:
        return <FileText size={18} className="text-secondary-500" />;
    }
  };

  return (
    <div className="flex items-start py-4 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="ml-3 flex-grow">
        <div className="flex items-baseline justify-between">
          <span className="font-medium text-secondary-800">{activity.description}</span>
          <span className="text-xs text-secondary-500 ml-2">{activity.timeAgo}</span>
        </div>
        <div className="text-sm text-secondary-600 mt-0.5">in {activity.courseName}</div>
      </div>
    </div>
  );
};

export default ActivityItem;