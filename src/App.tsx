import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { ErrorBoundary } from './components/ErrorBoundary';
import AppShell from './components/layout/AppShell';
import Login from './pages/Login';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Agents = lazy(() => import('./pages/Agents'));
const WarRoom = lazy(() => import('./pages/WarRoom'));
const Missions = lazy(() => import('./pages/Missions'));
const CRM = lazy(() => import('./pages/CRM'));
const Documents = lazy(() => import('./pages/Documents'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Classroom = lazy(() => import('./pages/Classroom'));
const Memory = lazy(() => import('./pages/Memory'));
const Plugins = lazy(() => import('./pages/Plugins'));
const Quotes = lazy(() => import('./pages/Quotes'));
const Settings = lazy(() => import('./pages/Settings'));
const AgUiChat = lazy(() => import('./pages/AgUiChat'));
const Studio = lazy(() => import('./pages/Studio'));
const Profile = lazy(() => import('./pages/Profile'));

function PageFallback() {
  return (
    <div style={{ padding: 32, fontFamily: 'Inter, system-ui', color: 'var(--ink-2)' }}>
      Loading…
    </div>
  );
}

function PrivateRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <AppShell>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/warroom" element={<WarRoom />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/crm" element={<CRM />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/classroom" element={<Classroom />} />
          <Route path="/memory" element={<Memory />} />
          <Route path="/plugins" element={<Plugins />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/ag-ui" element={<AgUiChat />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginGuard />} />
          <Route path="/*" element={<PrivateRoutes />} />
        </Routes>
      </AuthProvider>
    </ErrorBoundary>
  );
}

function LoginGuard() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Login />;
}
