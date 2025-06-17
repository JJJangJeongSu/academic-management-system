import { CourseDetail } from '../types/course';
import { CoursesApiResponse } from '../types/subject';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCourseDetail = async (classId: string): Promise<CourseDetail> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/classNotice?classID=${classId}`, {
      method: 'GET',
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error('강의 정보를 불러오는데 실패했습니다.');
    }

    const data: CourseDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getCourseList = async (): Promise<CoursesApiResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/cource`, {
      method: 'GET',
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error('강의 목록을 불러오는데 실패했습니다.');
    }

    const data: CoursesApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getTimetable = async (): Promise<CoursesApiResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/timetable`, {
      method: 'GET',
      headers: {
        'authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
      throw new Error('시간표를 불러오는데 실패했습니다.');
    }

    const data: CoursesApiResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
}; 