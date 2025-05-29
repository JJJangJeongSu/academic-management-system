import React from 'react';
import { grades, calculateGPA } from '../data/mockData';

const Grades: React.FC = () => {
  const gpa = calculateGPA(grades);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">Academic Record</h1>
      
      {/* GPA Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Cumulative GPA</h2>
            <p className="text-secondary-600 mt-1">Spring 2025 Semester</p>
          </div>
          <div className="text-4xl font-bold text-primary-600">{gpa}</div>
        </div>
      </div>
      
      {/* Grades Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Code
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Credits
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Grade
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade, index) => (
                <tr key={grade.courseId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-800">
                    {grade.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                    {grade.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">
                    {grade.credits}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      grade.letterGrade.startsWith('A') 
                        ? 'bg-success-100 text-success-800' 
                        : grade.letterGrade.startsWith('B') 
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {grade.letterGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 text-right">
                    {grade.numericalGrade}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* GPA Calculation Info */}
      <div className="bg-secondary-50 p-4 rounded-lg">
        <h3 className="font-medium text-secondary-800">GPA Calculation</h3>
        <p className="text-sm text-secondary-600 mt-2">
          GPA is calculated using a 4.0 scale where A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, and so on. 
          Each grade is weighted by the number of credit hours for the course.
        </p>
      </div>
    </div>
  );
};

export default Grades;