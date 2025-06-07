import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AssignmentCard from '../components/AssignmentCard';
import { assignments, courses } from '../data/mockData';

// Filter types
type FilterStatus = 'all' | 'pending' | 'submitted' | 'graded';

const Assignments: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  
  // Filter assignments based on status
  const filteredAssignments = assignments.filter(assignment => {
    if (filterStatus === 'all') return true;
    return assignment.status === filterStatus;
  });
  
  // Get course name by ID
  const getCourseById = (courseId: string) => {
    return courses.find(course => course.id === courseId);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Assignments</h1>
      
      {/* Filter tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            All
          </button>
          
          <button
            onClick={() => setFilterStatus('pending')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Pending
          </button>
          
          <button
            onClick={() => setFilterStatus('submitted')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'submitted'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Submitted
          </button>
          
          <button
            onClick={() => setFilterStatus('graded')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'graded'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Graded
          </button>
        </nav>
      </div>
      
      {/* Assignments list */}
      <div className="space-y-6">
        {filteredAssignments.length > 0 ? (
          Object.values(
            filteredAssignments.reduce((acc, assignment) => {
              const course = getCourseById(assignment.courseId);
              
              if (!acc[assignment.courseId]) {
                acc[assignment.courseId] = {
                  course,
                  assignments: [],
                };
              }
              
              acc[assignment.courseId].assignments.push(assignment);
              return acc;
            }, {} as Record<string, { course: typeof courses[0] | undefined; assignments: typeof assignments }> )
          ).map(group => (
            <div key={group.course?.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-secondary-800">
                  {group.course?.code}: {group.course?.title}
                </h2>
                <Link 
                  to={`/courses/${group.course?.id}?tab=assignments`} 
                  className="text-sm text-primary-600 hover:underline"
                >
                  View Course
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {group.assignments.map(assignment => (
                  <AssignmentCard key={assignment.id} assignment={assignment} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-secondary-600">No assignments match your filters.</p>
            <button 
              onClick={() => setFilterStatus('all')} 
              className="btn btn-primary mt-4"
            >
              View all assignments
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;