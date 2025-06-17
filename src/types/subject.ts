export interface Subject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  ClassTime: string[];
  ClassLocation: string[];
}

export interface CoursesApiResponse {
  subject: {
    count: number;
    subjects: Subject[];
  };
} 