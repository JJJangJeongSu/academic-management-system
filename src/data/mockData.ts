// Mock data for the academic management system

import { format, addDays } from 'date-fns';

// Types
export interface Course {
  id: string;
  code: string;
  title: string;
  professor: string;
  schedule: string;
  room: string;
  description?: string;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  submittedDate?: string;
  grade?: number;
}

export interface Notice {
  id: string;
  courseId: string;
  title: string;
  content: string;
  date: string;
  postedAgo: string;
}

export interface Material {
  id: string;
  courseId: string;
  title: string;
  type: 'pdf' | 'ppt' | 'zip' | 'doc';
  size: string;
}

export interface TimeSlot {
  day: string;
  time: string;
  course?: {
    title: string;
    room: string;
  };
}

export interface Activity {
  id: string;
  type: 'assignment' | 'material' | 'notice';
  courseId: string;
  courseName: string;
  description: string;
  date: string;
  timeAgo: string;
}

// Mock courses
export const courses: Course[] = [
  {
    id: 'cs101',
    code: 'CS101',
    title: 'Introduction to Programming',
    professor: 'Dr. John Smith',
    schedule: 'Mon, Wed 9:00 AM - 10:30 AM',
    room: '301',
    description: 'An introductory course to programming concepts and practices using Python.',
  },
  {
    id: 'cs201',
    code: 'CS201',
    title: 'Data Structures',
    professor: 'Dr. Emily Chen',
    schedule: 'Mon, Wed 9:00 AM - 10:30 AM',
    room: '301',
    description: 'A comprehensive study of common data structures and their implementations.',
  },
  {
    id: 'cs301',
    code: 'CS301',
    title: 'Database Systems',
    professor: 'Dr. Michael Brown',
    schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
    room: '405',
    description: 'Introduction to database design, implementation, and management.',
  },
  {
    id: 'cs401',
    code: 'CS401',
    title: 'Machine Learning',
    professor: 'Dr. Sarah Johnson',
    schedule: 'Tue, Thu 10:30 AM - 12:00 PM',
    room: '405',
    description: 'Fundamentals of machine learning algorithms and applications.',
  },
  {
    id: 'se101',
    code: '1020-4-0846-01',
    title: 'Software Engineering',
    professor: 'Prof. Lee Gijun',
    schedule: 'Mon 5:00 PM, Wed 6:00 PM',
    room: '203',
    description: 'Software development methodologies, project management, and team collaboration.',
  },
  {
    id: 'cs501',
    code: 'CS501',
    title: 'Artificial Intelligence',
    professor: 'Dr. Alex Turner',
    schedule: 'Fri 1:00 PM - 4:00 PM',
    room: '302',
    description: 'Overview of artificial intelligence concepts, techniques, and applications.',
  },
];

// Mock assignments
export const assignments: Assignment[] = [
  {
    id: 'a1',
    courseId: 'cs101',
    title: 'Basic Algorithms',
    dueDate: 'March 15, 2025',
    status: 'pending',
  },
  {
    id: 'a2',
    courseId: 'cs101',
    title: 'Data Structures',
    dueDate: 'March 20, 2025',
    status: 'submitted',
    submittedDate: 'March 18, 2025',
  },
  {
    id: 'a3',
    courseId: 'cs401',
    title: 'Neural Networks Implementation',
    dueDate: 'March 25, 2025',
    status: 'pending',
  },
  {
    id: 'a4',
    courseId: 'se101',
    title: 'Software Requirements Specification',
    dueDate: 'April 2, 2025',
    status: 'pending',
  },
];

// Mock notices
export const notices: Notice[] = [
  {
    id: 'n1',
    courseId: 'cs101',
    title: 'Class Cancelled - March 22',
    content: 'Class will be cancelled due to faculty meeting. Make-up class scheduled for March 25.',
    date: 'March 19, 2025',
    postedAgo: '2 days ago',
  },
  {
    id: 'n2',
    courseId: 'cs101',
    title: 'Mid-term Exam Schedule',
    content: 'Mid-term examination will be held on April 5, 2025. Please review chapters 1-5.',
    date: 'March 16, 2025',
    postedAgo: '1 week ago',
  },
  {
    id: 'n3',
    courseId: 'cs401',
    title: 'Guest Lecture Announcement',
    content: 'We will have a guest lecture by Dr. Alan Turing on March 30. Attendance is mandatory.',
    date: 'March 20, 2025',
    postedAgo: '3 days ago',
  },
];

// Mock materials
export const materials: Material[] = [
  {
    id: 'm1',
    courseId: 'cs101',
    title: 'Course Syllabus',
    type: 'pdf',
    size: '2.5MB',
  },
  {
    id: 'm2',
    courseId: 'cs101',
    title: 'Week 1 Slides',
    type: 'ppt',
    size: '5MB',
  },
  {
    id: 'm3',
    courseId: 'cs101',
    title: 'Code Examples',
    type: 'zip',
    size: '1MB',
  },
  {
    id: 'm4',
    courseId: 'cs401',
    title: 'Datasets for Project',
    type: 'zip',
    size: '15MB',
  },
];

