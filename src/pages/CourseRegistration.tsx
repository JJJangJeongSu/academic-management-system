import React, { useState, useEffect } from 'react';
import { enrollCourse, getAvailableCourses, AvailableCourse } from '../api/course';
import AlertPopup from '../components/AlertPopup';

const CourseRegistration: React.FC = () => {
  const isAdmin = Number(localStorage.getItem('uid')) === 0;
  const [enrollingClassId, setEnrollingClassId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<AvailableCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        const courses = await getAvailableCourses();
        setSubjects(courses || []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '수강 가능한 과목 목록을 불러오는데 실패했습니다.');
        setSubjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableCourses();
  }, []);

  const handleEnroll = async (classId: number) => {
    setEnrollingClassId(classId);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await enrollCourse(classId);
      setSuccessMessage(response.message);
      // Refresh the course list after successful enrollment
      const updatedCourses = await getAvailableCourses();
      setSubjects(updatedCourses || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '수강 신청에 실패했습니다.';
      setError(errorMessage);
      console.error('Enrollment error:', errorMessage);
    } finally {
      setEnrollingClassId(null);
    }
  };

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-secondary-600">수강 가능한 과목 목록을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Alert Popups */}
      {error && (
        <AlertPopup
          type="error"
          message={error}
          onClose={() => setError(null)}
        />
      )}
      {successMessage && (
        <AlertPopup
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">수강신청</h1>
      </div>

      {/* Course list */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {subjects.length === 0 ? (
          <div className="p-8 text-center text-secondary-600">
            수강 가능한 과목이 없습니다.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">과목명</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교수</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강의시간</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강의실</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수강신청</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subjects.map((subject) => (
                  <tr key={subject.ClassID} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{subject.ClassName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subject.ClassProf}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subject.ClassTime.join(', ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{subject.ClassLocation.join(', ')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`btn btn-primary text-sm ${
                          enrollingClassId === subject.ClassID ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                        onClick={() => handleEnroll(subject.ClassID)}
                        disabled={enrollingClassId === subject.ClassID}
                      >
                        {enrollingClassId === subject.ClassID ? '신청중...' : '수강신청'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRegistration; 