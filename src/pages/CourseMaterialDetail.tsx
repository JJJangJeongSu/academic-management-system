import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare, Plus, X, Trash2 } from 'lucide-react';
import { getCourseMaterialDetail, addCourseMaterialComment, deleteCourseMaterialComment } from '../api/course';
import type { CourseMaterialDetail } from '../types/course';
import { format } from 'date-fns';

const CourseMaterialDetail: React.FC = () => {
  const { courseId, materialId } = useParams<{ courseId: string; materialId: string }>();
  const navigate = useNavigate();
  const [materialDetail, setMaterialDetail] = useState<CourseMaterialDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentString, setCommentString] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !materialId) return;

    setSubmitting(true);
    try {
      await addCourseMaterialComment(courseId, materialId, '', commentString, undefined);
      // Refresh material detail to show new comment
      const data = await getCourseMaterialDetail(courseId, materialId);
      setMaterialDetail(data);
      // Reset form
      setCommentString('');
      setShowCommentForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!courseId || !materialId) return;

    try {
      await deleteCourseMaterialComment(Number(commentId));
      // 댓글 삭제 후 강의자료 상세 정보 다시 불러오기
      const data = await getCourseMaterialDetail(courseId, materialId);
      setMaterialDetail(data);
    } catch (error) {
      console.error('Failed to delete comment:', error);
      setError('댓글 삭제에 실패했습니다.');
    }
  };

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
      </div>

      {/* Comments section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageSquare size={20} className="mr-2" />
            댓글 {course.comments.length}개
          </h2>
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="btn btn-primary flex items-center"
          >
            {showCommentForm ? (
              <>
                <X size={16} className="mr-1" />
                취소
              </>
            ) : (
              <>
                <Plus size={16} className="mr-1" />
                댓글 작성
              </>
            )}
          </button>
        </div>

        {showCommentForm && (
          <form onSubmit={handleSubmitComment} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-semibold text-secondary-900">댓글 작성</h3>
              <button
                type="button"
                onClick={() => setShowCommentForm(false)}
                className="text-secondary-500 hover:text-secondary-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div>
              <textarea
                value={commentString}
                onChange={(e) => setCommentString(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px] resize-y"
                placeholder="댓글을 입력하세요"
                required
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                type="button"
                onClick={() => setShowCommentForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                취소
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    작성 중...
                  </span>
                ) : (
                  '댓글 작성'
                )}
              </button>
            </div>
          </form>
        )}

        {course.comments.length > 0 ? (
          <div className="space-y-4">
            {course.comments.map(comment => (
              <div key={comment.commentID} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{comment.commentUserName}</div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-secondary-600">
                      {format(new Date(comment.commentDate), 'yyyy년 MM월 dd일 HH:mm')}
                    </div>
                    {localStorage.getItem('uid') === comment.commentUserID.toString() && (
                      <button
                        onClick={() => handleDeleteComment(comment.commentID)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                        title="댓글 삭제"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-secondary-800 mb-2">{comment.commentContents}</div>
                {comment.commentFile && (
                  <a
                    href={`${import.meta.env.VITE_API_BASE_URL}/download/${comment.commentFile}`}
                    className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                  >
                    <Download size={14} className="mr-1" />
                    첨부파일
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-secondary-600">
            등록된 댓글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseMaterialDetail; 