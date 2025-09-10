import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MedicineReminder from './pages/MedicineReminder';
import HealthTracker from './pages/HealthTracker';
import SymptomChecker from './pages/SymptomChecker';
import Calendar from './pages/Calendar';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import LearnMore from './pages/LearnMore';
import ForgotPassword from './pages/ForgotPassword';
import Terms from './pages/Terms';
import { ThemeProvider } from './contexts/ThemeContext';
import { UserProvider, useUser } from './contexts/UserContext';
// Protected route component to handle authentication
const ProtectedRoute = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const {
    isAuthenticated
  } = useUser();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};
export function AppContent() {
  return <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/terms" element={<Terms />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>} />
          <Route path="/medicine" element={<ProtectedRoute>
                <MedicineReminder />
              </ProtectedRoute>} />
          <Route path="/health" element={<ProtectedRoute>
                <HealthTracker />
              </ProtectedRoute>} />
          <Route path="/symptom-checker" element={<ProtectedRoute>
                <SymptomChecker />
              </ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute>
                <Calendar />
              </ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute>
                <Notifications />
              </ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute>
                <Settings />
              </ProtectedRoute>} />
        </Route>
      </Routes>
    </Router>;
}
export function App() {
  return <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>;
}