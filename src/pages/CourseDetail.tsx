import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Download, Trash2, X } from 'lucide-react';
import NoticeItem from '../components/NoticeItem';
import CreateNoticeForm from '../components/CreateNoticeForm';
import CreateCourseMaterialForm from '../components/CreateCourseMaterialForm';
import { getCourseDetail, getCourseAssignments, getCourseMaterials, deleteCourseMaterial, deleteAssignment, createAssignment } from '../api/course';
import type { CourseDetail, CourseMaterials } from '../types/course';
import type { CourseAssignments } from '../types/assignment';
import { format } from 'date-fns';

type TabType = 'notices' | 'materials' | 'assignments';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabType>(
    (tabParam as TabType) || 'notices'
  );
  const [courseData, setCourseData] = useState<CourseDetail | null>(null);
  const [assignmentsData, setAssignmentsData] = useState<CourseAssignments | null>(null);
  const [materialsData, setMaterialsData] = useState<CourseMaterials | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showCreateNoticeForm, setShowCreateNoticeForm] = useState(false);
  const [showCreateMaterialForm, setShowCreateMaterialForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [materialToDelete, setMaterialToDelete] = useState<number | null>(null);
  const [showCreateAssignmentForm, setShowCreateAssignmentForm] = useState(false);
  const [showDeleteAssignmentConfirm, setShowDeleteAssignmentConfirm] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<number | null>(null);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentContent, setAssignmentContent] = useState('');
  const [assignmentFile, setAssignmentFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const fetchCourseData = useCallback(async () => {
    if (!courseId) return;
    
    setLoading(true);
    try {
      const data = await getCourseDetail(courseId);
      setCourseData(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : '강의 정보를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  const fetchMaterials = useCallback(async () => {
    if (!courseId || activeTab !== 'materials') return;
    
    try {
      const data = await getCourseMaterials(courseId);
      setMaterialsData(data);
    } catch (err) {
      console.error('Error fetching materials:', err);
    }
  }, [courseId, activeTab]);

  const fetchAssignments = useCallback(async () => {
    if (!courseId || activeTab !== 'assignments') return;
    
    try {
      const data = await getCourseAssignments(courseId);
      setAssignmentsData(data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  }, [courseId, activeTab]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  useEffect(() => {
    fetchAssignments();
  }, [fetchAssignments]);

  // Update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  const handleDeleteMaterial = async (postId: number) => {
    setMaterialToDelete(postId);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    if (!materialToDelete) return;

    try {
      await deleteCourseMaterial(materialToDelete);
      fetchMaterials();
      setShowDeleteConfirm(false);
      setMaterialToDelete(null);
    } catch (err) {
      console.error('Error deleting material:', err);
      alert(err instanceof Error ? err.message : '강의자료 삭제에 실패했습니다.');
    }
  };

  const handleDeleteAssignment = async (postId: number) => {
    setAssignmentToDelete(postId);
    setShowDeleteAssignmentConfirm(true);
  };

  const confirmDeleteAssignment = async () => {
    if (!assignmentToDelete) return;

    try {
      await deleteAssignment(assignmentToDelete);
      fetchAssignments();
      setShowDeleteAssignmentConfirm(false);
      setAssignmentToDelete(null);
    } catch (err) {
      console.error('Error deleting assignment:', err);
      alert(err instanceof Error ? err.message : '과제 삭제에 실패했습니다.');
    }
  };

  const handleSubmitAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    setSubmitting(true);
    try {
      await createAssignment(
        courseId,
        assignmentTitle,
        assignmentContent,
        new Date().toISOString(),
        assignmentFile || undefined
      );
      setShowCreateAssignmentForm(false);
      setAssignmentTitle('');
      setAssignmentContent('');
      setAssignmentFile(null);
      fetchAssignments();
    } catch (err) {
      console.error('Error creating assignment:', err);
      alert(err instanceof Error ? err.message : '과제 등록에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!courseData) return <div>강의 정보가 없습니다.</div>;

  const isProfessor = localStorage.getItem('userRole') === '2';
  const canWrite = courseData.subject.writeEnable === 1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Course header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold">{courseData.subject.ClassName}</h1>
            <div className="text-secondary-600 mt-2">
              <div>교수: {courseData.subject.ClassProf}</div>
              <div>강의시간: {Array.isArray(courseData.subject.ClassTime) 
                ? courseData.subject.ClassTime.join(', ')
                : courseData.subject.ClassTime}
              </div>
              <div>강의실: {Array.isArray(courseData.subject.ClassLocation)
                ? courseData.subject.ClassLocation.join(', ')
                : courseData.subject.ClassLocation}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tab navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('notices')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'notices'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            공지사항
          </button>
          
          <button
            onClick={() => setActiveTab('materials')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'materials'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            강의자료
          </button>
          
          <button
            onClick={() => setActiveTab('assignments')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'assignments'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            과제
          </button>
        </nav>
      </div>
      
      {/* Tab content */}
      <div className="py-4">
        {/* Notices tab */}
        {activeTab === 'notices' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">공지사항</h2>
              
              {(isProfessor || canWrite) && (
                <button 
                  onClick={() => setShowCreateNoticeForm(true)}
                  className="btn btn-primary btn-sm flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  공지 작성
                </button>
              )}
            </div>

            {showCreateNoticeForm && (
              <CreateNoticeForm
                courseId={courseId || ''}
                onSuccess={() => {
                  setShowCreateNoticeForm(false);
                  fetchCourseData();
                }}
                onCancel={() => setShowCreateNoticeForm(false)}
              />
            )}
            
            {courseData.notice.length > 0 ? (
              <div className="space-y-4">
                {courseData.notice.map(notice => (
                  <NoticeItem
                    key={notice.postID}
                    notice={{
                      id: notice.postID.toString(),
                      title: notice.postName,
                      writer: notice.postUserName,
                      date: notice.postDate,
                      content: '',
                      courseId: courseId || '',
                    }}
                    onDelete={fetchCourseData}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">등록된 공지사항이 없습니다.</p>
              </div>
            )}
          </div>
        )}

        {/* Assignments tab */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">과제</h2>
              
              {isProfessor && (
                <button 
                  onClick={() => setShowCreateAssignmentForm(true)}
                  className="btn btn-primary btn-sm flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  과제 등록
                </button>
              )}
            </div>

            {showCreateAssignmentForm && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between border-b pb-4 mb-4">
                  <h3 className="text-lg font-semibold text-secondary-900">과제 등록</h3>
                  <button
                    onClick={() => {
                      setShowCreateAssignmentForm(false);
                      setAssignmentTitle('');
                      setAssignmentContent('');
                      setAssignmentFile(null);
                    }}
                    className="text-secondary-500 hover:text-secondary-700"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitAssignment} className="space-y-4">
                  <div>
                    <label htmlFor="assignmentTitle" className="block text-sm font-medium text-secondary-700 mb-1">
                      과제 제목
                    </label>
                    <input
                      type="text"
                      id="assignmentTitle"
                      value={assignmentTitle}
                      onChange={(e) => setAssignmentTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="과제 제목을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="assignmentContent" className="block text-sm font-medium text-secondary-700 mb-1">
                      과제 내용
                    </label>
                    <textarea
                      id="assignmentContent"
                      value={assignmentContent}
                      onChange={(e) => setAssignmentContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 min-h-[120px] resize-y"
                      placeholder="과제 내용을 입력하세요"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="assignmentFile" className="block text-sm font-medium text-secondary-700 mb-1">
                      첨부파일
                    </label>
                    <input
                      type="file"
                      id="assignmentFile"
                      onChange={(e) => setAssignmentFile(e.target.files?.[0] || null)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateAssignmentForm(false);
                        setAssignmentTitle('');
                        setAssignmentContent('');
                        setAssignmentFile(null);
                      }}
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
                          등록 중...
                        </span>
                      ) : (
                        '과제 등록'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {assignmentsData && assignmentsData.assignment && assignmentsData.assignment.length > 0 ? (
              <div className="space-y-4">
                {assignmentsData.assignment.map(assignment => (
                  <div 
                    key={assignment.postID} 
                    className="card p-6 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/courses/${courseId}/assignments/${assignment.postID}`)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">{assignment.postName}</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-secondary-600">
                          작성자: {assignment.postUserName}
                        </div>
                        {isProfessor && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteAssignment(assignment.postID);
                            }}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                            title="과제 삭제"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-end">
                      {assignment.postFile && (
                        <a
                          href={`${import.meta.env.VITE_API_BASE_URL}/download/${assignment.postFile}`}
                          className="btn btn-secondary btn-sm flex items-center"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download size={16} className="mr-1.5" />
                          과제 다운로드
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">등록된 과제가 없습니다.</p>
              </div>
            )}
          </div>
        )}
        
        {/* Materials tab */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">강의 자료</h2>
              
              {(isProfessor || canWrite) && (
                <button 
                  onClick={() => setShowCreateMaterialForm(true)}
                  className="btn btn-primary btn-sm flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  강의자료 작성
                </button>
              )}
            </div>

            {showCreateMaterialForm && (
              <CreateCourseMaterialForm
                courseId={courseId || ''}
                onSuccess={() => {
                  setShowCreateMaterialForm(false);
                  fetchMaterials();
                }}
                onCancel={() => setShowCreateMaterialForm(false)}
              />
            )}

            {materialsData && materialsData.course && materialsData.course.length > 0 ? (
              <div className="space-y-4">
                {materialsData.course.map(material => (
                  <div 
                    key={material.postID} 
                    className="card p-4 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => navigate(`/courses/${courseId}/materials/${material.postID}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-secondary-800">{material.postName}</h3>
                        <div className="text-sm text-secondary-600 mt-1">
                          {material.postUserName} • {format(new Date(material.postDate), 'yyyy년 MM월 dd일 HH:mm')}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {material.postFile && (
                          <a
                            href={`${import.meta.env.VITE_API_BASE_URL}/download/${material.postFile}`}
                            className="flex items-center text-primary-600 hover:text-primary-700"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download size={16} className="mr-1" />
                            첨부파일
                          </a>
                        )}
                        {isProfessor && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteMaterial(material.postID);
                            }}
                            className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                            title="강의자료 삭제"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="text-secondary-600 text-sm line-clamp-2">
                      {material.postContents}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">등록된 강의자료가 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">강의자료 삭제</h3>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMaterialToDelete(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              정말로 이 강의자료를 삭제하시겠습니까?
              <br />
              삭제된 강의자료는 복구할 수 없습니다.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setMaterialToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Delete Confirmation Modal */}
      {showDeleteAssignmentConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">과제 삭제</h3>
              <button
                onClick={() => {
                  setShowDeleteAssignmentConfirm(false);
                  setAssignmentToDelete(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              정말로 이 과제를 삭제하시겠습니까?
              <br />
              삭제된 과제는 복구할 수 없습니다.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteAssignmentConfirm(false);
                  setAssignmentToDelete(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                취소
              </button>
              <button
                onClick={confirmDeleteAssignment}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;