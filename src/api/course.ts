import { CourseDetail, CourseMaterials, CourseMaterialDetailResponse } from '../types/course';
import { CoursesApiResponse } from '../types/subject';
import { AssignmentsResponse } from '../types/assignment';
import { GradesResponse } from '../types/grade';
import { NoticeDetail } from '../types/notice';
import { CourseAssignments } from '../types/assignment';
import { AssignmentDetailResponse } from '../types/assignment';
import { CourseMaterialDetail } from '../types/course';

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

export const getAssignments = async (): Promise<AssignmentsResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/assignment`, {
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
      throw new Error('과제 목록을 불러오는데 실패했습니다.');
    }

    const data: AssignmentsResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getGrades = async (): Promise<GradesResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/grade`, {
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
      throw new Error('성적 정보를 불러오는데 실패했습니다.');
    }

    const data: GradesResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getNoticeDetail = async (classId: string, postId: string): Promise<NoticeDetail> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/classNotice/notice?classID=${classId}&postID=${postId}`, {
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
      throw new Error('공지사항을 불러오는데 실패했습니다.');
    }

    const data: NoticeDetail = await response.json();
    data.notice.comments.forEach((comment) => {
      console.log("comment: ", comment);
      console.log("commentID: ", comment.commentID);
    });
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getCourseAssignments = async (classId: string): Promise<CourseAssignments> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/classAssignment?classID=${classId}`, {
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
      throw new Error('과제 목록을 불러오는데 실패했습니다.');
    }

    const data: CourseAssignments = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getAssignmentDetail = async (classId: string, postId: string): Promise<AssignmentDetailResponse> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    const response = await fetch(`${API_BASE_URL}/classAssignment/assignment?classID=${classId}&postID=${postId}`, {
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
      throw new Error('과제 정보를 불러오는데 실패했습니다.');
    }

    const data: AssignmentDetailResponse = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const getCourseMaterials = async (classId: string): Promise<CourseMaterials> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const response = await fetch(
    `${API_BASE_URL}/classCourse?classID=${classId}`,
    {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired');
    }
    throw new Error('Failed to fetch course materials');
  }

  return response.json();
};

export const getCourseMaterialDetail = async (classId: string, postId: string): Promise<CourseMaterialDetail> => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('인증되지 않은 사용자입니다.');
    }

    console.log(classId, postId);

    const response = await fetch(`${API_BASE_URL}/classCourse/course?classID=${classId}&postID=${postId}`, {
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
      throw new Error('강의자료를 불러오는데 실패했습니다.');
    }

    const data: CourseMaterialDetail = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('알 수 없는 오류가 발생했습니다.');
  }
};

export const addNoticeComment = async (
  classId: string,
  postId: string,
  commentName: string,
  commentString: string,
  appendix?: File
): Promise<{ message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }

  const formData = new FormData();
  formData.append('CommentName', commentName);
  formData.append('CommentString', commentString);
  if (appendix) {
    formData.append('Appendix', appendix);
  }

  const response = await fetch(
    `${API_BASE_URL}/classNotice/addComment?classID=${classId}&postID=${postId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired');
    }
    throw new Error('Failed to add comment');
  }

  return response.json();
};

export const addCourseMaterialComment = async (
  classId: string,
  postId: string,
  commentName: string,
  commentString: string,
  appendix?: File
): Promise<{ message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const formData = new FormData();
  formData.append('CommentName', commentName);
  formData.append('CommentString', commentString);
  if (appendix) {
    formData.append('Appendix', appendix);
  }

  const response = await fetch(
    `${API_BASE_URL}/classCourse/addComment?classID=${classId}&postID=${postId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('인증이 만료되었습니다.');
    }
    throw new Error('댓글 작성에 실패했습니다.');
  }

  return response.json();
};

export const submitAssignment = async (
  classId: string,
  postId: string,
  commentName: string,
  commentString: string,
  appendix?: File
): Promise<{ message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('인증되지 않은 사용자입니다.');
  }

  const formData = new FormData();
  formData.append('CommentName', commentName);
  formData.append('CommentString', commentString);
  if (appendix) {
    formData.append('Appendix', appendix);
  }

  const response = await fetch(
    `${API_BASE_URL}/classAssignment/addComment?classID=${classId}&postID=${postId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `${token}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('인증이 만료되었습니다.');
    }
    throw new Error('과제 제출에 실패했습니다.');
  }

  return response.json();
};

export const deleteNoticeComment = async (
  commentId: number
): Promise<{ message: string }> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Authentication required');
  }
  console.log("삭제 시도 - commentId: ", commentId);
  const formData = new FormData();
  formData.append('CommentID', commentId.toString());
  const response = await fetch(
    `${API_BASE_URL}/classNotice/deleteComment`,
    {
      method: 'POST', // 또는 GET이 아니라면 POST
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        CommentID: commentId, // 숫자 그대로 OK
      }),
    }
  );
  

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error('Authentication expired');
    }
    console.log("삭제 실패 - status: ", response.status);
    throw new Error('Failed to delete comment');
  }

  return response.json();
}; 