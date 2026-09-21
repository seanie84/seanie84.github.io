import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Swords, Target, Users2, FileText,
  BarChart2, BookOpen, Cpu, Package, FileSpreadsheet,
  Settings, Palette, LogOut, Bot, ScrollText, X,
} from 'lucide-react';

const NAV = [
  { to: '/dashboard',  label: 'Dashboard',       Icon: LayoutDashboard },
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
  { to: '/studio',     label: 'Theme Studio',     Icon: Palette },
  { to: '/settings',   label: 'Settings',         Icon: Settings },
];

export default function Sidebar({ open = true, onClose }: { open?: boolean; onClose?: () => void }) {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: 'var(--sidebar-w)', minHeight: '100vh',
      background: 'linear-gradient(#14171b, #0e1013)',
      borderRight: '1px solid #0a0c0e',
      boxShadow: '1px 0 0 rgba(255,255,255,.04)',
      display: 'flex', flexDirection: 'column',
      position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
      transform: open ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.2s',
    }}>
      <div style={{ padding: '16px 14px 14px', borderBottom: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div className="nexa-mark">NX</div>
          <div>
            <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 13, color: 'var(--ink)', letterSpacing: '0.14em' }}>NEXAS</div>
            <div style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: 9, color: 'var(--ink-3)', letterSpacing: '0.16em', textTransform: 'uppercase' }}>Agent desk</div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} style={{ padding: 4, background: 'transparent', border: 'none', color: 'var(--ink-3)', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        )}
      </div>
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 6px' }}>
        {NAV.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 2,
            marginBottom: 1, textDecoration: 'none', fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 500,
            fontSize: 13, letterSpacing: '0.02em',
            color: isActive ? 'var(--ink)' : 'var(--ink-2)',
            background: isActive ? 'rgba(61,154,140,0.12)' : 'transparent',
            borderLeft: isActive ? '2px solid var(--cyan)' : '2px solid transparent',
          })}>
            <Icon size={14} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 4 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 2, background: 'var(--navy-2)', border: '1px solid var(--line-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'IBM Plex Mono', fontWeight: 600, color: 'var(--cyan)',
          }}>{(user?.name ?? 'O')[0].toUpperCase()}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 10, fontFamily: 'IBM Plex Mono', color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/login'); }} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 2,
          border: '1px solid transparent', background: 'transparent', cursor: 'pointer', color: 'var(--ink-3)',
          fontFamily: 'IBM Plex Sans', fontWeight: 500, fontSize: 13,
        }}>
          <LogOut size={14} /> Sign out
        </button>
      </div>
    </aside>
  );
}
