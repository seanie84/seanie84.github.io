import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  LayoutDashboard, Swords, Target, Users2, FileText,
  BarChart2, BookOpen, Cpu, Package, FileSpreadsheet,
  Settings, Palette, LogOut, Bot, ScrollText,
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

export default function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <aside style={{
      width: 'var(--sidebar-w)',
      minHeight: '100vh',
      background: 'rgba(5,13,31,0.92)',
      borderRight: '1px solid var(--line)',
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(16px)',
      position: 'fixed',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: 40,
    }}>
      {/* Logo */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'linear-gradient(135deg, var(--cyan), var(--gold))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Orbitron', fontWeight: 900, fontSize: 12, color: '#000',
          }}>N</div>
          <div>
            <div style={{ fontFamily: 'Orbitron', fontWeight: 700, fontSize: 13, color: 'var(--ink)', letterSpacing: '0.12em' }}>NEXA</div>
            <div style={{ fontFamily: 'JetBrains Mono', fontSize: 9, color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Command Center</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 8px' }}>
        {NAV.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 10px',
              borderRadius: 8,
              marginBottom: 2,
              textDecoration: 'none',
              fontFamily: 'Rajdhani, sans-serif',
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: '0.04em',
              color: isActive ? 'var(--cyan)' : 'var(--ink-2)',
              background: isActive ? 'rgba(34,211,238,0.08)' : 'transparent',
              border: isActive ? '1px solid rgba(34,211,238,0.2)' : '1px solid transparent',
              transition: 'all 0.15s',
            })}
          >
            <Icon size={15} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* User footer */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', marginBottom: 4 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--navy-2)', border: '1px solid var(--line-strong)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontFamily: 'Rajdhani', fontWeight: 700, color: 'var(--cyan)',
          }}>
            {(user?.name ?? 'O')[0].toUpperCase()}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontFamily: 'Rajdhani', fontWeight: 600, color: 'var(--ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
            <div style={{ fontSize: 10, fontFamily: 'JetBrains Mono', color: 'var(--ink-3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</div>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/login'); }}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 10px', borderRadius: 8, border: '1px solid transparent',
            background: 'transparent', cursor: 'pointer', color: 'var(--ink-3)',
            fontFamily: 'Rajdhani', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--danger)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--ink-3)'; }}
        >
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
