import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Mail, Plus } from 'lucide-react';
import AssignmentCard from '../components/AssignmentCard';
import NoticeItem from '../components/NoticeItem';
import MaterialItem from '../components/MaterialItem';
import { courses, assignments, notices, materials } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

type TabType = 'notices' | 'materials' | 'assignments' | 'q-and-a';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabType>(
    (tabParam as TabType) || 'notices'
  );
  const { user } = useAuth();
  
  // Find course by ID
  const course = courses.find(c => c.id === courseId);
  
  // Get course-specific content
  const courseAssignments = assignments.filter(a => a.courseId === courseId);
  const courseNotices = notices.filter(n => n.courseId === courseId);
  const courseMaterials = materials.filter(m => m.courseId === courseId);
  
  // Check if user is professor for this course
  const isProfessor = user?.role === 'professor';
  
  // Update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-secondary-800">Course not found</h2>
          <p className="text-secondary-600 mt-2">The course you are looking for does not exist.</p>
          <Link to="/courses" className="btn btn-primary mt-4 inline-block">
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Course header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{course.code}: {course.title}</h1>
            <div className="text-secondary-600 mt-2">
              <div>Professor: {course.professor}</div>
              <div>Schedule: {course.schedule}</div>
              <div>Room: {course.room}</div>
            </div>
          </div>
          
          <button className="btn btn-primary mt-4 md:mt-0 flex items-center self-start">
            <Mail size={18} className="mr-1.5" />
            Contact Professor
          </button>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('notices')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'notices'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Notices
          </button>
          
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'materials'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Materials
          </button>
          
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'assignments'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Assignments
          </button>
          
          <button
            onClick={() => setActiveTab('q-and-a')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'q-and-a'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Q&A
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="py-4">
        {/* Notices tab */}
        {activeTab === 'notices' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Notices</h2>
              
              {isProfessor && (
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Post Notice
                </button>
              )}
            </div>
            
            {courseNotices.length > 0 ? (
              <div className="space-y-4">
                {courseNotices.map(notice => (
                  <NoticeItem key={notice.id} notice={notice} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">No notices have been posted yet.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Materials tab */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Course Resources</h2>
              
              {isProfessor && (
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Upload Material
                </button>
              )}
            </div>
            
            {courseMaterials.length > 0 ? (
              <div className="space-y-3">
                {courseMaterials.map(material => (
                  <MaterialItem key={material.id} material={material} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">No materials have been uploaded yet.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Assignments tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Assignments</h2>
              
              {isProfessor && (
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  Create Assignment
                </button>
              )}
            </div>
            
            {courseAssignments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courseAssignments.map(assignment => (
                  <AssignmentCard key={assignment.id} assignment={assignment} detailed />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">No assignments have been posted yet.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Q&A tab */}
        {activeTab === 'q-and-a' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Questions & Answers</h2>
              
              <button className="btn btn-primary btn-sm flex items-center">
                <Plus size={16} className="mr-1" />
                Ask a Question
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <p className="text-secondary-600">No questions have been asked yet.</p>
              <button className="btn btn-primary mt-4">
                Be the first to ask
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;