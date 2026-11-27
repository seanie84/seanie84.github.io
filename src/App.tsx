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
const TenderWatch = lazy(() => import('./pages/TenderWatch'));
const Handoff = lazy(() => import('./pages/Handoff'));
const Integrity = lazy(() => import('./pages/Integrity'));
const DataDesk = lazy(() => import('./pages/DataDesk'));

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

const Calendar = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Calendar })));
const Diary = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Diary })));
const Decisions = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Decisions })));
const Files = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Files })));
const Emails = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Emails })));
const Projects = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Projects })));
const Helpdesk = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Helpdesk })));
const Leads = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Leads })));
const Clients = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Clients })));
const Budgets = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Budgets })));
const Billing = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Billing })));
const Accounting = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Accounting })));
const Banking = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Banking })));
const Payroll = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Payroll })));
const Inventory = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Inventory })));
const Contracts = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Contracts })));
const JobHunter = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.JobHunter })));
const ImageStudio = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.ImageStudio })));
const Presentation = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Presentation })));
const Voice = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.Voice })));
const WhatsApp = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.WhatsApp })));
const ScamScanner = lazy(() => import('./pages/RestoredDesks').then(m => ({ default: m.ScamScanner })));

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
          <Route path="/watch" element={<TenderWatch />} />
          <Route path="/handoff" element={<Handoff />} />
          <Route path="/integrity" element={<Integrity />} />
          <Route path="/data" element={<DataDesk />} />
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
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/decisions" element={<Decisions />} />
          <Route path="/files" element={<Files />} />
          <Route path="/emails" element={<Emails />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/helpdesk" element={<Helpdesk />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/accounting" element={<Accounting />} />
          <Route path="/banking" element={<Banking />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/job-hunter" element={<JobHunter />} />
          <Route path="/image-studio" element={<ImageStudio />} />
          <Route path="/presentation" element={<Presentation />} />
          <Route path="/voice" element={<Voice />} />
          <Route path="/whatsapp" element={<WhatsApp />} />
          <Route path="/scam-scanner" element={<ScamScanner />} />
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
