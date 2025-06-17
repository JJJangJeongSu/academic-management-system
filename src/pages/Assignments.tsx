import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle } from 'lucide-react';
import { getAssignments } from '../api/course';
import type { AssignmentsResponse } from '../types/assignment';
import { format } from 'date-fns';

const Assignments: React.FC = () => {
  const [data, setData] = useState<AssignmentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await getAssignments();
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '과제 목록을 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">과제 목록</h1>
      </div>

      <div className="space-y-6">
        {data.subjects.map(subject => (
          <div key={subject.ClassID} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold">{subject.ClassName}</h2>
                <p className="text-secondary-600 mt-1">교수: {subject.ClassProf}</p>
              </div>
              <Link 
                to={`/courses/${subject.ClassID}?tab=assignments`}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                과제 목록 보기
              </Link>
            </div>

            {subject.Assignment.length > 0 ? (
              <div className="space-y-4">
                {subject.Assignment.map(assignment => (
                  <div 
                    key={assignment.postID}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {assignment.submit === 1 ? (
                        <CheckCircle2 className="text-green-500" size={20} />
                      ) : (
                        <Circle className="text-gray-400" size={20} />
                      )}
                      <div>
                        <h3 className="font-medium">{assignment.postName}</h3>
                        <p className="text-sm text-secondary-600">
                          제출기한: {format(new Date(assignment.postDate), 'yyyy년 MM월 dd일 HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm">
                      {assignment.submit === 1 ? (
                        <span className="text-green-600">제출완료</span>
                      ) : (
                        <span className="text-red-600">미제출</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-secondary-600">
                등록된 과제가 없습니다.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assignments;