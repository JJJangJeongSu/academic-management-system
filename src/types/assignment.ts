export interface Assignment {
  postID: number;
  postName: string;
  postDate: string;
  submit: 0 | 1;
}

export interface Subject {
  ClassID: number;
  ClassName: string;
  ClassProf: string;
  Assignment: Assignment[];
} 