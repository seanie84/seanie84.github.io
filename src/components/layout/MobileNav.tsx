import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Building2, Briefcase, Bot, Settings } from 'lucide-react';

const ITEMS = [
  { to: '/dashboard', label: 'Home', Icon: LayoutDashboard },
  { to: '/hub', label: 'Hub', Icon: Building2 },
  { to: '/sme', label: 'SME', Icon: Briefcase },
  { to: '/agents', label: 'Agents', Icon: Bot },
  { to: '/settings', label: 'Settings', Icon: Settings },
];

export default function MobileNav() {
  return (
    <nav aria-label="Mobile" style={{
      position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 70,
      display: 'none', background: '#fff', borderTop: '1px solid var(--line)',
      padding: '6px 8px calc(6px + env(safe-area-inset-bottom))',
    }} className="mobile-nav">
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        {ITEMS.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} style={({ isActive }) => ({
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
            textDecoration: 'none', fontSize: 11, fontWeight: 600, minWidth: 56, minHeight: 44,
            color: isActive ? 'var(--cyan)' : 'var(--ink-2)',
          })}>
            <Icon size={18} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
