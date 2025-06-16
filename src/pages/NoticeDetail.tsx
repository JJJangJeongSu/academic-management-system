import React from 'react';
import { Link } from 'react-router-dom';
import { CourseNoticeDetailResponse } from '../types/notice';

// mock 데이터 (API 연동 전)
const mockNoticeDetail: CourseNoticeDetailResponse = {
  subject: {
    ClassID: 12,
    ClassName: '소프트웨어공학',
    ClassProf: '이기훈',
    ClassTime: ['월1', '수2'],
    ClassLocation: ['새빛관 203호', '새빛관 203호'],
    writeEnable: 0,
  },
  notice: {
    postID: 1,
    postName: '강의계획서',
    postUserID: 12000001,
    postUserName: '이기훈',
    postDate: '2025-02-26 12:00:32',
    postContents: '강의계획서를 PDF로 올려드립니다.<br>첨부파일을 반드시 확인해주세요',
    postFile: '소프트웨어공학_강의계획서.pdf',
    comments: [
      {
        commentID: 1,
        commentName: '수정 사항',
        commentUserID: 12000001,
        commentUserName: '이기훈',
        commentDate: '2025-02-27 12:00:32',
        commentContents: '일부 수정사항이 있어서 수정하였어요.',
        commentFile: null,
      },
    ],
  },
};

const NoticeDetailPage: React.FC = () => {
  // 실제로는 useParams로 classID, postID 받아서 fetch
  // const { classID, postID } = useParams<{ classID: string; postID: string }>();
  const { subject, notice } = mockNoticeDetail;

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      {/* 상단 강의 정보 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="text-xs text-secondary-400 mb-1">
          <Link to={`/courses/${subject.ClassID}`}>{subject.ClassName}</Link>
        </div>
        <h1 className="text-2xl font-bold text-secondary-900">{notice.postName}</h1>
        <div className="text-secondary-700 mt-2">작성자: {notice.postUserName}</div>
        <div className="text-secondary-500 text-sm mt-1">{notice.postDate}</div>
      </div>
      {/* 본문 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <div
          className="prose prose-sm max-w-none text-secondary-900"
          dangerouslySetInnerHTML={{ __html: notice.postContents }}
        />
        {notice.postFile && (
          <div className="mt-4">
            <a
              href={`#`} // 실제로는 파일 다운로드 경로
              className="text-primary-600 underline text-sm"
              download
            >
              첨부파일: {notice.postFile}
            </a>
          </div>
        )}
      </div>
      {/* 댓글 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">댓글</h2>
        {notice.comments.length > 0 ? (
          <ul className="space-y-4">
            {notice.comments.map((comment) => (
              <li key={comment.commentID} className="border-b pb-2">
                <div className="flex items-center text-sm text-secondary-700 mb-1">
                  <span className="font-bold mr-2">{comment.commentUserName}</span>
                  <span className="text-secondary-400 mr-2">{comment.commentDate}</span>
                  <span className="text-secondary-500">{comment.commentName}</span>
                </div>
                <div className="text-secondary-900 text-sm">{comment.commentContents}</div>
                {comment.commentFile && (
                  <div className="mt-1">
                    <a
                      href={`#`} // 실제로는 파일 다운로드 경로
                      className="text-primary-600 underline text-xs"
                      download
                    >
                      첨부파일: {comment.commentFile}
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-secondary-500 text-center">댓글이 없습니다.</div>
        )}
      </div>
      {/* 뒤로가기 */}
      <div className="text-center">
        <Link
          to={`/courses/${subject.ClassID}`}
          className="inline-block px-4 py-2 bg-gray-100 rounded text-secondary-600 hover:bg-gray-200"
        >
          목록으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NoticeDetailPage; 