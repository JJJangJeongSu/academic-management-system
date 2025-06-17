export interface GradeSubject {
  id: number;
  uid: number;
  SubjID: number;
  SubjName: string;
  Score: number;
  Grade: string;
  Unit: number;
}

export interface GradesResponse {
  subject: GradeSubject[];
} 