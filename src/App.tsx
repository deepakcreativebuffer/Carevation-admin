import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LoginPage } from './Pages/Auth/LoginPage';
import { DashboardPage } from './Pages/Dashboard/DashboardPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
        <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    </AuthProvider>
    </Router>
  );
}

export default App;