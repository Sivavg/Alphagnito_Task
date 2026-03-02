import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Agents from './pages/Agents';
import DashboardOverview from './pages/DashboardOverview';
import ComingSoon from './pages/ComingSoon';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Dashboard Overview - Landing page after login */}
      <Route path="/dashboard-overview" element={<ProtectedRoute><DashboardOverview /></ProtectedRoute>} />

      {/* Agents Page */}
      <Route path="/agents" element={<ProtectedRoute><Agents /></ProtectedRoute>} />

      {/* Coming Soon Routes (from Sidebar) */}
      <Route path="/inspectors" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
      <Route path="/properties" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
      <Route path="/inspections" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
      <Route path="/audit-logs" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<Navigate to="/dashboard-overview" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
