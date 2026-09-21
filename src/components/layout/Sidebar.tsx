import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Swords, Target, Users2, FileText,
  BarChart2, BookOpen, Cpu, Package, FileSpreadsheet,
  Settings, Palette, LogOut, Bot, ScrollText, X,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',  label: 'Home',             Icon: LayoutDashboard },
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
  { to: '/settings',   label: 'Settings',         Icon: Settings },
];

export default function Sidebar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: 'var(--sidebar-w)', minHeight: '100vh',
      background: 'rgba(12,12,14,.78)',
      backdropFilter: 'blur(22px)',
      borderRight: '1px solid var(--line)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
      transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.2s ease',
    }}>
      <div style={{ padding: '18px 16px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="nexa-mark">NX</div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 14, letterSpacing: '-0.03em' }}>NEXAS</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Agent workspace</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ padding: 4, background: 'transparent', border: 'none', color: 'var(--ink-3)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        )}
      </div>
      <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 10px 12px' }}>
        {NAV.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10,
            marginBottom: 2, textDecoration: 'none', fontWeight: 600,
            fontSize: 13.5,
            color: isActive ? 'var(--ink)' : 'var(--ink-2)',
            background: isActive ? 'var(--navy-2)' : 'transparent',
          })}>
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 10px 16px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 8px 12px' }}>
          <div style={{
            width: 32, height: 32, borderRadius: 10, background: 'var(--navy-2)', border: '1px solid var(--line)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: 'var(--cyan)',
          }}>{(user?.name ?? 'O')[0].toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10,
          border: '1px solid var(--line)', background: 'transparent', cursor: 'pointer', color: 'var(--ink-3)',
          fontWeight: 600, fontSize: 13,
        }}>
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}
