import React, { useState, useEffect } from 'react';
import { Subject, CoursesApiResponse } from '../types/subject';
import { getTimetable } from '../api/course';
import { Link } from 'react-router-dom';

type ViewMode = 'week' | 'list';

const Timetable: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [data, setData] = useState<CoursesApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const response = await getTimetable();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '시간표를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  // Week View용: 요일별 시간표 데이터 생성
  const days = ['월', '화', '수', '목', '금'];
  const times = ['1', '2', '3', '4', '5', '6', '7', '8'];
  
  // 각 과목의 시간정보를 요일/교시별로 매핑
  const weekTable: { [day: string]: { time: string; subject?: Subject }[] } = {};
  days.forEach(day => {
    weekTable[day] = times.map(time => {
      const found = data?.subject.subjects.find(subj =>
        subj.ClassTime.some(t => t.startsWith(day) && t.replace(/[^0-9]/g, '') === time)
      );
      return { time, subject: found };
    });
  });

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">시간표</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('week')}
            className={`btn btn-sm ${viewMode === 'week' ? 'btn-primary' : 'btn-secondary'}`}
          >
            주간 보기
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}`}
          >
            리스트 보기
          </button>
        </div>
      </div>
      {/* Week View */}
      {viewMode === 'week' && (
        <div className="card overflow-x-auto">
          <table className="min-w-full text-center table-fixed">
            <thead>
              <tr>
                <th className="p-2 bg-gray-50 w-1/6 h-16">시간/요일</th>
                {days.map(day => (
                  <th key={day} className="p-2 bg-gray-50 w-1/6 h-16">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map(time => (
                <tr key={time}>
                  <td className="p-2 font-bold bg-gray-50 w-1/6 h-16">{time}교시</td>
                  {days.map(day => {
                    const slot = weekTable[day].find(s => s.time === time);
                    return (
                      <td key={day + time} className="p-2 w-1/6 h-16 align-middle">
                        {slot?.subject ? (
                          <Link 
                            to={`/courses/${slot.subject.ClassID}?tab=notices`}
                            className="block hover:bg-gray-50 rounded p-1 transition-colors"
                          >
                            <div className="font-semibold">{slot.subject.ClassName}</div>
                            <div className="text-xs text-secondary-500">{slot.subject.ClassLocation.join(', ')}</div>
                          </Link>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* List View */}
      {viewMode === 'list' && (
        <div className="space-y-4">
          {data.subject.subjects.map(subj => (
            <Link 
              key={subj.ClassID} 
              to={`/courses/${subj.ClassID}?tab=notices`}
              className="card p-4 hover:shadow-md transition-shadow duration-200 block"
            >
              <h3 className="font-semibold text-secondary-800">{subj.ClassName}</h3>
              <div className="mt-2 space-y-1 text-sm text-secondary-600">
                <div>교수: {subj.ClassProf}</div>
                <div>강의실: {subj.ClassLocation.join(', ')}</div>
                <div>강의시간: {subj.ClassTime.join(', ')}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
      {/* Export options */}
      <div className="flex justify-end">
        <button className="btn btn-secondary btn-sm">캘린더로 내보내기</button>
      </div>
    </div>
  );
};

export default Timetable;