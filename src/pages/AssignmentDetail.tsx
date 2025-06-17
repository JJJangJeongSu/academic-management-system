import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Upload, Plus, X } from 'lucide-react';
import { getAssignmentDetail, submitAssignment } from '../api/course';
import type { AssignmentDetail } from '../types/assignment';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

const AssignmentDetail: React.FC = () => {
  const { courseId, assignmentId } = useParams<{ courseId: string; assignmentId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState<AssignmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [submitName, setSubmitName] = useState('');
  const [submitString, setSubmitString] = useState('');
  const [submitFile, setSubmitFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAssignmentDetail = async () => {
      if (!courseId || !assignmentId) {
        setError('잘못된 접근입니다.');
        setLoading(false);
        return;
      }

      try {
        const response = await getAssignmentDetail(courseId, assignmentId);
        setData(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '과제 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetail();
  }, [courseId, assignmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId || !assignmentId) return;

    setSubmitting(true);
    try {
      await submitAssignment(courseId, assignmentId, submitName, submitString, submitFile || undefined);
      // Refresh assignment detail to show new submission
      const response = await getAssignmentDetail(courseId, assignmentId);
      setData(response);
      // Reset form
      setSubmitName('');
      setSubmitString('');
      setSubmitFile(null);
      setShowSubmitForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : '과제 제출에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-secondary-600">로딩중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="text-red-500">{error}</div>
        <button
          onClick={() => navigate(`/courses/${courseId}?tab=assignments`)}
          className="btn btn-secondary"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  if (!data || !data.assignment) {
    return (
      <div className="space-y-4">
        <div className="text-secondary-600">과제를 찾을 수 없습니다.</div>
        <button
          onClick={() => navigate(`/courses/${courseId}?tab=assignments`)}
          className="btn btn-secondary"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  const isProfessor = user?.role === 'professor';
  const isMyAssignment = data.assignment.postUserID === user?.id;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Back button and course info */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(`/courses/${courseId}?tab=assignments`)}
          className="flex items-center text-secondary-600 hover:text-secondary-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          목록으로 돌아가기
        </button>
        <div className="text-sm text-secondary-600">
          {data.subject.ClassName} | {data.subject.ClassProf}
        </div>
      </div>

      {/* Assignment content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl font-bold mb-2">{data.assignment.postName}</h1>
          <div className="flex items-center justify-between text-sm text-secondary-600">
            <div>
              작성자: {data.assignment.postUserName} | 
              작성일: {format(new Date(data.assignment.postDate), 'yyyy년 MM월 dd일 HH:mm')}
            </div>
            {data.assignment.postFile && (
              <a
                href={`${import.meta.env.VITE_API_BASE_URL}/download/${data.assignment.postFile}`}
                className="flex items-center text-primary-600 hover:text-primary-700"
              >
                <Download size={16} className="mr-1" />
                과제 파일
              </a>
            )}
          </div>
        </div>

        <div className="py-6 whitespace-pre-wrap">
          {data.assignment.postContents}
        </div>
      </div>

      {/* Submissions section */}
      {!isMyAssignment && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold flex items-center">
              <Upload size={20} className="mr-2" />
              과제 제출
            </h2>
            <button
              onClick={() => setShowSubmitForm(!showSubmitForm)}
              className="btn btn-primary flex items-center"
            >
              {showSubmitForm ? (
                <>
                  <X size={16} className="mr-1" />
                  취소
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-1" />
                  과제 제출
                </>
              )}
            </button>
          </div>

          {showSubmitForm && (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-lg font-semibold text-secondary-900">과제 제출</h3>
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="text-secondary-500 hover:text-secondary-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div>
                <label htmlFor="submitName" className="block text-sm font-medium text-secondary-700 mb-1">
                  제목
                </label>
                <input
                  type="text"
                  id="submitName"
                  value={submitName}
                  onChange={(e) => setSubmitName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="제출 제목을 입력하세요"
                  required
                />
              </div>

              <div>
                <label htmlFor="submitString" className="block text-sm font-medium text-secondary-700 mb-1">
                  내용
                </label>
                <textarea
                  id="submitString"
                  value={submitString}
                  onChange={(e) => setSubmitString(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px] resize-y"
                  placeholder="제출 내용을 입력하세요"
                  required
                />
              </div>

              <div>
                <label htmlFor="submitFile" className="block text-sm font-medium text-secondary-700 mb-1">
                  첨부파일
                </label>
                <div className="mt-1 flex items-center">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
                    <span className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm">
                      <Download size={16} className="mr-2" />
                      파일 선택
                    </span>
                    <input
                      type="file"
                      id="submitFile"
                      onChange={(e) => setSubmitFile(e.target.files?.[0] || null)}
                      className="sr-only"
                    />
                  </label>
                  {submitFile && (
                    <span className="ml-3 text-sm text-secondary-600">
                      {submitFile.name}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowSubmitForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-secondary-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      제출 중...
                    </span>
                  ) : (
                    '과제 제출'
                  )}
                </button>
              </div>
            </form>
          )}

          {data.assignment.comments.length > 0 ? (
            <div className="space-y-4">
              {data.assignment.comments.map(comment => (
                <div key={comment.commentID} className="card p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{comment.commentUserName}</div>
                    <div className="text-sm text-secondary-600">
                      {format(new Date(comment.commentDate), 'yyyy년 MM월 dd일 HH:mm')}
                    </div>
                  </div>
                  <div className="text-secondary-800 mb-2">{comment.commentContents}</div>
                  {comment.commentFile && (
                    <a
                      href={`${import.meta.env.VITE_API_BASE_URL}/download/${comment.commentFile}`}
                      className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                    >
                      <Download size={14} className="mr-1" />
                      첨부파일
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-secondary-600">
              아직 제출된 과제가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentDetail; 