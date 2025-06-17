import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Plus, Calendar, Download, User } from 'lucide-react';
import NoticeItem from '../components/NoticeItem';
import { useAuth } from '../contexts/AuthContext';
import { getCourseDetail, getCourseAssignments, getCourseMaterials } from '../api/course';
import type { CourseDetail, CourseMaterial, CourseMaterials } from '../types/course';
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
  const { user } = useAuth();
  const [courseData, setCourseData] = useState<CourseDetail | null>(null);
  const [assignmentsData, setAssignmentsData] = useState<CourseAssignments | null>(null);
  const [materialsData, setMaterialsData] = useState<CourseMaterials | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      
      try {
        const data = await getCourseDetail(courseId);
        setCourseData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : '강의 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!courseId || activeTab !== 'assignments') return;
      
      try {
        const data = await getCourseAssignments(courseId);
        setAssignmentsData(data);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      }
    };

    fetchAssignments();
  }, [courseId, activeTab]);

  useEffect(() => {
    const fetchMaterials = async () => {
      if (!courseId || activeTab !== 'materials') return;
      
      try {
        const data = await getCourseMaterials(courseId);
        setMaterialsData(data);
      } catch (err) {
        console.error('Error fetching materials:', err);
      }
    };

    fetchMaterials();
  }, [courseId, activeTab]);

  // Update URL when tab changes
  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  if (loading) return <div>로딩중...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!courseData) return <div>강의 정보가 없습니다.</div>;

  const isProfessor = user?.role === 'professor';
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
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  공지 작성
                </button>
              )}
            </div>
            
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
              
              {(isProfessor || canWrite) && (
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  과제 등록
                </button>
              )}
            </div>
            
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
                      <div className="text-sm text-secondary-600">
                        작성자: {assignment.postUserName}
                      </div>
                    </div>
                    <div className="flex items-center text-secondary-500 text-sm mb-4">
                      <Calendar size={16} className="mr-1.5" />
                      <span>마감: {format(new Date(assignment.postDate), 'yyyy년 MM월 dd일 HH:mm')}</span>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        className="btn btn-secondary btn-sm flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Implement download functionality
                        }}
                      >
                        <Download size={16} className="mr-1.5" />
                        과제 다운로드
                      </button>
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
                <button className="btn btn-primary btn-sm flex items-center">
                  <Plus size={16} className="mr-1" />
                  자료 등록
                </button>
              )}
            </div>
            
            {materialsData && materialsData.course && materialsData.course.length > 0 ? (
              <div className="grid gap-4">
                {materialsData.course.map((material: CourseMaterial) => (
                  <div
                    key={material.postID}
                    onClick={() => navigate(`/courses/${courseId}/materials/${material.postID}`)}
                    className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{material.postName}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-secondary-600">
                          <div className="flex items-center">
                            <User size={14} className="mr-1" />
                            <span>{material.postUserName}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            <span>{format(new Date(material.postDate), 'yyyy년 MM월 dd일')}</span>
                          </div>
                        </div>
                      </div>
                      {material.postFile && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Implement file download
                          }}
                          className="btn btn-ghost btn-sm"
                        >
                          <Download size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-secondary-600">등록된 강의 자료가 없습니다.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;