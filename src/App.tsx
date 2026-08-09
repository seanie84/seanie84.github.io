import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import AppShell from './components/layout/AppShell';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Agents from './pages/Agents';
import WarRoom from './pages/WarRoom';
import Missions from './pages/Missions';
import CRM from './pages/CRM';
import Documents from './pages/Documents';
import Analytics from './pages/Analytics';
import Classroom from './pages/Classroom';
import Memory from './pages/Memory';
import Plugins from './pages/Plugins';
import Quotes from './pages/Quotes';
import Settings from './pages/Settings';
import Studio from './pages/Studio';

function PrivateRoutes() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <AppShell>
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
        <Route path="/settings" element={<Settings />} />
        <Route path="/studio" element={<Studio />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginGuard />} />
        <Route path="/*" element={<PrivateRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

function LoginGuard() {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" replace />;
  return <Login />;
}
