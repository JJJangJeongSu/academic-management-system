import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Calendar, User } from 'lucide-react';
import { getCourseMaterialDetail } from '../api/course';
import type { CourseMaterialDetailResponse } from '../types/course';
import { format } from 'date-fns';

const CourseMaterialDetail: React.FC = () => {
  const { courseId, materialId } = useParams<{ courseId: string; materialId: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<CourseMaterialDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterialDetail = async () => {
      if (!courseId || !materialId) return;
      
      try {
        const response = await getCourseMaterialDetail(courseId, materialId);
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '강의 자료를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialDetail();
  }, [courseId, materialId]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>강의 자료가 없습니다.</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/courses/${courseId}?tab=materials`)}
          className="btn btn-ghost btn-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">{data.course.postName}</h1>
      </div>

      {/* Material content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-secondary-600">
              <User size={16} className="mr-1.5" />
              <span>{data.course.postUserName}</span>
            </div>
            <div className="flex items-center text-secondary-600">
              <Calendar size={16} className="mr-1.5" />
              <span>{format(new Date(data.course.postDate), 'yyyy년 MM월 dd일 HH:mm')}</span>
            </div>
          </div>
          {data.course.postFile && (
            <button className="btn btn-secondary btn-sm flex items-center">
              <Download size={16} className="mr-1.5" />
              자료 다운로드
            </button>
          )}
        </div>

        <div className="prose max-w-none">
          <p className="whitespace-pre-wrap">{data.course.postContents}</p>
        </div>
      </div>

      {/* Comments section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">댓글</h2>
        
        {data.course.comments.length > 0 ? (
          <div className="space-y-4">
            {data.course.comments.map(comment => (
              <div key={comment.commentID} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-secondary-600">
                      <User size={16} className="mr-1.5" />
                      <span>{comment.commentUserName}</span>
                    </div>
                    <div className="flex items-center text-secondary-600">
                      <Calendar size={16} className="mr-1.5" />
                      <span>{format(new Date(comment.commentDate), 'yyyy년 MM월 dd일 HH:mm')}</span>
                    </div>
                  </div>
                </div>
                <div className="prose max-w-none">
                  <p className="whitespace-pre-wrap">{comment.commentContents}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-secondary-600">등록된 댓글이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMaterialDetail; 