import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Plus } from 'lucide-react';
import { getAllCourses, Course, createCourse, CreateCourseRequest } from '../api/courses';

const CourseManagement: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<CreateCourseRequest>({
    SubjName: '',
    SubjTime: '',
    SubjLocation: '',
    ProfName: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      console.log('Fetching courses...');
      const response = await getAllCourses();
      console.log('API Response:', response);
      if (response && response.subjects) {
        setCourses(response.subjects);
        console.log('Courses set:', response.subjects);
      } else {
        console.error('Invalid response format:', response);
        setError('수업 정보 형식이 올바르지 않습니다.');
      }
      setError(null);
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(error instanceof Error ? error.message : '수업 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId: string) => {
    if (confirm('정말로 이 수업을 삭제하시겠습니까?')) {
      setCourses(courses.filter(course => course.ClassID !== courseId));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse(formData);
      setIsModalOpen(false);
      setFormData({
        SubjName: '',
        SubjTime: '',
        SubjLocation: '',
        ProfName: ''
      });
      // Refresh the course list
      await fetchCourses();
    } catch (error) {
      console.error('Error creating course:', error);
      setError(error instanceof Error ? error.message : '수업 추가에 실패했습니다.');
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-secondary-900">수업 관리</h1>
          <button 
            className="btn btn-primary flex items-center gap-2"
            onClick={() => {
              setEditingCourse(null);
              setFormData({
                SubjName: '',
                SubjTime: '',
                SubjLocation: '',
                ProfName: ''
              });
              setIsModalOpen(true);
            }}
          >
            <Plus size={20} />
            수업 추가
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수업 ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">수업명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">교수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강의시간</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">강의실</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">관리</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.ClassID}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {course.ClassID}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.ClassName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.ClassProf}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.ClassTime.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {course.ClassLocation.join(', ')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-primary-600 hover:text-primary-900 inline-flex items-center gap-1 mr-4"
                      onClick={() => handleEditCourse(course)}
                    >
                      <Edit size={16} />
                      수정
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                      onClick={() => handleDeleteCourse(course.ClassID)}
                    >
                      <Trash2 size={16} />
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourse ? '수업 수정' : '새 수업 추가'}
            </h2>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  수업명
                </label>
                <input
                  type="text"
                  name="SubjName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.SubjName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  교수
                </label>
                <input
                  type="text"
                  name="ProfName"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.ProfName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  강의시간
                </label>
                <input
                  type="text"
                  name="SubjTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.SubjTime}
                  onChange={handleInputChange}
                  placeholder="예: 월3,수3"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  강의실
                </label>
                <input
                  type="text"
                  name="SubjLocation"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={formData.SubjLocation}
                  onChange={handleInputChange}
                  placeholder="예: 새빛관203호, 새빛관204호"
                  required
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  취소
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? '저장' : '추가'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseManagement; 