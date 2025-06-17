export interface Subject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  ClassTime: string[];
  ClassLocation: string[];
}

export interface Activity {
  ClassID: number;
  ClassName: string;
  type: '과제' | '공지사항';
  postID: number;
  postName: string;
  postDate: string;
}

export interface DashboardData {
  subject: {
    count: number;
    subjects: Subject[];
  };
  GPA: number;
  assignment: number;
  activity: Activity[];
} 