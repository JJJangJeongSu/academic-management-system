import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare, Plus, X } from 'lucide-react';
import { getNoticeDetail, addNoticeComment } from '../api/course';
import type { NoticeDetail } from '../types/notice';
import { format } from 'date-fns';

const NoticeDetail: React.FC = () => {
  const { courseId, noticeId } = useParams<{ courseId: string; noticeId: string }>();
  const [data, setData] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [commentString, setCommentString] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoticeDetail = async () => {
      if (!courseId || !noticeId) {
        setError('잘못된 접근입니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await getNoticeDetail(courseId, noticeId);
        if (!response || !response.notice) {
          throw new Error('공지사항 데이터를 찾을 수 없습니다.');
        }
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '공지사항을 불러오는데 실패했습니다.');
        console.error('Error fetching notice detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNoticeDetail();
  }, [courseId, noticeId]);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !noticeId) return;

    setSubmitting(true);
    try {
      await addNoticeComment(courseId, noticeId, '', commentString, undefined);
      // Refresh notice detail to show new comment
      const response = await getNoticeDetail(courseId, noticeId);
      setData(response);
      // Reset form
      setCommentString('');
      setShowCommentForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '댓글 작성에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

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
        <button
          onClick={() => navigate(`/courses/${courseId}?tab=notices`)}
          className="btn btn-secondary"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  if (!data || !data.notice) {
    return (
      <div className="space-y-4">
        <div className="text-secondary-600">공지사항을 찾을 수 없습니다.</div>
        <button
          onClick={() => navigate(`/courses/${courseId}?tab=notices`)}
          className="btn btn-secondary"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button and course info */}
      <div className="flex items-center justify-between">
        <Link
          to={`/courses/${courseId}?tab=notices`}
          className="flex items-center text-secondary-600 hover:text-secondary-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          목록으로 돌아가기
        </Link>
        <div className="text-sm text-secondary-600">
          {data.subject.ClassName} | {data.subject.ClassProf}
        </div>
      </div>

      {/* Notice content */}
      <div className="card p-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold mb-2">{data.notice.postName}</h1>
          <div className="flex items-center justify-between text-sm text-secondary-600">
            <div>
              작성자: {data.notice.postUserName} | 
              작성일: {format(new Date(data.notice.postDate), 'yyyy년 MM월 dd일 HH:mm')}
            </div>
            {data.notice.postFile && (
              <a
                href={`${import.meta.env.VITE_API_BASE_URL}/download/${data.notice.postFile}`}
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Download size={16} className="mr-1" />
                첨부파일
              </a>
            )}
          </div>
        </div>

        <div className="py-6 whitespace-pre-wrap">
          {data.notice.postContents}
        </div>
      </div>

      {/* Comments section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageSquare size={20} className="mr-2" />
            댓글 {data.notice.comments.length}개
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

        {data.notice.comments.length > 0 ? (
          <div className="space-y-4">
            {data.notice.comments.map(comment => (
              <div key={comment.commentID} className="card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{comment.commentUserName}</div>
                  <div className="text-sm text-secondary-600">
                    {format(new Date(comment.commentDate), 'yyyy년 MM월 dd일 HH:mm')}
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

export default NoticeDetail; 