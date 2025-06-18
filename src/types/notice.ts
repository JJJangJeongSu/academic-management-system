export interface NoticeComment {
  commentID: number;
  commentName: string;
  commentUserName: string;
  commentDate: string;
  commentContents: string;
  commentFile: string | null;
  commentUserID: number;
}

export interface NoticeDetail {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string[];
    ClassLocation: string[];
    writeEnable: number;
  };
  notice: {
    postID: number;
    postName: string;
    postUserID: number;
    postUserName: string;
    postDate: string;
    postContents: string;
    postFile: string | null;
    comments: NoticeComment[];
  };
} 