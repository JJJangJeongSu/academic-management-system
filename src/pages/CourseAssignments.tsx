import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Download } from 'lucide-react';
import { getCourseAssignments } from '../api/course';
import type { CourseAssignments } from '../types/assignment';
import { format } from 'date-fns';

const CourseAssignments: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [data, setData] = useState<CourseAssignments | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!courseId) {
        setError('잘못된 접근입니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await getCourseAssignments(courseId);
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '과제 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-secondary-600">로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="space-y-4">
        <div className="text-secondary-600">과제 목록을 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Course info */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-secondary-600">
          {data.subject.ClassName} | {data.subject.ClassProf}
        </div>
      </div>

      {/* Assignments list */}
      <div className="space-y-4">
        {data.assignment.length > 0 ? (
          <div className="space-y-4">
            {data.assignment.map(assignment => (
              <div key={assignment.postID} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">{assignment.postName}</h3>
                  <div className="text-sm text-secondary-600">
                    작성자: {assignment.postUserName}
                  </div>
                </div>
                <div className="flex items-center text-secondary-500 text-sm mb-4">
                  <Calendar size={16} className="mr-1.5" />
                  <span>마감: {format(new Date(assignment.postDate), 'yyyy년 MM월 dd일 HH:mm')}</span>
                </div>
                <div className="flex justify-end">
                  <button className="btn btn-secondary btn-sm flex items-center">
                    <Download size={16} className="mr-1.5" />
                    과제 다운로드
                  </button>
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
    </div>
  );
};

export default CourseAssignments; 