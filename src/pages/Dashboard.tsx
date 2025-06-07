import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import CourseCard from '../components/CourseCard';
import ActivityItem from '../components/ActivityItem';
import WeeklyTimetable from '../components/WeeklyTimetable';
import { courses, assignments, activities, grades, calculateGPA, generateTimetable } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const timetableData = generateTimetable();
  const gpa = calculateGPA(grades);
  const upcomingAssignments = assignments.filter(a => a.status === 'pending');
  const todaysClasses = 1; // Mock data
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome message */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary-900">Welcome back, {user?.name}!</h1>
        <p className="text-secondary-600 mt-1">
          You have {upcomingAssignments.length} upcoming assignments and {todaysClasses} class today.
        </p>
      </div>
      
      {/* Stats overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={courses.length} label="Enrolled Courses" />
        <StatCard value={upcomingAssignments.length} label="Upcoming Assignments" />
        <StatCard value={gpa} label="GPA" />
        <StatCard value={todaysClasses} label="Today's Classes" />
      </div>
      
      {/* Courses section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Courses (2025 Spring Semester)</h2>
          <Link to="/courses" className="text-sm text-primary-600 hover:underline">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 3).map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
      
      {/* Recent Activity and Timetable sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="card p-4">
            {activities.map(activity => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
        
        {/* Timetable section */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">My Timetable</h2>
            <Link to="/timetable" className="text-sm text-primary-600 hover:underline">
              View Full Timetable
            </Link>
          </div>
          
          <div className="card overflow-hidden">
            <WeeklyTimetable timetable={timetableData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;