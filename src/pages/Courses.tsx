import React, { useEffect, useState } from 'react';
import { Plus, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CoursesApiResponse } from '../types/subject';
import { getCourseList } from '../api/course';

const Courses: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = Number(localStorage.getItem('uid')) === 0;
  const isProfessor = localStorage.getItem('userRole') === '2';
  const [data, setData] = useState<CoursesApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourseList();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '강의 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">지원되지 않는 기능</h2>
          <p className="text-secondary-600">관리자님께서는 이 기능을 사용하실 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{localStorage.getItem('userRole') === '2' ? '강의 과목' : '내 수강 과목'} ({data.subject.count}개)</h1>
        <div className="flex gap-3">
          {/* Course registration button (visible only to students) */}
          {!isAdmin && !isProfessor && (
            <Link to="/course-registration" className="btn btn-secondary flex items-center">
              <BookOpen size={18} className="mr-1.5" />
              수강신청
            </Link>
          )}
          {/* Add course button (visible only to admins and professors) */}
          
        </div>
      </div>
      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.subject.subjects.map(subject => (
          <Link 
            key={subject.ClassID} 
            to={`/courses/${subject.ClassID}?tab=notices`}
            className="card p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
          >
            <div className="font-bold text-lg mb-1">{subject.ClassName}</div>
            <div className="text-sm text-secondary-700 mb-1">교수: {subject.ClassProf}</div>
            <div className="text-xs text-secondary-500 mb-1">강의시간: {subject.ClassTime.join(', ')}</div>
            <div className="text-xs text-secondary-500">강의실: {subject.ClassLocation.join(', ')}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;