// Mock timetable
export const generateTimetable = (): TimeSlot[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const times = ['09:00-10:30', '10:30-12:00', '13:00-14:30', '14:30-16:00', '16:00-17:30'];
  
  const timetable: TimeSlot[] = [];
  
  // Generate empty timetable
  days.forEach(day => {
    times.forEach(time => {
      timetable.push({ day, time });
    });
  });
  
  // Add courses to the timetable
  // Monday, Wednesday 9:00-10:30: Data Structures
  timetable.find(slot => slot.day === 'Monday' && slot.time === '09:00-10:30')!.course = {
    title: 'Data Structures',
    room: '301',
  };
  timetable.find(slot => slot.day === 'Wednesday' && slot.time === '09:00-10:30')!.course = {
    title: 'Data Structures',
    room: '301',
  };
  
  // Tuesday, Thursday 10:30-12:00: Machine Learning
  timetable.find(slot => slot.day === 'Tuesday' && slot.time === '10:30-12:00')!.course = {
    title: 'Machine Learning',
    room: '405',
  };
  timetable.find(slot => slot.day === 'Thursday' && slot.time === '10:30-12:00')!.course = {
    title: 'Machine Learning',
    room: '405',
  };
  
  // Wednesday, Thursday 13:00-14:30: Software Engineering
  timetable.find(slot => slot.day === 'Wednesday' && slot.time === '13:00-14:30')!.course = {
    title: 'Software Engineering',
    room: '203',
  };
  timetable.find(slot => slot.day === 'Thursday' && slot.time === '13:00-14:30')!.course = {
    title: 'Software Engineering',
    room: '203',
  };
  
  return timetable;
};

// Mock activities
export const activities: Activity[] = [
  {
    id: 'act1',
    type: 'assignment',
    courseId: 'cs101',
    courseName: 'CS101',
    description: 'Assignment #2 graded',
    date: format(new Date(), 'yyyy-MM-dd'),
    timeAgo: '2h ago',
  },
  {
    id: 'act2',
    type: 'material',
    courseId: 'cs401',
    courseName: 'Machine Learning',
    description: 'New material uploaded',
    date: format(new Date(), 'yyyy-MM-dd'),
    timeAgo: '4h ago',
  },
  {
    id: 'act3',
    type: 'notice',
    courseId: 'cs101',
    courseName: 'CS101',
    description: 'New announcement posted',
    date: format(addDays(new Date(), -1), 'yyyy-MM-dd'),
    timeAgo: '1d ago',
  },
];

// Mock grades
export interface Grade {
  courseId: string;
  code: string;
  title: string;
  credits: number;
  letterGrade: string;
  numericalGrade: number;
}

export const grades: Grade[] = [
  {
    courseId: 'cs101',
    code: 'CS101',
    title: 'Introduction to Programming',
    credits: 3,
    letterGrade: 'A',
    numericalGrade: 95,
  },
  {
    courseId: 'cs201',
    code: 'CS201',
    title: 'Data Structures',
    credits: 4,
    letterGrade: 'A-',
    numericalGrade: 90,
  },
  {
    courseId: 'cs301',
    code: 'CS301',
    title: 'Database Systems',
    credits: 3,
    letterGrade: 'B+',
    numericalGrade: 87,
  },
  {
    courseId: 'math101',
    code: 'MATH101',
    title: 'Calculus I',
    credits: 4,
    letterGrade: 'B',
    numericalGrade: 83,
  },
  {
    courseId: 'eng101',
    code: 'ENG101',
    title: 'English Composition',
    credits: 3,
    letterGrade: 'A',
    numericalGrade: 94,
  },
];

// Calculate GPA
export const calculateGPA = (grades: Grade[]): number => {
  const totalPoints = grades.reduce((sum, grade) => {
    let points = 0;
    if (grade.letterGrade === 'A') points = 4.0;
    else if (grade.letterGrade === 'A-') points = 3.7;
    else if (grade.letterGrade === 'B+') points = 3.3;
    else if (grade.letterGrade === 'B') points = 3.0;
    else if (grade.letterGrade === 'B-') points = 2.7;
    else if (grade.letterGrade === 'C+') points = 2.3;
    else if (grade.letterGrade === 'C') points = 2.0;
    else if (grade.letterGrade === 'C-') points = 1.7;
    else if (grade.letterGrade === 'D+') points = 1.3;
    else if (grade.letterGrade === 'D') points = 1.0;
    else points = 0.0;
    
    return sum + (points * grade.credits);
  }, 0);
  
  const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0);
  
  return Number((totalPoints / totalCredits).toFixed(2));
};