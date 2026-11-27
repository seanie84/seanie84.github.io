import { Link, useLocation } from 'react-router-dom';
import { MODULES } from '../../data/catalog';

const NAMES: Record<string, string> = Object.fromEntries(MODULES.map((m) => [m.to, m.name]));

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const here = NAMES[pathname] || pathname.replace('/', '') || 'Home';
  return (
    <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--ink-3)', marginBottom: 16 }}>
      <Link to="/hub" style={{ color: 'var(--cyan)', textDecoration: 'none', fontWeight: 600 }}>Hub</Link>
      <span aria-hidden="true"> · </span>
      <span style={{ color: 'var(--ink-2)' }}>{here}</span>
    </nav>
  );
}
