import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Notice {
  id: string;
  title: string;
  writer: string;
  date: string;
  content: string;
  courseId: string;
}

interface NoticeItemProps {
  notice: Notice;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ notice }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`border-l-4 ${expanded ? 'border-primary-500' : 'border-gray-300'} bg-white p-4 rounded-r shadow-sm transition-all duration-300 mb-4 hover:shadow`}>
      <div className="flex justify-between items-start cursor-pointer" onClick={toggleExpanded}>
        <div>
          <h3 className="font-medium text-secondary-800">{notice.title}</h3>
          <div className="text-xs text-secondary-500 mt-1">
            {notice.writer} • {notice.date}
          </div>
        </div>
        <button className="p-1 text-secondary-400 hover:text-secondary-600">
          {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 text-secondary-700 text-sm border-t border-gray-100 pt-3 animate-fade-in">
          {notice.content}
        </div>
      )}
    </div>
  );
};

export default NoticeItem;