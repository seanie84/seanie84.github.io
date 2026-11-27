import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Swords, Target, Users2, FileText,
  BarChart2, BookOpen, Cpu, Package, FileSpreadsheet,
  Settings, Palette, LogOut, Bot, ScrollText, X, MessageSquare,
  Building2, Briefcase, Landmark, FolderGit2, List,
  Gavel, Megaphone, GraduationCap, Shield, Store, ShoppingBag,
  Radar, Share2, ShieldCheck, Database,
  Calendar, BookMarked, Scale, FolderOpen, Mail, Kanban, LifeBuoy,
  UserPlus, Contact, Wallet, Receipt, Coins, Users, Boxes,
  FileSignature, Crosshair, Image, Presentation, Mic, MessageCircle, ScanSearch,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',  label: 'Home',             Icon: LayoutDashboard },
  { to: '/hub',        label: 'Business Hub',     Icon: Building2 },
  { to: '/sme',        label: 'SME',              Icon: Briefcase },
  { to: '/centers',    label: 'Centers',          Icon: Landmark },
  { to: '/watch',      label: 'Tender watch',     Icon: Radar },
  { to: '/handoff',    label: 'Handoff',          Icon: Share2 },
  { to: '/integrity',  label: 'Integrity',        Icon: ShieldCheck },
  { to: '/data',       label: 'Data desk',        Icon: Database },
  { to: '/repos',      label: 'All repos',        Icon: FolderGit2 },
  { to: '/catalog',    label: 'Full catalog',     Icon: List },
  { to: '/tenders',    label: 'Tenders',          Icon: Gavel },
  { to: '/campaigns',  label: 'Campaigns',        Icon: Megaphone },
  { to: '/government', label: 'Government',       Icon: Landmark },
  { to: '/education',  label: 'Education',        Icon: GraduationCap },
  { to: '/security',   label: 'Security',         Icon: Shield },
  { to: '/sell',       label: 'Sell',             Icon: ShoppingBag },
  { to: '/store',      label: 'Store',            Icon: Store },
  { to: '/warroom',    label: 'War Room',         Icon: Swords },
  { to: '/missions',   label: 'Missions',         Icon: Target },
  { to: '/agents',     label: 'Agents',           Icon: Bot },
  { to: '/crm',        label: 'CRM',              Icon: Users2 },
  { to: '/documents',  label: 'Documents',        Icon: FileText },
  { to: '/analytics',  label: 'Analytics',        Icon: BarChart2 },
  { to: '/classroom',  label: 'Classroom',        Icon: BookOpen },
  { to: '/memory',     label: 'Memory',           Icon: Cpu },
  { to: '/plugins',    label: 'Plugins',          Icon: Package },
  { to: '/quotes',     label: 'Quotes',           Icon: FileSpreadsheet },
  { to: '/profile',    label: 'Profile',          Icon: ScrollText },
  { to: '/studio',     label: 'Theme',            Icon: Palette },
  { to: '/ag-ui',      label: 'AG-UI',            Icon: MessageSquare },
  { to: '/calendar',   label: 'Calendar',         Icon: Calendar },
  { to: '/diary',      label: 'Diary',            Icon: BookMarked },
  { to: '/decisions',  label: 'Decisions',        Icon: Scale },
  { to: '/files',      label: 'Files',            Icon: FolderOpen },
  { to: '/emails',     label: 'Emails',           Icon: Mail },
  { to: '/whatsapp',   label: 'WhatsApp',         Icon: MessageCircle },
  { to: '/projects',   label: 'Projects',         Icon: Kanban },
  { to: '/helpdesk',   label: 'Helpdesk',         Icon: LifeBuoy },
  { to: '/leads',      label: 'Leads',            Icon: UserPlus },
  { to: '/clients',    label: 'Clients',          Icon: Contact },
  { to: '/budgets',    label: 'Budgets',          Icon: Wallet },
  { to: '/billing',    label: 'Billing',          Icon: Receipt },
  { to: '/accounting', label: 'Accounting',       Icon: Coins },
  { to: '/banking',    label: 'Banking',          Icon: Coins },
  { to: '/payroll',    label: 'Payroll',          Icon: Users },
  { to: '/inventory',  label: 'Inventory',        Icon: Boxes },
  { to: '/contracts',  label: 'Contracts',        Icon: FileSignature },
  { to: '/job-hunter', label: 'Job hunter',       Icon: Crosshair },
  { to: '/image-studio', label: 'Image studio',   Icon: Image },
  { to: '/presentation', label: 'Presentations',  Icon: Presentation },
  { to: '/voice',      label: 'Voice',            Icon: Mic },
  { to: '/scam-scanner', label: 'Scam scanner',   Icon: ScanSearch },
  { to: '/contacts', label: 'Contacts', Icon: Contact },
  { to: '/products', label: 'Products', Icon: Package },
  { to: '/fixed-assets', label: 'Fixed assets', Icon: Boxes },
  { to: '/recruitment', label: 'Recruitment', Icon: Users },
  { to: '/jobs', label: 'Jobs', Icon: Crosshair },
  { to: '/reports', label: 'Reports', Icon: FileText },
  { to: '/timesheets', label: 'Timesheets', Icon: Calendar },
  { to: '/reminders', label: 'Reminders', Icon: Calendar },
  { to: '/brand-studio', label: 'Brand studio', Icon: Palette },
  { to: '/design-agent', label: 'Design agent', Icon: Palette },
  { to: '/app-studio', label: 'App studio', Icon: Cpu },
  { to: '/campaign-studio', label: 'Campaign studio', Icon: Megaphone },
  { to: '/canvas', label: 'Canvas', Icon: LayoutDashboard },
  { to: '/chains', label: 'Chains', Icon: Share2 },
  { to: '/workspaces', label: 'Workspaces', Icon: FolderGit2 },
  { to: '/ideas', label: 'Ideas', Icon: Target },
  { to: '/support', label: 'Support', Icon: LifeBuoy },
  { to: '/teacher', label: 'Teacher', Icon: GraduationCap },
  { to: '/tutor', label: 'Tutor', Icon: BookOpen },
  { to: '/reader', label: 'Reader', Icon: BookOpen },
  { to: '/live', label: 'Live', Icon: Radar },
  { to: '/airport-ops', label: 'Airport ops', Icon: Radar },
  { to: '/esd', label: 'ESD', Icon: Briefcase },
  { to: '/acceleration', label: 'Acceleration', Icon: Briefcase },
  { to: '/retail', label: 'Retail', Icon: Store },
  { to: '/dropshipping', label: 'Dropshipping', Icon: ShoppingBag },
  { to: '/fitness', label: 'Fitness', Icon: Target },
  { to: '/sabc', label: 'SABC', Icon: Megaphone },
  { to: '/money-loop', label: 'Money loop', Icon: Coins },
  { to: '/storefront', label: 'Storefront', Icon: Store },
  { to: '/integrations', label: 'Integrations', Icon: Share2 },
  { to: '/free-run', label: 'Free run', Icon: Package },
  { to: '/skills', label: 'Skills', Icon: Bot },
  { to: '/agent-kit', label: 'Agent kit', Icon: Bot },
  { to: '/brain', label: 'Brain', Icon: Cpu },
  { to: '/executive', label: 'Executive', Icon: ScrollText },
  { to: '/downloads', label: 'Downloads', Icon: FolderOpen },
  { to: '/privacy', label: 'Privacy', Icon: Shield },
  { to: '/social', label: 'Social', Icon: MessageCircle },
  { to: '/onboarding', label: 'Onboarding', Icon: UserPlus },
  { to: '/language', label: 'Language', Icon: BookOpen },
  { to: '/settings',   label: 'Settings',         Icon: Settings },
];

