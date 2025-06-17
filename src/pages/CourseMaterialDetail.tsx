import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { getCourseMaterialDetail } from '../api/course';
import type { CourseMaterialDetail } from '../types/course';
import { format } from 'date-fns';

const CourseMaterialDetail: React.FC = () => {
  const { courseId, materialId } = useParams<{ courseId: string; materialId: string }>();
  const navigate = useNavigate();
  const [materialDetail, setMaterialDetail] = useState<CourseMaterialDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMaterialDetail = async () => {
      if (!courseId || !materialId) return;
      
      try {
        const data = await getCourseMaterialDetail(courseId, materialId);
        setMaterialDetail(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '강의자료를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterialDetail();
  }, [courseId, materialId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  if (!materialDetail) {
    return null;
  }

  const { course } = materialDetail;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button */}
      <button
        onClick={() => navigate(`/courses/${courseId}?tab=materials`)}
        className="flex items-center text-secondary-600 hover:text-secondary-800"
      >
        <ArrowLeft size={20} className="mr-2" />
        목록으로 돌아가기
      </button>

      {/* Material content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="border-b pb-4 mb-4">
          <h1 className="text-3xl font-bold mb-2">{course.postName}</h1>
          <div className="flex justify-between text-secondary-600">
            <div>
              <span className="font-semibold">작성자:</span> {course.postUserName}
            </div>
            <div>
              <span className="font-semibold">작성일:</span>{' '}
              {format(new Date(course.postDate), 'yyyy년 MM월 dd일 HH:mm')}
            </div>
          </div>
        </div>

        <div className="prose max-w-none mb-6">
          <p className="whitespace-pre-wrap">{course.postContents}</p>
        </div>

        {course.postFile && (
          <div className="mt-4">
            <a
              href={course.postFile}
              className="inline-flex items-center px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download size={16} className="mr-2" />
              첨부파일 다운로드
            </a>
          </div>
        )}

        {/* Comments section */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">댓글</h3>
          {course.comments.length === 0 ? (
            <p className="text-secondary-600">아직 댓글이 없습니다.</p>
          ) : (
            <div className="space-y-4">
              {course.comments.map((comment) => (
                <div key={comment.commentID} className="border-b pb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">{comment.commentUserName}</span>
                    <span className="text-secondary-500">
                      {format(new Date(comment.commentDate), 'yyyy년 MM월 dd일 HH:mm')}
                    </span>
                  </div>
                  <p className="text-secondary-700">{comment.commentContents}</p>
                  {comment.commentFile && (
                    <div className="mt-2">
                      <a
                        href={comment.commentFile}
                        className="inline-flex items-center text-sm text-primary-600 hover:text-primary-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download size={14} className="mr-1" />
                        첨부파일 다운로드
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseMaterialDetail; 