import React, { useState } from 'react';
import AssignmentCard from '../components/AssignmentCard';
import { Assignment, Subject } from '../types/assignment';

// 명세 기반 타입 정의
interface Assignment {
  postID: number;
  postName: string;
  postDate: string;
  submit: 0 | 1;
}

interface Subject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  Assignment: Assignment[];
}

interface AssignmentsApiResponse {
  subjects: Subject[];
}

// mock data (명세 예시 기반)
const mockAssignmentsData: AssignmentsApiResponse = {
  subjects: [
    {
      ClassID: 10,
      ClassName: '산학협력캡스톤설계',
      ClassProf: '이기훈',
      Assignment: [
        {
          postID: 3,
          postName: '졸업작품 계획서 제출',
          postDate: '2025-03-25 23:59:00',
          submit: 1,
        },
      ],
    },
    {
      ClassID: 11,
      ClassName: '임베디드시스템설계',
      ClassProf: '이기훈',
      Assignment: [],
    },
    {
      ClassID: 12,
      ClassName: '소프트웨어공학',
      ClassProf: '이기훈',
      Assignment: [
        {
          postID: 2,
          postName: '2차 과제',
          postDate: '2025-05-07 23:59:00',
          submit: 0,
        },
        {
          postID: 1,
          postName: '1차 과제',
          postDate: '2025-03-20 23:59:00',
          submit: 1,
        },
      ],
    },
  ],
};

type FilterStatus = 'all' | 'pending' | 'submitted';

const Assignments: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  // 가나다순 정렬
  const sortedSubjects = [...mockAssignmentsData.subjects].sort((a, b) => a.ClassName.localeCompare(b.ClassName, 'ko'));

  // 필터 적용
  const filteredSubjects = sortedSubjects.map(subject => ({
    ...subject,
    Assignment: subject.Assignment.filter(assignment => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'pending') return assignment.submit === 0;
      if (filterStatus === 'submitted') return assignment.submit === 1;
      return true;
    }),
  }));

  // 필터 후 과제가 하나도 없는지 체크
  const hasAnyAssignment = filteredSubjects.some(s => s.Assignment.length > 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">과제</h1>
      {/* Filter tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setFilterStatus('all')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'all'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            전체
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'pending'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            미제출
          </button>
          <button
            onClick={() => setFilterStatus('submitted')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              filterStatus === 'submitted'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            제출
          </button>
        </nav>
      </div>
      {/* Assignments list */}
      <div className="space-y-6">
        {filteredSubjects.map(subject => (
          <div key={subject.ClassID} className="space-y-3">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-secondary-800">
                {subject.ClassName} <span className="ml-2 text-xs text-secondary-500">({subject.ClassProf})</span>
              </h2>
            </div>
            {subject.Assignment.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.Assignment.map(assignment => (
                  <AssignmentCard key={assignment.postID} assignment={assignment} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center text-secondary-500">과제가 없습니다.</div>
            )}
          </div>
        ))}
        {!hasAnyAssignment && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-secondary-600">해당 조건에 맞는 과제가 없습니다.</p>
            <button
              onClick={() => setFilterStatus('all')}
              className="btn btn-primary mt-4"
            >
              전체 과제 보기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Assignments;