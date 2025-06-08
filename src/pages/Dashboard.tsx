import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Dashboard 반환형 타입 정의 (명세 기반)
interface Subject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  ClassTime: string[];
  ClassLocation: string[];
}

interface Activity {
  ClassID: number;
  ClassName: string;
  type: '과제' | '공지사항';
  postID: number;
  postName: string;
  postDate: string;
}

interface DashboardData {
  subject: {
    count: number;
    subjects: Subject[];
  };
  GPA: number;
  assignment: number;
  activity: Activity[];
}

// 대시보드용 mock data (명세 예시 기반)
const mockDashboardData: DashboardData = {
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
  GPA: 3.8,
  assignment: 1,
  activity: [
    {
      ClassID: 12,
      ClassName: '소프트웨어공학',
      type: '과제',
      postID: 2,
      postName: '2차 과제',
      postDate: '2025-05-07 23:59:00',
    },
    {
      ClassID: 12,
      ClassName: '소프트웨어공학',
      type: '공지사항',
      postID: 9,
      postName: '중간고사 성적 안내',
      postDate: '2025-05-03 14:37:22',
    },
  ],
};

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 API 대신 mock data 사용
    setTimeout(() => {
      setData(mockDashboardData);
      setLoading(false);
    }, 500); // 로딩 효과를 위해 약간의 딜레이
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary-900">
          환영합니다{user ? `, ${user.name}님!` : ''}
        </h1>
        <p className="text-secondary-600 mt-1">
          이번 학기 수강 과목: <b>{data.subject.count}</b>개, GPA: <b>{data.GPA}</b>, 예정된 과제: <b>{data.assignment}</b>개
        </p>
      </div>

      {/* 수강 과목 목록 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">수강 과목</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.subject.subjects.map(subj => (
            <div key={subj.ClassID} className="card p-4 border rounded-lg shadow-sm">
              <div className="font-bold text-lg">{subj.ClassName}</div>
              <div className="text-sm text-secondary-700">교수: {subj.ClassProf}</div>
              <div className="text-xs text-secondary-500 mt-1">
                강의실: {subj.ClassLocation.join(', ')}<br />
                강의시간: {subj.ClassTime.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 예정된 과제 수 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">예정된 과제</h2>
        <div className="text-lg">
          {data.assignment > 0 ? `${data.assignment}개 예정됨` : '예정된 과제가 없습니다.'}
        </div>
      </section>

      {/* 최근 활동 */}
      <section>
        <h2 className="text-xl font-semibold mb-4">최근 활동</h2>
        <ul className="divide-y">
          {data.activity.length === 0 && <li className="py-2 text-secondary-500">최근 활동이 없습니다.</li>}
          {data.activity.map((act, idx) => (
            <li key={act.postID + '-' + act.type + '-' + idx} className="py-2">
              <span className="font-semibold">[{act.type}]</span> {act.postName}
              <span className="ml-2 text-xs text-secondary-500">({act.ClassName}, {act.postDate})</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;