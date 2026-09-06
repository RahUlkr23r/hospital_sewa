import React, { useState, lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';
import EmergencyOverlay from './components/Common/EmergencyOverlay';
import LoginPage from './components/Auth/LoginPage';

// Lazy-load portal pages
const PatientPortal = lazy(() => import('./pages/PatientPortal'));
const HospitalPortal = lazy(() => import('./pages/HospitalPortal'));
const GovernmentPortal = lazy(() => import('./pages/GovernmentPortal'));
const AdminPortal = lazy(() => import('./pages/AdminPortal'));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
        <p className="text-sm text-[var(--text-muted)]">Loading...</p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && !allowedRoles.includes(role)) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} menuOpen={sidebarOpen} />
      <div className="flex">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 lg:p-6 min-h-[calc(100vh-4rem)] overflow-x-hidden">
          <Suspense fallback={<LoadingFallback />}>
            {children}
          </Suspense>
        </main>
      </div>
      <EmergencyOverlay />
    </div>
  );
}

export default function App() {
  const { isAuthenticated, role } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to={`/${role === 'doctor' ? 'hospital' : role}`} replace /> : <LoginPage />} />
      
      <Route path="/patient/*" element={
        <ProtectedRoute allowedRoles={['patient']}>
          <DashboardLayout><PatientPortal /></DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/hospital/*" element={
        <ProtectedRoute allowedRoles={['doctor']}>
          <DashboardLayout><HospitalPortal /></DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/government/*" element={
        <ProtectedRoute allowedRoles={['government']}>
          <DashboardLayout><GovernmentPortal /></DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="/admin/*" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <DashboardLayout><AdminPortal /></DashboardLayout>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
