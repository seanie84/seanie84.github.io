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
const Contacts = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Contacts })));
const Products = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Products })));
const FixedAssets = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.FixedAssets })));
const Recruitment = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Recruitment })));
const Jobs = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Jobs })));
const Reports = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Reports })));
const Timesheets = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Timesheets })));
const Reminders = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Reminders })));
const BrandStudio = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.BrandStudio })));
const DesignAgent = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.DesignAgent })));
const AppStudio = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.AppStudio })));
const CampaignStudio = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.CampaignStudio })));
const Canvas = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Canvas })));
const Chains = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Chains })));
const Workspaces = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Workspaces })));
const Ideas = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Ideas })));
const Support = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Support })));
const Teacher = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Teacher })));
const Tutor = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Tutor })));
const Reader = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Reader })));
const Live = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Live })));
const AirportOps = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.AirportOps })));
const ESD = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.ESD })));
const Acceleration = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Acceleration })));
const Retail = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Retail })));
const Dropshipping = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Dropshipping })));
const Fitness = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Fitness })));
const Sabc = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Sabc })));
const MoneyLoop = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.MoneyLoop })));
const Storefront = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Storefront })));
const Integrations = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Integrations })));
const FreeRun = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.FreeRun })));
const Skills = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Skills })));
const AgentKit = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.AgentKit })));
const Brain = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Brain })));
const Executive = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Executive })));
const Downloads = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Downloads })));
const PrivacyCenter = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.PrivacyCenter })));
const Social = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Social })));
const Onboarding = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Onboarding })));
const Language = lazy(() => import('./pages/RestoredDesks2').then(m => ({ default: m.Language })));
const Admin = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Admin })));
const AgentsRoom = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.AgentsRoom })));
const AiPrompts = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.AiPrompts })));
const Apex = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Apex })));
const ApiPage = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.ApiPage })));
const Ascension = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Ascension })));
const Classic = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Classic })));
const CommandDeck = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.CommandDeck })));
const Company = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Company })));
const Connections = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Connections })));
const DataServers = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.DataServers })));
const DatabaseUpload = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.DatabaseUpload })));
const Ecosystems = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Ecosystems })));
const FirstRun = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.FirstRun })));
const FullDesk = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.FullDesk })));
const Install = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Install })));
const Jarvis = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Jarvis })));
const MasterAgent = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.MasterAgent })));
const Pos = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Pos })));
const Quantum = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Quantum })));
const Rooms = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Rooms })));
const SovereignBrain = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.SovereignBrain })));
const Startup = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Startup })));
const Status = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Status })));
const Supervisor = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Supervisor })));
const Terms = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Terms })));
const Upload = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Upload })));
const UsersAdmin = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.UsersAdmin })));
const Vote = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Vote })));
const Welcome = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Welcome })));
const Get = lazy(() => import('./pages/RestoredDesks3').then(m => ({ default: m.Get })));

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
                    <Route path="/contacts" element={<Contacts />} />
          <Route path="/products" element={<Products />} />
          <Route path="/fixed-assets" element={<FixedAssets />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/reminders" element={<Reminders />} />
          <Route path="/brand-studio" element={<BrandStudio />} />
          <Route path="/design-agent" element={<DesignAgent />} />
          <Route path="/app-studio" element={<AppStudio />} />
          <Route path="/campaign-studio" element={<CampaignStudio />} />
          <Route path="/canvas" element={<Canvas />} />
          <Route path="/chains" element={<Chains />} />
          <Route path="/workspaces" element={<Workspaces />} />
          <Route path="/ideas" element={<Ideas />} />
          <Route path="/support" element={<Support />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/tutor" element={<Tutor />} />
          <Route path="/reader" element={<Reader />} />
          <Route path="/live" element={<Live />} />
          <Route path="/airport-ops" element={<AirportOps />} />
          <Route path="/esd" element={<ESD />} />
          <Route path="/acceleration" element={<Acceleration />} />
          <Route path="/retail" element={<Retail />} />
          <Route path="/dropshipping" element={<Dropshipping />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/sabc" element={<Sabc />} />
          <Route path="/money-loop" element={<MoneyLoop />} />
          <Route path="/storefront" element={<Storefront />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/free-run" element={<FreeRun />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/agent-kit" element={<AgentKit />} />
          <Route path="/brain" element={<Brain />} />
          <Route path="/executive" element={<Executive />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/privacy" element={<PrivacyCenter />} />
          <Route path="/social" element={<Social />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/language" element={<Language />} />
                    <Route path="/admin" element={<Admin />} />
          <Route path="/agents-room" element={<AgentsRoom />} />
          <Route path="/prompts" element={<AiPrompts />} />
          <Route path="/apex" element={<Apex />} />
          <Route path="/api" element={<ApiPage />} />
          <Route path="/ascension" element={<Ascension />} />
          <Route path="/classic" element={<Classic />} />
          <Route path="/command-deck" element={<CommandDeck />} />
          <Route path="/company" element={<Company />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/data-servers" element={<DataServers />} />
          <Route path="/database-upload" element={<DatabaseUpload />} />
          <Route path="/ecosystems" element={<Ecosystems />} />
          <Route path="/first-run" element={<FirstRun />} />
          <Route path="/full-desk" element={<FullDesk />} />
          <Route path="/install" element={<Install />} />
          <Route path="/jarvis" element={<Jarvis />} />
          <Route path="/master-agent" element={<MasterAgent />} />
          <Route path="/pos" element={<Pos />} />
          <Route path="/quantum" element={<Quantum />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/sovereign-brain" element={<SovereignBrain />} />
          <Route path="/startup" element={<Startup />} />
          <Route path="/status" element={<Status />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/users" element={<UsersAdmin />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/get" element={<Get />} />
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
