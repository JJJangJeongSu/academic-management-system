import React, { useState, useEffect } from 'react';
import { CoursesApiResponse } from '../types/subject';
import { getTimetable } from '../api/course';
import { Link } from 'react-router-dom';

type ViewMode = 'week' | 'list';

const Timetable: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [data, setData] = useState<CoursesApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = Number(localStorage.getItem('uid')) === 0;

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

  if (isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-secondary-900 mb-2">지원되지 않는 기능</h2>
          <p className="text-secondary-600">관리자님께서는 이 기능을 사용하실 수 없습니다.</p>
        </div>
      </div>
    );
  }

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  // Week View용: 요일별 시간표 데이터 생성
  const weekDays = ['월', '화', '수', '목', '금'];
  const timeSlots = Array.from({ length: 9 }, (_, i) => i + 1); // 1교시부터 9교시까지

  // 시간표 데이터 파싱 함수
  const parseTimeSlot = (timeStr: string) => {
    const day = timeStr.charAt(0);
    const period = parseInt(timeStr.substring(1));
    return { day, period };
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">시간표</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-md ${
              viewMode === 'week'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            주간 보기
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-2 rounded-md ${
              viewMode === 'list'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            목록 보기
          </button>
        </div>
      </div>

      {viewMode === 'week' ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  교시
                </th>
                {weekDays.map(day => (
                  <th
                    key={day}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {day}요일
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {time}교시
                  </td>
                  {weekDays.map(day => {
                    const subject = data.subject.subjects.find(subj =>
                      subj.ClassTime.some(timeStr => {
                        const { day: subjectDay, period } = parseTimeSlot(timeStr);
                        return subjectDay === day && period === time;
                      })
                    );
                    return (
                      <td
                        key={`${day}-${time}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {subject ? (
                          <Link
                            to={`/courses/${subject.ClassID}`}
                            className="block p-2 bg-primary-50 rounded hover:bg-primary-100"
                          >
                            <div className="font-medium">{subject.ClassName}</div>
                            <div className="text-xs text-gray-500">{subject.ClassLocation.join(', ')}</div>
                            <div className="text-xs text-gray-500">{subject.ClassProf}</div>
                          </Link>
                        ) : (
                          '-'
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-4">
          {data.subject.subjects.map(subject => (
            <div
              key={subject.ClassID}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{subject.ClassName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {subject.ClassTime.join(', ')} | {subject.ClassLocation.join(', ')}
                  </p>
                  <p className="text-sm text-gray-600">{subject.ClassProf}</p>
                </div>
                <Link
                  to={`/courses/${subject.ClassID}`}
                  className="text-primary-600 hover:text-primary-700"
                >
                  상세보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Timetable;