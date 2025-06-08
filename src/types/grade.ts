export interface GradeSubject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  ClassSemester: number;
  ClassGrade: string;
  ClassCredit: number;
  ClassScore: number;
}

export interface GradesApiResponse {
  GPA: number;
  subject: {
    count: number;
    subjects: GradeSubject[];
  };
} 