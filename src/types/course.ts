export interface CourseNotice {
  postID: number;
  postUserName: string;
  postName: string;
  postDate: string;
}

export interface CourseMaterial {
  postID: number;
  postName: string;
  postContents: string;
  postDate: string;
  postUserName: string;
  postFile?: string;
}

export interface CourseMaterialComment {
  commentID: number;
  commentName: string;
  commentUserID: number;
  commentUserName: string;
  commentDate: string;
  commentContents: string;
  commentFile: string | null;
}

export interface CourseComment {
  commentID: number;
  commentName: string;
  commentUserID: number;
  commentUserName: string;
  commentDate: string;
  commentContents: string;
  commentFile: string | null;
}

export interface CourseMaterial {
  postID: number;
  postName: string;
  postUserID: number;
  postUserName: string;
  postDate: string;
  postContents: string;
  postFile: string | null;
  comments: CourseComment[];
}

export interface CourseMaterialDetail {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string[];
    ClassLocation: string[];
    writeEnable: number;
  };
  course: CourseMaterial;
}

export interface CourseDetail {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string[];
    ClassLocation: string[];
    writeEnable: number;
  };
  notice: CourseNotice[];
}

export interface CourseMaterials {
  course: CourseMaterial[];
}

export interface CourseMaterialDetailResponse {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string[];
    ClassLocation: string[];
    writeEnable: number;
  };
  course: CourseMaterialDetail;
} 