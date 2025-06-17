export interface Assignment {
  postID: number;
  postName: string;
  postUserID: string;
  postUserName: string;
  postDate: string;
  postContents: string;
  postFile?: string;
  comments: AssignmentComment[];
}

export interface AssignmentComment {
  commentID: number;
  commentName: string;
  commentUserID: string;
  commentUserName: string;
  commentDate: string;
  commentContents: string;
  commentFile?: string;
}

export interface AssignmentDetail {
  subject: {
    ClassID: number;
    ClassName: string;
    ClassProf: string;
    ClassTime: string;
    ClassRoom: string;
  };
  assignment: Assignment;
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