import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// 명세 기반 타입 정의
interface Subject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  ClassTime: string[];
  ClassLocation: string[];
}

interface CoursesApiResponse {
  subject: {
    count: number;
    subjects: Subject[];
  };
}

// mock data (명세 예시 기반)
const mockCoursesData: CoursesApiResponse = {
  subject: {
    count: 3,
    subjects: [
      {
        ClassID: 11,
        ClassName: '산학협력캡스톤설계',
        ClassProf: '이형근',
        ClassTime: ['월1', '수2'],
        ClassLocation: ['새빛관 102호', '새빛관 102호'],
      },
      {
        ClassID: 10,
        ClassName: '임베디드시스템설계',
        ClassProf: '김태석',
        ClassTime: ['월1', '수2'],
        ClassLocation: ['새빛관 203호', '새빛관 304호'],
      },
      {
        ClassID: 12,
        ClassName: '소프트웨어공학',
        ClassProf: '이기훈',
        ClassTime: ['월1', '수2'],
        ClassLocation: ['새빛관 203호', '새빛관 203호'],
      },
    ],
  },
};

const Courses: React.FC = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const isProfessor = user?.role === 'professor';
  const [data, setData] = useState<CoursesApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockCoursesData);
      setLoading(false);
    }, 400);
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">내 수강 과목 ({data.subject.count}개)</h1>
        {/* Add course button (visible only to admins and professors) */}
        {(isAdmin || isProfessor) && (
          <button className="btn btn-primary flex items-center">
            <Plus size={18} className="mr-1.5" />
            과목 추가
          </button>
        )}
      </div>
      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.subject.subjects.map(subject => (
          <div key={subject.ClassID} className="card p-4 border rounded-lg shadow-sm bg-white">
            <div className="font-bold text-lg mb-1">{subject.ClassName}</div>
            <div className="text-sm text-secondary-700 mb-1">교수: {subject.ClassProf}</div>
            <div className="text-xs text-secondary-500 mb-1">강의시간: {subject.ClassTime.join(', ')}</div>
            <div className="text-xs text-secondary-500">강의실: {subject.ClassLocation.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;