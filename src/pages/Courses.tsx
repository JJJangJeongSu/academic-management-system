import React from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Courses: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isProfessor = user?.role === 'professor';
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Courses</h1>
        
        {/* Add course button (visible only to admins and professors) */}
        {(isAdmin || isProfessor) && (
          <button className="btn btn-primary flex items-center">
            <Plus size={18} className="mr-1.5" />
            Add Course
          </button>
        )}
      </div>
      
      {/* Filter by semester (could be expanded) */}
      <div className="flex space-x-2">
        <button className="btn btn-secondary btn-sm">All Semesters</button>
        <button className="btn btn-primary btn-sm">Spring 2025</button>
      </div>
      
      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <Link key={course.id} to={`/courses/${course.id}`} className="block transition-transform hover:-translate-y-1">
            <CourseCard course={course} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;