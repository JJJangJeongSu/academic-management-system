import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardData } from '../api/dashboard';
import { DashboardData } from '../types/dashboard';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboardData = await getDashboardData();
        setData(dashboardData);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
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
            <Link 
              key={subj.ClassID} 
              to={`/courses/${subj.ClassID}`}
              className="card p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="font-bold text-lg">{subj.ClassName}</div>
              <div className="text-sm text-secondary-700">교수: {subj.ClassProf}</div>
              <div className="text-xs text-secondary-500 mt-1">
                강의실: {subj.ClassLocation.join(', ')}<br />
                강의시간: {subj.ClassTime.join(', ')}
              </div>
            </Link>
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
              <Link 
                to={`/courses/${act.ClassID}`}
                className="hover:text-primary-600 transition-colors duration-200"
              >
                <span className="font-semibold">[{act.type}]</span> {act.postName}
                <span className="ml-2 text-xs text-secondary-500">({act.ClassName}, {act.postDate})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;