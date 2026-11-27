import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Swords, Target, Users2, FileText,
  BarChart2, BookOpen, Cpu, Package, FileSpreadsheet,
  Settings, Palette, LogOut, Bot, ScrollText, X, MessageSquare,
  Building2, Briefcase, Landmark, FolderGit2, List,
  Gavel, Megaphone, GraduationCap, Shield, Store, ShoppingBag,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',  label: 'Home',             Icon: LayoutDashboard },
  { to: '/hub',        label: 'Business Hub',     Icon: Building2 },
  { to: '/sme',        label: 'SME',              Icon: Briefcase },
  { to: '/centers',    label: 'Centers',          Icon: Landmark },
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
  { to: '/settings',   label: 'Settings',         Icon: Settings },
];

export default function Sidebar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside aria-label="Main navigation" style={{
      width: 'var(--sidebar-w)', minHeight: '100vh',
      background: '#ffffff',
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
            background: isActive ? 'rgba(15,118,110,.08)' : 'transparent',
          })}>
            <Icon size={16} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 10px 16px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 12px' }}>
          <div aria-hidden="true" style={{
            width: 32, height: 32, borderRadius: 10, background: 'rgba(15,118,110,.1)', border: '1px solid rgba(15,118,110,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--cyan)',
          }}>{(user?.name ?? 'O')[0].toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--ink)' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button type="button" onClick={() => { logout(); navigate('/login'); }} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', borderRadius: 10,
          border: '1px solid var(--line)', background: '#ffffff', cursor: 'pointer', color: 'var(--ink-2)',
          fontWeight: 600, fontSize: 13, minHeight: 40,
        }}>
          <LogOut size={14} aria-hidden="true" /> Sign out
        </button>
      </div>
    </aside>
  );
}
