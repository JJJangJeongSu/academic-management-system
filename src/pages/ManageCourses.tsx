import React, { useState } from 'react';
import { Course } from '../data/mockData';
import { Edit, Trash2, Plus } from 'lucide-react';

interface Professor {
  id: string;
  name: string;
}

const professors: Professor[] = [
  { id: '1', name: 'Dr. John Smith' },
  { id: '2', name: 'Dr. Emily Chen' },
  { id: '3', name: 'Dr. Michael Brown' },
  { id: '4', name: 'Prof. Lee Gijun' },
];

const initialCourses: Course[] = [
  {
    id: 'cs101',
    code: 'CS101',
    title: 'Introduction to Programming',
    professor: 'Dr. John Smith',
    schedule: 'Mon, Wed 9:00 AM - 10:30 AM',
    room: '301',
  },
  {
    id: 'cs201',
    code: 'CS201',
    title: 'Data Structures',
    professor: 'Dr. Emily Chen',
    schedule: 'Mon, Wed 9:00 AM - 10:30 AM',
    room: '301',
  },
  {
    id: 'cs301',
    code: 'CS301',
    title: 'Database Systems',
    professor: 'Dr. Michael Brown',
    schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
    room: '405',
  },
];

const ManageCourses: React.FC = () => {
  const [courses, setCourses] = useState(initialCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };
  
  const handleDeleteCourse = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <button 
          className="btn btn-primary flex items-center gap-2"
          onClick={() => {
            setEditingCourse(null);
            setIsModalOpen(true);
          }}
        >
          <Plus size={20} />
          Add Course
        </button>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course Code
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Professor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Schedule
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Room
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {course.code}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.professor}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.schedule}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.room}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-primary-600 hover:text-primary-900 inline-flex items-center gap-1 mr-4"
                    onClick={() => handleEditCourse(course)}
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900 inline-flex items-center gap-1"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourse ? 'Edit Course' : 'Add New Course'}
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Code
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={editingCourse?.code}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={editingCourse?.title}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Professor
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={editingCourse?.professor}
                >
                  <option value="">Select Professor</option>
                  {professors.map(prof => (
                    <option key={prof.id} value={prof.name}>
                      {prof.name}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Schedule
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={editingCourse?.schedule}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Room
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  defaultValue={editingCourse?.room}
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingCourse ? 'Save Changes' : 'Add Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;