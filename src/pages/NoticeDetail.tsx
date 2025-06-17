import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, MessageSquare } from 'lucide-react';
import { getNoticeDetail } from '../api/course';
import type { NoticeDetail } from '../types/notice';
import { format } from 'date-fns';

const NoticeDetail: React.FC = () => {
  const { courseId, noticeId } = useParams<{ courseId: string; noticeId: string }>();
  const [data, setData] = useState<NoticeDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        <h2 className="text-lg font-semibold flex items-center">
          <MessageSquare size={20} className="mr-2" />
          댓글 {data.notice.comments.length}개
        </h2>

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