export interface Assignment {
  postID: number;
  postName: string;
  postDate: string;
  submit: number;
}

export interface SubjectWithAssignments {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  Assignment: Assignment[];
}

export interface AssignmentsResponse {
  subjects: SubjectWithAssignments[];
} 