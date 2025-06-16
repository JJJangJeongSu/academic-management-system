import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CourseNoticeBoardResponse, Notice } from '../types/notice';

// 임시 mock 데이터 (실제 API 연동 전)
const mockNoticeBoard: CourseNoticeBoardResponse = {
  subject: {
    ClassID: 10,
    ClassName: '산학협력캡스톤설계',
    ClassProf: '김태석',
    ClassTime: ['월1', '수2'],
    ClassLocation: ['새빛관 102호', '새빛관 102호'],
    writeEnable: 0,
  },
  notice: [
    {
      postID: 9,
      postUserName: '이기훈',
      postName: '중간고사 성적 안내',
      postDate: '2025-05-03 14:37:22',
    },
    {
      postID: 8,
      postUserName: '이기훈',
      postName: '중간고사 시험장 및 범위 안내',
      postDate: '2025-04-18 11:30:12',
    },
  ],
};

const TABS = [
  { key: 'notice', label: '공지사항' },
  { key: 'material', label: '강의자료' },
  { key: 'assignment', label: '과제' },
  { key: 'grade', label: '성적' },
];

const CourseDetail: React.FC = () => {
  useParams<{ classID: string }>();
  const [activeTab, setActiveTab] = useState('notice');

  // 실제로는 classID로 fetch, 지금은 mock
  const course = mockNoticeBoard.subject;
  const notices: Notice[] = mockNoticeBoard.notice;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* 상단 과목 정보 */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary-900">{course.ClassName}</h1>
        <div className="text-secondary-700 mt-2">교수: {course.ClassProf}</div>
        <div className="text-secondary-500 text-sm mt-1">
          강의실: {course.ClassLocation.join(', ')}<br />
          강의시간: {course.ClassTime.join(', ')}
        </div>
      </div>
      {/* 탭 네비게이션 */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      {/* 탭별 컨텐츠 */}
      <div>
        {activeTab === 'notice' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">공지사항</h2>
            {notices.length > 0 ? (
              <table className="min-w-full text-left border rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2">제목</th>
                    <th className="px-4 py-2">작성자</th>
                    <th className="px-4 py-2">작성일</th>
                  </tr>
                </thead>
                <tbody>
                  {notices.map((notice) => (
                    <tr key={notice.postID} className="border-b">
                      <td className="px-4 py-2 font-medium">
                        <Link to={`/courses/${course.ClassID}/notice/${notice.postID}`} className="text-primary-600 underline hover:text-primary-800">
                          {notice.postName}
                        </Link>
                      </td>
                      <td className="px-4 py-2">{notice.postUserName}</td>
                      <td className="px-4 py-2">{notice.postDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center text-secondary-500">공지사항이 없습니다.</div>
            )}
          </div>
        )}
        {activeTab === 'material' && <div>강의자료 탭 (추후 구현)</div>}
        {activeTab === 'assignment' && <div>과제 탭 (추후 구현)</div>}
        {activeTab === 'grade' && <div>성적 탭 (추후 구현)</div>}
      </div>
    </div>
  );
};

export default CourseDetail;