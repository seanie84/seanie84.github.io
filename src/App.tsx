import { lazy, Suspense, type ComponentType } from 'react';
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
const BusinessHub = lazy(() => import('./pages/BusinessHub'));
const SME = lazy(() => import('./pages/SME'));
const BusinessCenters = lazy(() => import('./pages/BusinessCenters'));
const Repos = lazy(() => import('./pages/Repos'));
const Catalog = lazy(() => import('./pages/Catalog'));

const pick = (name: string) => lazy(() => import('./pages/PreviousModules').then((m) => ({ default: (m as Record<string, ComponentType>)[name] })));
const Tenders = pick('Tenders');
const Scout = pick('Scout');
const Procurement = pick('Procurement');
const Campaigns = pick('Campaigns');
const Government = pick('Government');
const Education = pick('Education');
const Security = pick('Security');
const Architect = pick('Architect');
const Trading = pick('Trading');
const Sell = pick('Sell');
const Store = pick('Store');
const Operator = pick('Operator');
const Knowledge = pick('Knowledge');

function PageFallback() {
  return <div style={{ padding: 32, color: 'var(--ink-2)' }}>Loading…</div>;
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
          <Route path="/hub" element={<BusinessHub />} />
          <Route path="/sme" element={<SME />} />
          <Route path="/centers" element={<BusinessCenters />} />
          <Route path="/repos" element={<Repos />} />
          <Route path="/catalog" element={<Catalog />} />
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
          <Route path="/tenders" element={<Tenders />} />
          <Route path="/scout" element={<Scout />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/government" element={<Government />} />
          <Route path="/education" element={<Education />} />
          <Route path="/security" element={<Security />} />
          <Route path="/architect" element={<Architect />} />
          <Route path="/trading" element={<Trading />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/store" element={<Store />} />
          <Route path="/operator" element={<Operator />} />
          <Route path="/knowledge" element={<Knowledge />} />
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
