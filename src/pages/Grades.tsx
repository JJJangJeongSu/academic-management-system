import React, { useEffect, useState } from 'react';
import { getGrades } from '../api/course';
import { GradesResponse } from '../types/grade';

const Grades: React.FC = () => {
  const [data, setData] = useState<GradesResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userRole = localStorage.getItem('userRole');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getGrades();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '성적 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, []);

  // Calculate GPA
  const calculateGPA = (grades: GradesResponse['subject']) => {
    const totalPoints = grades.reduce((sum, grade) => {
      const gradePoints = parseFloat(grade.Grade);
      return sum + (gradePoints * grade.Unit);
    }, 0);
    
    const totalUnits = grades.reduce((sum, grade) => sum + grade.Unit, 0);
    return totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : '0.00';
  };

  if (userRole === '2') {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">지원되지 않는 기능</h2>
          <p className="text-secondary-600">교수님께서는 이 기능을 사용하실 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  const gpa = calculateGPA(data.subject);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">성적</h1>
      {/* GPA Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">누적 GPA</h2>
            <p className="text-secondary-600 mt-1">전체 이수 학기</p>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">과목명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">학점</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">등급</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">점수</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.subject.map((grade, index) => (
                <tr key={grade.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-800">{grade.SubjName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">{grade.Unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      parseFloat(grade.Grade) >= 4.0
                        ? 'bg-success-100 text-success-800'
                        : parseFloat(grade.Grade) >= 3.0
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {grade.Grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 text-right">{grade.Score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* GPA Calculation Info */}
      <div className="bg-secondary-50 p-4 rounded-lg">
        <h3 className="font-medium text-secondary-800">GPA 산출 기준</h3>
        <p className="text-sm text-secondary-600 mt-2">
          GPA는 4.5 만점 기준으로 산출되며, 각 등급은 학점(credit) 수에 따라 가중치가 부여됩니다.
        </p>
      </div>
    </div>
  );
};

export default Grades;