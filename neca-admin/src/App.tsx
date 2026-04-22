import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import MembershipRequests from './pages/MembershipRequests';
import ContactInquiries from './pages/ContactInquiries';
import AdminLayout from './components/AdminLayout';
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from './components/ThemeProvider';

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('neca_admin_auth') === 'true';
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="neca-admin-theme">
      <Router>
        <Toaster />
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/memberships" element={
            <ProtectedRoute>
              <AdminLayout>
                <MembershipRequests />
              </AdminLayout>
            </ProtectedRoute>
          } />

          <Route path="/contacts" element={
            <ProtectedRoute>
              <AdminLayout>
                <ContactInquiries />
              </AdminLayout>
            </ProtectedRoute>
          } />

          {/* Redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
