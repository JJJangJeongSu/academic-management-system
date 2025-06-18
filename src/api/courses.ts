import { API_BASE_URL } from '../config';

export interface Course {
  ClassID: string;
  ClassName: string;
  ClassProf: string;
  ClassTime: string[];
  ClassLocation: string[];
}

export interface CoursesResponse {
  subjects: Course[];
}

export interface CreateCourseRequest {
  SubjName: string;
  SubjTime: string;
  SubjLocation: string;
  ProfName: string;
}

export const getAllCourses = async (): Promise<CoursesResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/class`, {
      method: 'GET',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch courses');
    }

    const data = await response.json();
    console.log('Raw API response:', data);
    return data;
  } catch (error) {
    console.error('Error in getAllCourses:', error);
    throw error;
  }
};

export const createCourse = async (courseData: CreateCourseRequest): Promise<void> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${API_BASE_URL}/addSubject`, {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create course');
    }
  } catch (error) {
    console.error('Error in createCourse:', error);
    throw error;
  }
}; 