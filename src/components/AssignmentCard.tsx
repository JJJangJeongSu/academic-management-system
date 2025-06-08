import React from 'react';
import { Calendar, Download } from 'lucide-react';
import { Assignment } from '../types/assignment';

interface AssignmentCardProps {
  assignment: Assignment;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment }) => {
  const getStatusBadgeClass = (submit: 0 | 1) => {
    return submit === 0 ? 'status-badge status-pending' : 'status-badge status-submitted';
  };

  const getStatusText = (submit: 0 | 1) => {
    return submit === 0 ? '미제출' : '제출';
  };

  return (
    <div className="card transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold">{assignment.postName}</h3>
            <span className={getStatusBadgeClass(assignment.submit)}>
              {getStatusText(assignment.submit)}
            </span>
          </div>
          <div className="flex items-center text-secondary-500 text-sm">
            <Calendar size={16} className="mr-1.5" />
            <span>마감: {assignment.postDate}</span>
          </div>
          <div className="flex mt-4 justify-between">
            <button className="btn btn-secondary btn-sm flex items-center">
              <Download size={16} className="mr-1.5" />
              PDF 다운로드
            </button>
            {assignment.submit === 0 && (
              <button className="btn btn-primary btn-sm">
                과제 제출
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;