import React from 'react';
import { GradesApiResponse } from '../types/grade';

// mock data (명세 예시 기반)
const mockGradesData: GradesApiResponse = {
  GPA: 3.8,
  subject: {
    count: 4,
    subjects: [
      {
        ClassID: 10,
        ClassName: '시스템프로그래밍',
        ClassProf: '김태석',
        ClassSemester: 20241,
        ClassGrade: 'A',
        ClassCredit: 3,
        ClassScore: 90,
      },
      {
        ClassID: 11,
        ClassName: '데이터구조',
        ClassProf: '이기훈',
        ClassSemester: 20232,
        ClassGrade: 'B+',
        ClassCredit: 3,
        ClassScore: 82,
      },
      {
        ClassID: 12,
        ClassName: '디지털논리회로2',
        ClassProf: '이준환',
        ClassSemester: 20232,
        ClassGrade: 'A+',
        ClassCredit: 3,
        ClassScore: 97,
      },
      {
        ClassID: 13,
        ClassName: '디지털논리회로1',
        ClassProf: '이준환',
        ClassSemester: 20231,
        ClassGrade: 'A+',
        ClassCredit: 3,
        ClassScore: 99,
      },
    ],
  },
};

const Grades: React.FC = () => {
  const data = mockGradesData;

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
          <div className="text-4xl font-bold text-primary-600">{data.GPA}</div>
        </div>
      </div>
      {/* Grades Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">과목명</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">교수</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">학기</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">학점</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider">등급</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">점수</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.subject.subjects.map((grade, index) => (
                <tr key={grade.ClassID} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-secondary-800">{grade.ClassName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">{grade.ClassProf}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">{grade.ClassSemester}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600">{grade.ClassCredit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      grade.ClassGrade.startsWith('A')
                        ? 'bg-success-100 text-success-800'
                        : grade.ClassGrade.startsWith('B')
                        ? 'bg-primary-100 text-primary-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {grade.ClassGrade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary-600 text-right">{grade.ClassScore}</td>
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
          GPA는 4.0 만점 기준으로 산출되며, 각 등급은 학점(credit) 수에 따라 가중치가 부여됩니다.
        </p>
      </div>
    </div>
  );
};

export default Grades;