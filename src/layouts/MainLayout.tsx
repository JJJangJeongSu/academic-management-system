import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Book, 
  ClipboardList, 
  BarChart2, 
  Calendar, 
  Menu, 
  X, 
  Users,
  LogOut,
  BookOpen,
  UserCog
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const MainLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path === '/courses') return 'My Courses';
    if (path === '/assignments') return 'Assignments';
    if (path === '/grades') return 'Grades';
    if (path === '/timetable') return 'Timetable';
    if (path === '/manage-students') return 'Manage Students';
    if (path === '/course-management') return 'Course Management';
    if (path === '/account-management') return 'Account Management';
    if (path.includes('/courses/')) {
      if (path.includes('/notices/')) return 'Notice';
      if (path.includes('/materials/')) return 'Course Material';
      if (path.includes('/assignments/')) return 'Assignment';
      return 'Course Details';
    }
    return '';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isProfessor = user?.role === 'professor';
  const isAdmin = user?.uid === 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 z-10">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <button 
              className="lg:hidden mr-2 p-2 rounded-md text-secondary-500 hover:bg-gray-100"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <Menu size={20} />
            </button>
            
            <NavLink to="/dashboard" className="flex items-center gap-2 font-semibold text-primary-700">
              <GraduationCap size={24} />
              <span className="text-lg">AcademicMS</span>
            </NavLink>
          </div>
          
          {/* Page title - visible on larger screens */}
          <div className="hidden md:block">
            <h1 className="text-lg font-medium text-secondary-700">{getPageTitle()}</h1>
          </div>
          
          {/* Logout button */}
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="p-2 rounded-full text-secondary-500 hover:bg-gray-100"
              aria-label="Logout"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1">
        {/* Sidebar for larger screens */}
        <aside 
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-md border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:w-64 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Mobile header with close button */}
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
            <div className="flex items-center gap-2 font-semibold text-primary-700">
              <GraduationCap size={24} />
              <span>AcademicMS</span>
            </div>
            <button 
              className="p-2 rounded-md text-secondary-500 hover:bg-gray-100"
              onClick={closeSidebar}
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation links */}
          <nav className="p-4 space-y-2">
            {isAdmin ? (
              <>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </NavLink>
                
                <NavLink 
                  to="/account-management"
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <UserCog size={20} />
                  <span>계정 관리</span>
                </NavLink>

                <NavLink 
                  to="/course-management"
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <BookOpen size={20} />
                  <span>수업 관리</span>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <LayoutDashboard size={20} />
                  <span>Dashboard</span>
                </NavLink>
                
                <NavLink 
                  to="/courses"
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <Book size={20} />
                  <span>My Courses</span>
                </NavLink>
                
                {!isProfessor && (
                  <NavLink 
                    to="/assignments"
                    className={({ isActive }) => 
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                    onClick={closeSidebar}
                  >
                    <ClipboardList size={20} />
                    <span>Assignments</span>
                  </NavLink>
                )}
                
                {!isProfessor && (
                  <NavLink 
                    to="/grades"
                    className={({ isActive }) => 
                      `sidebar-link ${isActive ? 'active' : ''}`
                    }
                    onClick={closeSidebar}
                  >
                    <BarChart2 size={20} />
                    <span>Grades</span>
                  </NavLink>
                )}
                
                <NavLink 
                  to="/timetable"
                  className={({ isActive }) => 
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={closeSidebar}
                >
                  <Calendar size={20} />
                  <span>Timetable</span>
                </NavLink>

                {isProfessor && (
                  <>
                    <NavLink 
                      to="/manage-students"
                      className={({ isActive }) => 
                        `sidebar-link ${isActive ? 'active' : ''}`
                      }
                      onClick={closeSidebar}
                    >
                      <Users size={20} />
                      <span>Manage Students</span>
                    </NavLink>

                    <NavLink 
                      to="/course-management"
                      className={({ isActive }) => 
                        `sidebar-link ${isActive ? 'active' : ''}`
                      }
                      onClick={closeSidebar}
                    >
                      <BookOpen size={20} />
                      <span>Manage Courses</span>
                    </NavLink>
                  </>
                )}
              </>
            )}
          </nav>
        </aside>
        
        {/* Overlay for mobile sidebar */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          />
        )}
        
        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;