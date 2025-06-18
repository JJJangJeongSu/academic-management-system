import React from 'react';
import { Link } from 'react-router-dom';
import DeleteNoticeButton from './DeleteNoticeButton';

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
  onDelete?: () => void;
}

const NoticeItem: React.FC<NoticeItemProps> = ({ notice, onDelete }) => {
  return (
    <div className="border-l-4 border-gray-300 bg-white p-4 rounded-r shadow-sm transition-all duration-300 mb-4 hover:shadow">
      <div className="flex justify-between items-start">
        <Link 
          to={`/courses/${notice.courseId}/notices/${notice.id}`}
          className="flex-grow cursor-pointer"
        >
          <h3 className="font-medium text-secondary-800">{notice.title}</h3>
          <div className="text-xs text-secondary-500 mt-1">
            {notice.writer} • {notice.date}
          </div>
        </Link>
        {onDelete && (
          <DeleteNoticeButton
            postId={Number(notice.id)}
            onSuccess={onDelete}
          />
        )}
      </div>
    </div>
  );
};

export default NoticeItem;