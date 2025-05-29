import React from 'react';
import { Calendar, Download, Upload } from 'lucide-react';
import { Assignment } from '../data/mockData';

interface AssignmentCardProps {
  assignment: Assignment;
  detailed?: boolean;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, detailed = false }) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'status-badge status-pending';
      case 'submitted':
        return 'status-badge status-submitted';
      case 'graded':
        return 'status-badge status-graded';
      default:
        return 'status-badge status-pending';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'submitted':
        return 'Submitted';
      case 'graded':
        return 'Graded';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="card transition-all duration-300 hover:shadow-md">
      <div className="p-5">
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold">{assignment.title}</h3>
            <span className={getStatusBadgeClass(assignment.status)}>
              {getStatusText(assignment.status)}
            </span>
          </div>
          
          <div className="flex items-center text-secondary-500 text-sm">
            <Calendar size={16} className="mr-1.5" />
            <span>Due: {assignment.dueDate}</span>
          </div>
          
          {assignment.submittedDate && (
            <div className="flex items-center text-success-600 text-sm mt-1">
              <Upload size={16} className="mr-1.5" />
              <span>Submitted: {assignment.submittedDate}</span>
            </div>
          )}
          
          {detailed && assignment.grade && (
            <div className="mt-3 text-secondary-800">
              <span className="font-medium">Grade: </span>
              <span>{assignment.grade}/100</span>
            </div>
          )}
          
          <div className="flex mt-4 justify-between">
            <button className="btn btn-secondary btn-sm flex items-center">
              <Download size={16} className="mr-1.5" />
              Download PDF
            </button>
            
            {assignment.status === 'pending' && (
              <button className="btn btn-primary btn-sm">
                Submit Assignment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;