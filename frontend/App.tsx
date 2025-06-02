import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layouts
import DashboardLayout from '@/layouts/DashboardLayout';
import AuthLayout from '@/layouts/AuthLayout';

// Pages - Auth
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';

// Pages - Student
import StudentDashboard from '@/pages/student/Dashboard';
import TrailsList from '@/pages/student/TrailsList';
import TrailDetail from '@/pages/student/TrailDetail';
import ModuleContent from '@/pages/student/ModuleContent';
import SimulationsList from '@/pages/student/SimulationsList';
import SimulationStart from '@/pages/student/SimulationStart';
import SimulationTake from '@/pages/student/SimulationTake';
import SimulationResults from '@/pages/student/SimulationResults';
import StudentProfile from '@/pages/student/Profile';

// Pages - Teacher
import TeacherDashboard from '@/pages/teacher/Dashboard';
import CourseManagement from '@/pages/teacher/CourseManagement';
import TrailManagement from '@/pages/teacher/TrailManagement';
import ModuleManagement from '@/pages/teacher/ModuleManagement';
import SimulationManagement from '@/pages/teacher/SimulationManagement';
import StudentProgress from '@/pages/teacher/StudentProgress';
import TeacherProfile from '@/pages/teacher/Profile';

// Pages - Coordinator
import CoordinatorDashboard from '@/pages/coordinator/Dashboard';
import CourseAnalytics from '@/pages/coordinator/CourseAnalytics';
import UserManagement from '@/pages/coordinator/UserManagement';
import SystemOverview from '@/pages/coordinator/SystemOverview';
import CoordinatorProfile from '@/pages/coordinator/Profile';

// Pages - Common
import NotFound from '@/pages/common/NotFound';
import Landing from '@/pages/common/Landing';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, loading } = React.useContext(AuthContext);
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="adm-academy-theme">
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>
            
            {/* Student Routes */}
            <Route element={
              <ProtectedRoute allowedRoles={['student']}>
                <DashboardLayout userRole="student" />
              </ProtectedRoute>
            }>
              <Route path="/student/dashboard" element={<StudentDashboard />} />
              <Route path="/student/trails" element={<TrailsList />} />
              <Route path="/student/trails/:id" element={<TrailDetail />} />
              <Route path="/student/modules/:id" element={<ModuleContent />} />
              <Route path="/student/simulations" element={<SimulationsList />} />
              <Route path="/student/simulations/:id/start" element={<SimulationStart />} />
              <Route path="/student/simulations/:id/take" element={<SimulationTake />} />
              <Route path="/student/simulations/:id/results" element={<SimulationResults />} />
              <Route path="/student/profile" element={<StudentProfile />} />
            </Route>
            
            {/* Teacher Routes */}
            <Route element={
              <ProtectedRoute allowedRoles={['teacher', 'admin']}>
                <DashboardLayout userRole="teacher" />
              </ProtectedRoute>
            }>
              <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
              <Route path="/teacher/courses" element={<CourseManagement />} />
              <Route path="/teacher/trails" element={<TrailManagement />} />
              <Route path="/teacher/modules" element={<ModuleManagement />} />
              <Route path="/teacher/simulations" element={<SimulationManagement />} />
              <Route path="/teacher/students" element={<StudentProgress />} />
              <Route path="/teacher/profile" element={<TeacherProfile />} />
            </Route>
            
            {/* Coordinator Routes */}
            <Route element={
              <ProtectedRoute allowedRoles={['coordinator', 'admin']}>
                <DashboardLayout userRole="coordinator" />
              </ProtectedRoute>
            }>
              <Route path="/coordinator/dashboard" element={<CoordinatorDashboard />} />
              <Route path="/coordinator/courses" element={<CourseAnalytics />} />
              <Route path="/coordinator/users" element={<UserManagement />} />
              <Route path="/coordinator/system" element={<SystemOverview />} />
              <Route path="/coordinator/profile" element={<CoordinatorProfile />} />
            </Route>
            
            {/* Catch All */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <ToastContainer position="top-right" autoClose={3000} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