export default function Sidebar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside aria-label="Main navigation" style={{
      width: 'var(--sidebar-w)', minHeight: '100vh',
      background: '#fffdf8',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
      transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.2s ease',
      boxShadow: '1px 0 0 var(--line)',
    }}>
      <div style={{ padding: '20px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="nexa-mark" aria-hidden="true">NX</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.03em', color: 'var(--ink)' }}>NEXAS</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Business workspace</div>
          </div>
        </div>
        {onClose && (
          <button type="button" onClick={onClose} aria-label="Close menu" style={{ padding: 8, minWidth: 32, minHeight: 32, background: 'transparent', border: 'none', color: 'var(--ink-2)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        )}
      </div>
      <nav aria-label="Primary" style={{ flex: 1, overflowY: 'auto', padding: '4px 10px 12px' }}>
        {NAV.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10,
            marginBottom: 2, textDecoration: 'none', fontWeight: 600,
            fontSize: 13.5,
            color: isActive ? 'var(--cyan)' : 'var(--ink-2)',
            background: isActive ? 'rgba(159,18,57,.08)' : 'transparent',
          })}>
            <Icon size={16} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 10px 16px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 12px' }}>
          <div aria-hidden="true" style={{
            width: 32, height: 32, borderRadius: 10, background: 'rgba(159,18,57,.1)', border: '1px solid rgba(159,18,57,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--cyan)',
          }}>{(user?.name ?? 'O')[0].toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--ink)' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button type="button" onClick={() => { logout(); navigate('/login'); }} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10,
          border: '1px solid var(--line)', background: '#fffdf8', cursor: 'pointer', color: 'var(--ink-2)',
          fontWeight: 600, fontSize: 13, minHeight: 40,
        }}>
          <LogOut size={14} aria-hidden="true" /> Sign out
        </button>
      </div>
    </aside>
  );
}
