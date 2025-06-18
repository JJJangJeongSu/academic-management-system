import React, { useState, useEffect } from 'react';

interface Course {
  id: number;
  name: string;
  professor: string;
  location: string[];
  time: string[];
  capacity: number;
  enrolled: number;
}

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Implement actual API call to fetch courses
    const fetchCourses = async () => {
      try {
        // Placeholder data
        const mockCourses: Course[] = [
          {
            id: 1,
            name: '웹 프로그래밍',
            professor: '김교수',
            location: ['A101'],
            time: ['월 1-2교시'],
            capacity: 30,
            enrolled: 25
          },
          {
            id: 2,
            name: '데이터베이스',
            professor: '이교수',
            location: ['B203'],
            time: ['화 3-4교시'],
            capacity: 35,
            enrolled: 30
          }
        ];
        setCourses(mockCourses);
        setError(null);
      } catch (err) {
        setError('수업 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary-900 mb-6">수업 관리</h1>
        
        <div className="mb-4">
          <button className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700 transition-colors">
            새 수업 추가
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수업명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강의실</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강의시간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수강인원</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{course.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.professor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.location.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.time.join(', ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.enrolled}/{course.capacity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-primary-600 hover:text-primary-900 mr-2">수정</button>
                    <button className="text-red-600 hover:text-red-900">삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement; 