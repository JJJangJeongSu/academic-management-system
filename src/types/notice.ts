// KLAS API 명세 기반 공지사항 타입 정의

// 공지사항 단일 항목
export interface Notice {
  postID: number;
  postUserName: string;
  postName: string;
  postDate: string;
}

// 강의 공지 게시판 subject 정보 (writeEnable 포함)
export interface NoticeSubject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  ClassTime: string[];
  ClassLocation: string[];
  writeEnable: number;
}

// 강의 공지 게시판 전체 응답
export interface CourseNoticeBoardResponse {
  subject: NoticeSubject;
  notice: Notice[];
}

// 공지사항 상세 댓글 타입
export interface NoticeComment {
  commentID: number;
  commentName: string;
  commentUserID: number;
  commentUserName: string;
  commentDate: string;
  commentContents: string;
  commentFile: string | null;
}

// 공지사항 상세 타입
export interface NoticeDetail {
  postID: number;
  postName: string;
  postUserID: number;
  postUserName: string;
  postDate: string;
  postContents: string;
  postFile: string;
  comments: NoticeComment[];
}

// 공지사항 상세 응답 타입
export interface CourseNoticeDetailResponse {
  subject: NoticeSubject;
  notice: NoticeDetail;
} 