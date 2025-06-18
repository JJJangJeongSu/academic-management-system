import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from './layouts/AuthLayout';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Assignments from './pages/Assignments';
import Grades from './pages/Grades';
import Timetable from './pages/Timetable';
import ManageStudents from './pages/ManageStudents';
import ManageCourses from './pages/ManageCourses';
import AccountManagement from './pages/AccountManagement';
import NotFound from './pages/NotFound';
import NoticeDetail from './pages/NoticeDetail';
import CourseMaterialDetail from './pages/CourseMaterialDetail';
import AssignmentDetail from './pages/AssignmentDetail';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Main authenticated routes */}
        <Route element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:courseId/notices/:noticeId" element={<NoticeDetail />} />
          <Route path="/courses/:courseId/materials/:materialId" element={<CourseMaterialDetail />} />
          <Route path="/courses/:courseId/assignments/:assignmentId" element={<AssignmentDetail />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/manage-students" element={<ManageStudents />} />
          <Route path="/manage-courses" element={<ManageCourses />} />
          <Route path="/account-management" element={<AccountManagement />} />
        </Route>

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;