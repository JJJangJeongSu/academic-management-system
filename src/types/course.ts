export interface CourseNotice {
  postID: number;
  postUserName: string;
  postName: string;
  postDate: string;
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