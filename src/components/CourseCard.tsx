import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { Course } from '../data/mockData';

interface CourseCardProps {
  course: Course;
  showActions?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, showActions = true }) => {
  return (
    <div className="card transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{course.title}</h3>
          <div className="text-secondary-600 text-sm mt-1">{course.code}</div>
          <div className="text-secondary-500 text-sm mt-3">
            <div>Prof. {course.professor}</div>
            <div>{course.schedule} / Room {course.room}</div>
          </div>
        </div>
      </div>
      
      {showActions && (
        <div className="flex border-t border-gray-100">
          <Link
            to={`/courses/${course.id}?tab=notices`}
            className="flex-1 py-2 text-center text-sm text-secondary-600 hover:bg-gray-50 transition-colors"
          >
            Notices
          </Link>
          <Link
            to={`/courses/${course.id}?tab=materials`}
            className="flex-1 py-2 text-center text-sm text-secondary-600 hover:bg-gray-50 transition-colors border-l border-gray-100"
          >
            Materials
          </Link>
          <Link
            to={`/courses/${course.id}?tab=q-and-a`}
            className="flex-1 py-2 text-center text-sm text-secondary-600 hover:bg-gray-50 transition-colors border-l border-gray-100"
          >
            Q&A
          </Link>
        </div>
      )}
    </div>
  );
};

export default CourseCard;