export interface Assignment {
  postID: number;
  postUserName: string;
  postName: string;
  postDate: string;
}

export interface AssignmentComment {
  commentID: number;
  commentName: string;
  commentUserName: string;
  commentDate: string;
  commentContents: string;
  commentFile: string | null;
}

export interface AssignmentDetail {
  postID: number;
  postName: string;
  postUserID: number;
  postUserName: string;
  postDate: string;
  postContents: string;
  postFile: string | null;
  comments: AssignmentComment[];
}

export interface CourseAssignments {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string[];
    ClassLocation: string[];
    writeEnable: number;
  };
  assignment: Assignment[];
}

export interface AssignmentDetailResponse {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string[];
    ClassLocation: string[];
    writeEnable: number;
  };
  assignment: AssignmentDetail;
}

export interface AssignmentsResponse {
  subjects: CourseAssignments[];
} 