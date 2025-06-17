import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Mail, Plus } from 'lucide-react';
import NoticeItem from '../components/NoticeItem';
import { useAuth } from '../contexts/AuthContext';
import { getCourseDetail } from '../api/course';
import type { CourseDetail } from '../types/course';

type TabType = 'notices' | 'materials' | 'assignments' | 'q-and-a';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<TabType>(
    (tabParam as TabType) || 'notices'
  );
  const { user } = useAuth();
  const [courseData, setCourseData] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      
      try {
        const data = await getCourseDetail(courseId);
        console.log(data);
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
          
          <button className="btn btn-primary mt-4 md:mt-0 flex items-center self-start">
            <Mail size={18} className="mr-1.5" />
            교수님께 메일
          </button>
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
          
          <button
            onClick={() => setActiveTab('q-and-a')}
            className={`py-4 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'q-and-a'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-secondary-500 hover:text-secondary-700 hover:border-secondary-300'
            }`}
          >
            Q&A
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
        
        {/* Other tabs - to be implemented with their respective APIs */}
        {activeTab !== 'notices' && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <p className="text-secondary-600">준비 중인 기능입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetail;